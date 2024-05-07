import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import { rewardToken as rewardAddress } from '../../../constants/tokenAddresses'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getDisplayBalance } from '../../../utils/formatBalance'

import Button from '../../Button'
import CardIcon from '../../CardIcon'
import Label from '../../Label'
import Modal, { ModalProps } from '../../Modal'
import ModalActions from '../../ModalActions'
import ModalContent from '../../ModalContent'
import ModalTitle from '../../ModalTitle'
import Separator from '../../Separator'
import Spacer from '../../Spacer'
import Value from '../../Value'
import logo from '../../../assets/img/auric_logo.png'

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {

  const { account, reset } = useWallet()

  const handleSignOutClick = useCallback(() => {
    onDismiss!()
    reset()
  }, [onDismiss, reset])

  const rewardBalance = useTokenBalance(rewardAddress)


  return (
      <StyledModalWrapper>
        <Modal>
          <ModalTitle text="My Balance" />
          <ModalContent>

            <div style={{ display: 'flex' }}>
              <StyledBalanceWrapper>
                {/* <img src={logo}  width={80}/>*/}
                <StyledBalance>
                  <Label text="Your AUSCM Balance" />
                  <Value value={getDisplayBalance(rewardBalance, 18)} />
                </StyledBalance>
              </StyledBalanceWrapper>
            </div>

            <Spacer />
            <Button
                href={`https://etherscan.io/address/${account}`}
                text="Go to Etherscan"
                variant="secondary"
            />
            <Spacer />
            <Button
                onClick={handleSignOutClick}
                text="Sign out"
                variant="secondary"
            />

            <CancelButtonWrapper>
              <ModalActions>
                <Button onClick={onDismiss} text="Cancel" />
              </ModalActions>
            </CancelButtonWrapper>
          </ModalContent>

        </Modal>
      </StyledModalWrapper>
  )
}
const CancelButtonWrapper = styled.div``;
const StyledModalWrapper = styled.div`
  border-radius: 12px;
  border: 1px solid #ffe58d;
   box-shadow: 3px 1px 10px #dbb442;
   width: 100%;
   max-width: 512px;
   @media (max-width: 950px) {
    width: 95%;
  }
  z-index: 100;
`;

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: ${props => props.theme.spacing[4]}px;
`


export default AccountModal
