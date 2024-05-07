import React from 'react'
import AccountButton from "../../components/TopBar/components/AccountButton";
import { useWallet } from 'use-wallet'
import Staking from "./Staking";
import Page from "../../components/Page";

 const StakingSelector: React.FC = () => {
    const {ethereum} = useWallet()

    if (ethereum === undefined) {
        return (
            <Page pageTitle={"Staking"}>
                <div>
                    <AccountButton />
                </div>
            </Page>
        )
    } else {
        return <Staking/>
    }
}

export default StakingSelector