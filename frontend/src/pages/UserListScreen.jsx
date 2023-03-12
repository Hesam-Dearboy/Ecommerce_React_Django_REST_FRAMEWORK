import React, { useState } from 'react'
import { useEffect } from 'react'
import { listUsers, deleteUser } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/ErrorMessage'
import Loader from '../components/Loader'
import { Link, useNavigate, useLocation } from 'react-router-dom'



function UserListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/login')
        }

    }
        ,
        [dispatch, navigate, successDelete , userInfo])

    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this product?')) {
            //delete products
        }
    }


    return (
        <div className=' p-8'>
            {loading ? <Loader /> :
                error ? <Message children={error} />
                    : users && (
                        <div className="mt-6 flex flex-col">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <div className="overflow-hidden border-t border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                        User Id
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                        NAME
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                        EMAIL
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                        ADMIN
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">

                                                    </th>
                                                    {/*
                                  `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                                */}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {users.map((user) => (
                                                    <tr key={user._id}>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            {user._id}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            {user.name}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            {user.email}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            {user.isAdmin ?
                                                                <i className='fas fa-check text-green-600'></i> :
                                                                <i className='fas fa-check text-red-600'></i>
                                                            }
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                            <Link to={`/admin/user/${user._id}/edit`} className="text-indigo-600 hover:text-gray-900">

                                                                Edit

                                                            </Link>

                                                            <button className=' text-red-600 mx-5' onClick={() => deleteHandler(user._id)}>
                                                                <i className='fas fa-trash'></i>
                                                            </button>
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

export default UserListScreen