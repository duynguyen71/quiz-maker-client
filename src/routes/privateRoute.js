import React from "react";
import {useAuth} from "../hooks/useAuth";
import {Route, Redirect} from "react-router-dom";
import {useQuiz} from "../providers/QuizProvider";

export const PrivateRoute = ({children, ...rest}) => {
    const {user} = useAuth();
    const {setDirectUrl} = useQuiz();
    return (
        <Route
            {...rest}
            // render={() => (user ? children : <Redirect to="/login" />)}
            render={() => {
                if (user) {
                    return children;
                } else {
                    setDirectUrl('/admin');
                    return <Redirect to="/login"/>;
                }
            }}
        />
    );
};
