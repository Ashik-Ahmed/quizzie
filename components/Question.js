import React from 'react';

const Question = ({ qsn, handleSelect, index }) => {

    const { _id, question, options, answer } = qsn;
    // console.log(answer);

    const answerSheet = {};


    return (
        <div className='card'>
            <div className='card-body w-full md:w-2/3 mx-auto bg-gray-100 mb-4'>
                <h4 className='text-lg font-bold'>{index + 1}. {question}</h4>
                <div className='md:grid grid-cols-4 gap-4 space-y-2'>
                    {
                        options.map(opt => <div key={opt.index} className='flex items-center gap-2'>
                            <input onChange={() => handleSelect(qsn._id, opt, answer)} type="checkbox" name='ansr' value={opt} className="checkbox  checked:bg-red-500 rounded-full" />
                            <span className="label-text">{opt}</span>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Question;