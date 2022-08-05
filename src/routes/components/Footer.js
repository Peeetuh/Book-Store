import {
    Box,
    Container,
    Link,
    SimpleGrid,
    Stack,
    Text,
    Flex,
    useColorModeValue,
  } from '@chakra-ui/react';

  import Logo from "./Images/logo.png";
  
  const ListHeader = ({ children }) => {
    return (
      <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
        {children}
      </Text>
    );
  };
  
   function Footer() {
    return (
      <Box
        bg={useColorModeValue('#caf0f8')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Container as={Stack} maxW={'6xl'} py={10}>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
            <Stack align={'flex-start'}>
              <ListHeader>Product</ListHeader>
              <p>Overview</p>
              <Stack direction={'row'} align={'center'} spacing={2}>
                <p>Features</p>
              </Stack>
              <p>Pricing</p>
              <p>Releases</p>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Company</ListHeader>
              <p>About Us</p>
              <p>Press</p>
              <p>Contact Us</p>
              <p>Partners</p>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Legal</ListHeader>
              <p>Cookies Policy</p>
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
              <p>Status</p>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Follow Us</ListHeader>
              <Link>Facebook</Link>
              <Link>Twitter</Link>
              <Link>Instagram</Link>
              <Link>LinkedIn</Link>
            </Stack>
          </SimpleGrid>
        </Container>
        <Box py={10}>
          <Flex
            align={'center'}
            _before={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('#1D3557'),
              flexGrow: 1,
              mr: 8,
            }}
            _after={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('#1D3557'),
              flexGrow: 1,
              ml: 8,
            }}>
          <img className="logo" src={Logo} alt="logo" />
          </Flex>
          <Text pt={6} fontSize={'sm'} textAlign={'center'}>
            © 2022 TBM Bookstore. All rights reserved
          </Text>
        </Box>
      </Box>
    );
  }

  export default Footer;