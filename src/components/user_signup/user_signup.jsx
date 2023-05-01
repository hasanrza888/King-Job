import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './user_signup.css';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import PasswordChecker from '../password_checker/password_checker';
import SendOtpForm from '../sendOtpForm/sendOtpForm';
import { Link } from 'react-router-dom';
function UserSignup() {
    const [showPassword, setShowPassword] = useState(false);
    // password checker object for update password form
    const [pasLength, setPasLength] = useState(false);
    const [upperCase, setUpperCase] = useState(false);
    const [lowerCase, setLowerCase] = useState(false);
    const [openOtpWindow, setOpenOtpWindow] = useState(false);
    // error message runner for password generation
    const [errorMessage, setErrorMessage] = useState({
        errorCheck: false,
        errorContent : ''
    }); 
    
    const show_password_handle = ()=>{
        setShowPassword(!showPassword);
    } 
    const checkPasswordHandle = (e)=>{
        passwordCheckerFunction(e.target.value);
    }
    const passwordCheckerFunction = (value)=>{
        const passwordValue = value;
        // checking uppercase value
        checkUpperCase(passwordValue);
        // checking lowercase value
        checkLowerCase(passwordValue);
        // checking length of password value
        checkLengthPassword(passwordValue);
    }
    const checkUpperCase = (passwordValue)=>{
        setUpperCase(/[A-Z]/.test(passwordValue));
    }
    const checkLowerCase = (passwordValue)=>{
        setLowerCase(/[a-z]/.test(passwordValue));
    }
    const checkLengthPassword = (passwordValue)=>{
        setPasLength(passwordValue.length >= 8);
    }
    const user_signup_Handle = (e)=>{
        e.preventDefault();
        if((e.target.user_signup_password.value === e.target.user_signup_repeat_password.value) && (pasLength === true && upperCase === true && lowerCase === true)){            
            setErrorMessage(false);                        
            setOpenOtpWindow(true);
        }else{
            if(e.target.user_signup_password.value !== e.target.user_signup_repeat_password.value){
                setErrorMessage({...errorMessage, errorCheck: true, errorContent : 'Şifrələr eyni deyil !'});
            }else if(pasLength === false || upperCase === false || lowerCase === false){
                setErrorMessage({...errorMessage, errorCheck: true, errorContent : 'Şifrələnmə qaydası pozulmuşdur !'});
            }else{
                setErrorMessage({...errorMessage, errorCheck: false, errorContent : ''});
            }                        
        }
    }
    return ( 
        <div className="user_signup_container">
            {/* user sign up form container */}
            <form action="#" className='user_signup_form_container' onSubmit={user_signup_Handle}>
                {/* form name and surname */}
                <label htmlFor="user_signup_name_surname">
                    Ad və Soyad
                    <input type="text" name="user_signup_name_surname" className='user_signup_email_input' required/>
                </label>
                {/* form email */}
                <label htmlFor="user_signup_email">
                    E-mail
                    <input type="email" name="user_signup_email" className='user_signup_email_input' required/>
                </label>
                {/* password input */}
                <label htmlFor="user_signup_password">
                    Şifrə
                    <div className="user_signup_password_container">
                        {/* password login */}
                        <input type={showPassword ? 'text' : 'password'} onChange={checkPasswordHandle} className="user_signup_password_input" name="user_signup_password" required />
                        {/* password show and hide buttons */}
                        <div className="user_signup_password_show_btn" onClick={show_password_handle}>
                            {showPassword ? 
                            <FontAwesomeIcon icon={faEyeSlash} />
                            :
                            <FontAwesomeIcon icon={faEye} />
                            } 
                        </div>                                                                               
                    </div>                        
                </label>
                {/* repeat password input */}
                <label htmlFor="user_signup_repeat_password">
                    Təkrar Şifrə
                    <div className="user_signup_password_container">
                        {/* repeat password login */}
                        <input type={showPassword ? 'text' : 'password'} className="user_signup_password_input" name="user_signup_repeat_password" required />
                        {/* password show and hide buttons */}
                        <div className="user_signup_password_show_btn" onClick={show_password_handle}>
                            {showPassword ? 
                            <FontAwesomeIcon icon={faEyeSlash} />
                            :
                            <FontAwesomeIcon icon={faEye} />
                            } 
                        </div>                                                                               
                    </div>                        
                </label>
                {/* error message for password generation */}
                {
                    errorMessage ? <div className="user_signup_form_error_message">{errorMessage.errorContent}</div> : null
                }
                <PasswordChecker pasLength={pasLength} upperCase={upperCase} lowerCase={lowerCase}/>
                {/* form submit button */}
                <input type="submit" className='user_signup_submit_btn' value="Qeydiyyat" />
                <div className="user_signup_link_to_login_page">Hesabınız varsa <Link to='/login'>Daxil olun !</Link> </div>
            </form>
            {openOtpWindow ? <SendOtpForm openOtpWindow = {openOtpWindow} setOpenOtpWindow = {setOpenOtpWindow} userSignUp = {true}/> : null }
            
        </div>
    );
}
export default UserSignup;