import React from 'react'
import styled from 'styled-components'

const HomeCardContent: React.FC = ({ children }) => (
    <StyledCardContent>
      {children}
    </StyledCardContent>
)

const StyledCardContent = styled.div`
background: #2c2c2f;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: ${props => props.theme.spacing[4]}px;
  height: 100%;
  position: relative;
  z-index: 2;
  border-radius: 12px;
  align-items: center;
  justify-content: space-around;
`

export default HomeCardContent
