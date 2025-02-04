import React from 'react'
import styled, { keyframes } from 'styled-components'

export interface ModalProps {
  onDismiss?: () => void,
}

const Modal: React.FC = ({ children }) => {
  return (
    <StyledResponsiveWrapper>
      <StyledModal>
        {children}
      </StyledModal>
    </StyledResponsiveWrapper>
  )
}

const mobileKeyframes = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
`

const StyledResponsiveWrapper = styled.div`

  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  max-width: 512px;
  padding: 10px;
  z-index: 100;
  
  @media (max-width: 950px) {
  
    flex: 1;
    top: 100%;
    right: 0;
    left: 0;
    max-height: calc(100% - ${props => props.theme.spacing[4]}px);
    animation: ${mobileKeyframes} .3s forwards ease-out;
   
  }
`

const StyledModal = styled.div`
  
  background: #2e2f33;
 /* border: 1px solid ${props => props.theme.color.grey[300]}ff;*/
  border-radius: 12px;
  /*box-shadow: inset 1px 1px 0px ${props => props.theme.color.grey[100]};*/
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 0;
  box-shadow: 0 0 7px 2px rgba(39,39,39,0.67);
  
`

const StyledModalContent = styled.div``

export default Modal
