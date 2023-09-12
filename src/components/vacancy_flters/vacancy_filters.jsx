import { useEffect, useState } from 'react';
import CustomSelectOption from '../custom_select_option/custom_select_option';
import './vacancy_filters.css'
import { useNavigate } from 'react-router-dom';
import { getfilteroptions } from '../../apiservices';
function VacancyFilters({closeMobileFilter, filter, setFilter}) {
    // navigator
    const navigate_to = useNavigate();
    // categories
    const [categories, setCategories] = useState([])
    // cities
    const [jobCity, setJobCity] = useState([])
    // company
    const [company, setCompany] = useState([]);
    useEffect(()=>{
        const fetchCatSub =  async () => {
            try {
                const {data} = await getfilteroptions();
                setCategories(data.categories);
                setJobCity(data.cityes);
                setCompany(data.companies)
            } catch (error) {
                console.log('error at fetching subcat'+error.name)
            }
        }
        fetchCatSub();
    },[])
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
            if(e.target.value && Number(e.target.value) > 0){
                if(filter.max_salary !== ''){
                    if(Number(e.target.value) < Number(filter.max_salary)){ 
                        setFilter({...filter, min_salary : e.target.value});    
                    }
                }else{
                    setFilter({...filter, min_salary : e.target.value});  
                }
            }else{
                setFilter({...filter, min_salary : ''});  
            }
        }else if(e.target.name === 'max_salary'){
            if(e.target.value && Number(e.target.value) > 0){
                setFilter({...filter, max_salary : e.target.value});   
            }else{
                setFilter({...filter, max_salary : ''});   
            }
        }
    }
    // special skills values changer function
    const specialSkillsChange =(e)=>{
        filter.skills = e.target.value;
        setFilter({...filter});
    }
    // filter reset function
    const resetFiltersHandle = ()=>{
        navigate_to('/vacancies');
        setFilter({
            ...filter, 
            categories: "",
            sub_categories: "",
            jobCity: "",
            min_salary: "",
            max_salary: "",                            
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
    // splitter of queries
    const filterEmptyQueryParams = (queryString)=> {
        const queryParams = queryString.split('&');
        const filteredParams = queryParams.filter(param => {
          const [key, value] = param.split('=');
          return value !== '';
        });
        const filteredQuery = filteredParams.join('&');
        return filteredQuery;
    }
    // filters search button
    const search =  (e) => {
        e.preventDefault();
        const {categories, sub_categories, jobCity, min_salary, max_salary, jobExperience, educationLevel, company, jobType, skills, vacancyOrder} = filter;
        const query = `companyName=${company}&category=${categories}&subCategory=${sub_categories}&city=${jobCity}&type=${jobType}&experience=${jobExperience}&education=${educationLevel}&skills=${skills}&min_salary=${min_salary}&max_salary=${max_salary}&order=${vacancyOrder}`;
        const filteredQuery = filterEmptyQueryParams(query);
        navigate_to(`/vacancies/?${filteredQuery}`);
        closeMobileFilter();  
    }

    return ( 
    <div className={`vacancies_filters_container ${fixScroll ? "vacancies_page_filters_fix_position" : ''}`} >
            {/* {console.log(categories)} */}
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
                    <div className="vacancies_page_filters_box_name">Xüsusi bacarıqlar</div>
                    <input type="text" onChange={specialSkillsChange} value={filter.skills} className={`vacancies_page_filters_box_text_input ${filter.skills ? "vacancies_page_filters_active_input" : ''}`} placeholder='Ms word, Python, AutoCAD'/>
                </li>
                {/* vacancy boxes order  */}
                <li className="vacancies_page_filters_box">
                    <CustomSelectOption select_option_name={'Sıralama'} select_option_id="vacancyOrder" select_option_array={vacancyOrder} select_update={setVacancyOrder} filter={filter} setFilter={setFilter}/>
                </li> 
            </ul>
            <div className="vacancies_filters_confirm_and_reset_btns">
                <div className="vacancies_filters_reset_btn" onClick={()=>{closeMobileFilter(); resetFiltersHandle()}}>Sıfırla</div>
                <button className="vacancies_filters_confirm_btn" onClick={(e)=>{search(e)}}>Axtar</button>    
            </div>             
    </div> );
}

export default VacancyFilters;