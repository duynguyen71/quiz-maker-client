import axiosClient from "../api/axiosClient";

const QuizService = {
    getQuizzes: async (params) => {
        const url = "/public/quizzes";
        return await axiosClient.get(url);
    },

    getQuizByCode: async (code) => {
        const url = `/public/quizzes/${code}`;
        return await axiosClient.get(url);
    },
    getQuizQuestions: async (code) => {
        const url = `/public/quizzes/${code}/questions`
        return await axiosClient.get(url);
    },
    submissionAnswers: async (data) => {
        const url = `/member/users/me/submission-answers`
        const resp = axiosClient.post(url, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        return resp;
    },
    saveQuiz: async (quiz) => {
        const url = `/member/users/me/quizzes`;
        console.log(quiz)
        const resp = axiosClient.post(url, JSON.stringify(quiz), {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        return resp;
    },
    removeQuestion: async (questionId) => {
        const url = `/member/user/me/questions/${questionId}`;
        const resp = axiosClient.delete(url, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        return resp;
    }
}
export default QuizService;