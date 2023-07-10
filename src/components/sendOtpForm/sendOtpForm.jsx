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
    const [otpInputValue, setOtpInputValue] = useState('');
    const [otpChecking, setOtpChecking] = useState(false);
    const sendOtpCodeHandle = (e)=>{
        e.preventDefault();    
        // showing loader animation when otp code checking
        if(otpInputValue.length === 6){
            setOtpChecking(true);
        }            
        if(login === true){
            setNewPassword(true);
        }else if((userSignUp === true && !otpChecking) || (company_SignUp === true && !otpChecking)){
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
        if(!otpChecking){
            const timer = countDown > 0 ? setInterval(()=>{
                const timeOtp = countDown - 1;
                setCountDown(timeOtp);
            }, 1000) : null  
             
            return ()=> clearInterval(timer);
        }
    }, [countDown]);
    // function for send otp again button
    const sendOtpAgain = ()=>{
        setCountDown(120);
        setOtpInputValue('');
        setOtpChecking(false);
    }
    const otpInputHandle = (e)=>{
        if(e.target.value.length <= 6){
            setOtpInputValue(e.target.value);   
        }
    }
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
                <label htmlFor="otpcodeinput">
                    OTP Kod
                    <input type="text" name='otpcodeinput' onChange={otpInputHandle} value={otpInputValue} className="send_top_form_input" required/>
                </label>
                {
                    errorMessage ? <div className="send_otp_form_error_message">{errorMessage.errorContent}</div> : null
                } 
                {/* countdown for OTP */}
                <div className='count_Down_Otp'>
                    {countDown > 0 && otpChecking === false ? `${countDown} saniyə sonra bitəcək !`: otpChecking ? '' : 'Vaxt bitdi !'} 
                </div>
                {/* send otp code again button */}
                <button type='button' onClick={sendOtpAgain} className='send_otp_again_btn'>Yenidən göndər !</button>                
                {/* form confirm button */}
                <div className="send_otp_form_submit_btn_container">
                    <input type="submit" value="Təsdiqlə" className= {`send_otp_form_submit ${otpInputValue.length === 6 ? 'send_otp_form_submit_ready' : '' }`}/>
                    {
                        otpChecking ? <div className="send_otp_form_submit_btn_loader"></div> : null
                    }                    
                </div>                
            </form>
            {successMsg ? <NotificationMessage setSuccessMsg = {setSuccessMsg} notification_message_content = {notification_message_content} /> : null}
        </div>
    );
}

export default SendOtpForm;
