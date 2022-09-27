import { useRouter } from 'next/router';
import React from 'react';
import computer from '../../assets/computer.jpg';
import englishGrammar from '../../assets/english-grammar.jpg';
import generalKnowledge from '../../assets/general-knowledge.png';
import history from '../../assets/history.jpg';
import math from '../../assets/math.jpg';
import science from '../../assets/science.png';

const Services = () => {

    const router = useRouter();

    return (
        <div className='my-6'>
            <div className='text-center '>
                <h3 className='text-4xl font-bold border-b-4 border-gray-200 inline'>Available Exams</h3>
            </div>
            <div className='container  mx-auto grid grid-cols-3 gap-12 my-4 px-16'>
                <div className="card card-compact bg-base-100 shadow-xl">
                    <figure className='h-2/3 border-b-8 border-primary'><img src='https://i.ibb.co/hY3kKJY/general-knowledge.png' alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">General Knowledge</h2>
                        <p>Total Questions: 21543</p>
                        <div className="card-actions justify-end">
                            <button onClick={() => router.push('/takeExam')} className="btn btn-primary w-full">Start Exam</button>
                        </div>
                    </div>
                </div>

                <div className="card card-compact bg-base-100 shadow-xl">
                    <figure className='h-2/3 border-b-8 border-primary'><img src='https://i.ibb.co/S6TRdq2/english-grammar.jpg' alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">English Grammar</h2>
                        <p>Total Questions: 21543</p>
                        <div className="card-actions justify-end">
                            <button onClick={() => router.push('/takeExam')} className="btn btn-primary w-full">Start Exam</button>
                        </div>
                    </div>
                </div>

                <div className="card card-compact bg-base-100 shadow-xl">
                    <figure className='h-2/3'><img src='https://i.ibb.co/YDq3CCh/computer.jpg' alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Computer Fundamental</h2>
                        <p>Total Questions: 21543</p>
                        <div className="card-actions justify-end">
                            <button onClick={() => router.push('/takeExam')} className="btn btn-primary w-full">Start Exam</button>
                        </div>
                    </div>
                </div>

                <div className="card card-compact bg-base-100 shadow-xl">
                    <figure className='h-2/3 border-b-8 border-primary'><img src='https://i.ibb.co/vdXftd4/math.jpg' alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Mathematics</h2>
                        <p>Total Questions: 21543</p>
                        <div className="card-actions justify-end">
                            <button onClick={() => router.push('/takeExam')} className="btn btn-primary w-full">Start Exam</button>
                        </div>
                    </div>
                </div>

                <div className="card card-compact bg-base-100 shadow-xl">
                    <figure className='h-2/3 border-b-8 border-primary'><img src='https://i.ibb.co/ZmwtXrx/science.png' alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Science</h2>
                        <p>Total Questions: 21543</p>
                        <div className="card-actions justify-end">
                            <button onClick={() => router.push('/takeExam')} className="btn btn-primary w-full">Start Exam</button>
                        </div>
                    </div>
                </div>

                <div className="card card-compact bg-base-100 shadow-xl">
                    <figure className='h-2/3 border-b-8 border-primary'><img src='https://i.ibb.co/nwjqktd/history.jpg' alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">History</h2>
                        <p>Total Questions: 21543</p>
                        <div className="card-actions justify-end">
                            <button onClick={() => router.push('/takeExam')} className="btn btn-primary w-full">Start Exam</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;