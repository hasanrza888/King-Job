import './companies.css';
import SliderHome from "../../components/slider/slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import CustomSelectOption from '../../components/custom_select_option/custom_select_option';
import PageHeadText from '../../components/page_head_text/page_head_text';
import { companies } from '../../fakeData/companies';
import CompanyPostBox from '../../components/company_post_box/company_post_box';
import { useEffect } from 'react';

function Companies() {
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
            optionName: 'Ən reytinqli',
            selected: false,
        },  
        {
            optionName: 'Ada görə (A-Z) artan',
            selected: false,
        },
        {
            optionName: 'Ada görə (A-Z) azalan',
            selected: false,
        },
        {
            optionName: 'Ən çox müraciət',
            selected: false,
        },
        {
            optionName: 'Ən çox vakansiya',
            selected: false,
        },
        {
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
    return ( 
        <div className="companies_page_container">
            <div className="companies_page_slider_and_search">
                {/* slogan */}
                <div className="companies_page_slogan">İstədİyİnİz <span>Şİrkətİ</span> axtarın !</div>
                {/* ___________ company search form ________________ */}
                <div className="companies_page_job_search_container">
                    <form className="companies_page_job_search_form">
                        {/* company search input */}
                        <input type="text" value={filter.company_name} onChange={companyNameChange} placeholder='Şirkət'/>
                        <button type="submit" className='companies_page_job_search_form_submit'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </form>
                </div>
            </div>
            {/* company filters and companies */}
            <div className="companies_page_filter_and_companies">
                {/* mobile filter open button */}
                <div className="companies_page_filters_button" onClick={openMobileFilterHandle}>
                    <FontAwesomeIcon icon={faFilter} />
                    Filterlər
                </div>
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
                    <PageHeadText content={'Şirkətlər'}/>
                    <div className="companies_page_commpany_boxes_container">
                        {
                            companies.map((item, index)=>{
                                return (
                                    <CompanyPostBox 
                                        key={item.company_id}
                                        company_name = {item.company_name}
                                        company_logo = {item.company_logo}
                                        company_rating = {item.rating}
                                        vacancy_count = {item.vacancy_count}
                                        apply_count = {item.apply_count}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Companies;