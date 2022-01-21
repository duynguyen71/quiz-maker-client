import React, {createContext, useContext, useState} from 'react';
import {Box, CircularProgress, Spinner} from "@chakra-ui/react";

export const AdminContext = createContext();

const AdminSettingProvider = ({children}) => {
    const [fullMode, setFullMode] = useState(false);
    const [isLoading, setLoading] = useState(true);


    const value = {
        fullMode,
        setFullMode,
        setLoading
    }

    return (
        <AdminContext.Provider value={value}>
            <>
                {isLoading &&
                <>
                    <Box bg={'gray.200'} zIndex={'1000000000000'} opacity={.2} position={'fixed'} w={'100vw'}
                         h={'100vh'}/>
                    <Spinner
                        top="50%"
                        right="50%"
                        position="fixed"
                        zIndex="1000000000001"
                        color="green"
                    />
                </>
                }
                {children}
            </>
        </AdminContext.Provider>
    );
};

export default AdminSettingProvider;