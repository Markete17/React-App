import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundError = () => {
  return (
    <div>
        <h1 className='text-center'>Not Found Error 404</h1>
        <div className='d-flex justify-content-center'>
        <Link to="/" className='btn btn-primary'>Home</Link>
        </div>
    </div>
    
  )
}

export default NotFoundError