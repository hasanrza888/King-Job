import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './forgot_password_form.css';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { email_checker } from '../email_checker/email_checker';
import { verifyEmailAndSendOtp,emailIsUserOrCompany } from '../../apiservices';
import {toast} from 'react-toastify'
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
    const forgotPasswordHandle = async (e)=>{
        e.preventDefault();
        try {
            if(email_checker(email)){
                const {data:dataEmail} = await emailIsUserOrCompany({email,permission_id:'0f12_j_1'})
                if(dataEmail.succes){
                    const {data} = await verifyEmailAndSendOtp({email,type:dataEmail.u_t_p==='u_s_r' ?'u_password_changing':'c_password_changing'});
                    if(data.succes){
                        navigateTo(`/login/otp/${email}`);    
                        setErrorMessage({...errorMessage, errorCheck : false, errorContent: ''});
                        toast.success(data.message, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                    else{
                        setErrorMessage({...errorMessage, errorCheck : true, errorContent:data.    message});
                    }

                }else{
                    setErrorMessage({...errorMessage, errorCheck : true, errorContent:dataEmail. message});
                }
                
                
            }else{
                setErrorMessage({...errorMessage, errorCheck : true, errorContent: 'Email sintaksisi doğru deyil!'});
            }
        } catch (error) {
            if(error.response && error.response.data){
                setErrorMessage({...errorMessage, errorCheck : true, errorContent:error.response.data.message});

            }
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
