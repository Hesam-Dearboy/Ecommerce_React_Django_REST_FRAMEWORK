import React, { useState } from 'react'
import {useNavigate , useLocation} from 'react-router-dom'
function Searchbox() {
    const [keyword, setKeyword] = useState('')
    let navigate = useNavigate()
    let location = useLocation()

    const sumbitHandler = (e) => {
        e.preventDefault()
        if(keyword){
            navigate(`/search/?keyword=${keyword}&page=1`)
        }else{
            navigate(location)
        }
    }
    return (
        <form onSubmit={sumbitHandler}>
            <div className="flex items-center">
                <div className="flex space-x-1">
                    <input
                        type="text"
                        name='q'
                        onChange={(e) =>setKeyword(e.target.value)}
                        className="block w-full px-4 py-2 text-indigo-700 bg-white border rounded-full focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Search..."
                    />
                    <button type='sumbit'  className="px-4 text-white bg-indigo-600 rounded-full ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Searchbox