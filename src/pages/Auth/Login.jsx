import React from 'react';
import { Flex,Box,FormControl,FormLabel,Input,Checkbox,Stack,Link,Button,Heading,Text,useColorModeValue } from '@chakra-ui/react';
import Footer from '../../components/Navigation/Footer';
import { useNavigate } from 'react-router-dom';
  
export default function Login() {
    const navigation = useNavigate();
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
                    <Input type="email" />
                    </FormControl>
                    <FormControl id="password">
                    <FormLabel fontSize={'sm'}>Password</FormLabel>
                    <Input type="password" />
                    </FormControl>
                    <Stack spacing={10}>
                    <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}>
                        <Link fontSize={'sm'} color={'blue.400'}>Forgot password?</Link>
                    </Stack>
                    <Button
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