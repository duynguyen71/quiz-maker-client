import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import HomePage from "../../pages/public/home/HomePage";
import JoinQuizInfo from "../../pages/public/quiz_info/JoinQuizInfo";
import StartQuiz from "../../pages/public/start_quiz/StartQuiz";
import RegisterPage from "../../pages/public/register/RegisterPage";

class Public extends Component {
    render() {
        return (
            <Switch>
                <Route path={"/"} exact component={HomePage}/>
                <Route path={"/register"} exact component={RegisterPage}/>
                <Route path={"/join/quiz/:code"} exact component={JoinQuizInfo}/>
                <Route path={"/join/quiz/:code/start"}  component={StartQuiz}/>

            </Switch>
        );
    }
}

export default Public;