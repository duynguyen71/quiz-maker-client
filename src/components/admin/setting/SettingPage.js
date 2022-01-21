import React, {Component, useState} from 'react';
import {
    Avatar,
    Box, Button,
    Divider,
    Flex,
    FormControl, FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    HStack, Icon,
    Input, Select,
    Text,
    VStack
} from "@chakra-ui/react";
import {MdAccountCircle} from "react-icons/all";
import {useAuth} from "../../../hooks/useAuth";
import {EditIcon} from "@chakra-ui/icons";
import UserService from "../../../service/UserService";
import AppService from "../../../service/AppService";
import QuizService from "../../../service/QuizService";
import MyAvatar from "./MyAvatar";
import axios from "axios";

const SettingPage = () => {

    const {user, setUser, getUserDetails} = useAuth();
    const [image, setImage] = useState(null);
    const [err, setErr] = useState('');
    const [userTemp, setUserTemp] = useState({});
    const handleEditAvt = async (e) => {
        const file = e.target.files[0];
        const fileType = file['type'];
        console.log(fileType)
        if (fileType === "image/jpeg" || fileType === "image/png") {
            setImage(file);
            console.log("Updating avt...")
            try {
                const resp = await UserService.updateAvt(file);
                console.log(resp.data.avt);
                setUser((prev) => ({
                    ...prev,
                    avt: resp.data.avt
                }))
            } catch (e) {
                console.log("Update avt failed: ", e.response.data.message);
            }
        } else {
            alert("Please select image file types: jpeg or png")
        }
    }
    const validationInput = async (input, value) => {
        if (user.username !== value) {
            console.log('validation input')
            try {
                const url = process.env.REACT_APP_BASE_URL + `/public/validation-input?input=${input}&value=${value}`;
                await axios.get(url);
            } catch (e) {
                console.log(e.response.data)
                setErr(e.response.data.message);
            }
        }
    }
    const handleUpdate = async () => {
        try {
            const data = await UserService.updateUser(userTemp);
            getUserDetails();
        } catch (e) {
            console.log(e.response.data.message);
        }

    }
    return (

        <Flex w={'100%'} bg={'gray.100'} justifyContent={'center'} direction={'column'}>
            <Box mb={5} bg={'white'} p={8} align={'start'} w={'630px'}>
                <HStack>
                    <Box position={'relative'}>
                        {/*<Avatar*/}
                        {/*    src={image ? URL.createObjectURL(image) : AppService.getImage(user.avt)}*/}
                        {/*    size={'xl'}*/}
                        {/*    name={user.username}*/}
                        {/*/>*/}

                        <MyAvatar
                            key={user.avt}
                            file={image}
                            imageName={user.avt}
                            name={user.username}
                        />
                        <FormLabel htmlFor={'avtPicker'}>
                            <Icon
                                position={'absolute'}
                                bottom={0}
                                right={0}
                                as={EditIcon}/>
                            <Input onChange={(e) => handleEditAvt(e)}
                                   id={'avtPicker'} display={'none'} type={'file'}/>
                        </FormLabel>

                    </Box>
                    <VStack align={'start'} px={'5'}>
                        <Text fontSize={'22px'} fontWeight={'medium'}>{user.username || ''}</Text>
                        <Text fontSize='15px'> {user.fullName || ''}</Text>
                    </VStack>
                </HStack>
            </Box>
            <Box p={8} bg={'white'} align={'start'} minH={'1000px'} w={'630px'}>

                <VStack align={'start'} spacing={10} align={'start'} w={'100%'}>
                    <Heading fontSize={25}>Setting</Heading>

                    <VStack align={'start'} w={'100%'}>
                        <HStack>
                            <MdAccountCircle size={20}/>
                            <Text fontWeight={'medium'} fontSize={18}>Account</Text>
                        </HStack>
                        <Divider w={'100%'} colorScheme={'teal'}/>
                    </VStack>
                    <VStack w={'100%'} spacing={5}>

                        <FormControl id="email">
                            <FormLabel color={'gray.700'}>Email address</FormLabel>
                            <Input
                                isDisabled
                                value={user.email}
                                focusBorderColor={'teal'} colorScheme={'teal'} borderColor={'teal'} type="email"/>
                            {/*<FormHelperText>We'll never share your email.</FormHelperText>*/}
                        </FormControl>

                        <FormControl id="username" isInvalid={err}>
                            <FormLabel color={'gray.700'}>Username</FormLabel>
                            <Input
                                isInvalid={err}
                                onBlur={() => {
                                    validationInput("username", userTemp.username)
                                }}
                                onChange={(e) => {
                                    setUserTemp((prev) => ({
                                        ...prev,
                                        username: e.target.value
                                    }));
                                    setErr('');
                                }}
                                defaultValue={user.username}
                                focusBorderColor={'teal'} type="username"/>
                            {/*<FormHelperText>We'll never share your email.</FormHelperText>*/}
                            {
                                err && <FormErrorMessage color={'red'}>{err}</FormErrorMessage>
                            }
                        </FormControl>

                        <FormControl id="fullName">
                            <FormLabel color={'gray.700'}>Full Name</FormLabel>
                            <Input
                                onChange={(e) => {
                                    setUserTemp((prev) => ({
                                        ...prev,
                                        fullName: e.target.value
                                    }))
                                }}
                                defaultValue={user.fullName || ''}
                                focusBorderColor={'teal'}/>
                            {/*<FormHelperText>We'll never share your email.</FormHelperText>*/}
                        </FormControl>

                        <FormControl id="phone">
                            <FormLabel color={'gray.700'}>Phone Number</FormLabel>
                            <Input
                                onChange={(e) => {
                                    setUserTemp((prev) => ({
                                        ...prev,
                                        phone: e.target.value
                                    }))
                                }}
                                defaultValue={user.phone}
                                focusBorderColor={'teal'}/>
                            {/*<FormHelperText>We'll never share your email.</FormHelperText>*/}
                        </FormControl>


                        <FormControl id="school">
                            <FormLabel>School</FormLabel>
                            <Select placeholder="Select school">
                                <option>Nong Lam University</option>
                                <option>UTE</option>
                                <option>UTH</option>
                            </Select>
                        </FormControl>
                        <Button
                            onClick={() => {
                                handleUpdate();
                            }}
                            w={'100%'} colorScheme={'teal'}>
                            Save Change
                        </Button>
                    </VStack>
                </VStack>
            </Box>

        </Flex>
    );
};

export default SettingPage;