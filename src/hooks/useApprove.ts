import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from "web3-eth-contract"
import { approve } from '../yamUtils'
import  blockChainOpWrapper  from './blockChainOpWrapper'

const useApprove = (tokenContract: Contract, poolContract: Contract) => {
  const { account }: { account: string, ethereum: provider } = useWallet()

  const handleApprove = useCallback(async () => {
    return await blockChainOpWrapper(approve(tokenContract, poolContract, account),"Approval");

  }, [account, tokenContract, poolContract])

  return { onApprove: handleApprove }
}

export default useApprove