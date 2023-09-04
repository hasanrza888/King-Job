import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './company_profile_main_window.css'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet } from 'react-router-dom';
function CompanyProfileMainWindow() {
    return ( 
    <div className="company_profile_main_window_container">
        {/* main window header */}
        <div className="company_profile_main_window_header">
            <Link to='/' className="company_profile_main_window_link">
                <FontAwesomeIcon icon={faArrowLeftLong} />
                Əsas səhifə
            </Link>
        </div>
        <Outlet />
    </div> );
}

export default CompanyProfileMainWindow;