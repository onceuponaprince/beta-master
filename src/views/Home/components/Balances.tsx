import React, { useEffect, useState } from 'react'
import styled, {keyframes} from 'styled-components'
import {isMobile} from 'react-device-detect'
import numeral from 'numeral'
import { useWallet } from 'use-wallet'

import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { rewardToken as rewardAddress} from '../../../constants/tokenAddresses'


import useTokenBalance from '../../../hooks/useTokenBalance'
import useCalculateTVL from '../../../hooks/useCalculateTVL'

import useYam from '../../../hooks/useYam'

import { bnToDec } from '../../../utils'
import { getTotalSupply } from '../../../yamUtils'
import HomeCard from "../../../components/HomeCard";
import HomeCardContent from "../../../components/HomeCardContent";
import AuricLogo from '../../../assets/img/auric_AUSCM2.gif';

const Balances: React.FC = () => {
  const [totalSupply, setTotalSupply] = useState<number>()
  const balance = useTokenBalance(rewardAddress)
  const yam = useYam()
  const [totalValueLocked, refreshTvl] = useCalculateTVL();
  const { account } = useWallet()
  const [mouseOver, setMouseOver] = useState(false);
  const [mouseOver2, setMouseOver2] = useState(false);
  const [mouseOver3, setMouseOver3] = useState(false);

  useEffect(() => {
    async function fetchTotalSupply () {
      const supply = await getTotalSupply(yam)
      setTotalSupply(bnToDec(supply, 18))
    }
    if (yam) {
      fetchTotalSupply()
      refreshTvl()
    }
  }, [yam, setTotalSupply])

  return (
      <>
        <StyledWrapper >

          <div onMouseOver={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)}>
            <HomeCard >
              {mouseOver? <StyledCardAccent /> : null}

              <HomeCardContent>

                <GifWrapper src={AuricLogo}/>
                <StyledBalances>

                  <StyledBalance>


                    <div style={{ flex: 1, height:80, width:200 }}>

                      <Label text="Your AUSCM Balance" />
                      <Value value={!!account ? bnToDec(balance, 18).toLocaleString() : '--'} />
                    </div>
                  </StyledBalance>

                </StyledBalances>


              </HomeCardContent>


            </HomeCard>
          </div>
          <Spacer />
          <div onMouseOver={() => setMouseOver2(true)} onMouseOut={() => setMouseOver2(false)}>
            <HomeCard>

              {mouseOver2? <StyledCardAccent /> : null}

              <HomeCardContent>
                <GifWrapper src={AuricLogo}/>
                <StyledBalances>
                  <StyledBalance>
                    <div style={{ flex:1,  height:80, width:200 }} >
                      <Label text="Total AUSCM supply" />
                      <Value value={totalSupply ? totalSupply.toLocaleString() : '--'} />
                    </div>
                  </StyledBalance>

                </StyledBalances>
              </HomeCardContent>

            </HomeCard>
          </div>

        </StyledWrapper>
        <Spacer />
        { yam &&
          <StyledCardFooter onMouseOver={() => setMouseOver3(true)} onMouseOut={() => setMouseOver3(false)}>
            <StyledFooterCard >
              {mouseOver3? <StyledCardAccent /> : null}
              {isMobile ? (
                  <StyledFooterCardContents>
                    <div>
                      <StyledCardTitle>Total Value Locked</StyledCardTitle>
                      <CenterAlignedValue>{ isNaN(totalValueLocked) ? <FontAwesomeIcon icon={faSpinner} pulse/> : '$'+totalValueLocked.toLocaleString()}</CenterAlignedValue>
                    </div>
                  </StyledFooterCardContents>
              ) : (
                  <>
                  <StyledFooterCardContents>
                      <StyledCardTitle>Total Value Locked</StyledCardTitle>
                  </StyledFooterCardContents>
                  <StyledFooterCardContents>
                    <StyledValue>{isNaN(totalValueLocked) ?
                    <FontAwesomeIcon icon={faSpinner} pulse/> : '$' + totalValueLocked.toLocaleString()}</StyledValue>
                  </StyledFooterCardContents>
                </>
              )}
            </StyledFooterCard>
          </StyledCardFooter>
        }

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
  animation: ${RainbowLight} 4s linear infinite;
  border-radius: 12px;  
  filter: blur(4px);
  position: absolute;
  
  z-index: -1;
 
  top: -2px; right: -2px; bottom: -2px; left: -2px;
  

`


const StyledWrapper = styled.div`
  
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 3;
  @media (max-width: 950px) {
    width: 100%;
    flex-flow: column nowrap;
   
  }
`

const StyledBalances = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
   position: relative;
   z-index: 2;
   //padding-top: 30px;
`

const StyledBalance = styled.div`
 position: relative;
  align-items: center;
  display: flex;
  flex: 1;
  //padding: 40px 0;
  z-index: 3;
  justify-content: center;
`

const StyledCardFooter = styled.div`
  position: relative;
  z-index: 1;
`;

const StyledFooterCard = styled.div`
  width: ${isMobile ? '248px' : '684px'};
  height: 70px;
  background: #2c2c2f;
  border-radius: 12px;
  box-shadow: 0 0 7px 2px rgba(39,39,39,0.67);
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 1;

  
`;

const StyledFooterCardContents = styled.div`
 
  display: flex;
  justify-content: space-around;
  vertical-align: middle;
  z-index: 1;
  
`;

const GifWrapper = styled.img`
  width: 100px;
  height: 100px;
`;

const StyledCardTitle = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const StyledValue = styled.div`
  color: #fff;
  font-size: 16px;
`;

const CenterAlignedValue = styled.div`
  color: #fff;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

export default Balances
