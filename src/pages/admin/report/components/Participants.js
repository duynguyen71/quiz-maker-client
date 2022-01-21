import React, {useEffect, useState} from 'react';
import axios from "axios";

const Participants = () => {

    const [participants, setParticipants] = useState([])

    useEffect(async () => {
        //get submit reports for user's quizzes
        const url = `http://localhost:8080/api/v1/admin/quiz-assignment/assign-quizzes/report`
        try {
            const resp = await axios.get(url, {headers: {"Authorization": `Bearer ${localStorage.getItem('accessToken')}`}})
            if (resp.status === 200) {
                console.log(resp.data);
            }
        } catch (e) {
            console.log('Failed to fetch quiz reports')
        }
    }, [])
    return (
        <div>


        </div>
    );
};

export default Participants;