import React, { useCallback, useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import { rewardToken as rewardAddress } from '../../constants/tokenAddresses'
import useYam from '../../hooks/useYam'
import { bnToDec } from '../../utils'
import { getPoolContracts, getEarned } from '../../yamUtils'
import Context from './context'
import { Farm, PoolProperties } from './types'

const Farms: React.FC = ({ children }) => {

  const [farms, setFarms] = useState<Farm[]>([])
  const [unharvested, setUnharvested] = useState(0)

  const yam = useYam()
  const { account } = useWallet()

  const fetchPools = useCallback(async () => {
    const pools = getPoolContracts(yam) as [{properties: PoolProperties, poolContract: Contract, stakingToken: Contract}]
    const farmsArr: Farm[] = []
    pools.forEach((pool)=>{
      farmsArr.push({
        contract: pool.poolContract,
        stakingTokenContract: pool.stakingToken,
        name: pool.properties.id,
        depositToken: pool.properties.stake_token_name,
        depositTokenAddress: pool.properties.stake_token_address,
        earnToken: 'AUSDC',
        earnTokenAddress: rewardAddress,
        icon: pool.properties.farm_icon_path,
        id: pool.properties.id,
        sort: pool.properties.index,
        category: pool.properties.category
      })
    })

    farmsArr.sort((a, b) => a.sort < b.sort ? 1 : -1)
    setFarms(farmsArr)
  }, [yam, setFarms])

  useEffect(() => {
    if (yam) {
      fetchPools()
    }
  }, [yam, fetchPools])

  useEffect(() => {
    async function fetchUnharvested () {
      const unharvestedBalances = await Promise.all(farms.map(async (farm: Farm) => {
        const earnings = await getEarned(yam, farm.contract, account)
        return bnToDec(earnings)
      }))
      const totalBal = unharvestedBalances.reduce((acc, val) => acc + val)
      setUnharvested(totalBal)
    }
    if (account && farms.length && yam) {
      fetchUnharvested()
    }
  }, [account, farms, setUnharvested, yam])

  return (
    <Context.Provider value={{
      farms,
      unharvested,
    }}>
      {children}
    </Context.Provider>
  )
}

export default Farms
