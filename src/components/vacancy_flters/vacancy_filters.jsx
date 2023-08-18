import { useEffect, useState } from 'react';
import CustomSelectOption from '../custom_select_option/custom_select_option';
import './vacancy_filters.css'
function VacancyFilters({closeMobileFilter, filter, setFilter}) {
    // categories
    const [categories, setCategories] = useState([
        {
            optionName: 'IT',
            id: 1,
            selected: false,
            subOptions: [
                {subOptionsName: "Web", selected: false, id: 1.1},
                {subOptionsName: "QA", selected: false, id: 1.2},
                {subOptionsName: "Security", selected: false, id: 1.3},
            ]
        },
        {
            optionName: 'Bank', 
            id: 2, 
            selected: false,          
            subOptions: [
                {subOptionsName: "Kredit mütəxəssisi", selected: false, id: 2.1},
                {subOptionsName: "Analitik", selected: false, id: 2.2},
                {subOptionsName: "Əməliyyatçı", selected: false, id: 2.3},
                {subOptionsName: "Şöbə müdiri", selected: false, id: 2.4}
            ]
        },
        {
            optionName: 'Marketinq və Satış',
            id:3,
            selected: false,
            subOptions: '',
        }
    ])
    // cities
    const [jobCity, setJobCity] = useState([
        {   
            id: 4,
            optionName: 'Bakı',
            selected: false,
        },
        {   
            id: 5,
            optionName: 'Sumqayıt',
            selected: false,
        },
        {   
            id: 6,
            optionName: 'Lənkəran',
            selected: false,
        },
        {   
            id: 7,
            optionName: 'Masallı',
            selected: false,
        }
    ])
    // job experience
    const [jobExperience, setJobExperience] = useState([
        {   
            id: 8,
            optionName: 'Təcrübəsiz',
            selected: false,
        },
        {
            id: 9,
            optionName: 'Minimum 1 il',
            selected: false,
        },
        {
            id: 10,
            optionName: 'Minimum 2 il',
            selected: false,
        },
        {
            id: 11,
            optionName: 'Minimum 3 il',
            selected: false,
        },
        {
            id: 12,
            optionName: 'Minimum 4 il',
            selected: false,
        },
        {
            id: 13,
            optionName: 'Minimum 5 il',
            selected: false,
        },
        {
            id: 14,
            optionName: '5 ildən çox',
            selected: false,
        }
    ])
    // education level
    const [educationLevel, setEducationLevel] = useState([
        {
            id: 15,
            optionName: 'Təhsilsiz',
            selected: false,
        },
        {
            id: 16,
            optionName: 'Orta',
            selected: false,
        },
        {
            id: 17,
            optionName: 'Ali',
            selected: false,
        }
    ])
    // company
    const [company, setCompany] = useState([
        {
            id: 18,
            optionName: 'İŞland',
            selected: false,
        },
        {
            id: 19,
            optionName: 'Paşa bank',
            selected: false,
        },
        {
            id: 20,
            optionName: 'Kapital bank',
            selected: false,
        },
        {
            id: 21,
            optionName: 'Yelo bank',
            selected: false,
        },
        {
            id: 22,
            optionName: 'ABB',
            selected: false,
        },
        {
            id: 23,
            optionName: 'Pasha sığorta',
            selected: false,
        }
    ])
    // job type
    const [jobType, setJobType] = useState([
        {
            id: 24,
            optionName: 'Tam',
            selected: false,
        },
        {
            id: 25,
            optionName: 'Natamam',
            selected: false,
        },
        {
            id: 26,
            optionName: 'Onlayn',
            selected: false,
        },
        {
            id: 27,
            optionName: 'Dəyişkən',
            selected: false,
        }
    ])
    // vacancy order
    const [vacancyOrder, setVacancyOrder] = useState([
        {
            id: 28,
            optionName: 'Ən Son',
            selected: false,
        },
        {
            id: 29,
            optionName: 'İlk',
            selected: false,
        },
        {
            id: 30,
            optionName: 'Ən çox maaş',
            selected: false,
        },
        {
            id: 31,
            optionName: 'Ən az maaş',
            selected: false,
        },
        {
            id: 32,
            optionName: 'Ən çox baxış sayı',
            selected: false,
        },
        {
            id: 33,
            optionName: 'Ən az baxış sayı',
            selected: false,
        },
        {
            id: 34,
            optionName: 'Ən çox müraciət sayı',
            selected: false,
        },
        {
            id: 35,
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
            sub_categories: "",
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
                    <CustomSelectOption select_option_name={'Kateqoriya'} select_option_id="categories" subOptionId='sub_categories' select_option_array={categories} select_update={setCategories} filter={filter} setFilter={setFilter}/>
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