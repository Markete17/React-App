import React from 'react'
import Login from './Login'
import { useSelector,useDispatch } from 'react-redux'
import {updateUserAction,updatePhotoUserAction} from '../redux/userDucks'
import { ThemeContext } from '../context/ThemeProvider'
import { Button } from '@mui/material'

const Home = (props) => {
    
    const dispatch = useDispatch()
    const user = useSelector(store => store.user.user)
    const loading = useSelector(store => store.user.loading)
    const [username,setUserName] = React.useState(user.displayName)
    const [activateForm,setActivateForm] = React.useState(false)
    const [error,setError] = React.useState(false)

    const {theme} = React.useContext(ThemeContext)
    const activate = () => {
        setActivateForm(!activateForm)
    }

    const updateForm = () => {
        if(!username.trim()){
          return
        }
        dispatch(updateUserAction(username))
        setActivateForm(false)
    }

    const selectFile = (image) => {
      const clientImage = image.target.files[0]
      if(clientImage===undefined){
        //El usuario cierra la ventana de imagen
        return
      }

      if(clientImage.type === 'image/png' || clientImage.type === 'image/jpg'){
        dispatch(updatePhotoUserAction(clientImage))
        setError(false)
      } else{
        setError(true)
      }
    }

  return user != null ?(
    <div className='mt-5 text-center'>
      
        <div className='card'>
          <div style={
      {background: theme.background,
        color:theme.color
      }
      
      }className='card-body'>
            <img src={user.photoURL} alt='Profile Image' width='100px' className='img-fluid'></img>
            <h5 className='card-title mt-3'>Name: {user.displayName}</h5>
            <p className='card-text'>Email: {user.email}</p>
            <Button color='primary' variant='contained' disableElevation onClick={() => activate()}>
            {!activateForm ?
              'Edit Name' : 'Cancel Edit'
            }
            </Button>
            <div className='custom-file'>
              
              <input 
                type='file' 
                className='custom-file-input' 
                id='inputGroupFile01'
                style={{display:'none'}}
                onChange={e => selectFile(e)}
                disabled={loading}
                />
              <label 
                className={loading ? 'btn btn-primary mt-2 disabled' : 'btn btn-primary mt-2'} 
                htmlFor='inputGroupFile01'>
                  Edit photo
              </label>
            </div>
          </div>
          {
              error &&
              <div className='alert alert-warning mt-3'>
                  Only png or jpg files
              </div>
            }
          {
            loading &&
            <div className='card-body'>
              <div className='d-flex justify-content-center'>
                  <div className='spinner-border' role='status'>
                    <span className='sr-only'></span>
                  </div>
              </div>
            </div>
          }
          {activateForm &&
                    <div className='card-body'>
                    <div className="row justify-content-center">
                      <div className='input-group mb-3'>
                        <input type='text' className='form-control' onChange={e => setUserName(e.target.value)} value={username} placeholder='Enter your name'/>
                        <div className='input-group-append'>
                          <Button color='primary' disableElevation variant='contained' onClick={() => updateForm()}>Edit</Button>
                        </div>
                      </div>
                    </div>
                  </div>
          }
        </div>

    </div>
  ) : <Login></Login>
}

export default Home