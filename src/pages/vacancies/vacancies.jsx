import './vacancies.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SliderHome from "../../components/slider/slider";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import PageHeadText from '../../components/page_head_text/page_head_text';
import PostBox from '../../components/post_box/post_box';
import { latest_jobs } from '../../fakeData/latestJobs';
import { useState } from 'react';
import NotificationMessage from '../../components/notification_message/notification_message';
import CustomSelectOption from '../../components/custom_select_option/custom_select_option';

function Vacancies() {
    const [successMsg, setSuccessMsg] = useState(false);
    const [savedJob, setSavedJob] = useState('');
    const notification_message_content = <div>"{savedJob}" adlı vakansiya şəxsi hesabınızda <strong><u>sevimlilər</u></strong> bölməsinə əlavə olundu.</div>;
    // categories
    const [categories, setCategories] = useState([
        {
            optionName: 'IT',
            selected: false,
            subOptions: [
                {subOptionsName: "Web", selected: false},
                {subOptionsName: "QA", selected: false},
                {subOptionsName: "Security", selected: false},
            ]
        },
        {
            optionName: 'Bank',  
            selected: false,          
            subOptions: [
                {subOptionsName: "Kredit mütəxəssisi", selected: false},
                {subOptionsName: "Analitik", selected: false},
                {subOptionsName: "Əməliyyatçı", selected: false},
                {subOptionsName: "Şöbə müdiri", selected: false}
            ]
        },
        {
            optionName: 'Marketinq və Satış',
            selected: false,
            subOptions: '',
        }
    ])
    // cities
    const [jobCity, setJobCity] = useState([
        {
            optionName: 'Bakı',
            selected: false,
        },
        {
            optionName: 'Sumqayıt',
            selected: false,
        },
        {
            optionName: 'Lənkəran',
            selected: false,
        },
        {
            optionName: 'Masallı',
            selected: false,
        }
    ])
    // job experience
    const [jobExperience, setJobExperience] = useState([
        {
            optionName: 'Təcrübəsiz',
            selected: false,
        },
        {
            optionName: '1 ildən aşağı',
            selected: false,
        },
        {
            optionName: '1 ildən 3 ilə qədər',
            selected: false,
        },
        {
            optionName: '3 ildən 5 ilə qədər',
            selected: false,
        },
        {
            optionName: '5 ildən çox',
            selected: false,
        }
    ])
    // education level
    const [educationLevel, setEducationLevel] = useState([
        {
            optionName: 'Təhsilsiz',
            selected: false,
        },
        {
            optionName: 'Orta',
            selected: false,
        },
        {
            optionName: 'Ali',
            selected: false,
        }
    ])
    // company
    const [company, setCompany] = useState([
        {
            optionName: 'İŞland',
            selected: false,
        },
        {
            optionName: 'Paşa bank',
            selected: false,
        },
        {
            optionName: 'Kapital bank',
            selected: false,
        },
        {
            optionName: 'Yelo bank',
            selected: false,
        },
        {
            optionName: 'ABB',
            selected: false,
        },
        {
            optionName: 'Pasha sığorta',
            selected: false,
        }
    ])
    // job type
    const [jobType, setJobType] = useState([
        {
            optionName: 'Tam',
            selected: false,
        },
        {
            optionName: 'Natamam',
            selected: false,
        },
        {
            optionName: 'Onlayn',
            selected: false,
        },
        {
            optionName: 'Dəyişkən',
            selected: false,
        }
    ])
    // vacancy order
    const [vacancyOrder, setVacancyOrder] = useState([
        {
            optionName: 'Ən Son',
            selected: false,
        },
        {
            optionName: 'İlk',
            selected: false,
        },
        {
            optionName: 'Ən çox maaş',
            selected: false,
        },
        {
            optionName: 'Ən az maaş',
            selected: false,
        },
        {
            optionName: 'Ən çox baxış sayı',
            selected: false,
        },
        {
            optionName: 'Ən az baxış sayı',
            selected: false,
        }        
    ])
    return ( 
        <div className="vacancies_page_container">
            {/* image slider and job search container */}
            <div className="vacancies_page_slider_and_search">
                {/* slider */}
                <SliderHome />
                {/* ___________ slider core ________________ */}
                <div className="vacancies_page_slider_core">
                    {/* ___________ job search form ________________ */}
                    <div className="vacancies_page_job_search_container">
                        <form className="vacancies_page_job_search_form">
                            <input type="text" placeholder='ARZULADIĞINIZ İŞİ BİZİMLƏ AXTARIN !'/>
                            <button type="submit" className='vacancies_page_job_search_form_submit'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </form>
                    </div>
                </div> 
            </div>            
            {/* filters and vacancy boxes container */}
            <div className="vacancies_filters_and_boxes_container">
                {/* vacancies filters container */}
                <div className="vacancies_page_filters_container">
                    {/* vacancies filter heading    */}
                    <div className="vacancies_page_filters_heading">Filterlər</div>
                    {/* filter boxes container */}
                    <ul className="vacancies_page_filters_boxes_container">
                        {/* category */}
                        <li className="vacancies_page_filters_box">
                            <CustomSelectOption select_option_name={'Kateqoriya'} select_option_array={categories} select_update={setCategories}/>
                        </li>    
                        {/* city */}
                        <li className="vacancies_page_filters_box">
                            <CustomSelectOption select_option_name={'Şəhər'} select_option_array={jobCity} select_update={setJobCity}/>
                        </li>  
                        {/* salary                   */}
                        <li className="vacancies_page_filters_box">
                            <div className="vacancies_page_filters_box_name">Əmək haqqı</div>
                            {/* minimum or maximum salary */}
                            <div className="vacancies_page_filters_salaries">
                                {/* minimum salary */}
                                <input type="number" className="vacancies_page_filters_salary_input" />
                                {/* maximum salary */}
                                <input type="number" className="vacancies_page_filters_salary_input" />
                            </div>
                        </li>  
                        {/* experience */}
                        <li className="vacancies_page_filters_box">
                            <CustomSelectOption select_option_name={'İş təcrübəsi'} select_option_array={jobExperience} select_update={setJobExperience}/>
                        </li> 
                        {/* education level */}
                        <li className="vacancies_page_filters_box">
                            <CustomSelectOption select_option_name={'Təhsil səviyyəsi'} select_option_array={educationLevel} select_update={setEducationLevel}/>
                        </li> 
                        {/* company  */}
                        <li className="vacancies_page_filters_box">
                            <CustomSelectOption select_option_name={'Şirkət'} select_option_array={company} select_update={setCompany}/>
                        </li> 
                        {/* job type  */}
                        <li className="vacancies_page_filters_box">
                            <CustomSelectOption select_option_name={'İş qrafiki'} select_option_array={jobType} select_update={setJobType}/>
                        </li> 
                        {/* special knowledges */}
                        <li className="vacancies_page_filters_box">
                            <input type="text" className="vacancies_page_filters_box_text_input" placeholder='Xüsusi biliklər'/>
                        </li>
                        {/* vacancy boxes order  */}
                        <li className="vacancies_page_filters_box">
                            <CustomSelectOption select_option_name={'Sıralama'} select_option_array={vacancyOrder} select_update={setVacancyOrder}/>
                        </li> 
                    </ul>
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