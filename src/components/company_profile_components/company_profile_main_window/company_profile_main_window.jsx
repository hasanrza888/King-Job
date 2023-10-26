import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './company_profile_main_window.css'
import { faArrowLeftLong, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet } from 'react-router-dom';
import { faBell, faCommentDots,faMoneyBill1 } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';
function CompanyProfileMainWindow({open_company_menu, menu}) {
    const { user, isLoggedIn, info } = useSelector(state => state.user);
    // console.log(info)
    return ( 
    <div className={`company_profile_main_window_container ${menu ? 'company_profile_main_window_full' : ''}`}>
        {/* main window header */}
        <div className="company_profile_main_window_header">
            <div className="company_profile_main_window_header_menubar_and_back_btn">
                <div className={`company_profile_main_window_header_menubar ${menu ? '' : 'company_profile_main_window_header_menubar_hide'}`} onClick={()=> {open_company_menu()}}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                {/* link to home page */}
                <Link to='/' className="company_profile_main_window_link">
                    <FontAwesomeIcon icon={faArrowLeftLong} />
                    Əsas səhifə
                </Link>
            </div>
            {/* company profile header buttons */}
            <div className="comp_pro_main_wndw_header_msg_and_notify_btns">
            {/* <div className="comp_pro_main_wndw_header_btn" title='Hesab'>
                    <FontAwesomeIcon icon={faMoneyBill1} />
                    <span className='comp_pro_main_wndw_header_btn_count'>{info?.numberOfJobSharing}</span>
                </div> */}
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
        {/* nested windows */}
        <div className="company_profile_nested_windows">
            <Outlet  />    
        </div>
    </div> );
}

export default CompanyProfileMainWindow;