import { useCallback, useEffect, useState } from 'react'

import {getTvl} from '../yamUtils'
import useYam from './useYam'

const useCalulateTVL = () : [number, ()=>void] => {
    const [tvl, setTvl] = useState(Number.NaN)
    const yam = useYam()

    const calculateTvl = useCallback(async () => {
        setTvl(await getTvl(yam))
    }, [yam])

    useEffect(() => {
        calculateTvl()
        let refreshInterval = setInterval(calculateTvl, 120000)
        return () => clearInterval(refreshInterval)
    }, [])

    function refresh() {
        calculateTvl()
    }
    return [tvl, refresh]
}

export default useCalulateTVL