import React, {useCallback, useState} from 'react'

import Container from '../../components/Container'
import Page from '../../components/Page'
import Spacer from '../../components/Spacer'

import Balances from './components/Balances'

import 'bootstrap/dist/css/bootstrap.min.css';
import useModal from "../../hooks/useModal";
import WalletProviderModal from "../../components/WalletProviderModal";
import {useWallet} from "use-wallet";
import Footer from "../../components/Footer";



const Home: React.FC = ({  }) => {
    const {account} = useWallet()
    const [onPresentWalletProviderModal] = useModal(<WalletProviderModal/>)
    const [mobileMenu, setMobileMenu] = useState(false)
    const handlePresentMobileMenu = useCallback(() => {
        setMobileMenu(true)
    }, [setMobileMenu])

    return (
        <>

            <Page pageKey={"homePage"} >
                <Container>
                    <Spacer size="lg"/>
                    <Balances/>
                </Container>


            </Page>

            </>


    )
}

export default Home

