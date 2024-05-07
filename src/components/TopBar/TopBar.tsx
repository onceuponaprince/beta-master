import React from 'react'
import styled from 'styled-components'

import Container from '../Container'
import Logo from '../Logo'

import AccountButton from './components/AccountButton'
import Nav from './components/Nav'
import MenuIcon from "../icons/MenuIcon";

interface TopBarProps {
    onPresentMobileMenu: () => void
}

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {
    return (
        <StyledTopBar>

            <StyledTopBarInner>
                <StyledLogoWrapper>
                    <Logo/>
                </StyledLogoWrapper>
                <StyledAccountButtonWrapper>
                    <AccountButton />
                </StyledAccountButtonWrapper>
                <StyledMenuButton onClick={onPresentMobileMenu}>
                    <MenuIcon />
                </StyledMenuButton>
            </StyledTopBarInner>


        </StyledTopBar>
    )
}

const StyledLogoWrapper = styled.div`
  z-index: 999;
  
  background: none;
  border: 0;
  margin: 0;
  outline: 0;
  padding: 0;
  display: none;
  @media (max-width: 950px) {
    align-items: center;
    display: flex;
    height: 44px;
    justify-content: center;
    width: 156px;
  }
`

const StyledTopBar = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
  @media (max-width: 950px) {
     background: #393A3F;
  }
`

const StyledTopBarInner = styled.div`
  z-index: 9;
  align-items: center;
  display: flex;
  height: ${props => props.theme.topBarSize}px;
  justify-content: flex-end;
  padding: 0 30px;
  width: 100%;
  @media (max-width: 950px) {
    padding: 0 10px;
    justify-content: space-between;

    
  }
`
const StyledNavWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  @media (max-width: 950px) {
    display: none;
  }
`

const StyledAccountButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 160px;
  z-index: 999;
  @media (max-width: 950px) {
 
    width: auto;
  }
`

const StyledMenuButton = styled.button`
  background: none;
  border: 0;
  margin: 0;
  outline: 0;
  padding: 0;
  display: none;
  z-index: 99;
  @media (max-width: 950px) {
    align-items: center;
    display: flex;
    height: 44px;
    justify-content: center;
    width: 44px;
  }
`

export default TopBar
