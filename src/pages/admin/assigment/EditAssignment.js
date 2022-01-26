import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {QuizEditContext} from "../../../providers/QuizEditProvider";
import {AdminContext} from "../../../providers/AdminSettingProvider";
import UserService from "../../../service/UserService";

const EditAssignment = () => {
    const {getQuizDetail, quiz} = useContext(QuizEditContext);
    const {isLoading, setLoading} = useContext(AdminContext);
    const {id} = useParams();
    const [email, setEmail] = useState("");
    const [err, setErr] = useState('');
    const [assignment, setAssignment] = useState({
        quizId: id,
        emails: [],
        startDate: new Date(),

    })
    const history = useHistory();
    useEffect(() => {
        const data = history.location.state?.data
        getQuizDetail(data.id);
        // const resp = await UserService.getAssignmentReport(id);
    }, []);
    return (
        <div>

        </div>
    );
};

export default EditAssignment;