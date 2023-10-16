import { Outlet } from "react-router-dom";
import './company_profile_vacancies.css';
function CompanyProfileVacancies() {
    return ( 
        <div className="company_profile_vacancies">
            {/* vacancies page */}
            <Outlet />
        </div>
     );
}

export default CompanyProfileVacancies;