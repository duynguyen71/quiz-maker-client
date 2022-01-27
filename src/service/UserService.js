import axiosClient from "../api/axiosClient";

const UserService = {

    updateAvt: async (file) => {
        const url = `/member/users/me/avt`;
        let formData = new FormData();
        formData.append("file", file);
        return axiosClient.post(url, formData, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                'Content-Type': 'multipart/form-data'
            }
        })
    }
    ,
    validateInput: async (input, value) => {
        const url = process.env.REACT_APP_BASE_URL + `/public/validation-input?input=${input}&value=${value}`;
        return axiosClient.get(url);
    },
    updateUser: async (data) => {
        const url = process.env.REACT_APP_BASE_URL + `/member/users/me`
        return axiosClient.post(url, JSON.stringify(data), {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
    },
    getUserQuizzes: async (params) => {
        const url = process.env.REACT_APP_BASE_URL + `/member/users/me/quizzes`;
        return axiosClient.get(url, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            },
            params: params
        })
    },
    getUserQuiz: async (id) => {
        const url = `/member/users/me/quizzes/${id}`;
        const data = axiosClient.get(url, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        return data;
    },
    updateQuizActive: async (quizId, active) => {
        const url = `/member/users/me/quizzes/${quizId}?active=${active}`;
        return axiosClient.post(url, {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })

    },
    assignToUsers: async (assignment) => {
        const url = `/member/users/me/assigment/assign-users`;
        return axiosClient.post(url, JSON.stringify(assignment), {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
    },
    getAssignmentsInfo: async () => {
        const url = `/member/users/me/assignments/info`;
        return axiosClient.get(url, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
    },
    getAssignmentReport: async (assignId) => {
        const url = `/member/assigment/quizzes/${assignId}/users`;
        return axiosClient.get(url, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
    },
    getAssignedQuizzes: async () => {
        const url = `/member/users/me/assigned-quizzes`;
        return axiosClient.get(url, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
    },
    getAssignedQuizInfo: async (quizId) => {
        const url = `/member/users/me/assigned-quizzes/${quizId}`;
        return axiosClient.get(url, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })

    },
    getAssignedQuizDetail: async (code) => {
        const url = `/member/users/me/assigned-quizzes/${code}/detail`;
        return axiosClient.get(url, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
    }
    ,
    getSubmissionAnswers: async (code) => {
        const url = `/member/users/me/submission/quizzes/${code}`;
        return axiosClient.get(url, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
    },
    submitExamQuiz: async (data) => {
        const url = `/member/users/me/exam/submission-answers`;
        return axiosClient.post(url, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
    },
    getAssignedUsers: async (assignedInfoId) => {
        const url = `/member/users/me/assignment/quizzes/${assignedInfoId}/users`;
        return axiosClient.get(url, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
    },
    getExamSubmittedAnswers: async (quizId,userId) => {
        const url = `/member/users/${userId}/exam/submission-answers/${quizId}`;
        return axiosClient.get(url, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
    }
}
export default UserService;