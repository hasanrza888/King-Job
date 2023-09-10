import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './company_profile_main_window.css'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet } from 'react-router-dom';
import { faBell, faCommentDots } from '@fortawesome/free-regular-svg-icons';
function CompanyProfileMainWindow() {
    return ( 
    <div className="company_profile_main_window_container">
        {/* main window header */}
        <div className="company_profile_main_window_header">
            {/* link to home page */}
            <Link to='/' className="company_profile_main_window_link">
                <FontAwesomeIcon icon={faArrowLeftLong} />
                Əsas səhifə
            </Link>
            {/* company profile header buttons */}
            <div className="comp_pro_main_wndw_header_msg_and_notify_btns">
                <div className="comp_pro_main_wndw_header_btn" title='Mesajlar'>
                    <FontAwesomeIcon icon={faCommentDots} />
                    <span className='comp_pro_main_wndw_header_btn_count'>1</span>
                </div>
                <div className="comp_pro_main_wndw_header_btn" title='Bildirişlər'>
                    <FontAwesomeIcon icon={faBell} />
                    <span className='comp_pro_main_wndw_header_btn_count'>5</span>
                </div>
            </div>
        </div>
        <Outlet />
    </div> );
}

export default CompanyProfileMainWindow;