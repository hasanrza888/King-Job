import { Link } from 'react-router-dom';
import OurWorksSlider from '../our_works_slider/our_works_slider';
import './our_works_promotions.css';
function OurWorksPromotions({box_head, box_desc, action_button_text, action_link, slider_images, one_image}) {
    return ( 
        <div className="our_works_promotions_container">
            <div className="home_page_what_do_box_head">{box_head}</div>
            {/* text and action button */}
            <div className="home_page_what_do_box_text_and_slider">
                <div className="home_page_what_do_box_text_and_btn">
                    {/* text */}
                    <div className="home_page_what_do_box_text">{box_desc}</div>
                    {/* action button */}
                    <Link to={action_link} className='home_page_what_do_box_action_btn'>{action_button_text}</Link>
                </div>
                {/* slider */}
                <div className="home_page_what_do_box_slider_container">
                    {
                        slider_images.length > 0 ? <OurWorksSlider images={slider_images} /> : <img src={one_image} alt="Our Works image"/>
                    }
                    
                </div>
            </div>
        </div>
     );
}

export default OurWorksPromotions;