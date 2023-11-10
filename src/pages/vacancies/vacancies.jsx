import './vacancies.css';
import { useLocation,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faFilter, faMagnifyingGlass, faSpinner } from "@fortawesome/free-solid-svg-icons";
import PostBox from '../../components/post_box/post_box';
import { latest_jobs } from '../../fakeData/latestJobs';
import { useEffect, useState } from 'react';
import VacancyFilters from '../../components/vacancy_flters/vacancy_filters';
import oneFlex from '../../images/one_grip.svg';
import oneFlexActive from '../../images/one_grip_active.svg';
import twoFlex from '../../images/two_grip.svg';
import twoFlexActive from '../../images/two_grip_active.svg';
import { useSelector,useDispatch } from 'react-redux';
import { searchJobs,getFavoritJobs,searchadvance,searchall } from '../../apiservices';
import { updateJobs,setFavJobs,updateFavJobs } from '../../redux/reducers/jobReducers';
import LoadingSpinner from '../../components/spinnerForPageLoading/LoadingSpinner';
function Vacancies() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user,isLoggedIn} = useSelector(state=>state.user)
    const {jobs,loading,favoritJobs,loadingFavJobs} = useSelector(state=>state.job);
    // console.log(favoritJobs,loadingFavJobs);
    // console.log(jobs)
    useEffect(()=>{
        const ftchfavjobs = async () => {
            try {
                const {data} = await getFavoritJobs(user?._id);
                // console.log(data);
                if(data.succes){
                    dispatch(setFavJobs(data.savedJobs));
                }
                else{
                    console.log("error in savedjobsfetching",data.message)
                }
            } catch (error) {
                console.log("error at get favorit jobs:",error.name)
            }
        }
        if(isLoggedIn && user){
            ftchfavjobs()
        }
    },[user?._id,isLoggedIn,user,dispatch])
    const location = useLocation(); 
    const searchParams = new URLSearchParams(location.search); 
    const [openMobileFilter, setOpenMobileFilter] = useState(false);
    const [flex, setFlex] = useState(localStorage.getItem('vacancies_flex') || 'half_row');
    
    useEffect(()=>{
        const searchjobs = async () => {
            // console.log(location.search)
            try {
                const {data} = await searchall(location.search);
                // console.log(data)
                if(data.success){
                    dispatch(updateJobs(data.jobs))
                }
            } catch (error) {
                console.log("error at searching job:"+error.name)
            }
        }
        searchjobs();
    },[dispatch,location.search])
    const [filter, setFilter] = useState({
        categories: searchParams.get('category') || "",
        sub_categories: searchParams.get('sub_category') || "",
        jobCity: searchParams.get('city') || "",
        min_salary: searchParams.get('min_salary') || "",
        max_salary: searchParams.get('max_salary') ||  "",                            
        jobExperience: searchParams.get('experience') || "",
        educationLevel: searchParams.get('education') || "",
        company: searchParams.get('companyName') || "",
        jobType: searchParams.get('type') || "",
        skills: searchParams.get('skills') || "",
        vacancyOrder: searchParams.get('order') || "" 
    })
    // useEffect(()=> { setFilter({...filter}) },[searchParams.size])
    const openMobileFilterHandle = ()=>{
        setOpenMobileFilter(!openMobileFilter);
    }
    
    const change_flex_handle = (flexType)=>{
        localStorage.setItem('vacancies_flex', `${flexType}`);
        setFlex(flexType);
    }
    // removes local variable for grid system when window resizing
    const resize_window_funcFlex= ()=>{
        if(window.innerWidth <= 1130){
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
    // fixing search box 
    const [fixSearch, setFixSearch] = useState(false);
    const scrollFunc = ()=>{
        const search_boxes = document.querySelector('.vacancies_page_boxes_container').scrollHeight;
        setFixSearch(document.documentElement.scrollTop > 90 && document.documentElement.scrollTop < search_boxes); 
    }
    useEffect(()=>{
        window.addEventListener('scroll', scrollFunc)
        return()=>{
            window.removeEventListener('scroll', scrollFunc);
        }
    }, []);
    const [advanceValue, setAdvanceValue] = useState('');
    const vacancySearchChange = (e)=>{
        setAdvanceValue(e.target.value);
        // navigate('/vacancies')
    }
    const searchAdvance = async (e) => {
        e.preventDefault()
        navigate(`/vacancies?value=${advanceValue}`);
    }
    // useEffect(()=>{
    //     const srch = async () => {
    //         try {
    //             const {data} = await searchadvance(advanceValue);
    //             console.log(data)
    //             if(data.success){
    //                 dispatch(updateJobs(data.jobs))
    //             }
    //             else{
    //                 console.log(data.message)
    //             }
    //         } catch (error) {
    //             console.log("error at search advance",error)
    //         }
    //     }
    //     srch()
    // },[advanceValue,dispatch])
    return ( 
        <div className="vacancies_page_container">
            {/* image slider and job search container */}
            <div className="vacancies_page_slider_and_search">
                {/* slogan */}
                <div className="vacancies_page_slogan">ARZULADIĞINIZ <span>İŞİ</span> BİZİMLƏ AXTARIN !</div>
                {/* ___________ job search form ________________ */}
                <div className={`vacancies_page_job_search_container ${fixSearch ? 'vacancies_page_job_search_fixed' : ''}`}>
                    <form onSubmit={searchAdvance} className="vacancies_page_job_search_form">
                        {/* vacancy search input */}
                        <input type="text" value={advanceValue} onChange={vacancySearchChange} placeholder='Peşə, Vəzifə, Şirkət və s...'/>
                        <button  type="submit" className='vacancies_page_job_search_form_submit'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </form>
                    <div className="vacancy_page_filters_button_container">
                        {/* mobile filter open button */}
                        <div className={`vacancy_page_filters_button`} onClick={openMobileFilterHandle}>
                            <FontAwesomeIcon icon={faFilter} />
                            Filterlər
                        </div>    
                    </div>
                </div>
            </div>            
            {/* filters and vacancy boxes container */}
            <div className="vacancies_filters_and_boxes_container">
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
                    {
                        loading ?
                        <div className="vacancies_page_loading_rotates">
                            <FontAwesomeIcon className='vacancies_page_loading_rot_icon' icon={faSpinner} />
                        </div>
                        :
                        <>
                            {/* premium vacancies */}
                            {jobs.filter(filtered => filtered['premium'] === true).length > 0 && <div className="vacancies_page_boxes_head">Premium Elanlar</div>}
                            <div className="vacancies_latest_jobs_boxes_container">
                                {
                                    jobs.filter(filtered => filtered['premium'] === true).map((item, index)=>{
                                        return(
                                            <PostBox 
                                                job_id = {item._id}
                                                premium = {item.premium}
                                                image_url={item.logo}
                                                salary={item.salary}
                                                agreedSalary = {item.agreedSalary}
                                                job_title={item.name}
                                                company_name={item.companyName}
                                                post_views={item.numberOfViews}
                                                post_applies = {item.numberOfApplys}
                                                post_start_date={item.createdAt}
                                                post_end_date={item.endTime.split('T')[0]}
                                                location={item.city}
                                                job_time_type={item.type}
                                                key={item._id}
                                                flexType={flex}
                                            />
                                        )
                                    })
                                }
                            </div>
                            {/* latest vacancies */}
                            {jobs.filter(filtered => filtered['premium'] === false).length > 0 && <div className="vacancies_page_boxes_head">Elanlar</div>}
                            <div className="vacancies_latest_jobs_boxes_container">
                                {
                                    jobs.filter(filtered => filtered['premium'] === false).map((item, index)=>{
                                        return(
                                            <PostBox 
                                                job_id = {item._id}
                                                premium = {item.premium}
                                                image_url={item.logo}
                                                salary={item.salary}
                                                agreedSalary = {item.agreedSalary}
                                                job_title={item.name}
                                                company_name={item.companyName}
                                                post_views={item.numberOfViews}
                                                post_applies = {item.numberOfApplys}
                                                post_start_date={item.createdAt}
                                                post_end_date={item.endTime.split('T')[0]}
                                                location={item.city}
                                                job_time_type={item.type}
                                                key={item._id}
                                                flexType={flex}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
     );
}
export default Vacancies;