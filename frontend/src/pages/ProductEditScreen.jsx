import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { Switch } from '@headlessui/react'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/porductConstants'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/ErrorMessage'
import Loader from '../components/Loader'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ColorPicker from 'react-color-picker'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import {categories} from '../category/categories'
import {HexColorPicker} from 'react-colorful'



export default function ProductEditScreen() {
    const navigate = useNavigate()
    const { id } = useParams()
    const dispatch = useDispatch()




    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails


    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate



    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('اسپری های الوان')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [color, setColor] = useState('')
    const [uploading, setUploading] = useState(false)





    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        } else {
            if (!product.name || product._id !== Number(id)) {
                dispatch(listProductDetails(id))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
                setColor(product.color)

            }
        }



    }, [id, product, navigate, dispatch, successUpdate])

    const sumbitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: id,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
            color
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', id)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/products/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }


    return (
        <div className="h-full">
            <main className="mx-auto justify-center items-center max-w-7xl pb-10 lg:py-12 lg:px-8">
                <Link className=' my-4 underline' to={'/admin/productlist'}>
                    Go back
                </Link>
                <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
                    {loadingUpdate && <Loader />}
                    {errorUpdate && <Message children={errorUpdate} />}

                    <section aria-labelledby="payment-details-heading">
                        {loading ? <Loader /> : error ? <Message children={error} />
                            : (
                                <form method="POST" onSubmit={sumbitHandler} >
                                    <div className="shadow sm:overflow-hidden sm:rounded-md">
                                        <div className="bg-white py-6 px-4 sm:p-6">
                                            <div>
                                                <h2 id="payment-details-heading" className="text-lg font-medium leading-6 text-gray-900">
                                                    User details
                                                </h2>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Edit User Acount information.
                                                </p>
                                            </div>

                                            <div className="mt-6 grid grid-cols-4 gap-6">
                                                <div className="col-span-4 sm:col-span-2">
                                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                        Name
                                                    </label>
                                                    <input
                                                        id="name"
                                                        type="name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        autoComplete="text"
                                                        placeholder='Enter your Name'
                                                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                                                    />
                                                </div>


                                                <div className="col-span-4 sm:col-span-2">
                                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                                        Price
                                                    </label>
                                                    <input
                                                        id="price"
                                                        type="number"
                                                        value={price}
                                                        onChange={(e) => setPrice(e.target.value)}
                                                        autoComplete="text"
                                                        placeholder='Enter Price'
                                                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                                                    />
                                                </div>






                                                <div className="col-span-4 sm:col-span-2">
                                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                                        Image
                                                    </label>
                                                    <input
                                                        id="image"
                                                        type="text"
                                                        value={image}
                                                        onChange={(e) => setImage(e.target.value)}
                                                        placeholder='Enter image'
                                                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                                                    />

                                                    <input
                                                        id="image-file"
                                                        type="file"
                                                        onChange={uploadFileHandler}
                                                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                                                    />
                                                    {uploading && <Loader />}
                                                </div>



                                                <div className="col-span-4 sm:col-span-2">
                                                    <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                                                        brand
                                                    </label>
                                                    <input
                                                        id="brand"
                                                        type="text"
                                                        value={brand}
                                                        onChange={(e) => setBrand(e.target.value)}
                                                        autoComplete="text"
                                                        placeholder='Enter brand'
                                                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                                                    />
                                                </div>




                                                <div className="col-span-4 sm:col-span-2">
                                                    <label htmlFor="count" className="block text-sm font-medium text-gray-700">
                                                        Count
                                                    </label>
                                                    <input
                                                        id="countinstock"
                                                        type="number"
                                                        value={countInStock}
                                                        onChange={(e) => setCountInStock(e.target.value)}
                                                        autoComplete="text"
                                                        placeholder='Enter stock count'
                                                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                                                    />
                                                </div>




                                                <div className="col-span-4 sm:col-span-2">
                                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                                        category
                                                    </label>
                                                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                                        <option key={1} value={'اسپری های الوان'}>
                                                        اسپری های الوان
                                                        </option>
                                                        <option key={2} value={'انواع رنگ و بتونه فوری'}>
                                                        انواع رنگ و بتونه فوری 
                                                        </option>
                                                        <option key={3} value={'رنگ های پلی اورتان'}>
                                                        رنگ های پلی اورتان
                                                        </option>
                                                        <option key={4} value={'اسپری متالیک'}>
                                                        اسپری متالیک 
                                                        </option>
                                                        <option key={5} value={'رنگ های اتومبیلی'}>
                                                        رنگ های اتومبیلی 
                                                        </option>
                                                        <option key={6} value={'رنک های صنعتی'}>
                                                        رنک های صنعتی 
                                                        </option>
                                                        <option key={7} value={'تینر فوری'}>
                                                        تینر فوری 
                                                        </option>
                                                        <option key={8} value={'انواع ضد زنگ و قیر'}>
                                                        تینر فوری 
                                                        </option>
                                                    </select>
                                                </div>

                                                <div className="col-span-4 sm:col-span-2">
                                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                                        description
                                                    </label>
                                                    <textarea
                                                        id="description"
                                                        type="text"
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        autoComplete="text"
                                                        placeholder='Enter description'
                                                        className="mt-1 h-min  overflow-scroll block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                                                    />
                                                </div>


                                                <div className="col-span-4 sm:col-span-2">
                                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-4">
                                                        انتخاب رنگ
                                                    </label>
                                                    <HexColorPicker color={color} onChange={setColor}/>
                                                    <p>{color}</p>
                                                </div>




                                                {/* <div className="col-span-4 sm:col-span-2">
                                                        <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                                                            color
                                                        </label>
                                                        <ColorPicker
                                                            id="color"
                                                            value={color}
                                                            onChange={(e) => setDescription(e.target.value)}
                                                            className="mt-1 h-min  overflow-scroll block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                                                        />
                                                    </div> */}



                                                {/* Color */}




                                            </div>
                                            <div className="bg-gray-50 my-4 px-4 py-3 text-right sm:px-6">
                                                <button
                                                    type="submit"

                                                    className="inline-flex justify-center rounded-md border border-transparent  bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )
                        }
                    </section>
                </div>
            </main>
        </div>
    )
}