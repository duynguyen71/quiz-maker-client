import React, {createContext, useEffect, useState} from "react";
import Axios from "axios";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    const [isLoading, setLoading] = useState(true);
    //login
    const login = async (email, password, remember) => {
        const url = "http://localhost:8080/api/v1/auth/login";
        const data = {
            "email": email,
            "password": password
        };
        try {
            const resp = await axios.post(url, data, {
                headers: {"Content-Type": "application/json"}
            })
            if (resp.status === 200) {
                if (remember) {
                    localStorage.setItem("accessToken", resp.data.accessToken);
                    localStorage.setItem("refreshToken", resp.data.refreshToken);
                }
                return true;
            }
        } catch (e) {
            return false;
        }

    };
    //logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }
    const getUserDetails = async () => {
        let accessToken = localStorage.getItem('accessToken');
        if (accessToken != null) {
            setLoading(true);
            const url = process.env.REACT_APP_BASE_URL + "/member/users/me";
            try {
                const resp = await axios.get(url, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    }
                })
                const data = await resp.data.data;
                localStorage.setItem('user', JSON.stringify(data));
                console.log("get user detail success",data);
                setUser(data);
            } catch (e) {
            } finally {
                setLoading(false);
            }
        }
        return null;
    }

    //create value
    const value = {
        user,
        setUser,
        login,
        logout,
        getUserDetails,
    };

    useEffect(async () => {
        setLoading(true);
        await getUserDetails();
        setLoading(false);
    }, []);

    return (
        <>
            {
                !isLoading && <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
            }
        </>
    )
        ;
};