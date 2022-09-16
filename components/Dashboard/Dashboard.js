import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Loading/Loading';
import RequireAuth from '../RequireAuth/RequireAuth';
import usePersonalResult from '../../hooks/usePersonalResult'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        // title: {
        //     display: true,
        //     text: 'Chart.js Line Chart',
        // },
    },
    scales: {
        y: {
            beginAtZero: true,
        }
    }
};

const Dashboard = () => {

    const [authUser, loading] = useAuthState(auth);
    const [gkResult, setGkResult] = useState([]);
    const [engResult, setEngResult] = useState([]);

    const [result, isLoading] = usePersonalResult(authUser?.email)

    // console.log([...gkResult]);
    // if (date == result.date) {
    //     console.log('Date matched');
    // }

    useEffect(() => {
        result?.map(res => {
            if (res.subject == 'general-knowledge') {
                gkResult.push(res);
            }

            if (res.subject == 'english') {
                engResult.push(res);
            }
        })
    }, [result])

    // arr.reduce((a, v) => a + v, 0)


    const generalKnowledge = {
        labels: gkResult?.map(gk => gk.date),
        datasets: [
            {
                label: `General Knowledge`,
                data: gkResult?.map(gk => gk.marks),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };


    const english = {
        labels: engResult?.map(eng => eng.date),
        datasets: [
            {
                label: 'English',
                data: engResult?.map(eng => eng.marks),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    if (loading || isLoading) {
        return <Loading />
    }

    return (
        <RequireAuth>
            <div className=' mt-6 mb-16 container mx-auto'>
                <h3 className='text-2xl font-bold text-center mb-6'>Result Dashboard</h3>
                <div className='flex gap-16'>
                    <div className='card shadow-xl w-1/2 px-8'>
                        <Line options={options} data={generalKnowledge} />
                    </div>
                    <div className='card shadow-xl w-1/2 px-8'>
                        <Line options={options} data={english} />
                    </div>
                </div>
            </div>
        </RequireAuth>
    );
};

export default Dashboard;