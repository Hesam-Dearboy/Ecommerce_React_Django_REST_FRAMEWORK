import {  Tab  } from '@headlessui/react'
import Rating from '../components/Rating'
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/ErrorMessage'
import UserRating from '../components/UserRating'
import Product from '../components/product'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductScreen() {

  const [count, setCount] = useState(1)

  const navigate = useNavigate()

  console.log(count)



  const { _id } = useParams()
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin


  console.log(_id)

  const addToCartHandler = () => {
    navigate(`/cart/${_id}?qty=${count}`)
 }



  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product: productApi } = productDetails

  const productList = useSelector(state => state.productList)
    const { error: productListError, loading : productListLoading , products } = productList



  useEffect(() => {
    dispatch(listProductDetails(_id))
    dispatch(listProducts())
  }, [dispatch])

  console.log(productApi)



  return (
    <div className="bg-slate-50">

      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Product */}
          {loading ? <Loader /> : error ? <Message> {error} </Message>
            : (
              <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                {/* Image gallery */}
                <Tab.Group as="div" className="flex flex-col-reverse">

                  <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                    <Tab.List className="grid grid-cols-4 gap-6">
                        <Tab
                          key={1}
                          className="relative flex h-24 cursor-pointer items-center justify-center rounded-md shadow-lg bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                        >
                          {({ selected }) => (
                            <>
                              <span className="sr-only"> {productApi.name} </span>
                              <span className="absolute inset-0 overflow-hidden rounded-md">
                                <img src={productApi.image} alt="" className="h-full w-full object-cover object-center" />
                              </span>
                              <span
                                className={classNames(
                                  selected ? 'ring-red-500' : 'ring-transparent',
                                  'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </Tab>

                        <Tab
                          key={2}
                          className="relative flex h-24 shadow-lg cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                        >
                          {({ selected }) => (
                            <>
                              <span className="sr-only"> {productApi.name} </span>
                              <span className="absolute inset-0 overflow-hidden rounded-md">
                                <img src={productApi.image} alt="" className="h-full w-full object-cover object-center" />
                              </span>
                              <span
                                className={classNames(
                                  selected ? 'ring-red-500' : 'ring-transparent',
                                  'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </Tab>

                        <Tab
                          key={3}
                          className="relative flex h-24 shadow-lg cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                        >
                          {({ selected }) => (
                            <>
                              <span className="sr-only"> {productApi.name} </span>
                              <span className="absolute inset-0 overflow-hidden rounded-md">
                                <img src={productApi.image} alt="" className="h-full w-full object-cover object-center" />
                              </span>
                              <span
                                className={classNames(
                                  selected ? 'ring-red-500' : 'ring-transparent',
                                  'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </Tab>
                    </Tab.List>
                  </div>
                  <Tab.Panels className="aspect-w-1 shadow-lg bg-white rounded-lg aspect-h-1 w-full">
                    <Tab.Panel key={1}>
                      <img
                        src={productApi.image}
                        alt={productApi.image}
                        className="h-full w-full object-cover object-center rounded-3xl sm:rounded-lg"
                      />
                    </Tab.Panel>
                    <Tab.Panel key={2}>
                      <img
                        src={productApi.image}
                        alt={productApi.image}
                        className="h-full w-full object-cover object-center rounded-3xl sm:rounded-lg"
                      />
                    </Tab.Panel>
                    <Tab.Panel key={3}>
                      <img
                        src={productApi.image}
                        alt={productApi.image}
                        className="h-full w-full object-cover object-center rounded-3xl sm:rounded-lg"
                      />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>

                {/* Product info */}
                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                  <h1 className="text-3xl font-bold text-right tracking-tight text-gray-900">{productApi.name}</h1>

                  <div className="mt-3">
                    <h2 className="sr-only">Product information</h2>
                    <p className="text-3xl tracking-tight text-right mt-8 text-gray-900"> تومان {Number(productApi.price).toLocaleString()}</p>
                  </div>

                  {/* Reviews */}
                  <div className="mt-3">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                      <Rating value={productApi.rating} color='rgb(255,215,0)' />
                      <p className=" text-sm text-gray-500">{Number(productApi.rating).toFixed()} out of 5 stars</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="sr-only"></h3>

                    <div
                      className="space-y-6 text-base text-right text-gray-700"
                      dangerouslySetInnerHTML={{ __html: productApi.description }}
                    />
                  </div>

                  <form className="mt-6">
                    {/* Colors */}
                    <div>
                      <h3 className="text-sm text-right text-gray-600">رنگ</h3>

                      <ul role="list" className="mt-auto flex items-center justify-end space-x-3 pt-2">
                        <li
                          key={productApi.color}
                          className="h-8 w-8 rounded-full border-4 border-gray-700 border-opacity-70"
                          style={{ backgroundColor: productApi.color }}
                        >
                        </li>
                      </ul>

                    </div>

                    {/* Count */}

                    <div className=' mt-6'>
                      <h3 className="text-sm text-right text-gray-600">تعداد</h3>
                      <div className=' flex justify-between'>
                        <div> </div>
                      <select
                        value={count}
                        onChange={(e) => setCount(e.target.value)}
                        className="max-w-full mt-3 rounded-md border border-gray-300 py-1.5 text-left text-base self-end font-medium leading-5 text-gray-700 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm"
                      >
                        {
                          [...Array(productApi.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))
                        }
                      </select></div>


                    </div>

                    <div className="mt-10 flex">
                      <button
                        type="submit"
                        onClick={addToCartHandler}
                        className="flex   items-center justify-center rounded-md border border-transparent bg-red-600 py-3 px-8 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50 w-full"
                      >
                        Add to bag
                      </button>

                      {/* <button
                    type="button"
                    className="ml-4 flex items-center justify-center rounded-md py-3 px-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                    <span className="sr-only">Add to favorites</span>
                  </button> */}
                    </div>
                  </form>
                </div>
              </div>)
          }


          <div className="w-full max-w-7xl px-2 py-16 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex space-x-1 justify-end border-b-2 ">

                <Tab
                  key={1}
                  className={({ selected }) =>
                    classNames(
                      'w-20  py-2.5 text-sm font-medium leading-5 text-red-700',
                      selected
                        ? ' border-b-2 border-red-600 text-red-600 '
                        : 'text-black'
                    )
                  }
                >
                  توضیحات
                </Tab>

                {userInfo ?
                  <Tab
                    key={2}
                    className={({ selected }) =>
                      classNames(
                        'w-20  py-2.5 text-sm font-medium leading-5 text-red-700',
                        selected
                          ? ' border-b-2 border-red-600 text-red-600 '
                          : 'text-black'
                      )
                    }
                  >
                    نظرسنجی
                  </Tab> : <></>}


              </Tab.List>
              <Tab.Panels className="mt-2">
                <Tab.Panel
                  key={1}
                  className={classNames(
                    ' p-3'
                  )}
                >
                  <p className=' text-right ' >{productApi.description}</p>
                </Tab.Panel>


                <Tab.Panel
                  key={2}
                  className={classNames(
                    'p-10 flex justify-center '
                  )}
                >
                  <UserRating id={_id} />
                </Tab.Panel>


              </Tab.Panels>
            </Tab.Group>
          </div>


          <section aria-labelledby="related-heading" className="mt-10 border-t  border-gray-200 py-16 px-4 sm:px-0">
            <h2 id="related-heading" className="text-xl w-full text-right font-bold text-gray-900">
              محصولات مرتبط
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {productListLoading ? <Loader /> :
                                    productListError ? <Message children={error} /> :
                                        <>

                                            {
                                                products.slice(0, 4).map(product => (
                                                   

                                                        <Product product={product} />
                                                   
                                                ))
                                            }
                                        </>
                                }
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
