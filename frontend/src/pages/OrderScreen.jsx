import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router-dom'
import Message from '../components/ErrorMessage'
import SuccessMessage from '../components/SuccessMessage'
import Loader from '../components/Loader'
import { getOrderDetails, deliverOrder } from '../actions/orderActions'
import { ORDER_DELIVER_RESET } from '../constants/orderConstants'


// chon az backend data ro daryaft krde bja { count } , { qty } drim pas bara tedad item az qty estefade konid .

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function OrderScreen() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, error, loading } = orderDetails

  const orderDeliver = useSelector(state => state.orderDeliver)
  const { success: successDeliver, loading: loadingDeliver } = orderDeliver

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin


  if (!loading && !error) {
    order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(0)
  }


  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
      
    }
    if (!order || order._id !== Number(id) || successDeliver) {
      dispatch(getOrderDetails(id))
      dispatch({ type: ORDER_DELIVER_RESET })
    }


  }, [dispatch, order, id, successDeliver , navigate])

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }


  return (
    loading ? (
      <Loader />
    ) : error ? (
      <Message children={error} />
    ) : (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Order Details</h1>

          <div className="mt-2 border-b border-gray-200 pb-5 text-sm sm:flex sm:justify-between">
            <dl className="flex">
              <dt className="text-gray-500">Order number&nbsp;</dt>
              <dd className="font-medium text-gray-900">{order._id}</dd>
            </dl>
          </div>

          <div className="mt-8">
            <h2 className="sr-only">Products purchased</h2>

            <div className="space-y-24">
              {order.orderItems.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
                >
                  <div className="sm:col-span-4 md:col-span-5 md:row-span-2 md:row-end-2">
                    <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-50">
                      <img src={`${item.image}`} alt={item.name} className="object-cover object-center" />
                    </div>
                  </div>
                  <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      <Link to={`product/${item.product}`}>{item.name}</Link>
                    </h3>
                    <p className="mt-1 font-medium text-gray-900"> تومان {Number(item.price).toLocaleString()}</p>
                  </div>
                  <div className="sm:col-span-12 md:col-span-7">
                    <dl className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                      <div>
                        <dt className="font-medium text-gray-900">Delivery address</dt>
                        <dd className="mt-3 text-gray-500">
                          <span className="block">{order.shippingAddress.address}</span>
                          <span className="block">{order.shippingAddress.country}</span>
                          <span className="block">{order.shippingAddress.city}</span>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">User Information</dt>
                        <dd className="mt-3 space-y-3 text-gray-500">
                          <p><strong>Name:</strong> {order.user.name}</p>
                          <p><strong>Email:</strong> <a className='  text-indigo-400' href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        </dd>
                      </div>
                    </dl>
                    {/* item price and qty */}
                    <div>
                      <div className="flex flex-1 items-end justify-start pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900"> price : {Number(item.price).toLocaleString()} تومان</p>
                        <div className="ml-4">
                          <label htmlFor="count" className="sr-only">
                            Quantity
                          </label>
                          <p

                            className="rounded-md  text-left text-base font-bold text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                          >
                            Count : {item.qty}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 border-t border-gray-200 mt-6  items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-bold text-gray-900">
                          {Number(item.price).toLocaleString()} X {item.qty} = تومان {Number(item.price).toLocaleString()}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing */}
          <div className="mt-24">
            <h2 className="sr-only">Billing Summary</h2>

            <div className="rounded-lg  bg-gray-50 py-6 px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-0 lg:py-8">
              <dl className="grid grid-cols-1  gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-5 lg:pl-8">
                <dt className="text-gray-500">Payment Method :</dt>
                <dd className="font-medium text-gray-900">{order.paymentMethod}</dd>

                <dt className="text-gray-500">Payment Status :</dt>
                {
                  order.isPaid ? <dd className='font-medium text-green-900'> {`Paid on ${order.paidAt}`} </dd> :
                    <dd className='font-medium text-red-900'> {'Not Paid'} </dd>
                }

                <dt className="text-gray-500">Shipping Status :</dt>
                {
                  order.isDelivered ? <dd className='font-medium text-green-900'>{`Deliver on ${order.deliveredAt}`}</dd> :
                    <dd className='font-medium text-red-900'>{'Not Delivered'}</dd>
                }

                <dt className="text-gray-500">Shipping Status :</dt>
                {userInfo && userInfo.isAdmin && !order.isDelivered &&
                  <dd className='font-medium   text-white'>
                      <button type='button'
                      className='bg-indigo-700 rounded-md border border-transparent hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 p-2 '
                      onClick={deliverHandler}
                      >
                        Make as Deliver 
                      </button>
                  </dd>
                }
              </dl>



              <dl className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-7 lg:mt-0 lg:pr-8">
                <div className="flex items-center justify-between pb-4">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="font-medium text-gray-900">${order.itemsPrice}</dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="text-gray-600">Shipping</dt>
                  <dd className="font-medium text-gray-900">{order.shippingPrice}</dd>
                </div>
                {/* <div className="flex items-center justify-between py-4">
                  <dt className="text-gray-600">Tax</dt>
                  <dd className="font-medium text-gray-900">$6.16</dd>
                </div> */}
                <div className="flex items-center justify-between pt-4">
                  <dt className="font-medium text-gray-900">Order total</dt>
                  <dd className="font-medium text-indigo-600">${order.totalPrice}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      // <div className="bg-gray-50">
      //   <main className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 bg-white lg:px-8">

      //     <div className="mx-auto max-w-2xl lg:max-w-none">
      //       <h1 className=''></h1>
      //       <h1 className="sr-only">Checkout</h1>

      //       <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
      //         <div>

      //           <div className="mt-10 pt-10">
      //             <h2 className="text-lg font-medium text-gray-900">Shipping Address</h2>

      //             <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
      //               <div className="sm:col-span-3">
      //                 <label htmlFor="address" className="block text-sm font-medium text-gray-700">
      //                   Address
      //                 </label>
      //                 <div className="mt-1">
      //                   <p
      //                     className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      //                   >
      //                     {order.shippingAddress.address}
      //                   </p>
      //                 </div>
      //               </div>

      //               <div>
      //                 <label htmlFor="city" className="block text-sm font-medium text-gray-700">
      //                   City
      //                 </label>
      //                 <div className="mt-1">
      //                   <p
      //                     className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      //                   >
      //                     {order.shippingAddress.city}
      //                   </p>
      //                 </div>
      //               </div>

      //               <div>
      //                 <label htmlFor="region" className="block text-sm font-medium text-gray-700">
      //                   State / Province
      //                 </label>
      //                 <p
      //                   className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      //                 >
      //                   {order.shippingAddress.country}
      //                 </p>
      //               </div>

      //               <div>
      //                 <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
      //                   Postal code
      //                 </label>
      //                 <div className="mt-1">
      //                   <p
      //                     className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      //                   >
      //                     {order.shippingAddress.postalCode}
      //                   </p>
      //                 </div>
      //               </div>
      //               <div>
      //                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
      //                   Phone Number
      //                 </label>
      //                 <div className="mt-1">
      //                   <p
      //                     className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      //                   >
      //                     {order.shippingAddress.phone}
      //                   </p>
      //                 </div>
      //               </div>

      //             </div>

      //           </div>

      //           <div className="mt-10 border-t border-gray-200 pt-10">
      //             <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
      //               Payment Method
      //             </label>

      //             <p
      //               className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      //             >
      //               {order.paymentMethod}
      //             </p>

      //           </div>

      //         </div>

      //         {/* Order summary */}
      //         <div className="mt-10 lg:mt-0">
      //           <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      //           {order.orderItems.length === 0 ? <Message children='Your cart is empty' /> :
      //             <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">

      //               <h3 className="sr-only">Items in your cart</h3>
      //               <ul role="list" className="divide-y divide-gray-200">
      //                 {order.orderItems.map((item, index) => (
      //                   <li key={index} className="flex py-6 px-4 sm:px-6">
      //                     <div className="flex-shrink-0">
      //                       <img src={item.image} alt={item.name} className="w-20 rounded-md" />
      //                     </div>

      //                     <div className="ml-6 flex flex-1 flex-col">
      //                       <div className="flex">
      //                         <div className="min-w-0 flex-1">
      //                           <h4 className="text-sm">
      //                             <Link to={`/product/${item.product}`} className="font-medium text-gray-700 hover:text-gray-800">
      //                               {item.name}
      //                             </Link>
      //                           </h4>
      //                           {/* <p className="mt-1 text-sm text-gray-500">{item.color}</p>
      //                           <p className="mt-1 text-sm text-gray-500">{item.size}</p> */}
      //                         </div>

      //                       </div>

      //                       <div className="flex flex-1 items-end justify-between pt-2">
      //                         <p className="mt-1 text-sm font-medium text-gray-900">{item.price}</p>

      //                         <div className="ml-4">
      //                           <label htmlFor="count" className="sr-only">
      //                             Quantity
      //                           </label>
      //                           <p

      //                             className="rounded-md  text-left text-base font-bold text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
      //                           >
      //                             Count : {item.qty}
      //                           </p>
      //                         </div>
      //                       </div>
      //                       <div className="flex flex-1 border-t border-gray-200 mt-6  items-end justify-between pt-2">
      //                         <p className="mt-1 text-sm font-bold text-gray-900">
      //                           {item.price} X {item.qty} = ${(item.price * item.qty).toFixed(2)}

      //                         </p>
      //                       </div>
      //                     </div>
      //                   </li>
      //                 ))}
      //               </ul>
      //               <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
      //                 <div className="flex items-center justify-between">
      //                   <dt className="text-sm">Subtotal</dt>
      //                   <dd className="text-sm font-medium text-gray-900">${order.itemsPrice}</dd>
      //                 </div>
      //                 <div className="flex items-center justify-between">
      //                   <dt className="text-sm">Shipping</dt>
      //                   <dd className="text-sm font-medium text-gray-900">{order.shippingPrice === 0 ? <dd className="text-sm font-medium text-green-900"> Free</dd> : order.shippingPrice}</dd>
      //                 </div>
      //                 {/* <div className="flex items-center justify-between">
      //                   <dt className="text-sm">Taxes</dt>
      //                   <dd className="text-sm font-medium text-gray-900">$5.52</dd>
      //                 </div> */}
      //                 <div className="flex items-center justify-between border-t border-gray-200 pt-6">
      //                   <dt className="text-base font-medium">Total</dt>
      //                   <dd className="text-base font-medium text-gray-900">${order.totalPrice}</dd>
      //                 </div>

      //                 <div className="flex items-center justify-between  pt-6">
      //                   {error && <Message children={error} />}
      //                 </div>

      //               </dl>
      //             </div>
      //           }
      //         </div>
      //       </form>
      //     </div>
      //   </main>
      // </div>
    )






  )
}
