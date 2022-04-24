import React from 'react'
import { auth } from '../firebase';
import {useNavigate } from "react-router-dom";

const Reset = (props) => {

    const navigate = useNavigate()

    const [email,setEmail] = React.useState('');
    const [error,setError] = React.useState(null);

    const processData = (e) => {
        e.preventDefault();
        if(!email.trim()){
          setError('Enter your email')
          return;
        }
        alert('hola')
        setError(null);
        reset()
      }
    const reset = React.useCallback( async()=>{
        try {
            await auth.sendPasswordResetEmail(email)
            navigate('/')
        } catch (error) {
            setError(error)
        }
    }) 

  return (
    <form onSubmit={processData}>
    <section className="vh-50 gradient-custom">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-primary text-white">
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4 pb-5">
                <h2 className="fw-bold mb-2 text-uppercase">Reset your password</h2>
              <p className="text-white-50 mb-3">Please enter your email!</p>
              {
                error && (
                  <div className="alert alert-danger mb-3">{error}</div>
                )

              }
              <div className="form-outline form-white mb-1">
                <input onChange={e=>setEmail(e.target.value)} value={email} type="email" id="typeEmailX" placeholder='Enter your email' className="form-control form-control-lg" />
                <label className="form-label">Email</label>
              </div>    
              <button className="btn btn-outline-light btn-lg px-5 mx-2" type="submit">Reset</button>

          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</section>
</form>
  )
}

export default Reset