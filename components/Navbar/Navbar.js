import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useDBUser from '../../hooks/useDBUser';
import Loading from '../Loading/Loading';

const Navbar = () => {

    const router = useRouter();

    const [authUser, isLoading] = useAuthState(auth);
    const [dbUser, isDBLoading] = useDBUser(authUser?.email)

    //sign out the loggedin user
    const handleSignout = () => {
        signOut(auth);
        localStorage.removeItem('accessToken');
    }

    if (isLoading || isDBLoading) {
        return <Loading />
    }


    return (
        <div className="navbar flex justify-around bg-indigo-400">
            <div className="navbar-start ">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><button onClick={() => router.push('/takeExam')}>Take Exam</button></li>
                        <li><button onClick={() => router.push('/dashboard')}>Dashboard</button></li>
                        <li><button onClick={() => router.push('/set-question')}>Set Question</button></li>
                    </ul>
                </div>
                <a onClick={() => router.push('/')} className="btn btn-ghost normal-case text-xl text-white font-bold italic">Quizzie</a>
            </div>
            <div className="navbar-center hidden lg:flex  text-white font-bold">
                <ul className="menu menu-horizontal p-0">
                    <li><button onClick={() => router.push('/takeExam')}>Take Exam</button></li>
                    <li><button onClick={() => router.push('/dashboard')}>Dashboard</button></li>
                    <li><button onClick={() => router.push('/set-question')}>Set Question</button></li>
                </ul>
            </div>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar flex">
                    <div className="w-10 rounded-full">
                        <img src="https://placeimg.com/80/80/people" />
                    </div>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    {authUser ?
                        <>
                            <li><button onClick={() => router.push('/profile')}>Profile - {authUser.displayName || authUser.email}</button></li>
                            <li><button>Points: {dbUser?.points || 0}</button></li>
                            <li><button onClick={() => router.push('/dashboard')}>Dashboard</button></li>
                            <li><button onClick={handleSignout}>Logout</button></li>
                        </>
                        :
                        <li><button onClick={() => router.push('/login')}>Login</button></li>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Navbar;