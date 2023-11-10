import './home.css';
import { useState } from 'react';
import SliderHome from '../../components/slider/slider';
import { Link } from 'react-router-dom';
import OurWorksSlider from '../../components/our_works_slider/our_works_slider';
import first_apply_first from "../../images/first_apply_first.png";
import first_apply_second from "../../images/first_apply_second.png";
import first_apply_third from "../../images/first_apply_third.png";
import first_apply_fourth from "../../images/first_apply_fourth.png";
import confirm_notification from "../../images/confirm_notification.png";
import user_tasks from "../../images/user_tasks.jpg";
import fillyourprofilefull from "../../images/fillyourprofilefull.jpg";
import mockup from "../../images/smartmockups_ln33e9pp.jpg";
import online_interview from "../../images/online_interview.jpg";
import ofline_interview from "../../images/ofline_interview.jpg";
import OurWorksPromotions from '../../components/our_works_promotions/our_works_promotions';
import king_job_video from '../../videos/king_job_video.mp4';
import { useSelector } from 'react-redux';
function Home() {
    const {user,isLoggedIn} = useSelector(state=>state.user);
    
    return ( 
        <div className="home_page_container">
            
            <SliderHome fromHomePage = {true}/>
            {/* company => what we do boxes*/}
            <div className="home_page_what_do_container">
                {/* first apply box container */}
                <OurWorksPromotions 
                    key="kingjob"
                    box_head="King Job" 
                    box_desc="King Job, iş axtarış prosesinizi sürətləndirəcək bir tətbiqdir. Biz iş təcrübəsinin və karyera hədəflərinin ən yaxşı şəkildə təqdim edilməsini təmin etmək üçün buradayıq. İş axtaranlar və işəgötürən şirkətlər üçün inkişaf etmiş və rahat bir platforma təqdim edirik."
                    action_button_text = 'İş axtaran'
                    action_link='/vacancies'
                    sec_action_button_text = 'İşə götürən'
                    sec_action_link = '/company_profile/dashboard'
                    slider_images = {[]}
                    one_image={mockup}
                />
                {/* fill profile  box container */}
                {/* <OurWorksPromotions 
                    key="fill_profile"
                    box_head="Profili doldurmaq" 
                    box_desc={<div>Profilinizin Gücü<br />
                    Sizin yolculuğunuz King Job profili yaratmaq ilə başlayır. Onu özünüzün bir dijital pasportunuz kimi təsəvvür edin.<br />
                    ✨ Ətraflı Məlumatlar: Profilinizi iş təcrübəniz və təhsilinizdən sertifikatlarınıza, nailiyyətlərinizdən karyera məqsədlərinizə qədər önəmli detallarla doldurun. Profiliniz bacarıqlarınızı və nailiyyətlərinizi göstərmək üçün əsas vasitə hesab olunur.
                    <br />
                    📜 CV Yükləyin: CV-nizi yükləyin. Bu, karyera tarixinizin bir             sənətidir və işəgötürənlər onu asanlıqla gözdən keçirə bilərlər.
                    <br />
                    ✉️ Niyyət Məktubu Hazırlayın: Fərqlənmək üçün şəxsi qapaq məktubu hazırlayın. Potensial işəgötürənlərə özünüzü onların komandasına uyğun olan səbəbləri ilə bildirin.
                    <br />
                    🌐 Sosial və Karyera Platformlarınızı əlavə edin: Sosial və karyera profilinizi əlavə edin ki,özünüzün professional yolunun ətraflı baxışını təqdim edəsiniz. Bu profilinizi dərinlikləndirir və  işəgötürənlər ilə etibar qurur.
                    <br />
                    📸 Profil Şəkli: Profesional profil şəkli ilə şəxsiyyətinizi parlaq şəkildə təqdim edin. Bu ilk təsirinizdir və böyük bir şəkil əbədi təsir yarada bilər.</div>}
                    action_button_text = 'Profilim'
                    action_link={'/user_profile'}
                    slider_images = {[]}
                    one_image={fillyourprofilefull}
                /> */}
                {/* first apply box container */}
                <OurWorksPromotions 
                    key="first_apply"
                    box_head="İlkin müraciət !" 
                    box_desc="Arzuladığınız işi vakansiyalar səhifəsində axtararaq, asanlıqla müraciət edə bilərsiniz."
                    action_button_text = 'Müraciət Et'
                    action_link='/vacancies'
                    slider_images = {[first_apply_first, first_apply_second, first_apply_third, first_apply_fourth]}
                />
                {/* ai cv checker */}
                <OurWorksPromotions 
                    key="cv_checker"
                    box_head="Süni İntellekt bot-u ilə CV yoxlanması !" 
                    box_desc= <div>İş axtaranların ən böyük problemlərindən biri CV-lərini doğru şəkildə tərtib etməkdir.Süni intellekt bot-u burada köməkçinizdir. CV-nizi yoxladıqdan sonra sizə köməkçi məsləhətlər verir, doğru formada məlumatlarınızı düzəltməyinizə kömək edir və vakansiya tələblərinə uyğunluğunu qiymətləndirir. Bot sizi iş axtarışında müvəffəqiyyətləri artırmaq üçün ən yaxşı təlimatları təqdim edir. <b>Həmin təlimatları izləyərək CV-nizi təkmilləşdirin və vakansiya təkliflərinə daha yaxın olun.</b></div>
                    action_button_text = 'Müraciət Et'
                    action_link='/vacancies'
                    slider_images = {[]}
                    video = {king_job_video}
                />
                {/* confirm notification box container */}
                <OurWorksPromotions 
                    key="confirm_notification"
                    box_head="Qəbul bildirişi !" 
                    box_desc="Müraciət etdiyiniz vakansiyalardan cavab gələrsə profilinizdə bildiriş əldə edirsiniz."
                    action_button_text = 'Müraciət Et'
                    action_link='/vacancies'
                    one_image={confirm_notification}
                    slider_images = {[]}
                />
                {/* company task box container */}
                <OurWorksPromotions 
                    key="online_tasks"
                    box_head="Onlayn tapşırıqlar !" 
                    box_desc="İlkin təsdiq bildirişi aldıqdan sonra şirkətin seçiminə əsasən onlayn tapşırıqlar həll edə bilərsiniz."
                    action_button_text = 'Müraciət Et'
                    action_link='/vacancies'
                    one_image={user_tasks}
                    slider_images = {[]}
                />
                {/* online or ofline interview box container */}
                <OurWorksPromotions 
                    key="interview"
                    box_head="Müsahibə mərhələsi !" 
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