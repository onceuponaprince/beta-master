import React from 'react'
import styled from 'styled-components'

const ModalContent: React.FC = ({ children }) => {
  return (
    <StyledModalContent>{children}</StyledModalContent>
  )
}

const StyledModalContent = styled.div`
  padding: ${props => props.theme.spacing[4]}px;
  @media (max-width: 950px) {
    flex: 1;
    overflow: auto;
  }
  z-index: 100;

`

export default ModalContent
