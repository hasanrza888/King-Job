import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './update_password_form.css';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import PasswordChecker from '../password_checker/password_checker';
import { toast } from 'react-toastify';
import { email_checker } from '../email_checker/email_checker';
function UpdatePasswordForm({setNewPassword, setOpenOtpWindow, close}) {
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
    const [pasValues, setPasValues] = useState({
        newPass: '',
        repeatPass: ''
    })
    const {email, otp} = useParams();
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
    const password_change_handle = (e, name)=>{
        if(name === 'new_password'){
            setPasValues({...pasValues, newPass: e.target.value});    
        }else if(name === 'repeate_password'){
            setPasValues({...pasValues, repeatPass: e.target.value}); 
        }
    }
    const updatePasswordHandle = (e)=>{
        e.preventDefault();
        if((e.target.new_password.value === e.target.repeate_password.value) && (pasLength === true && upperCase === true && lowerCase === true)){
            // setNewPassword(false);
            Navigate("/login");
            setErrorMessage(false);
            // _____ if password restoration was success
            // opens message box
            // message content
            toast.success('Şifrəniz uğurla yeniləndi ! Hesabınıza daxil ola bilərsiniz.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
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
    // back button
    const closeWindowBox = ()=>{  
        setReverseAnimation(true);
        setTimeout(()=>{
            // setNewPassword(false);
            Navigate(`/login/otp/${email}`);
        },300)                
    } 
    return ( 
        <div> 
            {
                email_checker(email) && otp.length === 6 ?
                <div className= {`update_password_form_container ${ reverseAnimation ? "update_password_form_close_animation" : "update_password_form_open_animation"}`}>
                    {/* window close button */}
                    {console.log(pasValues)}
                    <div className="forgot_password_form_window_close" onClick={closeWindowBox}>
                        <FontAwesomeIcon icon={faAngleLeft} ></FontAwesomeIcon>
                        Geri
                    </div>
                    {/* form info */}
                    <div className="forgot_password_form_info">
                        Zəhmət olmasa yeni Şifrə yaradın !
                    </div>
                    <form action="#" method='post' className='update_password_form' onSubmit={updatePasswordHandle}>
                        {/* new password */}
                        <div className="update_password_form_label_input">
                            <label htmlFor="new_password">
                                Yeni Şifrə                      
                            </label>
                            <div className="login_password_container">
                                {/* password login */}
                                <input type={showPassword ? 'text' : 'password'} onChange={(e)=>{checkPasswordHandle(e); password_change_handle(e, 'new_password')}} className="login_password_input" name="new_password" required />
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
                        {/* repeate password */}
                        <div className="update_password_form_label_input">
                            <label htmlFor="repeate_password">
                                Təkrar Şifrə                       
                            </label> 
                            <div className="login_password_container">
                                {/* password login */}
                                <input type={showPassword ? 'text' : 'password'} onChange={(e)=>{password_change_handle(e, 'repeate_password')}} className="login_password_input" name="repeate_password" required />
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
                        {/* error message for OTP delivery */}
                        {
                            errorMessage ? <div className="forgot_password_form_error_message">{errorMessage.errorContent}</div> : null
                        } 
                        <PasswordChecker pasLength={pasLength} upperCase={upperCase} lowerCase={lowerCase}/>
                        <input type="submit" value="Şifrəni yenilə" className={`update_password_form_submit ${pasLength && upperCase && lowerCase && pasValues.newPass === pasValues.repeatPass && pasValues.newPass.length > 0 ? 'update_password_form_submit_ready' : ''}`} />           
                    </form>            
                </div>
                : <p className='error_found_text'>Email və ya OTP kod doğru deyil !</p>
            }
        </div>
     );
}
export default UpdatePasswordForm;