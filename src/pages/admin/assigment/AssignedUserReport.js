import React from 'react';
import {
    Avatar,
    Button,
    Divider,
    HStack, IconButton, ListItem,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, OrderedList, Spacer,
    Text, Tooltip,
    VStack
} from "@chakra-ui/react";
import {BsCheck, FaUsers} from "react-icons/all";
import {DeleteIcon} from "@chakra-ui/icons";

const AssignedUserReport = ({users, isOpen, setOpen}) => {
    return (
        <>
            <Modal size={'md'} onClose={() => {
            }} scrollBehavior={'inside'} closeOnOverlayClick={true} isOpen={isOpen}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader
                    >
                        <VStack w={'100%'} align={'start'}>
                            <HStack>
                                <Text fontSize={15} fontWeight={'medium'}>Assigned Users
                                    ({users && users.length})</Text>
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
                                    <ListItem key={user.userInfo.email}>
                                        <HStack w={'100%'}>
                                            <Avatar
                                                size={'xs'}
                                                name={user.userInfo.fullName}
                                                src={user.avt}
                                            />
                                            <Text>{user.userInfo.email}</Text>
                                            {user.complete &&
                                            <Tooltip label={'completed'} aria-label='A tooltip'><BsCheck
                                                color={'green'}/></Tooltip>}

                                            <Spacer/>
                                            <IconButton
                                                // onClick={() => onRemoveUser(user.userId)}
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

export default AssignedUserReport;