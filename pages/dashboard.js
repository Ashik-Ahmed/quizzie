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
import DefaultLayout from '../DefaultLayout/DefaultLayout';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import Loading from '../components/Loading/Loading';

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
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
        height: '400px',
        width: '40vw'
    },
};


// export const data = {
//     labels,
//     datasets: [
//         {
//             label: 'Dataset 1',
//             // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//             data: [3, 5, 7, 4, 4, 9, 7, 5, 6, 8],
//             borderColor: 'rgb(255, 99, 132)',
//             backgroundColor: 'rgba(255, 99, 132, 0.5)',
//         },
//         {
//             label: 'Dataset 2',
//             data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
//             borderColor: 'rgb(53, 162, 235)',
//             backgroundColor: 'rgba(53, 162, 235, 0.5)',
//         },
//     ],
// };

const dashboard = () => {

    const [authUser, loading] = useAuthState(auth);
    const [result, setResult] = useState([]);

    let gkMarks = [];
    let engMarks = [];
    result?.map(res => {
        if (res.subject == 'general-knowledge') {
            gkMarks.push(res.marks);
        }

        if (res.subject == 'english') {
            engMarks.push(res.marks);
        }
    })

    const labels = result.map(res => res.date);

    const data = {
        labels,
        datasets: [
            {
                label: 'General Knowledge',
                // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                data: gkMarks,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'English',
                data: engMarks,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    useEffect(() => {
        fetch(`http://localhost:5000/result/${authUser?.email}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
            setResult(data);
        })
    }, [authUser])

    if (loading) {
        return <Loading />
    }

    return (
        <DefaultLayout>
            <div>
                <div className='w-1/2'>
                    <Line options={options} data={data} />
                </div>
            </div>
        </DefaultLayout>
    );
};

export default dashboard;