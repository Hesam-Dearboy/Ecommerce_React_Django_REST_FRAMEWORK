
import { useEffect, useState } from 'react'
import { listBanners, listProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/product'
import Loader from '../components/Loader'
import Message from '../components/ErrorMessage'
import { Link, useLocation } from 'react-router-dom'
import Banner from '../components/Banner'
import Footer from '../components/Footer'


import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { ArrowRightCircleIcon, ArrowLeftCircleIcon, BuildingStorefrontIcon, FireIcon } from '@heroicons/react/24/outline'


// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";




// import required modules
import { FreeMode, Navigation, Pagination, Mousewheel, Keyboard } from "swiper";



const brands = [
    {
        name: 'bitak',
        href: '/brands',
        imageSrc: 'https://s3.ir-thr-at1.arvanstorage.com/zamshop/bitak_logo.png',
    },
    {
        name: 'polimax',
        href: '/brands',
        imageSrc: 'https://s3.ir-thr-at1.arvanstorage.com/zamshop/polimax_logo.png',
    },

]
const collections = [
    {
        name: 'Handcrafted Collection',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-01.jpg',
        imageAlt: 'Brown leather key ring with brass metal loops and rivets on wood table.',
        description: 'Keep your phone, keys, and wallet together, so you can lose everything at once.',
    },
    {
        name: 'Organized Desk Collection',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-02.jpg',
        imageAlt: 'Natural leather mouse pad on white desk next to porcelain mug and keyboard.',
        description: 'The rest of the house will still be a mess, but your desk will look great.',
    },
    {
        name: 'Focus Collection',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-03.jpg',
        imageAlt: 'Person placing task list card into walnut card holder next to felt carrying case on leather desk pad.',
        description: 'Be more productive than enterprise project managers with a single piece of paper.',
    },
]







export default function HomeScreen() {


    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { error, loading, products, page, pages } = productList



    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    console.log(windowSize[0])






    let keyword = useLocation().search
    console.log(keyword)
    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])




    return (
        <div className=" bg-slate-200 ">

            {/* Hero section */}
            <div>
                <Banner />
            </div>
            <main>
                {/* Brand section */}
                <section aria-labelledby="category-heading" className="pt-2 max-w-7xl sm:pt-8  xl:mx-auto mx-4 xl:px-8">
                    <div className=" bg-slate-200  pr-0 rounded-xl flex items-center justify-between sm:px-6 lg:px-8 xl:px-0">
                        <Link to={`/search`} className='  text-red-600'  >

                            &larr;    مشاهده همه
                        </Link>
                        <h2 id="category-heading" className=" md:text-2xl font-bold tracking-tight mr-2 items-center ">
                            خرید بر اساس برند <BuildingStorefrontIcon className=' inline h-6 w-6 md:h-12 md:w-12 ml-2 text-red-600' />
                        </h2>
                    </div>

                    <div className="mt-4 bg-white p-4 rounded-lg shadow-xl flow-root">
                        <div className="-my-2">
                            <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
                                <div className="min-w-screen-xl absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                                    {brands.map((brand) => (
                                        <Link
                                            key={brand.name}
                                            to={`${brand.href}/?brandName=${brand.name}&page=1`}
                                            className="relative h-80 w-56 flex  flex-col  overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                                        >
                                            <span aria-hidden="true" className="absolute inset-0">
                                                <img src={brand.imageSrc} alt="" className=" h-full w-full object-contain  object-center" />
                                            </span>
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                                            />
                                            <span className="relative mt-auto text-center text-xl font-bold text-white">{brand.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Porducts section */}

                <section aria-labelledby="category-heading" className="pt-2 pb-10 max-w-7xl sm:pt-10 xl:mx-auto mx-4 xl:px-8">
                    <div className="px-4 flex pr-0 p-4 items-center justify-between sm:px-6 lg:px-8 xl:px-0">

                        <Link to={`/search`} className='  text-red-600'  >
                            &larr;    مشاهده همه
                        </Link>

                        <h2 id="category-heading" className=" md:text-2xl font-bold tracking-tight mr-2 text-gray-900">
                            محصولات برتر
                            <FireIcon className=' ml-2 inline h-6 w-6 md:h-12 md:w-12 text-red-600' />
                        </h2>
                    </div>

                    <div className="mt-6 bg-slate-200  rounded-xl flow-root">
                        <div className="-my-2">

                            <Swiper
                                slidesPerView={windowSize[0] > 1024 ? 4 : windowSize[0] > 768 ? 3 : 1}
                                spaceBetween={50}
                                mousewheel
                                keyboard
                                navigation={
                                    {
                                        nextEl: '.swiper-button-next',
                                        prevEl: '.swiper-button-prev',
                                    }}
                                freeMode={true}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[FreeMode, Navigation, Mousewheel, Keyboard]}
                                className=" p-2"
                            >

                                <button className="swiper-button-prev  after:hidden  ">
                                    <ArrowLeftCircleIcon className=" -mr-5  text-red-600 font-bold " />
                                </button>

                                {loading ? <Loader /> :
                                    error ? <Message children={error} /> :
                                        <>

                                            {
                                                products.slice(0, 5).map(product => (
                                                    <SwiperSlide>

                                                        <Product product={product} />
                                                    </SwiperSlide>
                                                ))
                                            }
                                        </>
                                }

                                <button className="swiper-button-next after:hidden  ">
                                    <ArrowRightCircleIcon className=" -ml-5 text-red-600 font-bold " />
                                </button>

                            </Swiper>
                        </div>
                    </div>
                </section>

                {/* Featured section */}
                
                <div className=' pb-20 md:pb-60'>
                    <Banner/>
                </div>
                
            </main>
            <Footer />
        </div>
    )
}
