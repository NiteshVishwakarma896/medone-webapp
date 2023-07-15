import { Box, Button, Center, Divider, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { GeoAltFill } from 'react-bootstrap-icons'
import {useGlobalData} from '../../context/GlobalContext';

export default function LocationCard(props) {
    const {setGlobalData} = useGlobalData();
    const setLocationData = ()=>{
        setGlobalData({
            location:props.name,
            pincode:props.pincode,
            state:props.state,
        })
        localStorage.setItem('locationGlobal',JSON.stringify({
            location:props.name,
            pincode:props.pincode,
            state:props.state,
        }))
        props.parentCallBack(true)
    }
    return (
        <Button onClick={setLocationData} variant={'outline'} bg={'white'} color={'black'} w={'100%'} h={'fit-content'} p={'4'} mt={'4'} border={'1px'} borderColor={'cyan.50'} borderRadius={'md'} shadow={'md'}>
            <Box w={'100%'} >
                <Box w={'100%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'flex-start'}>
                    <Icon as={GeoAltFill} color={'cyan.800'} />
                    <Text fontSize={'small'} ml={'2'}>{props.name}</Text>
                </Box>
                <Center height='25px'>
                    <Divider orientation='horizontal' />
                </Center>
                <Box w={'100%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Text fontSize={'small'} fontWeight={'normal'} >{props.district}, {props.state}</Text>
                    <Text fontSize={'small'} ml={'2'}>{props.pincode}</Text>
                </Box>
            </Box>
        </Button>
    )
}
