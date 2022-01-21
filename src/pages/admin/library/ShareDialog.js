import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    CloseButton,
    Divider,
    HStack,
    IconButton,
    Input,
    Spacer,
    Tag,
    TagCloseButton,
    TagLabel,
    Text,
    useToast,
    VStack,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import { AiOutlineUsergroupAdd, MdPublic } from "react-icons/all";
import { CopyIcon } from "@chakra-ui/icons";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ShareDialog = ({ setVisible, quizId }) => {
    const [emails, setEmails] = useState([]);
    const [email, setEmail] = useState("");
    const toast = useToast();
    useEffect(() => {
        console.log(quizId);
    }, []);
    const onSubmit = async () => {
        console.log(startDate);
        console.log(finishDate);
        try {
            const data = {
                quizId: quizId,
                emails: emails,
                startDate: startDate,
                finishDate: finishDate,
            };
            let url =
                "http://localhost:8080/api/v1/admin/quiz-assignment/assign-quizzes";
            const resp = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            });
            if (resp.status === 200) {
                toast({
                    position: "bottom-left",
                    duration: 2000,
                    status: "success",
                    render: () => (
                        <Box color="white" p={3} bg="blue.500">
                            Share via emails success!
                        </Box>
                    ),
                });
            }
        } catch (e) {
            console.log("Failed to assign quiz to student ", e);
        } finally {
            setVisible(false);
        }
    };

    const [startDate, setStartDate] = useState(new Date());
    const [finishDate, setFinishDate] = useState(new Date());

    return (
        <>
            <Box
                bg={"gray.400"}
                opacity={0.8}
                position={"fixed"}
                top={0}
                minH={"100vh"}
                right={0}
                onClick={() => setVisible(false)}
                minW={"100vw"}
                zIndex={900}
            />
            <Box
                p={5}
                w={500}
                bg={"white"}
                borderRadius={"md"}
                boxShadow={"md"}
                transform={"translate(50%,-50%)"}
                position={"fixed"}
                top={"40%"}
                right={"50%"}
                height={"auto"}
                zIndex={901}
            >
                <VStack spacing={5} w={"100%"}>
                    {/*TITLE*/}
                    <HStack w={"100%"}>
                        <AiOutlineUsergroupAdd size={"20"} />
                        <Text fontSize={"xl"} fontWeight={"medium"}>
                            Invite
                        </Text>
                        <Spacer />
                        <CloseButton
                            borderRadius={"100px"}
                            bg={"teal"}
                            color={"white"}
                            onClick={() => setVisible(false)}
                            size={"md"}
                        />
                    </HStack>
                    {/*DATE*/}
                    <HStack w={"100%"} spacing={2}>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy h:mm aa"
                            showTimeInput
                        />
                        <DatePicker
                            selected={finishDate}
                            onChange={(date) => setFinishDate(date)}
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy h:mm aa"
                            showTimeInput
                        />
                    </HStack>
                    <VStack w={"100%"} align={"start"}>
                        <Text fontWeight={"medium"} color={"gray.600"}>
                            Share public link
                        </Text>
                        <HStack w={"100%"}>
                            <Input size={"sm"} />
                            <IconButton icon={<CopyIcon size={30} />} />
                        </HStack>
                    </VStack>
                    <Divider />
                    {/*SHARE WITH EMAILS*/}
                    <VStack w={"100%"} align={"start"}>
                        <Text fontWeight={"medium"} color={"gray.600"}>
                            Share using emails
                        </Text>
                        {/*EMAIL*/}
                        <Wrap w={"100%"}>
                            {emails.map((email) => (
                                <WrapItem key={email}>
                                    <Tag
                                        size={"sm"}
                                        borderRadius="full"
                                        variant="solid"
                                        colorScheme="green"
                                    >
                                        <TagLabel>{email}</TagLabel>
                                        <TagCloseButton
                                            onClick={() => {
                                                let filteredEmail =
                                                    emails.filter(
                                                        (e) => e != email
                                                    );
                                                setEmails(filteredEmail);
                                            }}
                                        />
                                    </Tag>
                                </WrapItem>
                            ))}
                        </Wrap>
                        {/*INPUT & ADD BUTTOn*/}
                        <HStack w={"100%"}>
                            <Input
                                size={"sm"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={
                                    "Email to share. Ex: test@gmail.com"
                                }
                            />
                            <Button
                                onClick={() => {
                                    setEmail("");
                                    if (!emails.includes(email)) {
                                        setEmails((prevState) => [
                                            ...prevState,
                                            email,
                                        ]);
                                    }
                                }}
                                isDisabled={email.length === 0}
                                size={"sm"}
                                colorScheme={"purple"}
                            >
                                Add
                            </Button>
                        </HStack>

                        <HStack w={"100%"} py={5} justifyContent={"end"}>
                            <Button onClick={onSubmit} colorScheme={"teal"}>
                                Share invite
                            </Button>
                        </HStack>
                    </VStack>
                </VStack>
            </Box>
        </>
    );
};

export default ShareDialog;
