import './login_form.css';
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ForgotPasswordForm from '../forgot_password_form/forgot_password_form';
import { Link } from 'react-router-dom';
import SendOtpForm from '../sendOtpForm/sendOtpForm';
import UpdatePasswordForm from '../update_password_form/update_password_form';

function LoginForm({setSuccessMsg, setloginMsg}) {
    const [showPassword, setShowPassword] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [openOtpWindow, setOpenOtpWindow] = useState(false);
    const [newPasswordForm, setNewPassword] = useState(false);
    const show_password_handle = ()=>{
        setShowPassword(!showPassword);
    }
    const forgot_password = ()=>{
        setForgotPassword(true);
    }      
    return ( 
            <div className="login_Form">
                <form action="#" className="login_page_form">
                    {/* login email */}
                    <label htmlFor="login_email">
                        E-mail
                        <input type="email" name="login_email" className="login_email_input" required />
                    </label>
                    {/* login password */}
                    <label htmlFor="login_password">
                        Şifrə
                        <div className="login_password_container">
                            {/* password login */}
                            <input type={showPassword ? 'text' : 'password'} className="login_password_input" name="login_password" required />
                            {/* password show and hide buttons */}
                            <div className="login_password_show_btn" onClick={show_password_handle}>
                                {showPassword ? 
                                <FontAwesomeIcon icon={faEyeSlash} />
                                :
                                <FontAwesomeIcon icon={faEye} />
                                } 
                            </div>                                                                               
                        </div>                        
                    </label>
                    {/* error message */}
                    {
                        errorMessage ? <div className="login_form_error_message">e-mail və ya şifrə səhvdir !</div> : null
                    }
                    {/* forgotten password button */}
                    <button className='login_form_forgot_password_btn' type='reset' onClick={forgot_password}>Şifrəni Unutmuşam</button>                
                    {/* login form submit button */}
                    <button type="submit" className="login_form_submit_btn">Daxil OL</button>
                    <div className="login_form_link_to_signUp_container">
                        Hesabınız yoxdur? <Link to='/signup/user_signup' className='login_form_link_to_signUp'>Qeydiyyatdan Keçin</Link>
                    </div>
                </form> 
                {/* forgot password form */}
                {
                    forgotPassword ? <ForgotPasswordForm close = {setForgotPassword} setOpenOtpWindow = {setOpenOtpWindow}/> : null
                }
                {/* otp code form */}
                {
                    openOtpWindow ? <SendOtpForm setOpenOtpWindow = {setOpenOtpWindow} setNewPassword = {setNewPassword} login = { openOtpWindow ? true : false}/> : null 
                }
                {/* set new password form */}
                {
                    newPasswordForm ? 
                    <UpdatePasswordForm 
                    setNewPassword = {setNewPassword} 
                    setOpenOtpWindow = {setOpenOtpWindow} 
                    close = {setForgotPassword} 
                    setSuccessMsg = {setSuccessMsg}
                    setloginMsg = {setloginMsg}
                    /> : null
                }
            </div>                                                 
     );
}

export default LoginForm;