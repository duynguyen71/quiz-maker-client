import React from 'react';
import {Box, Button, Divider, Flex, HStack, Image, Text, VStack} from "@chakra-ui/react";
import {BiShare} from "react-icons/all";

const SettingDialog = ({setShow}) => {
    return (
        <>
            <Flex bg={'gray.100'} justifyContent={'center'}>
                <Box flex={3} align={'center'} borderRadius={'md'}>
                    <Box bg={'teal'} mx={5} p={5} borderRadius={'md'}>
                        <HStack>
                            <Image boxSize="70px"
                                   alt="Segun Adebayo"
                                   borderRadius={'md'}
                                   objectFit="cover"
                                   src="https://bit.ly/sage-adebayo"
                            />
                            <VStack align={'start'} textAlign={'start'}>
                                <Text>Title</Text>
                                <Text>Number of question</Text>
                            </VStack>
                        </HStack>
                    </Box>
                </Box>

                <Box borderRadius={'md'} boxShadow={'md'} flex={4} p={5} bg={'white'} align={'center'}>
                    <VStack spacing={10}>
                        <VStack w={300}>
                            <Button
                                onClick={()=>{
                                    setShow(false)
                                }}
                                colorScheme={'teal'} size={'lg'} w={400}>Start</Button>
                            <Button size={'lg'} w={400}>Challenge</Button>
                            <Button leftIcon={<BiShare/>} size={'lg'} w={400}>Share</Button>
                        </VStack>
                        <Divider colorScheme={'teal'}/>
                    </VStack>
                </Box>

                <Box flex={3} align={'center'}>
                </Box>

            </Flex>
        </>
    );
};

export default SettingDialog;