import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './forgot_password_form.css';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { email_checker } from '../email_checker/email_checker';
function ForgotPasswordForm({close, setOpenOtpWindow}) {
    const [reverseAnimation, setReverseAnimation] = useState(false);   
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState({
        errorCheck: false,
        errorContent : ''
    });
    const navigateTo = useNavigate();  
    const emailChange = (e)=>{
        setEmail(e.target.value);
    }
    const forgotPasswordHandle = (e)=>{
        e.preventDefault();
        if(email_checker(email)){
            navigateTo(`/login/otp/${email}`);    
            setErrorMessage({...errorMessage, errorCheck : false, errorContent: ''});
        }else{
            setErrorMessage({...errorMessage, errorCheck : true, errorContent: 'Email sintaksisi doğru deyil!'});
        }
    }    
    const closeWindowBox = ()=>{  
        setReverseAnimation(true);
        setTimeout(()=>{
            // close(false);  
            navigateTo('/login');
        },300)                
    }    
    return ( 
        <div className = {`forgot_password_form_container ${reverseAnimation ? 'forgot_password_form_close_animation' : 'forgot_password_form_open_animation'}`}>
            {/* window close button */}
            <div className="forgot_password_form_window_close" onClick={closeWindowBox}>
                <FontAwesomeIcon icon={faAngleLeft} ></FontAwesomeIcon>
                Geri
            </div>
            {/* form info */}
            <div className="forgot_password_form_info">
                Zəhmət olmasa <strong>e-mailinizi</strong> daxil edin və e-mailinizə gələn kodu daxil edərək yeni Şifrə yaradın !
            </div>
            {/* forgot password form */}
            <form action="#" method='post' className='forgot_password_form' onSubmit={forgotPasswordHandle}>
                {/* forgot email */}
                <div className="forgot_password_form_label_input">
                    <label htmlFor="forgot_email">
                        E-mail
                    </label>   
                    <input type="email" name="forgot_email" onChange={emailChange} required/>  
                </div>
                {/* error message */}
                {
                    errorMessage.errorCheck ? <div className="forgot_password_form_error_message">{errorMessage.errorContent}</div> : null
                }            
                {/* send otp button */}
                <input type="submit" value="Göndər" className= {`forgot_password_form_submit ${email_checker(email) ? 'forgot_password_form_submit_ready' : ''}`} />
            </form>                     
        </div>
     );
}

export default ForgotPasswordForm;
