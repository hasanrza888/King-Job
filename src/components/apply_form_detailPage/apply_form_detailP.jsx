import { useState } from 'react';
import './apply_form_detailP.css';

function ApplyFormDetailP() {
    const [logoName, setLogoName] = useState('');
    const uploadLogo = (e)=>{
        if(e.target.files){
            setLogoName(e.target.files[0].name)    
        }        
    }
    return ( 
        <div className="apply_form_detail_page">
            {/* company logo */}
            <label htmlFor="company_signup_form_company_logo" className='company_signup_form_logo'>
                Yeni CV
                <div className="company_signup_form_logo_and_name">
                    <input type="file" name="company_signup_form_company_logo" onChange={uploadLogo} accept="application/pdf" title='Logo yüklə'/>
                    <span className="company_signup_logo_name">{logoName}</span>
                </div>                    
            </label>
        </div>
     );
}

export default ApplyFormDetailP;