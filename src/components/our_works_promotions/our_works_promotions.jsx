import { Link } from 'react-router-dom';
import OurWorksSlider from '../our_works_slider/our_works_slider';
import './our_works_promotions.css';
function OurWorksPromotions({box_head, box_desc, action_button_text, action_link, slider_images, one_image,sec_action_button_text,sec_action_link, video}) {
    return ( 
        <div className="our_works_promotions_container">
            <div className="home_page_what_do_box_head">{box_head}</div>
            {/* text and action button */}
            <div className="home_page_what_do_box_text_and_slider">
                <div className="home_page_what_do_box_text_and_btn">
                    {/* text */}
                    
                    <div className="home_page_what_do_box_text">{box_desc}</div>
                    {/* action button */}
                    {!sec_action_button_text && !sec_action_link && action_button_text && action_link && <Link to={action_link} className='home_page_what_do_box_action_btn'>{action_button_text}</Link>}
                    {sec_action_button_text && sec_action_link && <div className="home_page_what_do_box_buttons">
                    <Link to={action_link} className='home_page_what_do_box_action_btn_inside'>{action_button_text}</Link>
                    <Link to={sec_action_link} className='home_page_what_do_box_action_btn_inside'>{sec_action_button_text}</Link>
                    </div>}
                </div>
                {/* slider */}
                <div className="home_page_what_do_box_slider_container">
                    {
                        slider_images.length > 0 ? 
                        <OurWorksSlider images={slider_images} /> 
                        :
                        video ? 
                        <video width="100%" loop autoPlay muted>
                            <source src={video} type="video/mp4" />
                        </video>
                        :
                        <img src={one_image} alt="Our Works image"/>
                    }
                </div>
            </div>
        </div>
     );
}

export default OurWorksPromotions;