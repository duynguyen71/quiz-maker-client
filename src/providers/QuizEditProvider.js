import {createContext, useContext, useState} from "react";

import React from 'react';
import QuizService from "../service/QuizService";
import UserService from "../service/UserService";
import {AdminContext} from "./AdminSettingProvider";

export const QuizEditContext = createContext();

const QuizEditProvider = ({children}) => {

    const [quiz, setQuiz] = useState(null);
    const {isLoading, setLoading} = useContext(AdminContext);

    const getQuizDetail = async (id) => {
        try {
            setLoading(true);
            const resp = await UserService.getUserQuiz(id);
            setQuiz(resp.data);
            return resp.data;
        } catch (e) {

        } finally {
            setLoading(false);
        }
    }
    const handleSaveQuiz = async () => {
        try {
            setLoading(true);
            const resp = await QuizService.saveQuiz(quiz);
            await getQuizDetail(quiz.id);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        } finally {
            setLoading(false);
        }
    }
    const value = {
        quiz, setQuiz, isLoading, setLoading, getQuizDetail, handleSaveQuiz
    }

    return (

        <QuizEditContext.Provider value={value}>
            {children}
        </QuizEditContext.Provider>
    );
};

export default QuizEditProvider;