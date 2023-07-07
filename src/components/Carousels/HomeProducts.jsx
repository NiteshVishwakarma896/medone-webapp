import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductCard from '../Cards/ProductCard';
import { Box, Text } from '@chakra-ui/react';
import { apiUrl } from './../../utils/url';

export default function HomeProducts(props) {
    const [data,setData] = useState([]);

    const getProducts = ()=>{
        fetch(apiUrl+"/products")
        .then((res)=>res.json())
        .then((data)=>{
          if(data.data.length>0){
              setData(data.data);
          }
        })
    }
    useEffect(() => {
        getProducts();
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
        <Box w={'100%'} p={'4'}>
            <Text fontSize={'xl'} fontWeight={'semibold'} mb={'2'}>{props.title}</Text>
            <Text fontSize={'small'} color={'gray.500'} fontWeight={'normal'} mb={'6'}>{props.description}</Text>
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
                            <ProductCard key={i} id={e._id} text={e.product_name} image={e.product_image} discount={e.product_discount} mrp={e.product_mrp} />
                        ))
                    ):null
                }
            </Carousel>
        </Box>
    )
}
