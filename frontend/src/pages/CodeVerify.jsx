import React, { useState, useEffect } from 'react';
import OtpField from 'react-otp-field';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyCode , resendCode } from '../actions/userActions';
import MyTimer from '../components/Timer';


function CodeVerify() {
  const [value, setValue] = useState('');
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin



  useEffect(() => {
    if (userInfo) {
      if (userInfo.verified) {
        navigate('/')
      }
    }
  }, [userInfo, navigate])

  const sumbitHandler = (e) => {
    e.preventDefault()
    dispatch(verifyCode({
      'code': value,
      'phoneNumber': userInfo.username,
    }))
  }

  const time = new Date();
  time.setSeconds(time.getSeconds() + 120);

  const clickHandler = (e) => {
    e.preventDefault()
    setDisable(true)
    dispatch(resendCode())

    setTimeout(() => setDisable(false), 120000)
    console.log('clicked')
    console.log(disable)

  }

  

  return (
    <div className='bg-neutral-100'>
      <div className="fixed top-0 z-0 left-0 hidden h-full mb-10 w-1/2 bg-white lg:block" aria-hidden="true" />
      <div className="fixed top-0 right-0 z-0 hidden h-full w-1/2 bg-red-500 lg:block" aria-hidden="true" />
      <div className="flex min-h-full z-50 flex-col h-[100vh] justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto z-50 sm:w-full sm:max-w-md">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-20 w-auto"
              src="https://s3.ir-thr-at1.arvanstorage.com/zamshop/logo-zm.png"
              alt="Your Company"
            />

          </div>
          <div className="bg-white z-50 m-8 sm:w-full py-8 pt-3 px-4 shadow rounded-2xl sm:px-10">
            <h2 className="mt-6 mb-6 text-center text-3xl font-bold tracking-tight text-gray-900"> کد تایید را وارد کنید </h2>
            <p className=' text-center mb-6'> کد تایید به این شماره ارسال شد {userInfo.username}</p>
            <form onSubmit={sumbitHandler}>
              <OtpField

                value={value}
                onChange={setValue}
                numInputs={4}
                onChangeRegex={/^([0-9]{0,})$/}
                autoFocus
                inputProps={{ className: 'block w-full appearance-none rounded-full border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:bg-red-50 focus:ring-red-500 sm:text-sm text-center ' }}

                classNames=' flex gap-2'
              />

              <button
                type="submit"
                className="flex mt-6 w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-normal font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                تایید
              </button>
            </form>

            <p className=' mt-4'> ؟کد را دریافت نکردید {disable ?  <span><MyTimer expiryTimestamp={time} /></span> :
              <button className=' disabled:text-gray-500 group' onClick={clickHandler} disabled={disable} >

                <p className='text-red-600 underline group-disabled:cursor-default group-disabled:text-gray-500 cursor-pointer inline-block' > کلیک کنید  </p>
              </button>
            }   </p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeVerify