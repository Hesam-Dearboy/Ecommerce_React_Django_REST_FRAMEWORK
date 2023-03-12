import Paginate from '../components/Paginate'
import { useEffect } from 'react'
import { listCategoryProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/product'
import Loader from '../components/Loader'
import Message from '../components/ErrorMessage'
import { useLocation } from 'react-router-dom'



export default function BrandsProductsList() {

    const dispatch = useDispatch()
    const productCategoryList = useSelector(state => state.productCategoryList)
    const { error, loading, productsCategory, page, pages } = productCategoryList

    let categoryName = useLocation().search
    console.log(categoryName)
    

    const categoryNameTitle = categoryName.split('?categoryName=')[1].split('&')[0]

    console.log(categoryNameTitle)

    useEffect(() => {
        dispatch(listCategoryProducts(categoryName))

    }, [dispatch, categoryName])

    

    return (

        <div className="bg-white">
        <div className="mx-auto max-w-7xl overflow-hidden py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <div className="flex items-center  px-4 sm:px-6 lg:px-0">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 capitalize">{} products</h2>
                </div>
                {loading ? <Loader />
                    : error ? <Message children={error} />
                        : <div className="relative mt-8">
                            <h2 className="sr-only">Products</h2>

                            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
                                {
                                    productsCategory.map(product => (

                                        
                                            <Product product={product} />
                                        
                                    ))
                                }


                            </div>
                            <Paginate page={page} pages={pages}  isBrand={true} />
                        </div>}
            </div>
        </div>




    )
}
