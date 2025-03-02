import React from 'react'

const LoadingButton = ({message}:{message:string}) => {
    return (
        <div className="btn btn-soft btn-success">
        <div className='flex flex-row items-center justify-center gap-2' > 
            <span className='text-md' >{message}</span>
            <span className="loading loading-spinner text-success hover:text-black"></span>
        </div>
        </div>
    )
}

export default LoadingButton