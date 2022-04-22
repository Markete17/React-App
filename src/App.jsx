import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Tasks from './components/Tasks';
import Admin from './components/Admin';
import Reset from './components/Reset';
import Pokemons from './components/Pokemons';
import Home from './components/Home';

import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import {auth} from './firebase'


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
  const PrivateRoute = ({component,path,...rest}) => {
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
  }

  return fireBaseUser !== false ? (

    <div className="container mt-5">
      <Router forceRefresh>
        <Navbar user={fireBaseUser}></Navbar>
        <div className='container'>
          <Switch>
              <Route path="/admin" component={Admin}/> {/*Tambien se puede poner asi*/}
              <Route path="/tasks" user={fireBaseUser} component={Tasks}/>
              <Route path="/reset" user={fireBaseUser} component={Reset}/>
              <Route path="/home" user={fireBaseUser} component={Home}/>
              <Route path="/pokemons" user={fireBaseUser} component={Pokemons}/>
              <Route path="/" exact>
                  <Login></Login>
              </Route>
          </Switch>
        </div>

      </Router>
      

    </div>
  ) : <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">.</span>
        </div>
        <br></br>
        <p>Loading</p>
    </div>
}

export default App;
