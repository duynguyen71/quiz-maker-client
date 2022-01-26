import React, {useContext, useEffect, useRef, useState} from 'react';
import {Box, Button, Divider, Flex, Heading, HStack, Icon, SimpleGrid, Text} from "@chakra-ui/react";
import UserService from "../../../service/UserService";
import {useHistory, useParams} from "react-router-dom";
import {AdminContext} from "../../../providers/AdminSettingProvider";
import {formatDateDisplay, inRange, isOutDate} from "../../../utils/ApplicationUtils";
import {GrInfo} from 'react-icons/all';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'
import {useAdmin} from "../../../hooks/useAuth";

const AssignedInfo = () => {
        const {isLoading, setLoading} = useContext(AdminContext);
        const {setFullMode} = useAdmin();
        const {id} = useParams();

        const [info, setInfo] = useState(null);
        useEffect(() => {
            setFullMode(true);
            getInfo();
        }, []);

        const history = useHistory();
        //alert dialog properties
        const [isOpen, setIsOpen] = useState(false)
        const onStartQuiz = () => {
            setIsOpen(false)
            if (inRange(info.startDate, info.finishDate)) {
                history.push(`/admin/join/exam/quiz/${info.quiz.code}/start`);
            }
        }
        const cancelRef = useRef()

        const getInfo = async () => {
            try {
                setLoading(true)
                const resp = await UserService.getAssignedQuizInfo(id);
                console.log(resp.data);
                setInfo(resp.data);
            } catch (e) {

            } finally {
                setLoading(false)
            }
        }
        const handleJoinButton = async () => {

            if (info.status === 0 && inRange(info.startDate, info.finishDate)) {
                setIsOpen(true);
            } else {
                history.push(`/admin/join/exam/quiz/${info.quiz.code}/start`)
            }

        }

        return (
            <Flex direction={'column'}>
                <Flex>
                    <Flex bg={'white'} p={'5'} direction={'column'} flex={7}>
                        <Heading>TITLE</Heading>
                        <HStack>
                            <Text>{info && info.title}</Text>
                            <Text>{formatDateDisplay(info && info.startDate)}</Text>
                        </HStack>
                        <Text>{info && info.description}</Text>
                        <Divider py={'2'}/>
                        <Flex py={2} justifyContent={'end'}>
                            <Text>Den han</Text>
                            <Box w={'20px'}/>
                            <Text>{formatDateDisplay(info && info.finishDate)}</Text>
                        </Flex>
                    </Flex>
                    <Box w={'20px'}/>
                    {!isLoading && info &&
                    <Flex bg={'white'} p={'5'} direction={'column'} justifyContent={'space-between'} flex={3}>
                        <Flex justifyContent={"space-between"}>
                            <Text>Status</Text>
                            <Text
                                textColor={'green'}
                                fontWeight={'medium'}>{info.status === 1 ? 'Da nop'
                                : (info.status === 0 && isOutDate(info.finishDate) ? 'Thieu' : 'Da giao')}</Text>
                        </Flex>
                        <Box w={'100%'}>
                            <Button
                                onClick={handleJoinButton}
                                disabled={info.status == 0 && isOutDate(info.finishDate) || (info.status == 0 && !inRange(info.startDate, info.finishDate))}
                                colorScheme={'blue'} w={'100%'}>{info.status === 1 ? 'View'
                                : (info.status === 0 && !isOutDate(info.finishDate) && 'Join')}</Button>
                        </Box>
                    </Flex>

                    }
                </Flex>
                {
                    !isLoading && info && (
                        <Flex p={'5'} bg={'white'} my={5} direction={'column'}>
                            <Heading>
                                {info.quiz.title}
                            </Heading>
                            <SimpleGrid columns={3} spacing={5}>
                                <HStack>
                                    <Icon as={GrInfo}/>
                                    <Text>{info.quiz.numOfQuestions} Questions </Text>
                                </HStack>
                                <HStack>
                                    <Icon as={GrInfo}/>
                                    <Text> Code : {info.quiz.code} </Text>
                                </HStack>
                                <HStack>
                                    <Icon as={GrInfo}/>
                                    <Text>Create Date {formatDateDisplay(info.quiz.createDate)}  </Text>
                                </HStack>
                                <HStack>
                                    <Icon as={GrInfo}/>
                                    <Text>Quiz Score {info.quiz.score}  </Text>
                                </HStack> <HStack>
                                <Icon as={GrInfo}/>
                                <Text>Limit time {info.quiz.limitTime}  </Text>
                            </HStack>
                            </SimpleGrid>
                        </Flex>
                    )
                }
                {!isLoading && info && <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onStartQuiz}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                Join quiz {info.quiz.title}
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Are you sure? You have only once attempt to do.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                                <Button colorScheme='red' onClick={onStartQuiz} ml={3}>
                                    OK
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>}
            </Flex>
        );
    }
;

export default AssignedInfo;