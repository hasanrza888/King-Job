import {NavLink, Outlet} from "react-router-dom";
import './signup.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Signup() {
    const navigate= useNavigate()
    const {user,isLoggedIn} = useSelector(state=>state.user);
    console.log(user,isLoggedIn)
    useEffect(()=>{
        if(user && isLoggedIn){
            navigate('/')
        }
    },[user,isLoggedIn,navigate])
    return ( 
        <div className="sign_up_page_container">
            {/* <PageHeadText content = "Qeydiyyatdan Keçin !"/> */}
            <div className="new_page_head">Qeydiyyatdan Keçin !</div>
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