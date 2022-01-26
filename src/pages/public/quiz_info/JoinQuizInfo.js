import React, {useEffect, useState} from 'react';
import {Box, Button, ButtonGroup, CircularProgress, Flex, Heading, HStack, Text, VStack} from "@chakra-ui/react";
import {AiOutlineFieldNumber, RiNumbersFill, RiNumbersLine} from "react-icons/all";
import {TimeIcon} from "@chakra-ui/icons";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import {useQuiz} from "../../../providers/QuizProvider";
import quizApi from "../../../api/quizApi";
import {useAuth} from "../../../hooks/useAuth";
import QuizService from "../../../service/QuizService";

const JoinQuizInfo = () => {
    const [isLoading, setLoading] = useState(true);
    const {user} = useAuth();
    const history = useHistory();
    const {code} = useParams();
    const {foundedQuiz, setFoundedQuiz, setDirectUrl} = useQuiz();


    useEffect(async () => {
        setLoading(true);
        try {
            const data = await QuizService.getQuizByCode(code);
            setFoundedQuiz(data.data);
            console.log(data.data);

        } catch (e) {
            console.log(e.response.message);
        } finally {
            setLoading(false);
        }
    }, [])

    //handle button start
    const onStart = async () => {
        if (user == null || !localStorage.getItem('accessToken')) {
            setDirectUrl(`/join/quiz/${code}`);
            history.push("/login")
            return;
        }
        try {
            const data = await QuizService.getQuizQuestions(code);
            setFoundedQuiz(prev => ({
                ...prev,
                questions: data.data
            }))
            console.log(foundedQuiz);
            history.push(`/join/quiz/${code}/start`);

        } catch (e) {

        }
    }
    const onCancel = () => {
        history.goBack();
    }

    return (
        <Box bg={'blue.100'} minH={'100vh'}>
            {isLoading && <>
                <Box position={'fixed'}
                     top={'50%'}
                     right={'50%'}
                     minH={'100vh'}
                     minW={'100vw'}
                     zIndex={900}
                     opacity={0.5}
                     bg={'gray.100'}
                     transform={"translate(50%,-50%)"}/>
                <CircularProgress
                    position={'fixed'}
                    top={'50%'}
                    right={'50%'}
                    isIndeterminate
                    zIndex={901}
                    transform={"translate(50%,-50%)"}
                    value={30}
                    color="orange.400" thickness="12px"/>
            </>}
            {!isLoading && <Flex w={'100%'} direction={'column'}>
                <Box>
                    <VStack pt={10}>
                        {/*INFO*/}
                        <Box w={500} minW={200} bg={'white'} p={10} textAlign={'start'}>
                            <VStack alignItems={'start'} textAlign={'start'}>
                                <Box my={4}>
                                    <Heading fontSize={20}>{foundedQuiz.title}</Heading>
                                </Box>
                                <HStack spacing={5}>
                                    <Button leftIcon={<RiNumbersLine/>}>
                                        <Text>{foundedQuiz.numOfQuestions} question</Text>
                                    </Button>
                                    <Button leftIcon={<TimeIcon/>}>
                                        <Text>{foundedQuiz.limitTime} mins </Text>
                                    </Button>
                                </HStack>
                            </VStack>
                        </Box>
                        {/*  ACTION BUTTONS*/}
                        <VStack w={500} p={10} bg={'white'} minW={'200px'} spacing={8}>
                            <Button
                                onClick={onStart}
                                size={'lg'}
                                w={'100%'}
                                colorScheme={'teal'}>
                                Start
                            </Button>
                            <Button size={'lg'} w={'100%'} colorScheme={'blue'}>Share</Button>
                            <Button onClick={onCancel} size={'lg'} w={'100%'} colorScheme={'gray'}>Cancel</Button>
                        </VStack>
                    </VStack>
                </Box>
            </Flex>
            }
        </Box>
    );
};

export default JoinQuizInfo;