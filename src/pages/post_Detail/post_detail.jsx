import { useEffect, useState } from "react";
import './post_detail.css';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, Link } from "react-router-dom";
import { latest_jobs } from "../../fakeData/latestJobs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHourglassEnd, faHourglassStart, faTag } from "@fortawesome/free-solid-svg-icons";
import PageHeadText from "../../components/page_head_text/page_head_text";
import PostBox from "../../components/post_box/post_box";
import NotificationMessage from "../../components/notification_message/notification_message";
import PostBoxSaveBtn from "../../components/post_box_save_btn/post_box_save_btn";
import ApplyFormDetailP from "../../components/apply_form_detailPage/apply_form_detailP";
import { ToastContainer, toast } from "react-toastify";
function PostDetail() {
    const {id} = useParams();
    const [data, setData] = useState(null);
    useEffect(()=>{
        setData(latest_jobs['latest'].find((item)=> item['job_id'] === Number(id) ? item : null));
    },[id]);
    const [successMsg, setSuccessMsg] = useState(false);
    const [savedJob, setSavedJob] = useState('');
    const notification_message_content = <div>"{savedJob}" adlı vakansiya şəxsi hesabınızda <strong><u>sevimlilər</u></strong> bölməsinə əlavə olundu.</div>;
    const [applyWindow, setApplyWindow] = useState(false);
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
            theme: "colored",
        });
    }
    return ( 
        <div className="detail_page">
            {
                data ?
                <div className="detail_page_container">
                    {/* detail page job header */}
                    <div className="detail_page_job_header">
                        {/* job title and vacancy buttons */}
                        <div className="detail_page_job_title_and_btns">
                            {/* job title */}
                            <div className="detail_page_vacancy_name">{data['job_title']}</div>
                            {/* vacancy base informations and save button */}
                            <div className="detail_page_vacancy_buttons_container">
                                {/* job applies number */}
                                <div className="detail_page_vacancy_button detail_page_vacancy_button_desktop">
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                    {data['post_applies']}
                                </div>
                                {/* job views number */}
                                <div className="detail_page_vacancy_button detail_page_vacancy_button_desktop">
                                    <FontAwesomeIcon icon={faEye} />
                                    {data['post_views']}
                                </div>
                                {/* job save button */}
                                <div className="detail_page_vacancy_save_button" title="Vakansiyanı yadda saxla">
                                    <PostBoxSaveBtn job_id = {data['job_id']} setSuccessMsg = {setSuccessMsg} setSavedJob={setSavedJob} job_title={data['job_title']}/>                                 
                                </div>
                            </div>
                        </div>
                        {/* company */}
                        <div className="detail_page_company">
                            {/* company logo */}
                            <div className="detail_page_company_logo">
                                <img src={`${data['image_url']}`} alt="company logo"/>
                            </div>
                            {/* company name */}
                            <div className="detail_page_company_name">{data['company_name']}</div>
                        </div>                                                    
                        {/* dates, salary and apply button */}
                        <div className="detail_page_dates_and_salary">
                            {/* vacancy dates container */}
                            <div className="detail_page_mobile_btns_dates">                                
                                <div className="detail_page_dates_container">
                                    {/* vacancy start date */}
                                    <div className="detail_page_date">
                                        <FontAwesomeIcon icon={faHourglassStart} />
                                        {data['post_start_date']}
                                    </div>
                                    {/* vacancy end date */}
                                    <div className="detail_page_date">
                                        <FontAwesomeIcon icon={faHourglassEnd} />
                                        {data['post_end_date']}
                                    </div>
                                </div>
                                {/* mobile post views and apply numbers */}
                                <div className="detail_page_vacancy_buttons_container detail_page_vacancy_buttons_mobile">
                                    {/* job applies number */}
                                    <div className="detail_page_vacancy_button">
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                        {data['post_applies']}
                                    </div>
                                    {/* job views number */}
                                    <div className="detail_page_vacancy_button">
                                        <FontAwesomeIcon icon={faEye} />
                                        {data['post_views']}
                                    </div>                                
                                </div>
                            </div>
                            {/* salary and apply button container */}
                            <div className="detail_page_salary_and_apply_btn">
                                {/* salary  */}
                                <div className="detail_page_salary">{data['salary']} AZN</div>
                                {/* apply button */}
                                <button onClick={openApplyWindowF} className="detail_page_apply_btn">Müraciət Et</button>
                            </div>
                        </div>
                    </div>
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
                                        <p className="vacancy_description_list_par">{data['location']}</p>
                                    </li>
                                    {/* category */}
                                    <li className="vacancy_description_body_list_item">
                                        <p className="vacancy_description_list_par">Kateqoriya</p>
                                        <p className="vacancy_description_list_par">{data['category']} / {data['sub_category']}</p>
                                    </li>
                                    {/* job time type */}
                                    <li className="vacancy_description_body_list_item">
                                        <p className="vacancy_description_list_par">İş qrafiki</p>
                                        <p className="vacancy_description_list_par">{data['job_time_type']}</p>
                                    </li>
                                    {/* job experience */}
                                    <li className="vacancy_description_body_list_item">
                                        <p className="vacancy_description_list_par">Təcrübə</p>
                                        <p className="vacancy_description_list_par">{data['job_experience']}</p>
                                    </li>
                                    {/* education */}
                                    <li className="vacancy_description_body_list_item">
                                        <p className="vacancy_description_list_par">Təhsil</p>
                                        <p className="vacancy_description_list_par">{data['education']}</p>
                                    </li>
                                    {/* age */}
                                    <li className="vacancy_description_body_list_item">
                                        <p className="vacancy_description_list_par">Yaş</p>
                                        <p className="vacancy_description_list_par">{data['age']}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* vacancy details =>>> vakansiya təsviri */}
                        <div className="detail_page_vacancy_description detail_page_vacancy_description_half">
                            {/* description heading */}
                            <div className="detail_page_vacancy_description_head">Vakansiya Təsviri</div>
                            {/* description body */}
                            <div className="detail_page_vacancy_description_body">{data['job_description']}</div>
                        </div>
                        {/* vacancy details =>>> xüsusi tələblər */}
                        <div className="detail_page_vacancy_description">
                            {/* description heading */}
                            <div className="detail_page_vacancy_description_head">Xüsusi Tələblər</div>
                            {/* description body */}
                            <div className="detail_page_vacancy_description_body">
                                <ul className="detail_page_vacancy_special_req_list">
                                    {
                                        data['special_requirements'].map((item, index)=>{
                                            return <li key={index}>{item}</li>
                                        })
                                    }
                                </ul>
                            </div>
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
                                                        <Link to={`/${item}`}>
                                                            <FontAwesomeIcon icon={faTag} />{item}
                                                        </Link>
                                                    </li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        {/* second apply button */}
                        <button onClick={openApplyWindowF} className="detail_page_vacancy_second_apply_btn">Müraciət Et</button>
                    </div>
                </div>
                :
                <div className="detail_page_not_found">
                    Mövcud Elan Yoxdur !
                </div>
            }
            {/* relevant vacancies */}
            <div className="detail_page_relevant_vacancies">
                <PageHeadText content={'Əlaqədar Elanlar'}/>                
                <div className="latest_jobs_boxes_container">
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
            {successMsg ? <NotificationMessage setSuccessMsg = {setSuccessMsg} notification_message_content = {notification_message_content} /> : null}
            {applyWindow ? <ApplyFormDetailP openApplyWindowF={openApplyWindowF} setSuccessMsg = {setSuccessMsg} successMsg={successMsg} sendNotificationSuccess = {sendNotificationSuccess}/> : null}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}

export default PostDetail;