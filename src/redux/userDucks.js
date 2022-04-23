import {auth,firebase,db,storage} from '../firebase'

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
        try{

            const provider = new firebase.auth.GoogleAuthProvider()
            const res = await auth.signInWithPopup(provider)
            
            const user = {
                uid: res.user.uid,
                email: res.user.email,
                displayName: res.user.displayName,
                photoURL: res.user.photoURL,
                isAdmin: false
            }
            const userDB = await db.collection('users').doc(user.uid).get()
            if(userDB.exists){
                dispatch({
                    type: USER_EXIT,
                    payload: userDB.data()
                })
                localStorage.setItem('user',JSON.stringify(userDB.data()))
            } else {
                //No existe usuario en firestore
                await db.collection('users').doc(user.uid).set(user)
                dispatch({
                    type: USER_EXIT,
                    payload: user
                })
    
                localStorage.setItem('user',JSON.stringify(user))
            }

        } catch(error){
            dispatch({
                type: USER_ERROR
            })
        }
}

export const signInAction = (user) => async(dispatch) => {
    dispatch({
        type: LOADING
    })
        try{
            
            dispatch({
                    type: USER_EXIT,
                    payload: user
                })
            localStorage.setItem('user',JSON.stringify(user))

        } catch(error){
            dispatch({
                type: USER_ERROR
            })
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

export const updateUserAction = (updatedName) => async(dispatch,getState) => {
    dispatch({
        type: LOADING
    })
    const {user} = getState().user
    try {

        await db.collection('users').doc(user.uid).update({
            displayName: updatedName 
        })

        const userDB = {
            ...user,displayName: updatedName
        }

        dispatch({
            type: USER_EXIT,
            payload: userDB
        })

        localStorage.setItem('user',JSON.stringify(userDB))
        
    } catch (error) {
        console.log(error)
    }
}

export const updatePhotoUserAction = (photo) => async(dispatch,getState) => {
    dispatch({
        type: LOADING
    })
    const {user} = getState().user
    try {
        const refImage = await storage.ref().child(user.uid).child('Profile Photo')
        await refImage.put(photo)
        const imageURL = await refImage.getDownloadURL()

        await db.collection('users').doc(user.uid).update({
            photoURL: imageURL
        })

        const userDB = {
            ...user,
            photoURL: imageURL
        }
        
        dispatch({
            type: USER_EXIT,
            payload: userDB
        })
        localStorage.setItem('user',JSON.stringify(userDB))
    } catch (error) {
        console.log(error)
    }
}