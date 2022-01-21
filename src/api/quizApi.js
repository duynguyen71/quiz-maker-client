import axiosClient from "./axiosClient";
import axios from "axios";


const quizApi = {

    getNewestQuiz: () => {
        const url = "/public/quizzes/newest-quizzes"
        return axiosClient.get(url);
    },

    getQuizInfo: (code) => {
        const url = `/public/quizzes/info?code=${code}`
        return axiosClient.get(url);
    },

    getQuizContent: (code) => {
        const url = `/member/quizzes/quiz-details?code=${code}`
        return axiosClient.get(url, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
    },

    checkQuizExists: (code) => {
        const url = `/public/quizzes/exists?code=${code}`;
        return axiosClient.get(url);
    },

    //
    getCreatedQuizzesInfo: () => {
        const url = `/admin/quiz-management/managed-quizzes`;
        return axiosClient.get(url, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
    },

    assignQuizToStudent: (assignmentRequest) => {
        const url = `/admin/quiz-assignment/assign-quizzes`;
        return axios.post(url, assignmentRequest,
            {
                headers:
                    {"Authorization": `Bearer ${localStorage.getItem('accessToken')}`}
            })
    },

    getAssignedUserById: (quizId) => {
        const url = `/admin/quiz-assignment/assign-quizzes/${quizId}/users`;
        return axios.get(url, {
            headers:
                {"Authorization": `Bearer ${localStorage.getItem('accessToken')}`}
        });
    },

    getAssignedQuiz: (quizId) => {
        const url = `http://localhost:8080/api/v1/member/quizzes/assigned-quizzes/${quizId}`
        return axios.get(url, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
    }


}

export default quizApi;