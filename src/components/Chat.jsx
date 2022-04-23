import React from 'react'
import { ChatContext } from '../context/ChatProvider'
import Login from './Login'
import MessageChat from './MessageChat'


const Chat = () => {

    const {user,messages} = React.useContext(ChatContext)
    const refZoneChat = React.useRef(null)

    React.useEffect(()=>{
        refZoneChat.current.scrollTop = refZoneChat.current.scrollHeight
    }, [messages])

  return user !== null ?(
      
    <div className='mt-3 px-2'
         style={{
             height: '80vh',
             overflow: 'scroll'
         }}
         ref={refZoneChat}
    >

        {
            messages.map((item,index) => (
                user.uid === item.uid ? (
                <div key={index} className='d-flex justify-content-end mb-2'>
                    <div className='mx-1'>
                    <b>{item.name}: </b>
                    </div>
                    
                    <span className='badge rounded-pill bg-primary'>
                        {item.text}
                    </span>
                </div>

                ) : (
                <div key={index} className='d-flex justify-content-start mb-2'>
                    <div className='mx-1'>
                        <b>{item.name}: </b>
                    </div>
                    <span className='badge rounded-pill bg-secondary'>
                    {item.text}
                    </span>
                </div>
                )
            ))
        }



        <MessageChat></MessageChat>
    </div>
  ) : <Login></Login>
}

export default Chat