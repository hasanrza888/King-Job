import './home.css';
import SliderHome from '../../components/slider/slider';
import PostBox from '../../components/post_box/post_box';
import NotificationMessage from '../../components/notification_message/notification_message';
import { latest_jobs } from '../../fakeData/latestJobs';
import { useState } from 'react';
function Home() {
    const [successMsg, setSuccessMsg] = useState(false);
    return ( 
        <div className="home_page_container">
            <SliderHome />
            {/* __________ premium jobs ____________________ */}
            <div className="latest_jobs_container">
                <div className="latest_jobs_heading">
                    Premium Elanlar
                </div>
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
                                />
                            )
                        })
                    }
                </div>
            </div> 
            {/* __________ latest jobs container ___________ */}
            <div className="latest_jobs_container">
                <div className="latest_jobs_heading">
                    Ən Son Elanlar
                </div>
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
                                />
                            )
                        })
                    }
                </div>
            </div>         
            {successMsg ? <NotificationMessage setSuccessMsg = {setSuccessMsg} /> : null}
        </div>
     );
}
export default Home;