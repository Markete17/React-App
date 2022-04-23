import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { db} from '../firebase'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {logOutWithGoogle} from '../redux/userDucks'

const Navbar = (props) => {

    const dispatch = useDispatch()


    const getAdmin = async() => {
        if(props.user==null){
            return false
        }
        
        const uid = props.user.uid;
        
        const user = await db.collection('users').where('uid', '==',uid).where('isAdmin', '==',true).get()
        if(user===undefined){
            setIsAdmin(false)
            return false
        }
        
        const userData = user.docs;
        if(userData===undefined || userData.length===0){
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
            dispatch(logOutWithGoogle())
            props.history.push('/')
            window.reaload()
    }

    React.useEffect(() => {
        getAdmin()
      },[])

  return (
    <div className='navbar navbar-light bg-primary'>
        
        <Link className='navbar-brand mx-3 h1 text-white' to="/">React App</Link>
        <div>
            <div className='d-flex'>
            {props.user!=null &&
            <div className="btn-group">
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Menu
            </button>
            <ul className="dropdown-menu">
                <li className='dropdown-item text-center mt-1'>
                    {
                        props.user!=null && <NavLink className="text-decoration-none font-weight-bold" to="/" activeClassName="selected">Home</NavLink>
                    }
                </li>
                <li className='dropdown-item text-center mt-1'>
                    {
                        props.user!=null && <NavLink className="text-decoration-none font-weight-bold" to="/tasks" activeClassName="selected">My Tasks</NavLink>
                    }
                </li>

                <li className='dropdown-item text-center mt-1'>
                {
                        props.user!=null && <NavLink className="text-decoration-none font-weight-bold" to="/pokemons" activeClassName="selected">Pokemons</NavLink>
                    }
                </li>
                <li className='dropdown-item text-center mt-1'>
                    {
                        props.user!=null && <NavLink className="text-decoration-none font-weight-bold" to="/chat" activeClassName="selected">Chat</NavLink>
                    }
                </li>
                
                {isAdmin && <hr className="dropdown-divider"/>}
                <li className='dropdown-item text-center mt-1'>
                    {
                        (props.user!=null && isAdmin) && <NavLink className="text-decoration-none font-weight-bold" to="/admin" activeClassName="selected">Admin</NavLink>
                    }
                </li>
                
            </ul>
            
            </div>
            }
                {
                    props.user!=null 
                    ? <NavLink onClick={() => logout()} className="btn btn-primary mx-2" to="/logout" activeClassName="selected">Log Out</NavLink>
                    : <NavLink className="btn btn-primary mx-2 pe-auto" to="/" activeClassName="selected">Log In</NavLink>
                }
            </div>
        </div>


    </div>
  )
}

export default withRouter(Navbar)