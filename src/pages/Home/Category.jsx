import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navigation/Navbar'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container, Grid, GridItem } from '@chakra-ui/react'
import { Link, ScrollRestoration } from 'react-router-dom'
import Footer from './../../components/Navigation/Footer';
import CategoryMobile from '../../components/Cards/CategoryMobile';
import { apiUrl } from '../../utils/url';

export default function Category() {
    const [data,setData] = useState([]);
    const getCategories = ()=>{
        fetch(apiUrl+"/categories")
        .then((res)=>res.json())
        .then((data)=>{
          if(data.data.length>0){
              setData(data.data);
          }
        })
    }
    useEffect(() => {
        getCategories();
    }, [])
    return (
        <React.Fragment>
            <Navbar/>
            <Container maxW={'8xl'} pt={'16'} pl={'4'} pr={'4'} pb={'4'} h={'fit-content'}>
                <Breadcrumb mt={'4'}>
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} fontSize={'small'} to='/'>Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink as={Link} fontSize={'small'} to='/categories'>Categories</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Box p={'2'} w={'100%'}>
                    <Grid gridTemplateColumns={{base:'repeat(3, 1fr)',lg:'repeat(8, 1fr)'}} gap={2}>
                        {
                            data && data.length>0?(
                                data.map((e,i)=>(
                                    <GridItem w='100%' borderRadius={'md'}>
                                        <CategoryMobile text={e.category_name} image={e.category_image} />
                                    </GridItem>
                                ))
                            ):null
                        }
                    </Grid>
                </Box>
            </Container>
            <Footer />
            <ScrollRestoration />
        </React.Fragment>
    )
}
