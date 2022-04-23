import React from 'react'
import {db,auth} from '../firebase'
import { useSelector } from 'react-redux'

export const ChatContext = React.createContext()


const ChatProvider = (props) => {
    
    const userDB = useSelector(store => store.user.user)
    const userData = {uid:null,email:null,state:null,name:null}
    const [user,setUser] = React.useState()
    const [messages,setMessages] = React.useState([])

    const detectUser = async() => {
        auth.onAuthStateChanged(user =>{
            if(user){
                if(user.displayName==null){
                    setUser({uid:userDB.uid,email:userDB.email,state:true,name:userDB.displayName})
                } else{
                setUser({uid:user.uid,email:user.email,state:true,name:user.displayName})
                }
                loadMessages()
            } else{
                setUser({uid:null,email:null,state:false})
            }
        })
    }

    const getUser = async() => {

    }

    const loadMessages = () => {

        // onSnapchot => Detecta la Base de datos en tiempo real
        db.collection('chat').orderBy('date').onSnapshot(query =>{
            const arrayMessages = query.docs.map(item => item.data())
            setMessages(arrayMessages)
        })
        
    }

    const addMessages = async(uidChat,textInput,displayName) => {
        try {
            await db.collection('chat').add({
                date: Date.now(),
                text: textInput,
                uid: uidChat,
                name: displayName
            })
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(()=>{
        detectUser()
    },[])
  
return (
    <ChatContext.Provider value={{user,messages,addMessages}}>
        {props.children}
    </ChatContext.Provider>
  )
}

export default ChatProvider