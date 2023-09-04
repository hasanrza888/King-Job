import { Link, NavLink } from "react-router-dom";
import './company_profile_submenus.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
function CompanyProfileSubmenus({menu}) {
    return ( 
        <div className="company_profile_submenus_container">
            <NavLink to={menu['main_url']} className={({isActive})=> isActive ? 'company_profile_main_menu_name company_profile_main_menu_name_active' : 'company_profile_main_menu_name'}>
                {menu['main']}
                {menu['sub_menus'].length > 0 ? <FontAwesomeIcon icon={faAngleDown} /> : ''}
            </NavLink>
            {
                menu['sub_menus'].length > 0 ?
                <div className="company_profile_submenus">
                    {
                        menu['sub_menus'].map((sub, sub_index)=>{
                            return <NavLink to={sub['sub_url']} className={({isActive})=> isActive ? 'company_profile_submenus_link company_profile_submenus_link_active' : 'company_profile_submenus_link'} key={sub['sub_url']}>{sub['sub_name']}</NavLink>
                        })
                    }
                </div>
                :''
            }
        </div>
     );
}

export default CompanyProfileSubmenus;