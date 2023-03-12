import React, { useState } from 'react'
import { useEffect } from 'react'
import { Switch } from '@headlessui/react'
import { getUserDetails, updateUser } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/ErrorMessage'
import Loader from '../components/Loader'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'



export default function UserEditScreen() {
    const navigate = useNavigate()
    const { id } = useParams()
    const dispatch = useDispatch()


    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdate = useSelector(state => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate ,  success: successUpdate } = userUpdate

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy



    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist')
        } else {
            if (!user.name || user._id !== Number(id)) {
                dispatch(getUserDetails(id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
                console.log(user)
            }
        }



    }, [id, user , successUpdate , navigate])

    const sumbitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id:user._id , name , email , isAdmin }))
    }




    return (
        <div className="h-full">
            <main className="mx-auto justify-center items-center max-w-7xl pb-10 lg:py-12 lg:px-8">
                <Link className=' my-4 underline' to={'/admin/userlist'}>
                    Go back
                </Link>
                <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
                    {loadingUpdate && <Loader/>}
                    {errorUpdate && <Message children={errorUpdate}/> }
                    <section aria-labelledby="payment-details-heading">
                        {loading ? <Loader /> : error ? <Message children={error} />
                            : (
                                <form method="POST">
                                    <div className="shadow sm:overflow-hidden sm:rounded-md">
                                        <div className="bg-white py-6 px-4 sm:p-6">
                                            <div>
                                                <h2 id="payment-details-heading" className="text-lg font-medium leading-6 text-gray-900">
                                                    User details
                                                </h2>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Edit User Acount information.
                                                </p>
                                            </div>

                                            <div className="mt-6 grid grid-cols-4 gap-6">
                                                <div className="col-span-4 sm:col-span-2">
                                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                        Name
                                                    </label>
                                                    <input
                                                        id="name"
                                                        type="name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        autoComplete="text"
                                                        placeholder='Enter your Name'
                                                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                                                    />
                                                </div>

                                                <div className="col-span-4 sm:col-span-2">
                                                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                        Email address
                                                    </label>
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        autoComplete="email"
                                                        placeholder='Enter your email address'
                                                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                                                    />
                                                </div>
                                                <div className="col-span-4 sm:col-span-2">
                                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                        Country
                                                    </label>
                                                    <select
                                                        id="country"
                                                        name="country"
                                                        autoComplete="country-name"
                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                                                    >
                                                        <option>Iran</option>
                                                    </select>
                                                </div>

                                                

                                                <div className="col-span-1 sm:col-span-1">

                                                    <label htmlFor="isAdmin" className="block text-sm font-medium text-gray-700">
                                                        Is Admin ?!
                                                    </label>
                                                    <Switch
                                                        checked={isAdmin}
                                                        onChange={setIsAdmin}
                                                        id="isAdmin"
                                                        name="isAdmin"
                                                        className={`${isAdmin ? 'bg-blue-600' : 'bg-gray-200'
                                                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                                                    >
                                                        <span className="sr-only">Enable notifications</span>
                                                        <span
                                                            className={`${isAdmin ? 'translate-x-6' : 'translate-x-1'
                                                                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                                        />
                                                    </Switch>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                            <button
                                                type="submit"
                                                onClick={sumbitHandler}
                                                className="inline-flex justify-center rounded-md border border-transparent  bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )
                        }
                    </section>
                </div>
            </main>
        </div>
    )
}