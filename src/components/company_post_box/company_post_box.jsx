import { Link } from "react-router-dom";
import "./company_post_box.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import StarRating from "../star_rating_show/star_rating_show";
import { formatNumber } from "../format_number/format_number";
function CompanyPostBox({company_name, company_logo, company_rating, vacancy_count, apply_count }) {
    return ( 
        <div className="company_post_box_container">
            {
                console.log(formatNumber(1100))
            }
            {/* logo and name */}
            <div className="company_post_logo_and_name">
                {/* logo */}
                <div className="company_post_logo">
                    <img src={`${company_logo}`} alt="company logo" />
                </div>
                {/* name and rating */}
                <div className="company_post_name_and_rating">
                    <div className="company_post_name">{company_name}</div>
                    {/* rating */}
                    <div className="company_post_rating">
                        {/* rating value */}
                        <div className="company_post_rating_value">{company_rating}</div>
                        {/* rating icons star */}
                        <StarRating rating_count = {company_rating}/>
                    </div>
                </div>
            </div>
            {/* company counts */}
            <div className="company_counts_container">
                {/* vacancy count */}
                <div className="company_counts">
                    <FontAwesomeIcon icon={faBullhorn} />
                    <div className="company_counts_value">{formatNumber(vacancy_count)} Vakansiya</div> 
                </div>
                {/* apply count */}
                <div className="company_counts">
                    <FontAwesomeIcon icon={faPaperPlane} />
                    <div className="company_counts_value">{formatNumber(apply_count)} Müraciət</div> 
                </div>
            </div>
            <Link to={`/${company_name}`} className="company_post_box_link"></Link>
        </div>
     );
}

export default CompanyPostBox;