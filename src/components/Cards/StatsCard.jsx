import React from 'react'
import { Box, Flex, Stat, StatLabel, StatNumber, useColorModeValue } from '@chakra-ui/react';

export default function StatsCard(props) {
    const { title, stat, icon } = props;
    return (
        <Stat
        px={{ base: 2, md: 4 }}
        py={'5'}
        shadow={'md'}
        color={'white'}
        bg={'cyan.800'}
        rounded={'md'}>
        <Flex justifyContent={'space-between'}>
            <Box my={'auto'} alignContent={'center'}>
                {icon}
            </Box>
            <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={'medium'} isTruncated>
                {title}
            </StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                {stat}
            </StatNumber>
            </Box>
            
        </Flex>
        </Stat>
    );
}
