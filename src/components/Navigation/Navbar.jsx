import React, { useEffect, useRef, useState } from 'react'
import { Box,Text,Button,Stack,Center,Divider,Input, IconButton, HStack, Tag, Menu, MenuButton, MenuList, MenuItem, MenuDivider, MenuGroup} from '@chakra-ui/react'
import NavigationDrawer from '../Drawer/NavigationDrawer'
import LocationDrawer from '../Drawer/LocationDrawer'
import { ChevronDownIcon, Search2Icon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useGlobalData } from '../../context/GlobalContext'
import { Person } from 'react-bootstrap-icons'
import { apiUrl } from '../../utils/url'

export default function Navbar() {
    const searchRef = useRef(null);
    const {globalData} = useGlobalData();
    const [show, setShow] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [data,setData] = useState([]);
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

    const getCategories = ()=>{
        fetch(apiUrl+"/categories")
        .then((res)=>res.json())
        .then((data)=>{
          if(data.data.length>0){
              setData(data.data);
          }
        })
    }
    const _logout = ()=>{
        localStorage.removeItem('user');
        window.location.reload();
    }

    useEffect(()=>{
        getCategories();
    },[])

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
                            <Button onClick={()=>navigation('/offers')} colorScheme='white' variant='ghost' style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                <i className="bi bi-percent" style={{fontSize:'1.15rem',marginRight:'0.5rem'}}></i>
                                <Text color={'gray.700'} fontWeight={'medium'} style={{fontSize:'0.85rem'}}>Offers</Text>
                            </Button >
                            <Button onClick={()=>navigation('/cart')} colorScheme='white' variant='ghost' style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                <i className="bi bi-cart3" style={{fontSize:'1.25rem',marginRight:'0.5rem'}}></i>
                                <Text color={'gray.700'} fontWeight={'medium'} style={{fontSize:'0.85rem'}}>Cart</Text>
                            </Button >
                            {
                                globalData.token?(
                                    <Menu>
                                        <MenuButton as={Button} variant={'unstyled'} style={{display:'flex',flexDirection:'row',alignItems:'center'}} leftIcon={<Person style={{fontSize:"1.25rem"}}/>} rightIcon={<ChevronDownIcon />}>
                                            <Text fontSize={'sm'} fontWeight={'medium'} color={'gray.700'}>{globalData.name?globalData.name:null}</Text>
                                        </MenuButton>
                                        <MenuList>
                                            <MenuGroup title='Profile'>
                                                <MenuItem onClick={()=>navigation('/account')} fontSize={'sm'}>Your Account</MenuItem>
                                                <MenuItem onClick={()=>navigation('/account')} fontSize={'sm'}>Orders </MenuItem>
                                                <MenuItem onClick={()=>navigation('/account')} fontSize={'sm'}>Your Addresses </MenuItem>
                                            </MenuGroup>
                                            <MenuDivider />
                                            <MenuGroup title='Help'>
                                                <MenuItem fontSize={'sm'}>Docs</MenuItem>
                                                <MenuItem fontSize={'sm'}>FAQ</MenuItem>
                                                <MenuItem fontSize={'sm'}>Help & Support</MenuItem>
                                            </MenuGroup>
                                            <MenuDivider />
                                            <MenuItem onClick={_logout} fontSize={'sm'}>Logout</MenuItem>
                                        </MenuList>
                                    </Menu>
                                ):(
                                    <Button onClick={()=>navigation('/login')} colorScheme='white' variant='ghost' style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                        <i className="bi bi-person" style={{fontSize:'1.25rem',marginRight:'0.5rem'}}></i>
                                        <span style={{fontSize:'0.85rem',fontWeight:''}}>Hello, Log In</span>
                                    </Button >
                                )
                            }
                            
                            
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
                                {
                                    data.length>0?(
                                        data.slice(0, 10).map((e,i)=>(
                                            <Tag onClick={()=>navigation(`/search/categories/${e.category_name}`,{state:{name:e.category_name}})} size={'sm'} key={i} cursor={'pointer'} variant='solid' colorScheme='teal' fontWeight={'light'}>
                                                {e.category_name}
                                            </Tag>
                                        ))
                                    ):null
                                }
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
                {
                    globalData.location?(
                        <Box className='search-header desktop-hide' borderTop={'1px dashed'} borderColor={'gray.300'} pt={'3'} pl={'4'} pr={'4'} pb={'2.5'}>
                            <Box style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                <Text fontSize={'sm'} color={'blackAlpha.800'} fontWeight={'medium'}>Deliver to: </Text>
                                <Text fontSize={'small'} w={'fit-content'} noOfLines={1} textOverflow={'ellipsis'} ml={'2'} color={'teal.700'} fontWeight={'semibold'}>{globalData.location}</Text>
                            </Box>
                            <Text fontSize={'sm'} ml={'auto'} color={'teal.700'} fontWeight={'bold'}>{globalData.pincode}</Text>
                        </Box>
                    ):null
                }
            </Box>
        </React.Fragment>
  )
}
