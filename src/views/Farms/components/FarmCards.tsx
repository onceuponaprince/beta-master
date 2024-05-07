import React, { useCallback, useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Countdown, { CountdownRenderProps} from 'react-countdown'
import { useWallet } from 'use-wallet'

import Button from '../../../components/Button'
import CardIcon from '../../../components/CardIcon'
import Spacer from '../../../components/Spacer'

import useFarms from '../../../hooks/useFarms'
import useYam from '../../../hooks/useYam'
import { Farm } from '../../../contexts/Farms'

import { bnToDec } from '../../../utils'
import { getEarned, getPoolStartTime } from '../../../yamUtils'


import Icon from '../../../assets/img/auric_icon.png';
import auscm_coin from '../../../assets/img/coins/auscm_coin.png';
import Eth from '../../../assets/img/eth-diamond-purple.png'
import AccountButton from "../../../components/TopBar/components/AccountButton";
import HomeCard from "../../../components/HomeCard";
import HomeCardContent from "../../../components/HomeCardContent";
import useCalulateApy from "../../../hooks/useCalculateApy";
import useEarnings from "../../../hooks/useEarnings";
import useStakedBalance from "../../../hooks/useStakedBalance";
import LoadingButton from "../../Farm/components/LoadingButton";
import useRedeem from "../../../hooks/useRedeem";

interface FarmCardsProps {
  activateFarm: React.Dispatch<React.SetStateAction<string>>,
}

const FarmCards: React.FC<FarmCardsProps> = (Props) => {
  const [farms] = useFarms()
  const { account } = useWallet()

  const threeX = farms.filter((farm) => farm.category === '3x');

  const threeXRows = threeX.reduce<Farm[][]>((farmRows, farm) => {
    const newFarmRows = [...farmRows]
    if (newFarmRows[newFarmRows.length - 1].length === 3) {
      newFarmRows.push([farm])
    } else {
      newFarmRows[newFarmRows.length - 1].push(farm)
    }
    return newFarmRows
  }, [[]])

  const base = farms.filter((farm) => farm.category === 'base');

  const baseRows = base.reduce<Farm[][]>((farmRows, farm) => {
    const newFarmRows = [...farmRows]
    if (newFarmRows[newFarmRows.length - 1].length === 3) {
      newFarmRows.push([farm])
    } else {
      newFarmRows[newFarmRows.length - 1].push(farm)
    }
    return newFarmRows
  }, [[]])

  const lp = farms.filter((farm) => farm.category === 'lp');

  const lpRows = lp.reduce<Farm[][]>((farmRows, farm) => {
    const newFarmRows = [...farmRows]
    if (newFarmRows[newFarmRows.length - 1].length === 3) {
      newFarmRows.push([farm])
    } else {
      newFarmRows[newFarmRows.length - 1].push(farm)
    }
    return newFarmRows
  }, [[]])


  return (
    <StyledCards>
      {!!threeXRows[0].length && <StyledCategoryTitle>3x Rewards</StyledCategoryTitle>}
      {!!threeXRows[0].length ? threeXRows.map((farmRow, i) => (
        <StyledRow key={i}>
          {farmRow.map((farm, j) => (
            <React.Fragment key={j}>

                <FarmCard farm={farm} activateFarm={Props.activateFarm} />
                {(j === 0 || j === 1) && <StyledSpacer />}

            </React.Fragment>

          ))}
        </StyledRow>
      )) : (
          <StyledMarginWrapper>
            <StyledLoadingWrapper>
              <AccountButton/>
            </StyledLoadingWrapper>
          </StyledMarginWrapper>
        )
      }

      {!!baseRows[0].length && <StyledCategoryTitle>Base Assets</StyledCategoryTitle>}
      {baseRows && baseRows.map((farmRow, i) => (
          <StyledRow key={i}>
            {farmRow.map((farm, j) => (
                <React.Fragment key={j}>

                  <FarmCard farm={farm} activateFarm={Props.activateFarm}/>
                  {(j === 0 || j === 1) && <StyledSpacer/>}

                </React.Fragment>

            ))}
          </StyledRow>
      ))
      }

      {!!lpRows[0].length && <StyledCategoryTitle>LP</StyledCategoryTitle>}
      {lpRows && lpRows.map((farmRow, i) => (
          <StyledRow key={i}>
            {farmRow.map((farm, j) => (
                <React.Fragment key={j}>

                  <FarmCard farm={farm} activateFarm={Props.activateFarm}/>
                  {(j === 0 || j === 1) && <StyledSpacer/>}

                </React.Fragment>

            ))}
          </StyledRow>
      ))
      }


    </StyledCards>
  )
}

interface FarmCardProps {
  farm: Farm,
  activateFarm: React.Dispatch<React.SetStateAction<string>>,
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, activateFarm }) => {
  const [startTime, setStartTime] = useState(0)
  const [harvestable, setHarvestable] = useState(0)
  const [opInProgress, setOpInProgress] = useState(false)
  const [mouseOver, setMouseOver] = useState(false);
  const [earnings, refreshEarnings] = useEarnings(farm.contract)
  const [stakedBalance, refreshBalance] = useStakedBalance(farm.contract);
  const { onRedeem } = useRedeem(farm.contract)


  const [apy, refreshApy] = useCalulateApy(farm.stakingTokenContract, farm.contract)

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
      <div onMouseOver={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)} id={farm.id}>
    <StyledCardWrapper>

        {mouseOver? <StyledCardAccent /> : null}

      <HomeCard >
        <HomeCardContent>
          <StyledContent>
            <IconContainer>
              <CardIconBigger><StyledIcon src={farm.icon} /></CardIconBigger>
            </IconContainer>
            <IconText>{farm.depositToken}</IconText>

            {!isNaN(apy) ? (
              <StyledHarvestable>
                {apy.toFixed(2)}% APR
              </StyledHarvestable>
            ) :
                <StyledHarvestable>Mining finished!</StyledHarvestable>
            }


            <StyledContentHorizontal>
              {!opInProgress &&
                <>
                    <Button
                        disabled={!poolActive}
                        text={poolActive ? 'Select' : undefined}
                        onClick={() => activateFarm(farm.id)}
                    />
                </>
              }

            {earnings.isGreaterThan(0) && stakedBalance.isGreaterThan(0) && (
                <>
                  <Spacer size='sm'/>
                  <LoadingButton defaultText='Collect' loadingText='Collecting'
                     onClick={() => {
                       setOpInProgress(true);
                       return onRedeem();
                     }}
                     onFinished={() => {
                       setOpInProgress(false)
                       refreshEarnings()
                     } }
                   />
                 </>
            )}
            </StyledContentHorizontal>

          </StyledContent>
        </HomeCardContent>
      </HomeCard>

    </StyledCardWrapper>
    </div>
  )
}

