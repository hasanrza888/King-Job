import { Link } from 'react-router-dom';
import './c_p_total_applies.css';
import { useSelector } from 'react-redux';
import PdfViewer from '../../../pdf_viewer/pdf_viewer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
function CpTotalApplies() {
    const {companyJobsApplys:applyes} = useSelector(state=>state.companyProfile);
    const [showCV, setShowCV] = useState(false);
    const [CVFile, setCvFile] = useState('');
    const OpenCvFUnc = (Cvf)=>{
        setShowCV(true);
        setCvFile(Cvf);
    }
    const closeModalFunc = ()=>{
        setShowCV(false);
    }
    useEffect(()=>{
        const closeModal = (e)=>{
            if(showCV && e.target.className === 'c_p_total_applies_CV_mod_cont'){
                setShowCV(false);
            }
        }

        document.addEventListener('click', closeModal);
        return ()=>{
            document.removeEventListener('click', closeModal);
        }
        
    }, [showCV])
    return ( 
        <div className="c_p_total_applies_cont">
            {/* table container */}
            <div className="c_p_applies">
                <table className="c_p_applies_table">
                    <thead>
                        <tr>
                            <th>N</th>
                            <th>Ad</th>
                            <th>Vakansiya adı</th>
                            <th>Email</th>
                            <th>CV faylı</th>
                            <th>Status</th>
                            <th>İdarəetmə</th>
                        </tr>
                    </thead>
                    <tbody>                        
                        {applyes.map((apply,ind) => (
                            <tr key={apply._id}>
                                <td>{ind+1}</td>
                                <td>{apply.userName}</td>
                                <td>{apply.jobName}</td>
                                <td><Link to={`mailto:${apply.userEmail}`}>{apply.userEmail}</Link></td>
                                <td><button className='c_p_open_cv' onClick={()=> { return OpenCvFUnc(apply.file)}}>{"Cv-ə bax"}</button></td>
                                <td>
                                    <span className={`c_p_apply_status ${apply.status === "pending" ? 'c_p_apply_status_pending' : apply.status === "approved" ? "c_p_apply_status_accepted" : apply.status === "rejected" ? "c_p_apply_status_rejected" : "c_p_apply_status_thinking"}`}>{apply.status}</span>
                                </td>
                                <td className='applies_manage'>
                                    <button className="c_p_action_button cancel-button">Ləğv et</button>
                                    <button className="c_p_action_button select-button">Seç</button>
                                    <button className="c_p_action_button interview-button">Müsahibə dəvəti</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
           
            {/* cv modal */}
            {
                showCV &&
                <div className="c_p_total_applies_CV_mod_cont">
                    <div className="c_p_total_applies_CV_mod">
                        <span onClick={closeModalFunc} className="c_p_total_applies_CV_mod_header">
                            <FontAwesomeIcon icon={faClose} />
                        </span>
                        <div className="c_p_total_applies_CV_mod_body">
                            <PdfViewer fileUrl={CVFile} />
                        </div>
                    </div>
                </div>
            }
        </div>
     );
}

export default CpTotalApplies;