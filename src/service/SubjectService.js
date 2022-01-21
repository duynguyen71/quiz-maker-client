import axiosClient from "../api/axiosClient";

const SubjectService = {

    getSubjects: async () => {
        const url = '/public/subjects';
        return axiosClient.get(url);
    }
}
export default SubjectService;