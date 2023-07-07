import React from 'react'
import { Text, Box } from '@chakra-ui/react'

export default function Review(props) {
  return (
    <Box boxSize='lg' bg={'white'} w={'fit-content'} ml={'4'} h={'fit-content'} mt={'2'} mb={'2'} shadow={'sm'} >
        <Box p={'4'} >
            <Text fontSize='14px' noOfLines={1} pb={'2'} fontWeight={'bold'} >{props.user}</Text>
            <Text fontSize='12px' noOfLines={1} pb={'2'} fontWeight={'medium'} >{props.datetime}</Text>
        </Box>
        <Box w={'100%'} bg={'cyan.800'} p={'4'}>
            <Text fontSize='14px' color={'white'} noOfLines={10} fontWeight={'light'} textAlign={'justify'}>{props.text}</Text>
        </Box>

    </Box>
  )
}
