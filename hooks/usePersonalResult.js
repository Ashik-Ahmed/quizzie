import React from 'react';
import { useQuery } from 'react-query';

const usePersonalResult = (email) => {

    const { data: result, isLoading, refetch } = useQuery('result', () => fetch(`https://quizzie.onrender.com/result/${email}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    return [result, isLoading, refetch]

};

export default usePersonalResult;