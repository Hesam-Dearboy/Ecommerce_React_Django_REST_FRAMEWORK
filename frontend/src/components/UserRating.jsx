import React, { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { createReviewProduct } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/porductConstants'
import Loader from './Loader'
import SuccessMessage from './SuccessMessage'
import Message from './ErrorMessage'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function RatingSumbit({id}) {
  const dispatch = useDispatch()

  const [selectedRate, setSelectedRate] = useState(0)

  console.log(id)

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const { loading: loadingProductReview, error: errorProductReview, success: successProductReview } = productReviewCreate

  const numbers = [1, 2, 3, 4, 5]

  const sumbitHandler = (e) => {

    e.preventDefault()
    dispatch(createReviewProduct(
      id,
      {
        selectedRate,
      }
    ))

    selectedRate ? console.log(` nazar shoma sabt shod : ${selectedRate}`) :
      console.log(`aval entekhab knid`)

  }

  useEffect(() => {
    if (successProductReview) {
      setSelectedRate(0)
      

    }


  }, [dispatch, successProductReview])

  console.log(selectedRate)

  return (

    <div className=' from-slate-700 p-4 max-w-[450px] rounded-3xl bg-gradient-to-t flex-col to-slate-200 items-center text-center justify-center  '>


      {successProductReview ? <SuccessMessage >Review Submitted</SuccessMessage> :

        loadingProductReview ? <Loader /> :

        errorProductReview ? <Message children={errorProductReview} /> :
          <>
            <div className=' rounded-full flex items-center justify-center bg-slate-400 ring-2 ring-slate-300 h-11 w-11 '>
              <i className=' fa fa-star relative text-lg text-red-600' />
            </div>

            <h1 className=' mt-8 text-xl text-right text-black'>
              نظرتان درباره این محصول چیست ؟
            </h1>

            <h1 className=' mt-5  text-slate-800 text-right'>
              لطفا اجازه دهید بدانیم در قبال اعتماد شما به فروشگاه چگونه عمل کردیم

            </h1>



            <RadioGroup as='form' onSubmit={sumbitHandler} value={selectedRate} onChange={setSelectedRate} className=' button-container mt-12 flex-col justify-center items-center gap-4 '>
              <div className=' flex justify-center gap-4 '>
                {numbers.map((number) => (
                  <RadioGroup.Option key={number} value={number} className={() => classNames(selectedRate == number ? ' ring-red-500  bg-red-700  text-white flex  text-center items-center justify-center  rounded-full md:h-16 md:w-16 w-12 h-12 ' : ' bg-gray-800 focus:ring-red-500  hover:bg-red-700  text-white flex hover:cursor-pointer text-center items-center justify-center  rounded-full md:h-16 md:w-16 w-12 h-12 ')}>
                    {number}
                  </RadioGroup.Option>
                ))}</div>

              <button type='sumbit' className=' bg-slate-300 mt-8 w-full h-10 hover:bg-red-600 hover:text-white rounded-full items-center  '>
                تایید
              </button>
            </RadioGroup>
          </>

      }



    </div>
  )
}

export default RatingSumbit