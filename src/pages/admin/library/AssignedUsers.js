import React, {useEffect, useState} from 'react';
import {
    Button, Divider, HStack, Icon, IconButton, ListItem,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, OrderedList, Spacer, Text,
    useDisclosure, VStack
} from "@chakra-ui/react";
import quizApi from "../../../api/quizApi";
import axios from "axios";
import {DeleteIcon} from "@chakra-ui/icons";
import {FaUsers} from "react-icons/all";

const AssignedUsers = ({isOpen, quizId, setOpen}) => {

    const [users, setUsers] = useState(null);

    useEffect(() => {
        console.log("ASSIGNED ")
        const fetchUsers = async () => {
            console.log("get userss")
            try {
                const resp = await axios.get(`http://localhost:8080/api/v1/admin/quiz-assignment/assign-quizzes/${quizId}/users`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                if (resp.status === 200) {
                    setUsers(resp.data);
                    console.log(resp.data);
                }
            } catch (e) {
                console.log("Failed to fetch assigned users ", e);
            }
        }
        fetchUsers();
    }, []);

    const onRemoveUser = async (userId) => {
        console.log("removing...")
        try {
            console.log("removing...1")

            const url = `http://localhost:8080/api/v1/admin/quiz-assignment/assign-quizzes?uid=${userId}&qid=${quizId}`;
            const response = await axios.delete(url, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                },

            })
            if (response.status === 200) {
                const filteredList = users.filter(user => user.userId != userId);
                setUsers(filteredList);
            }
        } catch (e) {
            console.log("Failed to remove assigned user ", e)
        }
    }
    return (
        <>
            <Modal size={'md'} onClose={() => {
            }} scrollBehavior={'inside'} closeOnOverlayClick={true} isOpen={isOpen}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader
                        //     style={{
                        //     fontSize:10,
                        // }}
                    >
                        <VStack w={'100%'} align={'start'}>
                            <HStack>
                                <Text fontSize={15} fontWeight={'medium'}>Assigned Users ({users&&users.length})</Text>
                                <FaUsers/>
                            </HStack>
                            <Divider/>
                        </VStack>
                    </ModalHeader>
                    <ModalCloseButton onClick={() => setOpen(false)}/>
                    <ModalBody>
                        <OrderedList>
                            {
                                users && users.map((user, i) => (
                                    <ListItem key={user.email}>
                                        <HStack w={'100%'}>
                                            <Text>{user.email}</Text>
                                            <Spacer/>
                                            <IconButton
                                                onClick={() => onRemoveUser(user.userId)}
                                                bg={'white'} color={'gray.500'} icon={<DeleteIcon/>}/>
                                        </HStack>
                                    </ListItem>
                                ))
                            }

                        </OrderedList>
                    </ModalBody>

                    <ModalFooter>
                        {/*<Button colorScheme="blue" mr={3}>*/}
                        {/*    Save*/}
                        {/*</Button>*/}
                        <Button onClick={() => setOpen(false)}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


        </>
    );
};

export default AssignedUsers;