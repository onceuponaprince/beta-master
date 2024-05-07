import React from 'react'
import styled from 'styled-components'

interface ModalTitleProps {
  text?: string
}

const ModalTitle: React.FC<ModalTitleProps> = ({ text }) => (
  <StyledModalTitle>
    {text}
  </StyledModalTitle>
)

const StyledModalTitle = styled.div`
  align-items: center;
  color: ${props => props.theme.color.grey[200]};
  display: flex;
  font-size: 18px;
  font-weight: 700;
  height: ${props => props.theme.topBarSize / 2}px;
  justify-content: center;
`

export default ModalTitle
