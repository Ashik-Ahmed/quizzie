import React from 'react';

const Question = ({ qsn, handleSelect, index }) => {

    const { _id, question, options, answer } = qsn;
    // console.log(answer);

    const answerSheet = {};


    return (
        <div className='card'>
            <div className='card-body w-2/3 mx-auto rounded-xl shadow-2xl bg-gray-100 mb-8'>
                <h4 className='text-lg font-bold'>{index + 1}. {question}</h4>
                <div className='grid grid-cols-4 gap-4'>
                    {
                        options.map(opt => <div key={opt.index} className='flex items-center gap-2'>
                            <input onChange={() => handleSelect(qsn._id, opt, answer)} type="checkbox" name='ansr' value={opt} className="checkbox rounded-full checked:bg-red-500" />
                            <span className="label-text">{opt}</span>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Question;