import React from 'react';
import Quizes from '../components/Quizes/Quizes';
import RequireAuth from '../components/RequireAuth/RequireAuth';

const takeExam = () => {
    return (
        <RequireAuth>
            <div>
                <Quizes />
            </div>
        </RequireAuth>
    );
};

export default takeExam;