import React, {useEffect, useState} from 'react';
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

const AssignedQuizPage = () => {

    const [isLoading, setLoading] = useState(true);
    const [assignedQuizzes, setAssignedQuiz] = useState([]);
    useEffect(() => {
        console.log('use effect assign quiz');
        try {
            setLoading(true);
            axios.get('http://localhost:8080/api/v1/member/quizzes/assigned-quizzes', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
                .then((resp) => {
                    if (resp.status === 200) {
                        console.log(resp.data);
                        setAssignedQuiz(resp.data);
                        setLoading(false);
                    }
                })

        } catch (e) {

        }
    }, []);
    const formatDate = (start, end) => {
        const from = dateFormat(start, "dddd, mmmm, yyyy");
        const to = dateFormat(end, "dddd, mmmm, yyyy, h:MM:ss TT");
        return from + "\t-\t" + to;

    }
    return (
        <>

            <Heading textAlign={'center'}>Assigned quizess</Heading>
            <Divider my={5}/>

            <Table size={'lg'} variant={'striped'} colorScheme={'blue'}>
                <Thead>
                    <Tr>
                        <Th>No</Th>
                        <Th>Quiz Name</Th>
                        <Th>Deadline</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>

                <Tbody>

                    {
                        assignedQuizzes.length == 0 && <Tr>
                            <Td colSpan={4} py={5} my={5}>
                                Your dont have any assigned quiz
                            </Td>
                        </Tr>

                    }
                    {
                        assignedQuizzes.length > 0 &&
                        assignedQuizzes.map((assignmentInfo, index) => (
                            <Tr key={index}>
                                <Td>1</Td>
                                <Td>
                                    <HStack>
                                        <Text>        {assignmentInfo.quizDetails.title}  </Text>
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
                                    <Button colorScheme={'blue'}>
                                        Take
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