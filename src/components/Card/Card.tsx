import React from 'react'
import styled from 'styled-components'

const Card: React.FC = ({ children }) => (
    <StyledCard>
        {children}
    </StyledCard>
)

const StyledCard = styled.div`
  background: #2c2c2f;
 
  border-radius: 12px;
  box-shadow: 0 0 7px 2px rgba(39,39,39,0.67);
 
  display: flex;
  flex: 1;
  flex-direction: column;
 
   z-index: 2;
   
  @media (max-width: 950px) {
    width: 70%; 
    margin: auto;
  }
  
  
`

export default Card
