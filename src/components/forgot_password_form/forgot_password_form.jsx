import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './forgot_password_form.css';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function ForgotPasswordForm({close, setOpenOtpWindow}) {
    const [errorMessage, setErrorMessage] = useState(false);  
    const [reverseAnimation, setReverseAnimation] = useState(false);   
    const [email, setEmail] = useState('');
    const navigateTo = useNavigate();  
    const emailChange = (e)=>{
        setEmail(e.target.value);
    }
    const forgotPasswordHandle = (e)=>{
        e.preventDefault();
        // setOpenOtpWindow(true);
        navigateTo(`/login/otp/${email}`);
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
                <label htmlFor="forgot_email">
                    E-mail
                    <input type="email" name="forgot_email" onChange={emailChange} required/>
                </label>    
                {
                    errorMessage ? <div className="forgot_password_form_error_message">E-mail ilə hesab tapılmadı</div> : null
                }            
                {/* send otp button */}
                <input type="submit" value="Göndər" className='forgot_password_form_submit' />
            </form>                     
        </div>
     );
}

export default ForgotPasswordForm;
