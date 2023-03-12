import React from 'react'
import { useEffect } from 'react'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/ErrorMessage'
import Loader from '../components/Loader'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { PRODUCT_CREATE_RESET } from '../constants/porductConstants'
import Paginate from '../components/Paginate'



function ProductListScreen() {

    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete


    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let keyword = location.search
    const pageUrl = Number(keyword.split('page=')[1])
    
    console.log(pageUrl)

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        if (!userInfo.isAdmin) {
            navigate('/login')
        }

        if (successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`)

        } else {
            if (pageUrl) {
                dispatch(listProducts(keyword , pageUrl))
              } else {
                dispatch(listProducts())
              }
        }

    }
        ,
        [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, keyword , pageUrl])

    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }


    return (
        <div className=' p-8'>

            {
                loadingDelete && <Loader />
            }

            {
                errorDelete && <Message children={errorDelete} />
            }

            {
                loadingCreate && <Loader />
            }

            {
                errorCreate && <Message children={errorCreate} />
            }




            {loading ? <Loader /> :
                error ? <Message children={error} />
                    : products && (
                        <div className="mt-6 flex flex-col">
                            <button className=' my-3 w-[10rem] self-end text-white p-2 rounded-sm bg-indigo-600' onClick={createProductHandler}>
                                <i className=' fas fa-plus'></i> Create Product
                            </button>
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">

                                    <div className="overflow-hidden border-t border-gray-200">

                                        <table className="min-w-full py-4 divide-y divide-gray-200">

                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                        Image
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                        User Id
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                        Name
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                        Price
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                        Category
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                        Brand
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">

                                                    </th>
                                                    {/*
                                  `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                                */}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {products.map((product) => (
                                                    <tr key={product._id}>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            <img className=' h-[5rem]' src={`${product.image}`} />
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            {product._id}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            {product.name}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            تومان{product.price}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            {product.category}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            {product.brand}
                                                        </td>

                                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                            <Link to={`/admin/product/${product._id}/edit`} className="text-indigo-600 hover:text-gray-900">

                                                                Edit

                                                            </Link>

                                                            <button className=' text-red-600 mx-5' onClick={() => deleteHandler(product._id)}>
                                                                <i className='fas fa-trash'></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <Paginate pages={pages} page={page} isAdmin={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }


        </div>
    )
}

export default ProductListScreen