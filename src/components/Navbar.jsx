import React from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { db,auth } from '../firebase'
import { withRouter } from 'react-router-dom'

const Navbar = (props) => {

    const getAdmin = async() => {
        if(props.user==null){
            return false
        }
        const uid = props.user.uid;
        const user = await db.collection('users').where('uid', '==',uid).where('isAdmin', '==',true).get()
        if(user==undefined){
            setIsAdmin(false)
            return false
        }
        const userData = user.docs;
        if(userData==undefined || userData.length==0){
            setIsAdmin(false)
            return false
        }
        if(userData[0].exists){
            setIsAdmin(true)
            return true
        }
        return false
    }

    const [isAdmin,setIsAdmin] = React.useState(false)

    const logout = () => {
            auth.signOut().
            then(()=>{
                props.history.push('/')
                window.reaload();
            })
    }

    React.useEffect(() => {
        getAdmin()
      },[])

  return (
    <div className='navbar navbar-light bg-primary'>
        
        <Link className='navbar-brand mx-3 h1 text-white' to="/">React App</Link>
        <div>
            <div className='d-flex'>
                {
                    props.user!=null && <NavLink className="btn btn-primary mx-2" to="/" activeClassName="selected">Home</NavLink>
                }
                 {
                    props.user!=null && <NavLink className="btn btn-primary mx-2" to="/tasks" activeClassName="selected">My Tasks</NavLink>
                }
                {
                    (props.user!=null && isAdmin) && <NavLink className="btn btn-primary mx-2" to="/admin" activeClassName="selected">Admin</NavLink>
                }

                {
                    props.user!=null 
                    ? <NavLink onClick={() => logout()} className="btn btn-primary mx-2" to="/logout" activeClassName="selected">Log Out</NavLink>
                    : <NavLink className="btn btn-primary mx-2" to="/" activeClassName="selected">Log In</NavLink>
                }
            </div>
        </div>


    </div>
  )
}

export default withRouter(Navbar)