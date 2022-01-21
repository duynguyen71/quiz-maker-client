import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Center,
    Flex,
    Grid,
    GridItem,
    SimpleGrid,
    Input,
    Stack,
    Wrap,
    WrapItem,
    Heading,
    Text,
    HStack,
    Avatar,
    VStack,
    Image,
} from "@chakra-ui/react";
import QuizInfo from "./QuizInfo";
import Footer from "../../../components/public/Footer";

import {GoFlame} from "react-icons/all";
import {useAuth} from "../../../hooks/useAuth";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {useQuiz} from "../../../providers/QuizProvider";
import NotFoundQuiz from "./NotFoundQuiz";
import Nav from "./Nav";
import quizApi from "../../../api/quizApi";
import QuizService from "../../../service/QuizService";

const HomePage = () => {
    const history = useHistory();
    const {user} = useAuth();
    const [code, setCode] = useState("8AzAO8");
    const [found, setFound] = useState(true);
    const [isLoading, setLoading] = useState(true);

    const [quizzes, setQuizzes] = useState(null);
    useEffect(() => {
        /*
        get newest quizzes
         */
        getQuizzes();

    }, []);

    const getQuizzes = async () => {
        setLoading(true);
        try {
            const data = await QuizService.getQuizzes();
            console.log(data.data);
            setQuizzes(data.data);
        } catch (e) {
            console.log("Get quizzes failed")
        } finally {
            setLoading(false);
        }
    }

    /*
    handle find quiz by code 
    */
    const handleJoinQuiz = async (e) => {
        // if (code != null && code.length > 0) {
        //     try {
        //         const data = await QuizService.getQuizByCode(code);
        //         console.log(data);
        //         setFound(true);
        //     } catch (e) {
        //         setFound(false);
        //         console.log(e.response.message);
        //     }
        // }
    };

    const getUserStreaks = () => {
        return user && user.streaks || 0;
    }
    return (
        <Flex
            direction={"column"}
            bg={"#F7FAFC"}
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Nav/>
            {/*//Main Content*/}
            <Flex
                pt={8}
                bg={"#F7FAFC"}
                // minHeight={'100vh'}
                w={"100%"}
                direction={"column"}
                alignItems={"flex-start"}
            >
                <Flex
                    w={"100%"}
                    justifyContent={"space-around"}
                    alignItems={"center"}
                >
                    {/*Join Code*/}
                    <Box
                        // minW={'800px'}
                        w={["100px", "500px", "800px"]}
                    >
                        <Stack

                            boxShadow={"md"}
                            borderRadius={"10px"}
                            bg={"white"}
                            p={["10px", "50px", "100px"]}
                            minW={"360px"}
                            direction={"row"}
                        >
                            <Input
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                minH={"50px"}
                                minW={"260px"}
                                placeholder={"Enter a join code"}
                            />
                            <Button
                                isDisabled={code.length === 0}
                                onClick={handleJoinQuiz}
                                minH={"50px"}
                                minW={"30px"}
                                variant={"solid"}
                                colorschema={"teal"}
                                bg={'teal'}
                                px={5}
                                color={'white'}
                            >
                                Join
                            </Button>
                        </Stack>
                    </Box>
                    {/*Day Streak*/}
                    {!found && <NotFoundQuiz setShow={setFound}/>}
                    <Box
                        boxShadow={"md"}
                        borderRadius={"10px"}
                        bg={"white"}
                        p={["10px", "50px"]}
                        align={"center"}
                    >
                        <Stack direction={"column"}>
                            <Box
                                // bg={"#EDF2F7"}
                                bg={'gray.200'}
                                p={1}
                                borderRadius={"200px"}
                                minW={"200px"}
                            >
                                <HStack>
                                    {/*avt*/}
                                    <Avatar
                                        name={user != null ? user.username : ""}
                                        src={
                                  (user && user.avt) ||
                                            "https://cdn-icons-png.flaticon.com/512/2021/2021646.png"
                                        }
                                    />
                                    {/*username*/}
                                    <Text
                                        fontSize={"16px"}
                                        color={"#4A5568"}
                                        fontWeight={"medium"}
                                    >
                                        {user != null
                                            ? user.username
                                            : "Create an account"}
                                    </Text>
                                </HStack>
                            </Box>
                            <HStack spacing={2} pt={1} pb={1}>
                                <GoFlame color={getUserStreaks() >= 1 && "orange" || "#718096"} fontSize={"30px"}/>
                                <GoFlame color={getUserStreaks() >= 2 && "orange" || "#718096"} fontSize={"30px"}/>
                                <GoFlame color={getUserStreaks() >= 3 && "orange" || "#718096"} fontSize={"30px"}/>
                                <GoFlame color={getUserStreaks() >= 4 && "orange" || "#718096"} fontSize={"30px"}/>
                                <GoFlame color={getUserStreaks() >= 5 && "orange" || "#718096"} fontSize={"30px"}/>
                            </HStack>
                            <Text
                                color={"#4A5568"}
                                fontWeight={"bold"}
                                fontSize={"16px"}
                            >
                                {getUserStreaks()} day streak
                            </Text>
                            <Text color={"#718096"} fontSize={"14px"}>
                                Start your streak, play now!
                            </Text>
                        </Stack>
                    </Box>
                </Flex>
            </Flex>
            {/*NEWEST QUIZZES*/}
            <Box py={5} px={10} align={"start"} w={'100%'}>
                <VStack align={"start"}>
                    <Text
                        fontSize={"22px"}
                        letterSpacing={1}
                        fontWeight={"medium"}
                    >
                        Newest Quizzes
                    </Text>
                    <Flex direction={['column', 'column', 'row']} pt={5} w={"100%"}>
                        {
                            quizzes && quizzes.map((item, index) => (
                                <QuizInfo quizInfo={item} key={index} mr={[0, 2, 4]}/>
                            ))
                        }

                    </Flex>
                </VStack>
            </Box>
            {/*End of RecentActivity*/}
            {/**/}
            <Box minH={"100px"}></Box>
            {/*Footer*/}

            <Footer/>

        </Flex>
    );
};

export default HomePage;
