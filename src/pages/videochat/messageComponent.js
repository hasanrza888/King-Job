import React from 'react'
import './messageComponent.css'
import { useNavigate } from 'react-router-dom'
export default function MessageComponent({message}) {
    const navigate = useNavigate();
  return (
    <div className='videchatmessagecomp'>
        <button onClick={()=>{navigate('/')}}>Home</button>
        <div className='videchat-message-content'>
        {message}
      </div>
    </div>
  )
}
