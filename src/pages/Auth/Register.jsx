import { Flex, Box, FormControl, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link,} from '@chakra-ui/react';
import React, { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Footer from '../../components/Navigation/Footer';
import { useNavigate } from 'react-router-dom';
  
export default function Register() {
    const navigation = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

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
                    <Input type="text" />
                    </FormControl>
                </Box>
                <Box>
                    <FormControl id="lastName">
                    <FormLabel fontSize={'sm'}>Last Name</FormLabel>
                    <Input type="text" />
                    </FormControl>
                </Box>
                </HStack>
                <FormControl id="email" isRequired>
                <FormLabel fontSize={'sm'}>Email address</FormLabel>
                <Input type="email" />
                </FormControl>
                <FormControl id="phone" isRequired>
                <FormLabel fontSize={'sm'}>Phone Number</FormLabel>
                <Input type="number" />
                </FormControl>
                <FormControl id="password" isRequired>
                <FormLabel fontSize={'sm'}>Password</FormLabel>
                <InputGroup>
                    <Input type={showPassword ? 'text' : 'password'} />
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
                <Stack spacing={10} pt={2}>
                <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                    bg: 'blue.500',
                    }}>
                    Sign up
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