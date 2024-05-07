import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { Contract } from "web3-eth-contract"
import { stake } from '../yamUtils'
import  blockChainOpWrapper  from './blockChainOpWrapper'

const useStake = (poolContract: Contract, tokenName: string, decimals: number) => {
  const { account } = useWallet()

  const handleStake = useCallback(async (amount: string): Promise<boolean> => {
    return await blockChainOpWrapper(stake(poolContract, amount, account, tokenName, decimals), "Staking");
  }, [account, poolContract])

  return { onStake: handleStake }
}

export default useStake
