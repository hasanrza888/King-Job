import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './slider.css';
import imgOne from '../../images/slider_img_one.jpg';
import imgTwo from '../../images/slider_img_two.jpg';
import imgThree from '../../images/slider_img_three.png';
import TextTypingAnimation from "../text-typing/text-typing";
import { Link } from "react-router-dom";

function SliderHome({fromHomePage}){
    const slider_settings = {
        autoplay: true,
        autoplaySpeed: 2500,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        infinite: true,   
        arrows: false     
    }
    return(
        <div className="home_slider_container">
            <Slider {...slider_settings} className="home_page_slider">
                <div className="home_slider_image">
                    <img src={imgOne} alt="slider"/>
                </div>
                <div className="home_slider_image">
                    <img src={imgTwo} alt="slider"/>
                </div>
                <div className="home_slider_image">
                    <img src={imgThree} alt="slider"/>
                </div>
            </Slider>
            {
                fromHomePage ? 
                <div className="home_slider_slogan">
                    <div className="home_slider_slogan_text">
                        <TextTypingAnimation text={'Azərbaycanın ən mükəmməl və professional vakansiya saytı'} />
                    </div>
                    <Link to='/contact' className="home_slider_slogan_action_btn">Bizimlə əlaqə</Link>
                </div>
                :
                null
            }            
        </div>        
    )
}
export default SliderHome;