import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CV_checker_modal.css';
import { faRotate, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { analyzcv } from '../../apiservices';
import { useSelector } from 'react-redux';
function CVCheckerModal({open_cv_checker,job_id}) {
    const {user,isLoggedIn} = useSelector(state=>state.user);
    const [loadingMessages, setLoadingMessages] = useState(true);
    const containerRef = useRef(null);
    const [message, setMessage] = useState('');
    const [text, setText] = useState("")
    // closes modal
    useEffect(()=>{
        const ftchres = async () => {
            setLoadingMessages(true)
            try {
                const {data} = await analyzcv({userId:user?._id,jobId:job_id});
                console.log(data)
                setLoadingMessages(false)
                // setText(data.text)
                if(data.succes){
                    setText(data.text)
                }
                else{
                    setText(data.message)
                }
            } catch (error) {
                setLoadingMessages(false)
                console.log("error at fetchin result from api for cv check,error:",error.name)
            }
        }
        ftchres()

    },[job_id,user?._id])
    const close_modal = (e)=>{
        if(e.target.className === 'CV_checker_modal_container'){
            open_cv_checker();
        }
    }
    const typingSpeed = 50; // Adjust the typing speed as needed
    useEffect(() => {
        const typeText = () => {
            if (text.length > message.length && loadingMessages === false) {
                setMessage(text.substring(0, message.length + 1));
            } else {
                clearInterval(typingInterval);
            }
        };
        const typingInterval = setInterval(typeText, typingSpeed);

        return () => {
            clearInterval(typingInterval);
        };
    }, [text, message, loadingMessages]);
    useEffect(() => {
        // Scroll to the end of the container when text updates
        if(loadingMessages === false){
            containerRef.current.scrollTop = containerRef.current.scrollHeight;    
        }
    }, [message]);
    // useEffect(()=>{
    //     const loadData = ()=>{
    //         setLoadingMessages(false);
    //     }
    //     setTimeout(loadData, 3000)
    //     return ()=>{
    //         clearTimeout(loadData);
    //     }
    // }, [])
    return ( 
        <div className="CV_checker_modal_container" onClick={close_modal}>
            <div className="CV_checker_modal">
                {/* modal heading */}
                <div className="CV_checker_modal_info">
                    CV üçün düzəlişlər aşağıda əks olunur
                </div>
                {
                    loadingMessages ?
                    <div className="CV_checker_modal_loading">
                        CV-niz yoxlanılır bu 50-60 saniyə vaxt ala bilər.
                        <FontAwesomeIcon className='CV_checker_modal_loading_rotate' icon={faSpinner} />
                    </div>
                    :
                    <div className="CV_checker_modal_body" ref={containerRef}>
                        {/* modal body */}
                        {/* current message */}
                        <div className="CV_checker_modal_message_box CV_checker_modal_new_message">
                            <Link to="/vacancies/10" className='CV_checker_modal_message_box_link' title='Vakansiya Linki'>Əlaqədar vakansiya linki</Link>
                            <div className="CV_checker_modal_message_box_text">
                            {
                                message
                            }
                            </div>
                        </div>
                    </div>
                }
                <div className="CV_checker_modal_footer">
                    <div className="CV_checker_modal_footer_info">
                        Cavablar Profilinizdə <Link to="user_profile/cv_checkings">CV yoxlanışları</Link> hissəsində saxlanılır
                    </div>
                    <div className="CV_checker_modal_footer_close_btn" onClick={open_cv_checker}>Bağla</div>
                </div>
            </div>
        </div>
     );
}

export default CVCheckerModal;
