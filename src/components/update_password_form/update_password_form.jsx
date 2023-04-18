import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './update_password_form.css';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
function UpdatePasswordForm({setNewPassword, setOpenOtpWindow, close, setSuccessMsg, setloginMsg}) {
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false); 
    const [reverseAnimation, setReverseAnimation] = useState(false); 
    const Navigate = useNavigate();
    const show_password_handle = ()=>{
        setShowPassword(!showPassword);
    }
    const updatePasswordHandle = (e)=>{
        e.preventDefault();
        if(e.target.new_password.value === e.target.repeate_password.value){
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
            setErrorMessage(true);
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
            <div className="forgot_password_form_window_close">
                <FontAwesomeIcon icon={faAngleLeft} onClick={closeWindowBox}/>
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
                        <input type={showPassword ? 'text' : 'password'} className="login_password_input" name="new_password" required />
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
                {
                    errorMessage ? <div className="forgot_password_form_error_message">Şifrələr Eyni Olmalıdır</div> : null
                } 
                <input type="submit" value="Şifrəni yenilə" className='update_password_form_submit' />                  
            </form>
        </div>
     );
}

export default UpdatePasswordForm;