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

    }
}
export default UserService;