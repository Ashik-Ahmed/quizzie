import { async } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import DefaultLayout from '../../DefaultLayout/DefaultLayout';
import auth from '../../firebase.init';
import useDBUser from '../../hooks/useDBUser';
import Loading from '../Loading/Loading';
import Question from '../Question';

const Quizes = () => {

    const [authUser] = useAuthState(auth);
    const [dbUser, isLoading, refetch] = useDBUser(authUser?.email);

    const [questions, setQuestions] = useState(null);
    const [examStart, setExamStart] = useState(false);
    const [subject, setSubject] = useState(null);
    const [error, setError] = useState('')
    const [marks, setMarks] = useState(0);
    const [points, setPoints] = useState(false);

    const handleStart = (e) => {
        e.preventDefault();
        // console.log(e.target.subject.value);
        if (e.target.subject.value !== 'Select Subject') {
            setSubject(e.target.subject.value);

            //API call to set the question paper loading from DB 
            fetch(`http://localhost:5000/quiz/${e.target.subject.value}`, {
                method: 'GET',
            }).then(res => res.json()).then(data => {
                setQuestions(data);
                setExamStart(true);
                setTimeout(() => {
                    setExamStart(false);
                }, 20000);

                toast.info('Time Left!',
                    // (function () {
                    //     let sec = 10;
                    //     let timer = setInterval(() => {
                    //         console.log(sec);
                    //         sec--;
                    //         if (sec == 1) {
                    //             clearInterval(timer);
                    //         }
                    //     }, 1000)
                    // })(),
                    {
                        position: "top-right",
                        autoClose: examStart || 20000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
            })
        }
        else {
            setError('Choose a Subject First')
        }
    }

    // update marks after every selection 
    const handleSelect = (id, opt, answer) => {
        // console.log(id, opt);
        // answerSheet[id] = (opt);
        // console.log(answerSheet);

        if (opt == answer) {
            setMarks(marks + 1);
        }
    }

    //set the point when marks is 80%
    useEffect(() => {
        if ((marks / (questions?.length) * 100) >= 80) {
            setPoints(true);
        }
    }, [marks])


    //update user profile with bonus points   
    const updateProfileWithPoints = () => {
        const userPoints = dbUser.points || 0;
        const points = { points: userPoints + 5 };

        fetch(`http://localhost:5000/create-user/${authUser.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(points)
        }).then(res => res.json()).then(data => {
            refetch();
        })
    }

    //handle submit answer
    const handlePaperSubmit = (e) => {
        e.preventDefault();
        // console.log(e.target.ansr.value);
        const date = new Date().toLocaleDateString();

        //make the result object to insert into DB
        const result = {
            date,
            email: dbUser.email,
            subject,
            marks
        }

        // console.log(points);
        // console.log(result);

        //API call to insert result into DB
        fetch('http://localhost:5000/insert-result', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(result)
        }).then(res => res.json()).then(data => {
            if (data.insertedId && points) {
                updateProfileWithPoints();
            }
        })
    }


    if (isLoading) {
        return <Loading />
    }


    return (
        <DefaultLayout>
            <div>
                <form onSubmit={handleStart} className='flex items-center justify-center gap-4' style={{ 'height': '50vh' }}>
                    <p className='text-xl font-bold'>Please Select Subject:</p>

                    <div>
                        <select name='subject' className="select select-bordered w-full max-w-xs">
                            <option disabled selected>Select Subject</option>
                            <option value='general-knowledge'>General Knowledge</option>
                            <option value='english'>English Grammar</option>
                        </select>
                        <p className='text-red-500 text-xs'>{error}</p>
                    </div>

                    <button type='submit' className='btn btn-primary' disabled={questions}>Start Quiz</button>
                </form>
                {
                    examStart &&
                    <form onSubmit={handlePaperSubmit} className='container mx-auto mt-6 p-4 bg-gray-200'>

                        {
                            questions && <>
                                <div className='w-2/3 border-4 mx-auto mb-2'>
                                    <h3 className='text-2xl font-bold text-center'>Question Paper</h3>
                                    <p className='font-bold'>Total Marks: {questions.length}</p>
                                </div>
                                {
                                    questions.map((qsn, index) => <Question key={index} qsn={qsn} handleSelect={handleSelect} index={index}></Question>)
                                }

                                <div className='flex  justify-center'>
                                    {/* <button type='submit' className='btn btn-secondary' disabled={timeOut}>Submit</button> */}
                                    <button type='submit' className='bg-primary rounded-md w-1/3'><label htmlFor="my-modal-5" className="btn modal-button btn-primary w-full">Submit</label></button>
                                </div>
                                <input type="checkbox" id="my-modal-5" className="modal-toggle" />
                                <div className="modal">
                                    <div className="modal-box w-1/3 max-w-5xl">
                                        <h3 className="font-bold text-lg">Thanks for the participation!</h3>
                                        <p className="py-4 text-xl font-bold">Total Marks: {marks}</p>
                                        {
                                            points && <p className="py-4 text-xl font-bold text-yellow-500">Bonus Points: 5</p>
                                        }
                                        <div className="modal-action">
                                            <label onClick={() => setExamStart(false)} htmlFor="my-modal-5" className="btn">Close</label>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }

                    </form>
                }
            </div >
        </DefaultLayout >
    );
};

export default Quizes;