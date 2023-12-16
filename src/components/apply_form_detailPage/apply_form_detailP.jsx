import { useState } from 'react';
import './apply_form_detailP.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { apllyNewJob } from '../../apiservices';
import { useSelector,useDispatch } from 'react-redux';
import { updateCurrentJob,updateJobs } from '../../redux/reducers/jobReducers';
function ApplyFormDetailP({openApplyWindowF, setSuccessMsg, successMsg, sendNotificationSuccess, job, setOpenTg}) {
    const dispatch = useDispatch();
    const [error,setErrorMessage]  = useState({errorCheck:false,errorContent:''});
    const {user,isLoggedIn} = useSelector(state=>state.user);
    const {jobs} = useSelector(state=>state.job)
    const [logoName, setLogoName] = useState('');
    const [agreeCurrentCv, setAgreeCurrentCv] = useState(false);
    const [file,setFile] = useState(null);
    const uploadNewCv = (e)=>{
        if(e.target.files.length > 0){
            setLogoName(e.target.files[0].name);  
            setAgreeCurrentCv(false);
            setFile(e.target.files[0]);
        }      
    }
    const closeWindowWhenOtherClick = (e)=>{
        if(e.target.className === "apply_form_detail_page"){
            openApplyWindowF();
            openTgWindow();
        }
    }
    const openTgWindow = ()=>{
        if(!JSON.parse(localStorage.getItem('t_s_i'))){
            setOpenTg(true);
            console.log('ttgtgtgt');
        }
    }
    const agreeCurrentCVHandle = ()=>{
        setAgreeCurrentCv(!agreeCurrentCv);
        setLogoName('');
    }
    // send apply to vacancy >>>> submit button
    const sendApplyToVacancy = async (e)=>{

        // if user choosed current cv or new cv from own device, it will send apply to company and close window
        setErrorMessage({errorCheck:false,errorContent:''});
        e.preventDefault();
        const formData = new FormData();
        formData.append('job', job);
        formData.append('user', user?._id);
        formData.append('myCv', agreeCurrentCv);
        if (file) {
          formData.append('file', file);
        }
        try {
            if(logoName || agreeCurrentCv){
                const {data} = await apllyNewJob(formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  });
                //   console.log(data)
                  if(data.succes){
                    setErrorMessage({errorCheck:false,errorContent:''});
                    openApplyWindowF();
                    sendNotificationSuccess(data.message);
                    dispatch(updateCurrentJob(data.data));
                    let newData = jobs.map(obj=>{
                        return obj._id === (data.data)._id ?
                        data.data : obj
                    })
                    dispatch(updateJobs(newData))
                    // console.log(data.message)
                    openTgWindow()
                  }
                  else{
                    console.log(data.message)
                    setErrorMessage({errorCheck:true,errorContent:data.message});
                  }
            }
        } catch (error) {
            if(error.response && error.response.data){
                setErrorMessage({errorCheck:true,errorContent:error.response.data.message})
            }
            else{
                console.log("error from server")
            }
            
        }
    }
    return ( 
        <div className="apply_form_detail_page" onClick={(e)=> closeWindowWhenOtherClick(e)}>            
            <div className="apply_form_detail_page_container">
                {/* apply window heading */}
                <div className="apply_form_detail_page_heading">
                    {/* window close button */}
                    <span className="apply_form_detail_page_close_btn" onClick={()=>{openApplyWindowF(); openTgWindow()}}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </span>
                    <p className="apply_form_detail_page_head_text">Müraciət üçün CV seçin !</p>
                </div>
                <div className="apply_form_detail_page_body">
                {error.errorCheck && <span style={{color:'red'}}>{error.errorContent}</span>}
                    {/* checkbox and text */}
                    {/* <div className="apply_form_checkbox_and_text">
                        <div className={`apply_form_checkbox ${agreeCurrentCv ? "apply_form_checkbox_accepted" : ""}`} onClick={agreeCurrentCVHandle}>
                            {agreeCurrentCv ? <span className="apply_form_checkbox_checkmark"></span> : null}                        
                        </div>
                        
                        <div className="apply_form_check_text">Profilimdəki mövcud CV-ni seç</div>
                    </div> */}
                    {/* company logo */}
                    <label htmlFor="choose_new_cv" className='apply_form_detailP_CV_choose'>
                        Yeni CV
                        <div className="apply_form_detailP_CV_choose_and_name">
                            <input type="file" name="choose_new_cv" onChange={uploadNewCv} accept="application/pdf" title='CV yüklə'/>
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