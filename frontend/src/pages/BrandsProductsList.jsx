import Paginate from '../components/Paginate'
import { useEffect } from 'react'
import { listBrandProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/product'
import Loader from '../components/Loader'
import Message from '../components/ErrorMessage'
import Footer from '../components/Footer'
import { Link, useParams, useLocation } from 'react-router-dom'



export default function BrandsProductsList() {

    const dispatch = useDispatch()
    const productBrandList = useSelector(state => state.productBrandList)
    const { error, loading, productsBrand, page, pages } = productBrandList

    let brandName = useLocation().search
    console.log(brandName)

    const brandNameTitle = brandName.split('?brandName=')[1].split('&')[0]

    console.log(brandNameTitle)

    useEffect(() => {
        dispatch(listBrandProducts(brandName))

    }, [dispatch, brandName])



    return (

        <div className="bg-white">
            <div className="mx-auto mb-10 max-w-7xl overflow-hidden  py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <div className="mx-auto  max-w-7xl overflow-hidden sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 capitalize">{brandNameTitle} products</h2>
                </div>
                {loading ? <Loader />
                    : error ? <Message children={error} />
                        : <div>

                            <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
                                {
                                    productsBrand.map(product => (


                                        <Product product={product} />

                                    ))
                                }


                            </div>
                            <Paginate page={page} pages={pages} brandName={brandName} isBrand={true} />
                        </div>}
            </div>
            <Footer/>
        </div>




    )
}
