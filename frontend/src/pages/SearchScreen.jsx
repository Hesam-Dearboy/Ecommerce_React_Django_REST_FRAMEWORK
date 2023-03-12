import { useEffect, Fragment, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Product from '../components/product'
import Loader from '../components/Loader'
import Message from '../components/ErrorMessage'
import Paginate from '../components/Paginate'
import Footer from '../components/Footer'
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { PlusIcon, ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'


const categories = [
  'اسپری های الوان',
  'اسپری متالیک',
  'انواع رنگ و بتونه فوری',
  'رنگ های پلی اورتان',
  'رنگ های اتومبیلی',
  'رنگ های صنعتی',
]

const brands = [
  'polimax',
  'bitak',
]



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}





function SearchScreen() {
  const dispatch = useDispatch()
  let navigate = useNavigate()
  let location = useLocation()



  const [category, setCategory] = useState(null)
  const [brand, setBrand] = useState(null)

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  console.log(category)
  console.log(typeof category)

  console.log(brand)
  console.log(typeof brand)


  const [searchKeyword, setSearchKeyword] = useState('')

  const productList = useSelector(state => state.productList)
  const { error, loading, products, page, pages } = productList




  let keyword = location.search
  const pageUrl = Number(keyword.split('page=')[1])



  useEffect(() => {
    if (pageUrl) {
      dispatch(listProducts(searchKeyword, pageUrl, brand, category))
    } else {
      dispatch(listProducts(searchKeyword, 1, brand, category))
    }


  }, [dispatch, searchKeyword, location, category, brand])


  const sumbitHandler = (e) => {
    e.preventDefault()
    if (searchKeyword) {
      dispatch(listProducts(searchKeyword))
    } else {
      navigate(location)
    }
  }


  return (
    <div className="  min-h-screen  bg-slate-200">
      
      <form className=" bg-slate-100  px-4 py-2 " onSubmit={sumbitHandler}>
        <div className='w-full max-w-full flex justify-center mt-8 mb-4'>
          <button type='sumbit' className=' float-left p-2 rounded-lg rounded-r-none border-transparent bg-red-600 py-3 md:px-8 px-3 text-sm font-medium text-white hover:bg-red-700 focus:outline-none disabled:bg-gray-500 focus:ring-2 focus:ring-red-600 '>جستجو</button>
          <input type="text"
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder='نام محصول مورد نظر خود را بنویسید'
            className='w-full text-right focus:ring-0 border-[2px] group  rounded-lg max-w-7xl border-l-0 rounded-l-none border-gray-600'

          />
        </div>
      </form>

      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog as="div" className="relative  z-[10000]  lg:hidden" onClose={setMobileFiltersOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-slate-200 py-4 pb-6 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="my-2 p-2">

                  <div key={1} className={'pt-4'}>
                    <fieldset>
                      <legend className="block text-lg font-medium text-right text-red-600">دسته بندی</legend>
                      <Listbox value={category} onChange={setCategory}>
                        <div className="relative mt-1">
                          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            {category != null ?
                              <span className="block truncate">{category}</span> : category == null ?
                                <span className="block truncate">دسته بندی مدنظر خود را انتخاب کنید</span> : null
                            }

                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>
                          <Transition

                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full z-50 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">

                              <Listbox.Option
                                key={null}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                  }`
                                }
                                value={null}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                        }`}
                                    >
                                      همه دسته بندی ها
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                      </span>
                                    ) : null}


                                  </>
                                )}
                              </Listbox.Option>



                              {categories.map((cat) => (
                                <Listbox.Option
                                  key={cat}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                    }`
                                  }
                                  value={cat}
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                          }`}
                                      >
                                        {cat}
                                      </span>
                                      {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </fieldset>
                  </div>

                  <div key={2} className={'pt-5'}>
                    <fieldset>
                      <legend className="block text-lg font-medium text-right text-red-600"> برند </legend>
                      <Listbox value={brand} onChange={setBrand}>
                        <div className="relative mt-1">
                          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            {brand != null ?
                              <span className="block truncate">{brand}</span> : brand == null ?
                                <span className="block truncate"> برند مدنظر خود را انتخاب کنید</span> : null
                            }
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>
                          <Transition

                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md z-50 bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">

                              <Listbox.Option
                                key={null}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                  }`
                                }
                                value={null}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                        }`}
                                    >
                                      همه برند ها
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                      </span>
                                    ) : null}


                                  </>
                                )}
                              </Listbox.Option>


                              {brands.map((brand) => (
                                <Listbox.Option
                                  key={brand}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                    }`
                                  }
                                  value={brand}
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                          }`}
                                      >
                                        {brand}
                                      </span>
                                      {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                      ) : null}


                                    </>
                                  )}
                                </Listbox.Option>
                              ))}



                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </fieldset>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <main className="mx-auto min-h-screen max-w-2xl px-4  lg:max-w-[1560px] lg:px-8">
        <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">

          <aside className=' bg-slate-50 p-4 rounded-lg shadow-lg'>
            <h2 className="sr-only">Filters</h2>

            <button
              type="button"
              className="inline-flex items-center lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="text-sm font-medium text-gray-700">Filters</span>
              <PlusIcon className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            </button>

            <div className="hidden lg:block">
              <form className="space-y-10 divide-y divide-gray-200">

                <div key={1} className={'pt-10'}>
                  <fieldset>
                    <legend className="block text-lg font-medium text-right text-gray-900">دسته بندی</legend>
                    <Listbox value={category} onChange={setCategory}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          {category != null ?
                            <span className="block truncate">{category}</span> : category == null ?
                              <span className="block truncate">دسته بندی مدنظر خود را انتخاب کنید</span> : null
                          }

                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition

                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full z-50 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">

                            <Listbox.Option
                              key={null}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                }`
                              }
                              value={null}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                      }`}
                                  >
                                    همه دسته بندی ها
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}


                                </>
                              )}
                            </Listbox.Option>

                            {categories.map((cat) => (
                              <Listbox.Option
                                key={cat}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                  }`
                                }
                                value={cat}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                        }`}
                                    >
                                      {cat}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}


                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </fieldset>
                </div>


                <div key={2} className={'pt-5'}>
                  <fieldset>
                    <legend className="block text-lg font-medium text-right text-gray-900"> برند </legend>
                    <Listbox value={brand} onChange={setBrand}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          {brand != null ?
                            <span className="block truncate">{brand}</span> : brand == null ?
                              <span className="block truncate"> برند مدنظر خود را انتخاب کنید</span> : null
                          }
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition

                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">

                            <Listbox.Option
                              key={null}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                }`
                              }
                              value={null}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                      }`}
                                  >
                                    همه برند ها
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}


                                </>
                              )}
                            </Listbox.Option>


                            {brands.map((brand) => (
                              <Listbox.Option
                                key={brand}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                  }`
                                }
                                value={brand}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                        }`}
                                    >
                                      {brand}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                      </span>
                                    ) : null}


                                  </>
                                )}
                              </Listbox.Option>
                            ))}



                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </fieldset>
                </div>

              </form>
            </div>
          </aside>


          <section aria-labelledby="product-heading" className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
            <h2 id="product-heading" className="sr-only">
              Products
            </h2>

            <div>

              {loading ? <Loader />
                : error ? <Message children={error} />
                  : <div className="grid grid-cols-2 gap-y-4 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-4" >
                    {
                      products.map(product => (
                        <div
                          key={product._id}

                          className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                        >
                          <Product product={product} />
                        </div>
                      ))
                    }



                  </div>}

              <Paginate page={page} pages={pages} keyword={keyword} isSearch={true} />


            </div>
          </section>

        </div>

      </main>
      <Footer/>
    </div>
  )
}

export default SearchScreen