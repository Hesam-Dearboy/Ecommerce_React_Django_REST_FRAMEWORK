import React, { useState } from 'react'
import { saveShippingAddress } from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'



function Shipping() {

  const cart = useSelector(state => state.cart)
  const { shippingAddress, cartItems } = cart

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [state, setState] = useState(shippingAddress.state)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [phone, setPhone] = useState(shippingAddress.phone)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, state, postalCode, phone }))
    navigate('/payment')
  }

  let sub


  return (
    <div className="bg-white">
      {/* Background color split screen for large screens */}
      <div className="fixed top-0 left-0 hidden h-full mb-10 w-1/2 bg-white lg:block" aria-hidden="true" />
      <div className="fixed top-0 right-0 hidden h-full w-1/2 bg-red-900 lg:block" aria-hidden="true" />
      <CheckoutSteps step1 step2 />

      <main className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8">
        <h1 className="sr-only">Checkout</h1>

        <section
          aria-labelledby="summary-heading"
          className="bg-red-900 pt-6 pb-12 text-red-300 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pt-0 lg:pb-24"
        >
          <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
            <h2 id="summary-heading" className="sr-only">
              Order summary
            </h2>



            <ul role="list" className="divide-y divide-white divide-opacity-10 text-sm font-medium">
              {cartItems.map((item) => (
                <li key={item.product} className="flex items-start space-x-4 py-6">
                  <img
                    src={`${item.image}`}
                    alt={item.name}
                    className="h-20 w-20 flex-none rounded-md object-cover object-center"
                  />
                  <div className="flex-auto space-y-1">
                    <h3 className="text-white">{item.name}</h3>

                    <div className="flex gap-2 items-center justify-start">
                      <dt>تعداد:</dt>
                      <dd>{item.count}</dd>
                    </div>
                  </div>
                  <p className="flex-none text-base font-medium text-white">{Number(item.price).toLocaleString()} تومان</p>
                </li>
              ))}
            </ul>

            <dl className="space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium">
              <div className="flex items-center justify-between">

                <dd>{sub = (cartItems.reduce((acc, item) => acc + item.price * item.count, 0).toLocaleString())} تومان</dd>
                <dt>مجموع</dt>
              </div>

              <div className="flex items-center justify-between">
                <dd className=' text-green-600'>رایگان</dd>
                <dt>هزینه ارسال</dt>
              </div>

              <div className="flex items-center justify-between">
                <dd className=' text-green-600'>رایگان</dd>
                <dt>هزینه مالیات</dt>
              </div>

              <div className="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-white">
                <dd className="text-base"> تومان {sub}</dd>
                <dt className="text-base">مجموع</dt>
              </div>
            </dl>
          </div>
        </section>

        <section
          aria-labelledby="payment-and-shipping-heading"
          className="py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pt-0 lg:pb-24"
        >
          <h2 id="payment-and-shipping-heading" className="sr-only">
            shipping details
          </h2>

          <form onSubmit={submitHandler}>
            <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
              <div className="mt-10">
                <h3 id="shipping-heading" className="text-lg text-right font-medium text-gray-900">
                 آدرس مرسوله
                </h3>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                  <div className="sm:col-span-3">
                    <label htmlFor="address" className="block text-right text-sm font-medium text-gray-700">
                      آدرس
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        placeholder='آدرس خود را وارد کنید'
                        id="address"
                        required
                        name="address"
                        value={address ? address : ''}
                        autoComplete="street-address"
                        onChange={(e) => setAddress(e.target.value)}
                        className="block w-full text-right rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-right text-sm font-medium text-gray-700">
                      شهر
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                        autoComplete="address-level2"
                        className="block w-full text-right rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="region" className="block text-right text-sm font-medium text-gray-700">
                      استان
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="region"
                        name="region"
                        required
                        value={state ? state : ''}
                        onChange={(e) => setState(e.target.value)}
                        autoComplete="address-level1"
                        className="block w-full text-right rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="postal-code" className="block text-right text-sm font-medium text-gray-700">
                      کد پستی
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="postal-code"
                        required
                        name="postal-code"
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                        autoComplete="postal-code"
                        className="block w-full rounded-md text-right border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-right text-sm font-medium text-gray-700">
                      شماره موبایل
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        required
                        id="phone"
                        name="phone"
                        value={phone ? phone : ''}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                <button
                  type="submit"
                  className="rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  ادامه
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}

export default Shipping