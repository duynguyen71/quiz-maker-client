import React, {useEffect, useState} from 'react';
import {
    Box,
    Button, Flex,
    HStack,
    IconButton,
    Image,
    Menu,
    MenuButton, MenuItem,
    MenuList,
    Text,
    Tooltip, useDisclosure,
    VStack
} from "@chakra-ui/react";
import {BsListCheck, BsPlay, MdAssignment} from "react-icons/all";
import {ChevronDownIcon, EditIcon, TimeIcon} from "@chakra-ui/icons";
import dateFormat from "dateformat";
import UserService from "../../../service/UserService";
import QuizEntry from "./QuizEntry";
import QuizService from "../../../service/QuizService";

const RemovedQuizzes = ({i, createDate, title, playedCount, limitTime, numOfQuestions}) => {

    const [quizzes, setQuizzes] = useState([]);
    // const [] =  useDisclosure();
    useEffect(async () => {
        try {
            const data = await UserService.getUserQuizzes({
                active: 0
            })
            console.log('removed quizzes: ', data.data);
            setQuizzes(data.data);
        } catch (e) {

        }
    }, []);

    const recover = async (id) => {
        try {
            const resp = await UserService
                .updateQuizActive(id, 1);
            const q = quizzes.filter(item => item.id !== id);
            setQuizzes(q);
        } catch (e) {

        }
    }

    return (
        <>
            <Flex direction={'column'} w={'100%'}>
                <HStack>
                    <Text>{quizzes && quizzes.length} Removed Quizzes</Text>
                </HStack>
                {
                    quizzes && quizzes.map((item, i) => (
                        <QuizEntry key={i}
                                   {
                                       ...item
                                   }
                                   recover={recover}
                        />
                    ))
                }
            </Flex>
        </>
    );
};

export default RemovedQuizzes;