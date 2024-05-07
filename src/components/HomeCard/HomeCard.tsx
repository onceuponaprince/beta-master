import React from 'react'
import styled from 'styled-components'

const HomeCard: React.FC = ({ children }) => (
  <StyledCard>
    {children}
  </StyledCard>
)

const StyledCard = styled.div`
  background: #2c2c2f;
 position: relative;
  border-radius: 12px;
  z-index: 2;
  flex-direction: column;
  width: 330px;
  height: 260px;
  box-shadow: 0 0 7px 2px rgba(39,39,39,0.67);
 
  /*&:hover {
     border: 1px solid #ffe58d;
     box-shadow: 3px 1px 10px #dbb442;
  }*/
  
  @media (max-width: 950px) {
    width: 100%;
   
  }
`

export default HomeCard
