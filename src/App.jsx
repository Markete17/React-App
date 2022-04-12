import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Tasks from './components/Tasks';
import Admin from './components/Admin';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {auth} from './firebase'

function App() {

  
  const [fireBaseUser,setFireBaseUser] = React.useState(false);

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user){
        setFireBaseUser(user);
      } else {
        setFireBaseUser(null);
      }
    })
  },[])

  return fireBaseUser !== false ? (

    <div className="container mt-5">
      <Router forceRefresh>
        <Navbar user={fireBaseUser}></Navbar>
        <div className='container'>
          <Switch>
              <Route path="/admin">
                  <Admin></Admin>
              </Route>
              <Route path="/tasks">
                  <Tasks user={fireBaseUser}></Tasks>
              </Route>
              <Route path="/" exact>
                  <Login></Login>
              </Route>
          </Switch>
        </div>

      </Router>
    </div>
  ) : <p>Cargando</p>
}

export default App;
