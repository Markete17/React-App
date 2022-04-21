import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Tasks from './components/Tasks';
import Admin from './components/Admin';
import Reset from './components/Reset';
import Pokemons from './components/Pokemons';
import {Provider} from 'react-redux'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {auth} from './firebase'
import generateStore from './redux/store';

function App() {

  const store = generateStore()
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
              <Route path="/reset">
                  <Reset user={fireBaseUser}></Reset>
              </Route>
              <Route path="/pokemons">
              <Provider store={store}>
                <Pokemons user={fireBaseUser}></Pokemons>
              </Provider>
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
