import './companies.css';
import defaultlogo from "../../images/defaultcompanylogo.png";
import SliderHome from "../../components/slider/slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faFilter, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import CustomSelectOption from '../../components/custom_select_option/custom_select_option';
import PageHeadText from '../../components/page_head_text/page_head_text';
// import { companies } from '../../fakeData/companies';
import CompanyPostBox from '../../components/company_post_box/company_post_box';
import { useEffect,useState } from 'react';
import { getcompanies } from '../../apiservices';
import PageTitle from '../../components/page_title_maker/page_title';
function Companies() {
    const [companies,setCompanies] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        const ftchcmps = async () => {
            setLoading(true);
            try {
                const {data} = await getcompanies();
                setCompanies(data.companies);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log("error at fetching companies,error:",error.name)
            }
        }
           ftchcmps();
        
    },[])
    const [filter, setFilter] = useState({
        company_name: '',
        company_order: ''
    })
    const companyNameChange = (e)=>{
        setFilter({...filter, company_name: e.target.value})
    }
    const [openMobileFilter, setOpenMobileFilter] = useState(false);
    // vacancy order
    const [company_order, setCompany_order] = useState([
        {   
            id: 1,
            optionName: 'Ən reytinqli',
            selected: false,
        },  
        {   
            id: 2,
            optionName: 'Ada görə (A-Z) artan',
            selected: false,
        },
        {   
            id: 3,
            optionName: 'Ada görə (A-Z) azalan',
            selected: false,
        },
        {   
            id: 4,
            optionName: 'Ən çox müraciət',
            selected: false,
        },
        {   
            id: 5,
            optionName: 'Ən çox vakansiya',
            selected: false,
        },
        {   
            id: 6,
            optionName: 'Ən az vakansiya',
            selected: false,
        }
    ])
    // filter windows open function
    const openMobileFilterHandle = ()=>{
        setOpenMobileFilter(!openMobileFilter);
    }
    // filter reset function
    const resetFiltersHandle = ()=>{
        setFilter({
            ...filter, 
            company_name: '',
            company_order: ''
        });
        resetSelectOpt(company_order, setCompany_order);
    }
    const resetSelectOpt = (objs, setFunc)=>{
        objs.map((rItem1) =>{
            rItem1['selected'] = false;
            if(rItem1['subOptions']){
                rItem1['subOptions'].map((rItem2)=>{
                    rItem2['selected'] = false;
                })
            }
        })      
        setFunc([...objs]);      
    }
    // fixing filters boxes 
    const [fixScroll, setFixScroll] = useState(false);
    const scrollFunc = ()=>{
        const companyBoxes = document.querySelector('.companies_page_commpany_boxes').scrollTop;
        setFixScroll(document.documentElement.scrollTop >= companyBoxes); 
    }
    useEffect(()=>{
        window.addEventListener('scroll', scrollFunc)
        return()=>{
            window.removeEventListener('scroll', scrollFunc);
        }
    }, []);
    // fixing search box 
    const [fixSearch, setFixSearch] = useState(false);
    const scrollForSearchForm = ()=>{
        const search_boxes = document.querySelector('.companies_page_commpany_boxes').scrollHeight;
        setFixSearch(document.documentElement.scrollTop > 90 && document.documentElement.scrollTop < search_boxes); 
    }
    useEffect(()=>{
        window.addEventListener('scroll', scrollForSearchForm)
        return()=>{
            window.removeEventListener('scroll', scrollForSearchForm);
        }
    }, []);
    useEffect(()=>{
        PageTitle('Şirkətlər');
    },[])
    return ( 
        <div className="companies_page_container">
            <div className="companies_page_slider_and_search">
                {/* slogan */}
                <div className="companies_page_slogan">İstədİyİnİz <span>Şİrkətİ</span> axtarın !</div>
                {/* ___________ company search form ________________ */}
                <div className={`companies_page_job_search_container ${fixSearch ? 'companies_page_job_search_fixed' : ''}`}>
                    <form className="companies_page_job_search_form">
                        {/* company search input */}
                        <input type="text" value={filter.company_name} onChange={companyNameChange} placeholder='Şirkət'/>
                        <button type="submit" className='companies_page_job_search_form_submit'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </form>
                    {/* mobile filter open button */}
                    <div className="companies_page_filters_button_container">
                        <div className="companies_page_filters_button" onClick={openMobileFilterHandle}>
                            <FontAwesomeIcon icon={faFilter} />
                            Filterlər
                        </div>    
                    </div>
                </div>
            </div>
            {/* company filters and companies */}
            <div className="companies_page_filter_and_companies">
                {/* company filters */}
                <div className={`companies_page_filter ${openMobileFilter ? 'companies_page_filters_mobile' : ''}`}>
                    <div className={`companies_page_filter_container ${fixScroll ? "companies_page_filters_fix_position" : ''}`}>
                        <div className="companies_page_filters_mobile_close" onClick={openMobileFilterHandle}>
                            <FontAwesomeIcon icon={faChevronLeft} />    
                            Geri
                        </div> 
                        <div className="companies_page_filter_name">Filterlər</div>
                        <div className="companies_page_filters_container">
                            <ul className="companies_page_filters_list">
                                <li>
                                    <CustomSelectOption select_option_name={'Sıralama'} select_option_id="company_order" select_option_array={company_order} select_update={setCompany_order} filter={filter} setFilter={setFilter}/>
                                </li>
                            </ul>
                        </div>
                        {/* filter reset and find buttons */}
                        <div className="companies_filters_confirm_and_reset_btns">
                            <div className="companies_filters_reset_btn" onClick={()=>{openMobileFilterHandle(); resetFiltersHandle()}}>Sıfırla</div>
                            <button className="companies_filters_confirm_btn" onClick={()=>{openMobileFilterHandle()}}>Axtar</button>    
                        </div> 
                    </div>
                </div>
                {/* company post boxes */}
                <div className="companies_page_commpany_boxes">
                    {
                        loading ? 
                        <div className="companies_page_loading_rotates">
                            <FontAwesomeIcon className='companies_page_loading_rot_icon' icon={faSpinner} />
                        </div>
                        :
                        <>
                        <div className="companies_page_boxes_head">Şirkətlər</div>
                        <div className="companies_page_commpany_boxes_container">
                            {
                                companies.map((item, index)=>{
                                    return (
                                        <CompanyPostBox 
                                            key={item._id}
                                            company_name = {item.name}
                                            company_logo = {(item.companyInfo)?.logo || defaultlogo}
                                            company_rating = {4}
                                            vacancy_count = {(item.companyInfo)?.vacancynum}
                                            apply_count = {(item.companyInfo)?.applynum}
                                        />
                                    )
                                })
                            }
                        </div>
                    </>}
                </div>
            </div>
        </div>
    );
}
export default Companies;