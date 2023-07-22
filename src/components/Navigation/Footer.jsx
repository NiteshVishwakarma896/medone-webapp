import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';
import { Instagram, Twitter, Youtube } from 'react-bootstrap-icons';

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({children,label,href}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      className='footer'
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>Product</ListHeader>
            <Link fontSize={'sm'} href={'#'}>Overview</Link>
            <Link fontSize={'sm'} href={'#'}>Features</Link>
            <Link fontSize={'sm'} href={'#'}>Tutorials</Link>
            <Link fontSize={'sm'} href={'#'}>Pricing</Link>
            <Link fontSize={'sm'} href={'#'}>Releases</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Company</ListHeader>
            <Link fontSize={'sm'} href={'#'}>About Us</Link>
            <Link fontSize={'sm'} href={'#'}>Blog</Link>
            <Link fontSize={'sm'} href={'#'}>Careers</Link>
            <Link fontSize={'sm'} href={'#'}>Contact Us</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Link fontSize={'sm'} href={'#'}>Help Center</Link>
            <Link fontSize={'sm'} href={'#'}>Safety Center</Link>
            <Link fontSize={'sm'} href={'#'}>Community Guidelines</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Legal</ListHeader>
            <Link fontSize={'sm'} href={'#'}>Cookies Policy</Link>
            <Link fontSize={'sm'} href={'#'}>Privacy Policy</Link>
            <Link fontSize={'sm'} href={'#'}>Terms of Service</Link>
            <Link fontSize={'sm'} href={'#'}>Law Enforcement</Link>
          </Stack>
          
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}>
          <Text fontSize={'sm'}>© 2022 MedOne | All In One Pharmacy. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Twitter'} href={'#'}>
              <Twitter />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'#'}>
              <Youtube />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
              <Instagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}