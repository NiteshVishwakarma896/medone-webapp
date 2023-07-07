import { Search2Icon } from '@chakra-ui/icons'
import { Box, Container, HStack, IconButton, Input, Tag, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function MainHeader() {
  const navigation = useNavigate();
  return (
    <Container maxW='xxl' className='header-bg' p={6} h={500} centerContent>
        <Text fontSize={'3xl'} fontWeight={'bold'} color={'white'}  className='header-text' >What are you looking for ?</Text>
        <Box className='search-header'>
            <Input type='search' width={'100%'} placeholder='Search for medicines, health drinks...' className='search-input' bg={'white'} />
            <IconButton onClick={()=>navigation('/search')} bg={'cyan.700'} color={'white'}aria-label='Search' icon={<Search2Icon />} />
        </Box>
        <HStack className='mobile-hide' spacing={4} m={4}>
            <Tag size={'sm'} variant='subtle' colorScheme='cyan'>
              Medicines
            </Tag>
            <Tag size={'sm'} variant='subtle' colorScheme='cyan'>
              Health Drinks
            </Tag>
            <Tag size={'sm'} variant='subtle' colorScheme='cyan'>
              Skin Care
            </Tag>
            <Tag size={'sm'} variant='subtle' colorScheme='cyan'>
              Home Care
            </Tag>
            <Tag size={'sm'} variant='subtle' colorScheme='cyan'>
              Personal Care
            </Tag>
            <Tag size={'sm'} variant='subtle' colorScheme='cyan'>
              Elderly Care
            </Tag>
            <Tag size={'sm'} variant='subtle' colorScheme='cyan'>
              Fitness
            </Tag>
            <Tag size={'sm'} variant='subtle' colorScheme='cyan'>
              Diabetic
            </Tag>
        </HStack>
        <HStack className='desktop-hide' spacing={4} m={4}>
            <Tag size={'sm'} variant='subtle' colorScheme='cyan'>
              Medicines
            </Tag>
            <Tag size={'sm'} variant='subtle' colorScheme='cyan'>
              HealthDrinks
            </Tag>
            <Tag size={'sm'} variant='subtle' colorScheme='cyan'>
              Fitness
            </Tag>
            <Tag size={'sm'} variant='subtle' colorScheme='cyan'>
              Diabetic
            </Tag>
        </HStack>
    </Container>
  )
}
