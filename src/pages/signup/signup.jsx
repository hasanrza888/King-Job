import {Link, Outlet} from "react-router-dom";
function Signup() {
    return ( 
        <div className="sign_up_page_container">
            <Link to="/signup">İstifadəçi</Link>
            <Link to="/signup/company_signup">Şirkət</Link>
            
            <Outlet/>
        </div>
     );
}
export default Signup;