import { useEffect, useState } from 'react';
import CustomSelectOption from '../custom_select_option/custom_select_option';
import './vacancy_filters.css'
function VacancyFilters({closeMobileFilter, filter, setFilter}) {
    // categories
    const [categories, setCategories] = useState([
        {
            optionName: 'IT',
            selected: false,
            subOptions: [
                {subOptionsName: "Web", selected: false},
                {subOptionsName: "QA", selected: false},
                {subOptionsName: "Security", selected: false},
            ]
        },
        {
            optionName: 'Bank',  
            selected: false,          
            subOptions: [
                {subOptionsName: "Kredit mütəxəssisi", selected: false},
                {subOptionsName: "Analitik", selected: false},
                {subOptionsName: "Əməliyyatçı", selected: false},
                {subOptionsName: "Şöbə müdiri", selected: false}
            ]
        },
        {
            optionName: 'Marketinq və Satış',
            selected: false,
            subOptions: '',
        }
    ])
    // cities
    const [jobCity, setJobCity] = useState([
        {
            optionName: 'Bakı',
            selected: false,
        },
        {
            optionName: 'Sumqayıt',
            selected: false,
        },
        {
            optionName: 'Lənkəran',
            selected: false,
        },
        {
            optionName: 'Masallı',
            selected: false,
        }
    ])
    // job experience
    const [jobExperience, setJobExperience] = useState([
        {
            optionName: 'Təcrübəsiz',
            selected: false,
        },
        {
            optionName: '1 ildən aşağı',
            selected: false,
        },
        {
            optionName: '1 ildən 3 ilə qədər',
            selected: false,
        },
        {
            optionName: '3 ildən 5 ilə qədər',
            selected: false,
        },
        {
            optionName: '5 ildən çox',
            selected: false,
        }
    ])
    // education level
    const [educationLevel, setEducationLevel] = useState([
        {
            optionName: 'Təhsilsiz',
            selected: false,
        },
        {
            optionName: 'Orta',
            selected: false,
        },
        {
            optionName: 'Ali',
            selected: false,
        }
    ])
    // company
    const [company, setCompany] = useState([
        {
            optionName: 'İŞland',
            selected: false,
        },
        {
            optionName: 'Paşa bank',
            selected: false,
        },
        {
            optionName: 'Kapital bank',
            selected: false,
        },
        {
            optionName: 'Yelo bank',
            selected: false,
        },
        {
            optionName: 'ABB',
            selected: false,
        },
        {
            optionName: 'Pasha sığorta',
            selected: false,
        }
    ])
    // job type
    const [jobType, setJobType] = useState([
        {
            optionName: 'Tam',
            selected: false,
        },
        {
            optionName: 'Natamam',
            selected: false,
        },
        {
            optionName: 'Onlayn',
            selected: false,
        },
        {
            optionName: 'Dəyişkən',
            selected: false,
        }
    ])
    // vacancy order
    const [vacancyOrder, setVacancyOrder] = useState([
        {
            optionName: 'Ən Son',
            selected: false,
        },
        {
            optionName: 'İlk',
            selected: false,
        },
        {
            optionName: 'Ən çox maaş',
            selected: false,
        },
        {
            optionName: 'Ən az maaş',
            selected: false,
        },
        {
            optionName: 'Ən çox baxış sayı',
            selected: false,
        },
        {
            optionName: 'Ən az baxış sayı',
            selected: false,
        },
        {
            optionName: 'Ən çox müraciət sayı',
            selected: false,
        },
        {
            optionName: 'Ən az müraciət sayı',
            selected: false,
        }       
    ])
    // salary changer function
    const salaryFiltChange = (e)=>{
        if(e.target.name === 'min_salary'){
            if(e.target.value){
                filter.min_salary = e.target.value;    
            }else{
                filter.min_salary = null;  
            }
            setFilter({...filter});
        }else if(e.target.name === 'max_salary'){
            if(e.target.value){
                filter.max_salary = e.target.value;    
            }else{
                filter.max_salary = null;  
            }
            setFilter({...filter});
        }
    }
    // special skills values changer function
    const specialSkillsChange =(e)=>{
        filter.skills = e.target.value;
        setFilter({...filter});
    }
    // filter reset function
    const resetFiltersHandle = ()=>{
        setFilter({
            ...filter, 
            categories: "",
            jobCity: "",
            min_salary: null,
            max_salary: null,                            
            jobExperience: "",
            educationLevel: "",
            company: "",
            jobType: "",
            skills: "",
            vacancyOrder: ""
        });
        resetSelectOpt(categories, setCategories);
        resetSelectOpt(jobCity, setJobCity);
        resetSelectOpt(jobExperience, setJobExperience);
        resetSelectOpt(educationLevel, setEducationLevel);
        resetSelectOpt(company, setCompany);
        resetSelectOpt(jobType, setJobType);
        resetSelectOpt(vacancyOrder, setVacancyOrder);
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
        const vacancyBoxes = document.querySelector('.vacancies_page_boxes_container').scrollTop;
        setFixScroll(document.documentElement.scrollTop >= vacancyBoxes); 
    }
    useEffect(()=>{
        window.addEventListener('scroll', scrollFunc)
        return()=>{
            window.removeEventListener('scroll', scrollFunc);
        }
    }, []);
    return ( 
    <div className={`vacancies_filters_container ${fixScroll ? "vacancies_page_filters_fix_position" : ''}`} >
            {/* vacancies filter heading    */}
            <div className="vacancies_page_filters_heading">Filterlər</div>
            {/* filter boxes container */}
            <ul className="vacancies_page_filters_boxes_container">
                {/* category */}
                <li className="vacancies_page_filters_box">
                    <CustomSelectOption select_option_name={'Kateqoriya'} select_option_id="categories" select_option_array={categories} select_update={setCategories} filter={filter} setFilter={setFilter}/>
                </li>    
                {/* city */}
                <li className="vacancies_page_filters_box">
                    <CustomSelectOption select_option_name={'Şəhər'} select_option_id="jobCity" select_option_array={jobCity} select_update={setJobCity} filter={filter} setFilter={setFilter}/>
                </li>  
                {/* salary                   */}
                <li className="vacancies_page_filters_box">
                    <div className="vacancies_page_filters_box_name">Əmək haqqı</div>
                    {/* minimum or maximum salary */}
                    <div className="vacancies_page_filters_salaries">
                        {/* minimum salary */}
                        <input type="number" name='min_salary' className={`vacancies_page_filters_salary_input ${filter.min_salary ? "vacancies_page_filters_active_input" : ''}`} value={filter.min_salary ? filter.min_salary : ''} onChange={salaryFiltChange} placeholder='Min'/>
                        {/* maximum salary */}
                        <input type="number" name='max_salary' className={`vacancies_page_filters_salary_input ${filter.max_salary ? "vacancies_page_filters_active_input" : ''}`} value={filter.max_salary ? filter.max_salary : ''} onChange={salaryFiltChange} placeholder='Max'/>
                    </div>
                </li>  
                {/* experience */}
                <li className="vacancies_page_filters_box">
                    <CustomSelectOption select_option_name={'İş təcrübəsi'} select_option_id="jobExperience" select_option_array={jobExperience} select_update={setJobExperience} filter={filter} setFilter={setFilter}/>
                </li> 
                {/* education level */}
                <li className="vacancies_page_filters_box">
                    <CustomSelectOption select_option_name={'Təhsil səviyyəsi'} select_option_id="educationLevel" select_option_array={educationLevel} select_update={setEducationLevel} filter={filter} setFilter={setFilter}/>
                </li> 
                {/* company  */}
                <li className="vacancies_page_filters_box">
                    <CustomSelectOption select_option_name={'Şirkət'} select_option_id="company" select_option_array={company} select_update={setCompany} filter={filter} setFilter={setFilter}/>
                </li> 
                {/* job type  */}
                <li className="vacancies_page_filters_box">
                    <CustomSelectOption select_option_name={'İş qrafiki'} select_option_id="jobType" select_option_array={jobType} select_update={setJobType} filter={filter} setFilter={setFilter}/>
                </li> 
                {/* special knowledges */}
                <li className="vacancies_page_filters_box">
                    <input type="text" onChange={specialSkillsChange} value={filter.skills} className={`vacancies_page_filters_box_text_input ${filter.skills ? "vacancies_page_filters_active_input" : ''}`} placeholder='Xüsusi biliklər'/>
                </li>
                {/* vacancy boxes order  */}
                <li className="vacancies_page_filters_box">
                    <CustomSelectOption select_option_name={'Sıralama'} select_option_id="vacancyOrder" select_option_array={vacancyOrder} select_update={setVacancyOrder} filter={filter} setFilter={setFilter}/>
                </li> 
            </ul>
            <div className="vacancies_filters_confirm_and_reset_btns">
                <div className="vacancies_filters_reset_btn" onClick={()=>{closeMobileFilter(); resetFiltersHandle()}}>Sıfırla</div>
                <button className="vacancies_filters_confirm_btn" onClick={()=>{closeMobileFilter()}}>Axtar</button>    
            </div>             
    </div> );
}

export default VacancyFilters;