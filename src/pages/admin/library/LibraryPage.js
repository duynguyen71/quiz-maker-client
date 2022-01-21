import React, {useContext, useEffect, useState} from "react";
import {
    Box,
    Button, ButtonGroup,
    Flex, FormControl,
    Heading,
    HStack,
    IconButton,
    Image, Input,
    ListIcon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList, Select,
    Text,
    Tooltip,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import {
    AddIcon,
    ChevronDownIcon,
    DeleteIcon,
    EditIcon,
    TimeIcon,
} from "@chakra-ui/icons";
import {Link as RLink} from 'react-router-dom';
import {BiShare, BsListCheck, BsPlay, MdAssignment} from "react-icons/all";
import quizApi from "../../../api/quizApi";
import dateFormat from "dateformat";
import AssignedUsers from "./AssignedUsers";
import {useHistory} from "react-router-dom";
import ShareDialog from "./ShareDialog";
import UserService from "../../../service/UserService";
import {AdminContext} from "../../../providers/AdminSettingProvider";

const LibraryPage = () => {
    const [share, setShare] = useState(false);
    const {setLoading} = useContext(AdminContext);
    const [quizzes, setQuizzes] = useState([]);
    const [filteredQuizzes, setFilteredQuizzes] = useState(null);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [isOpen, setOpen] = useState(false);
    const [params, setParams] = useState({
        direction: "DESC",
        sortBy: "create_date",
        active: 1
    });
    const history = useHistory();

    useEffect(() => {
        console.log("rendering............")
        getCreatedQuizzesInfo();
    }, [params, setParams]);
    const getCreatedQuizzesInfo = async () => {
        setLoading(true);
        try {
            const data = await UserService.getUserQuizzes(params);
            setQuizzes(data.data);
            setFilteredQuizzes(data.data);
            console.log(data.data);
        } catch (e) {
            console.log("Failed to fetch created quizzes info");
        } finally {
            setLoading(false);
        }
    };

    const getStatus = (status) => {
        switch (status) {
            case 0:
                return "draft"
            case 1:
                return "private"
            case 2 :
                return "public"
        }
    }
    return (
        <>
            <Flex w={"100%"} bg={"gray.100"} direction={"column"}>
                <HStack>
                    <RLink to={'/admin/quiz/removed'}>
                        <Text textDecoration={'underline'}>Removed Quizzes</Text>
                    </RLink>
                </HStack>
                {/**/}
                <HStack w={'100%'} py={5}>
                    <Text w={'100%'} fontWeight={"medium"}>
                        {quizzes && quizzes.length} Quizzes
                    </Text>
                    <FormControl>
                        <Input
                            onChange={(e) => {
                                const value = e.target.value.toLowerCase();
                                if (value && value.length > 0) {
                                    setFilteredQuizzes(quizzes.filter(item => item.title.toLowerCase().includes(value)))
                                } else {
                                    setFilteredQuizzes(quizzes);
                                }
                            }}
                            placeholder={"enter quiz title"}/>
                    </FormControl>
                </HStack>
                <HStack alignSelf={'end'}>
                    <Text>Sort</Text>
                    <Select defaultValue={0}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                switch (value) {
                                    case 0: {
                                        setParams(prev => ({
                                            ...prev,
                                            direction: "DESC",
                                            active: 1
                                        }))
                                        break
                                    }

                                    case 1: {
                                        setParams(prev => ({
                                            ...prev,
                                            direction: "ASC",
                                            active: 1
                                        }))
                                        break
                                    }
                                }
                            }}
                    >
                        <option value={0}>Create Date - DESC</option>
                        <option value={1}>Create Date - ASC</option>
                    </Select>

                </HStack>
                {/*CREATED QUIZZES*/}
                {filteredQuizzes &&
                filteredQuizzes.map((item, i) => {
                    const handleEdit = () => {
                        history.push(`/admin/quiz/${item.id}/edit`);
                    };
                    const updateQuizActive = async (active) => {
                        console.log(item.id);
                        try {
                            const resp = await UserService.updateQuizActive(item.id, active);
                            const q = quizzes.filter(quiz => quiz.id !== item.id);
                            setQuizzes(q);
                            setFilteredQuizzes(q);
                            console.log("Remove quiz id : " + item.id + " success");
                        } catch (e) {
                            console.log("Failed to update quiz active status", e);
                        }

                    }
                    const handleAssignment = () => {
                        history.push(`/admin/quiz/${item.id}/assignment`)
                    }
                    return (
                        <Box
                            my={2}
                            key={i}
                            p={5}
                            minW={"100"}
                            bg={"white"}
                            maxW={600}
                            position={"relative"}
                        >
                            <HStack spacing={5}>
                                {/*IMAGE*/}
                                <Box boxSize="100px">
                                    <Image
                                        src="https://cdn-icons-png.flaticon.com/512/1205/1205526.png"
                                        alt="Q"
                                    />
                                </Box>
                                {/*INFO*/}
                                <VStack align={"start"}>
                                    {/*STATUS*/}
                                    <HStack>
                                        <Text
                                            color={"gray.500"}
                                            fontSize={12}
                                        >
                                            Quiz
                                        </Text>
                                        <Text
                                            bg={"teal.100"}
                                            px={2}
                                            color={"gray.500"}
                                            fontSize={12}
                                        >
                                            {
                                                getStatus(item.status)
                                            }
                                        </Text>
                                    </HStack>
                                    {/*TITLE*/}
                                    <Text
                                        fontWeight={"medium"}
                                        fontSize={18}
                                    >
                                        {item.title}
                                    </Text>
                                    {/*PLAYED*/}
                                    <HStack spacing={4}>
                                        <HStack>
                                            <IconButton
                                                size={"xs"}
                                                icon={<BsListCheck/>}
                                            />
                                            <Text fontSize={12}>
                                                {item.numOfQuestions} Q
                                            </Text>
                                        </HStack>

                                        <HStack>
                                            <IconButton
                                                size={"xs"}
                                                icon={<TimeIcon/>}
                                            />
                                            <Text fontSize={12}>
                                                {item.limitTime} mins
                                            </Text>
                                        </HStack>
                                        <HStack>
                                            <IconButton
                                                size={"xs"}
                                                icon={<BsPlay/>}
                                            />
                                            <Text fontSize={12}>
                                                Played {item.playedCount} times
                                            </Text>
                                        </HStack>
                                    </HStack>
                                    {/*CREATED DATE*/}
                                    <Text>
                                        Create At {": "}
                                        <Tooltip label={"Created date"}>
                                            {dateFormat(
                                                item.createDate,
                                                "dd-mm-yyyy, h:MM TT"
                                            )}
                                        </Tooltip>
                                    </Text>

                                </VStack>
                            </HStack>
                            <HStack
                                spacing={5}
                                position={"absolute"}
                                top={5}
                                right={5}
                            >
                                <IconButton
                                    onClick={handleEdit}
                                    size={"sx"}
                                    icon={<EditIcon/>}
                                />
                                <Menu>
                                    <MenuButton
                                        bg={"white"}
                                        size={"sm"}
                                        as={Button}
                                        rightIcon={<ChevronDownIcon/>}
                                    >
                                        {/*Actions*/}
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem
                                            onClick={() => {
                                                setSelectedQuiz(
                                                    item
                                                );
                                                setOpen(true);
                                            }}
                                        >
                                            Assigned users
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                setSelectedQuiz(
                                                    item
                                                );
                                                setShare(true)
                                            }}
                                        >
                                            Share
                                        </MenuItem>
                                        <MenuItem onClick={handleEdit}>
                                            Edit
                                        </MenuItem>
                                        <MenuItem onClick={() => {
                                            updateQuizActive(0)
                                        }}>Remove</MenuItem>
                                    </MenuList>
                                </Menu>
                            </HStack>
                            <IconButton
                                onClick={(() => handleAssignment())}
                                position={"absolute"}
                                bottom={10}
                                right={5}
                                size={"md"}
                                icon={<MdAssignment/>}
                            />
                        </Box>
                        //    END OF QUIZ ENTRY
                    );
                })}
            </Flex>

            {share && (
                <ShareDialog quizId={selectedQuiz.id} setVisible={setShare}/>
            )}
            {isOpen && (
                <AssignedUsers
                    quizId={selectedQuiz.id}
                    isOpen={isOpen}
                    setOpen={setOpen}
                />
            )}
        </>
    );
};

export default LibraryPage;
