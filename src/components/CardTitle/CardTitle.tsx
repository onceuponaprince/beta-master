import React from 'react'
import styled from 'styled-components'

interface CardTitleProps {
  text?: string
}

const CardTitle: React.FC<CardTitleProps> = ({ text }) => (
  <StyledCardTitle>{text}</StyledCardTitle>
)

const StyledCardTitle = styled.div`
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  padding: ${props => props.theme.spacing[4]}px;
  text-align: center;
  
   @media (max-width: 950px) {
    padding: 0;
  }
`

export default CardTitle
