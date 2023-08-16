import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import AppLayout from '../../components/layout/AppLayout';
import axios from '../../config/axios';

const ObraSocial = () => {
    const [data,setData]= useState([])
    const getData = async ()=>{
        try {
            const info = await axios.get('/obraSocial')
            setData(info.data.obraSociales)
         
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(()=>{
    
            getData()
        
    
    },[])
    return (
        <AppLayout>
            <Container>
                <PageTitle>
                    Obras Sociales
                    {data.length > 0 && data.map((user,index)=>(
                        <p>{user.nombre.toUpperCase()}</p>
                    ))
                    }
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

export default ObraSocial;