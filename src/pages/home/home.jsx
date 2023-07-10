import './home.css';
import SliderHome from '../../components/slider/slider';
import PostBox from '../../components/post_box/post_box';
import NotificationMessage from '../../components/notification_message/notification_message';
import { latest_jobs } from '../../fakeData/latestJobs';
import { useState } from 'react';
import PageHeadText from '../../components/page_head_text/page_head_text';
function Home() {
    const [successMsg, setSuccessMsg] = useState(false);
    const [savedJob, setSavedJob] = useState('');
    const notification_message_content = <div>"{savedJob}" adlı vakansiya şəxsi hesabınızda <strong><u>sevimlilər</u></strong> bölməsinə əlavə olundu.</div>;
    return ( 
        <div className="home_page_container">
            <SliderHome fromHomePage = {true}/>
            {/* __________ premium jobs ____________________ */}
            <div className="latest_jobs_container">
                <PageHeadText content={'Premium Elanlar'}/>                
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
            {/* __________ latest jobs container ___________ */}
            <div className="latest_jobs_container">
            <PageHeadText content={'Ən Son Elanlar'}/>   
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
        </div>
     );
}
export default Home;