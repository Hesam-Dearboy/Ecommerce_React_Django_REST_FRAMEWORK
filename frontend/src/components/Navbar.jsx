
import { Fragment, useRef, useState } from 'react'
import { Dialog, Popover, Tab, Transition, Menu } from '@headlessui/react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'
import { Link } from 'react-router-dom'

const navigation = {
  categories: [
    {
      name: 'انواع رنگ',
      featured: [
        {
          name: 'اسپری های الوان',
          href: '#',
          imageSrc: 'https://zamshop.s3.ir-thr-at1.arvanstorage.ir/SprayAlvanPolimax.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'اسپری متالیک',
          href: '#',
          imageSrc: 'https://zamshop.s3.ir-thr-at1.arvanstorage.ir/1adbab4b-09b1-4eec-8366-379a8e817cde.png',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
        {
          name: 'انواع رنگ و بتونه فوری',
          href: '#',
          imageSrc: 'https://zamshop.s3.ir-thr-at1.arvanstorage.ir/rangFori.jpeg',
          imageAlt: 'Model wearing minimalist watch with black wristband and white watch face.',
        },
        {
          name: 'رنگ های پلی اورتان',
          href: '#',
          imageSrc: 'https://zamshop.s3.ir-thr-at1.arvanstorage.ir/%D8%B1%D9%86%DA%AF-%D9%BE%D9%84%DB%8C-%D8%A7%D9%88%D8%B1%D8%AA%D8%A7%D9%86.jpeg',
          imageAlt: 'Model opening tan leather long wallet with credit card pockets and cash pouch.',
        },
        {
          name: 'رنگ های اتومبیلی',
          href: '#',
          imageSrc: 'https://zamshop.s3.ir-thr-at1.arvanstorage.ir/mashinCategoryImage.png',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'رنگ های صنعتی',
          href: '#',
          imageSrc: 'https://zamshop.s3.ir-thr-at1.arvanstorage.ir/rangSanaati.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
      ],
    }
     
    ,

    {
      name: 'انواع تینر و بتونه',
      featured: [
        {
          name: 'تینر فوری',
          href: '#',
          imageSrc: 'https://zamshop.s3.ir-thr-at1.arvanstorage.ir/98d9c102-ce21-4c16-a5a6-26cf8c4084d6.png',
          imageAlt: 'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
        },
        {
          name: 'بتونه سنگی',
          href: '#',
          imageSrc: 'https://zamshop.s3.ir-thr-at1.arvanstorage.ir/d2c9cd2c-9f8f-410c-8733-d80d3eab4706-2.png',
          imageAlt: 'Model wearing light heather gray t-shirt.',
        },
        {
          name: 'انواع ضدزنگ و قیر',
          href: '#',
          imageSrc: 'https://zamshop.s3.ir-thr-at1.arvanstorage.ir/%D8%B6%D8%AF-%D8%B2%D9%86%DA%AF-%D8%A8%D8%A7%D8%B1%D8%B4-1.jpeg',
          imageAlt:
            'Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.',
        },
      ],
    },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }


  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const cartItemCounter = cartItems.length

  console.log(cartItemCounter)

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const buttonRef = useRef()

  return (
    <div className="bg-white sticky top-0 z-[10000]">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[20000] lg:hidden" onClose={setOpen}>
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
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'text-red-600 border-red-600' : 'text-gray-900 border-transparent',
                              'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="space-y-12 px-4 py-6">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative">
                              <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                              </div>
                              <Link onClick={() => setOpen(false)} to={`/category/?categoryName=${item.name}&page=1`} className="mt-6 block text-sm font-medium text-gray-900">
                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                {item.name}
                              </Link>
                              <p aria-hidden="true" className="mt-1 text-sm text-gray-500">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>


                <div className="space-y-6 block  border-t border-gray-200 py-6 px-4">
                  <Link
                    to='/profile'
                    className='bg-white text-gray-900'
                    onClick={() => setOpen(false)}
                  >
                    مشخصات اکانت <p>{`${userInfo ? `(${userInfo.name})` : ''}`}</p>
                  </Link>
                </div>
                <div className='space-y-6 block   border-gray-200 px-4'>
                  <button
                    onClick={logoutHandler}
                    type="submit"
                    className='bg-white text-gray-900'
                  >
                    خارج شدن از اکانت
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative">
        <nav aria-label="Top">
          {/* Top navigation */}
          {!userInfo ?
            <div className="bg-gray-900">
              <div className="mx-auto flex h-10  items-center justify-end px-4 sm:px-6 lg:px-8">
                {/* Currency selector */}
                <div className="flex items-center space-x-6">
                  <Link to="/login" className="text-sm font-medium text-white hover:text-gray-100">
                    ورود
                  </Link>
                  <Link to="/register" className="text-sm font-medium text-white hover:text-gray-100">
                    یک حساب کاربری بسازید
                  </Link>
                </div>
              </div>
            </div> :
            <></>
          }


          {/* Secondary navigation */}
          <div className="bg-slate-100">
            <div className="mx-auto  px-4 sm:px-6 lg:px-8">
              <div className="">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:flex-1 lg:items-center">
                    <Link className=' flex items-center' to='/'>
                      <span className="sr-only">Your Company</span>
                      <img
                        className=" w-[4rem] "
                        src="https://s3.ir-thr-at1.arvanstorage.com/zamshop/logo-zm.png"
                        alt="logo image"
                      />


                    </Link>
                  </div>

                  <div className="hidden h-full lg:flex">
                    {/* Flyout menus */}
                    <Popover.Group className="inset-x-0 z-[1000] bottom-0 px-4">
                      <div className="flex h-full justify-center space-x-8">
                        {navigation.categories.map((category) => (
                          <Popover ref={buttonRef} key={category.name} className="flex">
                            {({ open }) => (
                              <>
                                <div className="relative flex">
                                  <Popover.Button
                                    className={classNames(
                                      open
                                        ? 'border-red-600 text-red-600'
                                        : 'border-transparent text-gray-700 hover:text-gray-800',
                                      'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                    )}

                                  >
                                    {category.name}
                                  </Popover.Button>
                                </div>

                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-200"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="transition ease-in duration-150"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                    <div className="absolute inset-0 top-1/2 bg-slate-100 shadow" aria-hidden="true" />

                                    <div className="relative bg-slate-100">
                                      <div className="mx-auto px-8">
                                        <div className="grid grid-cols-7 gap-y-10 gap-x-8 py-16">
                                          {category.featured.map((item) => (
                                            <div key={item.name} className="group relative">
                                              <div className="aspect-w-1 aspect-h-1 overflow-hidden  rounded-md bg-gray-100 group-hover:opacity-75">
                                                <img
                                                  src={item.imageSrc}
                                                  alt={item.imageAlt}
                                                  className="object-cover object-center"
                                                />
                                              </div>

                                              <Popover.Button as={Link} to={`/category/?categoryName=${item.name}&page=1`} className="mt-4 block font-medium group-hover:text-red-600 text-right text-gray-900">
                                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                {item.name}

                                              </Popover.Button>
                                              <p aria-hidden="true" className="mt-1 text-right">
                                                همین حالا خرید کنید
                                              </p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </Popover.Panel>
                                </Transition>
                              </>
                            )}
                          </Popover>
                        ))}
                      </div>
                    </Popover.Group>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 rounded-md bg-slate-100 p-2 text-gray-400"
                      onClick={() => setOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Search */}
                    <Link to="/search/" className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                    </Link>
                  </div>

                  {/* Logo (lg-) */}
                  <Link to="/" className="lg:hidden">
                    <span className="sr-only">Your Company</span>
                    <img
                      src="https://s3.ir-thr-at1.arvanstorage.com/zamshop/logo-zm.png"
                      alt=""
                      className="w-[4rem]"
                    />
                  </Link>
                  <div className="flex flex-1 items-center justify-end">
                    <Link to="/search/" className="ml-2 hidden lg:block p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                    </Link>
                    <div className="flex items-center lg:ml-8">
                      {userInfo ? (
                        <Menu as="div" className="relative hidden lg:inline-block text-left">
                          <div>
                            <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                              {userInfo.name}
                              <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                            </Menu.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="px-4 py-3">
                                <p className="text-sm">Signed in as</p>
                                <p className="truncate text-sm font-medium text-gray-900">{userInfo.name}</p>
                              </div>
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to='/profile'
                                      className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                      )}
                                    >
                                      Account settings
                                    </Link>
                                  )}
                                </Menu.Item>
                              </div>
                              <div className="py-1">
                                <form method="POST" action="#">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        onClick={logoutHandler}
                                        type="submit"
                                        className={classNames(
                                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                          'block w-full px-4 py-2 text-left text-sm'
                                        )}
                                      >
                                        Sign out
                                      </button>
                                    )}
                                  </Menu.Item>
                                </form>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>

                      ) :
                        <div><Link to='/login' className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block">
                          <UserIcon className="h-6 w-6" aria-hidden="true" />
                        </Link>
                          <Link to='/login' className="p-2 text-gray-400 hover:text-gray-500 lg:hidden">
                            <span className="sr-only">login</span>
                            <UserIcon className="h-6 w-6" aria-hidden="true" />
                          </Link></div>
                      }
                      {userInfo && userInfo.isAdmin && (

                        <Menu as="div" className="relative hidden mx-4 lg:inline-block text-left">
                          <div>
                            <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                              Admin
                              <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                            </Menu.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="px-4 py-3">
                                <p className="text-sm">Signed in as</p>
                                <p className="truncate text-sm font-medium text-gray-900">Admin</p>
                              </div>
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to='/admin/userList'
                                      className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                      )}
                                    >
                                      users
                                    </Link>
                                  )}
                                </Menu.Item>
                                <div className="py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <Link
                                        to='/admin/productlist'
                                        className={classNames(
                                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                          'block px-4 py-2 text-sm'
                                        )}
                                      >
                                        product List
                                      </Link>
                                    )}
                                  </Menu.Item>
                                </div>
                                <div className=' py-1'>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <Link
                                        to='/admin/orderlist'
                                        className={classNames(
                                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                          'block px-4 py-2 text-sm'
                                        )}
                                      >
                                        order List
                                      </Link>
                                    )}
                                  </Menu.Item>
                                </div>
                              </div>

                            </Menu.Items>
                          </Transition>
                        </Menu>
                      )}
                      {/* Cart */}
                      <div className="ml-4 flow-root lg:ml-8">
                        <Link to='/cart' className="group -m-2 flex items-center p-2">
                          <ShoppingBagIcon
                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-medium items-center justify-center flex py-1 px-2  rounded-full bg-red-600 text-white group-hover:text-gray-800">
                            {cartItemCounter}
                          </span>
                          
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
