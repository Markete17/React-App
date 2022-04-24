import React from 'react'
import { ChatContext } from '../context/ChatProvider'
import { Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';

const MessageChat = () => {

    const {user,addMessages} = React.useContext(ChatContext)
    const [message,setMessage] = React.useState('');

    const add = (e) => {
        e.preventDefault();
        if(!message.trim()){
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
            <Button color='success' variant='contained' startIcon={<SendIcon/>} disableElevation >Send</Button>
        </div>
    </form>
  )
}

export default MessageChat