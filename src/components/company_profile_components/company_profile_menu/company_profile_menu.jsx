import StarRating from '../../star_rating_show/star_rating_show';
import './company_profile_menu.css';
import small_logo from '../../../images/small_logo.png';
import CompanyProfileSubmenus from '../company_profile_submenus/company_profile_submenus';
function CompanyProfileMenu() {
    const menu_names_submenus = [
        {
            main: 'İdarə paneli',
            main_url: '/company_profile/dashboard',
            sub_menus: []
        },
        {
            main: 'Vakansiyalar',
            main_url: '/company_profile/vacancies',
            sub_menus: [{
                sub_name: 'Vakansiyalarım',
                sub_url: '/company_profile/vacancies/my_vacancies'
            },
            {
                sub_name: 'Vakansiya yarat',
                sub_url: '/company_profile/vacancies/create_vacancy'
            },
            {
                sub_name: 'Premium vakansiyalar',
                sub_url: '/company_profile/vacancies/premium'
            }
            ]
        },
        {
            main: 'Müraciətlər',
            main_url: '/company_profile/applies',
            sub_menus: [{
                sub_name: 'Ümumi müraciətlər',
                sub_url: '/company_profile/applies'
            },
            {
                sub_name: 'Seçilmişlər',
                sub_url: '/company_profile/applies/choosed'
            },
            {
                sub_name: 'Qəbul edilmişlər',
                sub_url: '/company_profile/applies/accepted'
            },
            {
                sub_name: 'Ləğv edilmişlər',
                sub_url: '/company_profile/applies/rejected'
            }
            ]
        },
        {
            main: 'Müsahibələr',
            main_url: '/company_profile/interview',
            sub_menus: [{
                sub_name: 'Onlayn müsahibələr',
                sub_url: '/company_profile/interview'
            },
            {
                sub_name: 'Oflayn müsahibələr',
                sub_url: '/company_profile/interview/ofline'
            }
            ]
        },
        {
            main: 'Tapşırıqlar',
            main_url: '/company_profile/tasks',
            sub_menus: [{
                sub_name: 'Tapşırıqlarım',
                sub_url: '/company_profile/tasks'
            },
            {
                sub_name: 'Tapşırıq yarat',
                sub_url: '/company_profile/tasks/create_tasks'
            }
            ]
        },
        {
            main: 'Tənzimləmələr',
            main_url: '/company_profile/settings',
            sub_menus: [{
                sub_name: 'Profil məlumatları',
                sub_url: '/company_profile/settings'
            }
            ]
        },
        {
            main: 'Texniki dəstək',
            main_url: '/company_profile/support',
            sub_menus: [{
                sub_name: 'Bizə yazın',
                sub_url: '/company_profile/support'
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
                    <img src={small_logo} alt="Company logo" />
                </div>
                {/* Company name */}
                <div className="company_profile_menu_comName">King Job</div>
                {/* company rating */}
                <div className="company_profile_menu_rating">
                    <div className="company_profile_menu_rating_value">5</div>
                    <StarRating rating_count={5}/>    
                </div>
            </div>
            {/* menu items container */}
            <ul className="company_profile_menu_items_container">
                {
                    menu_names_submenus.map((item, index)=>{
                        return <li><CompanyProfileSubmenus key={index} menu={item}/></li> 
                    })
                }
            </ul>
        </div>
     );
}

export default CompanyProfileMenu;