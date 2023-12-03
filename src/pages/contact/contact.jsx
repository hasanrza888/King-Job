import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageHeadText from '../../components/page_head_text/page_head_text';
import './contact.css'
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagram, faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import SubscribeForm from '../../components/subscribe_form/subscribe_form';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { email_checker } from '../../components/email_checker/email_checker';
import { toast } from 'react-toastify';
import PageTitle from '../../components/page_title_maker/page_title';
function Contact() {
    const [sendingdata, setSendingData] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        errorCheck: false,
        errorContent : ''
    });
    const [formInfo, setFormInfo] = useState({
        nameSurname: '',
        email: '',
        phone: null,
        subject: '',
        description: ''
    })
    const formDataChangeFunc = (e)=>{
        formInfo[e.target.name] = e.target.value;
        setFormInfo({...formInfo})
    }
    const contact_form_handle = (e)=>{
        e.preventDefault()
        if(formInfo.nameSurname && formInfo.email && formInfo.phone && formInfo.subject && formInfo.description && email_checker(formInfo.email)){
            setSendingData(true);
            setErrorMessage({...errorMessage, errorCheck: false, errorContent: ''});
            toast.success('Məktubunuz uğurla göndərildi ! Tezliklə cavablandıracayıq.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }else if(!email_checker(formInfo.email)){
            setErrorMessage({...errorMessage, errorCheck: true, errorContent: 'Email sintaksisi səhvdir!'});
        }
    }
    useEffect(()=>{
        PageTitle('Əlaqə');
    },[])
    return ( 
        <div className="contact_page_container">
            {/* page name */}
            <PageHeadText content={'Əlaqə'} />
            <div className="contact_page_slogan">Bizimlə Əlaqə Saxlayın !</div>
            {/* contact means boxes */}
            <div className="contact_page_boxes_container">
                <Link to="mailto:info@kingjob.pro" className="contact_page_box">
                    <div className="contact_page_box_icon">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </div>                    
                    <div className="contact_page_box_text">
                        info@kingjob.pro
                    </div>
                </Link>
                <Link to="tel:+9940775773133" className="contact_page_box">
                    <div className="contact_page_box_icon">
                        <FontAwesomeIcon icon={faPhone} />
                    </div>                    
                    <div className="contact_page_box_text">
                        +994-77-577-31-33
                    </div>
                </Link>
                <Link to={'https://goo.gl/maps/pmDx6AS7wzTgqhA48'} className="contact_page_box">
                    <div className="contact_page_box_icon">
                        <FontAwesomeIcon icon={faLocationDot} />
                    </div>                    
                    <div className="contact_page_box_text">
                        Suraxanı rayonu, Bağça küçəsi, ev 10.
                    </div>
                </Link>
            </div>
            <div className="contact_page_map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d512.6125278886502!2d50.08737083718522!3d40.38494957811747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x403066630c235b35%3A0xb86f0de275ed2af!2sSurakhani%2C%20Hovsan!5e1!3m2!1sen!2saz!4v1692276461516!5m2!1sen!2saz" width="600" height="450" style={{border:0}} loading="lazy"></iframe>
            </div>
            {/* social networks */}
            <div className="contact_page_slogan">Bizi Linkedin-də İzləyin !</div>
            {/* social icons */}
            <div className="contact_page_social_icons">
                {/* <Link to="#" target="_blank">
                    <FontAwesomeIcon icon={faInstagram} className="contact_page_instagram"/>    
                </Link>
                <Link to="#" target="_blank">
                    <FontAwesomeIcon icon={faFacebookSquare} className="contact_page_facebook" />    
                </Link>                             */}
                <Link to="https://az.linkedin.com/company/king-job?trk=public_post_main-feed-card_reshare_feed-actor-name" target="_blank">
                    <FontAwesomeIcon icon={faLinkedin} className="contact_page_linkedin" />
                </Link>                            
                {/* <Link to="#" target="_blank">
                    <FontAwesomeIcon icon={faTwitterSquare} className="contact_page_twitter" />
                </Link>                             */}
            </div>  
            {/* contact page form  */}
            <div className="contact_page_form_container">
                {/* form heading */}
                <div className="contact_page_slogan">
                    Bizə Məktub Yazın !
                </div>
                {/* form */}
                <form action="#" className='contact_page_form' onSubmit={contact_form_handle}>
                    {/* name and surname */}
                    <div className="contact_page_form_label_input">
                        <label htmlFor="nameSurname">
                            Ad və Soyad
                        </label>
                        <input type="text" name='nameSurname' onChange={(e)=> formDataChangeFunc(e)} required/>
                    </div>
                    {/* email */}
                    <div className="contact_page_form_label_input">
                        <label htmlFor="email">
                            E-mail
                        </label>
                        <input type="email" name='email' onChange={(e)=> formDataChangeFunc(e)} required/>
                    </div>
                    {/* phone number */}
                    <div className="contact_page_form_label_input">
                        <label htmlFor="phone">
                            Telefon
                        </label>    
                        <input type="number" name='phone' onChange={(e)=> formDataChangeFunc(e)} required/>
                    </div>
                    {/* letter subject */}
                    <div className="contact_page_form_label_input">
                        <label htmlFor="subject">
                            Mövzu
                        </label>
                        <input type="text" name='subject' onChange={(e)=> formDataChangeFunc(e)} required/>
                    </div>
                    {/* letter description */}
                    <div className="contact_page_form_label_input">
                        <label htmlFor="description">
                            Məzmun
                        </label>
                        <textarea name="description" cols="30" rows="5" onChange={(e)=> formDataChangeFunc(e)} required></textarea>
                    </div>
                    {
                        errorMessage.errorCheck ? <div className="contact_form_error_message">{errorMessage.errorContent}</div> : ''
                    }
                    {/* submit button */}
                    <div className="contact_page_form_submit_container">
                        <input type="submit" value="Göndər" className='contact_page_form_submit' />
                        {
                            sendingdata ? <div className="send_data_submit_btn_loader"></div> : ''
                        }
                    </div>
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