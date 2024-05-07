import React from 'react'
import styled, { keyframes } from 'styled-components'

import logo from "../../assets/img/auric_logo.png";

interface LoaderProps {
  text?: string
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <StyledLoader>

          <StyledNDL>
            <img src={logo} width={50} height={50} style={{borderRadius: 150}}/>
          </StyledNDL>
      {!!text && <StyledText>{text}</StyledText>}
    </StyledLoader>
  )
}

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.6);
  }
`

const StyledLoader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledNDL = styled.div`
  font-size: 32px;
  position: relative;
  animation: 1s ${pulse} infinite;
`

const StyledText = styled.div`
  color: ${props => props.theme.color.grey[400]};
`

export default Loader