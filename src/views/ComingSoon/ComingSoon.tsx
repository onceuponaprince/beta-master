import React, {useCallback, useState} from 'react'

import Container from '../../components/Container'
import Page from '../../components/Page'
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components";
import AuricLogo from '../../assets/img/auric_darkmode.png'

const ComingSoon: React.FC = ({  }) => {

    return (
        <>


            <Page pageTitle={""} key={'homePage'}>
                <Container>
                    <StyledPageWrapper>
                        <StyledImageWrapper src={AuricLogo} />
                        <StyledTextWrapper>Coming Soon...</StyledTextWrapper>
                    </StyledPageWrapper>

                </Container>
            </Page>
            </>


    )
}

export default ComingSoon

const StyledPageWrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledImageWrapper = styled.img`
  width: 80%;
`;

const StyledTextWrapper = styled.div`
  margin: auto;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;
