import './home.css';
import SliderHome from '../../components/slider/slider';
import { Link } from 'react-router-dom';
import OurWorksSlider from '../../components/our_works_slider/our_works_slider';
import first_apply_first from "../../images/first_apply_first.png";
import first_apply_second from "../../images/first_apply_second.png";
import first_apply_third from "../../images/first_apply_third.png";
import first_apply_fourth from "../../images/first_apply_fourth.png";
import confirm_notification from "../../images/confirm_notification.png";
import user_tasks from "../../images/user_tasks.jpg";
import online_interview from "../../images/online_interview.jpg";
import ofline_interview from "../../images/ofline_interview.jpg";
import OurWorksPromotions from '../../components/our_works_promotions/our_works_promotions';
function Home() {
    return ( 
        <div className="home_page_container">
            <SliderHome fromHomePage = {true}/>
            {/* company => what we do boxes*/}
            <div className="home_page_what_do_container">
                {/* first apply box container */}
                <OurWorksPromotions 
                    key="first_apply"
                    box_head="İlkin müraciət" 
                    box_desc="Arzuladığınız işi vakansiyalar səhifəsində axtararaq, asanlıqla müraciət edə bilərsiniz."
                    action_button_text = 'Müraciət Et'
                    action_link='/vacancies'
                    slider_images = {[first_apply_first, first_apply_second, first_apply_third, first_apply_fourth]}
                />
                {/* confirm notification box container */}
                <OurWorksPromotions 
                    key="confirm_notification"
                    box_head="Qəbul bildirişi" 
                    box_desc="Müraciət etdiyiniz vakansiyalardan cavab gələrsə profilinizdə bildiriş əldə edirsiniz."
                    action_button_text = 'Müraciət Et'
                    action_link='/vacancies'
                    one_image={confirm_notification}
                    slider_images = {[]}
                />
                {/* company task box container */}
                <OurWorksPromotions 
                    key="online_tasks"
                    box_head="Onlayn tapşırıqlar" 
                    box_desc="İlkin təsdiq bildirişi aldıqdan sonra şirkətin seçiminə əsasən onlayn tapşırıqlar həll edə bilərsiniz."
                    action_button_text = 'Müraciət Et'
                    action_link='/vacancies'
                    one_image={user_tasks}
                    slider_images = {[]}
                />
                {/* online or ofline interview box container */}
                <OurWorksPromotions 
                    key="interview"
                    box_head="Müsahibə mərhələsi" 
                    box_desc="İlkin təsdiq bildirişi aldıqdan sonra şirkətin seçiminə əsasən oflayn və ya platformamız üzərindən onlayn müsahibəyə dəvət alırsınız."
                    action_button_text = 'Müraciət Et'
                    action_link='/vacancies'
                    slider_images = {[online_interview, ofline_interview]}
                />
            </div>
        </div>
     );
}
export default Home;