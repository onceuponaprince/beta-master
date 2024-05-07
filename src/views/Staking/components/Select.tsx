import React, {useCallback, useEffect, useState} from 'react'
import styled from 'styled-components'

import { Contract } from 'web3-eth-contract'
import BigNumber from 'bignumber.js'

import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import { AddIcon, RemoveIcon } from '../../../components/icons'
import IconButton from '../../../components/IconButton'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import EthIcon from '../../../assets/img/eth-diamond-purple.png'

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
import logo from "../../../assets/img/auric_icon.png";
import LogoGif from '../../../assets/img/auric_AUSCM2.gif'
import HomeCard from "../../../components/HomeCard";
import HomeCardContent from "../../../components/HomeCardContent";

const Select: React.FC = ({
}) => {


  return (
      <HomeCard>
        <HomeCardContent>
          <StyledCardContentInner>
            <StyledCardHeader>
              <img src={LogoGif} width={58} height={58} style={{borderRadius: 150}}/>
              <Value value={'0.000'} />
              <Label text="AUSCM Available" />
            </StyledCardHeader>
            <StyledCardActions>
              <Button onClick={null} text="Select" />
            </StyledCardActions>
          </StyledCardContentInner>
        </HomeCardContent>
      </HomeCard>
  )
}

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.spacing[1]}px;
  //margin-bottom: ${props => props.theme.spacing[2]}px;
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
export default Select
