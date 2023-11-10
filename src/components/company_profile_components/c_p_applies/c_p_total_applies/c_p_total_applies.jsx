import { Link } from 'react-router-dom';
import './c_p_total_applies.css';
import PdfViewer from '../../../pdf_viewer/pdf_viewer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faFilter, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {companyAcceptUserApply} from '../../../../apiservices';
import {toast} from 'react-toastify'
import { updateUserApply } from '../../../../redux/reducers/companyProfileReducers';
import CustomSelectOption from '../../../custom_select_option/custom_select_option';

function CpTotalApplies() {
    const [showCV, setShowCV] = useState(false);
    const [CVFile, setCvFile] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [openFilters, setOpenFilters] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({
        vacancyName: '',
        applyStatus: '',
    })
    const [vacancyName, setVacancyName] = useState([
        {
            id: 1,
            optionName: 'Front End Developer (Unpaid Internship)',
            value: '',
            selected: false,
        },
        {   
            id: 2,
            optionName: 'UI/UX Designer(Unpaid Internship)',
            selected: false,
        },
        {   
            id: 3,
            optionName: 'Software QA Engineer (Unpaid internship)',
            selected: false,
        }
    ])
    const [applyStatus, setApplyStatus] = useState([
        {
            id: 1,
            optionName: 'pending',
            value: '',
            selected: false,
        },
        {
            id: 2,
            optionName: 'thinking',
            value: '',
            selected: false,
        },
        {
            id: 3,
            optionName: 'rejected',
            value: '',
            selected: false,
        },
        {
            id: 4,
            optionName: 'approved',
            value: '',
            selected: false,
        },
    ])
    const {companyJobsApplys:applyes} = useSelector(state=>state.companyProfile);
    const dispatch = useDispatch();

    const acceptuserapply = async (id,status) => {
        const messages = {
            'thinking':'Sonra yeniden baxmaq ucun elave etmek isteyirsizmi?',
            'approved':'Birinci merheleni kecirtmeye razisizmi? applicanta mail gedecek.',
            'rejected':'Muracieti reject etmeynize eminsizmi,reject etdiyiniz halda reject buttonu itecek ve usere mail gedecek bir daha geri qaytara bilen deyilsiz.'
        }
        try {
            if(window.confirm(messages[status])){
                // console.log("ok")
                const {data} = await companyAcceptUserApply(id,{status});
                console.log(data)
                if(data.succes){
                    toast.success(data.message, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    dispatch(updateUserApply(data.data))
                }
                else{
                    alert(data.message)
                }}
            
            // confirm('dshbs') === 
            // const {data} = await companyAcceptUserApply(id);
            // console.log(data)
        } catch (error) {
            console.log('error at accepting user apply user error:'+error.name);
        }
    }
    
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
    // filters opener function
    const openFiltersBox = ()=>{
        setOpenFilters(!openFilters);
    }
    // search submit
    const searchApplySubmit = (e)=>{
        e.preventDefault();
        // console.log(e.target.search_form_input.value)
        setSearchQuery(e.target.search_form_input.value);
    }
    console.log(filter)
    return ( 
        <div className="c_p_total_applies_cont">
            {/* search applies form input */}
            <div className="c_p_total_applies_Search_form_and_new_cont">
                <form onSubmit={searchApplySubmit} className='c_p_total_applies_Search_form'>
                    <input className='c_p_total_applies_Search_form_input' name='search_form_input' type="text" placeholder='Namizədi axtarın'/>
                    <button className='c_p_total_applies_Search_form_sbmt' type="submit">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
                {/* filter button and create vacancy button */}
                <div className="c_p_total_applies_Search_form_flt_btn_and_link">
                    <button className="c_p_total_applies_Search_form_open_filters" onClick={openFiltersBox} title='Filter'>
                        <FontAwesomeIcon icon={faFilter} />
                    </button>
                </div>
            </div>
            {/* filters container */}
            <div className={`c_p_total_applies_filters_container ${openFilters && 'c_p_total_applies_filters_close'}`}>
                <ul className='c_p_total_applies_filters'>
                    <li className='c_p_total_applies_filters_list_item'>
                        <CustomSelectOption key="vacancy_name" select_option_name={'Vakansiya adı'} select_option_id="vacancyName" subOptionId='' select_option_array={vacancyName} select_update={setVacancyName} filter={filter} setFilter={setFilter}/>
                    </li>
                    <li className='c_p_total_applies_filters_list_item'>
                        <CustomSelectOption key="apply_status" select_option_name={'Müraciət statusu'} select_option_id="applyStatus" subOptionId='' select_option_array={applyStatus} select_update={setApplyStatus} filter={filter} setFilter={setFilter}/>
                    </li>
                </ul>
            </div>
            {
                loading ?
                <div className="c_p_total_applies_loading_rotates">
                    <FontAwesomeIcon className='c_p_total_applies_loading_rot_icon' icon={faSpinner} />
                </div>
                :
                <>
                {
                    applyes.filter((item) => {return item.userName.toLowerCase().includes(searchQuery.toLowerCase()) && item.jobName.toLowerCase().includes(filter.vacancyName.toLowerCase())}).length > 0 ?
                    
                    <div className="c_p_applies">
                        {/* table container */}
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
                                {applyes.filter((item) => {return item.userName.toLowerCase().includes(searchQuery.toLowerCase()) && item.jobName.toLowerCase().includes(filter.vacancyName.toLowerCase()) && item.status.toLowerCase().includes(filter.applyStatus.toLowerCase())}).map((apply,ind) => (
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
                                            {apply.status!=='rejected' && <button onClick={()=>acceptuserapply(apply._id,'rejected')}className='c_p_action_button cancel-button'>Ləğv et</button>}
                                            {apply.status!=='rejected' && <button onClick={()=>acceptuserapply(apply._id,'approved')} className='c_p_action_button select-button'>Seç</button>}
                                            {apply.status!=='rejected' && <button onClick={()=>acceptuserapply(apply._id,'thinking')} className='c_p_action_button think-button'>Fikirləş</button>}
                                            {/* /* <button className="c_p_action_button cancel-button">Ləğv et</button> */}
                                            {/* <button onClick={()=>acceptuserapply(apply._id,apply.status)} className="c_p_action_button select-button">Seç</button>
                                            <button className="c_p_action_button interview-button">Müsahibə dəvəti</button> */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>    
                    :
                    <div className="company_profile_total_applies_error">MÖVCUD NAMİZƏD YOXDUR!</div>
                }
                </>
            }
            
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