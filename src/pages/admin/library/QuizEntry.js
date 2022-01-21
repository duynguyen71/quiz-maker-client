import React, {useRef, useState} from 'react';
import {
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter, AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    HStack,
    IconButton,
    Image,
    Menu,
    MenuButton, MenuItem,
    MenuList,
    Text,
    Tooltip,
    VStack,
    AlertDialog
} from "@chakra-ui/react";
import {BsListCheck, BsPlay, MdAssignment, RiDeviceRecoverLine} from "react-icons/all";
import {ChevronDownIcon, EditIcon, TimeIcon} from "@chakra-ui/icons";
import dateFormat from "dateformat";
import UserService from "../../../service/UserService";

const QuizEntry = ({i, createDate, id, title, playedCount, limitTime, numOfQuestions, recover}) => {
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()
    return (
        <>
            <Box
                my={2}
                key={i}
                p={5}
                minW={"100"}
                bg={"white"}
                maxW={800}
                position={"relative"}
            >
                <HStack spacing={5}>
                    {/*IMAGE*/}
                    <Box boxSize="100px">
                        <Image
                            src="https://cdn-icons-png.flaticon.com/512/1205/1205526.png"
                            alt="Q"
                        />
                    </Box>
                    {/*INFO*/}
                    <VStack align={"start"}>
                        {/*STATUS*/}
                        <HStack>
                            <Text
                                color={"gray.500"}
                                fontSize={12}
                            >
                                Quiz
                            </Text>
                            <Text
                                bg={"teal.100"}
                                px={2}
                                color={"gray.500"}
                                fontSize={12}
                            >
                                {
                                    // getStatus(item.status)
                                }
                            </Text>
                        </HStack>
                        {/*TITLE*/}
                        <Text
                            fontWeight={"medium"}
                            fontSize={18}
                        >
                            {title}
                        </Text>
                        {/*PLAYED*/}
                        <HStack spacing={4}>
                            <HStack>
                                <IconButton
                                    size={"xs"}
                                    icon={<BsListCheck/>}
                                />
                                <Text fontSize={12}>
                                    {numOfQuestions} Q
                                </Text>
                            </HStack>

                            <HStack>
                                <IconButton
                                    size={"xs"}
                                    icon={<TimeIcon/>}
                                />
                                <Text fontSize={12}>
                                    {limitTime} mins
                                </Text>
                            </HStack>
                            <HStack>
                                <IconButton
                                    size={"xs"}
                                    icon={<BsPlay/>}
                                />
                                <Text fontSize={12}>
                                    Played {playedCount} times
                                </Text>
                            </HStack>
                        </HStack>
                        {/*CREATED DATE*/}
                        <Text>
                            Create At {": "}
                            <Tooltip label={"Created date"}>
                                {dateFormat(
                                    createDate,
                                    "dd-mm-yyyy, h:MM TT"
                                )}
                            </Tooltip>
                        </Text>

                    </VStack>
                </HStack>
                <HStack
                    spacing={5}
                    position={"absolute"}
                    top={5}
                    right={5}
                >
                    <IconButton
                        // onClick={handleEdit}
                        size={"sx"}
                        icon={<EditIcon/>}
                    />
                    <Menu>
                        <MenuButton
                            bg={"white"}
                            size={"sm"}
                            as={Button}
                            rightIcon={<ChevronDownIcon/>}
                        >
                            {/*Actions*/}
                        </MenuButton>
                        <MenuList>
                            <MenuItem
                                // onClick={() => {
                                //     setSelectedQuiz(
                                //         item
                                //     );
                                //     setOpen(true);
                                // }}
                            >
                                Assigned users
                            </MenuItem>
                            <MenuItem
                                // onClick={() => {
                                //     setSelectedQuiz(
                                //         item
                                //     );
                                //     setShare(true)
                                // }}
                            >
                                Share
                            </MenuItem>
                            <MenuItem
                                // onClick={handleEdit}
                            >
                                Edit
                            </MenuItem>
                            <MenuItem onClick={() => {
                                // updateQuizActive(0)
                            }}>Remove</MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>
                <IconButton
                    onClick={() => {

                        // recover(id);

                        setIsOpen(true);
                    }}
                    position={"absolute"}
                    bottom={10}
                    right={5}
                    size={"md"}
                    icon={<RiDeviceRecoverLine/>}
                />
            </Box>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Recover quiz : {title}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure to recover quiz : {title}.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={() => {
                                recover(id);
                                onClose();
                            }} ml={3}>
                                Recover
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default QuizEntry;