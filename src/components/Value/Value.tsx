import React from 'react'

import styled from 'styled-components'

interface ValueProps {
  value: string,
}

const Value: React.FC<ValueProps> = ({ value }) => {
  return (
    <StyledValue>{value}</StyledValue>
  )
}

const StyledValue = styled.div`
  color: ${props => props.theme.color.grey[200]};
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin-top: 20px;
  
`

export default Value
