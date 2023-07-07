import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Category1 from '../../assets/category-1.png';
import Category2 from '../../assets/category-2.png';
import Category3 from '../../assets/category-3.png';
import Category4 from '../../assets/category-4.png';
import Category5 from '../../assets/category-5.png';
import Category6 from '../../assets/category-6.png';
import Category7 from '../../assets/category-7.png';
import Category8 from '../../assets/category-8.png';
import Category9 from '../../assets/category-9.png';
import { Box, Text } from '@chakra-ui/react';
import Review from '../Cards/Review';

export default function Reviews() {
    const data = [
        {
            "id":1,
            "user":"Nitesh Vishwakarma",
            "datetime":"April 22, 2022",
            "text":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, autem? Iusto reprehenderit at eaque quia harum, earum ratione optio animi, nesciunt consequatur eligendi facilis odit impedit? Vel iste quia saepe possimus quis officiis ut iusto repellat illum, similique illo nostrum omnis, dolorum quos corporis recusandae officia velit, voluptates deleniti suscipit?"
        },
        {
            "id":2,
            "user":"Nitesh Vishwakarma",
            "datetime":"April 22, 2022",
            "text":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, autem? Iusto reprehenderit at eaque quia harum, earum ratione optio animi, nesciunt consequatur eligendi facilis odit impedit? Vel iste quia saepe possimus quis officiis ut iusto repellat illum, similique illo nostrum omnis, dolorum quos corporis recusandae officia velit, voluptates deleniti suscipit?"
        },
        {
            "id":3,
            "user":"Nitesh Vishwakarma",
            "datetime":"April 22, 2022",
            "text":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, autem? Iusto reprehenderit at eaque quia harum, earum ratione optio animi, nesciunt consequatur eligendi facilis odit impedit? Vel iste quia saepe possimus quis officiis ut iusto repellat illum, similique illo nostrum omnis, dolorum quos corporis recusandae officia velit, voluptates deleniti suscipit?"
        },
        {
            "id":4,
            "user":"Nitesh Vishwakarma",
            "datetime":"April 22, 2022",
            "text":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, autem? Iusto reprehenderit at eaque quia harum, earum ratione optio animi, nesciunt consequatur eligendi facilis odit impedit? Vel iste quia saepe possimus quis officiis ut iusto repellat illum, similique illo nostrum omnis, dolorum quos corporis recusandae officia velit, voluptates deleniti suscipit?"
        },
        {
            "id":5,
            "user":"Nitesh Vishwakarma",
            "datetime":"April 22, 2022",
            "text":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, autem? Iusto reprehenderit at eaque quia harum, earum ratione optio animi, nesciunt consequatur eligendi facilis odit impedit? Vel iste quia saepe possimus quis officiis ut iusto repellat illum, similique illo nostrum omnis, dolorum quos corporis recusandae officia velit, voluptates deleniti suscipit?"
        },
        {
            "id":6,
            "user":"Nitesh Vishwakarma",
            "datetime":"April 22, 2022",
            "text":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, autem? Iusto reprehenderit at eaque quia harum, earum ratione optio animi, nesciunt consequatur eligendi facilis odit impedit? Vel iste quia saepe possimus quis officiis ut iusto repellat illum, similique illo nostrum omnis, dolorum quos corporis recusandae officia velit, voluptates deleniti suscipit?"
        },
        {
            "id":7,
            "user":"Nitesh Vishwakarma",
            "datetime":"April 22, 2022",
            "text":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, autem? Iusto reprehenderit at eaque quia harum, earum ratione optio animi, nesciunt consequatur eligendi facilis odit impedit? Vel iste quia saepe possimus quis officiis ut iusto repellat illum, similique illo nostrum omnis, dolorum quos corporis recusandae officia velit, voluptates deleniti suscipit?"
        },
        {
            "id":8,
            "user":"Nitesh Vishwakarma",
            "datetime":"April 22, 2022",
            "text":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, autem? Iusto reprehenderit at eaque quia harum, earum ratione optio animi, nesciunt consequatur eligendi facilis odit impedit? Vel iste quia saepe possimus quis officiis ut iusto repellat illum, similique illo nostrum omnis, dolorum quos corporis recusandae officia velit, voluptates deleniti suscipit?"
        },
        {
            "id":9,
            "user":"Nitesh Vishwakarma",
            "datetime":"April 22, 2022",
            "text":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, autem? Iusto reprehenderit at eaque quia harum, earum ratione optio animi, nesciunt consequatur eligendi facilis odit impedit? Vel iste quia saepe possimus quis officiis ut iusto repellat illum, similique illo nostrum omnis, dolorum quos corporis recusandae officia velit, voluptates deleniti suscipit?"
        },
    ]
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
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
        <Box w={'100%'} p={'4'}>
            <Text fontSize={'xl'} fontWeight={'semibold'} mb={'6'}>What Our Customers have to Say</Text>
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
                    data && data.length>0?(
                        data.map((e,i)=>(
                            <Review user={e.user} datetime={e.datetime} text={e.text} />
                        ))
                    ):null
                }
            </Carousel>
        </Box>
    )
}
