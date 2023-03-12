import React, { useState } from 'react'
import { useEffect } from 'react'
import { register } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/ErrorMessage'
import Loader from '../components/Loader'
import { Link, useNavigate, useLocation } from 'react-router-dom'

function RegisterScreen() {

    const navigate = useNavigate()
    const location = useLocation()

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'
    console.log(location.search)

    const userRegister = useSelector(state => state.userRegister)

    const { error, loading, userInfo } = userRegister


    useEffect(() => {
        if (userInfo) {
            if(userInfo.verified){
                navigate(redirect)
            }else{
                navigate('/codeverify')
            }
        }
    }, [navigate, userInfo, redirect])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')




    const sumbitHandler = (e) => {
        e.preventDefault()
        if (password != confirmPassword) {
            setMessage('Password do not match')
        } else {
            dispatch(register(name, password , phoneNumber ))
        }
    }


    return (
        <div>
            <div className="flex min-h-full flex-col h-[80vh] justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-20 w-auto"
                        src="https://s3.ir-thr-at1.arvanstorage.com/zamshop/logo-zm.png"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        حساب کاربری بسازید

                    </h2>
                </div>


                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    {message && < Message children={message} />}
                    {error && < Message children={error} />}
                    {loading && <Loader />}
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={sumbitHandler} >
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium  text-right text-gray-700">
                                    نام 
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="name"
                                        type="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder='نام خود را وارد کنید'
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 bg-red-100 text-right shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="tel" className="block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="tel"
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        autoComplete="tel"
                                        placeholder='Enter your Phone Number'
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 bg-red-100 text-right shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                                    />
                                </div>
                            </div>


                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder='Enter your Password'
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 bg-red-100 text-right shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                                    />
                                </div>
                            </div>


                            <div>
                                <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="passwordConfirm"
                                        name="passwordConfirm"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder='Again Enter Password'
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 bg-red-100 text-right shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                                    />
                                </div>
                            </div>



                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    Create Acount
                                </button>
                            </div>
                        </form>

                        <p className="mt-4 text-center text-sm  text-gray-600">
                            Have an Acount ?!{' '}
                            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="font-medium text-red-600 hover:text-indigo-500">
                                Login
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen