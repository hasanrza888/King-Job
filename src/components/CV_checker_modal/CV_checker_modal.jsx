import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CV_checker_modal.css';
import { faRotate, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
function CVCheckerModal({open_cv_checker}) {
    const [loadingMessages, setLoadingMessages] = useState(false);
    const containerRef = useRef(null);
    const [message, setMessage] = useState(<TypeAnimation
        sequence={[
            "The CV matches the job description and requirements well. However, there are a few areas where the CV may need improvement to increase its chances of being accepted by the recruiter.First, the CV could provide more details on the candidate's work experience, specifically in the area of web development. The CV only provides a brief overview of the candidate's work experience, and does not provide any details on the projects the candidate has worked on or the skills they have developed.Second, the CV does not mention any specific results the candidate has achieved in their previous roles. It would be helpful for the recruiter to know what the candidate has accomplished in their previous roles, in order to get a better sense of their skills and abilities.Third, the CV could provide more detail on the candidate's education, specifically in the area of mathematics. The CV only provides a brief overview of the candidate's education, and does not provide any details on the specific courses the candidate has taken or the skills they have developed.Fourth, the CV could provide more detail on the candidate's skills. The CV only provides a brief overview of the candidate's skills, and does not provide any details on the specific skills the candidate has developed or the level of experience they have with each skill.Suggestions and improvements: The CV should provide more details on the candidate's work experience, specifically in the area of web development. The CV should provide more.",
            400,
        ]}
        speed={50}
        repeat={0}
        cursor={false}
    />)
    // closes modal
    const close_modal = (e)=>{
        if(e.target.className === 'CV_checker_modal_container'){
            open_cv_checker();
        }
    }
    useEffect(()=>{
        // setMessage(TextTypingAnimation());
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    },[message])
    const TextTypingAnimation = (text)=>{
        return ( 
            <TypeAnimation
                sequence={[
                    "The CV matches the job description and requirements well. However, there are a few areas where the CV may need improvement to increase its chances of being accepted by the recruiter.First, the CV could provide more details on the candidate's work experience, specifically in the area of web development. The CV only provides a brief overview of the candidate's work experience, and does not provide any details on the projects the candidate has worked on or the skills they have developed.Second, the CV does not mention any specific results the candidate has achieved in their previous roles. It would be helpful for the recruiter to know what the candidate has accomplished in their previous roles, in order to get a better sense of their skills and abilities.Third, the CV could provide more detail on the candidate's education, specifically in the area of mathematics. The CV only provides a brief overview of the candidate's education, and does not provide any details on the specific courses the candidate has taken or the skills they have developed.Fourth, the CV could provide more detail on the candidate's skills. The CV only provides a brief overview of the candidate's skills, and does not provide any details on the specific skills the candidate has developed or the level of experience they have with each skill.Suggestions and improvements: The CV should provide more details on the candidate's work experience, specifically in the area of web development. The CV should provide more.",
                    400,
                ]}
                speed={50}
                repeat={0}
                cursor={false}
            />
         );
    }
    return ( 
        <div className="CV_checker_modal_container" onClick={close_modal}>
            <div className="CV_checker_modal">
                {/* modal heading */}
                <div className="CV_checker_modal_info">
                    CV üçün düzəlişlər aşağıda əks olunub
                </div>
                {
                    loadingMessages ?
                    <div className="CV_checker_modal_loading">
                        CV yoxlanılır
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
