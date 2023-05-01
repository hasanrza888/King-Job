import { faCircleCheck, faCircleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './notification_message.css';
import { useEffect } from "react";
function NotificationMessage({setSuccessMsg, notification_message_content}) {
    // automatically closing of message block
    useEffect(()=>{
        setTimeout(()=>{
            setSuccessMsg(false);
        }, 4600);
    },[setSuccessMsg]);
    return (         
        <div className= "notification_message_container">
            {/* message window close button */}
            <div className="notification_message_header">
                <FontAwesomeIcon icon={faCircleCheck} className="notification_message_info_icon"/>
                {/* <FontAwesomeIcon icon={faCircleExclamation} className="notification_message_info_icon"/> */}
                <div className="notification_progress_bar">
                    <progress value="100" min="0" max="100" style={{visibility:'hidden', height:0 + 'px', width:0 + 'px'}}></progress>
                    <FontAwesomeIcon icon={faXmark} className="notification_message_close" onClick={()=> setSuccessMsg(false)} />
                </div>                    
            </div>
            {/* message body text */}
            <div className="notification_message_body">
                {notification_message_content}
            </div>
        </div>
     );
}
export default NotificationMessage;