import { useState } from "react";
import {NavLink, Link} from "react-router-dom";
import svg from '../../images/island_logo.svg';
import profile_picture from "../../images/my_picture.jpg"
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAddressBook, faBars, faBriefcase, faBuilding, faCircleInfo, faClose, faHouse} from '@fortawesome/free-solid-svg-icons';

function Header(){
    const [logged, useLogged] = useState(false);  
    const [menubar, setMenuBar] = useState(false);
    const [border_bottom, set_border] = useState(false);
    // mobile menu bar open and close
    const open_drop_menu = ()=>{
        setMenuBar(!menubar);
    }
    // add border-bottom to header when page scrolling
    window.addEventListener('scroll', ()=>{
        if(document.documentElement.scrollTop > 0){
            set_border(true);
        }else{
            set_border(false);
        }
    })
    return(
        <header className={border_bottom ? 'header_container header_scroll_border' : 'header_container'}>            
            {/* desktop header container */}
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
                        logged ?                     
                            <NavLink to="/profile" className={({isActive})=> isActive ? 'link_none' : 'account_link_btn header_profile_btn'}>
                                <div className="header_profil_picture">
                                    <img src={profile_picture} alt="profile"/>
                                </div>
                                Profil
                            </NavLink>                    
                        :
                        <>                        
                            <NavLink to="/signup" className={({isActive})=> isActive ? 'link_none' : 'account_link_btn'}>Qeydiyyat</NavLink>                                                                       
                            <NavLink to="/login" className={({isActive})=> isActive ? 'link_none' : 'account_link_btn'}>Daxil ol</NavLink>                        
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
                            logged ?                     
                                <NavLink to="/profile" className={({isActive})=> isActive ? 'link_none' : 'account_link_btn header_profile_btn'}>
                                    <div className="header_profil_picture">
                                        <img src={profile_picture} alt="profile"/>
                                    </div>
                                    Profil
                                </NavLink>                    
                            :
                            ''
                        }
                    </div>
                    {/* _________ header links ___________ */}
                    <ul className="mobile_header_links">
                        <li>                            
                            <NavLink to="/" className={({isActive, isPending})=>isPending ? 'pending_link' : isActive ? 'header_active_link': ''}>
                                <FontAwesomeIcon icon={faHouse} className="mobile_menu_link_icon" />
                                Əsas Səhifə
                            </NavLink>                            
                        </li>
                        <li>                              
                            <NavLink to="/vacancies" className={({isActive, isPending})=>isPending ? 'pending_link' : isActive ? 'header_active_link': ''}>
                                <FontAwesomeIcon icon={faBriefcase} className="mobile_menu_link_icon" /> 
                                Vakansiyalar
                            </NavLink>                                                     
                        </li>
                        <li>                            
                            <NavLink to="/companies" className={({isActive, isPending})=>isPending ? 'pending_link' : isActive ? 'header_active_link': ''}>
                                <FontAwesomeIcon icon={faBuilding} className="mobile_menu_link_icon" />
                                Şirkətlər
                            </NavLink>                            
                        </li>
                        <li>                            
                            <NavLink to="/about" className={({isActive, isPending})=>isPending ? 'pending_link' : isActive ? 'header_active_link': ''}>
                                <FontAwesomeIcon icon={faCircleInfo} className="mobile_menu_link_icon" />
                                Haqqımızda
                            </NavLink>                            
                        </li>
                        <li>                            
                            <NavLink to="/contact" className={({isActive, isPending})=>isPending ? 'pending_link' : isActive ? 'header_active_link': ''}>
                                <FontAwesomeIcon icon={faAddressBook} className="mobile_menu_link_icon" />
                                Əlaqə
                            </NavLink>                            
                        </li>
                        <div className="mobile_account_links_container">
                        {
                            logged ?                     
                                ''                  
                            :
                            <>                        
                                <NavLink to="/signup" className={({isActive})=> isActive ? 'link_none' : 'account_link_btn'}>Qeydiyyat</NavLink>                                                                       
                                <NavLink to="/login" className={({isActive})=> isActive ? 'link_none' : 'account_link_btn'}>Daxil ol</NavLink>                        
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