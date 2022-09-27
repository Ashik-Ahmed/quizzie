import React from 'react';
import Quizes from '../components/Quizes/Quizes';
import RequireAuth from '../components/RequireAuth/RequireAuth';

const takeExam = () => {
    return (
        <RequireAuth>
            <div className='bg-gray-200'>
                <Quizes />
            </div>
        </RequireAuth>
    );
};

export default takeExam;