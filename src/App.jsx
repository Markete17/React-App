import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Tasks from './components/Tasks';
import Admin from './components/Admin';
import Reset from './components/Reset';
import Pokemons from './components/Pokemons';
import Chat from './components/Chat';
import Home from './components/Home';

import {Outlet,Route, Routes} from 'react-router-dom'
import {auth} from './firebase'
import NotFoundError from './components/NotFoundError';
import Loading from './components/Loading';
import Gallery from './components/Gallery';
import Photo from './components/Photo';


function App() {

  
  const [fireBaseUser,setFireBaseUser] = React.useState(false);

  React.useEffect(() => {
    
    const fetchUser = () => {
      auth.onAuthStateChanged(user => {
        if(user){
          setFireBaseUser(user);
        } else {
          setFireBaseUser(null);
        }
      })
    }
    fetchUser()
  },[])

  //Rutas protegidas - errores de momento
 /* const PrivateRoute = ({component,path,...rest}) => {
    if(localStorage.getItem('user')){
      const userStore = JSON.parse(localStorage.getItem('user'))
      if(userStore.uid === fireBaseUser.uid){
        return <Route component={component} path='path' {...rest}></Route>
      } else {
        return <Redirect to='/' {...rest}></Redirect>
      }
    } else {
      return <Redirect to='/' {...rest}></Redirect>
    }
  }*/

  return fireBaseUser !== false ? (

    <div className="container mt-5">
      <Navbar user={fireBaseUser}></Navbar>
        <div className='container'>
        <Outlet></Outlet>{/*En index.js se define el Browser Router y Outlet sirve para que las rutas se pinten aqui */}
          <Routes>
              {/*Rutas anidadas*/}
              <Route path="/">
                <Route index element={<Login/>} forceRefresh></Route>
                <Route path="admin" element={<Admin/>}></Route> 
                {/*Tambien se puede poner asi
                <Route path="/tasks" user={fireBaseUser} component={Tasks}/>
                */}
                <Route path="tasks" user={fireBaseUser} element={<Tasks/>}/>
                <Route path="reset" user={fireBaseUser} element={<Reset/>}/>
                {/*Se puede pasar el user por los props o por REDUX como en HOME y demas*/}
                <Route path="home" element={<Home/>}></Route>
                <Route path="pokemons" user={fireBaseUser} element={<Pokemons/>}/>
                <Route path="chat" user={fireBaseUser} element={<Chat/>}/>
                <Route path="gallery" user={fireBaseUser} element={<Gallery/>}/>
                <Route path="gallery/:id" user={fireBaseUser} element={<Photo/>}/>
                <Route path="*" user={fireBaseUser} element={<NotFoundError/>}/>
              </Route>
          </Routes>
        </div>
      

    </div>
  ) : <Loading></Loading>
}

export default App;
