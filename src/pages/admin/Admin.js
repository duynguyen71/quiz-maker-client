import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Dashboard from "../../components/admin/dashboard/Dashboard";
import {Heading} from "@chakra-ui/react";
import SettingPage from "../../components/admin/setting/SettingPage";
import CreateNewQuizPage from "./create_quiz/CreateNewQuizPage";
import QuizEditor from "./quiz_edit/QuizEditor";
import SidebarWithHeader from "./SidebarWithHeader";
import AssignedQuizPage from "./assigned/AssignedQuizPage";
import LibraryPage from "./library/LibraryPage";
import AdminSettingProvider from "../../providers/AdminSettingProvider";
import QuizEditProvider from "../../providers/QuizEditProvider";
import ReportPage from "./report/ReportPage";
import ReportDetailPage from "./report/ReportDetailPage";
import {DragDropContext} from "react-beautiful-dnd";
import Assignment from "./assign/Assignment";
import RemovedQuizzes from "./library/RemovedQuizzes";

class Admin extends Component {
    render() {
        return (
            <>
                <AdminSettingProvider>
                    <QuizEditProvider>
                        <SidebarWithHeader>
                            <Switch>
                                <Route exact path={"/admin"} component={props => <Dashboard {...props}/>}/>
                                <Route exact path={"/admin/assigned"}
                                       component={props => <AssignedQuizPage {...props}/>}/>
                                <Route exact path={"/admin/library"} component={props => <LibraryPage {...props}/>}/>
                                <Route path={"/admin/setting"} component={props => <SettingPage {...props}/>}/>
                                <Route path={"/admin/quiz/:id/assignment"} component={props => <Assignment {...props}/>}/>
                                <Route path={"/admin/report"} exact component={props => <ReportPage {...props}/>}/>
                                <Route path={"/admin/report/:id/details"}
                                       component={props => <ReportDetailPage {...props}/>}/>
                                <Route path={"/admin/quiz/new"} component={props => <CreateNewQuizPage {...props}/>}/>
                                <Route path={"/admin/quiz/removed"} component={props => <RemovedQuizzes {...props}/>}/>
                                <Route path={"/admin/quiz/:id/edit"} component={props => <QuizEditor {...props}/>}/>
                            </Switch>
                        </SidebarWithHeader>
                    </QuizEditProvider>
                </AdminSettingProvider>
            </>
        );
    }
}

export default Admin;