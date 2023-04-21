import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './sendOtpForm.css'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
function SendOtpForm({setOpenOtpWindow, setNewPassword}) {
    const [reverseAnimation, setReverseAnimation] = useState(false); 
    const [countDown, setCountDown] = useState(120);
    const sendOtpCodeHandle = (e)=>{
        e.preventDefault();
        setNewPassword(true);
    }
    const closeWindowBox = ()=>{  
        setReverseAnimation(true);
        setTimeout(()=>{
            setOpenOtpWindow(false);  
        },300)                
    } 
    useEffect(()=>{
        const timer = countDown > 0 ? setInterval(()=>{
            const timeOtp = countDown - 1;
            setCountDown(timeOtp);
        }, 1000) : null  
         
        return ()=> clearInterval(timer);
    }, [countDown]);

    return ( 
        <div className={`send_top_form_container ${ reverseAnimation ? "send_top_form_close_animation" : "send_top_form_open_animation"}`}>
            {/* window close button */}
            <div className="forgot_password_form_window_close" onClick={closeWindowBox}>
                <FontAwesomeIcon icon={faAngleLeft} ></FontAwesomeIcon>
                Geri
            </div>
            {/* form info */}
            <div className="forgot_password_form_info">
                OTP Kodu daxil edin
            </div>
            <form action="#" className="send_top_form" onSubmit={sendOtpCodeHandle}>
                {/* otp code input */}
                <label htmlFor="otpcodeipnut">
                    OTP Kod
                    <input type="text" name='otpcodeinput' className="send_top_form_input" required/>
                </label>
                {/* countdown for OTP */}
                <span className='count_Down_Otp'>
                    {countDown > 0 ? `${countDown} saniyə sonra bitəcək !` : 'Vaxt bitdi !'} 
                </span>
                {/* form confirm button */}
                <input type="submit" value="Təsdiqlə" className="send_top_form_submit"/>
            </form>
        </div>
    );
}

export default SendOtpForm;