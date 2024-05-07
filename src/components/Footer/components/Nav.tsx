import React from 'react'
import styled from 'styled-components'
import Twitter from '../../../assets/img/twitter_icon_white.png'
import Github from '../../../assets/img/github_icon_white.png'
import Discord from '../../../assets/img/discord_icon_white.png'
import Telegram from '../../../assets/img/telegram_icon_white.png'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink href="https://twitter.com/auric_network" target={"_blank"}><StyledIcon src={Twitter} /></StyledLink>
      <StyledLink href="https://github.com/auricfinance/auric-finance" target={"_blank"}><StyledIcon src={Github} /></StyledLink>
      <StyledLink href="https://discord.gg/PXPe4KX" target={"_blank"}><StyledIcon src={Discord} /></StyledLink>
      <StyledLink href="https://t.me/auricfinance" target={"_blank"}><StyledIcon src={Telegram} /></StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  color: ${props => props.theme.color.grey[400]};
  padding-left: ${props => props.theme.spacing[1]}px;
  padding-right: ${props => props.theme.spacing[1]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.grey[500]};
  }
`

const StyledIcon = styled.img`
  width: 25px;
  height: 25px;
`;

export default Nav
