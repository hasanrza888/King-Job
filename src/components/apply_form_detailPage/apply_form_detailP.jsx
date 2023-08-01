import { useState } from 'react';
import './apply_form_detailP.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function ApplyFormDetailP({openApplyWindowF, setSuccessMsg, successMsg, sendNotificationSuccess}) {
    const [logoName, setLogoName] = useState('');
    const [agreeCurrentCv, setAgreeCurrentCv] = useState(false);
    const uploadLogo = (e)=>{
        if(e.target.files.length > 0){
            setLogoName(e.target.files[0].name);  
        }      
    }
    const closeWindowWhenOtherClick = (e)=>{
        if(e.target.className === "apply_form_detail_page"){
            openApplyWindowF();
        }
    }
    const agreeCurrentCVHandle = ()=>{
        setAgreeCurrentCv(!agreeCurrentCv);
    }
    // send apply to vacancy >>>> submit button
    const sendApplyToVacancy = ()=>{
        // if user choosed current cv or new cv from own device, it will send apply to company and close window
        if(logoName || agreeCurrentCv){
            openApplyWindowF();
            // setSuccessMsg(!successMsg);
            sendNotificationSuccess();
        }
    }
    return ( 
        <div className="apply_form_detail_page" onClick={(e)=> closeWindowWhenOtherClick(e)}>            
            <div className="apply_form_detail_page_container">
                {/* apply window heading */}
                <div className="apply_form_detail_page_heading">
                    {/* window close button */}
                    <span className="apply_form_detail_page_close_btn" onClick={openApplyWindowF}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </span>
                    <p className="apply_form_detail_page_head_text">Müraciət üçün CV seçin !</p>
                </div>
                <div className="apply_form_detail_page_body">
                    {/* checkbox and text */}
                    <div className="apply_form_checkbox_and_text">
                        <div className={`apply_form_checkbox ${agreeCurrentCv ? "apply_form_checkbox_accepted" : ""}`} onClick={agreeCurrentCVHandle}>
                            {agreeCurrentCv ? <span className="apply_form_checkbox_checkmark"></span> : null}                        
                        </div>
                        <div className="apply_form_check_text">Profilimdəki mövcud CV-ni seç</div>
                    </div>
                    {/* company logo */}
                    <label htmlFor="choose_new_cv" className='apply_form_detailP_CV_choose'>
                        Yeni CV
                        <div className="apply_form_detailP_CV_choose_and_name">
                            <input type="file" name="choose_new_cv" onChange={uploadLogo} accept="application/pdf" title='CV yüklə'/>
                            <span className="apply_form_detailP_CV_choose_name">{logoName}</span>
                        </div>                    
                    </label>
                    <button className={`apply_form_detail_page_apply_btn ${agreeCurrentCv || logoName ? "apply_form_detail_page_apply_btn_ready" : ""}`} onClick={sendApplyToVacancy}>Tamamla</button>
                </div>
            </div>
        </div>
     );
}

export default ApplyFormDetailP;