import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './sendOtpForm.css'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationMessage from '../notification_message/notification_message';
function SendOtpForm({setOpenOtpWindow, setNewPassword, login, userSignUp, company_SignUp}) {
    const [reverseAnimation, setReverseAnimation] = useState(false); 
    const [countDown, setCountDown] = useState(120);
    const [errorMessage, setErrorMessage] = useState({
        errorCheck: false,
        errorContent : ''
    }); 
    const [successMsg, setSuccessMsg] = useState(false);
    const navigate = useNavigate();
    const [notification_message_content, setNotification_message_content] = useState('');
    const sendOtpCodeHandle = (e)=>{
        e.preventDefault();                
        if(login === true){
            setNewPassword(true);
        }else if(userSignUp === true){
            setSuccessMsg(true);
            setNotification_message_content('Qeydiyyatınız uğurlu oldu !');
            setTimeout(()=>{
                navigate('/login');    
            }, 5000);            
        }
    }
    const closeWindowBox = ()=>{  
        setReverseAnimation(true);        
        setTimeout(()=>{
            setOpenOtpWindow(false);  
        },300);            
    } 
    useEffect(()=>{
        const timer = countDown > 0 ? setInterval(()=>{
            const timeOtp = countDown - 1;
            setCountDown(timeOtp);
        }, 1000) : null  
         
        return ()=> clearInterval(timer);
    }, [countDown]);

    return ( 
        <div className={`${(company_SignUp || userSignUp) ? "send_top_form_container send_top_form_container_signup" : "send_top_form_container"}  ${ reverseAnimation ? "send_top_form_close_animation" : "send_top_form_open_animation"}`}>
            {/* window close button */}
            <div className="forgot_password_form_window_close" onClick={closeWindowBox}>
                <FontAwesomeIcon icon={faAngleLeft} ></FontAwesomeIcon>
                Geri
            </div>
            {/* form info */}
            <div className="forgot_password_form_info">
                OTP Kodu daxil edin
            </div>
            <form action="#" className="send_top_form" onSubmit={sendOtpCodeHandle}>
                {/* otp code input */}
                <label htmlFor="otpcodeipnut">
                    OTP Kod
                    <input type="text" name='otpcodeinput' className="send_top_form_input" required/>
                </label>
                {
                    errorMessage ? <div className="send_otp_form_error_message">{errorMessage.errorContent}</div> : null
                } 
                {/* countdown for OTP */}
                <div className='count_Down_Otp'>
                    {countDown > 0 ? `${countDown} saniyə sonra bitəcək !` : 'Vaxt bitdi !'} 
                </div>
                {/* form confirm button */}
                <input type="submit" value="Təsdiqlə" className="send_top_form_submit"/>
            </form>
            {successMsg ? <NotificationMessage setSuccessMsg = {setSuccessMsg} notification_message_content = {notification_message_content} /> : null}
        </div>
    );
}

export default SendOtpForm;
