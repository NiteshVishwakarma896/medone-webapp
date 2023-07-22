import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navigation/Navbar'
import Footer from '../../components/Navigation/Footer'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button,  Container,  Flex, Image, Input, SimpleGrid, Stack, Text, Textarea } from '@chakra-ui/react'
import { Link, ScrollRestoration } from 'react-router-dom'
import CartItem from '../../components/Cards/CartItem'
import { CashStack, CurrencyRupee, Percent } from 'react-bootstrap-icons'
import { apiUrl } from './../../utils/url';
import { calculateDiscount } from '../../utils/calculateDiscount'
import EmptyCart from '../../assets/no-orders.gif';

export default function Cart() {
  // 
  const [carts,setCarts] = useState([]);
  const [totalMRP,setTotalMRP] = useState(0);
  const [totalDiscount,setTotalDiscount] = useState(0);
  const [totalAmt,setTotalAmt] = useState(0);
  const [deliveryFee,setDeliveryFee] = useState(0);

  const getCartItems = ()=>{
    fetch(apiUrl+"/cart/")
    .then((res)=>res.json())
    .then((data)=>{
      if(data.status == "200"){
        setCarts(data.data);
      }
    })
  }

  const handleCallBackCartItem = (childData)=>{
    if(childData){
      setCarts([]);
      setTotalAmt(0);
      setTotalMRP(0);
      setTotalDiscount(0);
      getCartItems();
    }
  }
  
  useEffect(()=>{
    setCarts([]);
    setTotalAmt(0);
    setTotalMRP(0);
    setTotalDiscount(0);
    getCartItems();
  },[])

  useEffect(()=>{
    setTotalAmt(0);
    setTotalMRP(0);
    setTotalDiscount(0);
    if(carts.length>0){
      carts.map((e)=>{
        var intialMRP = totalMRP;
        intialMRP = totalMRP + Number(e.product[0].product_mrp)
        setTotalMRP(intialMRP);
        // 
        var dataObj = {mrp:e.product[0].product_mrp,discount:e.product[0].product_discount}
        var disPrice = calculateDiscount(dataObj);
        var tDiscount = totalDiscount;
        tDiscount = totalDiscount + Number(disPrice);
        setTotalDiscount(tDiscount);
        // 
        var tamt = totalAmt;
        tamt = totalAmt + Number(tDiscount);
        setTotalAmt(tamt);
      })
    }
  },[carts])

  return (
    <React.Fragment>
        <Navbar/>
          <Container maxW={'8xl'} pt={'16'} pl={'4'} pr={'4'} pb={'4'} h={'fit-content'}>
              <Breadcrumb mt={'4'}>
                  <BreadcrumbItem>
                      <BreadcrumbLink as={Link} fontSize={'small'} to='/'>Home</BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbItem isCurrentPage>
                      <BreadcrumbLink as={Link} fontSize={'small'} to='/cart'>Cart</BreadcrumbLink>
                  </BreadcrumbItem>
              </Breadcrumb>
              {
                carts.length>0?(
                    <SimpleGrid w={'100%'} columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 8 }} py={{ base: 18, md: 8 }}>
                      <Box> 
                        <Text fontWeight={'semibold'} mb={'4'} fontSize={'lg'} color={'gray.700'}>Shopping Items</Text>
                        {
                          carts && carts.length>0 ? (
                            carts.map((e,i)=>(
                              <CartItem parentCallBack={handleCallBackCartItem} id={e._id} pid={e.product_id} product={e.product} qty={e.product_qty} price={e.product_price} key={i} />
                            ))
                          ) : (null)
                        }
                      </Box>
                      <Box bg={'#FAFAFA'} h={'fit-content'} borderRadius={'lg'} p={'4'}>
                        <Text fontWeight={'semibold'} mb={'4'} fontSize={'lg'} color={'gray.700'}>Order Summary</Text>
                        <Box bg={'white'} border={'1px'} borderColor={'gray.300'} shadow={'sm'} borderRadius={'lg'} p={'4'} >
                          <Box display={'flex'} mb={'4'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Text fontWeight={'medium'} fontSize={'sm'}>Total MRP</Text>
                            <Text fontWeight={'medium'} >₹ {totalMRP}</Text>
                          </Box>
                          <Box display={'flex'} mb={'4'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Text fontWeight={'medium'} fontSize={'sm'}>Delivery charges</Text>
                            <Text fontWeight={'medium'} >₹ {deliveryFee}</Text>
                          </Box>
                          <Box display={'flex'} mb={'4'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Text fontWeight={'semibold'} color={'cyan.700'} fontSize={'sm'}>Discount on MRP</Text>
                            <Text fontWeight={'semibold'} color={'cyan.700'} >-₹ {totalMRP-totalDiscount}</Text>
                          </Box>
                          <Box display={'flex'} mb={'4'} flexDirection={{base:'column',lg:'row'}} alignItems={'center'} justifyContent={'space-between'}>
                            <Input type='text' placeholder='Apply Coupon' fontSize={'sm'} w={{base:'100%',lg:'85%'}} mr={'2'} />
                            <Button variant={'solid'} fontSize={'14'} w={{base:'100%',lg:'fit-content'}} mt={{base:'2',lg:'0'}} colorScheme='teal' leftIcon={<Percent/>}>Apply Coupon</Button>
                          </Box>
                          <Box display={'flex'} mt={'8'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Text fontWeight={'semibold'} fontSize={'md'}>Total Amount</Text>
                            <Text fontWeight={'bold'} fontSize={'md'} >₹ {totalAmt}</Text>
                          </Box>
                        </Box>
                        <Box bg={'white'} border={'1px'} borderColor={'gray.300'} shadow={'sm'} mt={'4'} borderRadius={'lg'} p={'4'} >
                          <Text fontWeight={'medium'} fontSize={'sm'} color={'gray.600'}>Delivery Address</Text>
                          <Textarea  type='text' mt={'2'}  placeholder='Enter your delivery address here...' fontSize={'sm'}/>
                        </Box>
                        <Stack className='mobile-hide' direction='row' mt={'12'} spacing={1} align='center'>
                            <Box w={'100%'} >
                              <Box display={'flex'} flexDirection={'row'} alignItems={"center"}>
                                <CurrencyRupee color='#086F83' size={'24'} />
                                <Text fontWeight={'bold'} color={'cyan.800'} fontSize={'xl'}>{totalAmt}/-</Text>
                              </Box>
                              <Text fontWeight={'medium'} color={'gray.500'} ml={'2'} fontSize={'10'}>in Total Amount to be paid</Text>
                            </Box>
                            <Button w={'30%'} leftIcon={<CashStack/>} fontWeight={'medium'} color={'white'} bg={'cyan.800'} variant='solid'>
                                Pay Now
                            </Button>
                        </Stack>
                      </Box>
                  </SimpleGrid>
                ):(
                  <Flex w={'100%'} h={'450px'} direction={'column'} alignItems={'center'} mt={'auto'} mb={'auto'} justifyContent={'center'}>
                      <Image src={EmptyCart} objectFit={'contain'}/>
                      <Text fontSize={'xl'}>No items in your cart...</Text>
                      <Text color={'gray.500'} mt={'2'} fontSize={'sm'}>Try adding some important medicines into your cart...</Text>
                  </Flex>
                )
              }
              
          </Container>
          <Box className='desktop-hide bottom-filter-floating-widget' shadow={'md'} p={'2'}>
              <Stack direction='row' spacing={1} align='center'>
                  <Box w={'100%'} >
                    <Box display={'flex'} flexDirection={'row'} alignItems={"center"}>
                      <CurrencyRupee color='#086F83' size={'24'} />
                      <Text fontWeight={'bold'} color={'cyan.800'} fontSize={'xl'}>{totalAmt}/-</Text>
                    </Box>
                    <Text fontWeight={'medium'} color={'gray.500'} ml={'2'} fontSize={'10'}>in Total Amount to be paid</Text>
                  </Box>
                  <Button w={'90%'} leftIcon={<CashStack/>} fontWeight={'medium'} color={'white'} bg={'cyan.800'} variant='solid'>
                      Pay Now
                  </Button>
              </Stack>
          </Box>
        <Footer/>
        <ScrollRestoration />
        
    </React.Fragment>
  )
}
