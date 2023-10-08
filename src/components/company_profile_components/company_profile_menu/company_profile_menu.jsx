import StarRating from '../../star_rating_show/star_rating_show';
import {useNavigate} from "react-router-dom";
import './company_profile_menu.css';
import small_logo from '../../../images/small_logo.png';
import CompanyProfileSubmenus from '../company_profile_submenus/company_profile_submenus';
import defaultcompanylogo from '../../../images/defaultcompanylogo.png'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect,useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faChartSimple, faEnvelope, faGear, faListCheck, faPaperPlane, faPowerOff, faUserGroup, faXmark } from '@fortawesome/free-solid-svg-icons';
import { getAllNumbersForCompanyMenuAndDashboard } from '../../../apiservices';
import { logout } from "../../../apiservices";
import {toast} from 'react-toastify';
import { clearUser } from "../../../redux/reducers/userauthReducers";
function CompanyProfileMenu({menu, open_company_menu,menuNumbers}) {
    const {user,isLoggedIn,info} = useSelector(state=>state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
                sub_count: menuNumbers?.jobsCount
            },
            {
                sub_name: 'Vakansiya yarat',
                sub_url: '/company_profile/vacancies/create_vacancy',
                sub_count: ''
            },
            {
                sub_name: 'Premium vakansiyalar',
                sub_url: '/company_profile/vacancies/premium',
                sub_count: menuNumbers?.premJobsCount
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
                sub_count: menuNumbers?.numOfAllApply
            },
            {
                sub_name: 'Seçilmişlər',
                sub_url: '/company_profile/applies/choosed',
                sub_count: '30'
            },
            {
                sub_name: 'Qəbul edilmişlər',
                sub_url: '/company_profile/applies/accepted',
                sub_count: menuNumbers?.numOfApproved
            },
            {
                sub_name: 'Ləğv edilmişlər',
                sub_url: '/company_profile/applies/rejected',
                sub_count: menuNumbers?.numOfRejected
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
    const logOut = async () => {
        const {data} = await logout();
        console.log(data)
        if(data.success){
            dispatch(clearUser());
            toast.success('Succesfully logged out', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/');
        }
    }
    return ( 
        <div className={`company_profile_menu_container ${menu ? 'company_profile_menu_close' : 'company_profile_menu_open'}`}>
            <div className={`company_profile_menu`}>
                {/* menu close */}
                <div className="company_profile_menu_close_btn" onClick={()=>{open_company_menu()}}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                {/* company image and name */}
                <div className="company_profile_menu_image_and_name">
                    {/* company image */}
                    <div className="company_profile_menu_image">
                        <img src={(user?.u_t_p==='u_s_r' ? info?.profilepic : info?.logo)|| defaultcompanylogo} alt="Company logo" />
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
                            return <li key={index}><CompanyProfileSubmenus key={index} open_company_menu={open_company_menu} menu={item}/></li> 
                        })
                    }
                </ul>
                {/* logout button */}
                <div className="company_profile_menu_log_out" onClick={logOut}>
                    <FontAwesomeIcon icon={faPowerOff} />
                    Çıxış
                </div>
            </div>
        </div>
     );
}

export default CompanyProfileMenu;
