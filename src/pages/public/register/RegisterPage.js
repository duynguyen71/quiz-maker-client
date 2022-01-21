import React, {useState} from 'react';
import {useAuth} from "../../../hooks/useAuth";
import {useHistory} from "react-router-dom";
import {
    Box, Button, Checkbox,
    Flex,
    FormControl, FormHelperText,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import axios from "axios";

const RegisterPage = () => {
    const {login, getUserDetails, setUser} = useAuth();
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSignup = async (e) => {
        e.preventDefault();
        const url = `${process.env.REACT_APP_BASE_URL}/auth/registration`;
        let data = {
            "username": username,
            "email": email,
            "password": password,
            "fullName":fullName
        };
        try {
            const resp = await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log("Registration success!");
            history.replace('/verification');
        } catch (e) {
            console.log(e.response.data.message);

            setError(e.response.data.message);
            return;
        }


    }
    const validation = async (input, value) => {
        const url = process.env.REACT_APP_BASE_URL + `/public/validation-input?input=${input}&value=${value}`;
        try {
            await axios.get(url);
        } catch (e) {
            const data = e.response.data;
            setError(data.message);
        }
    }
    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} minW={'lg'} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Register Account</Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        to enjoy all of our cool{" "}
                        <Link color={"blue.400"}>features</Link> ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    {/*Form*/}
                    <Stack spacing={4}>
                        {/*Username*/}
                        <FormControl id="username">
                            <FormLabel>Username</FormLabel>
                            <Input
                                onBlur={() => {
                                    validation("username", username);
                                }}
                                value={username}
                                onChange={(e) => {
                                    setError('');
                                    setUsername(e.target.value);
                                }}
                                type='email|text'/>
                            {
                                error.length > 0 &&
                                <FormHelperText color={'crimson'}>
                                    {error}</FormHelperText>
                            }
                        </FormControl>
                        {/*FullName*/}
                        <FormControl id="fullName">
                            <FormLabel>FullName</FormLabel>
                            <Input

                                value={fullName}
                                onChange={(e) => {
                                    setError('');
                                    setFullName(e.target.value);
                                }}
                                type='text'/>
                        </FormControl>
                        {/*Email*/}
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                onBlur={() => {
                                    validation("email", email);
                                }}
                                value={email}
                                onChange={(e) => {
                                    setError('');
                                    setEmail(e.target.value);
                                }}
                                type='email|text'/>

                        </FormControl>
                        {/*Password*/}
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"/>
                        </FormControl>
                        <Stack>
                            <Box minH={5}/>
                            <Button
                                disabled={
                                    (username.length === 0 || password.length === 0 || email.length === 0)
                                }
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{
                                    bg: "blue.500",
                                }}
                                onClick={handleSignup}
                            >
                                Sign up
                            </Button>

                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default RegisterPage;