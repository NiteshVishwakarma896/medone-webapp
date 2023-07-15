import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navigation/Navbar'
import { Avatar, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink,  Container,Text } from '@chakra-ui/react'
import { useGlobalData } from '../../context/GlobalContext'
import { Link } from 'react-router-dom';
import Footer from '../../components/Navigation/Footer';

export default function User() {
    const {globalData} = useGlobalData();
    const [name,setName] = useState(null);
    const [email,setEmail] = useState(null);
    const [phone,setPhone] = useState(null);

    useEffect(()=>{
        if(globalData){
            setName(globalData.name);
            setEmail(globalData.email);
        }
    },[])

    return (
        <React.Fragment>
            <Navbar />
            <Container maxW={'8xl'} pt={'16'} pl={'4'} pr={'4'} pb={'4'} h={'fit-content'}>
                <Breadcrumb mt={'4'}>
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} fontSize={'small'} to='/'>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink as={'p'} fontSize={'small'} >Account</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Box mt={'8'} w={'fit-content'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                    <Avatar name={globalData.name?globalData.name:null} src='https://bit.ly/broken-link' />
                    <Text ml={'2'} color={'gray.700'} fontWeight={'semibold'} fontSize={'xl'}>{globalData.name?globalData.name:null}</Text>
                </Box>
            </Container>
            <Footer />
        </React.Fragment>
    )
}
