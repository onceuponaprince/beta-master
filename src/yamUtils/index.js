import {ethers} from 'ethers'

import BigNumber from 'bignumber.js'
import { rewardToken as ausdcAddress,  } from '../constants/tokenAddresses'
import apyCalc from "../yam/clean_build/contracts/ApyCalculator.json";
import ERC20 from "../yam/clean_build/contracts/IERC20.json";


BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  }
};

export const getPoolStartTime = async (poolContract) => {
  return await poolContract.methods.starttime().call()
}

export const stake = async (poolContract, amount, account, tokenName, decimals) => {
  let now = new Date().getTime() / 1000;
  const gas = GAS_LIMIT.STAKING[tokenName.toUpperCase()] || GAS_LIMIT.STAKING.DEFAULT;
  if (now >= 1597172400) {
    return poolContract.methods
      .stake((new BigNumber(amount).times(new BigNumber(10).pow(decimals))).toString())
      .send({ from: account, gas })
      .on('transactionHash', tx => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert("pool not active");
  }
}

export const unstake = async (poolContract, amount, account, decimals) => {
  let now = new Date().getTime() / 1000;
  if (now >= 1597172400) {
    return poolContract.methods
      .withdraw((new BigNumber(amount).times(new BigNumber(10).pow(decimals))).toString())
      .send({ from: account, gas: 400000 })
      .on('transactionHash', tx => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert("pool not active");
  }
}

export const harvest = async (poolContract, account) => {
  let now = new Date().getTime() / 1000;
  if (now >= 1597172400) {
    return poolContract.methods
      .getReward()
      .send({ from: account, gas: 600000 })
      .on('transactionHash', tx => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert("pool not active");
  }
}

export const redeem = async (poolContract, account) => {
    return poolContract.methods
      .exit()
      .send({ from: account, gas: 600000 })
      .on('transactionHash', tx => {
        console.log(tx)
        return tx.transactionHash
      })
}

export const getApy = async (yam,stakeTokenContract, poolAddress, incentivization) =>{
  const getAPY = yam.contracts.contracts.get("GetAPY");
  const stakeTokenAddr = stakeTokenContract.options.address;
  if (poolAddress == "0x7597a1565f445EdAC4756bABc2c68F68F55ff9Cb") {
    incentivization = "2191304" + "348000000000000000"
  }

  if (poolAddress == "0x6F866ee0C4d60Db4A802774Ca6d690e50400A9F7") {
    // the sBTC pool is getting a special calculation, because the price of sBTC on
    // Uniswap is completely wrong.
    let balance = yam.toBigN(await getPoolContributions(yam, poolAddress, "0xfE18be6b3Bd88A2D2A7f928d00292E7a9963CfC6"))
    let bitcoinPrice = "12500"
    return yam.toBigN(incentivization).multipliedBy("26").multipliedBy("0.055").multipliedBy("100").dividedBy(bitcoinPrice).dividedBy(balance).toNumber();
  }

  /*since we don't have an easy way to differentiate uni pair based pools from non-uni pair pools, we first call the
   the Apy calculator for uni pairs (there are more of those) then if that fails call the one for the standard pairs*/
  try {
    let result = yam.toBigN(await getAPY.methods.getApy(stakeTokenAddr, true, ausdcAddress, (incentivization),2,poolAddress ).call()).dividedBy("1000000").toNumber()
    return result
  } catch { }//we are only using this to supress the error

  try {
    let result = yam.toBigN(await getAPY.methods.getApy(stakeTokenAddr, false, ausdcAddress, (incentivization),2,poolAddress ).call()).dividedBy("1000000").toNumber()
    return result
  } catch { } 

  return Number.NaN;
}

export const getTvl = async (yam) => {
  let valueLocked =0;

  if (yam) {
    const oracle = yam.contracts.contracts.get("GetAPY");
    let addressData = yam.contracts.pools.map(pool => {
      return {poolAddress: pool.poolContract._address, tokenAddress: pool.stakingToken._address}
    })

    for (const addresses of addressData ) {
      try {
        valueLocked += new BigNumber(await oracle.methods.getTvl(addresses.poolAddress, addresses.tokenAddress, true).call()).dividedBy("1000000").toNumber()
      } catch {
        try {
          let value = new BigNumber(await oracle.methods.getTvl(addresses.poolAddress, addresses.tokenAddress, false).call()).dividedBy("1000000").toNumber()
          if (addresses.poolAddress =='0x6F866ee0C4d60Db4A802774Ca6d690e50400A9F7')
            value *=40; //sBTC is wrong on uniswap
          valueLocked += value;
        } catch {}
      }
    }
    return valueLocked;
  }
  return Number.NaN;
}

export const approve = async (tokenContract, poolContract, account) => {
  return tokenContract.methods
    .approve(poolContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account, gas: 80000 })
}

export const getPoolContracts = (yam) => {
  return yam.contracts.pools;
}

export const getEarned = async (yam, pool, account) => {
  try {
    const earned = new BigNumber(await pool.methods.earnedAusc(account).call())
    return earned;
  } catch {
    return yam.toBigN(0);
  }
}

export const getStaked = async (yam, pool, account) => {
  return yam.toBigN(await pool.methods.balanceOf(account).call())
}

export const getCurrentPrice = async (yam) => {
  // FORBROCK: get current YAM price
  return yam.toBigN(await yam.contracts.rebaser.methods.getCurrentTWAP().call())
}

export const getTargetPrice = async (yam) => {
  return yam.toBigN(1).toFixed(2);
}

export const getCirculatingSupply = async (yam) => {
  let now = await yam.web3.eth.getBlock('latest');
  let scalingFactor = yam.toBigN(await yam.contracts.yam.methods.yamsScalingFactor().call());
  let starttime = yam.toBigN(await yam.contracts.eth_pool.methods.starttime().call()).toNumber();
  let timePassed = now["timestamp"] - starttime;
  if (timePassed < 0) {
    return 0;
  }
  let yamsDistributed = yam.toBigN(8 * timePassed * 250000 / 625000); //yams from first 8 pools
  let starttimePool2 = yam.toBigN(await yam.contracts.ycrv_pool.methods.starttime().call()).toNumber();
  timePassed = now["timestamp"] - starttime;
  let pool2Yams = yam.toBigN(timePassed * 1500000 / 625000); // yams from second pool. note: just accounts for first week
  let circulating = pool2Yams.plus(yamsDistributed).times(scalingFactor).div(10**36).toFixed(2)
  return circulating
}

export const getNextRebaseTimestamp = async (yam) => {
  try {
    let now = await yam.web3.eth.getBlock('latest').then(res => res.timestamp);
    let interval = 43200; // 12 hours
    let offset = 28800; // 8am/8pm utc
    let secondsToRebase = 0;
    if (await yam.contracts.rebaser.methods.rebasingActive().call()) {
      if (now % interval > offset) {
          secondsToRebase = (interval - (now % interval)) + offset;
       } else {
          secondsToRebase = offset - (now % interval);
      }
    } else {
      let twap_init = yam.toBigN(await yam.contracts.rebaser.methods.timeOfTWAPInit().call()).toNumber();
      if (twap_init > 0) {
        let delay = yam.toBigN(await yam.contracts.rebaser.methods.rebaseDelay().call()).toNumber();
        let endTime = twap_init + delay;
        if (endTime % interval > offset) {
            secondsToRebase = (interval - (endTime % interval)) + offset;
         } else {
            secondsToRebase = offset - (endTime % interval);
        }
        return endTime + secondsToRebase;
      } else {
        return now + 13*60*60; // just know that its greater than 12 hours away
      }
    }
    return secondsToRebase
  } catch (e) {
    console.log(e)
  }
}

export const getTotalSupply = async (yam) => {
  let totals = new BigNumber(await yam.contracts.contracts.get("Ausc").methods.totalSupply().call());
  return totals
}

export const getDecimalPlaces = async (yam, address) => {
  var contract = new yam.web3.eth.Contract(ERC20.abi, address)
  return await contract.methods.decimals().call();
}

export const getPoolContributions = async (yam, poolAddress, tokenAddress) => {
  let contract = await new yam.web3.eth.Contract(ERC20.abi, tokenAddress)
  return await contract.methods.balanceOf(poolAddress).call()
}

export const getStats = async (yam) => {
  const curPrice = await getCurrentPrice(yam)
  const circSupply = await getCirculatingSupply(yam)
  const nextRebase = await getNextRebaseTimestamp(yam)
  const targetPrice = await getTargetPrice(yam)
  const totalSupply = await getTotalSupply(yam)
  return {
    circSupply,
    curPrice,
    nextRebase,
    targetPrice,
    totalSupply
  }
}

export const vote = async (yam, account) => {
  return yam.contracts.gov.methods.castVote(0, true).send({ from: account })
}

export const delegate = async (yam, account) => {
  return yam.contracts.yam.methods.delegate("0x683A78bA1f6b25E29fbBC9Cd1BFA29A51520De84").send({from: account, gas: 320000 })
}

export const didDelegate = async (yam, account) => {
  return await yam.contracts.yam.methods.delegates(account).call() === '0x683A78bA1f6b25E29fbBC9Cd1BFA29A51520De84'
}

export const getVotes = async (yam) => {
  const votesRaw = new BigNumber(await yam.contracts.yam.methods.getCurrentVotes("0x683A78bA1f6b25E29fbBC9Cd1BFA29A51520De84").call()).div(10**24)
  return votesRaw
}

export const getScalingFactor = async (yam) => {
  return new BigNumber(await yam.contracts.yam.methods.yamsScalingFactor().call())
}

export const getDelegatedBalance = async (yam, account) => {
  return new BigNumber(await yam.contracts.yam.methods.balanceOfUnderlying(account).call()).div(10**24)
}

export const migrate = async (yam, account) => {
  return yam.contracts.yamV2migration.methods.migrate().send({ from: account, gas: 320000 })
}

export const getMigrationEndTime = async (yam) => {
  return yam.toBigN(await yam.contracts.yamV2migration.methods.startTime().call()).plus(yam.toBigN(86400*3)).toNumber()
}

