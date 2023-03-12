import React from 'react'

function SuccessMessage({children}) {
    return (
        <div className="bg-green-100 border  border-green-400 text-green-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Great! </strong>
            <span className="block sm:inline">{children}</span>
        </div>
    )
}

export default SuccessMessage