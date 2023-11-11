import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostBoxSaveBtn from "../post_box_save_btn/post_box_save_btn";
import defaultlogo from "../../images/defaultcompanylogo.png"
import { faArrowRightLong, faHourglassEnd, faHourglassStart } from "@fortawesome/free-solid-svg-icons";
import { faEye, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import "./post_box.css"
import { Link } from "react-router-dom";
import { formatNumber } from "../format_number/format_number";
import { useSelector,useDispatch } from "react-redux";
import { updateCurrentJob } from "../../redux/reducers/jobReducers";
import { useEffect,useState } from "react";
function PostBox({setSavedJob, setSuccessMsg, job_id, premium, image_url, salary,agreedSalary, job_title, company_name, post_views, post_applies, post_start_date, post_end_date, location, job_time_type, flexType}){
    console.log(formatTimeDifference(post_start_date))
    function formatTimeDifference(timestamp) {
        const now = new Date().getTime();
        let tim = new Date(timestamp)
        const difference = now - tim.getTime();
        if (difference < 60 * 1000) {
          return `${Math.floor(difference / 1000)} seconds ago`;
        } else if (difference < 60 * 60 * 1000) {
          return `${Math.floor(difference / (60 * 1000))} minutes ago`;
        } else if (difference < 24 * 60 * 60 * 1000) {
          return `${Math.floor(difference / (60 * 60 * 1000))} hours ago`;
        }
        return timestamp.split('T')[0]
    }
    const dispatch = useDispatch();
    const {user,isLoggedIn} = useSelector(state=>state.user);
    // console.log(user,isLoggedIn)
    const clearLocalAndCurrentJobInDetailWhenClickJobBox = () => {
        localStorage.removeItem('c_r_r_n_t');
        dispatch(updateCurrentJob(null));
        // console.log('clicked')
    }
    
    return(
        <div onClick={clearLocalAndCurrentJobInDetailWhenClickJobBox} className={`post_box_container ${flexType === 'half_row' && window.innerWidth >= 1130 ? 'post_box_container_half' : ''}`}>
            {/* premium vacancies */}
            {
                premium ? <div className="post_box_premium_vacancy"><div className="post_box_premium_vacancy_text">PREMİUM</div></div> : ''
            }
            {/* company and save button container */}
            <div className="post_box_company_and_save_post_btn">
                {/* company logo and name comtainer*/}
                <Link to={`/${company_name}`} className="post_box_company_logo_name">
                    {/* company logo */}
                    <div className="post_box_company_logo">
                        <img src={image_url || defaultlogo } alt={company_name} />
                    </div>
                    {/* company name */}
                    <div className="post_box_company_name">
                        {company_name}
                    </div>
                </Link>
                {/* post save button */}
                {<PostBoxSaveBtn job_id = {job_id} setSuccessMsg = {setSuccessMsg} setSavedJob={setSavedJob} job_title={job_title}/>}
            </div>
            {/* job title and salary */}
            <div className="post_box_job_title_and_salary">
                {/* job title */}
                <div className="post_box_job_title" title={job_title}>
                    {job_title}
                </div>
                {/* job salary */}
                <div className="post_box_job_salary">
                    {salary ? salary + " AZN" : "Razılaşma"}
                </div>                
            </div>
            {/* job location and time type */}
            <div className="job_location_and_time_type">
                {/* job location */}
                <div className="post_box_job_location">
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
                            {formatTimeDifference(post_start_date)}
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
                            {formatNumber(post_applies)}
                        </div>
                        {/* number of post views */}
                        <div className="post_box_statistics_number">
                            <FontAwesomeIcon icon={faEye} />
                            {formatNumber(post_views)}
                        </div>
                    </div>
                </div>  
                {/* post box detail button               */}
                <Link to={`/vacancies/${job_id}`} className="post_box_details_btn">
                    Ətraflı
                    <FontAwesomeIcon icon={faArrowRightLong} />
                </Link>
            </div>
            <Link to={`/vacancies/${job_id}`} className="post_box_link"></Link> 
        </div>
    )
}
export default PostBox