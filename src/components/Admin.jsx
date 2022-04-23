import React from 'react'
import Login from './Login'
import { withRouter } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { ThemeContext } from '../context/ThemeProvider'

const Admin = (props) => {

      const user = useSelector(store => store.user.user)
      const {theme,changeColor} = React.useContext(ThemeContext)

  return user!=null || user!=undefined ? (
  <div  className='mt-5 text-center'>
    <h3>ADMIN PAGE</h3>
    <div className='card'>
      <div style={
    {background: theme.background,
      color:theme.color
    }
    
    }className='card-body'>
        <img src={user.photoURL} alt='Profile Image' width='100px' className='img-fluid'></img>
        <h5 className='card-title mt-3'>Name: {user.displayName}</h5>
        <p className='card-text'>Email: {user.email}</p>
      </div>
    </div>
          <label htmlFor="input1"><b>Text Color:</b> </label>
          <p>
          <input type="color" className="form-control-color mx-4" id='input1' onChange={e => changeColor({...theme,color: e.target.value})} value={theme.color} title="Choose your color"/>
          </p>
          <label htmlFor="input2"><b>Background Color:</b> </label>
          <p>
          <input type="color" className="form-control-color mx-4" id='input1' onChange={e => changeColor({...theme,background: e.target.value})} value={theme.background} title="Choose your color"/>
          </p>

  </div>
  ) : <Login></Login>
}

export default withRouter(Admin)