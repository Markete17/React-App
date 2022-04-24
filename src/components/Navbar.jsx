import React from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { db} from '../firebase'
import { useDispatch } from 'react-redux'
import {logOutWithGoogle} from '../redux/userDucks'
import {useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import ForumIcon from '@mui/icons-material/Forum';
import CollectionsIcon from '@mui/icons-material/Collections';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';

const Navbar = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

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
            navigate('/')
    }

    React.useEffect(() => {
        getAdmin()
      },[])

  return (
    <div className='navbar navbar-light bg-primary'>
        {/*La diferencia entre Link y Navbar Link es que detecta la ruta en la que estamos y se sombrea el boton(añade la prop active de boostrap en el classname) */}
        
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
                        props.user!=null && 
                            <NavLink className="text-decoration-none font-weight-bold" to="/"><HomeIcon></HomeIcon> Home</NavLink>
                    }
                </li>
                <li className='dropdown-item text-center mt-1'>
                    {
                        props.user!=null && <NavLink className="text-decoration-none font-weight-bold" to="/tasks"><AssignmentIcon></AssignmentIcon> My Tasks</NavLink>
                    }
                </li>

                <li className='dropdown-item text-center mt-1'>
                {
                        props.user!=null && <NavLink className="text-decoration-none font-weight-bold" to="/pokemons"><CatchingPokemonIcon></CatchingPokemonIcon> Pokemons</NavLink>
                    }
                </li>
                <li className='dropdown-item text-center mt-1'>
                    {
                        props.user!=null && <NavLink className="text-decoration-none font-weight-bold" to="/chat"><ForumIcon></ForumIcon> Chat</NavLink>
                    }
                </li>

                <li className='dropdown-item text-center mt-1'>
                    {
                        props.user!=null && <NavLink className="text-decoration-none font-weight-bold" to="/gallery"><CollectionsIcon></CollectionsIcon> Gallery</NavLink>
                    }
                </li>
                
                {isAdmin && <hr className="dropdown-divider"/>}
                <li className='dropdown-item text-center mt-1'>
                    {
                        (props.user!=null && isAdmin) && <NavLink className="text-decoration-none font-weight-bold" to="/admin"><AdminPanelSettingsIcon></AdminPanelSettingsIcon> Admin</NavLink>
                    }
                </li>
                
            </ul>
            
            </div>
            }
                {
                    props.user!=null 
                    ? <button onClick={() => logout()} className='btn btn-primary mx-2'><ExitToAppIcon></ExitToAppIcon> Log Out</button>
                    : <NavLink className="btn btn-primary mx-2 pe-auto" to="/"><LoginIcon></LoginIcon> Log In</NavLink>
                }
            </div>
        </div>


    </div>
  )
}

export default Navbar