import React from 'react'
import styled, { keyframes } from 'styled-components'

import { NavLink } from 'react-router-dom'

interface MobileMenuProps {
  onDismiss: () => void,
  visible?: boolean
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onDismiss, visible }) => {
  if (visible) {
    return (
      <StyledMobileMenuWrapper>
        <StyledBackdrop onClick={onDismiss} />
        <StyledMobileMenu>
          <StyledLink exact activeClassName="active" to="/" onClick={onDismiss}>Home</StyledLink>
          <StyledLink exact activeClassName="active" to="/pools" onClick={onDismiss}>Pools</StyledLink>
          <StyledLink exact activeClassName="active" to="/audits" onClick={onDismiss}>Audits</StyledLink>
          <StyledExternalLink href="https://auric.network/" onClick={onDismiss}>About</StyledExternalLink>
        </StyledMobileMenu>
      </StyledMobileMenuWrapper>
    )
  }
  return null
}

const StyledBackdrop = styled.div`
  background-color: #272727aa;
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
`

const StyledMobileMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: 1000;
`

const slideIn = keyframes`
  0% {
    transform: translateX(0)
  }
  100% {
    transform: translateX(-100%);
  }
`

const StyledMobileMenu = styled.div`
  animation: ${slideIn} 0.3s forwards ease-out;
  background-color: #C3A931;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 0; left: 100%; bottom: 0 ;
  width: calc(100% - 50%);
`

const StyledLink = styled(NavLink)`
  box-sizing: border-box;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  padding: ${props => props.theme.spacing[3]}px ${props => props.theme.spacing[4]}px;
  text-align: center;
  text-decoration: none;
  width: 100%;
  &:hover {
    background: #393a3f;
    color: #c3a931;
  }
  &.active {
    background: #393a3f;
    color: #c3a931;
  }
`

const StyledExternalLink = styled.a`
   box-sizing: border-box;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  padding: ${props => props.theme.spacing[3]}px ${props => props.theme.spacing[4]}px;
  text-align: center;
  text-decoration: none;
  width: 100%;
  &:hover, &:active {
    background: #393a3f;
    color: #c3a931;
  }
  &.active {
    background: #393a3f;
    color: #c3a931;
  }
`

export default MobileMenu
