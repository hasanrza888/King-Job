import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import './messageComponent.css'
export default function LoadingMeeting() {
  return (
    <div className='meeting-icon'>
        <p>Görüşünüz axtarılır</p>
       <FontAwesomeIcon className='meeting-icon-rotating' icon={faHandshake} spinPulse size="2xl" />
    </div>
  )
}
