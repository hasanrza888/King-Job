import { useEffect, useState } from "react";
import './post_detail.css';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, Link } from "react-router-dom";
import { latest_jobs } from "../../fakeData/latestJobs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck, faHourglassEnd, faHourglassStart, faTag } from "@fortawesome/free-solid-svg-icons";
import PageHeadText from "../../components/page_head_text/page_head_text";
import PostBox from "../../components/post_box/post_box";
import PostBoxSaveBtn from "../../components/post_box_save_btn/post_box_save_btn";
import ApplyFormDetailP from "../../components/apply_form_detailPage/apply_form_detailP";
import { toast } from "react-toastify";
import oneFlex from '../../images/one_grip.svg';
import oneFlexActive from '../../images/one_grip_active.svg';
import twoFlex from '../../images/two_grip.svg';
import twoFlexActive from '../../images/two_grip_active.svg';
import { formatNumber } from "../../components/format_number/format_number";
import CVCheckerModal from "../../components/CV_checker_modal/CV_checker_modal";
import { getJobWithId } from "../../apiservices";
import { useSelector,useDispatch } from "react-redux";
import { updateJobs,updateCurrentJob } from "../../redux/reducers/jobReducers";
function PostDetail() {
    const dispatch = useDispatch();
    const [loading,setLoading]  = useState(false);
    const [checkCv, setCheckCv] = useState(false);
    const {id} = useParams();
    const {jobs:Jobs,loading:Loading,currentJobInDetail:data} = useSelector(state=>state.job);
    const {user,isLoggedIn} = useSelector(state=>state.user);
    // const [data, setData] = useState(null);
    useEffect(()=>{
        const ftchJobWithId = async () => {
            console.log("fetched in detail")
            console.log(id)
            setLoading(true);
            try {
                const {data} = await getJobWithId(id);
                setLoading(false);
                // console.log(data)
                if(data.succes){
                    dispatch(updateCurrentJob(data.data));
                    let newData = Jobs.map(obj=>{
                        return obj._id === (data.data)._id ?
                        data.data : obj
                    });
                    dispatch(updateJobs(newData)); 
                }
                else{
                    dispatch(updateCurrentJob(null));
                }

            } catch (error) {
                setLoading(false);
                dispatch(updateCurrentJob(null));
                console.log("error at jobdetail:",error.name);
            }
        }
        const strdinf = JSON.parse(localStorage.getItem('c_r_r_n_t'));
        // console.log(strdinf._id !== id)
        if(strdinf === null || strdinf._id !==id){
            ftchJobWithId();
        }
       
    },[dispatch]);
    const [applyWindow, setApplyWindow] = useState(false);
    const [flex, setFlex] = useState(localStorage.getItem('vacancies_flex') || 'half_row');
    const openApplyWindowF = ()=>{
        setApplyWindow(!applyWindow);
    }
    const sendNotificationSuccess = ()=>{
        toast.success(`${data['job_title']} adlı vakansiyaya müraciət göndərildi!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
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
    // check cv button action
    const open_cv_checker = ()=>{
        if(user && isLoggedIn){
            setCheckCv(!checkCv);
        }
        else{
            toast.info(<div>CV-nizi yoxlamaq üçün  şəxsi hesabınıza daxil olmalısınız.<strong><u><Link to={'/login'}>buradan daxil olun</Link></u></strong></div>, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    return ( 
        <div className="detail_page">
            {
                loading ? (
                    <div className="detail_page_container">
                    <div className="detail_page_job_header">
                        <h1 className="loading">Loading....</h1>
                        
                    </div>
                    </div>
                ):
                data ?
                <div className="detail_page_container">
                    {/* detail page job header */}
                    <div className="detail_page_job_header">
                        {/* job title and vacancy buttons */}
                        <div className="detail_page_job_title_and_btns">
                            {/* job title */}
                            <div className="detail_page_vacancy_name">{data['name']}</div>
                            {/* vacancy base informations and save button */}
                            <div className="detail_page_vacancy_buttons_container">
                                {/* job applies number */}
                                <div className="detail_page_vacancy_button detail_page_vacancy_button_desktop">
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                    {formatNumber(data['numberOfApplys'])}
                                </div>
                                {/* job views number */}
                                <div className="detail_page_vacancy_button detail_page_vacancy_button_desktop">
                                    <FontAwesomeIcon icon={faEye} />
                                    {formatNumber(data['numberOfViews'])}
                                </div>
                                {/* job save button */}
                                <div className="detail_page_vacancy_save_button" title="Vakansiyanı yadda saxla">
                                    <PostBoxSaveBtn job_id = {data['_id']} job_title={data['name']}/>                                 
                                </div>
                            </div>
                        </div>
                        {/* company */}
                        <div className="detail_page_company">
                            {/* company logo */}
                            <div className="detail_page_company_logo">
                                <img src={`${((data.company)?.companyInfo)?.logo}`} alt="company logo"/>
                            </div>
                            {/* company name */}
                            <div className="detail_page_company_name">{(data.company)?.name}</div>
                        </div>                                                    
                        {/* dates, salary and apply button */}
                        <div className="detail_page_dates_and_salary">
                            {/* vacancy dates container */}
                            <div className="detail_page_mobile_btns_dates">                                
                                <div className="detail_page_dates_container">
                                    {/* vacancy start date */}
                                    <div className="detail_page_date">
                                        <FontAwesomeIcon icon={faHourglassStart} />
                                        {data['createdAt'].includes('T') ?data['createdAt'].split('T')[0] : data['createdAt']}
                                    </div>
                                    {/* vacancy end date */}
                                    <div className="detail_page_date">
                                        <FontAwesomeIcon icon={faHourglassEnd} />
                                        {data['endTime'].split('T')[0]}
                                    </div>
                                </div>
                                {/* mobile post views and apply numbers */}
                                <div className="detail_page_vacancy_buttons_container detail_page_vacancy_buttons_mobile">
                                    {/* job applies number */}
                                    <div className="detail_page_vacancy_button">
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                        {formatNumber(data['numberOfApplys'])}
                                    </div>
                                    {/* job views number */}
                                    <div className="detail_page_vacancy_button">
                                        <FontAwesomeIcon icon={faEye} />
                                        {formatNumber(data['numberOfViews'])}
                                    </div>                                
                                </div>
                            </div>
                            {/* salary and apply button container */}
                            <div className="detail_page_salary_and_apply_btn">
                                {/* salary  */}
                                <div className="detail_page_salary">{data['salary']} AZN</div>
                                {/* apply button */}
                                <div className="detail_page_apply_btn_container">
                                    <button onClick={openApplyWindowF} className="detail_page_apply_btn">Müraciət Et</button>
                                    {/* check your CV info container */}
                                    {/* <div className="check_your_cv_info_container">
                                        <div className="check_your_cv_info">
                                            <div className="check_your_cv_info_text">
                                                Vakansiyaya müraciət etməmişdən öncə <span>süni intellekt</span> bot-u vasitəsilə CV-in bu işə uyğun olub olmadığını yoxlayaraq məsləhətlər ala bilərsiniz.
                                            </div>
                                            <button className="check_your_cv_info_btn" onClick={open_cv_checker}>CV yoxla</button>    
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* check your cv box */}
                    {((isLoggedIn && user?.u_t_p === 'u_s_r') || !isLoggedIn) &&<div className="detail_page_check_your_cv_container">
                        <div className="detail_page_check_your_cv_desc_and_icon">
                            <FontAwesomeIcon className="detail_page_check_your_cv_icon" icon={faCircleCheck} />
                            <div className="detail_page_check_your_cv_desc">
                                Vakansiyaya müraciət etməmişdən öncə <span>süni intellekt</span> bot-u vasitəsilə CV-in bu işə uyğun olub olmadığını yoxlayaraq məsləhətlər ala bilərsiniz
                            </div>    
                        </div>
                        <button className="detail_page_check_your_cv_btn" onClick={open_cv_checker}>CV yoxla</button>
                    </div>}
                    {/* vacancy descriptions */}
                    <div className="detail_page_vacancy_description_container">
                        {/* vacancy details =>>> vakansiya detallari */}
                        <div className="detail_page_vacancy_description detail_page_vacancy_description_half">
                            {/* description heading */}
                            <div className="detail_page_vacancy_description_head">Vakansiya Detalları</div>
                            {/* description body */}
                            <div className="detail_page_vacancy_description_body">
                                <ul className="vacancy_description_body_list_cont">
                                    {/* city */}
                                    <li className="vacancy_description_body_list_item">
                                        <p className="vacancy_description_list_par">Şəhər</p>
                                        <p className="vacancy_description_list_par">{data['city']}</p>
                                    </li>
                                    {/* category */}
                                    <li className="vacancy_description_body_list_item">
                                        <p className="vacancy_description_list_par">Kateqoriya</p>
                                        <p className="vacancy_description_list_par">{data['category']} / {data['subCategory']}</p>
                                    </li>
                                    {/* job time type */}
                                    <li className="vacancy_description_body_list_item">
                                        <p className="vacancy_description_list_par">İş qrafiki</p>
                                        <p className="vacancy_description_list_par">{data['type']}</p>
                                    </li>
                                    {/* job experience */}
                                    <li className="vacancy_description_body_list_item">
                                        <p className="vacancy_description_list_par">Təcrübə</p>
                                        <p className="vacancy_description_list_par">{data['experience']}</p>
                                    </li>
                                    {/* education */}
                                    <li className="vacancy_description_body_list_item">
                                        <p className="vacancy_description_list_par">Təhsil</p>
                                        <p className="vacancy_description_list_par">{data['education']}</p>
                                    </li>
                                    {/* age */}
                                    <li className="vacancy_description_body_list_item">
                                        <p className="vacancy_description_list_par">Yaş</p>
                                        <p className="vacancy_description_list_par">{"21"}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* vacancy details =>>> xüsusi tələblər */}
                        <div className="detail_page_vacancy_description detail_page_vacancy_description_half">
                            {/* description heading */}
                            <div className="detail_page_vacancy_description_head">Xüsusi Tələblər</div>
                            {/* description body */}
                            <div className="detail_page_vacancy_description_body">
                                <ul className="detail_page_vacancy_special_req_list">
                                    {
                                        data['specialRequirements'].map((item, index)=>{
                                            return <li key={index}>{item}</li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        {/* vacancy details =>>> vakansiya təsviri */}
                        <div className="detail_page_vacancy_description">
                            {/* description heading */}
                            <div className="detail_page_vacancy_description_head">Vakansiya Təsviri</div>
                            {/* description body */}
                            <div className="detail_page_vacancy_description_body">{data['descriptionOfVacancy']}</div>
                        </div>
                        {/* vacancy details =>>> vakansiya skills tags */}
                        <div className="detail_page_vacancy_description">
                            {/* description heading */}
                            <div className="detail_page_vacancy_description_head">Əlaqədar Teqlər</div>
                            {/* description body */}
                            <div className="detail_page_vacancy_description_body">
                                {/* job skills tag links */}
                                <ul className="detail_page_vacancy_description_skills">
                                    {
                                        data['skills'].map((item, index)=>{
                                            return <li key={index}>
                                                        <Link to={`/vacancies?skills=${item}`}>
                                                            <FontAwesomeIcon icon={faTag} />{item}
                                                        </Link>
                                                    </li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        {/* second apply button */}
                        <div className="detail_page_vacancy_second_apply_btn_container">
                            <button onClick={openApplyWindowF} className="detail_page_vacancy_second_apply_btn">Müraciət Et</button>
                            {/* check your CV info container */}
                            {/* <div className="check_your_cv_info_container">
                                <div className="check_your_cv_info">
                                    <div className="check_your_cv_info_text">
                                        Vakansiyaya müraciət etməmişdən öncə <span>süni intellekt</span> bot-u vasitəsilə CV-in bu işə uyğun olub olmadığını yoxlayaraq məsləhətlər ala bilərsiniz.
                                    </div>
                                    <button className="check_your_cv_info_btn" onClick={open_cv_checker}>CV yoxla</button>    
                                </div>
                            </div> */}
                        </div>
                    </div>
                    {/* relevant vacancies */}
                    <div className="detail_page_relevant_vacancies">
                        <PageHeadText content={'Əlaqədar Elanlar'}/>
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
                        {/* __________________ premium vacancies  __________________ */}
                        { latest_jobs['latest'].filter(filtered => filtered['premium'] === true && filtered['category'] === data['category']).length > 0 ? 
                        <div className="vacancies_page_boxes_head">Premium Elanlar</div> : '' 
                        }            
                        <div className="detail_latest_jobs_boxes_container">
                            {
                                Loading ? <p>Loading...</p>:
                                Jobs.filter(filtered =>  filtered._id!==id && filtered['premium'] === true).map((item, index)=>{
                                    return(
                                        <PostBox 
                                        job_id = {item._id}
                                        premium = {item.premium}
                                        image_url={((item.company)?.companyInfo)?.logo}
                                        salary={item.salary}
                                        job_title={item.name}
                                        company_name={(item.company)?.name}
                                        post_views={item.numberOfViews}
                                        post_applies = {item.numberOfApplys}
                                        post_start_date={item.createdAt.includes('T') ? item.createdAt.split('T')[0] : item.createdAt}
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
                        {/* _________________________ normal vacancies ________________________ */}
                        {
                            Loading ? <p>Loading...</p>:
                            Jobs.filter(filtered =>  filtered._id!==id && filtered['premium'] === false && filtered['category'] === data['category']).length > 0  ?
                            <div className="vacancies_page_boxes_head">Elanlar</div> : ''
                        }
                        <div className="detail_latest_jobs_boxes_container">
                            {
                                Loading ? <p>Loading...</p>:
                                Jobs.filter(filtered => filtered._id!==id && filtered['premium'] === false && filtered['category'] === data['category']).map((item, index)=>{
                                    return(
                                        <PostBox 
                                        job_id = {item._id}
                                        premium = {item.premium}
                                        image_url={((item.company)?.companyInfo)?.logo}
                                        salary={item.salary}
                                        job_title={item.name}
                                        company_name={(item.company)?.name}
                                        post_views={item.numberOfViews}
                                        post_applies = {item.numberOfApplys}
                                        post_start_date={item.createdAt.includes('T') ? item.createdAt.split('T')[0] : item.createdAt}
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
                    </div>
                </div>
                :
                <div className="detail_page_not_found">
                    Mövcud Elan Yoxdur !
                </div>
            }
            {checkCv ? <CVCheckerModal job_id={id} open_cv_checker={open_cv_checker} /> : ''}
            {applyWindow ? <ApplyFormDetailP openApplyWindowF={openApplyWindowF} sendNotificationSuccess = {sendNotificationSuccess}/> : null}            
        </div>
    );
}

export default PostDetail;