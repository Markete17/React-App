import {auth,firebase} from '../firebase'

// Initial Data

const initialData = {
    loading: false,
    active: false
}

// Types
const LOADING = 'LOADING'
const USER_ERROR = 'USER_ERROR'
const USER_EXIT = 'USER_EXIT'
const USER_LOG_OUT = 'USER LOG OUT'

// Reducer
export default function userReducer (state = initialData,action) {
    switch(action.type){
        case LOADING: 
            return {...state, loading: true}
        case USER_ERROR: 
            return {...initialData}
        case USER_EXIT:
            return {...state,loading:false,user:action.payload,active:true}
        case USER_LOG_OUT: 
            return {...initialData}
        default: 
            return {...state}
    }
}

// Action
export const signInWithGoogleUserAction = (props) => async(dispatch) => {
    dispatch({
        type: LOADING
    })
    if(localStorage.getItem('user')){
        dispatch({
            type: USER_EXIT,
            payload: JSON.parse(localStorage.getItem('user'))
        })
    } else {
        try{

            const provider = new firebase.auth.GoogleAuthProvider()
            const res = await auth.signInWithPopup(provider)
            dispatch({
                type: USER_EXIT,
                payload: {
                    uid:res.user.uid,
                    email: res.user.email
                }
            })

            localStorage.setItem('user',JSON.stringify({
                uid:res.user.uid,
                email: res.user.email
            }))
        } catch(error){
            dispatch({
                type: USER_ERROR
            })
        }
    }
}

export const readUserActiveAction = () => (dispatch) => {
    if(localStorage.getItem('user')){
        dispatch({
            type: USER_EXIT,
            payload: JSON.parse(localStorage.getItem('user'))
        })
    }
}

export const logOutWithGoogle = () => (dispatch) => {
    auth.signOut()
    localStorage.removeItem('user')
    dispatch({
        type: USER_LOG_OUT,
    })
}