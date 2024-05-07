import React, { useEffect, useState } from 'react'
import styled, {keyframes} from 'styled-components'

import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'

import HomeCard from "../../../components/HomeCard";
import HomeCardContent from "../../../components/HomeCardContent";

import StampLogo from '../../../assets/img/quantstamplogo.png';
import QuestionLogo from '../../../assets/img/question_audits.png';

import { Link } from 'react-router-dom'

const Audit: React.FC = () => {

  const [mouseOver, setMouseOver] = useState(false);
  const [mouseOver2, setMouseOver2] = useState(false);
  const [mouseOver3, setMouseOver3] = useState(false);
  const [mouseOver4, setMouseOver4] = useState(false);

  return (
    <>
      <StyledWrapper>

        <div onMouseOver={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)}>
          <HomeCard>

            {mouseOver? <StyledCardAccent /> : null}
            <HomeCardContent>
              <StyledExternalLink href={"https://certificate.quantstamp.com/full/auric-network"} target={"_blank"}>
              <StyledBalances >
                <AuditImage src={StampLogo}/>
                <StyledBalance>

                  <div style={{ flex: 1, height:80, width:200, textAlign: 'center'}}>
                    <StyledTitleWrapper>Quantstamp</StyledTitleWrapper>
                  </div>
                </StyledBalance>

              </StyledBalances>
              </StyledExternalLink>


            </HomeCardContent>
          </HomeCard>
        </div>
        <Spacer />

        <div onMouseOver={() => setMouseOver2(true)} onMouseOut={() => setMouseOver2(false)}>
          <HomeCard>
            {mouseOver2? <StyledCardAccent /> : null}
            <HomeCardContent>
              <StyledBalances>
                <AuditImage src={QuestionLogo}/>
                <StyledBalance>
                <div style={{ flex:1,  height:80, width:200, textAlign: 'center' }} >
                  <StyledTitleWrapper>Audit Co</StyledTitleWrapper>
                  <StyledLinkWrapper to={"/"}>Audit pending...</StyledLinkWrapper>
                </div>
                </StyledBalance>

              </StyledBalances>
            </HomeCardContent>
          </HomeCard>
        </div>
      </StyledWrapper>
      <Spacer />
      <StyledWrapper>
        <div onMouseOver={() => setMouseOver3(true)} onMouseOut={() => setMouseOver3(false)}>
          <HomeCard>
            {mouseOver3? <StyledCardAccent /> : null}
            <HomeCardContent>
              <StyledBalances>
                <AuditImage src={QuestionLogo}/>
                <StyledBalance>
                  <div style={{ flex: 1, height:80, width:200, textAlign: 'center' }}>
                    <StyledTitleWrapper>Audit Co</StyledTitleWrapper>
                    <StyledLinkWrapper to={"/"}>Audit pending...</StyledLinkWrapper>

                  </div>
                </StyledBalance>

              </StyledBalances>


            </HomeCardContent>


          </HomeCard>
        </div>
        <Spacer />
        <div onMouseOver={() => setMouseOver4(true)} onMouseOut={() => setMouseOver4(false)}>
          <HomeCard>
            {mouseOver4? <StyledCardAccent /> : null}
            <HomeCardContent>
              <StyledBalances>
                <StyledBalance>
                  <div style={{ flex:1,  height:80, width:200, textAlign: 'center' }} >
                    <StyledLinkWrapper to={"/"}>Auric is currently offering a bounty of 20 ETH to two firms
                    that can provide us with full rigorous audits of the protocol and publish them.</StyledLinkWrapper>

                  </div>
                </StyledBalance>

              </StyledBalances>
            </HomeCardContent>
          </HomeCard>
        </div>
      </StyledWrapper>
    </>
  )
}


const AuditImage = styled.img`
  width: 100px;
  height: 100px;
`;


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



const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
 
  @media (max-width: 950px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledBalances = styled.div`
 position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`

const StyledTitleWrapper = styled.div`
  color: #cccccc;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  padding: 10px;
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
      
        text-decoration: none;
  }
`;

const StyledLinkWrapper = styled(Link)`

  &:focus, &:hover, &:visited, &:link, &:active {
      
        color: #cccccc;
    }
    font-size: 15px;
`;

const StyledExternalLink = styled.a`
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
      
      text-decoration: none;
  }
`;

export default Audit
