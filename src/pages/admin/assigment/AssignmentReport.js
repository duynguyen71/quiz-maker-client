import React, {useContext, useEffect, useState} from 'react';
import {AdminContext} from "../../../providers/AdminSettingProvider";
import {useHistory, useParams} from "react-router-dom";
import UserService from "../../../service/UserService";
import {Box, Button, Flex, HStack, Text, VStack} from "@chakra-ui/react";
import {EditIcon} from "@chakra-ui/icons";

const AssignmentReport = () => {
    const {isLoading, setLoading} = useContext(AdminContext);
    const [report, setReport] = useState(null);
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
                    <Text>{report && report.assignmentInfo.quiz.title}</Text>
                </HStack>
                    <VStack align={'start'}>
                        <Text>{report && report.assignmentInfo.title}</Text>
                        <Text>{report && report.assignmentInfo.description}</Text>
                    </VStack></VStack>
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
                {report && report.users.map((user) => (
                    <VStack bg={'white'} p={'5'} align={'start'}>
                        <Text> Username : {user.userInfo.username}</Text>
                        <Text>Score : {user.score}</Text>
                        <Text>Questions :{user.completeCount}{'/'} {report.assignmentInfo.quiz.numOfQuestions}</Text>
                    </VStack>

                ))}
            </Flex>
        </>
    );
};

export default AssignmentReport;