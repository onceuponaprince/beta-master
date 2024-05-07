import React, { useCallback, useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
    HashRouter
} from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { UseWalletProvider } from 'use-wallet'
import MobileMenu from './components/MobileMenu'
import TopBar from './components/TopBar'
import FarmsProvider from './contexts/Farms'
import ModalsProvider from './contexts/Modals'
import YamProvider from './contexts/YamProvider'
import TransactionProvider from './contexts/Transactions'
import Home from './views/Home'

import theme from './theme'
import Farms from "./views/Farms";
import FAQ from "./views/FAQ";
import MenuBar from "./components/MenuBar";
import StakingSelector from "./views/Staking";
import Audits from "./views/Audits";
import * as THREE from "three";
import ComingSoon from "./views/ComingSoon";

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  return (
    <Providers>

      <HashRouter>
        <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
          <Switch>
              <Route path="/" exact>

                  <div style={{display: "flex"}}>
                      <MenuBar page={'home'} />

                      <Home />
                  </div>

              </Route>
              <Route path="/pools">
                  <MenuBar page={'pools'}/>
                  <Farms />
              </Route>
             <Route path="/comingsoon">
                  <MenuBar />
                  <ComingSoon />
              </Route>
              <Route path="/history">
                  <MenuBar/>
                  <FAQ/>
              </Route>
              <Route path="/audits">
                  <MenuBar page={'audits'}/>
                  <Audits />
              </Route>

          </Switch>
      </HashRouter>
    </Providers>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        chainId={1}
        connectors={{
          walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
        }}
      >
        <YamProvider>
          <TransactionProvider>
              <FarmsProvider>
                <ModalsProvider>

                    {/*<StyledBgEffect id={"container"}/>*/}
                  {children}
                </ModalsProvider>
              </FarmsProvider>
          </TransactionProvider>
        </YamProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}



export default App

const StyledBgEffect = styled.div`
  position: absolute;
  width: calc(100% - 200px);
  height: calc(100vh - 100px);
  left: 45%;
  top: 45%;
  background: linear-gradient(to bottom, #393A3F, #393A3F);
  transform: translate3d(-50%, -40%, 0);
  margin-left: 200px;
  
  @media (max-width: 950px) {
    margin-left: 0;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%
  }
`;
