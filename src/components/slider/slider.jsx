import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './slider.css';
import imgOne from '../../images/slider_img_one.jpg';
import imgTwo from '../../images/slider_img_two.jpg';
import imgThree from '../../images/slider_img_three.png';

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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eius accusamus?
                    </div>
                </div>
                :
                null
            }            
        </div>        
    )
}
export default SliderHome;