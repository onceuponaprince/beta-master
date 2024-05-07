import React, {useMemo, useEffect, useState} from 'react'
import styled, {keyframes} from 'styled-components'

import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import Spacer from '../../components/Spacer'
import useRedeem from '../../hooks/useRedeem'
import { getContract } from '../../utils/erc20'
import { getPoolContracts } from '../../yamUtils'
import { Contract } from 'web3-eth-contract'
import { PoolProperties } from '../../contexts/Farms/types'

import Page from "../../components/Page";
import Harvest from "../Farm/components/Harvest";
import Stake from "../Farm/components/Stake";
import useYam from "../../hooks/useYam";


const Staking: React.FC = () => {
  const { ethereum } = useWallet()
  const yam = useYam()

  const pools = getPoolContracts(yam) as [{properties: PoolProperties, poolContract: Contract, stakingToken: Contract}]

  const pool= pools.find(pool=>pool.properties.id === 'auscethPool');
  const contract = pool.poolContract;

  const tokenContract = useMemo(() => {
    return getContract(ethereum as provider, pool.properties.stake_token_address)
  }, [ethereum, pool.properties.stake_token_address])

  const { onRedeem } = useRedeem(contract)

  const depositTokenName = useMemo(() => {
    return pool.properties.stake_token_name.toUpperCase()
  }, [pool])

  const [mouseOver, setMouseOver] = useState(false);
  const [mouseOver2, setMouseOver2] = useState(false);

  return (
    <Page pageTitle={"Staking"}>
      <StyledFarm>
        <StyledCardsWrapper>

          <StyledCardWrapper onMouseOver={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)}>
            {mouseOver? <StyledCardAccent /> : null}
            <Harvest poolContract={contract} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper onMouseOver={() => setMouseOver2(true)} onMouseOut={() => setMouseOver2(false)}>
            {mouseOver2? <StyledCardAccent /> : null}
            <Stake
                poolContract={contract}
                tokenContract={tokenContract}
                tokenName={depositTokenName}
                tokenAddress={pool.properties.stake_token_address}
                icon = {pool.properties.farm_icon_path}
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>

      </StyledFarm>
    </Page>
  )
}


const RainbowLight = keyframes`
  
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(195, 169, 49, 1) 0%,
    rgb(39,39,39) 10%,
    rgba(195, 169, 49, 1) 20%,
    rgba(195, 169, 49, 1) 30%,
    rgb(39,39,39) 40%,
    rgba(195, 169, 49, 1) 50%,
    rgba(195, 169, 49, 1) 60%,
    rgb(39,39,39) 70%,
    rgba(195, 169, 49, 1) 80%,
    rgba(195, 169, 49, 1) 90%,
    rgba(195, 169, 49, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 5s linear infinite;
  border-radius: 12px;
  filter: blur(4px);
  position: absolute;
  
  z-index: 1;
 
  top: -2px; right: -2px; bottom: -2px; left: -2px;
  

`



const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 950px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`

  display: flex;
  //width: 600px;
  @media (max-width: 950px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  box-shadow: 0 0 7px 2px rgba(39,39,39,0.67);
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 950px) {
    width: 100%;
  }
  position: relative;
  border-radius: 12px;
  
/*   &:hover {
     border: 1px solid #ffe58d;
     box-shadow: 3px 1px 10px #dbb442;
    
  }*/
`

const TextLink = styled.button`
  border: none;
  background-color: inherit;
  color: black;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
`

export default Staking
