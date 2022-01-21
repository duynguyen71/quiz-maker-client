import React, {useContext, useEffect, useState} from "react";
import {
    Box,
    Button,
    ButtonGroup,
    FormControl,
    FormHelperText,
    FormLabel,
    HStack,
    Input,
    Radio,
    RadioGroup,
    Select,
    Text,
    useRadio,
    useRadioGroup,
    VStack,
    Wrap,
    Center,
    WrapItem,
    Spinner,
} from "@chakra-ui/react";
import {useHistory} from "react-router-dom";
import {useQuiz} from "../../../providers/QuizProvider";
import {MdArrowDropDown} from "react-icons/all";
import axios from "axios";
import {useCreateQuiz} from "../../../context/CreateQuizProvider";
import {QuizEditContext} from "../../../providers/QuizEditProvider";
import SubjectService from "../../../service/SubjectService";
import QuizService from "../../../service/QuizService";

const CreateNewQuizPage = () => {

    const {setQuiz} = useContext(QuizEditContext);
    const [savedSubjects, setSubjects] = useState([]);

    const [quizName, setQuizName] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");

    const [quizNameError, setQuizNameError] = useState(null);
    const [subjectError, setSubjectError] = useState(null);

    const [isLoading, setLoading] = useState(false);

    const history = useHistory();
    const {createdQuiz, setCreatedQuiz} = useCreateQuiz();

    /*
    handle create quiz
    */
    const onNextButtonClicked = async () => {
        if (quizName == null || quizName.length === 0) {
            setQuizNameError("Please enter a quiz name");
            return;
        }
        if (selectedSubject == null || !selectedSubject.title) {
            setSubjectError("Please select a selectedSubject");
            return;
        }

        try {
            const resp = await QuizService.saveQuiz({
                title: quizName,
                subject: {
                    id: selectedSubject.id || null,
                    title: selectedSubject.title
                },
            });
            const data = resp.data;
            console.log(data);
            setQuiz(data)
            history.replace(`/admin/quiz/${data.id}/edit`);
        } catch (e) {
            console.log('Failed to create quiz ', e);
        }
    };
    useEffect(() => {
        //
        if (createdQuiz != null) {
            setQuizName(createdQuiz.title == null ? "" : createdQuiz.title);
            setSelectedSubject(
                createdQuiz.subject == null ? "" : createdQuiz.subject
            );
        }
        getSubjects().then((r) => setSubjects(r));
    }, []);

    const getSubjects = async () => {
        setLoading(true);
        try {
            const data = await SubjectService.getSubjects();
            console.log(data.data);
            return data.data;
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            {/* Overlay */}
            <Box
                zIndex={101}
                position={"fixed"}
                top={"50%"}
                right={"50%"}
                transform={"translate(50%,-50%)"}
                zIndex="100"
                minH="100vh"
                minW="100vw"
                position="fixed"
                bg="gray.200"
            />

            {isLoading && (
                <Spinner
                    top="50%"
                    right="50%"
                    position="fixed"
                    zIndex="1000"
                    color="red.500"
                    transform={"translate(50%,-50%)"}
                />
            )}
            <Box
                bg={"gray.100"}
                // bg={'teal.500'}
                zIndex={101}
                position={"fixed"}
                top={"50%"}
                right={"50%"}
                transform={"translate(50%,-50%)"}
                boxShadow={"xl"}
                align={"start"}
                borderRadius={"xl"}

            >
                <VStack
                    align={"start"}
                    p={4}
                    width={"500px"}
                    maxW={["360px", "500px"]}
                >
                    <HStack align={"start"}>
                        <Text fontSize={"20px"} fontWeight={"medium"}>
                            Create a Quiz
                        </Text>
                    </HStack>
                    <VStack color={"gray.600"} align={"start"} w={"100%"}>
                        <FormControl>
                            <FormLabel fontWeight={"normal"}>
                                1. Name this quiz
                            </FormLabel>
                            {/*1. quiz name*/}
                            <Input
                                onChange={(e) => {
                                    setQuizName(e.target.value);
                                    setQuizNameError(null);
                                }}
                                value={quizName}
                                isInvalid={quizNameError != null}
                                borderColor={"grey.600"}
                                width={"100%"}
                                variant="outline"
                            />
                            {quizNameError && (
                                <FormHelperText color={"crimson"}>
                                    {quizNameError}
                                </FormHelperText>
                            )}
                        </FormControl>
                        {/*2. CHOICE A SUBJECT*/}
                        <VStack w={"100%"} align={"start"}>
                            <FormLabel fontWeight={"normal"}>
                                2. Choose revelant subjects
                            </FormLabel>
                            <Wrap spacing={2}>
                                {!isLoading && savedSubjects.map((item, i) => (
                                    <WrapItem key={i}>
                                        <Button
                                            value={item.title}
                                            onClick={(e) => {
                                                setSelectedSubject(prev => ({
                                                    ...prev,
                                                    title: item.title
                                                }));
                                                setSubjectError("");
                                            }}
                                            bg={
                                                item.title === selectedSubject.title
                                                    ? "teal"
                                                    : "white"
                                            }
                                            color={
                                                item.title === selectedSubject.title
                                                    ? "white"
                                                    : "gray"
                                            }
                                            colorScheme={"gray"}
                                            role={"checkbox"}
                                            // defaultChecked={true}
                                            size={"xs"}
                                            variant={"outline"}
                                            maxH={"60"}
                                            maxW={"60"}
                                        >
                                            {item.title}
                                        </Button>
                                    </WrapItem>
                                ))}
                            </Wrap>
                        </VStack>

                        <Text color="red" fontStyle="italic">
                            {subjectError}
                        </Text>
                        <HStack pt={5} w={"100%"} justify={"end"}>
                            <Button
                                onClick={() => {
                                    history.goBack()
                                }}
                                colorScheme="gray"
                                fontWeight={"normal"}
                            >
                                Cancel
                            </Button>
                            <Button
                                colorScheme="teal"
                                fontWeight={"normal"}
                                onClick={onNextButtonClicked}
                            >
                                Next
                            </Button>
                        </HStack>
                    </VStack>
                </VStack>
            </Box>
        </>
    );
};

export default CreateNewQuizPage;
