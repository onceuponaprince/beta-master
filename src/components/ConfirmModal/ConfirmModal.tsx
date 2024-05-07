import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'


import Button from '../Button'

import Label from '../Label'
import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'
import Separator from '../Separator'
import Spacer from '../Spacer'
import Value from '../Value'
import MetaIcon from '../../assets/img/metamask-fox.svg'


const ConfirmModal: React.FC<ModalProps> = ({ onDismiss }) => {

  const { account, reset } = useWallet()

  const handleSignOutClick = useCallback(() => {
    onDismiss!()
    reset()
  }, [onDismiss, reset])



  return (
    <StyledModalWrapper>
      <Modal>

        <ModalContent>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={MetaIcon} width={100} />
          </div>

          <Spacer />
        </ModalContent>
        <ModalTitle text="Confirm transaction in wallet." />
      </Modal>
    </StyledModalWrapper>
  )
}

const StyledModalWrapper = styled.div`

  box-shadow: 0 0 7px 2px rgba(39,39,39,0.67);
  border-radius: 10px;
   min-width: 500px;
   min-height: 300px;  
   background-color: #2e2f33;
   margin-left: 50px;
   
   @media (max-width: 950px) {
    min-width: 90%;
   
  }
`;


export default ConfirmModal
