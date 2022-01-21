import React, { useState } from "react";
import {
    Box,
    Button,
    Center,
    Checkbox,
    Container,
    Flex,
    Heading,
    HStack,
    IconButton,
    Image,
    Input,
    Select,
    SimpleGrid,
    Spacer,
    Stack,
    Tag,
    TagLabel,
    Text,
    Tooltip,
    VStack,
    ButtonGroup,
} from "@chakra-ui/react";
import {
    AddIcon,
    ArrowBackIcon,
    CopyIcon,
    DeleteIcon,
    EditIcon,
    TimeIcon,
    ViewIcon,
} from "@chakra-ui/icons";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import EditQuestionDialog from "./EditQuestionDialog";
import QuestionEntry from "./QuestionEntry";
import { useCreateQuiz } from "../../context/CreateQuizProvider";

const EditQuizPage = () => {
    const [showCreateQ, setShowCQD] = useState(false);
    const { createdQuiz, setCreatedQuiz } = useCreateQuiz();

    return (
        <Box bg={"#F7FAFC"}>
            {/*  Header with action bar*/}
            {showCreateQ && <EditQuestionDialog setVisible={setShowCQD} />}

            <HeaderWithActionBar setShowCQD={setShowCQD} />
            {/*   Content with right sidebar*/}
            <Box
                pt={"150px"}
                minH={"100vh"}
                bg={"#F7FAFC"}
                position={"relative"}
            >
                <Flex direction={"column"} justifyContent="center">
                    {/*  */}
                    <HStack mt={10} w="100%" align="center">
                        <Button>button</Button>
                        <Button>button</Button>
                        <Button>button</Button>
                        <Button>button</Button>
                        <Button>button</Button>
                    </HStack>
                    {/*QUESTION*/}
                    <Box w={"100%"} maxW={"1000px"}>
                        <Center>
                            {/*SAVED QUESTIONS*/}
                            <Stack
                                w={"100%"}
                                direction={"column"}
                                align={"center"}
                            >
                                {/* {savedQuestions.length > 0 &&
                                    savedQuestions.map((item, i) => (
                                        <QuestionEntry
                                            key={i}
                                            index={i + 1}
                                            question={item}
                                        />
                                    ))} */}
                                {createdQuiz != null &&
                                    createdQuiz.questions.length > 0 &&
                                    createdQuiz.questions.map((item, i) => (
                                        <QuestionEntry
                                            key={i}
                                            index={i + 1}
                                            question={item}
                                        />
                                    ))}
                            </Stack>
                        </Center>
                    </Box>
                    {/**/}
                    {/* <Box
                        overflowY={"scroll"}
                        top={"150"}
                        zIndex={10}
                        position={"sticky"}
                        bg={"white"}
                        boxShadow={"md"}
                        minW={"300px"}
                        maxW={"300px"}
                        minH={"400px"}
                        height={"100%"}
                    >
                        <Box p={4} mb={100}>
                            <VStack spacing={5}>
                                <Input type={"file"} />
                                <HStack>
                                    <Tooltip label={"Quiz title"}>
                                        <Heading
                                            fontWeight={"medium"}
                                            fontSize={"25px"}
                                        >
                                            {createdQuiz != null &&
                                            createdQuiz.title != null
                                                ? createdQuiz.title
                                                : ""}
                                        </Heading>
                                    </Tooltip>
                                    <IconButton
                                        colorScheme={"teal"}
                                        onClick={() => {}}
                                        icon={<EditIcon />}
                                    />
                                </HStack>
                                <HStack>
                                    <Tooltip
                                        zIndex={100}
                                        label={
                                            "Public: visible to everyone ;\n Private: visible to you and shared ones"
                                        }
                                    >
                                        <Button
                                            size={"sm"}
                                            leftIcon={<ViewIcon />}
                                            variant={"solid"}
                                            colorScheme={"white"}
                                            color={"blue.400"}
                                        >
                                            public
                                        </Button>
                                    </Tooltip>
                                    <Tooltip
                                        zIndex={100}
                                        label={"Default time for all questions"}
                                    >
                                        <Button
                                            size={"sm"}
                                            leftIcon={<TimeIcon />}
                                            variant={"solid"}
                                            colorScheme={"white"}
                                            color={"blue.400"}
                                        >
                                            30 secs
                                        </Button>
                                    </Tooltip>
                                </HStack>
                            </VStack>
                        </Box>
                    </Box>
               
                */}
                </Flex>
            </Box>
        </Box>
    );
};

export default EditQuizPage;

/*
HEADER
*/
const HeaderWithActionBar = ({ setShowCQD }) => {
    const [isLoading, setLoading] = useState(false);
    const onSaveQuiz = async () => {
        setLoading(true);
        // const resp = await axios.post(
        //     `http://localhost:8080/api/v1/public/${createdQuiz.quizId}/question`,
        //     JSON.parse()
        // );
        // let modifiledQuestions = createdQuiz.questions.map((question) => ({
        //     ...question,
        //     options: question.options.map((option) => ({
        //         ...option,
        //         optionId: null,
        //     })),
        // }));
        // setCreatedQuiz((prevState) => ({
        //     ...prevState,
        //     questions: modifiledQuestions,
        // }));
    };
    return (
        <Box
            zIndex={500}
            bg={"red"}
            position={"fixed"}
            top={0}
            w={"100%"}
            bg={"#F7FAFC"}
        >
            {/*Header*/}
            <Box bg={"red"} maxH={"60px"} bg={"teal.600"}>
                <Flex
                    align={"center"}
                    px={8}
                    py={2}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <ArrowBackIcon size={"md"} color={"white"} />
                    <Text
                        color={"white"}
                        fontWeight={"medium"}
                        fontStyle={"italic"}
                    >
                        Editted 1 minute ago
                    </Text>
                    <ButtonGroup>
                        <Button size={"sm"} onClick={onSaveQuiz}>
                            Save
                        </Button>
                        <Button size={"sm"}>Publish</Button>
                    </ButtonGroup>
                </Flex>
            </Box>
            {isLoading && (
                <CircularProgress
                    position="fixed"
                    top="50%"
                    right="50%"
                    zIndex={800}
                    value={30}
                    isIndeterminate
                    color="orange.400"
                    thickness="12px"
                />
            )}
            {/*Box*/}
            <Box bg={"#F7FAFC"} maxW={"860px"}>
                <Box>
                    <Center>
                        <HStack
                            boxShadow={"md"}
                            p={4}
                            borderBottomRadius={"xl"}
                            spacing={4}
                            bg={"white"}
                        >
                            <VStack w={"400px"}>
                                <Text alignSelf={"start"}>Search</Text>
                                <Input />
                            </VStack>
                            <VStack align={"end"} w={"200px"}>
                                <Text>New question</Text>
                                <Button
                                    onClick={() => {
                                        setShowCQD(true);
                                    }}
                                    size={"md"}
                                    rightIcon={<AddIcon />}
                                    variant={"solid"}
                                    colorScheme={"teal"}
                                >
                                    New question
                                </Button>
                            </VStack>
                        </HStack>
                    </Center>
                </Box>
            </Box>
        </Box>
    );
};
