import React from 'react';
import {Avatar} from "@chakra-ui/react";
import AppService from "../../../service/AppService";

const MyAvatar = React.memo(({file, imageName, name}) => {
    return (
        <>
            <Avatar
                src={file ? URL.createObjectURL(file) : AppService.getImage(imageName)}
                size={'xl'}
                name={name}
            />
        </>
    );
});

export default MyAvatar;