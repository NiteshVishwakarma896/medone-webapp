import React from 'react'
import Footer from '../../components/Navigation/Footer'
import Navbar from '../../components/Navigation/Navbar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container, Flex, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import NoOffers from '../../assets/no-offers.gif';

export default function Offers() {
  return (
    <React.Fragment>
        <Navbar />
        <Container maxW={'8xl'} pt={'16'} pl={'4'} pr={'4'} pb={'4'} h={'fit-content'}>
            <Breadcrumb mt={'4'}>
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} fontSize={'small'} to='/'>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink as={'p'} fontSize={'small'} >Offers</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Flex w={'100%'} h={'450px'} direction={'column'} alignItems={'center'} mt={'auto'} mb={'auto'} justifyContent={'center'}>
                <Image src={NoOffers} objectFit={'contain'}/>
                <Text fontSize={'xl'}>No offers for now comeback later...</Text>
                <Text color={'gray.500'} mt={'2'} fontSize={'sm'}>We are working to bring good offers for you...</Text>
            </Flex>
        </Container>
        <Footer/>
    </React.Fragment>
  )
}
