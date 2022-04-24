import React from 'react'

const Loading = () => {
  return (
    <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">.</span>
        </div>
        <br></br>
        <p>Loading</p>
    </div>
  )
}

export default Loading