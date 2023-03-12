import React from 'react'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

function Paginate({ pages, page, keyword = '', brandName = '', isSearch = false, isAdmin = false, isBrand = false }) {

    const handelScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }

    if (brandName) {
        brandName = brandName.split('?brandName=')[1].split('&')[0]
    }



    return (
        pages > 1 && (
            <nav className="flex items-center my-4 md:my-8 justify-between border-t border-gray-300 px-4 sm:px-0">
                <div className="-mt-px flex w-0 flex-1">
                    <Link
                        onClick={handelScrollTop}
                        to={isSearch ?
                            `/search/?keyword=${keyword}&page=${page - 1}`
                            : isAdmin ? `/admin/productlist/?keyword=${keyword}&page=${page - 1}` : isBrand ? `/brands/?brandName=${brandName}&page=${page - 1}`
                                : ''

                        }
                        className={page === 1 ? " pointer-events-none  inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-red-300 hover:text-red-700"
                            :
                            "  inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-red-300 hover:text-red-700"}
                    >
                        <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                        Previous
                    </Link>
                </div>
                <div className="hidden md:-mt-px md:flex">
                    {[...Array(pages).keys()].map((x) => (
                        <Link
                            key={x + 1}

                            onClick={handelScrollTop}
                            to={
                                isSearch ?
                                    `/search/?keyword=${keyword}&page=${x + 1}`
                                    : isAdmin ? `/admin/productlist/?keyword=${keyword}&page=${x + 1}` : isBrand ? `/brands/?brandName=${brandName}&page=${x + 1}`
                                        : ''
                            }
                            className={x + 1 === page ? 'inline-flex items-center border-t-2 border-red-500 px-4 pt-4 text-sm font-medium text-red-600' : 'inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'}
                        >
                            {x + 1}
                        </Link>

                    ))}
                </div>
                <div className="-mt-px flex w-0 flex-1 justify-end">
                    <Link
                        onClick={handelScrollTop}
                        to={isSearch ?
                            `/search/?keyword=${keyword}&page=${page + 1}`
                            : isAdmin ? `/admin/productlist/?keyword=${keyword}&page=${page + 1}` : isBrand ? `/brands/?brandName=${brandName}&page=${page + 1}`
                                : ''
                        }
                        className={page === pages ? " pointer-events-none inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-red-300 hover:text-red-700"
                            :

                            "inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-red-300 hover:text-red-700"
                        }
                    >
                        Next
                        <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Link>
                </div>
            </nav>
        )
    )
}

export default Paginate