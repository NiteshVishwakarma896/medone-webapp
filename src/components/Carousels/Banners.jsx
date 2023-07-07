import { Box, Image } from '@chakra-ui/react';
import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Banner1 from '../../assets/banner-1.webp';
import Banner2 from '../../assets/banner-2.webp';
import Banner3 from '../../assets/banner-3.webp';
import Banner4 from '../../assets/banner-4.webp';
import Banner5 from '../../assets/banner-5.webp';

export default function Banners() {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };
    return (
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
            <Box w={'100%'}>
                <Image src={Banner1} w={'100%'} p={4} />
            </Box>
            <Box w={'100%'}>
                <Image src={Banner2} w={'100%'} p={4} />
            </Box>
            <Box w={'100%'}>
                <Image src={Banner3} w={'100%'} p={4} />
            </Box>
            <Box w={'100%'}>
                <Image src={Banner4} w={'100%'} p={4} />
            </Box>
            <Box w={'100%'}>
                <Image src={Banner5} w={'100%'} p={4} />
            </Box>
        </Carousel>
    )
}
