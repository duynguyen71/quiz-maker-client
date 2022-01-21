import React from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay, Button
} from "@chakra-ui/react";

const CustomAlertDialog = ({isOpen, setOpen, cancelRef, onSubmit, title, description}) => {
    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => setOpen(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            {/*Submit answers*/}
                            {title}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {description}
                            {/*Are you sure? You can't undo this action afterwards.*/}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="teal"
                                onClick={() => {
                                    setOpen(false);
                                    onSubmit();
                                }} ml={3}>
                                Submit
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default CustomAlertDialog;