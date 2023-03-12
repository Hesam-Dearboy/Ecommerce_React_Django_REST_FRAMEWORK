import React from 'react'
import { ChevronRightIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

function CheckoutSteps({ step1, step2, step3, step4 }) {
    return (
        <div className=" bg-white">
            <header className="relative mt-10 bg-white text-sm font-medium text-gray-700">
                <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
                    <div className="relative flex justify-end sm:justify-center">
                        <nav aria-label="Progress" className="hidden sm:block">
                            <ol role="list" className="flex space-x-4">
                                <li className="flex items-center">
                                    {step1 ? (
                                        <>
                                            <Link to='/login' aria-current="page" className="text-red-600">
                                                Login
                                            </Link>

                                            <ChevronRightIcon className="ml-4 h-5 w-5 text-gray-300" aria-hidden="true" /></>

                                    ) : (
                                        <>

                                            <p disabled aria-current="page" className="text-gray-600">
                                                Login
                                            </p>

                                            <ChevronRightIcon className="ml-4 h-5 w-5 text-gray-300" aria-hidden="true" />
                                        </>
                                    )}
                                </li>


                                <li className="flex items-center">
                                    {step2 ? (
                                        <>
                                            <Link to='/shipping' aria-current="page" className="text-red-600">
                                                shipping
                                            </Link>

                                            <ChevronRightIcon className="ml-4 h-5 w-5 text-gray-300" aria-hidden="true" /></>

                                    ) : (
                                        <>

                                            <p disabled aria-current="page" className="text-gray-600">
                                                shipping
                                            </p>

                                            <ChevronRightIcon className="ml-4 h-5 w-5 text-gray-300" aria-hidden="true" />
                                        </>
                                    )}
                                </li>

                                <li className="flex items-center">
                                    {step3 ? (
                                        <>
                                            <Link to='/payment' aria-current="page" className="text-red-600">
                                                Payment
                                            </Link>

                                            <ChevronRightIcon className="ml-4 h-5 w-5 text-gray-300" aria-hidden="true" /></>

                                    ) : (
                                        <>

                                            <p disabled aria-current="page" className="text-gray-600">
                                                Payment
                                            </p>

                                            <ChevronRightIcon className="ml-4 h-5 w-5 text-gray-300" aria-hidden="true" />
                                        </>
                                    )}
                                </li>

                                <li className="flex items-center">
                                    {step4 ? (
                                        <>
                                            <Link to='/placeorder' aria-current="page" className="text-red-600">
                                                Place Order
                                            </Link>

                                            <ChevronRightIcon className="ml-4 h-5 w-5 text-gray-300" aria-hidden="true" /></>

                                    ) : (
                                        <>

                                            <p disabled aria-current="page" className="text-gray-600">
                                                Place Order
                                            </p>

                                            <ChevronRightIcon className="ml-4 h-5 w-5 text-gray-300" aria-hidden="true" />
                                        </>
                                    )}
                                </li>

                            </ol>
                        </nav>
                        <p className="sm:hidden">Step 2 of 4</p>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default CheckoutSteps