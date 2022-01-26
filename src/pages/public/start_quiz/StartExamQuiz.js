import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider, Flex,
    Heading,
    HStack, IconButton,
    SimpleGrid,
    Text,
    Tooltip,
    VStack,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from "@chakra-ui/react";
import {ArrowDownIcon, ArrowUpIcon, TimeIcon} from "@chakra-ui/icons";
import {useQuiz} from "../../../providers/QuizProvider";
import axios from "axios";
import {useHistory, useParams} from "react-router-dom";
import quizApi from "../../../api/quizApi";
import CustomAlertDialog from "../../../components/CustomAlertDialog";
import {useAdmin, useAuth} from "../../../hooks/useAuth";
import QuizService from "../../../service/QuizService";
import SubmitReportEntry from "./SubmitReportEntry";
import format from 'dateformat';
import UserService from "../../../service/UserService";
import {AdminContext} from "../../../providers/AdminSettingProvider";

const StartQuiz = () => {

    const [foundedQuiz, setFoundedQuiz] = useState();
    const {isLoading, setLoading} = useContext(AdminContext);
    const {code} = useParams();
    const [isOpen, setOpen] = useState(false);
    const [report, setReport] = useState(null);
    const cancelRef = useRef();
    const {user} = useAuth();
    const [submitContent, setSubmitContent] = useState({answers: []});
    const history = useHistory();
    const {setFullMode} = useAdmin();
    //alert dialog
    const [isOpen2, setIsOpen2] = React.useState(false)
    const onClose = () => setIsOpen2(false)
    const cancelRef2 = React.useRef()

    useEffect(async () => {
            setFullMode(false);
            setLoading(true);
            try {
                const resp = await UserService.getSubmissionAnswers(code);
                console.log(resp.data);
                const data = resp.data;
                if (data.isComplete) {
                    setReport(data);
                }
            } catch (e) {

            }
            try {
                setLoading(true);
                const resp2 = await UserService.getAssignedQuizDetail(code);
                setFoundedQuiz(resp2.data);
                setSubmitContent((prev) => ({
                    ...prev, quizId: resp2.data.id, startTime: new Date()

                }))
                console.log(resp2.data);
            } catch (e) {
                console.log(e.response.data);
                // history.push('/')
            } finally {
                setLoading(false);
            }


            setLoading(false);
        }
        , []);


    const onCheckOption = (e, question, option) => {
        if (e.target.checked) {
            if ((submitContent.answers.filter((item) => item.questionId === question.questionId)).length > 0) {
                setSubmitContent((prev) => ({
                    ...prev,
                    answers: prev.answers.map((item) => item.questionId !== question.questionId ? item : {
                        ...item,
                        options: [
                            ...new Set([...item.options,
                                option.optionId])
                        ]
                    })
                }))
            }
            //
            else {
                setSubmitContent((prev) => ({
                    ...prev,
                    answers: [...prev.answers, {
                        questionId: question.questionId,
                        options: [
                            option.optionId
                        ]
                    }]
                }))
            }
        } else {
            setSubmitContent((prev) => {
                return {
                    ...prev,
                    answers: prev.answers.map((item) => {
                            if (item.questionId !== question.questionId) {
                                return item;
                            } else {
                                return ({
                                    ...item,
                                    options: [
                                        ...new Set(item.options.filter(optionId => optionId !== option.optionId))
                                    ]
                                })

                            }


                        }
                    )
                }
            })
        }
    }
    const submitAnswers = async () => {
        try {
            setLoading(true);
            const data = await UserService.submitExamQuiz(JSON.stringify(submitContent));
            setReport(data.data);
            console.log(data.data);
            // window.location.reload();
        } catch (e) {


        } finally {
            window.scroll(0, 0);
            setLoading(false);
        }

    }
    const getQuestionAndOption = (questionId, optionId) => {
        if (!isLoading&&report) {

            for (let i = 0; i < report.answers.length; i++) {
                let questionAnswer = report.answers[i];
                if (questionAnswer.id === questionId) {
                    for (let j = 0; j < questionAnswer.options.length; j++) {
                        if (questionAnswer.options[j].id === optionId) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        return false;
    }

    return (
        <Flex direction={'column'} bg={'blue.100'}>
            <CustomAlertDialog
                title={'Submit answers'}
                description={'Are you sure? You can\'t undo this action afterwards.'}
                isOpen={isOpen}
                setOpen={setOpen}
                cancelRef={cancelRef}
                onSubmit={() => submitAnswers()}
            />
            {/*QUIZ SUBMIT ANSWERS REPORT*/}
            {report && <Box bg={''} mx={'5'} mt={'5'} p={5}>
                <Heading>Submit Report</Heading>
                <SimpleGrid spacing={5} columns={'4'} py={5}>
                    <SubmitReportEntry title={'score'} content={`${report.score}/${report.quizScore}`}/>
                    <SubmitReportEntry title={'questions'}
                                       content={`${report.submitQuestionsCount}/${report.numOfQuestions}`}/>
                    <SubmitReportEntry title={'startTime'} content={`${format(report.startTime, "dd-mm hh:MM")}`}/>
                    <SubmitReportEntry title={'finishTime'} content={`${format(report.finishTime, "dd-mm hh:MM")}`}/>
                    <SubmitReportEntry title={'attempt'} content={`${report.attempt}`}/>
                </SimpleGrid>
            </Box>}

            <Box minH={'100vh'} bg={'blue.100'} p={10}
                 align={'center'}>
                {
                    !isLoading && foundedQuiz && <Box
                        bg={'white'}
                        borderRadius={'md'}
                        boxShadow={'xl'}
                        minH={'100vh'}
                        maxW={'860px'}
                        p={10}>
                        <VStack position={'relative'}>

                            {/*
                           QUIZ TITLE
                           */}
                            <Heading
                                pb={10}
                                color={'purple.600'}
                                fontSize={30}>
                                {foundedQuiz != null ? foundedQuiz.title : ''}
                            </Heading>
                            {/*NUMBER OF QUESTIONS*/}
                            <Text
                                fontWeight={'medium'}
                                color={'teal'}
                                letterSpacing={1}
                                fontStyle={'italic'}
                                position={'absolute'}
                                top={0}
                                right={0}
                                m={5}>
                                {foundedQuiz && foundedQuiz.questions && foundedQuiz.questions.length} Questions
                            </Text>
                            {/*QUESTIONS*/}
                            {
                                !isLoading && foundedQuiz && foundedQuiz.questions && foundedQuiz.questions.map((question, i) => (
                                    <VStack
                                        w={'100%'}
                                        align={'start'}
                                        textAlign={'start'} key={i}
                                        p={2}
                                        spacing={5}>
                                        {/*
                                    QUESTION TITLE
                                    */}
                                        <Container w={'100%'} maxW="4xl">
                                            <Box maxW="4xl">
                                                <Text fontWeight={'medium'} fontSize={20} color={'purple.900'}>
                                                    {i + 1}. {question.title} \t QuestionID : {question.questionId}
                                                </Text>
                                            </Box>
                                        </Container>
                                        {/*OPTIONS*/}
                                        <SimpleGrid
                                            w={'100%'}
                                            columns={2}
                                            spacing={4}
                                            align={'start'}
                                            textAlign={'start'}>
                                            {
                                                question.options.map((option, i) => {
                                                    let filterElement = submitContent.answers.filter(v => v['questionId'] === question.questionId)[0];
                                                    return (
                                                        <Container
                                                            w={'100%'}
                                                            minW={300}
                                                            key={i}
                                                            // maxW="xl"
                                                            align={'start'}
                                                            textAlign={'start'}
                                                            alignItems={'start'}
                                                        >
                                                            <Box
                                                                padding={1}
                                                                // maxW="3xl"
                                                            >
                                                                <Checkbox
                                                                    // isChecked={report && getQuestionAndOption(question.questionId, option.optionId)}
                                                                    isDisabled={report !== null}
                                                                    defaultChecked={
                                                                        ((report && getQuestionAndOption(question.questionId, option.optionId))
                                                                            || (filterElement && filterElement.options.filter(o => o === option.optionId)[0])
                                                                        )
                                                                    }
                                                                    onChange={(e) => onCheckOption(e, question, option)}
                                                                    value={option.optionId}
                                                                    colorScheme={'teal'}
                                                                    size={'lg'}>
                                                                    {option.content} \t OptionID : {option.optionId}
                                                                </Checkbox>
                                                            </Box>
                                                        </Container>
                                                    );
                                                })
                                            }
                                        </SimpleGrid>
                                        <Divider/>
                                    </VStack>
                                ))
                            }
                            {/* Submit button*/}
                            <Box py={5} align={'end'} alignSelf={'end'}>
                                <Button
                                    isDisabled={report !== null}
                                    onClick={() => {
                                        setOpen(true)
                                        setSubmitContent((prevState => ({
                                            ...prevState,
                                            finishTime: new Date(),
                                        })))
                                    }}
                                    alignSelf={'end'} size={'lg'} colorScheme={'teal'}>Submit</Button>
                            </Box>
                        </VStack>

                        {/* FIXED CONTENTS*/}
                        <HStack zIndex={100} position={'fixed'} bottom={10} right={20}>
                            <Tooltip label={"Scroll to top"}>
                                <IconButton
                                    onClick={() => window.scrollTo(0, 0)}
                                    colorScheme={'teal'}
                                    icon={<ArrowUpIcon/>}/>
                            </Tooltip>
                            <Tooltip label={"Scroll to bottom"}>
                                <IconButton
                                    // aria-label={""}
                                    onClick={() => {
                                        // pageRef.current.scrollIntoView({
                                        //     behavior: "smooth",
                                        //     block: "end",
                                        //     inline: "nearest"
                                        // })
                                    }}
                                    colorScheme={'teal'}
                                    icon={<ArrowDownIcon/>}/>
                            </Tooltip>
                        </HStack>
                        {report === null && <Flex p={1} position={'fixed'} left={0} top={0} m={10}>
                            <Button
                                isDisabled={report !== null}
                                size={'md'} colorScheme={'teal'} variant={'outline'}
                                leftIcon={<TimeIcon/>}>{foundedQuiz.limitTime || 'No Time Limit'}{' '}
                                left</Button>
                        </Flex>}
                    </Box>


                }
            </Box>
            <AlertDialog
                isOpen={isOpen2}
                leastDestructiveRef={cancelRef2}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Customer
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef2} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={onClose} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Flex>
    );
};

export default StartQuiz;