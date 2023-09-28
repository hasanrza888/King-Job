import CompanyProfileMainWindow from '../../components/company_profile_components/company_profile_main_window/company_profile_main_window';
import CompanyProfileMenu from '../../components/company_profile_components/company_profile_menu/company_profile_menu';
import './company_profile.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function CompanyProfile() {
    const navigate = useNavigate();
    const {user,isLoggedIn} = useSelector(state=>state.user);
    useEffect(()=>{
        if(!user && !isLoggedIn){
          navigate('/login',{state:{referrer:'/company_profile'}})
        }
      },[isLoggedIn,user,navigate])

    return ( 
        <div className="company_profile_container">
            {/* menu and main window */}
            <div className="company_profile_menu_and_main_windows">
                {/* menus container */}
                <CompanyProfileMenu />
                {/* main windows container */}
                <CompanyProfileMainWindow />
            </div>
        </div>
     );
}

export default CompanyProfile;