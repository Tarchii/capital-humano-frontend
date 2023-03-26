import React from 'react'
import styled from 'styled-components';
import AppLayout from '../../components/layout/AppLayout'

const Areas = () => {
    return (
        <AppLayout>
            <Container>
                <PageTitle>
                    Áreas
                </PageTitle>
            </Container>
        </AppLayout>
    )
}

const Container = styled.div`
display: flex;
align-items: center;
`;

const PageTitle = styled.h1`
font-size: 20px;
font-weight: bolder;
padding: 10px;
`;

export default Areas;