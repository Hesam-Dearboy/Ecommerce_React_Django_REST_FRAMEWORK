import React from 'react'

function Message({children}) {
    return (
        <div className="bg-red-100 border text-right border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block text-right sm:inline">{children}</span>
            
        </div>
    )
}

export default Message