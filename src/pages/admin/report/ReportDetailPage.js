import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Tab, TableCaption,
    TabList,
    TabPanel,
    TabPanels,
    Table,
    Tbody,
    Tfoot,
    Tabs, Tag, TagLabel, TagLeftIcon, Td,
    Text, Th, Thead, Tr,
    VStack, Icon, Tooltip, Container
} from "@chakra-ui/react";
import {CloseIcon} from "@chakra-ui/icons";
import {AiOutlineCheck, BsCheck, FiCheck, IoIosClose, RiCloseLine} from "react-icons/all";
import {useParams} from "react-router-dom";
import axios from "axios";

const ReportDetailPage = () => {

    //get quiz id
    const {id} = useParams();
    const [data, setData] = useState();

    useEffect(async () => {
        document.tittle = "Report Quizzes";

        try {
            console.log('fetch data')
            const url = `http://localhost:8080/api/v1/admin/quiz-assignment/assign-quizzes/${id}/report`;
            const resp = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            if (resp.status === 200) {
                console.log(resp.data);
                setData(resp.data);
            }
        } catch (e) {
            console.log('Failed to fetch data', e)
        }
        console.log(id);
    }, []);
    return (
        <Box w={'100%'} bg={'gray.100'}>
            <VStack w={'100%'}>

                <Box p={5} bg={'white'} w={'100%'}>
                    <HStack w={'100%'} justifyContent={'space-between'}>
                        <VStack align={'start'}>
                            <Text>Quiz title</Text>
                            <Text>Quiz title</Text>
                            <HStack spacing={2}>
                                <Button size={'sm'}>edit</Button>
                                <Button size={'sm'}>edit</Button>
                                <Button size={'sm'}>edit</Button>
                            </HStack>
                        </VStack>
                        <HStack spacing={2}>
                            {/*<Box border={'lg'} maxW={100} maxH={100} borderRadius={'lg'} centerContent>*/}
                            {/*    <Box padding="4" bg="gray.100" maxW="xl">*/}
                            {/*    </Box>*/}
                            {/*</Box>*/}
                        </HStack>
                    </HStack>

                </Box>
                <Tabs w={'100%'} minH={'100vh'} size={'lg'} variant={"enclosed"} colorScheme={'blue'}>
                    <TabList bg={'gray.200'}>
                        <Tab>Participants</Tab>
                        <Tab>Overview</Tab>
                        <Tab>Three</Tab>
                    </TabList>

                    <TabPanels mt={5} w={'100%'}>
                        <TabPanel p={0} w={'100%'}>
                            {
                                data && data.map((item, i) => (
                                    <Flex px={5} py={2} bg={'white'} key={i} mb={3} w={'100%'}
                                          justifyContent={'space-between'} alignItems={'center'}>
                                        <Text fontWeight={'medium'}>{item.userInfo.username}</Text>
                                        <Text>50%</Text>
                                        <HStack spacing={0}>
                                            <Tag m={0} borderRadius={'0'} size={'sm'} variant={'solid'}
                                                 colorScheme={'green'}>
                                                {/*<TagLeftIcon size={'sm'} as={BsCheck}/>*/}
                                                <TagLabel>3</TagLabel>
                                            </Tag>
                                            <Tag m={0} size={'sm'} borderRadius={'none'} variant={'solid'}
                                                 colorScheme={'red'}>
                                                {/*<TagLeftIcon size={'sm'} as={CloseIcon}/>*/}
                                                <TagLabel>3</TagLabel>
                                            </Tag>
                                        </HStack>
                                        <VStack>
                                            <Text>22% </Text>
                                            <Text>Accuray</Text>
                                        </VStack>
                                        <VStack>
                                            <Text>22% </Text>
                                            <Text>Accuray</Text>
                                        </VStack>
                                    </Flex>
                                ))
                            }

                        </TabPanel>
                        <TabPanel m={0} p={0}>
                            <Box>
                                <Table colorScheme={'facebook'} variant="simple" bg={'white'}>
                                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                                    <Thead>
                                        <Tr>
                                            <Th>Participant names</Th>
                                            <Th>Score</Th>
                                            {/**/}
                                            <Th maxW={5}>Q1</Th>
                                            <Th maxW={5}>Q1</Th>
                                            <Th maxW={5}>Q1</Th>
                                            {/*<Th isNumeric>multiply by</Th>*/}
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            [1, 1, 1, 1, 1, 1, 1, 1,].map((item, i) => (
                                                <Tr key={i}>
                                                    <Td>Nguyen Khanh Duy</Td>
                                                    <Td>millimetres (mm)</Td>
                                                    {/**/}
                                                    <Td
                                                        onMouseEnter={() => {
                                                            console.log('mouse enter')
                                                        }}
                                                        onMouseLeave={() => {
                                                            console.log('mouse leave')
                                                        }}
                                                        maxW={5} bg={'red.500'}>
                                                        <RiCloseLine/>
                                                    </Td>
                                                    <Td maxW={5} bg={'green.500'}><FiCheck/></Td>
                                                    <Td maxW={5} bg={'green.500'}><FiCheck/></Td>
                                                    {/*<Td isNumeric>25.4</Td>*/}
                                                </Tr>
                                            ))
                                        }
                                    </Tbody>
                                    {/*<Tfoot>*/}
                                    {/*    <Tr>*/}
                                    {/*        <Th>To convert</Th>*/}
                                    {/*        <Th>into</Th>*/}
                                    {/*        <Th isNumeric>multiply by</Th>*/}
                                    {/*    </Tr>*/}
                                    {/*</Tfoot>*/}
                                </Table>
                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <p>three!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>

            </VStack>
        </Box>
    );
};

export default ReportDetailPage;