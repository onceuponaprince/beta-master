import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { Contract } from "web3-eth-contract"
import { redeem } from '../yamUtils'
import  blockChainOpWrapper  from './blockChainOpWrapper'

const useRedeem = (poolContract: Contract) => {
  const { account } = useWallet()

  const handleRedeem = useCallback(async () => {
    return await blockChainOpWrapper(redeem(poolContract, account),"Collect and unstake");
  }, [account, poolContract])

  return { onRedeem: handleRedeem }
}

export default useRedeem