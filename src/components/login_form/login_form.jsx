import './login_form.css';
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ForgotPasswordForm from '../forgot_password_form/forgot_password_form';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import SendOtpForm from '../sendOtpForm/sendOtpForm';
import UpdatePasswordForm from '../update_password_form/update_password_form';
import { email_checker } from '../email_checker/email_checker';
import { toast } from 'react-toastify';
import { loginCompany,loginUser,emailIsUserOrCompany } from '../../apiservices';
import { useDispatch,useSelector } from 'react-redux';
import { setUser,clearUser,setInfo } from '../../redux/reducers/userauthReducers';
function LoginForm() {
    const location = useLocation();
    const [previousUrl, setPreviousUrl] = useState(null);
    useEffect(() => {
        // Set the previous URL when the location changes
        setPreviousUrl(location.state ? location.state.referrer : null);
      }, [location]);
    //   console.log(previousUrl)
    const dispatch = useDispatch();
    const tt = new Date();
    const [formInfo, setFormInfo] = useState({
        email: '',
        password: '',
        time:tt.toLocaleString()
    })
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        errorCheck: false,
        errorContent : ''
    });
    const [sendingData, setSendingData] = useState(false);
    const navigateTo = useNavigate();
    const show_password_handle = ()=>{
        setShowPassword(!showPassword);
    }
    // forgot password
    const forgot_password = ()=>{
        navigateTo('/login/forgot_password');
    }      
    // email handle function
    const email_change_Func = (e)=>{
        setFormInfo({...formInfo, email: e.target.value});
    }
    // password handle function
    const form_password_handle = (e)=>{
        setFormInfo({...formInfo, password: e.target.value});
    }
    const emiscmp = async () => {
        setSendingData(true)
        try {
            const {data} = await emailIsUserOrCompany({email:formInfo.email});
            setSendingData(false)
            return data
        } catch (error) {
            setSendingData(false);
            if(error.response && error.response.data){
                return error.response.data
            }
        }
    }
    const lgnU = async () => {
        setSendingData(true)
        try {
            const {data} = await loginUser(formInfo);
            setSendingData(false)
            return data
        } catch (error) {
            setSendingData(false)
            if(error.response && error.response.data){
                return error.response.data
            }
        }
    }
    const lgnC = async () => {
        setSendingData(true)
        try {
            const {data} = await loginCompany(formInfo);
            setSendingData(false)
            return data
        } catch (error) {
            setSendingData(false)
            if(error.response && error.response.data){
                return error.response.data
            }     
        }
    }
    // form Submit function
    const login_form_handle = async (e)=>{
        e.preventDefault();
        setErrorMessage({errorCheck:false,errorContent:''})
        // email checking process
        if(!email_checker(formInfo.email)){
            setErrorMessage({...errorMessage, errorCheck: true, errorContent: "Email sintaksisi doğru deyil!"});
        }else{
            const data = await emiscmp();
            if(data.succes){
                const {u_t_p} = await data;
                // console.log(u_t_p)
                if(u_t_p === 'c_m_p'){
                    const dataC = await lgnC();
                    // console.log(dataC)
                    if(dataC.succes){
                        const {user} = await dataC;
                        dispatch(setUser(user.modified));
                        dispatch(setInfo(user.info));
                        toast.success('Succesfully loggedin', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        navigateTo(previousUrl || -1);
                    }
                    else{
                        setErrorMessage({errorCheck:true,errorContent:dataC.message})
                    }
                }
                else{
                    const dataU = await lgnU();
                    if(dataU.succes){
                        const {user} = await dataU;
                        dispatch(setUser(user.modified));
                        dispatch(setInfo(user.info));
                        toast.success('Succesfully loggedin', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        // console.log(previousUrl)
                        // navigateTo(-1)
                        navigateTo(previousUrl || -1);
                        // if(previousUrl){
                        //     navigateTo(previousUrl)
                        // }
                    }
                    else{
                        setErrorMessage({errorCheck:true,errorContent:dataU.message})
                    }
                }
            }
            else{
                setErrorMessage({...errorMessage, errorCheck: true, errorContent: data.message});
            }
            // setSendingData(true);
            
            // go to profil
        }
    }
    return ( 
            <div className="login_Form">
                <form action="#" method='post' onSubmit={login_form_handle} className="login_page_form">
                    {/* login email */}
                    <div className="login_Form_label_input">
                        <label htmlFor="login_email">
                            E-mail
                        </label>
                        <input type="email" name="login_email" className="login_email_input" onChange={email_change_Func} required />
                    </div>
                    {/* login password */}
                    <div className="login_Form_label_input">
                        <label htmlFor="login_password">
                            Şifrə                       
                        </label>  
                        <div className="login_password_container">
                            {/* password login */}
                            <input type={showPassword ? 'text' : 'password'} onChange={form_password_handle} className="login_password_input" name="login_password" required />
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
                    {/* error message */}
                    {
                        errorMessage.errorCheck ? <div className="login_form_error_message">{errorMessage.errorContent}</div> : null
                    }
                    {/* forgotten password button */}
                    <button className='login_form_forgot_password_btn' type='reset' onClick={forgot_password}>Şifrəni Unutmuşam</button>                
                    {/* login form submit button */}
                    <div className="login_form_submit_btn_container">
                        <button type="submit" className={`login_form_submit_btn ${formInfo.email && formInfo.password ? 'login_form_submit_btn_ready' : ''}`}>Daxil OL</button>
                        {
                            sendingData ? <div className="send_data_submit_btn_loader"></div> : ''
                        }  
                    </div>
                    <div className="login_form_link_to_signUp_container">
                        Hesabınız yoxdur? <Link to='/signup/user_signup' className='login_form_link_to_signUp'>Qeydiyyatdan Keçin</Link>
                    </div>
                </form> 
            </div>                                                 
     );
}

export default LoginForm;
