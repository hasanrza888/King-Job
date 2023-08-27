import './vacancies.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import PageHeadText from '../../components/page_head_text/page_head_text';
import PostBox from '../../components/post_box/post_box';
import { latest_jobs } from '../../fakeData/latestJobs';
import { useEffect, useState } from 'react';
import VacancyFilters from '../../components/vacancy_flters/vacancy_filters';
import oneFlex from '../../images/one_grip.svg';
import oneFlexActive from '../../images/one_grip_active.svg';
import twoFlex from '../../images/two_grip.svg';
import twoFlexActive from '../../images/two_grip_active.svg';

function Vacancies() {
    const [openMobileFilter, setOpenMobileFilter] = useState(false);
    const [flex, setFlex] = useState(localStorage.getItem('vacancies_flex') || 'half_row');
    const [vacancy_name, setVacancy_name] = useState('');
    const [filter, setFilter] = useState({
        categories: "",
        sub_categories: "",
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
        setVacancy_name(e.target.value);
    }
    const change_flex_handle = (flexType)=>{
        localStorage.setItem('vacancies_flex', `${flexType}`);
        setFlex(flexType);
    }
    const resize_window_funcFlex= ()=>{
        if(window.innerWidth < 1130){
            localStorage.setItem('vacancies_flex', 'one_row');
            setFlex('one_row');
        }else{
            localStorage.setItem('vacancies_flex', 'half_row');
            setFlex('half_row');
        }
    } 
    useEffect(()=>{
        // resize_window_funcFlex();
        window.addEventListener('resize', resize_window_funcFlex);
        return ()=>{
            window.removeEventListener('resize', resize_window_funcFlex);
        }
    },[])   
    return ( 
        <div className="vacancies_page_container">
            {/* image slider and job search container */}
            <div className="vacancies_page_slider_and_search">
                {/* slogan */}
                <div className="vacancies_page_slogan">ARZULADIĞINIZ <span>İŞİ</span> BİZİMLƏ AXTARIN !</div>
                {/* ___________ job search form ________________ */}
                <div className="vacancies_page_job_search_container">
                    <form className="vacancies_page_job_search_form">
                        {/* vacancy search input */}
                        <input type="text" value={vacancy_name} onChange={vacancySearchChange} placeholder='Peşə, Vəzifə'/>
                        <button type="submit" className='vacancies_page_job_search_form_submit'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </form>
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
                    {/* flex grips container */}
                    <div className="vacancies_page_flex_grip_cont">
                        {/* flex grip image */}
                        <div className="vacancies_page_flex_grip" onClick={()=>{change_flex_handle('one_row')}}>
                            {
                                flex === 'one_row' ?
                                <img src={oneFlexActive} alt="One flex active" />
                                :
                                <img src={oneFlex} alt="One flex" />
                            }
                        </div>
                        {/* flex grip image */}
                        <div className="vacancies_page_flex_grip" onClick={()=>{change_flex_handle('half_row')}}>
                            {
                                flex === 'half_row' ?
                                <img src={twoFlexActive} alt="Two flex active" />
                                :
                                <img src={twoFlex} alt="Two flex" />
                            }
                        </div>
                    </div>
                    {/* premium vacancies */}
                    {/* <PageHeadText content={'Premium Elanlar'}/> */}
                    <div className="vacancies_latest_jobs_boxes_container">
                        {
                            latest_jobs['latest'].map((item, index)=>{
                                return(
                                    <PostBox 
                                        job_id = {item.job_id}
                                        premium = {item.premium}
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
                                        flexType={flex}
                                    />
                                )
                            })
                        }
                    </div>
                    {/* latest vacancies */}
                    {/* <PageHeadText content={'Ən Son Elanlar'}/> */}
                    {/* <div className="vacancies_latest_jobs_boxes_container">
                        {
                            latest_jobs['latest'].map((item, index)=>{
                                return(
                                    <PostBox 
                                        job_id = {item.job_id}
                                        premium = {item.premium}
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
                                        flexType={flex}
                                    />
                                )
                            })
                        }
                    </div> */}
                </div>
            </div>
        </div>
     );
}
export default Vacancies;