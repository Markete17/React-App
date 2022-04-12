import React from 'react'
import {auth, db} from '../firebase'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

const Login = (props) => {

  const [email,setEmail] = React.useState('');
  const [password,setPassword] = React.useState('');
  const [error,setError] = React.useState(null);
  const [isRegister,setIsRegister] = React.useState(true);
  const [user,setUser] = React.useState(null);

  const processData = (e) => {
    e.preventDefault();
    if(!email.trim()){
      setError('Enter your email')
      return;
    }
    if(!password.trim()){
      setError('Enter your  password')
      return;
    }
    if(password.length<6){
      setError('Password is less than 6 characters')
    }

    setError(null);
    if(isRegister){
      register();
    } else {
      login();
    }
  }

  React.useEffect(() => {
      const u = auth.currentUser;
      if(u){
          setUser(u);
      } else {
          setUser(null);
      }
    },[])

  const register = React.useCallback(async() => {

    try {
      const res = await auth.createUserWithEmailAndPassword(email,password)
      await db.collection('users').doc(res.user.uid).set({
        email: res.user.email,
        uid:res.user.uid,
        isAdmin:false
      }

      )
      setEmail('');
      setPassword('')
      setError(null)
      props.history.push('/tasks');
    } catch (error) {
      setError(error.message)
      setPassword('')
    }

  },[email,password])

  const login = React.useCallback( async() =>{
    try {
      const res = await auth.signInWithEmailAndPassword(email,password)
      setEmail('');
      setPassword('')
      setError(null)
      props.history.push('/tasks');
    } catch (error) {
      setError(error.message)
      setPassword('')
    }
  }

  )

  return user === null ? (
    <div>
    <form onSubmit={processData}>
    <section className="vh-50 gradient-custom">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-primary text-white">
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4 pb-5">
              { isRegister 
              ? <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
              : <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
            }
              
              <p className="text-white-50 mb-3">Please enter your email and password!</p>
              {
                error && (
                  <div className="alert alert-danger mb-3">{error}</div>
                )

              }
              <div className="form-outline form-white mb-1">
                <input onChange={e=>setEmail(e.target.value)} value={email} type="email" id="typeEmailX" placeholder='Enter your email' className="form-control form-control-lg" />
                <label className="form-label">Email</label>
              </div>

              <div className="form-outline form-white mb-4">
                <input onChange={e=>setPassword(e.target.value)} value={password} type="password" id="typePasswordX" placeholder='Enter your password' className="form-control form-control-lg" />
                <label className="form-label">Password</label>
              </div>

              <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
              
              <button className="btn btn-outline-light btn-lg px-5 mx-2" type="submit">
                
              {
                isRegister 
                ? 'Register'
                : 'Login'
              }
                
                </button>
                <br></br>
              <button onClick={() =>setIsRegister(!isRegister)} className="btn btn-outline-light btn-sm px-5 mx-2 mt-4" type='button'>
              
              {
                isRegister 
                ? 'Not registered?'
                : 'Already has Account?'
              }
                </button>

          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</section>
</form>
    </div>
  ) : <p className='text-center'><b>Your Email: </b>{user.email}</p>
}

export default withRouter(Login)