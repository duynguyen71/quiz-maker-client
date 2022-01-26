import React, {useContext, useEffect, useState} from 'react';
import {AdminContext} from "../../../providers/AdminSettingProvider";
import UserService from "../../../service/UserService";
import {Badge, Flex, HStack, Text, VStack} from "@chakra-ui/react";
import {Link as RLink, useHistory} from 'react-router-dom';
import dateFormat from "dateformat";

const AssignmentQuizzes = () => {
    const {isLoading, setLoading} = useContext(AdminContext);
    const history = useHistory();
    const [assignments, setAssignments] = useState();
    useEffect(() => {
        getAssignmentsInfo();
    }, [])
    const getAssignmentsInfo = async () => {

        try {
            setLoading(true);
            const resp = await UserService.getAssignmentsInfo();
            setAssignments(resp.data);
            console.log(resp);
        } catch (e) {

        } finally {
            setLoading(false);

        }
    }
    return (
        <>
            <Flex direction={'column'}>
                <HStack>
                    <RLink to={'/admin/library'}>
                        <Text textDecoration={'underline'}>Library</Text>
                    </RLink>
                </HStack>
                <HStack py={'5'}>
                    <Text fontSize={'20px'} fontWeight={'medium'}>Assignment Infos</Text>
                </HStack>
                {!isLoading && assignments && (
                    <>
                        <VStack spacing={5}>
                            {
                                assignments.map((a, i) => (
                                    <Flex
                                        onClick={() => {
                                            history.push(`/admin/assigment/${a.id}/report`)
                                        }}
                                        cursor={'pointer'} bg={'teal.100'} p={'2'} w={'100%'} key={i}
                                        alignItems={'center'}
                                        justifyContent={'space-between'}>
                                        <VStack align={'start'} key={i}>
                                            <HStack>
                                                <Text fontWeight={'medium'} fontSize={'20px'}
                                                      textTransform={'uppercase'}>{a.title}
                                                </Text>
                                                {'('}
                                                <Text>{a.quiz.title}</Text>
                                                {')'}
                                            </HStack>

                                            <Text>{a.description}</Text>
                                        </VStack>
                                        <HStack>
                                            <Badge>
                                                {dateFormat(a.startDate, 'dd-mm-yyyy hh:MM')}
                                            </Badge>
                                            {'-'}
                                            <Badge>
                                                {dateFormat(a.finishDate, 'dd-mm-yyyy hh:MM')}
                                            </Badge>
                                        </HStack>
                                    </Flex>
                                ))
                            }
                        </VStack>

                    </>
                )}

            </Flex>
        </>
    );
};

export default AssignmentQuizzes;