import axios from "axios";

const userApi = {

    login: (email, password) => {
        const url = "/auth/login";
        return axios.post(JSON.stringify(email, password));
    },

    register: (username, email, password) => {
        const url = "/auth/register";
        return axios.post(JSON.stringify(username, email, password));
    }


}

export default userApi;