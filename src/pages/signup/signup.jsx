import {NavLink, Outlet} from "react-router-dom";
import './signup.css';
import PageHeadText from "../../components/page_head_text/page_head_text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faUser } from "@fortawesome/free-solid-svg-icons";
function Signup() {
    return ( 
        <div className="sign_up_page_container">
            <PageHeadText content = "Qeydiyyatdan Keçin !"/>
            <div className="sign_up_page_box_container">
                {/* user and company register links */}
                <div className="sign_up_page_box_header">
                    <NavLink to="/signup/user_signup" className={({isActive})=> isActive ? 'sign_up_page_box_header_link_active sign_up_page_box_header_link' : 'sign_up_page_box_header_link'}>
                        <FontAwesomeIcon icon={faUser} />
                        Namizəd                        
                    </NavLink>
                    <NavLink to="/signup/company_signup" className={({isActive})=> isActive ? 'sign_up_page_box_header_link_active sign_up_page_box_header_link' : 'sign_up_page_box_header_link'}>
                        <FontAwesomeIcon icon={faBuilding} />
                        Şirkət
                    </NavLink>
                </div>
                {/* form container box body */}
                <div className="sign_up_page_box_body">
                    <div className="sign_up_page_box_body_frame">
                        <Outlet/>
                    </div>                    
                </div>
            </div>                                                      
        </div>
     );
}
export default Signup;