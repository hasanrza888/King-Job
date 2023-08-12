import { useState } from 'react';
import './company_signup.css';
import PasswordChecker from '../password_checker/password_checker';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SendOtpForm from '../sendOtpForm/sendOtpForm';
import { Link } from 'react-router-dom';
import { email_checker } from '../email_checker/email_checker';
function CompanySignup() {
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
    const [formInfo, setFormInfo] = useState({
        company_name: '',
        email: '',
        password: ''
    })
    const [showCondition, setShowCondition] = useState(false);
    const [acceptCondition, setAcceptCondition] = useState(false);
    const [importantInputField, setImportantInputField] = useState({
        company_signup_form_name: false,
        company_signup_form_company_email: false,
        company_signup_form_password: false,
        company_signup_form_repeat_password: false,
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
    const acceptConditionFunc = ()=>{
        setAcceptCondition(!acceptCondition);
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
    const company_signup_form_handle = (e)=>{
        e.preventDefault();
        if((e.target.company_signup_form_password.value === e.target.company_signup_form_repeat_password.value) && (pasLength && upperCase && lowerCase) && acceptCondition && email_checker(formInfo.email)){            
            setErrorMessage(false);                        
            setOpenOtpWindow(true);
        }else{
            if(!email_checker(formInfo.email)){
                setErrorMessage({...errorMessage, errorCheck: true, errorContent : 'Email sintaksisi doğru deyil!'});
            }else if(e.target.company_signup_form_password.value !== e.target.company_signup_form_repeat_password.value){
                setErrorMessage({...errorMessage, errorCheck: true, errorContent : 'Şifrələr eyni deyil !'});
            }else if(pasLength === false || upperCase === false || lowerCase === false){
                setErrorMessage({...errorMessage, errorCheck: true, errorContent : 'Şifrələnmə qaydası pozulmuşdur !'});
            }else if(acceptCondition === false){
                setErrorMessage({...errorMessage, errorCheck: true, errorContent : 'Şərtlərimizi qəbul etmədən qeydiyyatdan keçməyin !'});
            }else{
                setErrorMessage({...errorMessage, errorCheck: false, errorContent : ''});
            }                        
        }
    }
    const show_condition_func = ()=>{
        setShowCondition(!showCondition);
    }
    
    return ( 
        <div className="company_signup_container">                        
            {/* otp code form when submitting */}
            {openOtpWindow ? 
            <SendOtpForm openOtpWindow = {openOtpWindow} setOpenOtpWindow = {setOpenOtpWindow} company_SignUp = {true}/> 
            :             
            <form action="#" className="company_signup_form_container" onSubmit={company_signup_form_handle}>               
                {/* ________________ company signup form ________________  */}
                {/* company name */}
                <label htmlFor="company_signup_form_name">
                    Şirkət adı
                    <input type="text" name='company_signup_form_name' onChange={(e)=> {importantFieldFunc(e); setFormInfo({...formInfo, company_name: e.target.value})}} required/>
                </label>
                {/* company email */}
                <label htmlFor="company_signup_form_company_email">
                    E-mail
                    <input type="email" name="company_signup_form_company_email" onChange={(e)=> {importantFieldFunc(e); setFormInfo({...formInfo, email: e.target.value})}} required/>
                </label>
                {/* password input */}
                <label htmlFor="company_signup_form_password">
                    Şifrə
                    <div className="company_signup_form_password_container">
                        {/* password login */}
                        <input type={showPassword ? 'text' : 'password'} onChange={(e)=>{checkPasswordHandle(e); importantFieldFunc(e); setFormInfo({...formInfo, password: e.target.value})}} className="company_signup_form_password_input" name="company_signup_form_password" required />
                        {/* password show and hide buttons */}
                        <div className="company_signup_form_password_show_btn" onClick={show_password_handle}>
                            {showPassword ? 
                            <FontAwesomeIcon icon={faEyeSlash} />
                            :
                            <FontAwesomeIcon icon={faEye} />
                            } 
                        </div>                                                                               
                    </div>                        
                </label>
                {/* repeat password input */}
                <label htmlFor="company_signup_form_repeat_password">
                    Təkrar Şifrə
                    <div className="company_signup_form_password_container">
                        {/* repeat password login */}
                        <input type={showPassword ? 'text' : 'password'} onChange={(e)=> importantFieldFunc(e)} className="company_signup_form_password_input" name="company_signup_form_repeat_password" required />
                        {/* password show and hide buttons */}
                        <div className="company_signup_form_password_show_btn" onClick={show_password_handle}>
                            {showPassword ? 
                            <FontAwesomeIcon icon={faEyeSlash} />
                            :
                            <FontAwesomeIcon icon={faEye} />
                            } 
                        </div>                                                                               
                    </div>                        
                </label>                                
                <PasswordChecker pasLength={pasLength} upperCase={upperCase} lowerCase={lowerCase}/>
                {/* error message for password generation */}
                {
                    errorMessage ? <div className="company_signup_form_error_message">{errorMessage.errorContent}</div> : null
                }
                {/* accept condition checkbox */}
                <div className='company_signup_form_condition_container'>
                    {/* check button */}
                    <div className={`company_signup_form_condition_button ${acceptCondition ? "company_signup_form_condition_button_accepted" : ""}`} onClick={acceptConditionFunc}>
                        {acceptCondition ? <span className="company_signup_form_condition_button_checkmark"></span> : null}                        
                    </div>
                    {/* checkbox text  */}
                    <div className="company_signup_form_checkbox_text">
                        <span className='company_signup_form_checkbox_condition' onClick={show_condition_func}>Şərtləri</span> qəbul edirəm.    
                    </div>                                        
                </div>
                {/* button info */}
                <div className="company_signup_form_btn_info">* Qeydiyyat düyməsinə basmaqla e-mail-inizə OTP kod gələcək.</div>
                {/* company form submit button */}                
                <input type="submit" value="Qeydiyyat" className= {`company_signup_form_submit ${acceptCondition && importantInputField.company_signup_form_company_email && importantInputField.company_signup_form_name && importantInputField.company_signup_form_password && importantInputField.company_signup_form_repeat_password ? 'company_signup_form_submit_ready' : null}`} />
                {/* link to login page */}
                <div className="user_signup_link_to_login_page">Hesabınız varsa <Link to='/login'>Daxil olun !</Link> </div>
                {
                    showCondition ?
                    <div className="company_signup_form_condition_content">
                        <div className="company_signup_form_condition_content_head">Şərtlərimiz</div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci fugit alias amet rerum iste nostrum minus facere eos, saepe nemo perspiciatis. Expedita cum sed eos! Sint consequuntur quasi omnis ipsum?
                        Praesentium, sint pariatur hic quisquam quia enim consequuntur laboriosam porro cupiditate incidunt laborum quam obcaecati cum iusto est culpa amet aut. Nobis ad labore nihil similique aut facere porro possimus.
                        Ab natus corrupti ipsum officiis dicta, cum, temporibus quasi, et porro itaque error atque tempora consequatur voluptate consectetur pariatur illo odit dolorem dolores fugiat sequi! Saepe voluptate magnam commodi doloribus.
                        Laudantium obcaecati quas, blanditiis tempora a alias incidunt aliquam hic ipsam sit quam assumenda corrupti. Dolor sint obcaecati tempore exercitationem cumque nostrum vel commodi dolorum recusandae, doloribus laborum consequatur voluptas?
                       
                        {/* condition text close button */}
                        <div className="company_signup_form_condition_close" onClick={show_condition_func}>Gizlət</div>
                    </div>
                    : null
                }                
            </form> 
            }
        </div>
    );
}
export default CompanySignup;