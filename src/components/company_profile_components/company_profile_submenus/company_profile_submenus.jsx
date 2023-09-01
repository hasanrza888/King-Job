import { Link } from "react-router-dom";

function CompanyProfileSubmenus({menu}) {
    return ( 
        <div className="company_profile_submenus_container">
            <Link to={menu['main_url']} className="company_profile_main_menu_name">{menu['main']}</Link>
            {
                menu['sub_menus'].length > 0 ?
                <div className="company_profile_submenus">
                    {
                        menu['sub_menus'].map((sub, sub_index)=>{
                            return <Link to={sub['sub_url']} key={sub['sub_url']}>{sub['sub_name']}</Link>
                        })
                    }
                </div>
                :''
            }
            
        </div>
     );
}

export default CompanyProfileSubmenus;