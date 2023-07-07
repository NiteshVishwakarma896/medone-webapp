import { Box, Checkbox, Divider, HStack, Text } from '@chakra-ui/react'
import React from 'react'

export default function FilterSideBox(props) {
  return (
    <Box w={'100%'} mt={'4'}>
        <Text fontSize={'md'} mb={'4'} fontWeight={'semibold'} color={'blackAlpha.900'} >{props.title}</Text>
        {
            props.data?(
                props.data.map((e,i)=>(
                    <HStack mb={'3'} key={i}>
                        <Text color={'blackAlpha.800'} w={'100%'} fontSize={'small'}>{e.category_name}</Text>
                        <Checkbox colorScheme='teal'></Checkbox>
                    </HStack>
                ))
            ):(null)
        }
        <Divider orientation='horizontal' mt={'6'} />
    </Box>
  )
}
