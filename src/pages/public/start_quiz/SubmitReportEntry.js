import React from 'react';
import {HStack, Text} from "@chakra-ui/react";

const SubmitReportEntry = ({title,content}) => {
    return (
        <>
         <HStack>
             <Text textTransform={'capitalize'}>{title}</Text>
             <Text fontWeight={'medium'} fontSize={'18px'}>{content}</Text>
         </HStack>
        </>
    );
};

export default SubmitReportEntry;