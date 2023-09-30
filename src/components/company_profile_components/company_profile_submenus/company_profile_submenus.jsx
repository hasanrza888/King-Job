import { NavLink, useLocation } from "react-router-dom";
import './company_profile_submenus.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
function CompanyProfileSubmenus({menu}) {
    const location = useLocation();
    const [close_submenu, setClose_submenu] = useState(false);
    const close_submenus = ()=>{
        if(menu['sub_menus'].length > 0){
            setClose_submenu(!close_submenu);    
        }
    }
    return ( 
        <div className="company_profile_submenus_container">
            <NavLink onClick={close_submenus} to={menu['sub_menus'].length > 0 ? undefined : menu['main_url']} className={`company_profile_main_menu_name ${location.pathname.includes(menu['main_url']) ? 'company_profile_main_menu_name_active' : ''}`}>
                <div className="company_profile_main_menu_icon_and_icon">
                    {menu['main_icon']} {menu['main']}    
                </div>
                {menu['sub_menus'].length > 0 ? <FontAwesomeIcon icon={faAngleDown} className={`company_profile_main_menu_name_close ${close_submenu ? 'company_profile_main_menu_name_close_rotate' : ''}`}/> : ''}
            </NavLink>
            {
                menu['sub_menus'].length > 0 ?
                <div className={`company_profile_submenus ${close_submenu ? 'company_profile_submenus_hide' : ''}`}>
                    {
                        menu['sub_menus'].map((sub, sub_index)=>{
                            if(sub_index === 0){
                                return <NavLink to={menu['main_url']} className={`company_profile_submenus_link ${location.pathname === menu['main_url'] ? 'company_profile_submenus_link_active' : ''}`} key={sub['sub_url']}>
                                            {sub['sub_name']}
                                            {
                                                sub['sub_count'] === '' ? '' :
                                                <div className="company_profile_submenus_link_count">
                                                    {sub['sub_count']}  
                                                </div>
                                            
                                            }
                                        </NavLink>
                            }
                            return <NavLink to={sub['sub_url']} className={({isActive})=> isActive ? 'company_profile_submenus_link company_profile_submenus_link_active' : 'company_profile_submenus_link'} key={sub['sub_url']}>
                                        {sub['sub_name']}
                                        {
                                            sub['sub_count'] === '' ? '' :
                                            <div className="company_profile_submenus_link_count">
                                                {sub['sub_count']}
                                            </div>
                                            
                                        }
                                   </NavLink>
                        })
                    }
                </div>
                :''
            }
        </div>
     );
}

export default CompanyProfileSubmenus;