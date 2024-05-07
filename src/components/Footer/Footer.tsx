import React from 'react'
import styled from 'styled-components'

import Nav from './components/Nav'

const Footer: React.FC = () => (
  <StyledFooter>
    <StyledFooterInner>
      <Nav />
    </StyledFooterInner>
      <StyleFooterText>Privacy Policy</StyleFooterText>
      <StyleFooterText>Terms of Use</StyleFooterText>
  </StyledFooter>
)

const StyledFooter = styled.footer`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
`
const StyledFooterInner = styled.div`
  z-index: 9;
  align-items: center;
  display: flex;
  justify-content: center;
  height: ${props => props.theme.topBarSize}px;
  max-width: ${props => props.theme.siteWidth}px;
  width: 100%;
`

const StyleFooterText = styled.div`
  color: #ffffff;
  font-size: 10px;
  z-index: 9;
`;

export default Footer
