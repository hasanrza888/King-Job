import './home.css';
import SliderHome from '../../components/slider/slider';
import { Link } from 'react-router-dom';
import OurWorksSlider from '../../components/our_works_slider/our_works_slider';
// import PostBox from '../../components/post_box/post_box';
// import { latest_jobs } from '../../fakeData/latestJobs';
// import PageHeadText from '../../components/page_head_text/page_head_text';
import first_apply_first from "../../images/first_apply_first.png";
import first_apply_second from "../../images/first_apply_second.png";
import first_apply_third from "../../images/first_apply_third.png";
import first_apply_fourth from "../../images/first_apply_fourth.png";
import confirm_notification from "../../images/confirm_notification.png";
import user_tasks from "../../images/user_tasks.jpg";
import online_interview from "../../images/online_interview.jpg";
import ofline_interview from "../../images/ofline_interview.jpg";
function Home() {
    return ( 
        <div className="home_page_container">
            <SliderHome fromHomePage = {true}/>
            {/* company => what we do boxes*/}
            <div className="home_page_what_do_container">
                {/* first apply box container */}
                <div className="home_page_what_do_box">
                    <div className="home_page_what_do_box_head">İlkin müraciət</div>
                    {/* text and action button */}
                    <div className="home_page_what_do_box_text_and_slider">
                        <div className="home_page_what_do_box_text_and_btn">
                            {/* text */}
                            <div className="home_page_what_do_box_text">
                                Arzuladığınız işi vakansiyalar səhifəsində axtararaq, asanlıqla müraciət edə bilərsiniz.
                            </div>
                            {/* action button */}
                            <Link to='/vacancies' className='home_page_what_do_box_action_btn'>Müraciət Et</Link>
                        </div>
                        {/* slider */}
                        <div className="home_page_what_do_box_slider_container">
                            <OurWorksSlider images={[first_apply_first, first_apply_second, first_apply_third, first_apply_fourth]} />
                        </div>
                    </div>
                </div>
                {/* confirm notification box container */}
                <div className="home_page_what_do_box">
                    <div className="home_page_what_do_box_head">Qəbul bildirişi</div>
                    {/* text and action button */}
                    <div className="home_page_what_do_box_text_and_slider">
                       <div className="home_page_what_do_box_text_and_btn">
                            {/* text */}
                            <div className="home_page_what_do_box_text">
                                Müraciət etdiyiniz vakansiyalardan cavab gələrsə profilinizdə bildiriş əldə edirsiniz.
                            </div>
                            {/* action button */}
                            <Link to='/vacancies' className='home_page_what_do_box_action_btn'>Müraciət Et</Link>
                        </div>
                        {/* slider */}
                        <div className="home_page_what_do_box_slider_container">
                            {/* <OurWorksSlider images={[]} /> */}
                            <img src={confirm_notification} alt="notification" />
                        </div> 
                    </div>
                </div>
                {/* company task box container */}
                <div className="home_page_what_do_box">
                    <div className="home_page_what_do_box_head">Onlayn tapşırıqlar</div>
                    {/* text and action button */}
                    <div className="home_page_what_do_box_text_and_slider">
                        <div className="home_page_what_do_box_text_and_btn">
                            {/* text */}
                            <div className="home_page_what_do_box_text">
                                İlkin təsdiq bildirişi aldıqdan sonra şirkətin seçiminə əsasən onlayn tapşırıqlar həll edə bilərsiniz. 
                            </div>
                            {/* action button */}
                            <Link to='/vacancies' className='home_page_what_do_box_action_btn'>Müraciət Et</Link>
                        </div>
                        {/* slider */}
                        <div className="home_page_what_do_box_slider_container">
                            {/* <OurWorksSlider images={[]} /> */}
                            <img src={user_tasks} alt="User solves task" />
                        </div>
                    </div>
                </div>
                {/* online or ofline interview box container */}
                <div className="home_page_what_do_box">
                    <div className="home_page_what_do_box_head">Müsahibə mərhələsi</div>
                    <div className="home_page_what_do_box_text_and_slider">
                        {/* text and action button */}
                        <div className="home_page_what_do_box_text_and_btn">
                            {/* text */}
                            <div className="home_page_what_do_box_text">
                                İlkin təsdiq bildirişi aldıqdan sonra şirkətin seçiminə əsasən oflayn və ya platformamız üzərindən onlayn müsahibəyə dəvət alırsınız.
                            </div>
                            {/* action button */}
                            <Link to='/vacancies' className='home_page_what_do_box_action_btn'>Müraciət Et</Link>
                        </div>
                        {/* slider */}
                        <div className="home_page_what_do_box_slider_container">
                            <OurWorksSlider images={[online_interview, ofline_interview]} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
export default Home;