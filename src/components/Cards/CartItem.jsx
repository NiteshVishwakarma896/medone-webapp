import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, CloseButton, IconButton, Image, Select, Tag, TagLabel, TagLeftIcon, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { CashCoin, CurrencyRupee, Trash } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom'
import { calculateDiscount } from './../../utils/calculateDiscount';
import { apiUrl } from '../../utils/url';

export default function CartItem(props) {
    const navigation = useNavigate();
    // 
    const toast = useToast();
    const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [discountedPrice,setDiscountedPrice] = useState(0);
    
    const deleteCartItem = (id)=>{
        fetch(apiUrl+`/cart/delete/${id}`)
        .then(res=>res.json())
        .then(data=>{
            if(data.status == "200"){
                toast({
                    description:"Cart Item Deleted !",
                    status:'success',
                    duration:3000,
                    isClosable:true,
                    variant:'subtle'
                })
                props.parentCallBack(true)

            }
        })
    }

    useEffect(()=>{
        if(props){
            var dataObj = {mrp:props.product[0].product_mrp,discount:props.product[0].product_discount}
            var disPrice = calculateDiscount(dataObj);
            setDiscountedPrice(disPrice);
        }
    },[props])

    return (
        <React.Fragment>
        <Box variant='ghost' bg={'white'} w={'100%'} h={'fit-content'} mt={'2'} mb={'4'} shadow={'sm'} border={'1px'} borderColor={'ButtonShadow'} borderRadius={'lg'} p={'2'} className='cart-item'>
            <Image src={props.product[0].product_image} boxSize={{base:'90%',lg:'20%'}} h={{base:'180',lg:'40'}} objectFit='contain'  />
            <Box ml={'4'} pr={'4'}>
                <Text  fontSize={'small'} className='product-card-title'  pt={'2'}  fontWeight={'medium'} color={'blackAlpha.900'} >{props.product[0].product_name}</Text>
                <Text fontSize={'small'} mt={'2'}  w={'100%'} textOverflow={'ellipsis'} pb={'2'} fontWeight={'medium'} as={'s'} color={'blackAlpha.600'}  style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}} >MRP: <CurrencyRupee/> {props.product[0].product_mrp}/-</Text>
                <Box w={'100%'} pb={'2'} style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                    <Text fontSize={'sm'} fontWeight={'bold'} color={'cyan.900'}  style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}} ><CurrencyRupee/> {discountedPrice}/-</Text>
                    <Tag size={'sm'} variant='subtle' bg='white' color={'red.500'} ml={'4'}>
                        <TagLeftIcon as={CashCoin} size={'lg'} />
                        <TagLabel fontSize={'small'} fontWeight={'semibold'} >{props.product[0].product_discount}% Off</TagLabel>
                    </Tag>
                </Box>
                <Text  fontSize={'12'} pt={'2'}  fontWeight={'medium'} color={'gray.500'} >Delivery by within 2-3 business days</Text>
            </Box>
            <Box ml={{base:'0.5',lg:'auto'}} pr={'4'} w={{base:'100%',sm:'100%',lg:'15%'}} className='cart-item-btns'>
                <IconButton onClick={()=>onAlertOpen()} aria-label='Remove item from cart' mr={{base:'4',lg:'0'}} mb={{base:'0',lg:'90%'}} icon={<Trash />}  />
                <Select borderRadius={'md'} w={{base:'100%',lg:'90px'}} textAlign={'center'} size={{base:'md',lg:'sm'}}>
                    <option value='1' selected={props.qty == 1?(true):(false)} >QTY 1</option>
                    <option value='2' selected={props.qty == 2?(true):(false)} >QTY 2</option>
                    <option value='3' selected={props.qty == 3?(true):(false)} >QTY 3</option>
                </Select>
            </Box>
        </Box>
        <AlertDialog
            isOpen={isAlertOpen}
            leastDestructiveRef={cancelRef}
            onClose={onAlertClose}
        >
            <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Item
                </AlertDialogHeader>

                <AlertDialogBody>
                Are you sure? You want to delete this item from cart.
                </AlertDialogBody>

                <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onAlertClose}>
                    Cancel
                </Button>
                <Button colorScheme='red' onClick={()=>{onAlertClose; deleteCartItem(props.id);}} ml={3}>
                    Delete
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
        </React.Fragment>
    )
}
