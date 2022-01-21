import React, { useState } from "react";
import {
    Box,
    Button,
    Center,
    Checkbox,
    Container,
    HStack,
    Input,
    Select,
    Text,
    Textarea,
    usePrevious,
    VStack,
    IconButton,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { MdArrowDropDown } from "react-icons/all";
import { useQuiz } from "../../providers/QuizProvider";
import { useCreateQuiz } from "../../context/CreateQuizProvider";
import axios from "axios";
import { DeleteIcon } from "@chakra-ui/icons";

const EditQuestionDialog = ({ setVisible }) => {
    const toast = useToast();
    const {
        createdQuiz,
        setCreatedQuiz,
        question,
        setQuestion,
        defaultQuestionState,
    } = useCreateQuiz();
    const randomUID = () => {
        return Math.floor((2 + Math.random()) * 0x100000000)
            .toString(16)
            .substring(1);
    };

    //on title change
    const onQuizTitleChange = (e) => {
        setQuestion((prevState) => ({
            ...prevState,
            title: e.target.value,
        }));
    };

    //on option in put change
    const onOptionChange = (e, i) => {
        setQuestion((prevState) => ({
            ...prevState,
            options: prevState.options.map((savedOption, index) => {
                if (i === index) {
                    return { ...prevState.options[i], content: e.target.value };
                }
                return savedOption;
            }),
        }));
    };

    //add new option
    const onAddOption = () => {
        setQuestion((prevState) => ({
            ...prevState,
            title: prevState.title,
            options: [...prevState.options, { content: "" }],
        }));
    };

    const onCheckBoxChange = (e, i) => {
        setQuestion((prevState) => ({
            ...prevState,
            options: prevState.options.map((savedOption, index) => {
                if (i === index) {
                    return {
                        ...prevState.options[i],
                        isChecked: e.target.checked,
                    };
                }
                return savedOption;
            }),
        }));
    };

    function onScoreChange(e, i) {
        setQuestion((prevState) => ({
            ...prevState,
            options: prevState.options.map((savedOption, index) => {
                if (i === index) {
                    return {
                        ...prevState.options[i],
                        score: e.target.value,
                    };
                }
                return savedOption;
            }),
        }));
    }

    const handleBtnSaveClicked = async () => {
        //modify question to save (remove empty option)
        let questionTmp = {
            ...question,
            options: question.options.filter((item) => item.content.length > 0),
        };
        //
        let score = 0;
        question.options.forEach((item) => {
            if (item.score != null) {
                score += item.score;
            }
        });

        //check use select true option
        if (score === 0) {
            toast({
                title: "Please select at least 1 true option and option's score",
                status: "error",
                isClosable: true,
                duration: 1500,
                position: "bottom-left",
            });
            return;
        }

        if (score > 0) {
            setVisible(false);
            const resp = await axios.post(
                `http://localhost:8080/api/v1/public/quiz/${createdQuiz.quizId}/question`,
                JSON.stringify(questionTmp),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (resp.status === 200) {
                setCreatedQuiz((prevState) => ({
                    ...prevState,
                    questions: [...prevState.questions, resp.data],
                }));
            }
            setQuestion(defaultQuestionState);
        } else {
            setVisible(true);
        }
    };

    return (
        <>
            <Box
                onClick={() => {
                    console.log("HAHHAHA");
                }}
                position={"fixed"}
                // zIndex={1}
                top={0}
                bg={"gray.300"}
                align={"center"}
                alignItems={"center"}
                opacity={0.4}
                justifyContent={"center"}
                width={"100vw"}
                height={"100vh"}
            />

            <Box
                boxShadow={"md"}
                borderRadius={"md"}
                position={"fixed"}
                zIndex={899}
                top={"50%"}
                right={"50%"}
                transform={"translate(50%,-50%)"}
                minW={"700px"}
                bg={"white"}
                maxW={"700px"}
            >
                <VStack>
                    <HStack bg={"gray.700"} p={5} w={"100%"}>
                        <Text color={"white"} fontWeight={"medium"}>
                            Question {createdQuiz.questions.length + 1}
                        </Text>
                    </HStack>
                    {/*QUESTION TITLE*/}
                    <Box p={2} w={"100%"}>
                        <Textarea
                            onChange={(e) => onQuizTitleChange(e)}
                            value={question.title}
                            css={{
                                "&::-webkit-scrollbar": {
                                    width: "0px",
                                    background: "transparent",
                                },
                            }}
                            resize={"none"}
                            overflow={"hidden"}
                            placeholder={"Type your question here"}
                        />
                    </Box>
                    <VStack p={4} spacing={4} w={"100%"}>
                        {/* {question.options.map((item, i) => ( */}
                        {question.options.map((item, i) => (
                            <HStack key={i} w={"100%"}>
                                <Checkbox
                                    onChange={(e) => onCheckBoxChange(e, i)}
                                />
                                <Input
                                    value={question.options[i].content}
                                    onChange={(e) => onOptionChange(e, i)}
                                    wordBreak={"break-all"}
                                    wordwrap={"break-word"}
                                    // isFullWidth
                                    size={"md"}
                                />
                                <Select
                                    bg={"teal"}
                                    color={"gray.800"}
                                    onChange={(e) => onScoreChange(e, i)}
                                    isDisabled={
                                        item.isChecked == null ||
                                        item.isChecked === false
                                    }
                                    defaultValue={0}
                                    icon={<MdArrowDropDown />}
                                    iconSize={0}
                                    maxW={70}
                                    size="xs"
                                    variant="outline"
                                >
                                    {[
                                        0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75,
                                        2,
                                    ].map((score, index) => (
                                        <option key={index} value={score}>
                                            {score}
                                        </option>
                                    ))}
                                </Select>
                                {/* DELETE ICON */}
                                <IconButton
                                    onClick={() => {
                                        setQuestion((prevState) => ({
                                            ...prevState,
                                            options: prevState.options.filter(
                                                (item, index) => index !== i
                                            ),
                                        }));
                                    }}
                                    color="red"
                                    icon={<DeleteIcon />}
                                />
                            </HStack>
                        ))}
                    </VStack>
                    {/*BUTTON ADD ANSWER*/}
                    <Box align={"start"} p={2} w={"100%"}>
                        <Button
                            onClick={onAddOption}
                            size={"sm"}
                            variant={"outline"}
                            alignSelf={"start"}
                            colorScheme={"teal"}
                        >
                            Add answer option
                        </Button>
                    </Box>
                    {/*BUTTON SAVE*/}
                    <Box w={"100%"}>
                        <HStack p={2} bg={"gray.700"} justifyContent={"end"}>
                            <Button
                                onClick={() => {
                                    setQuestion(defaultQuestionState);
                                    setVisible(false);
                                }}
                                size={"sm"}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleBtnSaveClicked} size={"sm"}>
                                Save
                            </Button>
                        </HStack>
                    </Box>
                </VStack>
            </Box>
        </>
    );
};

export default EditQuestionDialog;
