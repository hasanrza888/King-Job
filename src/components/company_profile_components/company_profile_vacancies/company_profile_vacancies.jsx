import { Outlet } from "react-router-dom";

function CompanyProfileVacancies() {
    return ( 
        <div className="company_profile_vacancies">
            vacancies page
            <Outlet />
        </div>
     );
}

export default CompanyProfileVacancies;