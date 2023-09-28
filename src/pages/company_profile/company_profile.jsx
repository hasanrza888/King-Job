import CompanyProfileMainWindow from '../../components/company_profile_components/company_profile_main_window/company_profile_main_window';
import CompanyProfileMenu from '../../components/company_profile_components/company_profile_menu/company_profile_menu';
import './company_profile.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function CompanyProfile() {
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();
    const {user,isLoggedIn} = useSelector(state=>state.user);
    useEffect(()=>{
        if(!isLoggedIn || !user){
            navigate('/login')
        }
    },[])
    const open_company_menu =()=>{
        setMenu(!menu);
    }
    return ( 
        <div className="company_profile_container">
            {/* menu and main window */}
            <div className="company_profile_menu_and_main_windows">
                {/* menus container */}
                <CompanyProfileMenu open_company_menu={open_company_menu} menu={menu}/>
                {/* main windows container */}
                <CompanyProfileMainWindow open_company_menu={open_company_menu} menu={menu}/>
            </div>
        </div>
     );
}

export default CompanyProfile;