import React, { createContext, useContext, useState } from "react";

const CreateQuizProvider = ({ children }) => {
    const [createdQuiz, setCreatedQuiz] = useState({
        questions: [],
    });
    const defaultQuestionState = {
        title: "this is question title",
        options: [
            {
                content: "this is option 1",
            },
            {
                content: "this is option 2",
            },
            {
                content: "this is option 3",
            },
            {
                content: "",
            },
        ],
    };
    const [question, setQuestion] = useState({
        title: "this is question title",
        options: [
            {
                content: "this is option 1",
            },
            {
                content: "this is option 2",
            },
            {
                content: "this is option 3",
            },
            {
                content: "",
            },
        ],
    });
    const value = {
        createdQuiz,
        setCreatedQuiz,
        question,
        defaultQuestionState,
        setQuestion,
    };
    return (
        <CreateQuizContext.Provider value={value}>
            {children}
        </CreateQuizContext.Provider>
    );
};

const CreateQuizContext = createContext();

export const useCreateQuiz = () => {
    return useContext(CreateQuizContext);
};
export default CreateQuizProvider;
