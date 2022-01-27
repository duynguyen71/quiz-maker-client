import React, {useContext, useEffect, useState} from 'react';
import {AdminContext} from "../../../providers/AdminSettingProvider";
import {useHistory, useParams} from "react-router-dom";
import UserService from "../../../service/UserService";
import {
    Box, Button, Flex, HStack, Text, VStack, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from "@chakra-ui/react";
import {EditIcon} from "@chakra-ui/icons";
import {GrGroup} from "react-icons/all";
import AssignedUserReport from "./AssignedUserReport";

const AssignmentReport = () => {
    const {isLoading, setLoading} = useContext(AdminContext);
    const [report, setReport] = useState(null);
    const [isOpen, setOpen] = useState(false);
    const {id} = useParams();
    const history = useHistory();
    useEffect(() => {
        getReport();
    }, []);
    const getReport = async () => {
        setLoading(true);
        try {
            const resp = await UserService.getAssignmentReport(id);
            setReport(resp.data)
            console.log(resp.data);

        } catch (e) {

        } finally {
            setLoading(false);
        }
    }

    const showUsers = async () => {

        setOpen(true)
    }
    return (
        <>
            <Flex direction={'column'}>
                <HStack align={'end'} w={'100%'}>
                    <Button

                        onClick={() => {
                            history.push(`/admin/quiz/assigment/quizzes/${id}`, {
                                data: report.assignmentInfo.quiz
                            })
                        }}
                        align={'end'} rightIcon={<EditIcon/>}>Edit</Button>
                </HStack>

                <VStack bg={'white'} p={'5'} align={'start'}> <HStack>
                    <Text>QUIZ TITLE: </Text>
                    <Text fontWeight={'medium'}>{report && report.assignmentInfo.quiz.title}</Text>
                </HStack>
                    <VStack align={'start'}>
                        <Text fontSize={'20px'} color={'teal'}
                              fontWeight={'bold'}>{report && report.assignmentInfo.title}</Text>
                        <Text textColor={'gray.600'}>{report && report.assignmentInfo.description}</Text>
                    </VStack>
                </VStack>
                <HStack align={'end'} py={2} alignSelf={'end'}>
                    <Button
                        colorScheme={'blue'}
                        onClick={showUsers}
                        rightIcon={<GrGroup/>}>Users
                        ({report && report.users && report.users.length})</Button>
                </HStack>
                <Box height={'5vh'}/>
                <HStack> <Text fontWeight={'medium'} fontSize={'25px'}>Result</Text></HStack>
                {
                    !isLoading && report && (
                        <HStack>
                            <VStack>

                            </VStack>
                        </HStack>
                    )
                }
                {/*{report && report.users.map((user) => (*/}
                {/*    <VStack key={user.userInfo.username} bg={'white'} p={'5'} align={'start'}>*/}
                {/*        <Text> Username : {user.userInfo.username}</Text>*/}
                {/*        {user.complete && (<>*/}
                {/*            <Text>Score : {user.score}</Text>*/}
                {/*            <Text>Questions*/}
                {/*                :{user.completeCount}{'/'} {report.assignmentInfo.quiz.numOfQuestions}</Text>*/}
                {/*        </>)}*/}
                {/*    </VStack>*/}

                {/*))}*/}
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption>User submit report</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Username</Th>
                            <Th>Email</Th>
                            <Th isNumeric>Score</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {report && report.users.map((user) => <Tr key={user.userInfo.username}>
                            <Td>{user.userInfo.username}</Td>
                            <Td>{user.userInfo.fullName}</Td>
                            <Td>{user.score} </Td>
                            <Td

                                onClick={async () => {
                                    const resp = await UserService.getExamSubmittedAnswers(report.assignmentInfo.quiz.id, user.userInfo.id);
                                    console.log(resp.data);
                                }}
                            >
                                {user.complete && <Button disabled={!user.complete} colorScheme={'blue'} size={'sm'}>View
                                    Answers</Button>}
                            </Td>
                        </Tr>)}

                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Username</Th>
                            <Th>Email</Th>
                            <Th isNumeric>Score</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </Flex>
            {isOpen && report && <AssignedUserReport isOpen={isOpen} setOpen={setOpen} users={report.users}/>}
        </>
    );
};

export default AssignmentReport;