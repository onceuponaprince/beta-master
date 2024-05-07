import React from 'react'
import styled from 'styled-components'

import { Contract } from 'web3-eth-contract'

import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Value from '../../../components/Value'

import useEarnings from '../../../hooks/useEarnings'
import useReward from '../../../hooks/useReward'

import { getDisplayBalance } from '../../../utils/formatBalance'
import LoadingButton from "./LoadingButton";
import logo from '../../../assets/img/coins/auscm_coin.png';

import HomeCard from "../../../components/HomeCard";
import HomeCardContent from "../../../components/HomeCardContent";

interface HarvestProps {
  poolContract: Contract
}

const Harvest: React.FC<HarvestProps> = ({ poolContract }) => {

  const [earnings, refreshEarnings] = useEarnings(poolContract)
  const { onReward } = useReward(poolContract)

  return (
    <HomeCard>
      <HomeCardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <img src={logo} width={100} height={100} style={{ marginBottom: -20}}/>
            <Value value={getDisplayBalance(earnings)} />
            <Label text="AUSCM earned" />
          </StyledCardHeader>
          <StyledCardActions>
            <LoadingButton onClick={onReward} defaultText="Mine" loadingText="Mining..." onSuccess={refreshEarnings} disabled={!earnings.toNumber()} />
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
  margin-top: ${props => props.theme.spacing[4]}px;
  margin-bottom: ${props => props.theme.spacing[2]}px;
  width: 100%;
`

/*const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
  width: ${props => props.theme.spacing[4]}px;
`*/

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
`

export default Harvest
