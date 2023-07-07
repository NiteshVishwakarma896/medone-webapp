import React, { useEffect, useRef, useState } from 'react'
import { Box,Text,Button,Stack,Center,Divider,Input, IconButton, HStack, Tag,} from '@chakra-ui/react'
import NavigationDrawer from '../Drawer/NavigationDrawer'
import LocationDrawer from '../Drawer/LocationDrawer'
import { Search2Icon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const searchRef = useRef(null);
    const [show, setShow] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const navigation = useNavigate();

    useEffect(()=>{
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', scrollFunction);
            return () => {
              window.removeEventListener('scroll', scrollFunction);
            };
        }
    },[lastScrollY])

    const scrollFunction = () => {
        if (typeof window !== 'undefined') { 
            if (window.scrollY > 80) {
                setShow(true)
                searchRef.current.style.display = "flex"
            } else {
                searchRef.current.style.display = "none"
                setShow(false)
            }
            setLastScrollY(window.scrollY); 
        }
    }
    return (
        <React.Fragment>
            <Box className='navbar' bg='white' shadow={'md'}  >
                <Box bg='white' p={2} color='black' style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',paddingLeft:"4%",paddingRight:"4%"}} >
                    <Box style={{display:'flex',flex:1,alignItems:'center',cursor:'pointer'}}>
                        <i className="bi bi-capsule-pill" style={{fontSize:'1.25rem',marginRight:'1rem'}}></i>
                        <Text onClick={()=>navigation('/')} fontSize={'xl'} color={'cyan.900'} as={'b'} >MedOne</Text>
                        <Center height='32px' width='6' >
                            <Divider orientation='vertical' />
                        </Center>
                        <LocationDrawer />
                    </Box>
                    {
                        show?(
                            <Box ref={searchRef} w={'70%'} className='search-header mobile-hide' pl={'6'} pr={'2'}>
                                <Input type='search' width={'100%'} borderRadius={'0'} borderLeftRadius={'4'} placeholder='Search for medicines, health drinks...' className='search-input' bg={'white'} />
                                <IconButton onClick={()=>navigation('/search')} bg={'cyan.700'} color={'white'}  borderRadius={'0'} borderRightRadius={'4'} aria-label='Search' icon={<Search2Icon />} />
                            </Box>
                        ):null
                    }
                    <Box className='mobile-hide' style={{display:'flex',flexDirection:'row',alignItems:'flex-end'}}>
                        <Stack spacing={1} direction='row' align='center'>
                            <Button onClick={()=>navigation('/cart')} colorScheme='white' variant='ghost' style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                <i className="bi bi-cart3" style={{fontSize:'1.25rem',marginRight:'0.5rem'}}></i>
                                <span style={{fontSize:'0.85rem'}}>Cart</span>
                            </Button >
                            <Button onClick={()=>navigation('/login')} colorScheme='white' variant='ghost' style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                <i className="bi bi-person" style={{fontSize:'1.25rem',marginRight:'0.5rem'}}></i>
                                <span style={{fontSize:'0.85rem'}}>Hello, Log In</span>
                            </Button >
                        </Stack>
                    </Box>
                    <Button onClick={()=>navigation('/cart')} className='desktop-hide' colorScheme='white' variant='ghost' style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <i className="bi bi-cart3" style={{fontSize:'1.25rem',marginRight:'0.5rem'}}></i>
                    </Button >
                    <NavigationDrawer/>
                </Box>
                {
                    show?(
                        <Box w={'100%'} style={{display:'flex',flexDirection:'column',alignItems:'center'}} className='mobile-hide' pl={'16'} pr={'16'}>
                            <HStack  spacing={4} p={4}>
                                <Tag size={'md'} cursor={'pointer'} variant='solid' colorScheme='teal' fontWeight={'light'}>
                                    Medicines
                                </Tag>
                                <Tag size={'md'} cursor={'pointer'} variant='solid' colorScheme='teal' fontWeight={'light'}>
                                    Health Drinks
                                </Tag>
                                <Tag size={'md'} cursor={'pointer'} variant='solid' colorScheme='teal' fontWeight={'light'}>
                                    Skin Care
                                </Tag>
                                <Tag size={'md'} cursor={'pointer'} variant='solid' colorScheme='teal' fontWeight={'light'}>
                                    Home Care
                                </Tag>
                                <Tag size={'md'} cursor={'pointer'} variant='solid' colorScheme='teal' fontWeight={'light'}>
                                    Personal Care
                                </Tag>
                                <Tag size={'md'} cursor={'pointer'} variant='solid' colorScheme='teal' fontWeight={'light'}>
                                    Elderly Care
                                </Tag>
                                <Tag size={'md'} cursor={'pointer'} variant='solid' colorScheme='teal' fontWeight={'light'}>
                                    Fitness
                                </Tag>
                                <Tag size={'md'} cursor={'pointer'} variant='solid' colorScheme='teal' fontWeight={'light'}>
                                    Diabetic
                                </Tag>
                                <Tag size={'md'} cursor={'pointer'} variant='solid' colorScheme='teal' fontWeight={'light'}>
                                    Medicines
                                </Tag>
                                <Tag size={'md'} cursor={'pointer'} variant='solid' colorScheme='teal' fontWeight={'light'}>
                                    Health Drinks
                                </Tag>
                                <Tag size={'md'} cursor={'pointer'} variant='solid' colorScheme='teal' fontWeight={'light'}>
                                    Skin Care
                                </Tag>
                            </HStack>
                        </Box>
                    ):null
                }
                {
                    show?(
                        <Box ref={searchRef} className='search-header desktop-hide' pt={'1.5'} pl={'4'} pr={'4'} pb={'2.5'}>
                            <Input type='search' width={'100%'} borderRadius={'0'} borderLeftRadius={'4'} placeholder='Search for medicines, health drinks...' className='search-input' bg={'white'} />
                            <IconButton  onClick={()=>navigation('/search')} bg={'cyan.700'} color={'white'}  borderRadius={'0'} borderRightRadius={'4'} aria-label='Search' icon={<Search2Icon />} />
                        </Box>
                    ):null
                }
            </Box>
        </React.Fragment>
  )
}
