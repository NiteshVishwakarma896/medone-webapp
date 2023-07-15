import React, { useEffect, useState } from 'react';
import { Flex,Box,FormControl,FormLabel,Input,Checkbox,Stack,Link,Button,Heading,Text,useColorModeValue, useToast } from '@chakra-ui/react';
import Footer from '../../components/Navigation/Footer';
import { useNavigate } from 'react-router-dom';
import { useGlobalData } from '../../context/GlobalContext';
import { apiUrl } from './../../utils/url';
  
export default function Login() {
    const navigation = useNavigate();
    const toast = useToast();
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const {setGlobalData} = useGlobalData();
    const isLoggedIn = localStorage.getItem('user');
    // 
    const _handlerLogin = ()=>{
        if(email === null || password === null){
            toast({
                description:"Please fill in the email and password to continue !",
                status:'error',
                isClosable:true,
                duration:3000,
                variant:'subtle'
            })
        }
        else{
            try {
                fetch(`${apiUrl}/users/signin`,{
                    method:"POST",
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        email:email,
                        password:password
                    })
                })
                .then(res=>
                    {
                        if(res.status === 401){
                            toast({
                                title:"Invalid email or password",
                                description:"Please enter correct email id or password to continue !",
                                status:'error',
                                isClosable:true,
                                duration:3000,
                                variant:'subtle'
                            })
                            return res.json()
                        }
                        else{
                            return res.json()
                        }
                    })
                .then(data=>{
                    if(data.status === "403"){
                        toast({
                            title:"Contact help & support",
                            description:data.error,
                            status:'error',
                            isClosable:true,
                            duration:3000,
                            variant:'subtle'
                        })
                    }
                    if( data && data.status === "200"){
                        setGlobalData({token:data.token});
                        _getUserProfile(data.token)
                        navigation(`/`);
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
                    localStorage.setItem('user',JSON.stringify({
                        token:authToken,
                        name:data.data.name,
                        email:data.data.email
                    }))
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    // 
    useEffect(()=>{
        document.title="Sign In - MedOne | Medicines at your doorstep"
        if(isLoggedIn){
            setGlobalData({
                token:isLoggedIn.token,
                name:isLoggedIn.name,
                email:isLoggedIn.email,
            })
            navigation(`/`);
        }
    },[])
    // 
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
                <Heading fontSize={'3xl'}>Sign in to your account</Heading>
                <Text fontSize={'md'} color={'gray.600'}>
                    to access all <Link color={'blue.400'}>features</Link> ✌️
                </Text>
                </Stack>
                <Stack spacing={4} mt={'12'}>
                    <FormControl id="email">
                    <FormLabel fontSize={'sm'}>Email address</FormLabel>
                    <Input type="email" onChange={(e)=>setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl id="password">
                    <FormLabel fontSize={'sm'}>Password</FormLabel>
                    <Input type="password" onChange={(e)=>setPassword(e.target.value)} />
                    </FormControl>
                    <Stack spacing={10}>
                    <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}>
                        <Link fontSize={'sm'} color={'blue.400'}>Forgot password?</Link>
                    </Stack>
                    <Button
                        onClick={_handlerLogin}
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                        bg: 'blue.500',
                        }}>
                        Sign in
                    </Button>
                    <Text fontSize={'sm'} >Don't have an account ? <Link href='/register' color={'blue.400'}>Create account</Link></Text>
                    </Stack>
                </Stack>
                </Box>
            </Stack>
        </Flex>
        <Footer/>
        </React.Fragment>
    );
}