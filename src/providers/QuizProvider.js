import React, {createContext, useContext, useState} from "react";

const QuizProvider = ({children}) => {
    const [createdQuiz, setCreatedQuiz] = useState(null);

    const [foundedQuiz, setFoundedQuiz] = useState(null);

    const [questions, setQuestions] = useState(null);

    const [directUrl, setDirectUrl] = useState(null);

    const value = {
        createdQuiz,
        setCreatedQuiz,
        foundedQuiz,
        setFoundedQuiz,
        questions, setQuestions, directUrl, setDirectUrl
    };
    return (
        <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
    );
};

const QuizContext = createContext();

export const useQuiz = () => {
    return useContext(QuizContext);
};
export default QuizProvider;
