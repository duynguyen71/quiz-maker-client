import React, {useContext, useState} from 'react';
import {
    Button,
    HStack,
    Input, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
    ModalOverlay, Select,
    Text,
    Textarea, useToast,
    VStack
} from "@chakra-ui/react";
import {BiFullscreen} from "react-icons/all";
import {QuizEditContext} from "../../../../providers/QuizEditProvider";

const NewQuestionDialog = ({visible, setVisible, size, setSize}) => {

    const {quiz, setQuiz} = useContext(QuizEditContext);
    const toast = useToast();
    const [question, setQuestion] = useState({title: '', options: [{}, {}]});
    const [options, setOptions] = useState([{}, {}]);

    const onTitleChange = (e) => {
        setQuestion((prev) => ({
            ...prev,
            title: e.target.value,
            id: Date.now()
        }))
    }
    const onOptionChange = (e, index) => {
        //push new option if it is the last index option
        if (index === question.options.length - 1 && e.target.value.length > 0) {
            setQuestion((prev) => ({
                ...prev,
                options: [...prev.options, {}]
            }))
        }
        setQuestion((prevState) => ({
            ...prevState,
            options: prevState.options.map((option, i) => {
                if (i === index) {
                    return {
                        ...option,
                        content: e.target.value,
                        id: Date.now()
                    }
                }
                return option;
            })
        }))
    }
    const onSaveOption = async () => {
        //check question have title
        if (!question || !question.title || question.title.length === 0) {
            return toast({
                title: `Your question does not have title!`,
                position: "bottom-left",
                isClosable: true,
                status: "error",
                variant: "solid",
                duration: 1500
            })
        }
        //check question have question
        if (!question.options[0] || !question.options[0].content || !question.options[0].content.length === 0) {
            toast({
                title: `Your question must have at least 1 or 2 options!`,
                position: "bottom-left",
                isClosable: true,
                status: "error",
                variant: "solid",
                duration: 1500
            })
            return;
        }

        let score = 0;
        for (const option of question.options) {
            if (option && option.score) {
                score += option.score;
            }
        }
        if (score === 0) {
            return toast({
                title: `Your question must have at least 1 true option!`,
                position: "bottom-left",
                isClosable: true,
                status: "error",
                variant: "solid",
                duration: 1500
            })
        }

        let modifiedQuestion = {
            ...question,
            options: question.options.filter((option) => option.content && option.content.length > 0)
        };
        // //add question to quiz
        setQuiz((prev) => ({
            ...prev,
            questions: [...prev.questions, modifiedQuestion]
        }))
        setQuestion({
            title: '',
            options: [{}, {}]
        });
        setVisible(false);

    }
    return (
        <>
            <Modal onClose={() => {
                setVisible(false)
                setQuestion({
                    title: '',
                    options: [{}, {}]
                })
            }} size={size} isOpen={visible}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        <HStack>
                            <Text> New Question</Text>
                            <BiFullscreen onClick={() => size === 'full' ? setSize('xl') : setSize('full')}/>
                        </HStack>
                    </ModalHeader>
                    <ModalCloseButton/>
                    <VStack p={5} spacing={5} maxH={'900px'} overflowY={'scroll'}>

                        <VStack w={'100%'}>
                            <Text textAlign={'start'} w={'100%'} fontWeight={'medium'}>Question title</Text>
                            {/*QUESTION TITLE INPUT*/}
                            <Textarea
                                // onChange={(e) => setQuestion((prevState) => ({...prevState, title: e.target.value}))}
                                onChange={onTitleChange}
                                borderColor={'black.800'} placeholder="Type your question title here"/>

                        </VStack>
                        <VStack w={'100%'}>
                            {
                                question.options.map((option, index) => {
                                    let handleScoreChange = (e) => {
                                        setQuestion((prev) => (
                                            {
                                                ...prev,
                                                options: prev.options
                                                    .map((option, i) =>
                                                        i === index ? {
                                                            ...option,
                                                            score: parseFloat(e.target.value)
                                                        } : option)
                                            }
                                        ))
                                    };
                                    return (
                                        <HStack key={index} w={'100%'}>
                                            <Select
                                                onChange={handleScoreChange}
                                                bg={'gray.200'}
                                                // defaultValue={0}
                                                placeholder='score'
                                                maxW={'100px'}>
                                                {
                                                    [0, .25, .5, .75, 1, 1.25, 1.5, 1.75, 2].map((item, i) => (
                                                        <option key={i} value={item}>{item}</option>
                                                    ))
                                                }
                                            </Select>
                                            <Input
                                                borderWidth={(option.score && option.score > 0) ? 1.5 : 1}
                                                borderColor={option.score && option.score > 0 && 'green'}
                                                color={option.score && option.score > 0 && 'green'}
                                                focusBorderColor={option.score && option.score > 0 && 'green'}
                                                colorScheme={'blue'}
                                                onChange={(e) => onOptionChange(e, index)}
                                                key={index}
                                                placeholder={"option"}/>
                                        </HStack>
                                    );
                                })
                            }
                        </VStack>

                    </VStack>

                    <ModalFooter>
                        <Button onClick={() => {
                            setVisible(false)
                            setQuestion({
                                title: '',
                                options: [{}, {}]
                            })
                        }}>Close</Button>
                        <Button ml={4} colorScheme={'blue'} onClick={onSaveOption}>Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default NewQuestionDialog;