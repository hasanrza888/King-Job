import './login.css';

import { Outlet } from "react-router-dom";
function Login() {    
    return ( 
        <div className="login_page_container">
            {/* page name */}
            {/* <PageHeadText content={'Daxil Olun !'} /> */}
            <div className="new_page_head">Daxil Olun !</div>
            {/* login form container*/}
            <div className="login_page_form_container">
                <Outlet />
            </div>      
        </div>
    );
}

export default Login;