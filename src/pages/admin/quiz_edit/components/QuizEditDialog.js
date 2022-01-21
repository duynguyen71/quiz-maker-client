import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    Button,
    FormControl, FormLabel, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Select
} from "@chakra-ui/react";
import {QuizEditContext} from "../../../../providers/QuizEditProvider";
import SubjectService from "../../../../service/SubjectService";

const QuizEditDialog = ({isOpen, setOpen}) => {

    const {quiz, setQuiz, isLoading, setLoading, handleSaveQuiz} = useContext(QuizEditContext);
    const [subjects, setSubjects] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const initialRef = useRef();
    const finalRef = useRef();
    useEffect(() => {
        getSubject();
    }, [])

    const getSubject = async () => {
        setLoading(true);
        try {
            const resp = await SubjectService.getSubjects();
            setSubjects(resp.data);
        } catch (e) {

        } finally {
            setLoading(false);
        }
    }
    const changeSubject = (e) => {
        setQuiz((prev) => ({
            ...prev,
            subject: {
                title: (e.target.value)
            }
        }))
    }
    const onSaveChange = async (e) => {
        e.preventDefault();
        console.log(quiz.subject.id)
        await handleSaveQuiz();
        setOpen(false);
    }
    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={() => setOpen(false)}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Edit Quiz</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Quiz title</FormLabel>
                            <Input
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setQuiz((prev) => ({
                                            ...prev, title: value
                                        }
                                    ))
                                }}
                                value={quiz.title}
                                ref={initialRef} placeholder="Quiz title"/>
                        </FormControl>


                        <FormControl mt={4}>
                            <FormLabel>Subject</FormLabel>
                            <Select
                                onChange={(e) => {
                                    changeSubject(e);
                                }}
                                value={quiz.subject.title}
                                defaultValue={quiz.subject.title}
                                size={'sm'}>
                                {!isLoading && subjects && subjects.map(item => (
                                    <option key={item.id} value={item.title}>{item.title}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            onClick={(e) => onSaveChange(e)}
                            colorScheme="blue" mr={3}>
                            Save
                        </Button>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    );
};

export default QuizEditDialog;