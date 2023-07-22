import './vacancies.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SliderHome from "../../components/slider/slider";
import { faChevronLeft, faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import PageHeadText from '../../components/page_head_text/page_head_text';
import PostBox from '../../components/post_box/post_box';
import { latest_jobs } from '../../fakeData/latestJobs';
import { useState } from 'react';
import NotificationMessage from '../../components/notification_message/notification_message';
import VacancyFilters from '../../components/vacancy_flters/vacancy_filters';

function Vacancies() {
    const [successMsg, setSuccessMsg] = useState(false);
    const [savedJob, setSavedJob] = useState('');
    const notification_message_content = <div>"{savedJob}" adlı vakansiya şəxsi hesabınızda <strong><u>sevimlilər</u></strong> bölməsinə əlavə olundu.</div>;
    const [openMobileFilter, setOpenMobileFilter] = useState(false);
    const [filter, setFilter] = useState({
        vacancy_name: "",
        categories: "",
        jobCity: "",
        min_salary: null,
        max_salary: null,                            
        jobExperience: "",
        educationLevel: "",
        company: "",
        jobType: "",
        skills: "",
        vacancyOrder: "" 
    })
    const openMobileFilterHandle = ()=>{
        setOpenMobileFilter(!openMobileFilter);
    }
    const vacancySearchChange = (e)=>{
        setFilter({...filter, vacancy_name: e.target.value});
    }    
    return ( 
        <div className="vacancies_page_container">
            {console.log(filter)}
            {/* image slider and job search container */}
            <div className="vacancies_page_slider_and_search">
                {/* slider */}
                <SliderHome />
                {/* ___________ slider core ________________ */}
                <div className="vacancies_page_slider_core">
                    {/* ___________ job search form ________________ */}
                    <div className="vacancies_page_job_search_container">
                        <form className="vacancies_page_job_search_form">
                            {/* vacancy search input */}
                            <input type="text" value={filter.vacancy_name} onChange={vacancySearchChange} placeholder='ARZULADIĞINIZ İŞİ BİZİMLƏ AXTARIN !'/>
                            <button type="submit" className='vacancies_page_job_search_form_submit'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </form>
                    </div>
                </div> 
            </div>            
            {/* filters and vacancy boxes container */}
            <div className="vacancies_filters_and_boxes_container">
                {/* mobile filter open button */}
                <div className="vacancy_page_filters_button" onClick={openMobileFilterHandle}>
                    <FontAwesomeIcon icon={faFilter} />
                    Filterlər
                </div>
                {/* vacancies filters container */}
                <div className={`vacancies_page_filters_container ${openMobileFilter ? 'vacancies_page_filters_mobile' : ''}`}>
                    <div className="vacancies_page_filters_mobile_close" onClick={openMobileFilterHandle}>
                        <FontAwesomeIcon icon={faChevronLeft} />    
                        Geri
                    </div>                    
                    <VacancyFilters closeMobileFilter={openMobileFilterHandle} filter={filter} setFilter={setFilter}/>
                </div>
                {/* vacancies boxes */}
                <div className="vacancies_page_boxes_container">
                    {/* premium vacancies */}
                    <PageHeadText content={'Premium Elanlar'}/>
                    <div className="vacancies_latest_jobs_boxes_container">
                        {
                            latest_jobs['latest'].map((item, index)=>{
                                return(
                                    <PostBox 
                                        job_id = {item.job_id}
                                        image_url={item.image_url}
                                        salary={item.salary}
                                        job_title={item.job_title}
                                        company_name={item.company_name}
                                        post_views={item.post_views}
                                        post_applies = {item.post_applies}
                                        post_start_date={item.post_start_date}
                                        post_end_date={item.post_end_date}
                                        location={item.location}
                                        job_time_type={item.job_time_type}
                                        key={item.job_id}
                                        setSuccessMsg = {setSuccessMsg}
                                        setSavedJob = {setSavedJob}
                                    />
                                )
                            })
                        }
                    </div>
                    {/* latest vacancies */}
                    <PageHeadText content={'Ən Son Elanlar'}/>
                    <div className="vacancies_latest_jobs_boxes_container">
                        {
                            latest_jobs['latest'].map((item, index)=>{
                                return(
                                    <PostBox 
                                        job_id = {item.job_id}
                                        image_url={item.image_url}
                                        salary={item.salary}
                                        job_title={item.job_title}
                                        company_name={item.company_name}
                                        post_views={item.post_views}
                                        post_applies = {item.post_applies}
                                        post_start_date={item.post_start_date}
                                        post_end_date={item.post_end_date}
                                        location={item.location}
                                        job_time_type={item.job_time_type}
                                        key={item.job_id}
                                        setSuccessMsg = {setSuccessMsg}
                                        setSavedJob = {setSavedJob}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {successMsg ? <NotificationMessage setSuccessMsg = {setSuccessMsg} notification_message_content = {notification_message_content} /> : null}
        </div>
     );
}
export default Vacancies;