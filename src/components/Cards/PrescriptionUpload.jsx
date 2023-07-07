import React from 'react'
import { Box, Button, Grid, GridItem, Heading, Image, Tag, Text, } from '@chakra-ui/react'
import Prescription from '../../assets/prescription.png';
import { AttachmentIcon } from '@chakra-ui/icons';

export default function PrescriptionUpload() {
    return (
        <Box w={'100%'} h={'180'} p={'4'} mb={'8'} mt={'8'} >
            <div className="row-prescription">
                <Box p={'6'} bg={'cyan.50'} borderRadius={'xl'} shadow={'sm'} style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <Image src={Prescription} boxSize='90px' objectFit='cover' fallbackSrc='https://via.placeholder.com/150' />
                    <Box className='prescription-upload'>
                        <Text className='prescription-h' mb={'2'} >Order with Prescription</Text >
                        <Text className='prescription-p'>Upload prescription and we will deliver your medicines</Text>
                        <Button size={'md'} leftIcon={<AttachmentIcon />} variant={'solid'} color={'white'} bg={'cyan.700'}>
                            Upload
                        </Button>
                    </Box>
                </Box>
                <Box className='prescription-description'>
                    <Text fontWeight={'semibold'} mb={'2'}>How does this work?</Text>
                    <Box className='row-prescription'>
                        <Box p={'1'}  style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <Tag size={'lg'} color={'cyan.700'}>
                                <Text as={'b'}>1</Text>
                            </Tag>
                            <Text fontSize={{base:'12',lg:'sm'}} ml={2}>Upload a photo of your prescription</Text>
                        </Box>
                        <Box p={'1'} style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <Tag size={'lg'} color={'cyan.700'}>
                                <Text as={'b'}>2</Text>
                            </Tag>
                            <Text fontSize={{base:'12',lg:'sm'}} ml={2}>Add delivery address and place the order</Text>
                        </Box>
                    </Box>
                    <Box p={'1'} style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <Tag size={'lg'} color={'cyan.700'}>
                            <Text as={'b'}>3</Text>
                        </Tag>
                        <Text fontSize={{base:'12',lg:'sm'}} ml={2}>Now, sit back! your medicines will get delivered at your doorstep</Text>
                    </Box>
                </Box>
            </div>
        </Box>
    )
}
