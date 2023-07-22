import { Search2Icon } from '@chakra-ui/icons'
import { Box, Container, HStack, IconButton, Input, Tag, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiUrl } from '../../utils/url';

export default function MainHeader() {
  const navigation = useNavigate();
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
  useEffect(()=>{
      getCategories();
  },[])
  return (
    <Container maxW='xxl' className='header-bg' p={6} h={600} centerContent>
        <Text fontSize={'3xl'} fontWeight={'bold'} color={'white'}  className='header-text' >What are you looking for ?</Text>
        <Box className='search-header'>
            <Input type='search' width={'100%'} placeholder='Search for medicines, health drinks...' className='search-input' bg={'white'} shadow={'md'} />
            <IconButton shadow={'md'} onClick={()=>navigation('/search')} bg={'cyan.700'} color={'white'}aria-label='Search' icon={<Search2Icon />} />
        </Box>
        <HStack className='mobile-hide' spacing={4} m={4}>
          {
              data.length>0?(
                  data.slice(0, 10).map((e,i)=>(
                      <Tag onClick={()=>navigation(`/search/categories/${e.category_name}`,{state:{name:e.category_name}})} size={'sm'} key={i} cursor={'pointer'} variant='solid' colorScheme='teal' fontWeight={'medium'}>
                          {e.category_name}
                      </Tag>
                  ))
              ):null
          }
        </HStack>
        <HStack className='desktop-hide' spacing={4} m={4}>
          {
              data.length>0?(
                  data.slice(0, 2).map((e,i)=>(
                      <Tag onClick={()=>navigation(`/search/categories/${e.category_name}`,{state:{name:e.category_name}})} size={'sm'} key={i} cursor={'pointer'} variant='solid' colorScheme='teal' fontWeight={'medium'}>
                          {e.category_name}
                      </Tag>
                  ))
              ):null
          }
        </HStack>
    </Container>
  )
}
