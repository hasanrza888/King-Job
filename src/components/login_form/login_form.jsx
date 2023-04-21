import './login_form.css';
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ForgotPasswordForm from '../forgot_password_form/forgot_password_form';
import { Link } from 'react-router-dom';
import Signup from '../../pages/signup/signup';
import SendOtpForm from '../sendOtpForm/sendOtpForm';
import UpdatePasswordForm from '../update_password_form/update_password_form';
import axios from 'axios';

function LoginForm({setSuccessMsg, setloginMsg}) {
    const [loginData,setLoginData] = useState({
        email:"",
        password:""
    });
    const postUrl = 'http://localhost:5000/api/loginCompany';
    const [email,setEmail] = useState("");
    const [otp,setOtp] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [error,setError] = useState("");
    const [openOtpWindow, setOpenOtpWindow] = useState(false);
    const [newPasswordForm, setNewPassword] = useState(false);
    const show_password_handle = ()=>{
        setShowPassword(!showPassword);
    }
    const forgot_password = ()=>{
        setForgotPassword(true);
    }      
    const getOnchangeData=(e)=>{
        const {name,value} = e.target;
        setLoginData(prev=>{
            return {
                ...prev,
                [name]:value
            }
        })  
    }
    const submitLoginData = async (e) => {
        e.preventDefault();
        axios.post(postUrl,loginData,{withCredentials:true}).then(dt=>{
            console.log(dt.data)
            if(dt.data.succes===false){
                setErrorMessage(true);
                setError(dt.data.message)
            }
            else{
                setErrorMessage(false)
            }
        }).catch(err=>{
            console.log(err)
        })
        console.log(loginData)
    }
    return ( 
            <div className="login_Form">
                <form onSubmit={submitLoginData} className="login_page_form">
                    {/* login email */}
                    <label htmlFor="email">
                        E-mail
                        <input onChange={getOnchangeData} value={loginData.email} type="email" name="email" className="login_email_input" required />
                    </label>
                    {/* login password */}
                    <label htmlFor="password">
                        Şifrə
                        <div className="login_password_container">
                            {/* password login */}
                            <input onChange={getOnchangeData} value={loginData.password} type={showPassword ? 'text' : 'password'} className="login_password_input" name="password" required />
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
                        errorMessage ? <div className="login_form_error_message">{error}</div> : null
                    }
                    {/* forgotten password button */}
                    <button className='login_form_forgot_password_btn' type='reset' onClick={forgot_password}>Şifrəni Unutmuşam</button>                
                    {/* login form submit button */}
                    <button type="submit" className="login_form_submit_btn">Daxil OL</button>
                    <div className="login_form_link_to_signUp_container">
                        Hesabınız yoxdur? <Link to='/signup' className='login_form_link_to_signUp'>Qeydiyyatdan Keçin</Link>
                    </div>
                </form> 
                {/* forgot password form */}
                {
                    forgotPassword ? <ForgotPasswordForm email={email} setEmail={setEmail} close = {setForgotPassword} setOpenOtpWindow = {setOpenOtpWindow}/> : null
                }
                {/* otp code form */}
                {
                    openOtpWindow ? <SendOtpForm email={email} setEmail={setEmail} otp={otp} setOtp={setOtp} setOpenOtpWindow = {setOpenOtpWindow} setNewPassword = {setNewPassword}/> : null 
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