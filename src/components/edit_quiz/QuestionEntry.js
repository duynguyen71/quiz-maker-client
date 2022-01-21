import React from "react";
import {
    Box,
    Button,
    Checkbox,
    Container,
    HStack,
    IconButton,
    Select,
    SimpleGrid,
    Spacer,
    Text,
    Tooltip,
    VStack,
} from "@chakra-ui/react";
import { AiOutlineTag, BsPen } from "react-icons/all";
import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";
import { useQuiz } from "../../providers/QuizProvider";
import { useCreateQuiz } from "../../context/CreateQuizProvider";

const QuestionEntry = ({ index, question }) => {
    // const { question, setquestion } = useCreateQuiz();

    // const onDeleteQuestion = () => {
    //     let tmp = question;
    //     tmp = tmp.filter((q) => q.title != question.title);
    //     setquestion(tmp);
    // };
    return (
        <>
            <Box
                boxShadow={"sm"}
                my={5}
                borderRadius={"md"}
                align={"start"}
                textAlign={"start"}
                h={"100%"}
                bg={"white"}
                maxW={"600px"}
                minW={"600px"}
            >
                {/*Edit bar*/}
                <HStack p={2} bg={"gray.200"}>
                    {/*QUESTION INDEX*/}
                    <Text>Question {index}</Text>
                    <Spacer />
                    <Tooltip label={"edit"} color={"teal.200"}>
                        <IconButton icon={<BsPen />} />
                    </Tooltip>
                    <Tooltip color={"red.500"} label={"remove"}>
                        <IconButton
                            // onClick={onDeleteQuestion}
                            icon={<DeleteIcon />}
                        />
                    </Tooltip>
                    <Tooltip label={"duplicate"}>
                        <IconButton icon={<CopyIcon />} />
                    </Tooltip>
                </HStack>
                <VStack align={"start"} p={2} spacing={5}>
                    {/*QUESTION TITLE*/}
                    <Container maxW="3xl">
                        <Box maxW="3xl">
                            <Text fontWeight={"medium"}>{question.title}</Text>
                        </Box>
                    </Container>
                    <SimpleGrid
                        w={"100%"}
                        align={"start"}
                        columns={2}
                        spacing={2}
                    >
                        {question.options.map((option, index) => (
                            <Container key={index} maxW="xl" centerContent>
                                <Box
                                    py={4}
                                    w={"100%"}
                                    maxW="3xl"
                                    align={"start"}
                                >
                                    <Checkbox
                                        w={"100%"}
                                        size={"sm"}
                                        disabled={true}
                                        isChecked={option.isChecked}
                                    >
                                        {option.content}
                                    </Checkbox>
                                </Box>
                            </Container>
                        ))}
                    </SimpleGrid>
                </VStack>
                <HStack bg={"gray.200"} p={1}>
                    <Select
                        size={"sm"}
                        maxW={"100"}
                        bg={"white"}
                        name={"queston seconds"}
                    >
                        <option value="option1">30 secs</option>
                        <option value="option2">15 secs</option>
                        <option value="option3">45 secs</option>
                    </Select>
                    <Button
                        size={"sm"}
                        colorScheme={"white"}
                        variant={"ghost"}
                        leftIcon={<AiOutlineTag />}
                    >
                        Tag topics
                    </Button>
                </HStack>
            </Box>
        </>
    );
};

export default QuestionEntry;
