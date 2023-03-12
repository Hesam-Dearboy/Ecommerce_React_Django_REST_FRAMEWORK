import { Link } from "react-router-dom"
import { PlusIcon } from '@heroicons/react/20/solid'
import Rating from './Rating'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function Product({ product }) {
  const price = Number(product.price).toLocaleString()

  return (
    <>
      <Link to={`/product/${product._id}`}>
        <div key={product._id} className="group relative bg-white rounded-xl shadow-xl  p-4 sm:p-6">
          <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-white group-hover:scale-110 group-hover:opacity-90 duration-500">
            <img
              src={`${product.image}`}
              alt={product.imageAlt}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="pt-10 pb-4 text-center">
            <h3 className="font-medium text-gray-900">
              <a href={product.href}>
                <span aria-hidden="true" className="absolute  inset-0" />
                {product.name}
              </a>
            </h3>
            <div className="mt-3 justify-center flex items-center">
              <p className="sr-only">{product.rating} out of 5 stars</p>
              <Rating value={product.rating} color='rgb(255,215,0)' />
              <span className=" mx-0 inline">({product.numReviews})</span>
            </div>
            <p className="mt-4 text-base font-medium text-gray-900">  {price} تومان</p>
            <ul role="list" className="mt-auto flex items-center justify-center space-x-3 pt-6">
              <li
                key={product.color}
                className="h-4 w-4 rounded-full border border-black border-opacity-70"
                style={{ backgroundColor: product.color }}
              >
              </li>
            </ul>

          </div>
        </div>
      </Link>
    </>

  )
}
