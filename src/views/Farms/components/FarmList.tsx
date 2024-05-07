import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Countdown, { CountdownRenderProps} from 'react-countdown'
import { useWallet } from 'use-wallet'

import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Loader from '../../../components/Loader'
import Spacer from '../../../components/Spacer'
import useFarms from '../../../hooks/useFarms'
import useYam from '../../../hooks/useYam'
import { Farm } from '../../../contexts/Farms'

import { bnToDec } from '../../../utils'
import { getEarned, getPoolStartTime } from '../../../yamUtils'
import { Link } from 'react-router-dom'

import Icon from '../../../assets/img/auric_icon.png'
import Eth from '../../../assets/img/eth-diamond-purple.png'
import AccountButton from "../../../components/TopBar/components/AccountButton";

interface FarmListProps {
  activateFarm: React.Dispatch<React.SetStateAction<string>>,
}

const FarmLists: React.FC<FarmListProps> = (Props) => {
  const [farms] = useFarms()
  const { account } = useWallet()
  const rows = farms.reduce<Farm[][]>((farmRows, farm) => {
    const newFarmRows = [...farmRows]
    if (newFarmRows[newFarmRows.length - 1].length === 3) {
      newFarmRows.push([farm])
    } else {
      newFarmRows[newFarmRows.length - 1].push(farm)
    }
    return newFarmRows
  }, [[]])

  return (
    <StyledWrapper>

      {!!rows[0].length ?
          <StyledTitleWrapper>
            <StyledTitle>#</StyledTitle>
            <StyledTitle>Available Pool</StyledTitle>
            <StyledTitle>Ticker</StyledTitle>
            <StyledTitle>Liquidity</StyledTitle>
            <StyledTitle>APY</StyledTitle>
            <StyledTitle></StyledTitle>
            <StyledTitle></StyledTitle>
          </StyledTitleWrapper>
          :
          null
      }

      {!!rows[0].length ? rows.map((farmRow, i) => (
        <StyledRow key={i}>
          {farmRow.map((farm, j) => (
            <React.Fragment key={j}>
              <FarmList index={j + 1} farm={farm} activateFarm={Props.activateFarm} />
              {(j === 0 || j === 1) && <StyledSpacer />}
            </React.Fragment>
          ))}
        </StyledRow>
      )) : (
          <StyledLoadingWrapper>
            <AccountButton/>
          </StyledLoadingWrapper>
        )}
    </StyledWrapper>
  )
}

interface FarmCardProps {
  farm: Farm,
  activateFarm: React.Dispatch<React.SetStateAction<string>>,
  index: number
}

const FarmList: React.FC<FarmCardProps> = ({ farm, activateFarm, index }) => {
  const [startTime, setStartTime] = useState(0)
  const [harvestable, setHarvestable] = useState(0)

  const { contract } = farm
  const { account } = useWallet()
  const yam = useYam()

  const getStartTime = useCallback(async () => {
    const startTime = await getPoolStartTime(farm.contract)
    setStartTime(startTime)
  }, [farm, setStartTime])

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%' }}>{paddedHours}:{paddedMinutes}:{paddedSeconds}</span>
    )
  }

  useEffect(() => {
    if (farm && farm.id === 'ycrv_yam_uni_lp') {
      getStartTime()
    }
  }, [farm, getStartTime])

  useEffect(() => {
    async function fetchEarned () {
      const earned = await getEarned(yam, contract, account)
      setHarvestable(bnToDec(earned))
    }
    if (yam && account) {
      fetchEarned()
    }
  }, [yam, contract, account, setHarvestable])

  const poolActive = startTime * 1000 - Date.now() <= 0
  return (
    <StyledListWrapper>
     {/* {farm.id === 'ycrv_yam_uni_lp' && (
        <StyledCardAccent />
      )}*/}

        <StyledContent>
          {index}
        </StyledContent>
        <StyledContent>{farm.name}</StyledContent>
        <StyledContent></StyledContent>
        <StyledContent></StyledContent>
        <StyledContent></StyledContent>
        <StyledContent></StyledContent>
        <StyledContent></StyledContent>
        <StyledContent>
          <StyledLinkButton onClick={() => activateFarm(farm.id)}>+</StyledLinkButton>
        </StyledContent>

        <Spacer/>

    </StyledListWrapper>
  )
}

const StyledLinkButton = styled.button`
  background: #dbb442;
  color: #272727;
  align-items: center;

  border: 0;
  border-radius: 12px;
  box-shadow: 2px 2px 2px 2px #000;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 36px;
  justify-content: center;
  outline: none;
  padding-left: 15px;
  padding-right: 15px;
  position: absolute;
  right: 10px;
  bottom: 5px;
 
  &:hover {
    background-color: ${props => props.theme.color.grey[100]};
  }
`;
const StyledWrapper = styled.div`
  background: #2e2f33;
  border-radius: 5px;

  
`;

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  border-radius: 12px;
  filter: blur(4px);
  position: absolute;
  top: -2px; right: -2px; bottom: -2px; left: -2px;
  z-index: -1;
`

const StyledCards = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
  }
 
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing[4]}px;
  flex-flow: row wrap;
 
 justify-content: center;
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledListWrapper = styled.div`
  display: flex;
  width: 99%;
  position: relative;
  background: #272727;
  justify-content: space-around;
  border-radius: 5px;
  padding: 10px;
`

const StyledTitleWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 15px;
`;
const StyledTitle = styled.h4`
  color: #F0E7EA;
  font-size: 15px;
  font-weight: 700;
  margin: ${props => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  color: #F0E7EA;
`

const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
  width: ${props => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  margin-top: ${props => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: ${props => props.theme.color.grey[500]};
`

const StyledHarvestable = styled.div`
  //color: ${props => props.theme.color.secondary.main};
  color: #F0E7EA;
  font-size: 16px;
  height: 48px;
  text-align: center;
`

export default FarmLists
