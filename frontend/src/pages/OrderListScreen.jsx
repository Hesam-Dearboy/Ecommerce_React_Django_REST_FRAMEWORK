import React, { useState } from 'react'
import { useEffect } from 'react'
import { listOrders } from '../actions/orderActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/ErrorMessage'
import Loader from '../components/Loader'
import { Link, useNavigate, useLocation } from 'react-router-dom'



function OrderListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            navigate('/login')
        }

    }
        ,
        [dispatch, navigate , userInfo])



    return (
        <div className=' p-8'>
            {loading ? <Loader /> :
                error ? <Message children={error} />
                    : orders && (
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
                                                        USER
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                        DATE
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                        TOTAL PRICE
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                        PAID
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                        DELIVER
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">

                                                    </th>
                                                    {/*
                                  `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                                */}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {orders.map((order) => (
                                                    <tr key={order._id}>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            {order._id}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            {order.user && order.user.name}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            {order.createdAt.substring(0 , 10)}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                           تومان  {order.totalPrice}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            {order.isPaid ?
                                                                 order.paidAt.substring(0,10)  :
                                                                <i className='fas fa-check text-red-600'></i>
                                                            }
                                                        </td>


                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            {order.isDelivered ?
                                                                 order.deliveredAt.substring(0,10)  :
                                                                <i className='fas fa-check text-red-600'></i>
                                                            }
                                                        </td>



                                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                            <Link to={`/order/${order._id}`} className="text-indigo-600 hover:text-gray-900">

                                                                Details

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
    )
}

export default OrderListScreen