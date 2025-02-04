import React from 'react'
import styled from 'styled-components'

export interface InputProps {
  endAdornment?: React.ReactNode,
  onChange: (e: React.FormEvent<HTMLInputElement>) => void,
  placeholder?: string,
  startAdornment?: React.ReactNode,
  value: string,
}

const Input: React.FC<InputProps> = ({
  endAdornment,
  onChange,
  placeholder,
  startAdornment,
  value,
}) => {
  return (
    <StyledInputWrapper>
      {!!startAdornment && startAdornment}
      <StyledInput placeholder={placeholder} value={value} onChange={onChange} />
      {!!endAdornment && endAdornment}
    </StyledInputWrapper>
  )
}

const StyledInputWrapper = styled.div`
  align-items: center;
  /*background-color: ${props => props.theme.color.grey[200]};*/
  background-color:#373737;
  border-radius: ${props => props.theme.borderRadius}px;
  /*box-shadow: inset 4px 4px 8px ${props => props.theme.color.grey[300]},
    inset -6px -6px 12px ${props => props.theme.color.grey[100]};*/
  display: flex;
  height: 60px;
  padding: 0 ${props => props.theme.spacing[3]}px;
  border: 1px solid #212529;
  
  
  
`

const StyledInput = styled.input`
  background: none;
  border: 0;
  color: ${props => props.theme.color.white};
  font-size: 18px;
  flex: 1;
  height: 56px;
  margin: 0;
  padding: 0;
  outline: none;
  @media (max-width: 950px) {
 
    max-width: 45%;
   
  }
`

export default Input
