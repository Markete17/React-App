import React from 'react'
import {auth} from '../firebase'
import Login from './Login'

const Home = () => {

    const [user,setUser] = React.useState(null);

    const getUser = async() => {
        const u = await auth.currentUser;
        if(u){
            setUser(u);
        }
      }

    React.useEffect(() => {
        getUser();
      },[])


  return user != null ?(
    <div>
        <p className='text-center'><b>Your Email: </b>{user.email}</p>
    </div>
  ) : <Login></Login>
}

export default Home