import React, {useContext, useEffect, useState} from 'react';
import {
    Badge,
    Box, Button,
    Divider,
    Heading,
    HStack,
    Table,
    TableCaption,
    Tbody,
    Td,
    Text,
    Th,
    Thead, Tooltip,
    Tr
} from "@chakra-ui/react";
import axios from "axios";
import dateFormat from 'dateformat';
import UserService from "../../../service/UserService";
import {AdminContext} from "../../../providers/AdminSettingProvider";
import {useHistory} from "react-router-dom";

const AssignedQuizPage = () => {

    const {setLoading} = useContext(AdminContext);
    const [assignedQuizzes, setAssignedQuiz] = useState([]);
    const history = useHistory();
    useEffect(() => {
        getAssignedQuizzes();
    }, []);

    const getAssignedQuizzes = async () => {
        try {
            setLoading(true);
            const resp = await UserService.getAssignedQuizzes();
            setAssignedQuiz(resp.data);
            console.log(resp.data);
        } catch (e) {

        } finally {
            setLoading(false);
        }
    }
    const formatDate = (start, end) => {
        const from = dateFormat(start, "dddd, mmmm, yyyy");
        const to = dateFormat(end, "dddd, mmmm, yyyy, h:MM:ss TT");
        return from + "\t-\t" + to;

    }

    const isOutDate = (d) => {
        const now = new Date();
        const date = new Date(d);
        if (date < now) {
            return true;
        }
        return false;
    }
    return (
        <>

            <Heading fontSize={'20px'} textAlign={'center'}>Assigned quizzes</Heading>
            <Divider my={5}/>

            <Table size={'lg'} variant={'striped'} colorScheme={'blue'}>
                <Thead>
                    <Tr>
                        <Th>No</Th>
                        <Th>Quiz Name</Th>
                        <Th>Deadline</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>

                <Tbody>

                    {
                        (!assignedQuizzes || assignedQuizzes.length == 0) && <Tr w={'100%'}>
                            <Td colSpan={4} py={5} my={5}>
                                Your dont have any assigned quiz
                            </Td>
                        </Tr>

                    }
                    {
                        assignedQuizzes &&
                        assignedQuizzes.map((assignmentInfo, index) => (
                            <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>
                                    <HStack>
                                        <Text>        {assignmentInfo.title}  </Text>
                                        <Badge ml="1" colorScheme="green">
                                            New
                                        </Badge>
                                        {/*<Text bg={'teal.700'} px={2} color={'white'} fontSize={'sm'}>new</Text>*/}
                                    </HStack>
                                </Td>
                                <Td>
                                    <Tooltip
                                        label={
                                            // dateFormat(assignmentInfo.finishDate, "dddd, mmmm, yyyy, h:MM:ss TT")
                                            formatDate(assignmentInfo.startDate, assignmentInfo.finishDate)
                                        }>
                                        <Text>
                                            {assignmentInfo.finishDate
                                                ? dateFormat(assignmentInfo.finishDate, "dd, mmmm, yyyy, h:MM TT")
                                                : "No Deadline"
                                            }
                                        </Text>
                                    </Tooltip>

                                </Td>

                                <Td>
                                    <Text fontWeight={'medium'}>   {
                                        assignmentInfo.status === 0 && 'Not Complete'}
                                        {assignmentInfo.status === 1 && 'Completed'
                                        }
                                    </Text>
                                </Td>
                                <Td>
                                    <Button
                                        onClick={() => {
                                            history.push(`/admin/assigned/${assignmentInfo.quiz.id}/info`)
                                        }}
                                        colorScheme={'blue'}>
                                        {!isOutDate(assignmentInfo.finishDate) ? "View" : "Out date"}
                                    </Button>
                                </Td>

                            </Tr>
                        ))
                    }

                </Tbody>
                {
                    assignedQuizzes.length > 0 && <TableCaption>Assigned Quizzes</TableCaption>
                }

            </Table>
        </>
    );
};

export default AssignedQuizPage;