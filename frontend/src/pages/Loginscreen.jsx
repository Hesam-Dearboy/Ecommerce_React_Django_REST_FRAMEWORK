import React, { useState } from 'react'
import { useEffect } from 'react'
import { login } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/ErrorMessage'
import Loader from '../components/Loader'
import { Link, redirect, useNavigate, useLocation } from 'react-router-dom'

function Loginscreen() {
  const navigate = useNavigate()
  const location = useLocation()

  const dispatch = useDispatch()

  const redirect = location.search ? location.search.split('=')[1] : '/'
  console.log(redirect)

  const userLogin = useSelector(state => state.userLogin)
  const { error, loading, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const sumbitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }



  return (
    <div>
      <div className="flex min-h-full flex-col h-[80vh] justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-20 w-auto"
            src="https://s3.ir-thr-at1.arvanstorage.com/zamshop/logo-zm.png"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">وارد حساب خود شوید</h2>
        </div>



        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          {error && < Message children={error} />}
          {loading && <Loader />}
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={sumbitHandler} >
              <div>
                <label htmlFor="email" className="block text-right text-sm font-medium text-gray-700">
                  شماره موبایل
                </label>
                <div className="mt-1">
                  <input
                    id="tel"
                    type="tel"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='شماره خود را وارد کنید'

                    className="block w-full text-right appearance-none rounded-md border border-gray-300 px-3 py-2  bg-red-100 placeholder-gray-400 shadow-sm focus:border-red-600 focus:outline-none focus:ring-red-600 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-right text-sm font-medium text-gray-700">
                  رمز عبور
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='رمز عبور را وارد کنید'
                    type="password"
                    autoComplete="current-password"
                    className="block w-full text-right appearance-none rounded-md border border-gray-300 px-3 py-2  bg-red-100 placeholder-gray-400 shadow-sm focus:border-red-600 focus:outline-none focus:ring-red-600 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-red-600 hover:text-red-500">
                    رمز عبور خود را فراموش کرده اید ؟
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Login
                </button>
              </div>
            </form>

            <p className="mt-4 text-center  text-sm  text-gray-600">
              کاربر جدید هستید ؟{' '}

              <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="font-medium text-red-600 hover:text-red-500">
                حساب کاربری خود را بسازید
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Loginscreen