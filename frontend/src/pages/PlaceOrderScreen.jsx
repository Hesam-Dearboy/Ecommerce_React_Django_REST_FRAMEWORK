import React, { useState, useEffect } from 'react'
import { saveShippingAddress } from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import { RadioGroup } from '@headlessui/react'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/20/solid'
import Message from '../components/ErrorMessage'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function Example() {


  const navigate = useNavigate()
  const orderCreate = useSelector(state => state.orderCreate)
  const { order, error, success } = orderCreate

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  cart.itemsPrice = Number(cart.cartItems.reduce((acc, item) => acc + item.price * item.count, 0)).toFixed(2)
  cart.shippingPrice = (Number(cart.itemsPrice) > 100 ? 0 : 10).toFixed(2)
  cart.taxPrice = Number((0)).toFixed(2)
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice)).toFixed(2)

  console.log(cart.totalPrice, cart.itemsPrice, cart.shippingPrice, cart.taxPrice)



  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [state, setState] = useState(shippingAddress.state)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [phone, setPhone] = useState(shippingAddress.phone)

  const [paymentMethod, setPaymentMethod] = useState('PayPal')




  useEffect(() => {

    if (!cart.paymentMethod) {
      navigate('/payment')
      dispatch({ type: ORDER_CREATE_RESET })
    }

    if (success) {
      navigate(`/order/${order._id}`)
    }
  }, [success, navigate])



  const placeOrder = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    }))
  }

  useEffect(() => {
    if (cart.cartItems.product) {
      dispatch(addToCart(cart.cartItems.product, cart.cartItems.count))


    }
  }, [dispatch, cart.cartItems.product, cart.cartItems.count])


  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const submitSaveHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, state, postalCode, phone }))

  }



  return (



    <div className="bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 bg-white lg:px-8">
        <CheckoutSteps step1 step2 step3 step4 />
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="sr-only">Checkout</h1>

          <form onSubmit={submitSaveHandler} className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>

              <div className="mt-10 pt-10">
                <h2 className="text-lg font-medium text-right text-gray-900">آدرس حمل مرسوله</h2>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                  <div className="sm:col-span-3">
                    <label htmlFor="address" className="block text-right text-sm font-medium text-gray-700">
                      آدرس
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        placeholder='آدررس را وارد کنید'
                        id="address"
                        required
                        name="address"
                        value={address ? address : ''}
                        autoComplete="street-address"
                        onChange={(e) => setAddress(e.target.value)}
                        className="block w-full text-right  rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
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
                        className="block w-full rounded-md text-right border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
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
                  <div className="sm:col-span-3">
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

              <div className="mt-10 border-t border-gray-200 pt-10">
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

              </div>
              <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                <button
                  type="submit"
                  className="rounded-md border border-transparent bg-rerd-600 py-2 px-4 text-sm font-medium text-white shadow-sm bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  ذخیره
                </button>
              </div>
            </div>

            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900 text-right">خلاصه سفارش</h2>
              {cart.cartItems.length === 0 ? <Message children='Your cart is empty' /> :
                <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">

                  <h3 className="sr-only">Items in your cart</h3>
                  <ul role="list" className="divide-y divide-gray-200">
                    {cart.cartItems.map((item, index) => (
                      <li key={item.product} className="flex py-6 px-4 sm:px-6">
                        <div className="flex-shrink-0">
                          <img src={`${item.image}`} alt={item.name} className="w-20 rounded-md" />
                        </div>

                        <div className="ml-6 flex flex-1 flex-col">
                          <div className="flex">
                            <div className="min-w-0 flex-1">
                              <h4 className="text-sm">
                                <Link to={`/product/${item.product}`} className="font-medium text-gray-700 hover:text-gray-800">
                                  {item.name}
                                </Link>
                              </h4>
                              {/* <p className="mt-1 text-sm text-gray-500">{item.color}</p>
                              <p className="mt-1 text-sm text-gray-500">{item.size}</p> */}
                            </div>

                            <div className="ml-4 mb-6 flow-root flex-shrink-0">
                              <button
                                onClick={() => removeFromCartHandler(item.product)}
                                type="button"
                                className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                              >
                                <span className="sr-only">Remove</span>
                                <TrashIcon className="h-5 w-5" aria-hidden="true" />
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-1 items-end justify-between pt-2">
                            <p className="mt-1 text-sm font-medium text-gray-900">{Number(item.price).toLocaleString()}</p>

                            <div className="ml-4">
                              <label htmlFor="count" className="sr-only">
                                Quantity
                              </label>
                              <select
                                id="count"
                                name="count"
                                value={item.count}
                                onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm"
                              >
                                {
                                  [...Array(item.countInStock).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  ))
                                }
                              </select>
                            </div>
                          </div>
                          <div className="flex flex-1 border-t border-gray-200 mt-6  items-end justify-between pt-2">
                            <p className="mt-1 text-sm font-bold text-gray-900">
                              {Number(item.price).toLocaleString()} X {item.count} = تومان {(item.price * item.count).toLocaleString()}

                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <dd className="text-sm font-medium text-gray-900">تومان {Number(cart.itemsPrice).toLocaleString()}</dd>
                      <dt className="text-sm">مجموع</dt>

                    </div>
                    <div className="flex items-center justify-between">
                      <dd className="text-sm font-medium text-gray-900">{cart.shippingPrice == 0 ? <dd className="text-sm font-medium text-green-900"> Free</dd> : cart.shippingPrice}</dd>
                      <dt className="text-sm">حمل مرسوله</dt>
                    </div>
                    {/* <div className="flex items-center justify-between">
                      <dt className="text-sm">Taxes</dt>
                      <dd className="text-sm font-medium text-gray-900">$5.52</dd>
                    </div> */}
                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                      <dd className="text-base font-medium text-gray-900"> تومان {Number(cart.itemsPrice).toLocaleString()}</dd>
                      <dt className="text-base font-medium">مجموع</dt>
                    </div>

                    <div className="flex items-center justify-between  pt-6">
                      {error && <Message children={error} />}
                    </div>

                  </dl>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <button
                      type="button"
                      onClick={placeOrder}
                      className="w-full rounded-md border border-transparent bg-red-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                      تایید سفارش
                    </button>
                  </div>
                </div>
              }

            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
