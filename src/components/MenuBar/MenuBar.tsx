import React, {useState} from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import Logo from "../Logo";
import Icon from '../../assets/img/auric_icon.png'
import Twitter from '../../assets/img/twitter_icon_white.png'
import Discord from '../../assets/img/discord_icon_white.png'
import Github from '../../assets/img/github_icon_white.png'
import Telegram from '../../assets/img/telegram_icon_white.png'
interface MenuBarProps {
  page?: 'home' | 'pools' | 'staking' | 'history' | 'audits',
  onPresentMobileMenu?: () => void
}


const MenuBar: React.FC<MenuBarProps> = ({page, onPresentMobileMenu} ) => {

  return (
    <>
      <StyledTopBar>
        <StyledLogoWrapper>
          <Logo/>
        </StyledLogoWrapper>
        <StyledMenuWrapper>
          <StyledLink
              to="/" exact
              activeStyle={{color:'#dbb442'}}
          >
            {page === 'home' ? <StyledIcon src={Icon}/> : null} <StyledText> Home </StyledText>
          </StyledLink>
          <StyledLink to="/pools" activeStyle={{color:'#dbb442'}}>
            {page === 'pools' ? <StyledIcon src={Icon}/> : null} <StyledText>Pools</StyledText>
          </StyledLink>
      {/*    <StyledLink to="/staking" activeStyle={{color:'#dbb442'}}>
            {page === 'staking' ? <StyledIcon src={Icon}/> : null} <StyledText>Staking</StyledText>
          </StyledLink>*/}
          <StyledLink to="/audits" activeStyle={{color:'#dbb442'}}>
            {page === 'audits' ? <StyledIcon src={Icon}/> : null}<StyledText>Audits</StyledText>
          </StyledLink>
          {/*<StyledLink to="/comingsoon" activeStyle={{color:'#dbb442'}}>
            {page === 'audits' ? <StyledIcon src={Icon}/> : null}<StyledText>ComingSoon {"\n"}(Temp)</StyledText>
          </StyledLink>*/}
        </StyledMenuWrapper>
        <MenuFooter>
          <StyledMenuWrapperFooter>
            <StyledExternalLinkFooter href="https://auric.network/" target={"_blank"}>
              <StyledText>Auric.Network</StyledText>
            </StyledExternalLinkFooter>
            <StyledExternalLinkFooter href="https://gov.auric.network/" >
              <StyledText>Governance</StyledText>
            </StyledExternalLinkFooter>

          </StyledMenuWrapperFooter>

          <StyledLinkIconWrapper>
            <StyledLinkIcon href={'https://twitter.com/auric_network'} target={"_blank"}><ConnectIcon src={Twitter} /></StyledLinkIcon>
            <StyledLinkIcon href={'https://github.com/auricfinance/auric-finance'} target={"_blank"}><ConnectIcon src={Github} /></StyledLinkIcon>
            <StyledLinkIcon href={'https://discord.gg/PXPe4KX'} target={"_blank"}><ConnectIcon src={Discord}/></StyledLinkIcon>
            <StyledLinkIcon href={'https://t.me/auricfinance'} target={"_blank"}><ConnectIcon src={Telegram}/></StyledLinkIcon>
          </StyledLinkIconWrapper>
          <FooterTextWrapper>
            <FooterText>Privacy Policy</FooterText>
            <FooterText>Terms of Use</FooterText>
          </FooterTextWrapper>
        </MenuFooter>
      </StyledTopBar>
    </>
  )
}

const StyledText = styled.div`
  font-weight: bold;
  &:hover {
    color: #C3A931 ;
  }
  margin-left: 8px;
`;

const StyledIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-left: -35px;
  margin-right: 5px;

`;

const StyledLink = styled(NavLink)`
  display: flex;
  text-decoration: none;
  
  &:focus, &:hover, &:visited, &:link, &:active {
      text-decoration: #dbb442;
      color: #F0E7EA;
      //justify-content: center;
   }
   //justify-content: left;
   align-items: center;
   text-align: left;
  
     
  margin-bottom: 6px; 

  font-size: 16px;
`;

const StyledExternalLink = styled.a`
  display: flex;
  text-decoration: none;
  
  &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: #dbb442;
        color: #F0E7EA;
   }
    
  padding: 10px; 
  font-size: 16px;
`;

const StyledExternalLinkFooter = styled.a`
  display: flex;
  text-decoration: none;
  justify-content: center;
  
  &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: #dbb442;
        color: #F0E7EA;
   }
    
  
  font-size: 14px;
`;

const StyledLogoWrapper = styled.div`
  width: 140px;
  @media (max-width: 950px) {
    width: auto;
  }
  height: 50px;
  margin-bottom: 30px;
`



const StyledTopBar = styled.div` 
  display: flex;
  position: fixed;
  width: 200px;
  height: 100%;
  background: #1e1e21;
  max-height: ${window.innerHeight}px;
  
  padding-top: 20px;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 950px) {
    display: none;
  }
  
`


const StyledMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 59px;
  letter-spacing: 1px;
  font-weight: bold;
`;
const StyledMenuWrapperFooter = styled.div`
  //padding-bottom: 20px;
  justify-content: center;
  padding: 10px;
  text-align: center;
`;

const StyledHr = styled.hr`
  border: 1px solid #5d5d5d;
  width: 85%;
  margin-top: 50px;
`;

const MenuFooter = styled.div`
  color: #F0E7EA;
  position: absolute;
  bottom: 10px;
  text-align: center;
 
`;

const ConnectIcon = styled.img`
  width: 25px;
  height: 25px;
  margin: 5px;
`;

const FooterText = styled.div`
  
  text-align: center;
  font-size: 10px;
`;

const StyledLinkIcon = styled.a`
  
`

const StyledLinkIconWrapper = styled.div`
  padding: 10px;
`;

const FooterTextWrapper = styled.div`
  padding: 10px;
`;


export default MenuBar
