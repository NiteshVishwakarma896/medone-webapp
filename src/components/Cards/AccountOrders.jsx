import { Box, Image, Text} from '@chakra-ui/react'
import React from 'react'
import { CurrencyRupee } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom'

export default function AccountOrders(props) {
    const navigation = useNavigate();
    return (
        <React.Fragment>
            <Box variant='ghost' bg={'white'} w={{base:'100%',lg:'60%'}} h={'fit-content'} mt={'2'} mb={'4'} shadow={'sm'} border={'1px'} borderColor={'ButtonShadow'} borderRadius={'lg'} p={'4'} className='order-item'>
                <Image src={props.product[0].product_image} boxSize={{base:'80%',lg:'20%'}} h={{base:'170',lg:'40'}} objectFit='contain'  />
                <Box p={'2'} ml={{base:'0',lg:'4'}}>
                    <Text cursor={'pointer'} onClick={()=>navigation('/product-details',{state:{id:props.pid}})}  fontSize={'small'} className='product-card-title'  pt={'2'}  fontWeight={'medium'} color={'blackAlpha.900'} >{props.product[0].product_name}</Text>
                    <Text  fontSize={'small'} noOfLines={1} w={'100%'} className='product-card-title'  pt={'2'}  fontWeight={'normal'} color={'blackAlpha.900'} >{props.product[0].product_description}</Text>
                    <Box w={'fit-content'} pb={'2'} pt={'2'} style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                        <Text fontSize={'sm'} fontWeight={'bold'} color={'cyan.900'}  style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}} ><CurrencyRupee/> {props.price}/-</Text>
                        <Text fontSize={'sm'} ml={'6'}>QTY - {props.qty}</Text>
                    </Box>
                    <Text  fontSize={'sm'} pt={'2'}  fontWeight={'semibold'} color={'green.600'} >Delivered on 22nd June</Text>
                </Box>
            </Box>
        </React.Fragment>
    )
}
