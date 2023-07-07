import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navigation/Navbar'
import Footer from '../../components/Navigation/Footer'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Container, Flex, HStack, Heading, Image, List, ListItem, Select, SimpleGrid, Stack, StackDivider, Tag, TagLabel, TagLeftIcon, Text, VStack, useColorModeValue, useToast } from '@chakra-ui/react'
import { Link, ScrollRestoration, useLocation } from 'react-router-dom'
import { CashCoin, CurrencyRupee, ShopWindow, StarFill } from 'react-bootstrap-icons'
import ProductCard from '../../components/Cards/ProductCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { apiUrl } from '../../utils/url'
import { calculateDiscount } from '../../utils/calculateDiscount'
import parse from 'html-react-parser';

export default function ProductDetails() {
    const location = useLocation();
    const toast = useToast();
    // 
    const [productID,setProductID] = useState(null);
    const [product,setProduct] = useState(null);
    const [discountedPrice,setDiscountedPrice] = useState(0);
    const [productQty,setProductQty] = useState(0);
    const [products,setProducts] = useState([]);

    const getProducts = (product)=>{
        fetch(apiUrl+"/products/by-categories",{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            },
            body: JSON.stringify({product_categories:product.product_categories})
        })
        .then((res)=>res.json())
        .then((data)=>{
          if(data.status == "200"){
            setProducts(data.data);
          }
        })
    }

    const getProductDetail = (id)=>{
        fetch(apiUrl+`/products/${id}`)
        .then(res=>res.json())
        .then(data=>{
            if(data.status == "200"){
                setProduct(data.data)
            }
        })
    }

    const addToCart = (id,price)=>{
        if(productQty == 0){
            toast({
                description:"No quantity selected, please select quantity !",
                duration:3000,
                variant:'subtle',
                isClosable:true,
                status:'error'
            })
        }
        else{
            fetch(apiUrl+`/cart/add-product`,{
                method:"POST",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    product_id:id,
                    product_qty:productQty,
                    product_price:price
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.status == "201"){
                    toast({
                        description:"Item added to cart !",
                        duration:3000,
                        variant:'subtle',
                        isClosable:true,
                        status:'success'
                    })
                }
                else{
                    toast({
                        description:data.message,
                        duration:3000,
                        variant:'subtle',
                        isClosable:true,
                        status:'error'
                    })
                }
            })
        }
    }

    useEffect(()=>{
        setProductID(location.state.id);
        getProductDetail(location.state.id);
        
    },[])

    useEffect(()=>{
        if(product){
            var data = {mrp:product.product_mrp,discount:product.product_discount}
            var disPrice = calculateDiscount(data);
            setDiscountedPrice(disPrice)
            getProducts(product);
        }
    },[product])

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 7
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 4
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2
        }
    };
    return (
        <React.Fragment>
            <Navbar/>
            {
                product?(
                    <Container maxW={'8xl'} pt={'16'} pl={'4'} pr={'4'} pb={'4'} h={'fit-content'}>
                        <Breadcrumb mt={'4'}>
                            <BreadcrumbItem>
                                <BreadcrumbLink as={Link} fontSize={'small'} to='/'>Home</BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbLink as={Link} fontSize={'small'} to='/categories'>Categories</BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem isCurrentPage>
                                <BreadcrumbLink as={Link} fontSize={'small'} to='#'>Product Name</BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <SimpleGrid w={'100%'} columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }} py={{ base: 18, md: 8 }}>
                            <Image
                                rounded={'md'}
                                alt={'product image'}
                                src={product.product_image}
                                fit={'contain'}
                                w={'100%'}
                                h={{ base: '100%', sm: '100px', lg: '400px' }}
                                p={'4'}
                            />
                            <Stack spacing={{ base: 6, md: 10 }}>
                                <Box as={'header'}>
                                    <Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: '2xl', sm: '2xl', lg: '2xl' }}>
                                        {product.product_name}
                                    </Heading>
                                    <Box mt={'4'} display={'flex'} flexDirection={'row'} alignItems={'center'} >
                                        <CurrencyRupee color='#086F83' size={'24'} />
                                        <Text color={'cyan.800'} fontWeight={600} fontSize={'2xl'}>{discountedPrice}/-</Text>
                                        <Text color={'grey'} fontWeight={400} textDecoration={'line-through'} ml={'4'} fontSize={'lg'}>MRP Rs {product.product_mrp}/-</Text>
                                        <Tag className='mobile-hide' size={'md'} variant='subtle' bg='white' color={'red.500'} ml={'4'}>
                                            <TagLeftIcon as={CashCoin} size={'md'} />
                                            <TagLabel fontSize={'md'} fontWeight={'semibold'} >{product.product_discount}% Off</TagLabel>
                                        </Tag>
                                        <Text className='mobile-hide' fontWeight={400} color={'gray.500'} fontSize={'small'} ml={'2'} >Inclusive of all taxes</Text>
                                    </Box>
                                    <Box className='desktop-hide' mt={'4'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                                        <Tag size={'md'} variant='subtle' bg='white' color={'red.500'}>
                                            <TagLeftIcon as={CashCoin} size={'md'} />
                                            <TagLabel fontSize={'md'} fontWeight={'semibold'} >{product.product_discount}% Off</TagLabel>
                                        </Tag>
                                        <Text fontWeight={400} color={'gray.500'} fontSize={'small'} ml={'2'} >Inclusive of all taxes</Text>
                                    </Box>
                                    <Box mt={'4'} ml={{base: '2', lg: '0'}} display={'flex'} flexDirection={'row'} alignItems={'center'} >
                                        <StarFill size={'18'} color='#FFC100' />
                                        <Text fontWeight={600} fontSize={'lg'} ml={'2'} mr={'4'}>4.5</Text>
                                        <Text fontWeight={400} color={'gray.500'} fontSize={'sm'} ml={'2'} >(1500+ Reviews)</Text>
                                        <HStack alignItems={'center'} spacing={4} ml={'4'}>
                                            {
                                                product.product_categories.map((e,i)=>(
                                                    <Tag cursor={'pointer'} size={'sm'} variant='solid' colorScheme='teal' fontWeight={'light'}>
                                                        {e}
                                                    </Tag>
                                                ))
                                            }
                                            
                                        </HStack>
                                    </Box>
                                    <Text fontWeight={'light'} mt={'4'} fontSize={'md'} color={'blackAlpha.900'}>
                                        {product.product_description}
                                    </Text>
                                    {
                                        product.isAvaliable?(
                                            <React.Fragment>
                                                <Box mt={6} display={'flex'} flexDirection={'row'} alignItems={'center'} >
                                                    <Select w={{base:'35%',lg:'15%'}} onChange={(e)=>{setProductQty(e.target.value);console.log(e.target.value)}} textTransform={'uppercase'} textAlign={'center'} size={'lg'} placeholder='QTY'>
                                                        <option value='1'>1</option>
                                                        <option value='2'>2</option>
                                                        <option value='3'>3</option>
                                                    </Select>
                                                    <Button
                                                        onClick={()=>addToCart(product._id,product.product_mrp)}
                                                        w={'90%'}
                                                        ml={'4'}
                                                        size={'lg'}
                                                        py={'4'}
                                                        bg={'cyan.800'}
                                                        color={useColorModeValue('white', 'gray.900')}
                                                        textTransform={'uppercase'}
                                                        _hover={{
                                                        transform: 'translateY(2px)',
                                                        boxShadow: 'lg',
                                                        }}>
                                                        Add to cart
                                                    </Button>
                                                </Box>

                                                <Stack direction="row" alignItems="center" mt={'6'} justifyContent={'center'}>
                                                    <ShopWindow />
                                                    <Text>2-3 business days delivery</Text>
                                                </Stack>
                                            </React.Fragment>
                                        ):(null)
                                    }
                                    
                                </Box>               
                            </Stack>
                        </SimpleGrid>
                        {
                            products.length>0?(
                                <Box w={'100%'} mt={'4'}>
                                    <Text fontWeight={'semibold'} color={'gray.700'} ml={'2'}>Smiliar Products</Text>
                                    <Carousel
                                        swipeable={true}
                                        draggable={true}
                                        showDots={false}
                                        responsive={responsive}
                                        ssr={true}
                                        infinite={true}
                                        autoPlay={true}
                                        autoPlaySpeed={4000}
                                        transitionDuration={500}
                                        containerClass="carousel-container"
                                        removeArrowOnDeviceType={["tablet", "mobile"]}
                                    >
                                        {
                                            products?(
                                                products.map((e,i)=>(
                                                    <ProductCard key={i} id={e._id} text={e.product_name} image={e.product_image} discount={e.product_discount} mrp={e.product_mrp} />
                                                ))
                                            ):null
                                        }
                                    </Carousel>  
                                </Box>
                            ):(null)
                        }
                        
                        <Box w={'100%'} mt={'4'} p={'4'}>
                            <Text fontSize={'sm'}>
                                {
                                    parse(product.product_detailed_description)
                                }
                            </Text>
                        </Box>
                    </Container>
                ):(null)
            }
            <Footer/>
            <ScrollRestoration />
        </React.Fragment>
    )
}
