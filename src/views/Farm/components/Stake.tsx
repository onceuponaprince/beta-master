import React, {useCallback, useEffect, useState} from 'react'
import styled from 'styled-components'

import { Contract } from 'web3-eth-contract'
import BigNumber from 'bignumber.js'

import Button from '../../../components/Button'
import Card from '../../../components/Card'

import Label from '../../../components/Label'
import Value from '../../../components/Value'

import useAllowance from '../../../hooks/useAllowance'
import useApprove from '../../../hooks/useApprove'
import useModal from '../../../hooks/useModal'
import useStake from '../../../hooks/useStake'
import useStakedBalance from '../../../hooks/useStakedBalance'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useUnstake from '../../../hooks/useUnstake'

import { getDisplayBalance } from '../../../utils/formatBalance'


import DepositModal from './DepositModal'
import LoadingButton from "./LoadingButton";
import AccountModal from "../../../components/TopBar/components/AccountModal";
import ConfirmModal from "../../../components/ConfirmModal";
import HomeCard from "../../../components/HomeCard";
import HomeCardContent from "../../../components/HomeCardContent";
import useTokenDecimals from "../../../hooks/useTokenDecimals";


interface StakeProps {
  poolContract: Contract,
  tokenContract: Contract,
  tokenName: string,
  tokenAddress: string,
  icon: string
}

const Stake: React.FC<StakeProps> = ({
  poolContract,
  tokenContract,
  tokenName,
  tokenAddress,
  icon
}) => {

  const [allowance, refreshAllowance] = useAllowance(tokenContract, poolContract);
  const { onApprove } = useApprove(tokenContract, poolContract)


  const tokenBalance = useTokenBalance(tokenContract.options.address)
  let decimals = useTokenDecimals(tokenAddress)
  const [stakedBalance, refreshBalance] = useStakedBalance(poolContract);
  //hack
  const token = tokenName.toLowerCase()
  if(token ==="usdc" || token === "usdt"){
     decimals = 6;
  } else if (token === "wbtc"){
    decimals = 8;
  }

  const { onStake } = useStake(poolContract, tokenName, decimals);
  const { onUnstake } = useUnstake(poolContract, decimals)


  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={onStake}
      onClose={refreshBalance}
      tokenName={tokenName}
      operation="Stake"
      decimals={decimals}
    />
  )

  const [onPresentWithdraw] = useModal(
    <DepositModal
      max={stakedBalance}
      onConfirm={onUnstake}
      onClose={refreshBalance}
      tokenName={tokenName}
      operation="Unstake"
      decimals={decimals}
    />
  )

  return (
    <HomeCard>
      <HomeCardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <StyledIconContainer width={100} height={100} src={icon} style={{marginBottom: -20}}/>
            <Value value={getDisplayBalance(stakedBalance, decimals)} />
            <Label text={`${tokenName.replace(' SECONDARY','')} Token Staked`} />
          </StyledCardHeader>
          <StyledCardActions>
            {(!allowance.toNumber() && token === 'auscm-eth secondary' && tokenBalance.toNumber() > 0) ? (
              <LoadingButton
                onClick={onApprove}
                defaultText={`Approve`}
                loadingText="Approving..."
                onSuccess={refreshAllowance}
              />
            ) : (
                token !== 'auscm-eth secondary' ? <StyledText>Unavailable</StyledText> : (
              <>
                {tokenBalance.toNumber() > 0 &&
                <Button text="Stake" onClick={onPresentDeposit}/>
                }
                {stakedBalance.toNumber() > 0 ? (
                    <>
                      <StyledActionSpacer />
                      <Button text="Unstake" onClick={onPresentWithdraw}/>
                    </>
                ) : (tokenBalance.toNumber() <= 0 && <StyledText>No available balance</StyledText> ) }
             </>
               )
            )}
          </StyledCardActions>
        </StyledCardContentInner>
      </HomeCardContent>
    </HomeCard>
  )
}

const StyledText =  styled.div`
  color: ${props => props.theme.color.grey[200]};
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin-top: 10px; 
`
const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.spacing[4]}px;
  margin-bottom: ${props => props.theme.spacing[2]}px;
  width: 100%;
`

const StyledActionSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
  width: ${props => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
`

const StyledIconContainer = styled.img``;
export default Stake
