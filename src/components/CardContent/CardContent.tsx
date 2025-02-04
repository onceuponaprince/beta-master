import React from 'react'
import styled from 'styled-components'

const CardContent: React.FC = ({ children }) => (
    <StyledCardContent>
      {children}
    </StyledCardContent>
)

const StyledCardContent = styled.div`
  background: #2e2f33;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: ${props => props.theme.spacing[4]}px;
`

export default CardContent
