import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './sendOtpForm.css'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { email_checker } from '../email_checker/email_checker';
function SendOtpForm({setOpenOtpWindow, setNewPassword, login, userSignUp, company_SignUp}) {
    const [reverseAnimation, setReverseAnimation] = useState(false); 
    const [countDown, setCountDown] = useState(120);
    const [errorMessage, setErrorMessage] = useState({
        errorCheck: false,
        errorContent : ''
    }); 
    const navigate = useNavigate();
    const [otpInputValue, setOtpInputValue] = useState('');
    const [otpChecking, setOtpChecking] = useState(false);
    const {email} = useParams();
    const sendOtpCodeHandle = (e)=>{
        e.preventDefault();    
        // showing loader animation when otp code checking
        if(otpInputValue.length === 6){
            setOtpChecking(true);
        }            
        // naviagates when form completed
        if((userSignUp === true && !otpChecking) || (company_SignUp === true && !otpChecking)){
            toast.success('Qeydiyyatınız uğurlu oldu !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(()=>{
                navigate('/login');    
            }, 5000);            
        }else{
            navigate(`/login/new_password/${email}/${otpInputValue}`);
        }
    }
    // back button
    const closeWindowBox = ()=>{  
        setReverseAnimation(true);        
        setTimeout(()=>{
            if(company_SignUp || userSignUp){
                setOpenOtpWindow(false);     
            }
            else{
                navigate('/login/forgot_password');    
            }
        },300);            
    } 
    useEffect(()=>{
        if(!otpChecking){
            const timer = countDown > 0 ? setInterval(()=>{
                const timeOtp = countDown - 1;
                setCountDown(timeOtp);
            }, 1000) : null  
             
            return ()=> clearInterval(timer);
        }
    }, [countDown]);
    // function for send otp again button
    const sendOtpAgain = ()=>{
        setCountDown(120);
        setOtpInputValue('');
        setOtpChecking(false);
    }
    const otpInputHandle = (e)=>{
        if(e.target.value.length <= 6){
            setOtpInputValue(e.target.value);   
        }
    }
    return ( 
        <div className='otp_form_and_checking'>
            {
                email_checker(email) || userSignUp || company_SignUp ?
                <div className={`send_top_form_container ${(company_SignUp || userSignUp) ? "send_top_form_container_signup" : ""}  ${ reverseAnimation ? "send_top_form_close_animation" : "send_top_form_open_animation"}`}>
                    {/* window close button */}
                    <div className="forgot_password_form_window_close" onClick={closeWindowBox}>
                        <FontAwesomeIcon icon={faAngleLeft} ></FontAwesomeIcon>
                        Geri
                    </div>
                    {/* form info */}
                    <div className="forgot_password_form_info">
                        OTP Kodu daxil edin
                    </div>
                    <form action="#" method='post' className="send_top_form" onSubmit={sendOtpCodeHandle}>
                        {/* otp code input */}
                        <div className="send_top_form_label_input">
                            <label htmlFor="otpcodeinput">
                                OTP Kod
                            </label>    
                            <input type="text" name='otpcodeinput' onChange={otpInputHandle} value={otpInputValue} className="send_top_form_input" required/>
                        </div>
                        {
                            errorMessage ? <div className="send_otp_form_error_message">{errorMessage.errorContent}</div> : null
                        } 
                        {/* countdown for OTP */}
                        <div className='count_Down_Otp'>
                            {countDown > 0 && otpChecking === false ? `${countDown} saniyə sonra bitəcək !`: otpChecking ? '' : 'Vaxt bitdi !'} 
                        </div>
                        {/* send otp code again button */}
                        <button type='button' onClick={sendOtpAgain} className='send_otp_again_btn'>Yenidən göndər !</button>                
                        {/* form confirm button */}
                        <div className="send_otp_form_submit_btn_container">
                            <input type="submit" value="Təsdiqlə" className= {`send_otp_form_submit ${otpInputValue.length === 6 ? 'send_otp_form_submit_ready' : '' }`}/>
                            {
                                otpChecking ? <div className="send_otp_form_submit_btn_loader"></div> : null
                            }                    
                        </div>                
                    </form>
                </div>
                :
                <p className='error_found_text'>Email doğru deyil !</p>
            }
        </div>
    );
}

export default SendOtpForm;
