import React, {useEffect, useRef, useState} from 'react';
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
import {useAuth} from "../../../hooks/useAuth";
import QuizService from "../../../service/QuizService";
import SubmitReportEntry from "./SubmitReportEntry";
import format from 'dateformat';

const StartQuiz = () => {

    const {foundedQuiz, setFoundedQuiz} = useQuiz();
    const {code} = useParams();
    const [isLoading, setLoading] = useState(true);
    const [isOpen, setOpen] = useState(false);
    const [report, setReport] = useState(null);
    const cancelRef = useRef();
    const {user} = useAuth();
    const [submitContent, setSubmitContent] = useState({answers: []});
    const history = useHistory();

    useEffect(async () => {
            setLoading(true);
            try {
                if (!foundedQuiz) {
                    const quizInfo = await getQuizInfo();
                    //check private quiz
                    setFoundedQuiz(quizInfo);
                    setSubmitContent((prev) => ({
                        ...prev, quizId: quizInfo.id,
                        startTime: new Date()
                    }))
                    countDownTime(quizInfo.limitTime);
                    console.log(quizInfo)

                } else {
                    setSubmitContent((prev) => ({
                        ...prev, quizId: foundedQuiz.id, startTime: new Date()

                    }))
                    countDownTime(foundedQuiz.limitTime);

                }
                if ((foundedQuiz && !foundedQuiz.questions) || (!foundedQuiz)) {
                    const questions = await getQuizQuestions();
                    setFoundedQuiz(prev => ({
                        ...prev,
                        questions: questions
                    }))
                }

            } catch (e) {
                history.push('/')
            } finally {
                setLoading(false);
            }


            setLoading(false);
        }
        , []);


    const getQuizInfo = async () => {
        console.log("get quiz info")
        const data = await QuizService.getQuizByCode(code);
        return data.data;
    }
    const getQuizQuestions = async () => {
        console.log('get quiz\'s questions')
        const questions = await QuizService.getQuizQuestions(code);

        return questions.data;
    }

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
                            // item.questionId !== question.questionId ? item : {
                            //     ...item,
                            //     options: [
                            //         ...new Set(item.options.filter(optionId => optionId !== option.optionId))
                            //     ]
                            // }
                            if (item.questionId !== question.questionId) {
                                return item;
                            } else {
                                // let mOptions = item.options.filter(optionId => optionId !== option.optionId);
                                // return {
                                //     ...item,
                                //     options: [
                                //         ...new Set(mOptions)
                                //     ]
                                // }
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
        const data = await QuizService.submissionAnswers(JSON.stringify(submitContent));
        setReport(data.data);
        console.log(data);
    }
    const [timer, setTimer] = useState('');
    const countDownTime = async (duration) => {
        duration = duration * 60;
        let timer = duration, minutes, seconds;
        let i = setInterval(function () {
            minutes = parseInt(timer / 60);
            seconds = parseInt(timer % 60);

            minutes = minutes <= 0 ? "0" + minutes : minutes;
            seconds = seconds <= 0 ? "0" + seconds : seconds;
            setTimer(minutes + ":" + seconds);

            setSubmitContent(prev => ({
                ...prev,
                finishTime: new Date()
            }))
            if (--timer <= 0) {
                setOpen(true);
                clearInterval(i);
            }
        }, 1000);

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
                    !isLoading && <Box
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
                                foundedQuiz && foundedQuiz.questions && foundedQuiz.questions.map((question, i) => (
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
                                                                    isDisabled={report !== null}
                                                                    defaultChecked={
                                                                        filterElement &&
                                                                        filterElement.options.filter(o => o === option.optionId)[0]
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
                                leftIcon={<TimeIcon/>}>{timer || 'No Time Limit'}{' '}
                                left</Button>
                        </Flex>}
                    </Box>


                }
            </Box>
        </Flex>
    );
};

export default StartQuiz;