import React, { useCallback } from 'react'
import styled from 'styled-components'

import { useWallet } from 'use-wallet'

import useModal from '../../../hooks/useModal'

import WalletProviderModal from '../../WalletProviderModal'

import AccountModal from './AccountModal'
import AccButton from "../../AccButton";

interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = (props) => {

  const [onPresentAccountModal] = useModal(<AccountModal />)
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />, 'provider')

  const { account } = useWallet()

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])

  return (
    <StyledAccountButton>
      {!account ? (
        <AccButton
          onClick={handleUnlockClick}
          size="sm"
          text="Connect Wallet"
          variant={"before"}
        />
      ) : (
        <AccButton
            variant={"secondary"}
          onClick={onPresentAccountModal}
          size="sm"
          text={`${account.substr(0,6)}...${account.substr(account.length-4)}`}
        />
      )}
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div`
  z-index: 9;
  width: 100%;
`

export default AccountButton
