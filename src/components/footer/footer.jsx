import "./footer.css";
import svg from '../../images/king_job_logo.svg';
import {Link, NavLink, useLocation} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebookSquare, faInstagram, faLinkedin, faTwitterSquare} from '@fortawesome/free-brands-svg-icons';
import SubscribeForm from "../subscribe_form/subscribe_form";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
// import {icon, brands, } from '@fortawesome/fontawesome-svg-core/import.macro';

function Footer() {
    const location = useLocation();
    return ( 
        <div className={`footer_container ${location.pathname.includes('/company_profile') ? 'footer_container_none' : ''}`}>
            {/* desktop footer */}
            <div className="desktop_footer">         
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
                            Bizi Linkedin-də İzləyin !
                        </span>
                        {/* social icons */}
                        <div className="footer_social_icons">
                            {/* <Link to="#" target="_blank">
                                <FontAwesomeIcon icon={faInstagram} className="footer_instagram"/>    
                            </Link>
                            <Link to="#" target="_blank">
                                <FontAwesomeIcon icon={faFacebookSquare} className="footer_facebook" />    
                            </Link>                             */}
                            <Link to="https://az.linkedin.com/company/king-job?trk=public_post_main-feed-card_reshare_feed-actor-name" target="_blank">
                                <FontAwesomeIcon icon={faLinkedin} className="footer_linkedin" />
                            </Link>                            
                            {/* <Link to="#" target="_blank">
                                <FontAwesomeIcon icon={faTwitterSquare} className="footer_twitter" />
                            </Link>                             */}
                        </div>
                    </div>
                </div>
                {/* copyright container */}
                <div className="desktop_footer_copyright_container">
                    <div className="desktop_footer_info">
                    Azərbaycandan  <FontAwesomeIcon icon={faHeart} />-lə hazırlanmışdır.
                    </div>
                    <div className="desktop_footer_info">
                    Saytın rəhbərliyi yerləşdirilmiş elanların məzmununa görə məsuliyyət daşımır.
                    </div>
                    <div className="desktop_footer_copyright">
                        <Link to="https://www.kingjob.pro" target="_blank">kingjob.pro</Link> @2023 King Job MMC
                    </div>
                </div>
            </div>
        </div> 
    );
}
export default Footer;