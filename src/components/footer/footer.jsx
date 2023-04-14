import "./footer.css";
import svg from '../../images/island_logo.svg';
import {Link, NavLink} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook, faFacebookSquare, faInstagram, faLinkedin, faTwitter, faTwitterSquare} from '@fortawesome/free-brands-svg-icons';
import SubscribeForm from "../subscribe_form/subscribe_form";
// import {icon, brands, } from '@fortawesome/fontawesome-svg-core/import.macro';

function Footer() {
    return ( 
        <div className="footer_container">
            {/* desktop footer */}
            <div className="desktop_footer">         
                {/* footer seperator */}
                <div className="desktop_footer_seperator"></div>
                {/* logo and subscribe form */}
                <div className="footer_logo_and_subscribe">
                    {/* header logo */}
                    <div className="footer_logo">
                        <Link to="/">
                            <img src= {svg} alt="logo" />    
                        </Link>                
                    </div>
                    {/* subscribe form */}
                    <div className="footer_subscribe_form">
                        <SubscribeForm />
                    </div>                    
                </div>                
                {/* footer columns */}
                <div className="desktop_footer_columns">
                    <div className="footer_column">                        
                        <span className="footer_column_item">
                            <NavLink to="/about" className={({isActive, isPending})=>isPending ? 'pending_link' : isActive ? 'footer_active_link': ''}>
                                Haqqımızda
                                <span className="footer_link_underline"></span>
                            </NavLink>                            
                        </span>
                        <span className="footer_column_item">
                            <NavLink to="/contact" className={({isActive, isPending})=>isPending ? 'pending_link' : isActive ? 'footer_active_link': ''}>
                                Əlaqə
                                <span className="footer_link_underline"></span>
                            </NavLink>                            
                        </span>
                    </div>
                    <div className="footer_column">
                        <span className="footer_column_item">
                            <NavLink to="/companies" className={({isActive, isPending})=>isPending ? 'pending_link' : isActive ? 'footer_active_link': ''}>
                                Şirkətlər
                                <span className="footer_link_underline"></span>    
                            </NavLink>                            
                        </span>
                        <span className="footer_column_item">
                            <NavLink to="/vacancies" className={({isActive, isPending})=>isPending ? 'pending_link' : isActive ? 'footer_active_link': ''}>
                                Vakansiyalar
                                <span className="footer_link_underline"></span>
                            </NavLink>                            
                        </span>
                    </div>
                    {/* socials */}
                    <div className="footer_column">
                        <span className="footer_column_head">
                            Sosial
                        </span>
                        {/* social icons */}
                        <div className="footer_social_icons">
                            <a href="#" target="_blank">
                                <FontAwesomeIcon icon={faInstagram} className="footer_instagram"/>    
                            </a>
                            <a href="#" target="_blank">
                                <FontAwesomeIcon icon={faFacebookSquare} className="footer_facebook" />    
                            </a>                            
                            <a href="#" target="_blank">
                                <FontAwesomeIcon icon={faLinkedin} className="footer_linkedin" />
                            </a>                            
                            <a href="#" target="_blank">
                                <FontAwesomeIcon icon={faTwitterSquare} className="footer_twitter" />
                            </a>                            
                        </div>
                    </div>
                </div>
                {/* copyright container */}
                <div className="desktop_footer_copyright_container">
                    <div className="desktop_footer_info">
                    Saytın rəhbərliyi yerləşdirilmiş elanların məzmununa görə məsuliyyət daşımır.
                    </div>
                    <div className="desktop_footer_copyright">
                        island.az @2023 island MMC
                    </div>
                </div>
            </div>
        </div> 
    );
}
export default Footer;