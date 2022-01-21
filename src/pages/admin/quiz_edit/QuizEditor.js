import {
    Box,
    Button, Checkbox, CircularProgress, Code,
    Container, Divider, Flex,
    HStack,
    IconButton, Input, InputGroup, InputRightAddon, Select,
    SimpleGrid,
    Spacer, Stack,
    Text,
    Tooltip,
    VStack
} from "@chakra-ui/react";
import React, {useContext, useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {AddIcon, ArrowDownIcon, ArrowUpIcon, CopyIcon, DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {QuizEditContext} from "../../../providers/QuizEditProvider";
import {AiOutlineTag, BiSave, BsPen, HiDocumentDuplicate, MdArrowDropDown, MdEdit} from "react-icons/all";
import NewQuestionDialog from "./components/NewQuestionDialog";
import QuizEditDialog from "./components/QuizEditDialog";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from "@chakra-ui/react"
import EditQuestionDialog from "./components/EditQuestionDialog";
import QuizService from "../../../service/QuizService";
import UserService from "../../../service/UserService";
import {AdminContext} from "../../../providers/AdminSettingProvider";

const QuizEditor = () => {
    const {id} = useParams();
    const {quiz, setQuiz} = useContext(QuizEditContext);
    const {isLoading, setLoading} = useContext(AdminContext);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [sort, setSort] = useState('column');
    //
    const [isOpen, setOpen] = useState(false);
    const [showNewQuestionDialog, setShowNewQuestionDialog] = useState(false);
    const [showEditQuestionDialog, setShowEditQuestionDialog] = useState(false);
    const [showQuickEditQuiz, setShowQuickEditQuiz] = useState(false);
    //
    const [size, setSize] = useState('full');
    const cancelRef = useRef();
    //fetch quiz details
    const fetchQuizDetails = async () => {
        setLoading(true);
        try {
            const data = await UserService.getUserQuiz(id);
            setQuiz(data.data);
        } catch (e) {

            console.log("Failed to get quiz details with id " + id);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        console.log('quiz editor render')
        fetchQuizDetails();
    }, [])

    const handleSaveQuiz = async () => {
        try {
            setLoading(true);
            const resp = await QuizService.saveQuiz(quiz);
            await fetchQuizDetails();

        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        } finally {
            setLoading(false);
        }
    }
    const onRemoveQuestion = async () => {
        try {
            await QuizService.removeQuestion(selectedQuestion.id);
            setQuiz((prev) => ({
                ...prev,
                questions: prev.questions.filter((question) => question.id !== selectedQuestion.id)
            }))
        } catch (e) {

        } finally {
            setSelectedQuestion(null);
            setOpen(false);
        }
    }
    return (
        <>
            <Flex justifyContent={'center'} justifyItems={'center'} alignContent={'center'} direction={'row'}>
                {/*QUESTIONS EDITOR*/}
                <VStack align={'center'} w={'100%'} minH={'100vh'}>
                    <HStack mb={4} align={'start'} alignSelf={'start'} spacing={4}>

                        <Button size={'sm'} onClick={() => setShowNewQuestionDialog(true)} px={4}
                                colorScheme={'linkedin'}
                                leftIcon={<AddIcon/>}>
                            New Question
                        </Button>

                        <Select
                            size={'sm'}
                            onChange={(e) => {
                                setSort(e.target.value);
                                const reversed = quiz.questions.reverse();
                                setQuiz((prevState) => ({
                                    ...prevState,
                                    questions: reversed,
                                }))

                            }}
                            bg="tomato"
                            borderColor="tomato"
                            maxW={100}
                            icon={<MdArrowDropDown/>}
                            // variant="filled"
                            defaultValue={sort}
                            placeholder="Sort by"
                        >
                            <option value={'column'}>Position</option>
                            <option value={'column-reverse'}>Reverse</option>
                        </Select>
                    </HStack>
                    {/*    QUESTIONS*/}

                    <Stack direction={sort}>
                        {
                            quiz && quiz.questions.map((question, index) => (
                                <Box
                                    key={index}
                                    boxShadow={"sm"}
                                    my={5}
                                    borderRadius={"md"}
                                    align={"start"}
                                    textAlign={"start"}
                                    h={"100%"}
                                    bg={'white'}
                                    maxW={"600px"}
                                    minW={"600px"}
                                >

                                    <HStack p={2} bg={"gray.700"} color={'white'}>
                                        {/*QUESTION INDEX*/}
                                        <Text>Question {index + 1}</Text>
                                        <Spacer/>
                                        <Tooltip label={"edit"} color={"teal.200"}>
                                            <IconButton
                                                bg={'transparent'}
                                                onClick={() => {
                                                    setSelectedQuestion(question)
                                                    setShowEditQuestionDialog(true)
                                                }}
                                                icon={<BsPen/>} aria-label={'edit'}/>
                                        </Tooltip>
                                        <Tooltip color={"red.500"} label={"remove"}>
                                            <IconButton
                                                aria-label={'remove'}
                                                onClick={() => {
                                                    setOpen(true)
                                                    setSelectedQuestion(question)

                                                }}
                                                bg={'transparent'}
                                                icon={<DeleteIcon/>}
                                            />
                                        </Tooltip>
                                        <Tooltip label={"duplicate"}>
                                            <IconButton
                                                onClick={() => {
                                                    let q = quiz.questions[index];
                                                    q = {
                                                        title: q.title,
                                                        options: q.options.map((option) => ({
                                                            content: option.content,
                                                            score: option.score,
                                                        }))
                                                    }
                                                    setQuiz((prev) => ({
                                                        ...quiz,
                                                        questions: [...prev.questions, q]
                                                    }))
                                                    console.log(q);
                                                }}
                                                aria-label={'duplicate'}
                                                bg={'transparent'}
                                                icon={<HiDocumentDuplicate/>}/>
                                        </Tooltip>
                                    </HStack>
                                    {/*QUESTION*/}
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
                                            {
                                                question.options.map((option, index) => (
                                                    <Container key={index} maxW="xl" centerContent>
                                                        <Box
                                                            py={4}
                                                            w={"100%"}
                                                            maxW="3xl"
                                                            align={"start"}
                                                        >

                                                            <Checkbox
                                                                color={option.score > 0 && 'green'}
                                                                isChecked={option.score > 0 && true}
                                                                colorScheme={option.score > 0 && 'green'}
                                                                key={index}
                                                                w={"100%"}
                                                                size={"md"}
                                                                // disabled={true}
                                                                // isChecked={option.isChecked}
                                                            >
                                                                {option.content}
                                                            </Checkbox>
                                                        </Box>
                                                    </Container>
                                                ))
                                            }
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
                                            leftIcon={<AiOutlineTag/>}
                                        >
                                            Tag topics
                                        </Button>
                                    </HStack>
                                </Box>
                            ))
                        }
                    </Stack>

                </VStack>

                {/*ACTION SIDEBAR*/}
                <Box minW={'300px'}>
                    <VStack w={'100%'} p={4} bg={'white'} h={'300px'}>
                        {/*PUBLIC*/}
                        <HStack w={'100%'}>
                            <Spacer/>
                            <Select
                                // placeholder={quiz && !quiz.visibility ? 'Visibility' : ''}
                                defaultValue={quiz && quiz.status ? quiz.status : 0}
                                onChange={(e) => setQuiz(prevState => ({
                                    ...prevState,
                                    status: e.target.value
                                }))}
                                size={'sm'} maxW={40}
                                bg={'blue.200'}>
                                <option selected={quiz && quiz.status === 0 && 'selected'} value="0">Draft</option>
                                <option selected={quiz && quiz.status === 1 && 'selected'} value="1">Private
                                </option>
                                <option selected={quiz && quiz.status === 2 && 'selected'} value="2">Public</option>
                            </Select>
                        </HStack>
                        {/*    */}
                        <Button
                            w={'100%'}
                            size={'sm'}
                            onClick={() => {
                                setShowQuickEditQuiz(true)
                            }}
                            colorScheme={'gray'} leftIcon={<MdEdit/>}>
                            {quiz && quiz.title}
                        </Button>
                        <HStack>
                            <Text width={'50%'} fontWeight={'medium'}>Limit Time</Text>
                            <InputGroup size="sm">
                                <Input
                                    type={'number'}
                                    value={quiz && quiz.limitTime ? quiz.limitTime : 'No Limit Time'}
                                    onChange={(e) => setQuiz((prev) => ({
                                        ...prev,
                                        limitTime: e.target.value
                                    }))}
                                    placeholder="default no limit"/>
                                <InputRightAddon children="mins"/>
                            </InputGroup>
                        </HStack>
                        <Divider/>
                        <HStack justifyContent={'space-between'} w={'100%'}>
                            <Text fontWeight={'medium'}>Code</Text>
                            <Code>{quiz && quiz.code}</Code>
                        </HStack>
                        <HStack justifyContent={'space-between'} w={'100%'}>
                            <Text fontWeight={'medium'}>Subject</Text>
                            <Code>{quiz && quiz.subject.title}</Code>
                        </HStack>
                        <Spacer/>
                        <Button
                            onClick={() => handleSaveQuiz()}
                            alignSelf={'end'} leftIcon={<BiSave/>}>Save</Button>
                    </VStack>
                </Box>
            </Flex>

            {/*DIAlOGS*/
            }
            <NewQuestionDialog size={size} setSize={setSize}
                               visible={showNewQuestionDialog}
                               setVisible={setShowNewQuestionDialog}/>
            {
                showEditQuestionDialog && <EditQuestionDialog size={size} setSize={setSize}
                                                              selectedQuestion={selectedQuestion}
                                                              visible={showEditQuestionDialog}
                                                              setVisible={setShowEditQuestionDialog}/>
            }
            {
                showQuickEditQuiz && <QuizEditDialog isOpen={showQuickEditQuiz} setOpen={setShowQuickEditQuiz}/>

            }

            <HStack position={'fixed'} bottom={10} right={'10'} zIndex={800}>
                <IconButton bg={'teal'} color={'white'} icon={<ArrowUpIcon/>}/>
                <IconButton bg={'teal'} color={'white'} icon={<ArrowDownIcon/>}/>
            </HStack>

            {
                isLoading && <>
                    <Box
                        left={0}
                        position={'fixed'} top={0} minW={'100vw'} minH={'100vh'} zIndex={100000} bg={'gray.100'}
                        opacity={.5}>

                    </Box>
                    <CircularProgress
                        transform={
                            'translate(50%,-50%)'
                        }
                        position={'fixed'} top={'50%'}
                        left={'50%'}
                        isIndeterminate color="green.300" zIndex={100001} align={'center'}/>
                </>
            }

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => {
                    setOpen(false)
                    setSelectedQuestion(null)
                }}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Remove Question
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button
                                ref={cancelRef}
                                onClick={() => {
                                    setOpen(false)
                                    setSelectedQuestion(null)
                                }}>
                                Cancel
                            </Button>
                            <Button colorScheme="red"
                                    onClick={onRemoveQuestion}
                                    ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}

export default QuizEditor;