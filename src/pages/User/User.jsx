import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navigation/Navbar'
import { Avatar, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink,  Button,  Container,Divider,Flex,FormControl,FormLabel,Image,Input,InputGroup,InputLeftElement,Modal,ModalBody,ModalCloseButton,ModalContent,ModalFooter,ModalHeader,ModalOverlay,Radio,RadioGroup,Stack,Text, useDisclosure, useRadio, useRadioGroup } from '@chakra-ui/react'
import { useGlobalData } from '../../context/GlobalContext'
import { Link } from 'react-router-dom';
import Footer from '../../components/Navigation/Footer';
import { BagCheck, GeoAlt, Lock, Person, QuestionCircle } from 'react-bootstrap-icons';
import { AddIcon, PhoneIcon} from '@chakra-ui/icons';
import Address from '../../components/Cards/Address';
import { apiUrl } from '../../utils/url';
import AccountOrders from './../../components/Cards/AccountOrders';
import NoAddressGif from '../../assets/no-address.gif';
import NoOrdersGif from '../../assets/no-orders.gif';

const RadioCard = (props)=>{
    const { getInputProps, getRadioProps } = useRadio(props)
  
    const input = getInputProps()
    const checkbox = getRadioProps()
  
    return (
      <Box as='label'>
        <input {...input} />
        <Box
          {...checkbox}
          cursor='pointer'
          borderWidth='1px'
          borderRadius='md'
          boxShadow='md'
          _checked={{
            bg: 'teal.600',
            color: 'white',
            borderColor: 'teal.600',
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          px={5}
          py={1}
          fontSize={'small'}
          fontWeight={'normal'}
        >
          {props.children}
        </Box>
      </Box>
    )
} 

export default function User() {
    const {globalData} = useGlobalData();
    const [orders,setOrders] = useState([]);
    const [addresses,setAddresses] = useState([]);
    const options = ['Home', 'Work', 'Others']
    const [name,setName] = useState(null);
    const [email,setEmail] = useState(null);
    const [phone,setPhone] = useState(null);
    const [tabIndex,setTabIndex] = useState(0);
    const { isOpen:isAddressModalOpen, onOpen:onAddressModalOpen, onClose:onAddressModalClose } = useDisclosure()
    const { getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: 'react',
        onChange: console.log,
    })
    const getAccountOrders = ()=>{
        fetch(apiUrl+"/cart/")
        .then((res)=>res.json())
        .then((data)=>{
          if(data.status == "200"){
            setOrders(data.data);
          }
        })
    }
    useEffect(()=>{
        if(globalData){
            setName(globalData.name);
            setEmail(globalData.email);
        }
        // getAccountOrders();
    },[])

    return (
        <React.Fragment>
            <Navbar />
            <Container maxW={'8xl'} pt={'16'} pl={'4'} pr={'4'} pb={'4'} h={'fit-content'}>
                <Breadcrumb mt={'4'}>
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} fontSize={'small'} to='/'>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink as={'p'} fontSize={'small'} >Account</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Box mt={'8'} w={'fit-content'} display={'flex'} flexDirection={'row'} alignItems={'center'}>
                    <Avatar name={globalData.name?globalData.name:null} src='https://bit.ly/broken-link' />
                    <Text ml={'2'} color={'gray.700'} fontWeight={'semibold'} fontSize={'xl'}>{globalData.name?globalData.name:null}</Text>
                </Box>
                <Flex mt={'4'} mb={'4'} direction={{base:'column',lg:'row'}} justifyContent={'flex-start'}>
                    <Flex w={{base:'100%',lg:'15%'}} direction={'column'}>
                        <Text fontSize={'sm'} color={'gray.500'} p={'2'} mb={'2'}>Manage your account</Text>
                        <Divider />
                        <Button textAlign={'left'} onClick={()=>setTabIndex(0)} isActive={tabIndex == 0?true:false} leftIcon={<GeoAlt />} variant={'unstyled'} fontWeight={'normal'} fontSize={'sm'} _active={{bg:'cyan.800',color:'white'}} borderRadius={'0'} p={'2'} mb={'2'} colorScheme='teal'>Your Addresses</Button>
                        <Button textAlign={'left'} onClick={()=>setTabIndex(1)} isActive={tabIndex == 1?true:false} leftIcon={<BagCheck />} variant={'unstyled'} fontWeight={'normal'} fontSize={'sm'} _active={{bg:'cyan.800',color:'white'}} borderRadius={'0'} p={'2'} mb={'2'} colorScheme='teal'>Your Orders</Button>
                        <Divider />
                        <Button textAlign={'left'} onClick={()=>setTabIndex(2)} isActive={tabIndex == 2?true:false} leftIcon={<Person />} variant={'unstyled'} fontWeight={'normal'} fontSize={'sm'} _active={{bg:'cyan.800',color:'white'}} borderRadius={'0'} p={'2'} mb={'2'} colorScheme='teal'>Manage Profile</Button>
                        <Button textAlign={'left'} onClick={()=>setTabIndex(3)} isActive={tabIndex == 3?true:false} leftIcon={<Lock />} variant={'unstyled'} fontWeight={'normal'} fontSize={'sm'} _active={{bg:'cyan.800',color:'white'}} borderRadius={'0'} p={'2'} mb={'2'} colorScheme='teal'>Change Password</Button>
                        <Divider />
                        <Button textAlign={'left'} onClick={()=>setTabIndex(4)} isActive={tabIndex == 4?true:false} leftIcon={<QuestionCircle />} variant={'unstyled'} fontWeight={'normal'} fontSize={'sm'} _active={{bg:'cyan.800',color:'white'}} borderRadius={'0'} p={'2'} mb={'2'} colorScheme='teal'>Help & Support</Button>
                    </Flex>
                    {
                        tabIndex==0?(
                            <Box w={{base:'100%',lg:'80%'}} p={'4'} ml={{base:'0',lg:'4'}}>
                                <Flex mb={'4'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                    <Text mr={'auto'} fontSize={'sm'} color={'gray.500'}>List of all your address...</Text>
                                    <Button onClick={onAddressModalOpen} size={'sm'} fontWeight={'medium'} fontSize={'small'} variant={'solid'}bg={'cyan.800'} colorScheme='teal' leftIcon={<AddIcon/>}>Add Address</Button>
                                </Flex>
                                {
                                    addresses.length>0?(<Address/>):(
                                        <Flex w={'100%'} direction={'column'} alignItems={'center'} justifyContent={'center'}>
                                            <Image src={NoAddressGif} objectFit={'contain'}/>
                                            <Text>No address in your list...</Text>
                                        </Flex>
                                    )
                                }
                            </Box>
                        ):(
                            tabIndex==1?(
                                <Box w={{base:'100%',lg:'80%'}} p={'4'} ml={{base:'0',lg:'4'}}>
                                    <Text fontSize={'sm'} mb={'4'} color={'gray.500'}>List of all your orders from past...</Text>
                                    {
                                        orders && orders.length>0 ? (
                                            orders.map((e,i)=>(
                                                <AccountOrders id={e._id} pid={e.product_id} product={e.product} qty={e.product_qty} price={e.product_price} key={i} />
                                            ))
                                        ) : (
                                            <Flex w={'full'} direction={'column'} alignItems={'center'} justifyContent={'center'}>
                                                <Image src={NoOrdersGif} objectFit={'contain'}/>
                                                <Text>No orders in your list...</Text>
                                            </Flex>
                                        )
                                    }
                                </Box>
                            ):(
                                tabIndex==2?(
                                    <Box w={{base:'100%',lg:'30%'}} p={'4'} ml={{base:'0',lg:'4'}}>
                                        <FormControl>
                                            <FormLabel htmlFor="first-name" fontSize={'sm'} fontWeight={'normal'}>
                                                Full name
                                            </FormLabel>
                                            <Input bg={'white'} defaultValue={name} autoComplete={'name'} id="first-name" fontSize={'sm'} placeholder="Full name" />
                                        </FormControl>
                                        <FormControl mt="4%">
                                            <FormLabel htmlFor="email" fontSize={'sm'} fontWeight={'normal'}>
                                            Email address
                                            </FormLabel>
                                            <Input id="email" defaultValue={email} autoComplete={'email'} fontSize={'sm'} type="email" />
                                        </FormControl>
                                        <FormControl mt="4%">
                                            <FormLabel htmlFor="tel" fontSize={'sm'} fontWeight={'normal'}>
                                            Contact No.
                                            </FormLabel>
                                            <InputGroup>
                                                <InputLeftElement pointerEvents='none'>
                                                    <PhoneIcon color='gray.300' />
                                                </InputLeftElement>
                                                <Input id="tel"  autoComplete={'phone'} fontSize={'sm'} type="tel" />
                                            </InputGroup>
                                        </FormControl>
                                        <Divider mt={'4'} mb={'4'}/>
                                        <Button colorScheme='teal' float={'right'} fontSize={'sm'} fontWeight={'normal'} variant='solid'>Save Changes</Button>
                                    </Box>
                                ):(
                                    tabIndex==3?(
                                        <Box w={{base:'100%',lg:'30%'}} p={'4'} ml={{base:'0',lg:'4'}}>
                                            <FormControl>
                                                <FormLabel htmlFor="current-password" fontSize={'sm'} fontWeight={'normal'}>
                                                    Current Password
                                                </FormLabel>
                                                <Input bg={'white'} id="current-password" type='password' fontSize={'sm'} placeholder="Current Password" />
                                            </FormControl>
                                            <FormControl mt="4%">
                                                <FormLabel htmlFor="current-password" fontSize={'sm'} fontWeight={'normal'}>
                                                    New Password
                                                </FormLabel>
                                                <Input bg={'white'} id="current-password" type='password' fontSize={'sm'} placeholder="New Password" />
                                            </FormControl>
                                            <FormControl mt="4%">
                                                <FormLabel htmlFor="current-password" fontSize={'sm'} fontWeight={'normal'}>
                                                    Confirm New Password
                                                </FormLabel>
                                                <Input bg={'white'} id="current-password" type='password' fontSize={'sm'} placeholder="Confirm New Password" />
                                            </FormControl>
                                            <Divider mt={'4'} mb={'4'}/>
                                            <Button colorScheme='teal' float={'right'} fontSize={'sm'} fontWeight={'normal'} variant='solid'>Change Password</Button>
                                        </Box>
                                    ):(
                                        tabIndex==4?(
                                            <Box w={'fit-content'} p={'4'} ml={{base:'0',lg:'4'}}>
                                                <Flex  mb={'4'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                                    <Text fontSize={'sm'} color={'gray.500'}>Support...</Text>
                                                </Flex>
                                            </Box>
                                        ):(null)
                                    )
                                )
                            )
                        )
                    }
                </Flex>
            </Container>
            <Footer />
            {/* Address Modal */}
            <Modal onClose={onAddressModalClose} size={{base:'full',lg:'lg'}} motionPreset='slideInBottom' isOpen={isAddressModalOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>
                    <AddIcon fontSize={'sm'} mr={'2'} />
                    Add new address
                </ModalHeader>
                <ModalCloseButton />
                <Divider mb={'2'}/>
                <ModalBody>
                    <FormControl>
                        <FormLabel fontSize={'small'}>Address Line 1</FormLabel>
                        <Input fontSize={'sm'}  />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel fontSize={'small'}>Address Line 2</FormLabel>
                        <Input fontSize={'sm'}  />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel fontSize={'small'}>City</FormLabel>
                        <Input fontSize={'sm'}  />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel fontSize={'small'}>Pincode</FormLabel>
                        <Input fontSize={'sm'}  />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel fontSize={'small'}>Address Type</FormLabel>
                        <RadioGroup>
                            <Stack direction='row'>
                                {options.map((value) => {
                                    const radio = getRadioProps({ value })
                                    return (
                                        <RadioCard key={value} {...radio}>
                                            {value}
                                        </RadioCard>
                                    )
                                })}
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                </ModalBody>
                <Divider mt={'4'}/>
                <ModalFooter>
                    <Button fontSize={'sm'} fontWeight={'normal'} variant={'solid'} colorScheme={'teal'} mr={'4'} onClick={onAddressModalClose}>Save Address</Button>
                    <Button fontSize={'sm'} fontWeight={'normal'} onClick={onAddressModalClose}>Close</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </React.Fragment>
    )
}
