import React, {useState, useContext, createContext, useEffect} from "react";
import {AuthContext} from "../providers/AuthProvider";
import {AdminContext} from "../providers/AdminSettingProvider";


export const useAuth = () => {
    return useContext(AuthContext);
};

export const useAdmin = () => {
    return useContext(AdminContext);
}