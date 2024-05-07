import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { Contract } from "web3-eth-contract"
import { harvest } from '../yamUtils'
import  blockChainOpWrapper  from './blockChainOpWrapper'

const useReward = (poolContract: Contract) => {
  const { account } = useWallet()

  const handleReward = useCallback(async () => {
    return await blockChainOpWrapper(harvest(poolContract, account),"Collection");
  }, [account, poolContract])

  return { onReward: handleReward }
}

export default useReward
