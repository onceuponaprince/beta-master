import React, {useCallback, useEffect, useState} from 'react'
import styled from 'styled-components'

import Footer from '../Footer'
import TopBar from '../TopBar'
import bg from '../../assets/img/bg.gif';
import Switch from "react-switch";
import MobileMenu from "../MobileMenu";
import main_background from "../../assets/img/main_background.png";

import * as THREE from 'three';
import ModalsProvider from "../../contexts/Modals/Modals";

interface PageProps {
    pageKey?:'homePage' | 'Farms' | 'Farm' | 'Staking' | 'Audits' ,
    pageTitle?:string


}

const Page: React.FC<PageProps> = ({ children, pageKey, pageTitle }) => {

    const [mobileMenu, setMobileMenu] = useState(false)
    const [checked, setChecked] = useState(false);


    const handleDismissMobileMenu = useCallback(() => {
        setMobileMenu(false)
    }, [setMobileMenu])

    const handlePresentMobileMenu = useCallback(() => {
        setMobileMenu(true)
    }, [setMobileMenu])


    return (
        <>


            <StyledPage>

                <TopBar onPresentMobileMenu={handlePresentMobileMenu}/>
                <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />


                <StyledTitleWrapper>
                    {pageTitle && <StyledTitle>{pageTitle} </StyledTitle>}
                    {pageKey === 'homePage' ? <StyledTitleMobile>Welcome Auric.Finance</StyledTitleMobile> : null}

                </StyledTitleWrapper>

                <StyledMain>


                    {children}

                </StyledMain>
                <MobileFooterWrapper>
                    <Footer />
                </MobileFooterWrapper>

            </StyledPage>

        </>
    )}


const StyledTitle = styled.div`
  z-index: 9;
  font-size: 20px;
  font-weight: bold;
  color: #F0E7EA;
  margin-left: 140px;
  @media (max-width: 950px) {
    margin-left: 0;
   
  }
`;

const StyledTitleMobile = styled.div`
  display: none;
  @media (max-width: 950px) {
    display: block;
    font-size: 20px;
      font-weight: bold;
      color: #F0E7EA;
  }
`;

const StyledPage = styled.div`
  background-image: url(${main_background});
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;

  width: 100%;
  max-width: ${window.innerWidth - 200}px;
  margin-left: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  min-height: ${window.innerHeight}px;

  @media (max-width: 950px) {
    margin-left: 0;
    
    width: 100%;
    max-width: 100%;
    background-image: url(${main_background});
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
 

`

const StyledMain = styled.div`
  align-items: stretch;
  display: block;
  margin: 200px 0;
  @media (max-width: 950px) {
    margin: auto;
  }
  flex-direction: column;
  justify-content: center;
  max-width: ${props => props.theme.siteWidth}px;
  
`

const StyledTitleWrapper = styled.div`

  min-height: 70px;
  margin-top: 70px;
  position: absolute;
  top: 0;
  left: 250px;
  
  @media (max-width: 950px) {
    justify-content: center;
    position: relative;
    left: 0;
    
  }
  
`;

const StyleSwitchText = styled.span`
  font-size: 12px;
  color: #F0E7EA;
  margin: 0 5px;
`;

const StyledSwitchWrapper = styled.div`
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  display: inline-flex;
  z-index: 9;
   @media (max-width: 950px) {
     display: none;
  }
`;

const MobileFooterWrapper = styled.div`
  display: none;
  @media (max-width: 950px) {
     display: block;
  }
`;

export default Page
