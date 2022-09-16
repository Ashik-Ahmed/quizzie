import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState, useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
// import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../components/Loading/Loading';
import DefaultLayout from '../DefaultLayout/DefaultLayout';
import auth from '../firebase.init';
import useToken from '../hooks/useToken';

const Signup = () => {

    const router = useRouter();

    const { register, resetField, formState: { errors, isDirty, isValid }, handleSubmit } = useForm({
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    //create database user
    const createDBUser = (name, email) => {
        fetch(`https://quizzie.onrender.com/create-user/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authentication: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ name, email })
        }).then(res => res.json()).then(data => {
            console.log(data);
        })
    }


    const [token] = useToken(user);
    // const navigate = useNavigate();
    // const location = useRouter();
    // let from = router.state?.from?.pathname || "/";
    let from = router.query?.referer?.toString || '/';
    console.log(token);
    // handle successful and failed registration notification and redirect
    useEffect(() => {
        if (token) {
            toast.success("Account created successfully");
            router.push(from, { replace: true });
        }
        if (error) {
            switch (error?.code) {
                case "auth/email-already-in-use":
                    toast.warn("Email already exist")
                    break;
                case "auth/invalid-email":
                    toast.warn("Invalid Email")
                    break;
                default:
                    toast.error("Something goes wrong")
                    break;
            }
        }
    }, [token, error])

    const onSubmit = async (data) => {
        if (data.password === data.confirmPassword) {
            await createUserWithEmailAndPassword(data.email, data.password);
            await updateProfile({ displayName: data.name });
            createDBUser(data.name, data.email)
            console.log(data.email, data.name);
            resetField("name");
            resetField("email");
            resetField("password");
            resetField("confirmPassword");
        }
        else {
            alert("Password did't matched");
        }
    }




    if (loading || updating) {
        return <Loading></Loading>
    }

    return (
        <div class="hero bg-base-100">
            <div class="hero-content flex-col  md:h-3/4 lg:flex-row-reverse w-3/4">
                <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200">

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="card bg-base-100 shadow-xl">
                            <div class="card-body gap-y-0">
                                <h2 class="card-title mx-auto text-3xl font-bold text-cyan-500 border-b-4 pb-1">Sign Up</h2>

                                <div class="form-control w-full max-w-xs">
                                    <label class="label">
                                        <span class="label-text">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        class="input input-bordered w-full max-w-xs"
                                        {...register("name", {
                                            required: {
                                                value: true,
                                                message: 'Name is required'
                                            }
                                        })}
                                    />
                                    <label class="label">
                                        {errors.name?.type === 'required' && <span class="label-text-alt text-red-500">{errors.name.message}</span>}

                                    </label>
                                </div>

                                <div class="form-control w-full max-w-xs">
                                    <label class="label">
                                        <span class="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        class="input input-bordered w-full max-w-xs"
                                        {...register("email", {
                                            required: {
                                                value: true,
                                                message: 'Email is required'
                                            },
                                            pattern: {
                                                //previous regex
                                                // ^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2, 3})+$
                                                value: /\S+@\S+\.\S+/,
                                                message: 'Email not valid'
                                            }
                                        })}
                                    />
                                    <label class="label">
                                        {errors.email?.type === 'required' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}
                                        {errors.email?.type === 'pattern' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}

                                    </label>
                                </div>


                                <div class="form-control w-full max-w-xs">
                                    <label class="label">
                                        <span class="label-text">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        class="input input-bordered w-full max-w-xs"
                                        {...register("password", {
                                            required: {
                                                value: true,
                                                message: 'Password is required'
                                            },
                                            minLength: {
                                                //previous regex
                                                // \S+@\S+\.\S+
                                                value: 6,
                                                message: 'Minimum 6 characters required'
                                            }
                                        })}
                                    />
                                    <label class="label">
                                        {errors.password?.type === 'required' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}
                                        {errors.password?.type === 'minLength' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}

                                    </label>
                                </div>


                                <div class="form-control w-full max-w-xs">
                                    <label class="label">
                                        <span class="label-text">Confirm Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        class="input input-bordered w-full max-w-xs"
                                        {...register("confirmPassword", {
                                            required: {
                                                value: true,
                                                message: 'Confirm Password is required'
                                            },
                                            minLength: {
                                                //previous regex
                                                // \S+@\S+\.\S+
                                                value: 6,
                                                message: 'Minimum 6 characters required'
                                            },
                                        })}
                                    />
                                    <label class="label">
                                        {errors.confirmPassword?.type === 'required' && <span class="label-text-alt text-red-500">{errors.confirmPassword.message}</span>}
                                        {errors.confirmPassword?.type === 'minLength' && <span class="label-text-alt text-red-500">{errors.confirmPassword.message}</span>}

                                    </label>
                                    <label class="label">
                                        <div class="label-text-alt text-left">Already registered? <p onClick={() => router.push('/login')} className='text-cyan-600 font-semibold link link-hover inline ml-2'>Login now.</p></div>
                                    </label>
                                </div>

                                <div class="card-actions justify-end">
                                    <button type='submit' class="btn bg-cyan-500 hover:bg-cyan-600 border-0 w-full" >Sign up</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div >
            </div >

        </div >
    );
};

export default Signup;