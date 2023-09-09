import { useEffect, useState } from "react";
import {NavLink, Link, useLocation,useNavigate} from "react-router-dom";
import svg from '../../images/island_logo.svg';
import profile_picture from "../../images/my_picture.jpg"
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAddressBook, faBars, faBriefcase, faBuilding, faCircleInfo, faClose, faHouse} from '@fortawesome/free-solid-svg-icons';
import { logout } from "../../apiservices";
import { clearUser } from "../../redux/reducers/userauthReducers";
import { useSelector,useDispatch } from "react-redux";
import {toast} from 'react-toastify'
function Header(){
    const navigate = useNavigate();
    const {user,isLoggedIn} = useSelector(state=>state.user);
    const p_t = user?.u_t_p
    const dispatch = useDispatch();
    const [logged, setLogged] = useState(false);  
    // const [p_t, set_p_t] = useState(localStorage.getItem('p_t_v'));
    const [menubar, setMenuBar] = useState(false);
    const [border_bottom, set_border] = useState(false);
    const location = useLocation();
    // mobile menu bar open and close
    const open_drop_menu = ()=>{
        setMenuBar(!menubar);
    }
    // add border-bottom to header when page scrolling
    const header_border_bottom = ()=>{
        set_border(document.documentElement.scrollTop > 0)
    }
    useEffect(()=>{
        window.addEventListener('scroll', header_border_bottom);
        return ()=>{
            window.removeEventListener('scroll', header_border_bottom);
        }
    },[])
    const logOut = async () => {
        const {data} = await logout();
        console.log(data)
        if(data.success){
            dispatch(clearUser());
            toast.success('Succesfully loggedin', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/')
        }
    }

    // localStorage.setItem('p_t_v', 'c')
    return(
        <header className={`header_container ${border_bottom ? 'header_container header_scroll_border' : ''} ${location.pathname.includes('/company_profile') ? 'header_container_none' : ''}`}>            
            {/* desktop header container */}
            {/* {console.log(location)} */}
           <div className="header_desktop">
                {/* header logo */}
                <div className="header_logo">
                    <Link to="/">
                        <img src= {svg} alt="logo" />    
                    </Link>                
                </div>
                {/* _________ header links ___________ */}
                <ul className="header_links">
                    <li>
                        <NavLink to="/" className={({isActive, isPending})=>isPending ? 'pending_link' : isActive ? 'header_active_link': ''}>Əsas Səhifə</NavLink>
                        <span className="header_link_underline"></span>
                    </li>
                    <li>
                        <NavLink to="/vacancies" className={({isActive, isPending})=>isPending ? 'pending_link' : isActive ? 'header_active_link': ''}>Vakansiyalar</NavLink>
                        <span className="header_link_underline"></span>
                    </li>
                    <li>
                        <NavLink to="/companies" className={({isActive, isPending})=>isPending ? 'pending_link' : isActive ? 'header_active_link': ''}>Şirkətlər</NavLink>
                        <span className="header_link_underline"></span>
                    </li>
                    <li>
                        <NavLink to="/about" className={({isActive, isPending})=>isPending ? 'pending_link' : isActive ? 'header_active_link': ''}>Haqqımızda</NavLink>
                        <span className="header_link_underline"></span>
                    </li>
                    <li>
                        <NavLink to="/contact" className={({isActive, isPending})=>isPending ? 'pending_link' : isActive ? 'header_active_link': ''}>Əlaqə</NavLink>
                        <span className="header_link_underline"></span>
                    </li>
                </ul>
                <div className="account_links_container">
                    {
                        // user profile
                        isLoggedIn && p_t === 'u_s_r'?  <>                   
                            <NavLink to="/user_profile" className={({isActive})=> isActive ? 'link_none' : 'account_link_btn header_profile_btn'}>
                                <div className="header_profil_picture">
                                    <img src={profile_picture} alt="profile"/>
                                </div>
                                Profil
                            </NavLink> 
                            <button className="account_link_btn" onClick={logOut}>Logout</button>
                            </>
                        :
                        // company profile
                        isLoggedIn && p_t === 'c_m_p'?  <>                   
                            <NavLink to='/company_profile/dashboard' className={({isActive})=> isActive ? 'link_none' : 'account_link_btn header_profile_btn'}>
                                <div className="header_profil_picture">
                                    <img src='favicon.ico' alt="profile"/>
                                </div>
                                Profil
                            </NavLink>   
                            <button className="account_link_btn" onClick={logOut}>Logout</button></>            
                        :
                        <>                        
                            <NavLink to="/login" className={({isActive})=> isActive ? 'link_none' : 'header_login_btn'}>Daxil ol</NavLink>                        
                            <NavLink to="/signup/user_signup" className={({isActive})=> isActive || (window.location.pathname === '/signup/company_signup') ? 'link_none' : 'account_link_btn'}>Qeydiyyat</NavLink>    
                        </>
                    }  
                </div>                                         
           </div>
           {/* tablet and mobile header container */}
           <div className="header_mobile_container">
                <div className={menubar ? 'mobile_header_none' : "header_mobile"}>
                    <FontAwesomeIcon icon={faBars} className="mobile_menu_bar" onClick={open_drop_menu}/>
                    {/* mobile header logo */}
                    <div className="mobile_header_logo">
                        <Link to="/">
                            <img src= {svg} alt="logo" />    
                        </Link>                
                    </div>
                </div>
                {/* mobile header menu drop  */}
                <div className={menubar ? "header_mobile_drop_menu" : 'mobile_header_none' }>
                    <div className="header_mobile">
                        {/* menu close button */}
                        <FontAwesomeIcon icon={faClose} className="mobile_menu_close" onClick={open_drop_menu}/>
                        {/* mobile header logo */}
                        <div className="mobile_header_logo">
                            <Link to="/">
                                <img src= {svg} alt="logo" />    
                            </Link>                
                        </div>
                        {
                            isLoggedIn && p_t==='u_s_r'?  <>                 
                                <NavLink to="/user_profile" onClick={open_drop_menu} className={({isActive})=> isActive ? 'link_none' : 'account_link_btn header_profile_btn'}>
                                    <div className="header_profil_picture">
                                        <img src={profile_picture} alt="profile"/>
                                    </div>
                                    Profil
                                </NavLink>  
                                <button className="account_link_btn"  onClick={logOut}>Logout</button>   </>               
                            :
                            isLoggedIn && p_t==='c_m_p' ?<>
                            <NavLink to='/company_profile/dashboard' className={({isActive})=> isActive ? 'link_none' : 'account_link_btn header_profile_btn'}>
                                <div className="header_profil_picture">
                                    <img src='favicon.ico' alt="profile"/>
                                </div>
                                Profil
                            </NavLink> 
                            <button className="account_link_btn"  onClick={logOut}>Logout</button>
                            </>
                            :
                            ''
                        }
                    </div>
                    {/* _________ header links ___________ */}
                    <ul className="mobile_header_links">
                        <li>                            
                            <NavLink to="/" onClick={open_drop_menu} className={({isActive, isPending})=>isPending ? 'pending_link' : isActive ? 'header_active_link': ''}>
                                <FontAwesomeIcon icon={faHouse} className="mobile_menu_link_icon" />
                                Əsas Səhifə
                            </NavLink>                            
                        </li>
                        <li>                              
                            <NavLink to="/vacancies" onClick={open_drop_menu} className={({isActive, isPending})=>isPending ? 'pending_link' : isActive ? 'header_active_link': ''}>
                                <FontAwesomeIcon icon={faBriefcase} className="mobile_menu_link_icon" /> 
                                Vakansiyalar
                            </NavLink>                                                     
                        </li>
                        <li>                            
                            <NavLink to="/companies" onClick={open_drop_menu} className={({isActive, isPending})=>isPending ? 'pending_link' : isActive ? 'header_active_link': ''}>
                                <FontAwesomeIcon icon={faBuilding} className="mobile_menu_link_icon" />
                                Şirkətlər
                            </NavLink>                            
                        </li>
                        <li>                            
                            <NavLink to="/about" onClick={open_drop_menu} className={({isActive, isPending})=>isPending ? 'pending_link' : isActive ? 'header_active_link': ''}>
                                <FontAwesomeIcon icon={faCircleInfo} className="mobile_menu_link_icon" />
                                Haqqımızda
                            </NavLink>                            
                        </li>
                        <li>                            
                            <NavLink to="/contact" onClick={open_drop_menu} className={({isActive, isPending})=>isPending ? 'pending_link' : isActive ? 'header_active_link': ''}>
                                <FontAwesomeIcon icon={faAddressBook} className="mobile_menu_link_icon" />
                                Əlaqə
                            </NavLink>                            
                        </li>
                        <div className="mobile_account_links_container">
                        {
                            isLoggedIn ?                     
                                ''                  
                            :
                            <>                        
                                <NavLink to="/login" onClick={open_drop_menu} className={({isActive})=> isActive ? 'link_none' : 'header_login_btn'}>Daxil ol</NavLink>                        
                                <NavLink to="/signup/user_signup" onClick={open_drop_menu} className={({isActive})=> isActive ? 'link_none' : 'account_link_btn'}>Qeydiyyat</NavLink>   
                            </>
                        }  
                        </div>  
                    </ul>                    
                </div>
           </div>
        </header>
    );
}
export default Header;