const StyledCategoryTitle = styled.div`
  position: relative;
  color: #fff;
  padding: 20px 0;
  font-weight: bold;
  font-size: 20px;
`;

const CardIconBigger = styled.div`
  width: 100px;
  height: 100px;
`

const IconText = styled.div`
  color: #F0E7EA;
  font-size: 13px;
  text-align: center;
  margin-top: 5px;
`;

const StyledText = styled.div`
  color: #F0E7EA;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledIcon = styled.img`
  width: 100%;
  height: 100%;
`;

const RainbowLight = keyframes`
  
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
background: linear-gradient(
    45deg,
    rgba(195, 169, 49, 1) 0%,
    rgb(39,39,39) 10%,
    rgba(195, 169, 49, 1) 20%,
    rgba(195, 169, 49, 1) 30%,
    rgb(39,39,39) 40%,
    rgba(195, 169, 49, 1) 50%,
    rgba(195, 169, 49, 1) 60%,
    rgb(39,39,39) 70%,
    rgba(195, 169, 49, 1) 80%,
    rgba(195, 169, 49, 1) 90%,
    rgba(195, 169, 49, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 4s linear infinite;
  border-radius: 12px;
  filter: blur(4px);
  position: absolute;
  
  z-index: 1;
 
  top: -2px; right: -2px; bottom: -2px; left: -2px;
  

`


const StyledCards = styled.div`
  /*width: 900px;*/
  @media (max-width: 950px) {
    width: 100%;
  }
 
`

const StyledLoadingWrapper = styled.div`
  margin: auto;
  width: 160px;
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
   @media (max-width: 950px) {
    margin: 100px;
  }
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 950px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${props => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
  margin-bottom: 20px;
  @media (max-width: 950px) {
    margin-bottom: 0;
  }
  
`

const StyledTitle = styled.h4`
  color: ${props => props.theme.color.grey[600]};
  font-size: 24px;
  font-weight: 700;
  margin: ${props => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 90%;
`

const StyledContentHorizontal = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  width: 95%;
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
  height: 36px;
  margin-top: 13px;
  text-align: center;
`

const StyledMarginWrapper = styled.div`
  margin-left: 50px;
  margin-bottom: 140px;
  @media (max-width: 950px) {
    margin-left: 0;
  }
`;
export default FarmCards
