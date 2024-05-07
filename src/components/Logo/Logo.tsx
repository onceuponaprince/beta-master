import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import farmer from '../../assets/img/auric_darkmode.png'

const Logo: React.FC = () => {
  return (
    <StyledLogo to="/">
      <LogoImg src={farmer} style={{ marginTop: 0 }} />

    </StyledLogo>
  )
}

const LogoImg = styled.img`
  height: 100%;
  width: 100%;
`;

const StyledLogo = styled(Link)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 41px;
  min-width: 44px;
  padding: 0;
  text-decoration: none;
  width: 140px;
  height: 41px;
`

const StyledText = styled.span`
  color: ${props => props.theme.color.grey[600]};
  font-size: 22px;
  font-weight: 700;
  margin-left: ${props => props.theme.spacing[2]}px;
  @media (max-width: 400px) {
    display: none;
  }
`

export default Logo
