import { Link } from 'react-router-dom';
import StarRating from '../../star_rating_show/star_rating_show';
import './company_profile_menu.css';
import CompanyProfileSubmenus from '../company_profile_submenus/company_profile_submenus';
function CompanyProfileMenu() {
    const menu_names_submenus = [
        {
            main: 'İdarə paneli',
            main_url: '/company_profile',
            sub_menus: []
        },
        {
            main: 'Vakansiyalar',
            main_url: '/company_profile/my_vacancies',
            sub_menus: [{
                sub_name: 'Vakansiyalarım',
                sub_url: '/company_profile/my_vacancies'
            },
            {
                sub_name: 'Vakansiya yarat',
                sub_url: '/company_profile/create_vacancy'
            },
            {
                sub_name: 'Premium vakansiyalar',
                sub_url: '/company_profile/premium'
            }
            ]
        },
        {
            main: 'Müraciətlər',
            main_url: '/company_profile/total_applies',
            sub_menus: [{
                sub_name: 'Ümumi müraciətlər',
                sub_url: '/company_profile/total_applies'
            },
            {
                sub_name: 'Seçilmişlər',
                sub_url: '/company_profile/choosed_applies'
            },
            {
                sub_name: 'Qəbul edilmişlər',
                sub_url: '/company_profile/accepted_applies'
            },
            {
                sub_name: 'Ləğv edilmişlər',
                sub_url: '/company_profile/rejected_applies'
            }
            ]
        },
        {
            main: 'Müsahibələr',
            main_url: '/company_profile/online_interview',
            sub_menus: [{
                sub_name: 'Onlayn müsahibələr',
                sub_url: '/company_profile/online_interview'
            },
            {
                sub_name: 'Oflayn müsahibələr',
                sub_url: '/company_profile/ofline_interview'
            }
            ]
        },
        {
            main: 'Tapşırıqlar',
            main_url: '/company_profile/my_tasks',
            sub_menus: [{
                sub_name: 'Tapşırıqlarım',
                sub_url: '/company_profile/my_tasks'
            },
            {
                sub_name: 'Tapşırıq yarat',
                sub_url: '/company_profile/create_tasks'
            }
            ]
        },
        {
            main: 'Tənzimləmələr',
            main_url: '/company_profile/profile_infos',
            sub_menus: [{
                sub_name: 'Profil məlumatları',
                sub_url: '/company_profile/profile_infos'
            }
            ]
        },
        {
            main: 'Texniki dəstək',
            main_url: '/company_profile/write_us',
            sub_menus: [{
                sub_name: 'Bizə yazın',
                sub_url: '/company_profile/write_us'
            }
            ]
        }
    ]
    return ( 
        <div className="company_profile_menu_container">
            {/* company image and name */}
            <div className="company_profile_menu_image_and_name">
                {/* company image */}
                <div className="company_profile_menu_image">
                    <img src="favicon.ico" alt="Company logo" />
                </div>
                {/* Company name */}
                <div className="company_profile_menu_comName">King Job</div>
                {/* company rating */}
                <StarRating rating_count={5}/>
            </div>
            {/* menu items container */}
            <ul className="company_profile_menu_items_container">
                {
                    menu_names_submenus.map((item, index)=>{
                        return <CompanyProfileSubmenus key={index} menu={item}/>
                    })
                }
            </ul>
        </div>
     );
}

export default CompanyProfileMenu;