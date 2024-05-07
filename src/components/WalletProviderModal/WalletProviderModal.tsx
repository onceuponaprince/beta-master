import React, { useEffect } from 'react'
import styled from 'styled-components'
import {ChainUnsupportedError, useWallet} from 'use-wallet'

import metamaskLogo from '../../assets/img/metamask-fox.svg'
import walletConnectLogo from '../../assets/img/wallet-connect.svg'
import { useToasts } from 'react-toast-notifications'

import Button from '../Button'
import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'
import Spacer from '../Spacer'

import WalletCard from './components/WalletCard'

const WalletProviderModal: React.FC<ModalProps> = ({ onDismiss }) => {

  const { account, connect,error, status } = useWallet()
  const { addToast } = useToasts()

  useEffect(() => {
    if (account) {
      onDismiss()
    }
  }, [account, onDismiss])

  //The wallet returns disconnected state on the first error
  async function handleError() {
    if (status === "error") {
        //default error message
        let msg = error.message;

        //No code for this error
         if( error.name === "ChainUnsupportedError") {
             let parts = error.message.split('.',2);
             msg = "Your wallet is set to the wrong chain! "+parts[parts.length-1];
         }

         //User not logged into Metamask, no Error type just code...
         if (error.code === -32002){
             msg= "Please check your MetaMask for issues!";
         }

        addToast(msg, { appearance: 'error', autoDismiss: true });
    }
  }

  return (
    <Modal>
      <ModalTitle text="" />

        <DisclaimerTextWrapper>
            <DisclaimerText>Project is in beta.</DisclaimerText>
            <DisclaimerText>Use at your own risk.</DisclaimerText>
        </DisclaimerTextWrapper>
      <ModalContent>

        <StyledWalletsWrapper>

          <StyledWalletCard>

            <WalletCard
              icon={<img src={metamaskLogo} style={{ height: 32 }} />}
              onConnect={() => connect('injected').then(handleError)}
              title="MetaMask"
            />
          </StyledWalletCard>
          <Spacer size="sm" />
          <StyledWalletCard>
            <WalletCard
              icon={<img src={walletConnectLogo} style={{ height: 24 }} />}
              onConnect={() => connect('walletconnect')}
              title="WalletConnect"
            />
          </StyledWalletCard>
        </StyledWalletsWrapper>
      </ModalContent>
    <CancelButtonWrapper>
      <ModalActions>
        <Button text="Cancel" variant="secondary" onClick={onDismiss} />
      </ModalActions>
    </CancelButtonWrapper>
    </Modal>
  )
}

const DisclaimerTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DisclaimerText = styled.div`
  color: #bdbdbd;
`;

const CancelButtonWrapper = styled.div`
  width: 50%;
  margin: auto;
  
  @media (max-width: 950px) {
   width: 90%;
  }
`;

const StyledWalletsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 950px) {
    flex-direction: column;
    flex-wrap: none;
    display: block;
  }
`

const StyledWalletCard = styled.div`
  flex-basis: calc(50% - ${props => props.theme.spacing[2]}px);
  width: calc(50% - ${props => props.theme.spacing[2]}px);
  
  @media (max-width: 950px) {
    width: 80%;
    margin: auto;
  }
`

export default WalletProviderModal
