import PageHeadText from "../../components/page_head_text/page_head_text";
import './login.css';

import LoginForm from "../../components/login_form/login_form";
import { useState } from "react";
import NotificationMessage from "../../components/notification_message/notification_message";
function Login() {    
    const [successMsg, setSuccessMsg] = useState(false);
    const [loginMsg, setloginMsg] = useState('');
    const notification_message_content = <div>{loginMsg}</div>;

    return ( 
        <div className="login_page_container">
            {/* page name */}
            <PageHeadText content={'Daxil Olun !'} />
            {/* login form container*/}
            <div className="login_page_form_container">
                <LoginForm setSuccessMsg = {setSuccessMsg} setloginMsg = {setloginMsg}/>
            </div>      
            {successMsg ? <NotificationMessage setSuccessMsg = {setSuccessMsg} notification_message_content = {notification_message_content} /> : null}      
        </div>
    );
}

export default Login;