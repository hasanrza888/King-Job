import PageHeadText from '../../components/page_head_text/page_head_text';
import './about.css';
function About() {
    return ( 
        <div className="about_page_container">
            {/* page head */}
            <PageHeadText content={"Haqqımızda"} />
            {/* information row */}
            <div className="about_page_information">
                <div className="about_page_information_head">Şirkət haqqında:</div>
                <div className="about_page_information_body">
                    <div className="about_page_information_list">
                        <li><strong>Kigjob.com</strong> iş və ya işçi axtaranların onlayn platformasıdır.</li>
                        <li>Kigjob.com 2023-cü ildə fəaliyyətə başlayaraq əmək bazarında ölkənin ən yaxşı iş axtarma platformasına çevrilmişdir.</li>
                    </div>                  
                </div>
            </div>
            {/* information row */}
            <div className="about_page_information">
                <div className="about_page_information_head">Üstünlüklərimiz:</div>
                <div className="about_page_information_body">
                    <div className="about_page_information_list">
                        <li>
                            <strong>Kigjob.com</strong> onlayn platformasında iş elanlarına müraciət etdiyiniz zaman mütləq geri dönüş cavabı alacaqsınız.
                        </li>
                        <li>
                            Saxta elanların olmaması.
                        </li>
                        <li>
                            Vaxtı keçmiş elanların silinməsi.
                        </li>
                    </div>                    
                </div>
            </div>
            {/* information row */}
            <div className="about_page_information">
                <div className="about_page_information_head">Məqsədimiz:</div>
                <div className="about_page_information_body">
                    <div className="about_page_information_list">
                        <li>
                            İşsiz insanların özlərinə ən uyğun işi tapması
                        </li>
                        <li>
                            Şirkətlərin doğru namizədlərini axtarması
                        </li>
                    </div>                    
                </div>
            </div>
        </div>
     );
}
export default About;