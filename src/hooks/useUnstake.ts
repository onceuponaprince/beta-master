import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { Contract } from "web3-eth-contract"
import { unstake } from '../yamUtils'
import  blockChainOpWrapper  from './blockChainOpWrapper'

const useUnstake = (poolContract: Contract, decimals: Number) => {
  const { account } = useWallet()

  const handleUnstake = useCallback(async (amount: string) : Promise<boolean> => {
    return await blockChainOpWrapper(unstake(poolContract, amount, account, decimals), "Unstaking");
  }, [account, poolContract])

  return { onUnstake: handleUnstake }
}

export default useUnstake