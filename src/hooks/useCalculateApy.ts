import { useCallback, useEffect, useState } from 'react'

import { Contract } from "web3-eth-contract"

import {getApy, getEarned} from '../yamUtils'
import useYam from './useYam'

const useCalulateApy = (stakeToken: Contract, poolContract: Contract) : [number, ()=>void] => {
    const [apy, setApy] = useState(Number.NaN)
    const yam = useYam()


    const calculateApy = useCallback(async () => {
        if (poolContract.options.address !== '0xc1E44eaeDfaA349802A5F226F03105CefD81153f')
            setApy(Number.NaN);
        else
            setApy(await getApy(yam,stakeToken, poolContract.options.address, "730434782600000000000000"))
    }, [yam,stakeToken])

    useEffect(() => {
        if (stakeToken) {
            calculateApy()
            let refreshInterval = setInterval(calculateApy, 120000)
            return () => clearInterval(refreshInterval)
        }
    }, [stakeToken])

    function refresh() {
        if (stakeToken) {
            calculateApy()
        }
    }

    return [apy, refresh]
}

export default useCalulateApy