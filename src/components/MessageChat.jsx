import React from 'react'
import { ChatContext } from '../context/ChatProvider'

const MessageChat = () => {

    const {user,addMessages} = React.useContext(ChatContext)
    const [message,setMessage] = React.useState('');

    const add = (e) => {
        e.preventDefault();
        if(!message.trim()){
            console.log('vacio')
            return
        }
        addMessages(user.uid,message,user.name)
        setMessage('')
    }

  return (
    <form 
        className='fixed-bottom mr-3 input-group p-1 bg-primary'
        onSubmit={add}
    >
        <input type='text' 
            className='form-control' 
            value={message}
            onChange={e=>setMessage(e.target.value)}/>
        <div className='input-group-append'>
            <button className='btn btn-success'>Send</button>
        </div>
    </form>
  )
}

export default MessageChat