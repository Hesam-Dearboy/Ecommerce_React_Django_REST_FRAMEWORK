import React, { useState } from 'react'
import { useEffect } from 'react'
import { saveShippingAdrress } from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/ErrorMessage'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import { RadioGroup, } from '@headlessui/react'
import { CheckCircleIcon, } from '@heroicons/react/20/solid'
import { savePaymentMethod } from '../actions/cartActions'



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}




function PaymentScreen() {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if (!shippingAddress.address) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <main className="mx-auto max-w-7xl px-4 pt-16  pb-24 sm:px-6 lg:px-8">

            <CheckoutSteps step1 step2 step3 />
            <form onSubmit={submitHandler} className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">

                <div className="mt-10 pt-10">
                    <RadioGroup onChange={(e) => setPaymentMethod(e.target.value)} checked
                        label='radio'
                        id='paypal'
                        name='paymentMethod'
                    >
                        <RadioGroup.Label className="text-lg font-medium text-gray-900"> Select Method </RadioGroup.Label>

                        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">

                            <RadioGroup.Option

                                className={({ checked, active }) =>
                                    classNames(
                                        checked ? 'border-transparent' : 'border-gray-300',
                                        active ? 'ring-2 ring-red-500' : '',
                                        'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                                    )
                                }
                            >
                                {({ checked, active }) => (
                                    <>
                                        <span className="flex flex-1">
                                            <span className="flex flex-col">
                                                <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                                                    PayPal
                                                </RadioGroup.Label>
                                            </span>
                                        </span>
                                        {checked ? (
                                            <CheckCircleIcon className="h-5 w-5 text-red-600" aria-hidden="true" />
                                        ) : null}
                                        <span
                                            className={classNames(
                                                active ? 'border' : 'border-2',
                                                checked ? 'border-red-500' : 'border-transparent',
                                                'pointer-events-none absolute -inset-px rounded-lg'
                                            )}
                                            aria-hidden="true"
                                        />
                                    </>
                                )}
                            </RadioGroup.Option>

                        </div>
                    </RadioGroup>
                    <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                        <button
                            type="submit"
                            className="  rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                        >
                            Continue
                        </button>
                    </div>
                </div>

            </form>

        </main>
    )
}

export default PaymentScreen