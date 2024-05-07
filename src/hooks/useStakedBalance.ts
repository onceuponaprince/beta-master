import {DependencyList, EffectCallback, useCallback, useEffect, useState} from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from "web3-eth-contract"

import { getStaked } from '../yamUtils'
import useYam from './useYam'

const useStakedBalance = (pool: Contract) : [BigNumber, ()=>void]  => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {account}: { account: string } = useWallet()
  const yam = useYam()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(yam, pool, account)
    setBalance(new BigNumber(balance))
  }, [account, pool, yam])


  useEffect(() => {
    refresh()
  }, [account, pool, setBalance, yam])

  function refresh( ){
    if (account && pool && yam) {
      fetchBalance()
    }
  }

  return [balance, refresh]
}

export default useStakedBalance