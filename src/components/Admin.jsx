import React from 'react'
import { auth } from '../firebase'
import { withRouter } from 'react-router-dom'

const Admin = (props) => {

    const [user,setUser] = React.useState(null);

    React.useEffect(() => {
        const u = auth.currentUser;
        if(u){
            setUser(u);
        } else {
            props.history.push('/')
        }
      },[])

  return (
    <div>
        <h2>Ruta protegida</h2>

    </div>
  )
}

export default withRouter(Admin)