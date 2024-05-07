import React, {useState, useRef, useEffect} from 'react'
import Page from '../../components/Page'
import Farm from '../Farm'
import FarmCards from './components/FarmCards'
import styled from "styled-components";

import FarmLists from "./components/FarmList";

const Farms: React.FC = () => {
    const [activeFarmID, setActiveFarmID] = useState("")
    const lastActiveRef = useRef("");

    useEffect(()=>{
        lastActiveRef.current = activeFarmID;
        document.getElementById(lastActiveFarmID)?.scrollIntoView({block:"center"})
    })
    const lastActiveFarmID = lastActiveRef.current;

    return (
        <>
            {activeFarmID === "" ? (
                <Page pageKey={'Farms'} pageTitle={"Explore the Pools"}>
                    <FarmCards activateFarm={setActiveFarmID} />
                </Page>
            ) : (
                <Page pageKey={'Farm'}>
                    <Farm farmId={activeFarmID} backToFarms={() => setActiveFarmID("")}/>
                </Page>
            )}
        </>
    )
}

export default Farms
