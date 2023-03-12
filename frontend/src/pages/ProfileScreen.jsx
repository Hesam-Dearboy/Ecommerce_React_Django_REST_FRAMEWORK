import React, { useState } from 'react'
import { useEffect } from 'react'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/ErrorMessage'
import Loader from '../components/Loader'
import { Link, useNavigate, } from 'react-router-dom'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'



function ProfileScreen() {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy


    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user, success])

    const sumbitHandler = (e) => {
        e.preventDefault()
        if (password != confirmPassword) {
            setMessage('Password do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password

            }))
            setMessage('')
        }
    }

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    return (
        <div className="h-full">
            <main className="mx-auto justify-center items-center max-w-7xl pb-10 lg:py-12 lg:px-8">
                {message && < Message children={message} />}
                {error && < Message children={error} />}
                {loading && <Loader />}
                {/* Payment details */}
                <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
                    <section aria-labelledby="payment-details-heading">
                        <form onSubmit={sumbitHandler} method="POST">
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="bg-white py-6 px-4 sm:p-6">
                                    <div>
                                        <h2 id="payment-details-heading" className="text-lg font-medium leading-6 text-gray-900">
                                            Payment details
                                        </h2>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Update your Acount information.
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
                                                required
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
                                                required
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

                                        <div className="col-span-4 sm:col-span-2">
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            <input
                                                id="password"
                                                name="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder='Enter your Password'
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-4 sm:col-span-2">
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                Confirm Password
                                            </label>
                                            <input
                                                id="passwordConfirm"
                                                name="passwordConfirm"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder='Again Enter Password'
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent  bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </section>

                    {/* Plan */}

                    {/* Billing history */}
                    <section aria-labelledby="billing-history-heading">
                        <div className="bg-white pt-6 shadow sm:overflow-hidden sm:rounded-md">
                            <div className="px-4 sm:px-6">
                                <h2 id="billing-history-heading" className="text-lg font-medium leading-6 text-gray-900">
                                    Order history
                                </h2>
                                {loadingOrders ? (
                                    <Loader />) :
                                    errorOrders ? (
                                        <Message children={errorOrders} />
                                    ) : orders &&
                                        (
                                            <div className="mt-6 flex flex-col">
                                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                                        <div className="overflow-hidden border-t border-gray-200">
                                                            <table className="min-w-full divide-y divide-gray-200">
                                                                <thead className="bg-gray-50">
                                                                    <tr>
                                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                                            Order Id
                                                                        </th>
                                                                        <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                                            Date
                                                                        </th>
                                                                        <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                                            Description
                                                                        </th>
                                                                        <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                                            Amount
                                                                        </th>
                                                                        {/*
                                  `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                                */}
                                                                        <th
                                                                            scope="col"
                                                                            className="relative px-6 py-3 text-left text-sm font-medium text-gray-500"
                                                                        >
                                                                            <span className="sr-only">View receipt</span>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="divide-y divide-gray-200 bg-white">
                                                                    {orders.map((order) => (
                                                                        <tr key={order._id}>
                                                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                                                <time >{order._id}</time>
                                                                            </td>
                                                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                                                <time >{order.createdAt.substring(0,10)}</time>
                                                                            </td>
                                                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                                                {order.description}
                                                                            </td>
                                                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                                                $ {order.totalPrice}
                                                                            </td>
                                                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                                                <Link to={`/order/${order._id}`} className="text-orange-600 hover:text-orange-900">
                                                                                    View receipt
                                                                                </Link>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                }
                            </div>

                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default ProfileScreen