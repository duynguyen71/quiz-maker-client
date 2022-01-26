import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import HomePage from "./home/HomePage";
import JoinQuizInfo from "./quiz_info/JoinQuizInfo";
import StartQuiz from "./start_quiz/StartQuiz";
import RegisterPage from "./register/RegisterPage";
import StartExamQuiz from "./start_quiz/StartExamQuiz";

class Public extends Component {
    render() {
        return (
            <Switch>
                <Route path={"/"} exact component={HomePage}/>
                <Route path={"/register"} exact component={RegisterPage}/>
                <Route path={"/join/quiz/:code"} exact component={JoinQuizInfo}/>
                <Route path={"/join/quiz/:code/start"} component={StartQuiz}/>
            </Switch>
        );
    }
}

export default Public;