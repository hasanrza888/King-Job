import './about.css';
function About() {
    return ( 
        <div className="about_page_container">
            {/* page head */}
            <div className="about_page_head">Haqqımızda</div>
            {/* information row */}
            <div className="about_page_information">
                <div className="about_page_information_head"><strong>Şirkət haqqında:</strong></div>
                <div className="about_page_information_body">
                    <div className="about_page_information_list">
                        <li><strong>İŞland.az</strong> iş və ya işçi axtaranların onlayn platformasıdır.</li>
                        <li>İŞland.az 2023-cü ildə fəaliyyətə başlayaraq əmək bazarında ölkənin ən yaxşı iş axtarma platformasına çevrilmişdir.</li>
                    </div>                  
                </div>
            </div>
            {/* information row */}
            <div className="about_page_information">
                <div className="about_page_information_head"><strong>Üstünlüklərimiz:</strong></div>
                <div className="about_page_information_body">
                    <div className="about_page_information_list">
                        <li>
                            <strong>İŞland.az</strong> onlayn platformasında iş elanlarına müraciət etdiyiniz zaman mütləq geri dönüş cavabı alacaqsınız.
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
                <div className="about_page_information_head"><strong>Məqsədimiz:</strong></div>
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