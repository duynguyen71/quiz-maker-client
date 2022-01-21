import React, {useEffect, useState} from 'react';
import {
    Box, Flex,
    Heading,
    HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Select, Spacer,
    Stack,
    Table,
    TableCaption,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr, VStack
} from "@chakra-ui/react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {AiOutlineUser, BiDotsHorizontalRounded} from "react-icons/all";
import {ChevronDownIcon} from "@chakra-ui/icons";

const ReportPage = () => {
    const [reportData, setData] = useState(null);
    const history = useHistory();
    useEffect(async () => {
        const url = 'http://localhost:8080/api/v1/admin/quiz-assignment/assign-quizzes/report';
        try {
            const resp = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            console.log(resp.data);
            setData(resp.data);
        } catch (e) {
            console.log('Failed to get report data ', e)
        }
    }, []);
    return (
        <Box w={'100%'}>
            <VStack w={'100%'}>

                <Box w={'100%'} mb={10}>
                    <Flex w={'100%'}>
                        <Select bg={'white'} placeholder="Select option">
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </Select>
                        <Box mx={100}/>
                        <Select bg={'white'} maxW={200} placeholder="Select option">
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </Select>
                        <Box mx={5}/>
                        <Select bg={'white'} maxW={200} placeholder="Select option">
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </Select>
                    </Flex>
                </Box>

                <Table boxShadow={'md'} variant="simple" colorScheme="blue" bg={'white'} p={4}>
                    <TableCaption>Quiz Reporting</TableCaption>
                    <Thead color={'blue'}>
                        <Tr color={'blue'}>
                            <Th py={5} color={'teal'} fontSize={14}>Quiz name</Th>
                            <Th color={'teal'} fontSize={14}>
                                Total participants
                            </Th>
                            <Th color={'teal'} fontSize={14} isNumeric>Avg score</Th>
                            <Th/>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            reportData && reportData.map((item) => {
                                const avgScore = () => {
                                    let rs = 0;
                                    item.participants.forEach((u) => u.score ? rs += u.score : 0);
                                    return rs > 0 ? rs / (item.participants.length) : 0;
                                }
                                return <Tr
                                    key={item.title}>
                                    <Td
                                        cursor={'pointer'}
                                        onClick={() => {
                                            item.id &&
                                            history.push(`/admin/report/${item.quizId}/details`)
                                        }}>{item.title}</Td>
                                    <Td>{item.participants.length}</Td>
                                    <Td isNumeric>{avgScore()}</Td>
                                    <Td onClick={() => {
                                    }}>
                                        <Menu>
                                            <MenuButton
                                                border={'none'}
                                                px={4}
                                                py={2}
                                                transition="all 0.2s"
                                                borderRadius="md"
                                                borderWidth="1px"
                                                _hover={{bg: "gray.400"}}
                                                _expanded={{bg: "blue.400"}}
                                                _focus={{boxShadow: "outline"}}
                                            >
                                                <BiDotsHorizontalRounded/>
                                            </MenuButton>
                                            <MenuList>
                                                <MenuItem>New File</MenuItem>
                                                <MenuItem>New Window</MenuItem>
                                                <MenuDivider/>
                                                <MenuItem>Open...</MenuItem>
                                                <MenuItem>Save File</MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Td>
                                </Tr>
                            })
                        }

                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Tfoot>
                </Table>

            </VStack>
        </Box>
    )
        ;
};

export default ReportPage;