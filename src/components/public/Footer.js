import * as React from 'react';
import {
    Box,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    Link,
    Input,
    Button,
    ButtonGroup,
    IconButton,
    Divider, Center, useColorModeValue,
} from "@chakra-ui/react";
import {FaGithub, FaLinkedin, FaTwitter} from 'react-icons/fa';

const Footer = () => {
    return (
        <Box bg={'white'} borderTop="1px" borderColor="gray.200"
            minH={'50vh'}
            // bg={'#2D3748'}
            alignItems={'center'}
            justifyItems={'center'}>
            <SimpleGrid columns={[1,2,3]} spacing={10} px={20} pt={10} pb={10}>

                <Box minW="130px">
                    <FooterHeading mb="4">Product</FooterHeading>

                    <Stack>
                        <Link>How it works</Link>
                        <Link>Pricing</Link>
                        <Link>Use Cases</Link>
                    </Stack>
                </Box>
                <Box minW="130px">
                    <FooterHeading mb="4">Product</FooterHeading>

                    <Stack>
                        <Link>Privacy</Link>
                        <Link>Terms</Link>
                        <Link>License</Link>
                    </Stack>
                </Box>
                <Box minW='130px'>
                    <Stack spacing="4">
                        <FooterHeading mb="4">  Subscribe to our newsletter</FooterHeading>

                        <Text>Get notified when we add new components or we have exciting news for you.</Text>
                        <Stack spacing="4" direction={{base: 'column', md: 'row'}}>
                            <Input
                                placeholder="Enter your email"
                                type="email"
                                required
                            />
                            <Button
                                type="submit"
                                colorScheme="blue"
                                flexShrink={0}
                                width={{base: 'full', md: 'auto'}}
                            >
                                Subscribe
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </SimpleGrid>
            <Center>
                <Divider orientation="horizontal" width={'95%'}/>
            </Center>
            <Stack
                p={4}
                direction={{base: 'column-reverse', md: 'row'}}
                justifyContent="space-between"
                alignItems="center"
            >

                <FooterHeading mb="2">     &copy; {new Date().getFullYear()} Envelope, Inc. All rights reserved.</FooterHeading>
                <ButtonGroup
                    variant="ghost"
                    // color="white"
                >
                    <IconButton as="a" href="#" aria-label="LinkedIn" icon={<FaLinkedin fontSize="20px"/>}/>
                    <IconButton as="a" href="#" aria-label="GitHub" icon={<FaGithub fontSize="20px"/>}/>
                    <IconButton as="a" href="#" aria-label="Twitter" icon={<FaTwitter fontSize="20px"/>}/>
                </ButtonGroup>
            </Stack>
        </Box>
    );
};

export default Footer;

export const FooterHeading = ({...props}) => (
    <Heading
        as="h4"
        color={useColorModeValue('gray.600', 'gray.400')}
        fontSize="sm"
        fontWeight="semibold"
        textTransform="uppercase"
        letterSpacing="wider"
        {...props}
    />
)