import React from 'react'

function Loader() {
    let circleCommonClasses = 'h-[2rem] w-[2rem] bg-red-700  rounded-full';

    return (
        <div className='flex justify-center items-center'>
            <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
            <div
                className={`${circleCommonClasses} mr-1 animate-bounce200`}
            ></div>
            <div className={`${circleCommonClasses} animate-bounce400`}></div>
            
        </div>
    );
}

export default Loader