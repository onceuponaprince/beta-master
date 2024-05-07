import React, {useMemo, useEffect, useState} from 'react'
import styled, {keyframes} from 'styled-components'

import {Link, useParams} from 'react-router-dom'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import Spacer from '../../components/Spacer'

import useFarm from '../../hooks/useFarm'
import useRedeem from '../../hooks/useRedeem'
import { getContract } from '../../utils/erc20'

import Harvest from './components/Harvest'
import Stake from './components/Stake'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons'

interface FarmProps {
  farmId:string,
  backToFarms: () => void,
}

const Farm: React.FC<FarmProps> = (props) => {
  //const { farmId } = useParams()
  const [mouseOver, setMouseOver] = useState(false);
  const [mouseOver2, setMouseOver2] = useState(false);

  const {
    contract,
    depositToken,
    depositTokenAddress,
    earnToken,
    name,
    icon,
  } = useFarm(props.farmId) || {
    depositToken: '',
    depositTokenAddress: '',
    earnToken: '',
    name: '',
    icon: ''
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const { ethereum } = useWallet()

  const tokenContract = useMemo(() => {
    return getContract(ethereum as provider, depositTokenAddress)
  }, [ethereum, depositTokenAddress])

  const { onRedeem } = useRedeem(contract)

  const depositTokenName = useMemo(() => {
    return depositToken.toUpperCase()
  }, [depositToken])

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase()
  }, [earnToken])

  return (
      <>
        <ReturnPoolWrapper >
          <h2></h2>
          <TextLink className="btn success" onClick={props.backToFarms}><FontAwesomeIcon icon={faArrowAltCircleLeft}/> Return to Pools</TextLink>
        </ReturnPoolWrapper>

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
                  tokenName={depositToken.toUpperCase()}
                  tokenAddress={depositTokenAddress}
                  icon={icon}
              />
            </StyledCardWrapper>
          </StyledCardsWrapper>

        </StyledFarm>
      </>
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
    rgb(39,39,39) 30%,
    rgba(195, 169, 49, 1) 40%,
    rgb(39,39,39) 50%,
    rgba(195, 169, 49, 1) 60%,
    rgb(39,39,39) 70%,
    rgb(39,39,39) 80%,
    rgba(195, 169, 49, 1) 90%,
    rgba(195, 169, 49, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 4s linear infinite;
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
    margin-top: 80px;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
 
  @media (max-width: 950px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 950px) {
    width: 100%;
  }
  
  position: relative;
  
  /* &:hover {
     border: 1px solid #ffe58d;
     box-shadow: 3px 1px 10px #dbb442;
  }*/
`

const TextLink = styled.button`
  border: none;
  background-color: inherit;
  color: #ffffff;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  
  &:hover {
    color: #c3a931;
  }
`

const ReturnPoolWrapper = styled.div`
  display: flex; 
  justify-content: space-between;
  position: absolute;
  right: 0px;
  top: 80px;
`;

export default Farm
