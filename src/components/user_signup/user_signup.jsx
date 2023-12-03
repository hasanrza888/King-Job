import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './user_signup.css';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import PasswordChecker from '../password_checker/password_checker';
import SendOtpForm from '../sendOtpForm/sendOtpForm';
import { Link } from 'react-router-dom';
import { email_checker } from '../email_checker/email_checker';
import { validateUserData } from '../../apiservices';
import { toast } from 'react-toastify';
import PageTitle from '../page_title_maker/page_title';


function UserSignup() {
    const [showPassword, setShowPassword] = useState(false);
    // password checker object for update password form
    const [pasLength, setPasLength] = useState(false);
    const [upperCase, setUpperCase] = useState(false);
    const [lowerCase, setLowerCase] = useState(false);
    const [openOtpWindow, setOpenOtpWindow] = useState(false);
    // error message runner
    const [errorMessage, setErrorMessage] = useState({
        errorCheck: false,
        errorContent : ''
    }); 
    const [formInfo, setFormInfo] = useState({
        name: '',
        email: '',
        password: '',
        passwordRepeat:''
    })
    const [importantInputField, setImportantInputField] = useState({
        user_signup_name_surname: false,
        user_signup_email: false,
        user_signup_password: false,
        user_signup_repeat_password: false,
    })
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
    const importantFieldFunc = (e)=>{
        const {name, value} = e.target;
        // copy of useState
        const copyOfArray = {...importantInputField}
        for(let i of Object.keys(copyOfArray)){
            if(i === name){
                if(value.length > 0){
                    copyOfArray[i] = true;
                }else{
                    copyOfArray[i] = false;
                }
            }            
        }
        setImportantInputField({...copyOfArray});
    }
    const validateuserdata = async ()=>{
        try {
            const {data} = await validateUserData(formInfo);
            return data
        } catch (error) {
            if(error.response && error.response.data){
                return error.response.data
            }
        }
    }
    
    const user_signup_Handle = async(e)=>{
        e.preventDefault();
        if((e.target.user_signup_password.value === e.target.user_signup_repeat_password.value) && (pasLength && upperCase && lowerCase && email_checker(formInfo.email))){    
            setErrorMessage({errorCheck:false,errorContent:''});
            const data = await validateuserdata();
            if(data.succes){
                setOpenOtpWindow(true);
                setErrorMessage({errorCheck:false,errorContent:''});
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
                setErrorMessage({errorCheck:true,errorContent:data.message})
            }
        }
        else{
            if(!email_checker(formInfo.email)){
                setErrorMessage({...errorMessage, errorCheck: true, errorContent : 'Email sintaksisi doğru deyil!'});
            }else if(e.target.user_signup_password.value !== e.target.user_signup_repeat_password.value){
                setErrorMessage({...errorMessage, errorCheck: true, errorContent : 'Şifrələr eyni deyil !'});
            }else if(pasLength === false || upperCase === false || lowerCase === false){
                setErrorMessage({...errorMessage, errorCheck: true, errorContent : 'Şifrələnmə qaydası pozulmuşdur !'});
            }else{
                setErrorMessage({...errorMessage, errorCheck: false, errorContent : ''});
            }                        
        }
    }
    useEffect(()=>{
        PageTitle('Namizəd Qeydiyyatı');
    },[])
    return ( 
        <div className="user_signup_container">
            {/* otp window and user signup form */}
            {openOtpWindow ? 
            <SendOtpForm openOtpWindow = {openOtpWindow} setOpenOtpWindow = {setOpenOtpWindow} tema='user_register' data={formInfo}/> 
            : 
            <form action="#" className='user_signup_form_container' onSubmit={user_signup_Handle}>
                {/* ______________ user sign up form ________________________________ */} 
                {/* form name and surname */}
                <div className="user_signup_form_label_input">
                    <label htmlFor="user_signup_name_surname">
                        Ad və Soyad
                    </label>   
                    <input type="text" name="user_signup_name_surname" className='user_signup_email_input' onChange={(e)=> {importantFieldFunc(e); setFormInfo({...formInfo, name: e.target.value})}} required/>
                </div>
                {/* form email */}
                <div className="user_signup_form_label_input">
                    <label htmlFor="user_signup_email">
                        E-mail
                    </label>    
                    <input type="email" name="user_signup_email" className='user_signup_email_input' onChange={(e)=> {importantFieldFunc(e); setFormInfo({...formInfo, email: e.target.value})}} required/>
                </div>
                {/* password input */}
                <div className="user_signup_form_label_input">
                    <label htmlFor="user_signup_password">
                        Şifrə                
                    </label> 
                    <div className="user_signup_password_container">
                        {/* password login */}
                        <input type={showPassword ? 'text' : 'password'} className="user_signup_password_input" name="user_signup_password" onChange={(e)=> {importantFieldFunc(e); checkPasswordHandle(e); setFormInfo({...formInfo, password: e.target.value})}} required />
                        {/* password show and hide buttons */}
                        <div className="user_signup_password_show_btn" onClick={show_password_handle}>
                            {showPassword ? 
                            <FontAwesomeIcon icon={faEyeSlash} />
                            :
                            <FontAwesomeIcon icon={faEye} />
                            } 
                        </div>                                                                               
                    </div>     
                </div>
                {/* repeat password input */}
                <div className="user_signup_form_label_input">
                    <label htmlFor="user_signup_repeat_password">
                        Təkrar Şifrə                        
                    </label>  
                    <div className="user_signup_password_container">
                        {/* repeat password login */}
                        <input type={showPassword ? 'text' : 'password'} className="user_signup_password_input" name="user_signup_repeat_password" onChange={(e)=> {importantFieldFunc(e);setFormInfo({...formInfo, passwordRepeat: e.target.value})}} required />
                        {/* password show and hide buttons */}
                        <div className="user_signup_password_show_btn" onClick={show_password_handle}>
                            {showPassword ? 
                            <FontAwesomeIcon icon={faEyeSlash} />
                            :
                            <FontAwesomeIcon icon={faEye} />
                            } 
                        </div>                                                                               
                    </div>  
                </div>
                {/* error message for password generation */}
                {
                    errorMessage ? <div className="user_signup_form_error_message">{errorMessage.errorContent}</div> : null
                }
                <PasswordChecker pasLength={pasLength} upperCase={upperCase} lowerCase={lowerCase}/>
                {/* button info */}
                <div className="company_signup_form_btn_info">* Qeydiyyat düyməsinə basmaqla e-mail-inizə OTP kod gələcək.</div>
                {/* form submit button */}
                <input type="submit" className={`user_signup_submit_btn ${ importantInputField.user_signup_email && importantInputField.user_signup_name_surname && importantInputField.user_signup_password && importantInputField.user_signup_repeat_password ? "user_signup_submit_btn_ready" : null}`} value="Qeydiyyat" />
                <div className="user_signup_link_to_login_page">Hesabınız varsa <Link to='/login'>Daxil olun !</Link> </div>
            </form>
            }
        </div>
    );
}
export default UserSignup;