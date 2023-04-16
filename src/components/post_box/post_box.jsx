import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostBoxSaveBtn from "../post_box_save_btn/post_box_save_btn";
import { faBriefcase, faHourglassEnd, faHourglassStart, faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { faEye, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import "./post_box.css"
function PostBox({setSavedJob, setSuccessMsg, job_id, image_url, salary, job_title, company_name, post_views, post_applies, post_start_date, post_end_date, location, job_time_type}){
    
    return(
        <div className="post_box_container">
            {/* company and save button container */}
            <div className="post_box_company_and_save_post_btn">
                {/* company logo and name comtainer*/}
                <div className="post_box_company_logo_name">
                    {/* company logo */}
                    <div className="post_box_company_logo">
                        <img src={image_url} alt={company_name} />
                    </div>
                    {/* company name */}
                    <div className="post_box_company_name">
                        {company_name}
                    </div>
                </div>
                {/* post save button */}
                <PostBoxSaveBtn job_id = {job_id} setSuccessMsg = {setSuccessMsg} setSavedJob={setSavedJob} job_title={job_title}/>
            </div>
            {/* job title and salary */}
            <div className="post_box_job_title_and_salary">
                {/* job title */}
                <div className="post_box_job_title">
                    <FontAwesomeIcon icon={faBriefcase} /> 
                    {job_title}
                </div>
                {/* job salary */}
                <div className="post_box_job_salary">
                    Maaş : {salary} AZN
                </div>                
            </div>
            {/* job location and time type */}
            <div className="job_location_and_time_type">
                {/* job location */}
                <div className="post_box_job_location">
                    <FontAwesomeIcon icon={faLocationPin} />
                    {location}
                </div>
                {/* job time type */}
                <div className="post_box_job_time_type">
                    {job_time_type}
                </div>
            </div>
            {/* dates and statistics numbers and details button */}
            <div className="post_dates_and_details_btn_container">
                {/* post dates and statistics numbers */}
                <div className="post_dates_and_statistics_numbers">
                    {/* post dates  */}
                    <div className="post_box_dates_container">
                        <div className="post_box_date post_box_start_date">
                            <FontAwesomeIcon icon={faHourglassStart} />
                            {post_start_date}
                        </div>
                        <div className="post_box_date post_box_end_date">
                            <FontAwesomeIcon icon={faHourglassEnd} />
                            {post_end_date}
                        </div>
                    </div>
                    {/* post statistics numbers */}
                    <div className="post_box_statistics_numbers_container">
                        {/* number of applies to the job vacancy */}
                        <div className="post_box_statistics_number">
                            <FontAwesomeIcon icon={faPaperPlane} />
                            {post_applies}
                        </div>
                        {/* number of post views */}
                        <div className="post_box_statistics_number">
                            <FontAwesomeIcon icon={faEye} />
                            {post_views}
                        </div>
                    </div>
                </div>  
                {/* post box detail button               */}
                <div className="post_box_details_btn">
                    Ətraflı
                </div>
            </div>
        </div>
    )
}
export default PostBox