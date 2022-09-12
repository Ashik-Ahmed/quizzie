import { useRouter } from 'next/router';
import React from 'react';

const Services = () => {

    const router = useRouter();

    return (
        <div className='my-6'>
            <div className='text-center '>
                <h3 className='text-4xl font-bold border-b-4 border-gray-200 inline'>Available Exams</h3>
            </div>
            <div className='container  mx-auto grid grid-cols-3 gap-12 my-4 px-16'>
                <div className="card card-compact bg-base-100 shadow-xl">
                    <figure className='h-2/3'><img src="https://jagobahe.com/wp-content/uploads/2019/05/bcs-circular-bpsc-syllabus-mark-distribution-1.png" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">BCS Preparation</h2>
                        <p>Total Questions: 21543</p>
                        <div className="card-actions justify-end">
                            <button onClick={() => router.push('/takeExam')} className="btn btn-primary w-full">Start Exam</button>
                        </div>
                    </div>
                </div>

                <div className="card card-compact bg-base-100 shadow-xl">
                    <figure className='h-2/3'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZuKzc-DNiT2q6VzX9tXrJQLjWfjnrLJJzBA&usqp=CAU" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Govt. Job</h2>
                        <p>Total Questions: 21543</p>
                        <div className="card-actions justify-end">
                            <button onClick={() => router.push('/takeExam')} className="btn btn-primary w-full">Start Exam</button>
                        </div>
                    </div>
                </div>

                <div className="card card-compact bg-base-100 shadow-xl">
                    <figure className='h-2/3'><img src="https://jotodeal.com/wp-content/uploads/2021/09/Bangladesh-Bank.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Bank Job</h2>
                        <p>Total Questions: 21543</p>
                        <div className="card-actions justify-end">
                            <button onClick={() => router.push('/takeExam')} className="btn btn-primary w-full">Start Exam</button>
                        </div>
                    </div>
                </div>

                <div className="card card-compact bg-base-100 shadow-xl">
                    <figure className='h-2/3'><img src="https://i0.wp.com/govtjobcircular.com/wp-content/uploads/2021/07/HSC-result.jpg?resize=780%2C405&ssl=1" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">HSC Exam</h2>
                        <p>Total Questions: 21543</p>
                        <div className="card-actions justify-end">
                            <button onClick={() => router.push('/takeExam')} className="btn btn-primary w-full">Start Exam</button>
                        </div>
                    </div>
                </div>

                <div className="card card-compact bg-base-100 shadow-xl">
                    <figure className='h-2/3'><img src="https://campusprotidin.com/wp-content/uploads/2022/07/SSC-Routine-2022.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">SSC Exam</h2>
                        <p>Total Questions: 21543</p>
                        <div className="card-actions justify-end">
                            <button onClick={() => router.push('/takeExam')} className="btn btn-primary w-full">Start Exam</button>
                        </div>
                    </div>
                </div>

                <div className="card card-compact bg-base-100 shadow-xl">
                    <figure className='h-2/3'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBkBhEfjDTCwQfRkwb6SPsGI4W3lY7TMD60Q&usqp=CAU" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">JSC Exam</h2>
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