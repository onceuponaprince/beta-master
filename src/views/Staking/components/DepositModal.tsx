import React, { useCallback, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'

import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalTitle from '../../../components/ModalTitle'
import TokenInput from '../../../components/TokenInput'

import { getFullDisplayBalance } from '../../../utils/formatBalance'
import LoadingButton from "./LoadingButton";
import styled from "styled-components";

interface DepositModalProps extends ModalProps {
  max: BigNumber,
  onConfirm: (amount: string) => Promise<boolean>,
  onClose: ()=>void,
  tokenName?: string,
  operation: string,
}

const DepositModal: React.FC<DepositModalProps> = ({ max, onConfirm,onClose, onDismiss, tokenName = '' , operation}) => {
  const [val, setVal] = useState('')

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setVal(e.currentTarget.value)
  }, [setVal])

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

    function onFinish(){
        onDismiss();
        if(onClose)
            onClose();
    }

    function isValueValid() : boolean {
      let value = parseFloat(val);
      if(isNaN(value) || value <= 0)
          return false;
      return true;
  }


  return (
      <StyledModalWrapper>
        <Modal>
         {/*<ModalTitle text={`${operation} ${tokenName}`} />*/}
         <ModalTitle text={`${operation}`} />

          <TokenInput
            value={val}
            onSelectMax={handleSelectMax}
            onChange={handleChange}
            max={fullBalance}
            symbol={tokenName}
          />
          <ModalActions>
            <LoadingButton onClick={()=>onConfirm(val)} onSuccess={onFinish} defaultText={`${operation}`} loadingText={"Confirming"} disabled={!isValueValid()}/>
            <Button text="Cancel" variant="secondary" onClick={onFinish} />

          </ModalActions>
        </Modal>
      </StyledModalWrapper>
  )
}

const StyledModalWrapper = styled.div`
  
  border: 1px solid #ffe58d;
  box-shadow: 3px 1px 10px #dbb442;
  min-width: 500px;   
  
`;
export default DepositModal
