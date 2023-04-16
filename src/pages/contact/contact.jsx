import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageHeadText from '../../components/page_head_text/page_head_text';
import './contact.css'
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagram, faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import SubscribeForm from '../../components/subscribe_form/subscribe_form';
function Contact() {
    return ( 
        <div className="contact_page_container">
            {/* page name */}
            <PageHeadText content={'Əlaqə'} />
            <div className="contact_page_slogan">Bizimlə Əlaqə Saxlayın !</div>
            {/* contact means boxes */}
            <div className="contact_page_boxes_container">
                <div className="contact_page_box">
                    <div className="contact_page_box_icon">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </div>                    
                    <div className="contact_page_box_text">
                        <a href="mailto:info@island.az">info@island.az</a>
                    </div>
                </div>
                <div className="contact_page_box">
                    <div className="contact_page_box_icon">
                        <FontAwesomeIcon icon={faPhone} />
                    </div>                    
                    <div className="contact_page_box_text">
                        <a href="tel:+9940775773133">+994-77-577-31-33</a>
                    </div>
                </div>
                <div className="contact_page_box">
                    <div className="contact_page_box_icon">
                        <FontAwesomeIcon icon={faLocationDot} />
                    </div>                    
                    <div className="contact_page_box_text">
                        Suraxanı rayonu, Bağça küçəsi, ev 10.
                    </div>
                </div>
            </div>
            {/* social networks */}
            <div className="contact_page_slogan">Bizi Sosial Şəbəkələrdə İzləyin !</div>
            {/* social icons */}
            <div className="contact_page_social_icons">
                <a href="#" target="_blank">
                    <FontAwesomeIcon icon={faInstagram} className="contact_page_instagram"/>    
                </a>
                <a href="#" target="_blank">
                    <FontAwesomeIcon icon={faFacebookSquare} className="contact_page_facebook" />    
                </a>                            
                <a href="#" target="_blank">
                    <FontAwesomeIcon icon={faLinkedin} className="contact_page_linkedin" />
                </a>                            
                <a href="#" target="_blank">
                    <FontAwesomeIcon icon={faTwitterSquare} className="contact_page_twitter" />
                </a>                            
            </div>  
            {/* contact page form  */}
            <div className="contact_page_form_container">
                {/* form heading */}
                <div className="contact_page_slogan">
                    Bizə Məktub Yazın !
                </div>
                {/* form */}
                <form action="#" className='contact_page_form'>
                    {/* name and surname */}
                    <label htmlFor="nameSurname">
                        Ad və Soyad
                        <input type="text" name='nameSurname'  required/>
                    </label>
                    {/* email */}
                    <label htmlFor="email">
                        E-mail
                        <input type="email" name='email'  required/>
                    </label>
                    {/* phone number */}
                    <label htmlFor="phone">
                        Telefon
                        <input type="number" name='phone'  required/>
                    </label>
                    {/* letter subject */}
                    <label htmlFor="subject">
                        Mövzu
                        <input type="text" name='subject'  required/>
                    </label>
                    {/* letter description */}
                    <label htmlFor="description">
                        Məzmun
                        <textarea name="description" cols="30" rows="5" required></textarea>
                    </label>
                    {/* submit button */}
                    <input type="submit" value="Göndər" className='contact_page_form_submit' />
                </form>
            </div>
            <div className="contact_page_slogan">Yeniliklərdən Xəbərdar Olmaq Üçün Abunə Olun !</div>
            {/* subscribe form */}
            <div className="contact_page_subscribe_form">
                <SubscribeForm />    
            </div>            
        </div>
     );
}

export default Contact;