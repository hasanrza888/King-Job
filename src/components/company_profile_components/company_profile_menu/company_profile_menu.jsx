import StarRating from '../../star_rating_show/star_rating_show';
import './company_profile_menu.css';
import small_logo from '../../../images/small_logo.png';
import CompanyProfileSubmenus from '../company_profile_submenus/company_profile_submenus';

import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faChartSimple, faEnvelope, faGear, faListCheck, faPaperPlane, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import defaultlogo from "../../../images/defaultcompanylogo.png";
function CompanyProfileMenu() {
    const {user,isLoggedIn,info} = useSelector(state=>state.user);
    console.log(info)
    const menu_names_submenus = [
        {
            main: 'İdarə paneli',
            main_icon: <FontAwesomeIcon icon={faChartSimple} />,
            main_url: '/company_profile/dashboard',
            sub_menus: []
        },
        {
            main: 'Vakansiyalar',
            main_icon: <FontAwesomeIcon icon={faBriefcase} />,
            main_url: '/company_profile/vacancies',
            sub_menus: [{
                sub_name: 'Vakansiyalarım',
                sub_url: '/company_profile/vacancies/my_vacancies',
                sub_count: '300'
            },
            {
                sub_name: 'Vakansiya yarat',
                sub_url: '/company_profile/vacancies/create_vacancy',
                sub_count: ''
            },
            {
                sub_name: 'Premium vakansiyalar',
                sub_url: '/company_profile/vacancies/premium',
                sub_count: '300'
            }
            ]
        },
        {
            main: 'Müraciətlər',
            main_icon: <FontAwesomeIcon icon={faPaperPlane} />,
            main_url: '/company_profile/applies',
            sub_menus: [{
                sub_name: 'Ümumi müraciətlər',
                sub_url: '/company_profile/applies',
                sub_count: '110'
            },
            {
                sub_name: 'Seçilmişlər',
                sub_url: '/company_profile/applies/choosed',
                sub_count: '30'
            },
            {
                sub_name: 'Qəbul edilmişlər',
                sub_url: '/company_profile/applies/accepted',
                sub_count: '18'
            },
            {
                sub_name: 'Ləğv edilmişlər',
                sub_url: '/company_profile/applies/rejected',
                sub_count: '92'
            }
            ]
        },
        {
            main: 'Müsahibələr',
            main_icon: <FontAwesomeIcon icon={faUserGroup} />,
            main_url: '/company_profile/interview',
            sub_menus: [{
                sub_name: 'Onlayn müsahibələr',
                sub_url: '/company_profile/interview',
                sub_count: '40'
            },
            {
                sub_name: 'Oflayn müsahibələr',
                sub_url: '/company_profile/interview/ofline',
                sub_count: '10'
            }
            ]
        },
        {
            main: 'Tapşırıqlar',
            main_icon: <FontAwesomeIcon icon={faListCheck} />,
            main_url: '/company_profile/tasks',
            sub_menus: [{
                sub_name: 'Tapşırıqlarım',
                sub_url: '/company_profile/tasks',
                sub_count: '20'
            },
            {
                sub_name: 'Tapşırıq yarat',
                sub_url: '/company_profile/tasks/create_tasks',
                sub_count: ''
            }
            ]
        },
        {
            main: 'Tənzimləmələr',
            main_icon: <FontAwesomeIcon icon={faGear} />,
            main_url: '/company_profile/settings',
            sub_menus: [{
                sub_name: 'Profil məlumatları',
                sub_url: '/company_profile/settings',
                sub_count: '10%'
            }
            ]
        },
        {
            main: 'Texniki dəstək',
            main_icon: <FontAwesomeIcon icon={faEnvelope} />,
            main_url: '/company_profile/support',
            sub_menus: [{
                sub_name: 'Bizə yazın',
                sub_url: '/company_profile/support',
                sub_count: ''
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
                    <img src={(user?.u_t_p==='u_s_r' ? info?.profilepic : info?.logo) || defaultlogo} alt="Company logo" />
                </div>
                {/* Company name */}
                <div className="company_profile_menu_comName">{user?.name}</div>
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
                        return <li key={index}><CompanyProfileSubmenus key={index} menu={item}/></li> 
                    })
                }
            </ul>
        </div>
     );
}

export default CompanyProfileMenu;