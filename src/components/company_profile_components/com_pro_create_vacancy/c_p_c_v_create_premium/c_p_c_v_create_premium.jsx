import { useState } from 'react';
import './c_p_c_v_create_premium.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { postJob } from '../../../../apiservices';
import { useDispatch } from 'react-redux';
import { addNewJob,updateCompanyJob } from '../../../../redux/reducers/companyProfileReducers';
import { updateJob } from '../../../../apiservices';
function CreatePremiumForVacany({setCompleted, filter, setFilter,editvacancy}) {
    const dispatch = useDispatch();
    // const [agreePremium, setAgreePremium] = useState(false);
    const [agreeTotalBalance, setAgreeTotalBalance] = useState(false);
    const [vacancyValue, setVacancyValue] = useState(2);
    const [premiumValue, setPremiumValue] = useState(1);
    const [totalBalError, setTotalBalError] = useState(false);
    const navigateTo = useNavigate();
    // agree premium checkbox functiuon
    const acceptAgreedPremium =()=>{
        // setAgreePremium(!agreePremium);
        setFilter({...filter, premium: !filter.premium});
    }
    const acceptAgreeTotalBalance =()=>{
        setAgreeTotalBalance(!agreeTotalBalance);
        setTotalBalError(false);
    }
    // send vacancy funbction
    const shareVacancy =async()=>{
        if(!agreeTotalBalance){
            return setTotalBalError(true);
        }
        try{
            const {data} = await postJob(filter);
            if(!data.succes){
                toast.info(data.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            else{
                toast.success(data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigateTo('/company_profile/vacancies');
                dispatch(addNewJob(data.data));
            }
        }catch(error){
            console.log("error at sharing vacancy error"+error.name)
        } 
    }
    const updatejobasync = async () => {
        try {
            const {data} = await updateJob(editvacancy,filter);
            console.log(data)
            if(data.succes){
                toast.success(data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                dispatch(updateCompanyJob(data.data));
                navigateTo('/company_profile/vacancies');
            }
            else{
                toast.info(data.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            }
        } catch (error) {
            console.log('error at updating job,error:'+error.name)
        }

    }
    return ( 
        <div className="c_p_c_v_create_premium_container">
            {/* page title */}
            <div className="c_p_c_v_create_premium_p_title">Premium Vakansiya</div>
            {/* page back button */}
            <div className="c_p_c_v_create_premium_back_btn" onClick={()=>{ setCompleted(false)}}>
                <FontAwesomeIcon icon={faAngleLeft} />
                Geri
            </div>
            {/* premium description */}
            <div className="c_p_c_v_create_premium_desc">
                Vakansiyanızı premium edərək daha çox izlənmə və namizəd əldə edin.
            </div>
            {/* premium agree checkbox */}
            <div className="c_p_c_v_create_premium_agree_ch_box">
                <div className={`c_p_c_v_create_premium_checkbox ${filter.premium ? "c_p_c_v_create_premium_checkbox_accepted" : ""}`} onClick={acceptAgreedPremium}>
                    {filter.premium ? <span className="c_p_c_v_create_premium_checkbox_checkmark"></span> : null} 
                </div>
                <div className="c_p_c_v_create_premium_checkbox_txt">Vakansiyanı premium eləməyə razıyam</div>
            </div>
            {/* premium balance count */}
            <div className="c_p_c_v_create_premium_balance_count_container">
                {/* box name */}
                <div className="c_p_c_v_create_premium_balance_count_title">Hesab</div>
                {/* balance info */}
                <div className="c_p_c_v_create_premium_balance_values_container">
                    {!editvacancy && <div className="c_p_c_v_create_premium_balance_values">
                        <div className="c_p_c_v_create_premium_balance_values_prop">Vakansiya:</div>
                        <div className="c_p_c_v_create_premium_balance_value">{vacancyValue} Xal</div>
                    </div>}
                    {filter.premium && 
                    <div className="c_p_c_v_create_premium_balance_values">
                        <div className="c_p_c_v_create_premium_balance_values_prop">Premium:</div>
                        <div className="c_p_c_v_create_premium_balance_value">{premiumValue} xal</div>
                    </div>}
                </div>
                {/* total balance */}
                <div className="c_p_c_v_create_premium_balance_total">
                    <div className="c_p_c_v_create_premium_balance_total_name">Cəmi</div>
                    <div className="c_p_c_v_create_premium_balance_total_value">{filter.premium ? premiumValue + (!editvacancy ? vacancyValue :0) : (!editvacancy ? vacancyValue : 0)} Xal</div>
                </div>
            </div>
            {/* balance agree checkbox */}
            <div className="c_p_c_v_create_premium_agree_ch_box">
                <div className={`c_p_c_v_create_premium_checkbox ${agreeTotalBalance ? "c_p_c_v_create_premium_checkbox_accepted" : ""}`} onClick={acceptAgreeTotalBalance}>
                    {agreeTotalBalance ? <span className="c_p_c_v_create_premium_checkbox_checkmark"></span> : null} 
                </div>
                <div className={`c_p_c_v_create_premium_checkbox_txt ${totalBalError && 'c_p_c_v_create_premium_checkbox_txt_error'}`}>Hesabımdan {filter.premium ? premiumValue + (!editvacancy ? vacancyValue :0) : (!editvacancy ? vacancyValue : 0)} xal çıxacağına razıyam.</div>
            </div>
            {/* submit function */}
            <button className={`c_p_c_v_create_premium_submit ${agreeTotalBalance && 'c_p_c_v_create_premium_submit_ready'}`} onClick={!editvacancy ? shareVacancy:updatejobasync}>{!editvacancy ? "Paylaş":"Redakte et"}</button>
        </div>
     );
}

export default CreatePremiumForVacany;