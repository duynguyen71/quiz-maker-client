import React from 'react';
import {Box, Button, Heading, Text, VStack} from "@chakra-ui/react";

const NotFoundQuiz = ({setShow}) => {
    return (
        <>
            <Box
                boxShadow={'2xl'}
                transform={
                    'translate(50%,-50%)'
                }
                maxW={'350px'}
                borderRadius={'xl'}
                position={'fixed'}
                bg={'gray.100'}
                top={'50%'}
                right={'50%'}
                align={'center'}
                zIndex={1000}>
                <VStack p={5} align={'start'}>
                    <Heading fontWeight={'medium'} color={'gray.600'} size={'20px'}>
                        Cound not find quiz with ID : quizID
                    </Heading>
                    <Text color={'gray.500'}>Please try another code</Text>
                    <Button
                        bg={'pink.700'}
                        color={'white'}
                        alignSelf={'end'}
                        onClick={
                            () => {
                                setShow(true)
                            }
                        }>Got it
                    </Button>
                </VStack>
            </Box>
        </>
    );
};

export default NotFoundQuiz;