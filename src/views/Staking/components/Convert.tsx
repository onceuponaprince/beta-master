import React from 'react'
import styled from 'styled-components'

import { Contract } from 'web3-eth-contract'

import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'

import useEarnings from '../../../hooks/useEarnings'
import useReward from '../../../hooks/useReward'

import { getDisplayBalance } from '../../../utils/formatBalance'
import LoadingButton from "./LoadingButton";
import logo from '../../../assets/img/auric_icon.png'
import LogoGif from '../../../assets/img/auric_AUSCM2.gif'
import HomeCard from "../../../components/HomeCard";
import HomeCardContent from "../../../components/HomeCardContent";



const Convert: React.FC = ({  }) => {
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

            <Button onClick={null} text="Convert to AUSCM" />
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

const StyledSpacer = styled.div`
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

export default Convert
