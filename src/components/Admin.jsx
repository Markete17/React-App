import React from 'react'
import { auth } from '../firebase'
import Login from './Login'
import { withRouter } from 'react-router-dom'

const Admin = (props) => {

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

  return user!=null ? (
    <div>
        <h2>Admin Page - USER: {user.email}</h2>
    </div>
  ) : <Login></Login>
}

export default withRouter(Admin)