import React, { useEffect } from 'react'
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon as XMarkIconMini } from '@heroicons/react/20/solid'
import { Link, useParams, useLocation, useNavigate, redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Message from '../components/ErrorMessage'

function CartScreen() {

  let sub
  const shippingPrice = 0


  const navigate = useNavigate()
  const location = useLocation()
  const { _id } = useParams()

  const count = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart



  useEffect(() => {
    if (_id) {
      dispatch(addToCart(_id, count))

    }
  }, [dispatch, _id, count])

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping')
  }

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }



  return (
    <div className="bg-white ">
      <main className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">

        <h1 className="text-3xl text-right font-bold tracking-tight text-gray-900 sm:text-4xl m-4">سبد خرید</h1>

        {cartItems.length === 0 ?
          <Message>
            سبد خرید شما خالی است
            <Link className=' underline m-1 text-blue-700' to='/'> ادامه خرید</Link>
          </Message> :
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
                {cartItems.map(item => (
                  <li key={item.product} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img
                        src={`${item.image}`}
                        alt={item.name}
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <Link to={`/product/${item.product}`} className="font-medium text-gray-700 hover:text-gray-800">
                                {item.name}
                              </Link>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            {/* <p className="text-gray-500">{product.color}</p> */}
                            {item.size ? (
                              <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{item.size}</p>
                            ) : null}
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">{Number(item.price).toLocaleString()} تومان</p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <select
                            value={item.count}
                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                            className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm"
                          >
                            {
                              [...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))
                            }
                          </select>

                          <div className="absolute top-0 right-0">
                            <button onClick={() => removeFromCartHandler(item.product)} type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                              <span className="sr-only">Remove</span>
                              <XMarkIconMini className="h-5 w-5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                        {item.countInStock ? (
                          <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                        ) : (
                          <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
                        )}

                        <span>{item.countInStock ? 'موجود در انبار' : `Ships in ${item.leadTime}`}</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order summary */}

            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <h2 id="summary-heading" className="text-lg text-right font-medium text-gray-900">
                خلاصه سفارش
              </h2>

              <dl className="mt-6 space-y-4">

                <div className="flex items-center justify-between">

                  <dt className="text-sm font-medium text-gray-900">{cartItems.reduce((acc, item) => acc + item.count, 0)}</dt>
                  <dd className="text-sm text-right text-gray-600">مجموع تعداد</dd>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dd className="text-sm font-medium text-gray-900">تومان {sub = (cartItems.reduce((acc, item) => acc + item.count * item.price, 0).toLocaleString())}</dd>
                  <dt className="text-sm text-gray-600">مجموع قیمت</dt>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-4">

                  <dd className="text-sm font-medium text-green-900"> رایگان</dd>
                  <dt className="flex items-center text-right text-sm text-gray-600">
                    <span>هزینه ارسال</span>
                  </dt>

                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dd className="text-sm font-medium text-green-900"> رایگان</dd>
                  <dt className="flex text-right text-sm text-gray-600">
                    <span>هزینه مالیات</span>
                  </dt>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">

                  {sub > 100 ? <dd className="text-sm font-medium text-gray-900"> تومان {sub}</dd> :
                    <dd className="text-sm font-medium text-gray-900"> تومان {sub}</dd>
                  }
                  <dt className="text-base font-medium text-gray-900">مجموع سفارش</dt>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-red-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  ادامه
                </button>
              </div>
            </section>

          </form>
        }
      </main>

    </div>
  )
}

export default CartScreen