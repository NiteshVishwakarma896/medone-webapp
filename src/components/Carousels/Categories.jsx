import React, { useState , useEffect } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Category from '../Cards/Category';
import { Box, Button, Grid, GridItem, HStack, Skeleton, Text } from '@chakra-ui/react';
import CategoryMobile from '../Cards/CategoryMobile';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from './../../utils/url';

export default function Categories() {
    const navigate = useNavigate();
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
    
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 7
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 4
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2
        }
    };
    return (
        <Box w={'100%'} p={'2'} >
            <Box mb={'6'} w={'95%'} mt={'2'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Text fontSize={'xl'} fontWeight={'semibold'} >Shop by categories</Text>
                <Button className='mobile-hide' onClick={()=>navigate('/categories')} w={'fit-content'} size={'sm'} colorScheme='teal' variant='outline'>
                    View all
                </Button>
            </Box>
            <Box className='mobile-hide'>
            {
                data.length>0?(
                    <Carousel
                        swipeable={true}
                        draggable={true}
                        showDots={false}
                        responsive={responsive}
                        ssr={true}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={4000}
                        transitionDuration={500}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                    >
                        {
                            data?(
                                data.map((e,i)=>(
                                    <Category key={i} text={e.category_name} image={e.category_image} />
                                ))
                            ):(
                            null
                            )
                        }
                    </Carousel>
                ):(
                    <HStack w={'100%'} height={'100px'}>
                        <Skeleton w={'10%'} height={'120px'} />
                        <Skeleton w={'10%'} height={'120px'} />
                        <Skeleton w={'10%'} height={'120px'} />
                        <Skeleton w={'10%'} height={'120px'} />
                        <Skeleton w={'10%'} height={'120px'} />
                        <Skeleton w={'10%'} height={'120px'} />
                        <Skeleton w={'10%'} height={'120px'} />
                        <Skeleton w={'10%'} height={'120px'} />
                        <Skeleton w={'10%'} height={'120px'} />
                    </HStack>
                )
            }
            </Box>
            <Box className='desktop-hide' >
                {
                    data.length>0?(
                        <Grid gridTemplateColumns='repeat(3, 1fr)' gap={2}>
                            {
                                data && data?(
                                    data.map((e,i)=>(
                                        <GridItem key={i} w='100%' borderRadius={'md'}>
                                            <CategoryMobile text={e.category_name} image={e.category_image} />
                                        </GridItem>
                                    ))
                                ):null
                            }
                        </Grid>
                    ):(
                        <Grid gridTemplateColumns='repeat(3, 1fr)' gap={2}>
                            <Skeleton w={'100%'} height={'120px'} />
                            <Skeleton w={'100%'} height={'120px'} />
                            <Skeleton w={'100%'} height={'120px'} />
                            <Skeleton w={'100%'} height={'120px'} />
                            <Skeleton w={'100%'} height={'120px'} />
                            <Skeleton w={'100%'} height={'120px'} />
                            <Skeleton w={'100%'} height={'120px'} />
                            <Skeleton w={'100%'} height={'120px'} />
                            <Skeleton w={'100%'} height={'120px'} />
                        </Grid>
                    )
                }
                <Button onClick={()=>navigate('/categories')} w={'100%'} mt={'8'} colorScheme='teal' variant='outline'>
                    View all categories
                </Button>
            </Box>
        </Box>
    )
}
