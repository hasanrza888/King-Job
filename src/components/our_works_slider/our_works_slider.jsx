import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './our_works_slider.css';
function OurWorksSlider({images}) {
    const works_slider_settings = {
        autoplay: true,
        autoplaySpeed: 2500,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        infinite: true,   
        arrows: false     
    }
    return ( 
        <Slider {...works_slider_settings} className="our_works_slider_container">
            {
                images.map((item, index)=>{
                    return <div className="our_works_slider_image" key={index}>
                            <img src={item} alt="Our works" />
                        </div>
                })
            }
        </Slider>
     );
}

export default OurWorksSlider;