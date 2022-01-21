import React, {useEffect, useRef, useState} from 'react';
import {
    Box,
    Button,
    Checkbox, Container,
    Divider,
    Flex,
    Heading,
    HStack, IconButton,
    Progress,
    SimpleGrid,
    Text, Tooltip,
    VStack
} from "@chakra-ui/react";
import {useHistory, useParams} from "react-router-dom";
import SettingDialog from "./SettingDialog";
import {ArrowDownIcon, ArrowUpIcon, TimeIcon} from "@chakra-ui/icons";
import {useQuiz} from "../../../providers/QuizProvider";
import axios from "axios";

const StartQuiz = () => {

    const history = useHistory();
    //get id in params
    const {id} = useParams();
    const pageRef = useRef(null);
    const {foundedQuiz, setFoundedQuiz} = useQuiz();

    const [showSetting, setShowSetting] = useState(true);

    const [progress, setProgress] = useState(0);

    // const [userAnswers, setUserAnswers] = useState(new Map([
    //     [100, [1, 2, 3]],
    //     [2, [5, 23, 31]],
    // ]));
    const [userAnswers, setUserAnswers] = useState(new Map([]));

    // const onBackBtnPressed = () => {
    //     if (window.confirm("Do you want to go back ?")) {
    //         // window.history.goBack();
    //         window.history.back();
    //     } else {
    //         window.history.pushState(null, null, window.location.pathname);
    //     }
    // }
    useEffect(() => {
        document.title = "Grade Quiz";
        setShowSetting(true);
        fetchQuiz();

        console.log(window.location.pathname);
        window.history.pushState(null, null, window.location.pathname);
        // window.addEventListener('popstate', onBackBtnPressed);
        return () => {
            // window.removeEventListener('popstate', onBackBtnPressed);
        }
    }, []);
    const fetchQuiz = async () => {
        try {
            const resp = await axios.get(`http://localhost:8080/api/v1/public/quiz?code=${id}`);
            if (resp.status === 200) {
                setFoundedQuiz(resp.data);
            }
        } catch (e) {
        }
    }

    // [100, [1, 2, 3]],
    //     [2, [5, 23, 31]],

    function onSelectedOption(e, optionId, questionId) {

        let tempUserAnswers = userAnswers;
        let isChecked = e.target.checked;

        if (isChecked) {
            //get options by questionID key
            let options = tempUserAnswers.get(questionId);
            //create new array if get options by questionId key null
            if (options == null) {
                options = [optionId];
                //update progress

            }
            //push new optionID if exist questionId key
            else {
                options.push(optionId);
            }
            tempUserAnswers.set(questionId, options);
        } else {
            let options = tempUserAnswers.get(questionId);
            if (options == null) {
                options = [];
            } else {
                //remove optionId
                options = options.filter(oId => oId !== optionId);
                //alse remove optionId key if questions empty
                if (options == null || options.length === 0) {

                    tempUserAnswers.delete(questionId)
                } else {
                    tempUserAnswers.set(questionId, options);
                }
            }
        }
        //update userAnswers state
        setUserAnswers(new Map(tempUserAnswers.entries()));
        setProgress((userAnswers.size / foundedQuiz.questions.length) * 100)


        // if (userAnswers != null && userAnswers.size === 0) {
        //     console.log("Answer = 0")
        //     let tmp = ((1) / foundedQuiz.questions.length) * 100;
        //     setProgress(tmp);
        //     console.log(tmp);
        // } else {
        //     if (userAnswers.has(questionId)) {
        //         console.log("Ole question")
        //     } else {
        //         console.log("New question addedd")
        //         let tmp = ((userAnswers.size + 1) / foundedQuiz.questions.length) * 100;
        //         setProgress(tmp);
        //     }
        //
        // }

        // //         setUserAnswers(prevState =>
        // //             new Map([...prevState, [questionId,optionId]])
        // //         );


    }

    return (
        <div ref={pageRef}>
            <Box
                minH={'100vh'}
                bg={'gray.100'}
                p={10}
                align={'center'}>

                {/*<Box minH={'80px'}></Box>*/}
                {showSetting && <SettingDialog setShow={setShowSetting}/>}
                {/*A4*/}
                {
                    !showSetting && (
                        <Box
                            m={10}
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
                                    fontSize={25}>
                                    {foundedQuiz.title != null ? foundedQuiz.title : ''}
                                </Heading>
                                <Text
                                    fontWeight={'medium'}
                                    color={'teal'}
                                    letterSpacing={1}
                                    fontStyle={'italic'}
                                    position={'absolute'}
                                    top={0}
                                    right={0}
                                    m={5}>
                                    {foundedQuiz.questions.length} Questions
                                </Text>
                                {/*QUESTIONS*/}
                                {
                                    foundedQuiz.questions.map((question, i) => (
                                        <VStack
                                            w={'100%'}
                                            align={'start'}
                                            textAlign={'start'
                                            } key={i}
                                            p={2}
                                            spacing={5}>
                                            {/*
                                    QUESTION TITLE
                                    */}
                                            <Container w={'100%'} maxW="4xl">
                                                <Box maxW="4xl">
                                                    <Text fontWeight={'medium'}>
                                                        {i + 1}. {question.title} \t QuestionID : {question.questionId}
                                                    </Text>
                                                </Box>
                                            </Container>
                                            {/*OPTIONS*/}
                                            <SimpleGrid
                                                w={'100%'}
                                                columns={2}
                                                spacing={2}
                                                align={'start'}
                                                textAlign={'start'}>
                                                {
                                                    question.options.map((option, i) => (
                                                        <Container
                                                            w={'100%'}
                                                            minW={300}
                                                            key={i}
                                                            maxW="xl"
                                                            align={'start'}
                                                            textAlign={'start'}
                                                            alignItems={'start'}
                                                        >
                                                            <Box padding="1" maxW="3xl">
                                                                <Checkbox
                                                                    onChange={(e) => onSelectedOption(e, option.optionId, question.questionId)}
                                                                    value={option.optionId}
                                                                    colorScheme={'teal'}
                                                                    size={'md'}>
                                                                    {option.content} \t OptionID : {option.optionId}
                                                                </Checkbox>
                                                            </Box>
                                                        </Container>
                                                    ))
                                                }
                                            </SimpleGrid>
                                            <Divider/>
                                        </VStack>
                                    ))
                                }
                                {/* Submit button*/}
                                <Box py={5} align={'end'} alignSelf={'end'}>
                                    <Button alignSelf={'end'} size={'lg'} colorScheme={'teal'}>Submit</Button>
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
                                            pageRef.current.scrollIntoView({
                                                behavior: "smooth",
                                                block: "end",
                                                inline: "nearest"
                                            })
                                        }}
                                        colorScheme={'teal'}
                                        icon={<ArrowDownIcon/>}/>
                                </Tooltip>
                            </HStack>
                            <Flex p={1} position={'fixed'} left={0} top={0} m={10}>
                                <Button size={'md'} colorScheme={'teal'} variant={'outline'} leftIcon={<TimeIcon/>}>23:00
                                    left</Button>
                            </Flex>
                            {/*<Box*/}
                            {/*    bg={'red'}*/}
                            {/*    minW={'100vw'}*/}
                            {/*    w={'100%'}*/}
                            {/*    position={'fixed'}*/}
                            {/*    bottom={0}*/}
                            {/*    bg={'blue'}*/}
                            {/*    align={'start'}*/}
                            {/*>*/}
                            {/*    <Progress*/}
                            {/*        // alignSelf={'start'}*/}
                            {/*        size={'sm'}*/}
                            {/*        // left={'50%'}*/}
                            {/*        // transform={'translateX(-50%)'}*/}
                            {/*        minW={'860px'}*/}
                            {/*        // maxW={'860px'}*/}
                            {/*        // minW={'100vw'}*/}
                            {/*        colorScheme={'red'}*/}
                            {/*        maxW={'860px'}*/}
                            {/*        position={'fixed'}*/}
                            {/*        bottom={0}*/}
                            {/*        value={progress}/>*/}
                            {/*</Box>*/}

                        </Box>
                    )
                }


            </Box>
            <Progress
                transition={
                    "all 0.3s ease"
                }
                // alignSelf={'start'}
                size={'sm'}
                // left={'50%'}
                // transform={'translateX(-50%)'}
                minW={'100vw'}
                colorScheme={'pink'}
                position={'fixed'}
                bottom={0}
                value={progress}/>
        </div>
    );
};

export default StartQuiz;