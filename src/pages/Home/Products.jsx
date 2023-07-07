import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navigation/Navbar'
import Footer from '../../components/Navigation/Footer'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Center, Checkbox, Container, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, SimpleGrid, Stack, Tag, Text, useDisclosure } from '@chakra-ui/react'
import { Link, ScrollRestoration, useLocation } from 'react-router-dom'
import { Filter, SortUp } from 'react-bootstrap-icons'
import FilterSideBox from '../../components/Filter/FilterSideBox'
import Product from '../../components/Cards/Product'
import { apiUrl } from '../../utils/url'

export default function Products() {
    const location = useLocation();
    const { isOpen: isFilterOpen , onOpen: onFilterOpen, onClose: onFilterClose } = useDisclosure()
    const { isOpen: isSortOpen , onOpen: onSortOpen, onClose: onSortClose } = useDisclosure()
    // 
    const [products,setProucts] = useState([]);
    const [categories,setCategories] = useState([]);

    const getCategories = ()=>{
        fetch(apiUrl+"/categories")
        .then((res)=>res.json())
        .then((data)=>{
          if(data.status == "200"){
              setCategories(data.data);
          }
        })
    }
    const getProducts = ()=>{
        fetch(apiUrl+"/products")
        .then((res)=>res.json())
        .then((data)=>{
          if(data.status == "200"){
            setProucts(data.data);
          }
        })
    }
    useEffect(() => {
        getCategories();
        getProducts();
    }, [])

    return (
        <React.Fragment>
            <Navbar />
            <Container maxW={'8xl'} pt={'16'} pl={'4'} pr={'4'} pb={'4'} h={'fit-content'}>
                <Breadcrumb mt={'4'}>
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} fontSize={'small'} to='/'>Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    {
                        location.state?(
                            <BreadcrumbItem>
                                <BreadcrumbLink as={Link} fontSize={'small'} to='/categories'>Categories</BreadcrumbLink>
                            </BreadcrumbItem>
                        ):(
                            <BreadcrumbItem>
                                <BreadcrumbLink as={Link} fontSize={'small'} to='/search'>Search Products</BreadcrumbLink>
                            </BreadcrumbItem>
                        )
                    }
                    {
                        location.state?(
                            <BreadcrumbItem isCurrentPage>
                                <BreadcrumbLink as={'p'} fontSize={'small'} >{location?.state.name}</BreadcrumbLink>
                            </BreadcrumbItem>
                        ):(null)
                    }
                    
                </Breadcrumb>
                <HStack alignItems={'center'} className='mobile-hide' spacing={4} mt={'4'}>
                    {
                        categories?(
                            categories.map((e,i)=>(
                                <Tag key={i} cursor={'pointer'} size={'sm'} variant='solid' colorScheme='teal' fontWeight={'light'}>
                                    {e.category_name}
                                </Tag>
                            ))
                        ):(null)
                    }
                </HStack>
                {/* Row Item */}
                <Stack direction={['column', 'row']} spacing='16px' mt={'4'}>
                    <Box className='search-filter-section mobile-hide' h='fit-content' p={'4'} >
                        <Text fontWeight={'semibold'} fontSize={'2xl'}>Filter</Text>
                        <br/>
                        <FilterSideBox title="Category" data={categories} />
                        <FilterSideBox title="Price" data={[
                            {
                                "id":1,
                                "category_name":"Below 99"
                            },
                            {
                                "id":2,
                                "category_name":"100 - 199"
                            },
                            {
                                "id":3,
                                "category_name":"200 - 299"
                            },
                            {
                                "id":4,
                                "category_name":"300 - 399"
                            },
                            {
                                "id":5,
                                "category_name":"400 - 499"
                            },
                            {
                                "id":6,
                                "category_name":"500 and Above"
                            },
                        ]} />
                    </Box>
                    <Box className='product-card-display-section' h='fit-content' p={'4'}>
                        <HStack>
                            <Text fontSize={'xl'} fontWeight={'bold'} color={'blackAlpha.800'} w={'100%'}>Accessories & Wearables</Text>
                            <Select fontSize={'sm'} className='mobile-hide' w={'20%'} shadow={'md'} placeholder='Sort By:'>
                                <option selected value='Popularity'>Popularity</option>
                                <option value='Discount'>Discount</option>
                                <option value='Price Low to High'>Price Low to High</option>
                                <option value='Price High to Low'>Price High to Low</option>
                                <option value='Relevance'>Relevance</option>
                            </Select>
                        </HStack>
                        <SimpleGrid mt={'6'} columns={{base:1,lg:4}} spacing='4'>
                            {
                                products && products.length>0?(
                                    products.map((e,i)=>(
                                        <Product key={i} id={e._id} text={e.product_name} image={e.product_image} discount={e.product_discount} mrp={e.product_mrp} />
                                    ))
                                ):null
                            }
                        </SimpleGrid>
                    </Box>
                </Stack>
            </Container>
            <Box className='desktop-hide bottom-filter-floating-widget' shadow={'md'}>
                <Stack direction='row' spacing={1} align='center'>
                    <Button w={'100%'} onClick={onSortOpen} leftIcon={<SortUp />} fontWeight={'medium'} color={'blackAlpha.800'} bg={'white'} variant='unstyled'>
                        Sort
                    </Button>
                    <Center height='50px'>
                        <Divider orientation='vertical' />
                    </Center>
                    <Button w={'100%'} onClick={onFilterOpen} leftIcon={<Filter />} fontWeight={'medium'} color={'blackAlpha.800'} bg={'white'} variant='unstyled'>
                        Filter
                    </Button>
                </Stack>
            </Box>
            {/* Sort Modal Mobile */}
            <Modal onClose={onSortClose} size={'full'} isOpen={isSortOpen} isCentered motionPreset='slideInBottom'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Sort By:</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <HStack mb={'3'}>
                            <Text color={'blackAlpha.800'} w={'100%'} fontSize={'small'}>Popularity</Text>
                            <Checkbox colorScheme='teal'></Checkbox>
                        </HStack>
                        <HStack mb={'3'}>
                            <Text color={'blackAlpha.800'} w={'100%'} fontSize={'small'}>Discount</Text>
                            <Checkbox colorScheme='teal'></Checkbox>
                        </HStack>
                        <HStack mb={'3'}>
                            <Text color={'blackAlpha.800'} w={'100%'} fontSize={'small'}>Price Low to High</Text>
                            <Checkbox colorScheme='teal'></Checkbox>
                        </HStack>
                        <HStack mb={'3'}>
                            <Text color={'blackAlpha.800'} w={'100%'} fontSize={'small'}>Price High to Low</Text>
                            <Checkbox colorScheme='teal'></Checkbox>
                        </HStack>
                        <HStack mb={'3'}>
                            <Text color={'blackAlpha.800'} w={'100%'} fontSize={'small'}>Relevance</Text>
                            <Checkbox colorScheme='teal'></Checkbox>
                        </HStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button w={'100%'} variant={'outline'} mr={'2'} onClick={onSortClose}>Close</Button>
                        <Button w={'100%'} variant={'solid'} color={'white'} bg={'cyan.900'} onClick={onSortClose}>Apply</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {/* Filter Drawer Mobile */}
            <Drawer placement={'bottom'} size={'full'} onClose={onFilterClose} isOpen={isFilterOpen}>
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton pt={'4'} />
                <DrawerHeader borderBottomWidth='1px'>Filter</DrawerHeader>
                <DrawerBody>
                    <FilterSideBox title="Category" data={categories} />
                    {/* <FilterSideBox title="Brand" data={[
                        {
                            "id":1,
                            "title":"Advind Healthcare"
                        },
                        {
                            "id":2,
                            "title":"Allen"
                        },
                        {
                            "id":3,
                            "title":"Abena"
                        },
                        {
                            "id":4,
                            "title":"Abide"
                        },
                        {
                            "id":5,
                            "title":"Accusure"
                        },
                        {
                            "id":6,
                            "title":"Aquacolor"
                        },
                    ]} /> */}
                    <FilterSideBox title="Price" data={[
                            {
                                "id":1,
                                "category_name":"Below 99"
                            },
                            {
                                "id":2,
                                "category_name":"100 - 199"
                            },
                            {
                                "id":3,
                                "category_name":"200 - 299"
                            },
                            {
                                "id":4,
                                "category_name":"300 - 399"
                            },
                            {
                                "id":5,
                                "category_name":"400 - 499"
                            },
                            {
                                "id":6,
                                "category_name":"500 and Above"
                            },
                    ]} />
                </DrawerBody>
                <DrawerFooter borderTopWidth='1px'>
                    <Button w={'100%'} variant={'outline'} mr={'2'} onClick={onFilterClose}>Close</Button>
                    <Button w={'100%'} variant={'solid'} color={'white'} bg={'cyan.900'} onClick={onFilterClose}>Apply</Button>
                </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <Footer />
            <ScrollRestoration />
        </React.Fragment>
    )
}
