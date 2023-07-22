import React from 'react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, IconButton, Text } from '@chakra-ui/react'
import { GeoAltFill } from 'react-bootstrap-icons'

export default function Address(props) {
    return (
        <Box w={'fit-content'} shadow={'sm'} p={'2'} mb={'4'} border={'1px solid'} borderColor={'gray.200'} borderRadius={'md'}>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'flex-start'}>
                <GeoAltFill color='teal'/>
                <Text fontSize={'sm'} fontWeight={'bold'} ml={'2'} color={'teal'}>Home</Text>
                <Box ml={'auto'}>
                    <IconButton icon={<EditIcon/>} size={'xs'} mr={'2'} borderRadius={'sm'} />
                    <IconButton icon={<DeleteIcon/>} size={'xs'} colorScheme='red' borderRadius={'sm'} />
                </Box>
            </Box>
            <Text p={'2'} mt={'2'} fontSize={'small'}>Flat No 601/ Morgan, Shapoorji Pallonji, Phase 1 Hinjewadi, Maan Road, 411057</Text>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Text p={'2'} fontSize={'small'}><b>City</b> - Pune</Text>
                <Text p={'2'} fontSize={'small'}><b>Pincode</b> - 411057</Text>
            </Box>
        </Box>
    )
}
