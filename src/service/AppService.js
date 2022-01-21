import axiosClient from "../api/axiosClient";

const AppService = {
    getImage: (imgName) => {
        console.log('get imaeg');
        return `${process.env.REACT_APP_BASE_URL}/public/files/${imgName}`;
    }
}
export default AppService;