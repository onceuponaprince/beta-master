import React, {useCallback, useState} from 'react'

import Container from '../../components/Container'
import Page from '../../components/Page'
import Spacer from '../../components/Spacer'
import 'bootstrap/dist/css/bootstrap.min.css';
import useModal from "../../hooks/useModal";
import WalletProviderModal from "../../components/WalletProviderModal";
import {useWallet} from "use-wallet";
import Audit from "./components/Audit";



const Audits: React.FC = ({  }) => {
    const {account} = useWallet()
    const [onPresentWalletProviderModal] = useModal(<WalletProviderModal/>)
    const [mobileMenu, setMobileMenu] = useState(false)
    const handlePresentMobileMenu = useCallback(() => {
        setMobileMenu(true)
    }, [setMobileMenu])

    return (
        <>


            <Page pageTitle={"View & Download Audits"}  pageKey={"Audits"} key={'homePage'}>
                <Container>

                    <Audit/>
                </Container>

            </Page>
            </>


    )
}

export default Audits

