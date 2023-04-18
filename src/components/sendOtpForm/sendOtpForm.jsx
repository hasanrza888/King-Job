import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './sendOtpForm.css'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
function SendOtpForm({setOpenOtpWindow, setNewPassword}) {
    const [reverseAnimation, setReverseAnimation] = useState(false); 
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
    return ( 
        <div className={`send_top_form_container ${ reverseAnimation ? "send_top_form_close_animation" : "send_top_form_open_animation"}`}>
            {/* window close button */}
            <div className="forgot_password_form_window_close">
                <FontAwesomeIcon icon={faAngleLeft} onClick={closeWindowBox}/>
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
                {/* form confirm button */}
                <input type="submit" value="Təsdiqlə" className="send_top_form_submit"/>
            </form>
        </div>
    );
}

export default SendOtpForm;