import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
import {useAuth} from "./hooks/useAuth";
import {useEffect, useState} from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import LoginPage from "./pages/public/login/LoginPage";
import Axios from "axios";
import {PrivateRoute} from "./routes/privateRoute";
import Public from "./pages/public/Public";
import Admin from "./pages/admin/Admin";
import AdminSettingProvider from "./providers/AdminSettingProvider";
import VerificationPage from "./pages/public/register/VerificationPage";

function App() {
    const {user} = useAuth();
    const [inputValue, setinputValue] = useState("");
    const [quiz, setQuiz] = useState(null);


    return (
        <Switch>
            <PrivateRoute path={'/admin'}>
                {/*<AdminSettingProvider>*/}
                    <Admin/>
                {/*</AdminSettingProvider>*/}
            </PrivateRoute>
            {/*<Route  path='/admin' component={Admin}/>*/}
            <Route path='/login' component={LoginPage}/>
            <Route path='/verification' component={VerificationPage}/>
            <Route path='/' component={Public}/>
        </Switch>
    );
}

export default App;
