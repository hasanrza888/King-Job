import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './update_password_form.css';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import PasswordChecker from '../password_checker/password_checker';
function UpdatePasswordForm({setNewPassword, setOpenOtpWindow, close, setSuccessMsg, setloginMsg}) {
    const [showPassword, setShowPassword] = useState(false);
    // error message runner for otp 
    const [errorMessage, setErrorMessage] = useState({
        errorCheck: false,
        errorContent : ''
    }); 
    const [reverseAnimation, setReverseAnimation] = useState(false); 
    // password checker object for update password form
    const [pasLength, setPasLength] = useState(false);
    const [upperCase, setUpperCase] = useState(false);
    const [lowerCase, setLowerCase] = useState(false);
    const Navigate = useNavigate();
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
    const updatePasswordHandle = (e)=>{
        e.preventDefault();
        if((e.target.new_password.value === e.target.repeate_password.value) && (pasLength === true && upperCase === true && lowerCase === true)){
            setNewPassword(false);
            Navigate("/login");
            setErrorMessage(false);
            setOpenOtpWindow(false);
            close(false);
            // _____ if password restoration was success
            // opens message box
            setSuccessMsg(true);
            // message content
            setloginMsg('Şifrəniz uğurla yeniləndi !');
        }else{
            if(e.target.new_password.value !== e.target.repeate_password.value){
                setErrorMessage({...errorMessage, errorCheck: true, errorContent : 'Şifrələr eyni deyil !'});
            }else if(pasLength === false || upperCase === false || lowerCase === false){
                setErrorMessage({...errorMessage, errorCheck: true, errorContent : 'Şifrələnmə qaydası pozulmuşdur !'});
            }else{
                setErrorMessage({...errorMessage, errorCheck: false, errorContent : ''});
            }                        
        }
    }
    const closeWindowBox = ()=>{  
        setReverseAnimation(true);
        setTimeout(()=>{
            setNewPassword(false);
        },300)                
    } 
    return ( 
        <div className= {`update_password_form_container ${ reverseAnimation ? "update_password_form_close_animation" : "update_password_form_open_animation"}`}>
            {/* window close button */}
            <div className="forgot_password_form_window_close" onClick={closeWindowBox}>
                <FontAwesomeIcon icon={faAngleLeft} ></FontAwesomeIcon>
                Geri
            </div>
            {/* form info */}
            <div className="forgot_password_form_info">
                Zəhmət olmasa yeni Şifrə yaradın !
            </div>
            <form action="#" className='update_password_form' onSubmit={updatePasswordHandle}>
                {/* new password */}
                <label htmlFor="new_password">
                    Yeni Şifrə
                    <div className="login_password_container">
                        {/* password login */}
                        <input type={showPassword ? 'text' : 'password'} onChange={checkPasswordHandle} className="login_password_input" name="new_password" required />
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
                {/* repeate password */}
                <label htmlFor="repeate_password">
                    Təkrar Şifrə
                    <div className="login_password_container">
                        {/* password login */}
                        <input type={showPassword ? 'text' : 'password'} className="login_password_input" name="repeate_password" required />
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
                {/* error message for OTP delivery */}
                {
                    errorMessage ? <div className="forgot_password_form_error_message">{errorMessage.errorContent}</div> : null
                } 
                <PasswordChecker pasLength={pasLength} upperCase={upperCase} lowerCase={lowerCase}/>
                <input type="submit" value="Şifrəni yenilə" className='update_password_form_submit' />           
            </form>            
        </div>
     );
}
export default UpdatePasswordForm;