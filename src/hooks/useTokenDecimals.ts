import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from "web3-eth-contract"
import { getDecimalPlaces } from '../yamUtils'

import { getBalance } from '../utils/erc20'
import useYam from "./useYam";

const useTokenDecimals = (tokenAddress: string) => {
    const [decimals, setDecimals] = useState(18)
    const { account, ethereum }: { account: string, ethereum: provider } = useWallet()
    const yam = useYam();

    const fetchDecimals = useCallback(async () => {
        setDecimals( await getDecimalPlaces(yam,tokenAddress))
    }, [tokenAddress])

    useEffect(() => {
        if (account && ethereum) {
            fetchDecimals()
        }
    }, [account, ethereum])

    return decimals
}

export default useTokenDecimals