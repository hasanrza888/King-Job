import './companies.css';
import SliderHome from "../../components/slider/slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import CustomSelectOption from '../../components/custom_select_option/custom_select_option';
import PageHeadText from '../../components/page_head_text/page_head_text';
import { companies } from '../../fakeData/companies';
import CompanyPostBox from '../../components/company_post_box/company_post_box';

function Companies() {
    const [filter, setFilter] = useState({
        company_name: '',
        company_order: ''
    })
    const companyNameChange = (e)=>{
        setFilter({...filter, company_name: e.target.value})
    }
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
    return ( 
        <div className="companies_page_container">
            <div className="companies_page_slider_and_search">
                <SliderHome />    
                {/* ___________ slider core ________________ */}
                <div className="companies_page_slider_core">
                    {/* ___________ company search form ________________ */}
                    <div className="companies_page_job_search_container">
                        <form className="companies_page_job_search_form">
                            {/* company search input */}
                            <input type="text" value={filter.company_name} onChange={companyNameChange} placeholder='İSTƏDİYİNİZ ŞİRKƏTİ AXTARIN !'/>
                            <button type="submit" className='companies_page_job_search_form_submit'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {/* company filters and companies */}
            <div className="companies_page_filter_and_companies">
                {/* company filters */}
                <div className="companies_page_filter">
                    <div className="companies_page_filter_name">Filterlər</div>
                    <div className="companies_page_filters_container">
                        <ul className="companies_page_filters_list">
                            <li>
                                <CustomSelectOption select_option_name={'Sıralama'} select_option_id="company_order" select_option_array={company_order} select_update={setCompany_order} filter={filter} setFilter={setFilter}/>
                            </li>
                        </ul>
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