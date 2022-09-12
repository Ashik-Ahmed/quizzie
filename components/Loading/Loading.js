import React from 'react';
import styles from './Loading.module.css'

const Loading = () => {
    return (
        <div className='flex justify-center h-screen items-center'>
            <div class={styles.loader}></div>
        </div>
    );
};

export default Loading;