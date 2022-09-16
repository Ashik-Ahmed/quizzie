import React from 'react';
import { toast } from 'react-toastify';
import RequireAuth from '../components/RequireAuth/RequireAuth';
import DefaultLayout from '../DefaultLayout/DefaultLayout';

const setQuestion = () => {

    const handleAddQuestion = (e) => {
        e.preventDefault();
        const subject = e.target.subject.value;
        const question = e.target.question.value;
        const option1 = e.target.option1.value;
        const option2 = e.target.option2.value;
        const option3 = e.target.option3.value;
        const option4 = e.target.option4.value;
        const answer = e.target.answer.value;

        const qsn = {
            question,
            options: [option1, option2, option3, option4],
            answer
        }

        fetch(`https://quizzie.onrender.com/insert-question/${subject}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(qsn)
        }).then(res => res.json()).then(data => {
            console.log(data);
            toast.success('Question Added');
            e.target.reset();
        })

        console.log(qsn);
    }


    return (
        <RequireAuth>
            <div>
                <h3 className='text-2xl font-bold text-center'>Set a Question</h3>
                <form onSubmit={handleAddQuestion} className='w-4/5 mx-auto my-8 bg-gray-200 rounded-md p-4'>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Select Subject</span>
                        </label>
                        <select name='subject' className="select select-bordered" required>
                            <option disabled selected>Choose Subject</option>
                            <option value='general-knowledge'>General Knowledge</option>
                            <option value='english'>English Grammar</option>
                        </select>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Question</span>
                        </label>
                        <input name='question' type="text" placeholder="Question" className="input input-bordered w-full " required />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Options</span>
                        </label>
                        <div className='flex gap-4 '>
                            <input name='option1' type="text" placeholder="Option 1" className="input input-bordered w-full " required />
                            <input name='option2' type="text" placeholder="Option 2" className="input input-bordered w-full " required />
                            <input name='option3' type="text" placeholder="Option 3" className="input input-bordered w-full " required />
                            <input name='option4' type="text" placeholder="Option 4" className="input input-bordered w-full " required />
                        </div>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Answer</span>
                        </label>
                        <input name='answer' type="text" placeholder="Answer" className="input input-bordered w-full " required />
                    </div>

                    <div className='w-full flex justify-center mt-6'>
                        <button type='submit' className='btn btn-primary w-1/3'>Submit</button>
                    </div>
                </form>
            </div>
        </RequireAuth>
    );
};

export default setQuestion;