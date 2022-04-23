import React from 'react'
import {auth, db} from '../firebase'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import {useDispatch,useSelector} from 'react-redux'
import {signInAction, signInWithGoogleUserAction} from '../redux/userDucks'
import Home from './Home';

const Login = (props) => {
  
  const [email,setEmail] = React.useState('');
  const [displayName,setDisplayName] = React.useState('');
  const user = useSelector(store => store.user.user)
  const [password,setPassword] = React.useState('');
  const [error,setError] = React.useState(null);
  const [isRegister,setIsRegister] = React.useState(false);

  const dispatch = useDispatch()
  const loading = useSelector(store =>store.user.loading)
  const active = useSelector(store =>store.user.active)

  const processData = (e) => {
    e.preventDefault();

    if(!displayName.trim() && isRegister){ 
      setError('Enter your name')
      return;
    }

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

  const register = React.useCallback(async() => {

    try {
      const res = await auth.createUserWithEmailAndPassword(email,password)
      const u = {
        email: res.user.email,
        uid:res.user.uid,
        isAdmin:false,
        displayName: displayName,
        photoURL: 'https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png'
      }
      await db.collection('users').doc(res.user.uid).set(u)
      dispatch(signInAction(u))
      await db.collection(res.user.uid)
      setEmail('');
      setPassword('')
      setError(null)
      setDisplayName('');
      props.history.push('/');
    } catch (error) {
      setError(error.message)
      setPassword('')
    }

  },[email,password,displayName])

  const login = React.useCallback( async() =>{
    try {
      await auth.signInWithEmailAndPassword(email,password)
      const userDB = await db.collection('users').doc(auth.currentUser.uid).get()
      dispatch(signInAction(userDB.data()))
      setEmail('');
      setPassword('')
      setError(null)
      props.history.push('/');
    } catch (error) {
      setError(error.message)
      setPassword('')
    }
  }

  )

  const resetPassword = React.useCallback(async () =>{
    props.history.push('/reset')
  })

  return user === null || user===undefined ? (
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
              {isRegister &&
              
              <div className="form-outline form-white mb-1">
                <input onChange={e=>setDisplayName(e.target.value)} value={displayName} type="text" id="typeDisplayName" placeholder='Enter your name' className="form-control form-control-lg" />
                <label className="form-label">Name</label>
              </div>

              }

              <div className="form-outline form-white mb-1">
                <input onChange={e=>setEmail(e.target.value)} value={email} type="email" id="typeEmailX" placeholder='Enter your email' className="form-control form-control-lg" />
                <label className="form-label">Email</label>
              </div>

              <div className="form-outline form-white mb-3">
                <input onChange={e=>setPassword(e.target.value)} value={password} type="password" id="typePasswordX" placeholder='Enter your password' className="form-control form-control-lg" />
                <label className="form-label">Password</label>
              </div>
                {!isRegister && <p className="small mb-4 pb-lg-2"><a className="text-white-50" href="" onClick={() =>resetPassword()}>Forgot password?</a></p>}
              
              
              <button className="btn btn-outline-light btn-lg px-5 mx-2" type="submit">
                
              {
                isRegister 
                ? 'Register'
                : 'Login'
              }
              </button>
                {
                  !isRegister && 
                    <div className='mt-2'>
                    <button onClick={() => dispatch(signInWithGoogleUserAction())} disabled={loading} type='button' className='btn btn-outline-light btn-lg px-5 mx-2'>Login With Google</button>
                    </div>
                }
                <br></br>
              <button onClick={() =>setIsRegister(!isRegister)} className="btn btn-outline-light btn-sm px-5 mx-2 mt-4" type='button'>
              
              {
                isRegister 
                ? 'Already have Account?'
                : 'Not registered?'
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
  ) : <Home></Home>
}

export default withRouter(Login)