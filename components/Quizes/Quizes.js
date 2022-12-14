import { async } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import DefaultLayout from '../../DefaultLayout/DefaultLayout';
import auth from '../../firebase.init';
import useDBUser from '../../hooks/useDBUser';
import usePersonalResult from '../../hooks/usePersonalResult';
import Loading from '../Loading/Loading';
import Question from '../Question';

const Quizes = () => {

    const [authUser] = useAuthState(auth);
    const [dbUser, isDBLoading] = useDBUser(authUser?.email);

    const [questions, setQuestions] = useState(null);
    const [examStart, setExamStart] = useState(false);
    const [subject, setSubject] = useState(null);
    const [gkAvailable, setGkAvailable] = useState(true);
    const [engAvailable, setEngAvailable] = useState(true);
    const [error, setError] = useState('')
    const [marks, setMarks] = useState(0);
    const [points, setPoints] = useState(false);

    const date = new Date().toLocaleDateString();
    const [result, isLoading, refetch] = usePersonalResult(authUser?.email);

    useEffect(() => {
        result?.map((res, index) => {
            if (res.date == date && res.subject == 'general-knowledge') {
                setGkAvailable(false);
            }
            if (res.date == date && res.subject == 'english') {
                setEngAvailable(false);
            }
        })
    }, [result])

    const handleStart = (e) => {
        e.preventDefault();
        // console.log(e.target.subject.value);
        if (e.target.subject.value !== 'Select Subject') {
            setSubject(e.target.subject.value);

            //API call to set the question paper loading from DB 
            fetch(`https://quizzie.onrender.com/quiz/${e.target.subject.value}`, {
                method: 'GET',
            }).then(res => res.json()).then(data => {
                setQuestions(data);
                setExamStart(true);
                setTimeout(() => {
                    setExamStart(false);
                }, 60000);

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
                        autoClose: examStart || 60000,
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

        fetch(`https://quizzie.onrender.com/create-user/${authUser.email}`, {
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
        fetch('https://quizzie.onrender.com/insert-result', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(result)
        }).then(res => res.json()).then(data => {
            if (data.insertedId && points) {
                updateProfileWithPoints();
                refetch();
            }
        })
    }


    if (isLoading || isDBLoading) {
        return <Loading />
    }


    return (
        <div className='min-h-fit bg-gray-200'>
            <form onSubmit={handleStart} className='md:flex flex-col items-center justify-center gap-4 p-4 space-y-2 md:min-h-[70vh]' >
                <p className='text-xl font-bold text-center'>Please Select Subject:</p>

                <div className='text-center'>
                    <select name='subject' className="select select-bordered w-56">
                        <option disabled selected>Select Subject</option>
                        <option disabled={gkAvailable ? false : true} value='general-knowledge'>General Knowledge</option>
                        <option disabled={engAvailable ? false : true} value='english'>English Grammar</option>
                    </select>
                    <p className='text-red-500 text-xs'>{error}</p>
                </div>

                <div className='w-full text-center'>
                    <button type='submit' className='btn btn-primary w-56' disabled={examStart}>Start Quiz</button>
                </div>
            </form>
            {(!gkAvailable && !engAvailable) &&
                <div className='text-2xl font-semibold text-primary text-center pb-40'>
                    <p>No More Exam Today.</p>
                    <p>Yay.....!!</p>
                </div>
            }
            {
                examStart &&
                <form onSubmit={handlePaperSubmit} className='container mx-auto p-4 bg-white'>

                    {
                        questions && <>
                            <div className='w-2/3 mx-auto mb-2'>
                                <h3 className='text-2xl font-bold text-center'>Question Paper</h3>
                                <p className='font-bold'>Total Marks: {questions.length}</p>
                            </div>
                            {
                                questions.map((qsn, index) => <Question key={index} qsn={qsn} handleSelect={handleSelect} index={index}></Question>)
                            }

                            <div className='flex  justify-center'>
                                {/* <button type='submit' className='btn btn-secondary' disabled={timeOut}>Submit</button> */}
                                <button type='submit' className='bg-primary rounded-md w-1/3 mt-6'><label htmlFor="my-modal-5" className="btn modal-button btn-primary w-full">Submit</label></button>
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
    );
};

export default Quizes;