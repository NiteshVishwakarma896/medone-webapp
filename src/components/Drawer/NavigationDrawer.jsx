import React from 'react'
import { IconButton,Drawer,DrawerBody,DrawerFooter,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure, Box, Stack, Button, Text, Menu, MenuButton, MenuList, MenuGroup, MenuItem, MenuDivider, Divider} from '@chakra-ui/react'
import { List } from "react-bootstrap-icons";
import { useGlobalData } from '../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';

export default function NavigationDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigation = useNavigate();
    const {globalData} = useGlobalData();
    const btnRef = React.useRef()
    const _logout = ()=>{
        localStorage.removeItem('user');
        window.location.reload();
    }
    return (
        <React.Fragment>
            <IconButton ref={btnRef} onClick={onOpen} className='desktop-hide' aria-label='Menu' color={'black'} icon={<List />} />
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton size={'lg'} />
                    <DrawerBody>
                        <Box mt={'14'} float={'right'}>
                            <Stack spacing={1} direction='column' align='flex-end'>
                                <Button onClick={()=>navigation('/offers')} colorScheme='teal' w={'100%'} variant='unstyled'>
                                    <Text fontWeight={'medium'} float={'right'} style={{fontSize:'1.25rem',fontWeight:'400'}}>Offers</Text>
                                </Button >
                                <Button onClick={()=>navigation('/cart')} colorScheme='teal' w={'100%'} variant='unstyled'>
                                    <Text fontWeight={'medium'} float={'right'} style={{fontSize:'1.25rem',fontWeight:'400'}}>Cart</Text>
                                </Button >
                                <Button onClick={()=>navigation('/cart')} colorScheme='teal' w={'100%'} variant='unstyled'>
                                    <Text float={'right'} fontWeight={'medium'} style={{fontSize:'1.25rem',fontWeight:'400'}}>Docs</Text>
                                </Button >
                                <Button onClick={()=>navigation('/cart')} colorScheme='teal' w={'100%'} variant='unstyled'>
                                    <Text float={'right'} fontWeight={'medium'} style={{fontSize:'1.25rem',fontWeight:'400'}}>FAQ's</Text>
                                </Button >
                                <Button onClick={()=>navigation('/cart')} colorScheme='teal' w={'100%'} variant='unstyled'>
                                    <Text float={'right'} fontWeight={'medium'} style={{fontSize:'1.25rem',fontWeight:'400'}}>Help & Support</Text>
                                </Button >
                                <Divider orientation='horizontal' variant={'dashed'} height={'2'} width={'xl'} borderColor={'blackAlpha.700'} />
                                {
                                    globalData.token?(
                                        <Menu >
                                            <MenuButton as={Button} variant={'unstyled'} style={{display:'flex',flexDirection:'row',alignItems:'center'}}  rightIcon={<ChevronDownIcon />}>
                                                <Text fontSize={'1.25rem'} fontWeight={'400'}>{globalData.name?globalData.name:null}</Text>
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
                                        <Button onClick={()=>navigation('/login')} colorScheme='teal' w={'100%'} variant='unstyled'>
                                            <Text  float={'right'} style={{fontSize:'1.25rem',fontWeight:'400'}}>Hello, Log In</Text>
                                        </Button >
                                    )
                                }
                                
                                
                            </Stack>
                        </Box>
                    </DrawerBody>

                    <DrawerFooter>
                        <Text fontSize={'sm'}>© 2022 MedOne | All In One Pharmacy. All rights reserved</Text>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </React.Fragment>
    )
}
