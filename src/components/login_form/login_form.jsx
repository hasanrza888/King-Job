import './login_form.css';
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ForgotPasswordForm from '../forgot_password_form/forgot_password_form';
import { Link, useNavigate } from 'react-router-dom';
import SendOtpForm from '../sendOtpForm/sendOtpForm';
import UpdatePasswordForm from '../update_password_form/update_password_form';
import { email_checker } from '../email_checker/email_checker';
import { toast } from 'react-toastify';

function LoginForm() {
    const [formInfo, setFormInfo] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        errorCheck: false,
        errorContent : ''
    });
    const [sendingData, setSendingData] = useState(false);
    const navigateTo = useNavigate();
    const show_password_handle = ()=>{
        setShowPassword(!showPassword);
    }
    // forgot password
    const forgot_password = ()=>{
        navigateTo('/login/forgot_password');
    }      
    // email handle function
    const email_change_Func = (e)=>{
        setFormInfo({...formInfo, email: e.target.value});
    }
    // password handle function
    const form_password_handle = (e)=>{
        setFormInfo({...formInfo, password: e.target.value});
    }
    // form Submit function
    const login_form_handle = (e)=>{
        e.preventDefault();
        // email checking process
        if(!email_checker(formInfo.email)){
            setErrorMessage({...errorMessage, errorCheck: true, errorContent: "Email sintaksisi doğru deyil!"});
        }else{
            setErrorMessage({...errorMessage, errorCheck: false, errorContent: ""});
            setSendingData(true);
            toast.success('Uğurla daxil oldunuz !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            // go to profil
        }
    }
    return ( 
            <div className="login_Form">
                <form action="#" method='post' onSubmit={login_form_handle} className="login_page_form">
                    {/* login email */}
                    <div className="login_Form_label_input">
                        <label htmlFor="login_email">
                            E-mail
                        </label>
                        <input type="email" name="login_email" className="login_email_input" onChange={email_change_Func} required />
                    </div>
                    {/* login password */}
                    <div className="login_Form_label_input">
                        <label htmlFor="login_password">
                            Şifrə                       
                        </label>  
                        <div className="login_password_container">
                            {/* password login */}
                            <input type={showPassword ? 'text' : 'password'} onChange={form_password_handle} className="login_password_input" name="login_password" required />
                            {/* password show and hide buttons */}
                            <div className="login_password_show_btn" onClick={show_password_handle}>
                                {showPassword ? 
                                <FontAwesomeIcon icon={faEyeSlash} />
                                :
                                <FontAwesomeIcon icon={faEye} />
                                } 
                            </div>                                                                               
                        </div>  
                    </div>
                    {/* error message */}
                    {
                        errorMessage.errorCheck ? <div className="login_form_error_message">{errorMessage.errorContent}</div> : null
                    }
                    {/* forgotten password button */}
                    <button className='login_form_forgot_password_btn' type='reset' onClick={forgot_password}>Şifrəni Unutmuşam</button>                
                    {/* login form submit button */}
                    <div className="login_form_submit_btn_container">
                        <button type="submit" className={`login_form_submit_btn ${formInfo.email && formInfo.password ? 'login_form_submit_btn_ready' : ''}`}>Daxil OL</button>
                        {
                            sendingData ? <div className="send_data_submit_btn_loader"></div> : ''
                        }  
                    </div>
                    <div className="login_form_link_to_signUp_container">
                        Hesabınız yoxdur? <Link to='/signup/user_signup' className='login_form_link_to_signUp'>Qeydiyyatdan Keçin</Link>
                    </div>
                </form> 
            </div>                                                 
     );
}

export default LoginForm;
