import PageHeadText from "../../components/page_head_text/page_head_text";
import './login.css';

import LoginForm from "../../components/login_form/login_form";
import { Outlet } from "react-router-dom";
function Login() {    
    return ( 
        <div className="login_page_container">
            {/* page name */}
            {/* <PageHeadText content={'Daxil Olun !'} /> */}
            <div className="new_page_head">Daxil Olun !</div>
            {/* login form container*/}
            <div className="login_page_form_container">
                {/* <LoginForm/> */}
                <Outlet />
            </div>      
        </div>
    );
}

export default Login;