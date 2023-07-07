import React, { useEffect, useState } from 'react'
import { Image,Text, Button,Box, Tag, TagLeftIcon, TagLabel } from '@chakra-ui/react'
import { CashCoin, CurrencyRupee, TicketPerforated } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { calculateDiscount } from '../../utils/calculateDiscount';

export default function Product(props) {
  const navigation = useNavigate();
  const [discountedPrice,setDiscountedPrice] = useState(0);
  
  useEffect(()=>{
    var disPrice = calculateDiscount(props);
    setDiscountedPrice(disPrice)
  },[props]);
  return (
    <Button onClick={()=>navigation('/product-details',{state:{id:props.id}})} variant='ghost' bg={'white'} w={'100%'} h={'fit-content'} mt={'2'} mb={'2'} shadow={'sm'} border={'1px'} borderColor={'ButtonShadow'} borderRadius={'lg'} p={'3'} flexDirection={'column'}>
        <Image src={props.image} boxSize='80%' h={'44'} objectFit='contain' mb={'2'}  />
        <Text  fontSize={'small'} className='product-card-title'  pt={'2'}  fontWeight={'medium'} color={'blackAlpha.900'} >{props.text}</Text>
        <Text fontSize={'sm'} mt={'2'}  w={'100%'} textOverflow={'ellipsis'} pb={'2'} fontWeight={'medium'} as={'s'} color={'blackAlpha.600'}  style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}} >MRP: <CurrencyRupee/> {props.mrp}/-</Text>
        <Box w={'100%'} pb={'2'} style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
            <Text fontSize={'md'}  w={'100%'} fontWeight={'bold'} color={'cyan.900'}  style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}} ><CurrencyRupee/> {discountedPrice}/-</Text>
            <Tag size={'md'} variant='subtle' bg='white' color={'red.500'} w={'100%'}>
                <TagLeftIcon as={CashCoin} size={'lg'} />
                <TagLabel fontSize={'smaller'} fontWeight={'semibold'} >{props.discount}% Off</TagLabel>
            </Tag>
        </Box>
    </Button>
  )
}
