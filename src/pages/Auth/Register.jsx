import { Flex, Box, FormControl, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link, Toast, useToast,} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Footer from '../../components/Navigation/Footer';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../utils/url';
import { useGlobalData } from '../../context/GlobalContext';

export default function Register() {
    const navigation = useNavigate();
    const toast = useToast();
    const [loading,setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [contact, setContact] = useState(null);
    const [password, setPassword] = useState(null);
    const [cpassword, setCPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const {setGlobalData} = useGlobalData();
    const isLoggedIn = localStorage.getItem('user');

    const _registerUser = ()=>{
        if(email === null || password === null || firstName === null || lastName === null || contact === null || cpassword === null){
            toast({
                description:"Please fill in all the required fields to continue !",
                status:'error',
                isClosable:true,
                duration:3000,
                variant:'subtle'
            })
        }
        else{
            var fullName = firstName+' '+lastName;
            try {
                fetch(`${apiUrl}/users/signup`,{
                    method:"POST",
                    headers:{
                        "Accept":"application/json",
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        name:fullName,
                        email:email,
                        contact:contact,
                        password:password,
                        cpassword:cpassword
                    })
                }).then(res=>res.json())
                .then(data=>{
                    if(data.status === "201"){
                        setLoading(true);
                        setGlobalData({token:data.token});
                        _getUserProfile(data.token)
                    }
                    else if(data.status === "403"){
                        toast({
                            description:data.error,
                            variant:'subtle',
                            status:'error',
                            duration:3000,
                            isClosable:true
                        })
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
    const _getUserProfile = (authToken)=>{
        try {
            fetch(`${apiUrl}/users/profile`,{
                method:"GET",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                    "Authorization": authToken
                }
            }).then(res=>res.json())
            .then(data=>{
                if(data.status === "200"){
                    setGlobalData({name:data.data.name,email:data.data.email})
                    setLoading(false)
                    localStorage.setItem('user',JSON.stringify({
                        token:authToken,
                        name:data.data.name,
                        email:data.data.email
                    }))
                    window.location.href = `/`;
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    // check passwords
    useEffect(()=>{
        if(cpassword){
            if(password != cpassword){
                setErrorMessage('Confirm password does not match!')
            }
            else{
                setErrorMessage(null);
            }
        }
    },[cpassword])

    useEffect(()=>{
        document.title="Create Account - MedOne | Medicines at your doorstep"
        if(isLoggedIn){
            setGlobalData({
                token:isLoggedIn.token,
                name:isLoggedIn.name,
                email:isLoggedIn.email,
            })
            navigation(`/`);
        }
    },[])

    return (
        <React.Fragment>
        <Flex minH={'100vh'} align={'center'} justify={'center'} className='auth-bg'>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack align={'center'}>
            <Box onClick={()=>navigation('/')} style={{display:'flex',flex:1,alignItems:'center',cursor:'pointer'}}>
                <i className="bi bi-capsule-pill" style={{fontSize:'1.25rem',marginRight:'1rem'}}></i>
                <Text fontSize={'4xl'} color={'cyan.900'} as={'b'} >MedOne</Text>
            </Box>
            <Heading fontSize={'3xl'} textAlign={'center'}>
                Create an account
            </Heading>
            </Stack>
            <Stack spacing={4} mt={'14'}>
                <HStack>
                <Box>
                    <FormControl id="firstName" isRequired>
                    <FormLabel fontSize={'sm'}>First Name</FormLabel>
                    <Input type="text" onChange={(e)=>setFirstName(e.target.value)} />
                    </FormControl>
                </Box>
                <Box>
                    <FormControl id="lastName">
                    <FormLabel fontSize={'sm'}>Last Name</FormLabel>
                    <Input type="text" onChange={(e)=>setLastName(e.target.value)} />
                    </FormControl>
                </Box>
                </HStack>
                <FormControl id="email" isRequired>
                <FormLabel fontSize={'sm'}>Email address</FormLabel>
                <Input type="email"  onChange={(e)=>setEmail(e.target.value)} />
                </FormControl>
                <FormControl id="phone" isRequired>
                <FormLabel fontSize={'sm'}>Phone Number</FormLabel>
                <Input type="number"  onChange={(e)=>setContact(e.target.value)} />
                </FormControl>
                <FormControl id="password" isRequired>
                <FormLabel fontSize={'sm'}>Password</FormLabel>
                <InputGroup>
                    <Input type={showPassword ? 'text' : 'password'}  onChange={(e)=>setPassword(e.target.value)} />
                    <InputRightElement h={'full'}>
                    <Button
                        variant={'ghost'}
                        onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                        }>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                    </InputRightElement>
                </InputGroup>
                </FormControl>
                <FormControl id="cpassword" isRequired>
                <FormLabel fontSize={'sm'}>Confirm Password</FormLabel>
                <InputGroup>
                    <Input type={showPassword ? 'text' : 'password'}  onChange={(e)=>setCPassword(e.target.value)} />
                    <InputRightElement h={'full'}>
                    <Button
                        variant={'ghost'}
                        onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                        }>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                    </InputRightElement>
                </InputGroup>
                </FormControl>
                {
                    errorMessage?<FormLabel color={'red'} fontSize={'small'}>{errorMessage}</FormLabel>:null
                }
                <Stack spacing={10} pt={2}>
                <Button
                    isLoading={loading}
                    onClick={_registerUser}
                    loadingText="Please wait...."
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                    bg: 'blue.500',
                    }}>
                    Create Account
                </Button>
                </Stack>
                <Stack pt={6}>
                <Text align={'center'}>
                    Already a user? <Link href='/login' color={'blue.400'}>Login</Link>
                </Text>
                </Stack>
            </Stack>
            </Box>
        </Stack>
        </Flex>
        <Footer/>
        </React.Fragment>
    );
}