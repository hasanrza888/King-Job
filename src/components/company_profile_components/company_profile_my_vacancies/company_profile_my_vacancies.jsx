import './company_profile_my_vacancies.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faFilter, faMagnifyingGlass, faPen, faPlus, faSearch, faSortDown, faSortUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CustomSelectOption from '../../custom_select_option/custom_select_option';
import CustomSelectOptionForCreatVacancy from '../com_pro_create_vacancy/custom_select_option_for_creat_vacancy';
import { toast } from 'react-toastify';
import { deactivatevacancy,deleteJob } from '../../../apiservices';
import { updateCurrentJob } from '../../../redux/reducers/jobReducers';
import { updateCompanyJob,deleteCompanyJob } from '../../../redux/reducers/companyProfileReducers';

function CompanyProfileMyVacancies() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filter, setFilter] = useState({
        active: '',
        category: '',
        subCategory: '',
        city: '',
        type: '',
        age: '',
        experience: '',
        education: '',
        min_salary: '',
        max_salary: '',
        salaryType: '',
        minStartDate: '',
        maxStartDate: '',
        minEndDate: '',
        maxEndDate: '',
    })
    // filters for vacancies
    // status
    const [active, setActive] = useState([
        {
            id: 1,
            optionName: 'Aktiv',
            value: true,
            selected: false,
        },
        {
            id: 2,
            optionName: 'Deaktiv',
            value: false,
            selected: false,
        }
    ]) 
    // category
    const findSubForMain = (arr,m) => {
        for(let i of arr){
            if(i['optionName'] === m){
                return i['subOptions']
            }
        }
    }
    const [subs,setsubs] = useState("");
    const [category, setCategories] = useState([
        {
          optionName: 'ARTS',
          id: 1,
          selected: false,
          subOptions: [
            { optionName: 'Actor', selected: false, id: 1.1 },
            { optionName: 'Music Director', selected: false, id: 1.2 },
            { optionName: 'Filmmaker', selected: false, id: 1.3 },
            { optionName: 'Gallery Assistant', selected: false, id: 1.4 },
            { optionName: 'Photographer', selected: false, id: 1.5 },
            { optionName: 'Choreographer', selected: false, id: 1.6 },
            { optionName: 'Musician', selected: false, id: 1.7 },
            { optionName: 'Graphic Designer', selected: false, id: 1.8 },
            { optionName: 'Dancer', selected: false, id: 1.9 },
            { optionName: 'Curator', selected: false, id: 1.10 },
            { optionName: 'Makeup Artist', selected: false, id: 1.11 },
            { optionName: 'Art Director', selected: false, id: 1.12 },
            { optionName: 'Artist', selected: false, id: 1.13 },
            { optionName: 'Audio-visual Engineer', selected: false, id: 1.14 },
          ],
        },
        {
          optionName: 'BUSINESS',
          id: 2,
          selected: false,
          subOptions: [
            { optionName: 'Courier', selected: false, id: 2.1 },
            { optionName: 'Accounts Payable Clerk', selected: false, id: 2.2 },
            { optionName: 'Data Entry Clerk', selected: false, id: 2.3 },
            { optionName: 'File Clerk', selected: false, id: 2.4 },
            { optionName: 'Finance Specialist', selected: false, id: 2.5 },
            { optionName: 'Payroll Coordinator', selected: false, id: 2.6 },
            { optionName: 'Corporate Trainer', selected: false, id: 2.7 },
            { optionName: 'General Manager', selected: false, id: 2.8 },
            { optionName: 'Accountant', selected: false, id: 2.9 },
            { optionName: 'Compliance Officer', selected: false, id: 2.10 },
            { optionName: 'Budget Analyst', selected: false, id: 2.11 },
            { optionName: 'Management Analyst', selected: false, id: 2.12 },
            { optionName: 'Human Resources Specialist', selected: false, id: 2.13 },
            { optionName: 'Auditor', selected: false, id: 2.14 },
            { optionName: 'Real Estate Agent', selected: false, id: 2.15 },
            { optionName: 'Lawyer', selected: false, id: 2.16 },
            { optionName: 'Chief Executive Officer', selected: false, id: 2.17 },
          ],
        },
        {
          optionName: 'COMMUNICATIONS',
          id: 3,
          selected: false,
          subOptions: [
            { optionName: 'News Reporter', selected: false, id: 3.1 },
            { optionName: 'Journalist', selected: false, id: 3.2 },
            { optionName: 'Photojournalist', selected: false, id: 3.3 },
            { optionName: 'Copy Editor', selected: false, id: 3.4 },
            { optionName: 'Community Relations Coordinator', selected: false, id: 3.5 },
            { optionName: 'Broadcaster', selected: false, id: 3.6 },
            { optionName: 'Copywriter', selected: false, id: 3.7 },
            { optionName: 'Public Relations Manager', selected: false, id: 3.8 },
            { optionName: 'Publisher', selected: false, id: 3.9 },
            { optionName: 'Production Manager', selected: false, id: 3.10 },
          ],
        },
        {
          optionName: 'EDUCATION',
          id: 4,
          selected: false,
          subOptions: [
            { optionName: 'Substitute Teacher', selected: false, id: 4.1 },
            { optionName: 'Preschool Teacher', selected: false, id: 4.2 },
            { optionName: 'Elementary School Teacher', selected: false, id: 4.3 },
            { optionName: 'Education Coordinator', selected: false, id: 4.4 },
            { optionName: 'Physical Education Teacher', selected: false, id: 4.5 },
            { optionName: 'Tutor', selected: false, id: 4.6 },
            { optionName: 'Guidance Counselor', selected: false, id: 4.7 },
            { optionName: 'High School Teacher', selected: false, id: 4.8 },
            { optionName: 'Special Education Teacher', selected: false, id: 4.9 },
            { optionName: 'Librarian', selected: false, id: 4.10 },
            { optionName: 'School Psychologist', selected: false, id: 4.11 },
            { optionName: 'Director of Education', selected: false, id: 4.12 },
            { optionName: 'Associate Professor', selected: false, id: 4.13 },
            { optionName: 'School Principal', selected: false, id: 4.14 },
          ],
        },
        {
          optionName: 'HEALTH CARE',
          id: 5,
          selected: false,
          subOptions: [
            { optionName: 'Medical Transcriptionist', selected: false, id: 5.1 },
            { optionName: 'Nutritionist', selected: false, id: 5.2 },
            { optionName: 'Paramedic', selected: false, id: 5.3 },
            { optionName: 'Patient Care Technician', selected: false, id: 5.4 },
            { optionName: 'Social Worker', selected: false, id: 5.5 },
            { optionName: 'School Nurse', selected: false, id: 5.6 },
            { optionName: 'Physical Therapist', selected: false, id: 5.7 },
            { optionName: 'Psychologist', selected: false, id: 5.8 },
            { optionName: 'Physician Assistant', selected: false, id: 5.9 },
            { optionName: 'Nurse Practitioner', selected: false, id: 5.10 },
            { optionName: 'Veterinarian', selected: false, id: 5.11 },
            { optionName: 'Radiologist', selected: false, id: 5.12 },
            { optionName: 'Dentist', selected: false, id: 5.13 },
            { optionName: 'Psychiatrist', selected: false, id: 5.14 },
            { optionName: 'Surgeon', selected: false, id: 5.15 },
            { optionName: 'Hospitalist', selected: false, id: 5.16 },
          ],
        },
        {
          optionName: 'HOSPITALITY',
          id: 6,
          selected: false,
          subOptions: [
            { optionName: 'Usher', selected: false, id: 6.1 },
            { optionName: 'Front Desk Receptionist', selected: false, id: 6.2 },
            { optionName: 'Barista', selected: false, id: 6.3 },
            { optionName: 'Reservation Agent', selected: false, id: 6.4 },
            { optionName: 'Baggage Handler', selected: false, id: 6.5 },
            { optionName: 'Housekeeper', selected: false, id: 6.6 },
            { optionName: 'Concierge', selected: false, id: 6.7 },
            { optionName: 'Server', selected: false, id: 6.8 },
            { optionName: 'Retail Sales Associate', selected: false, id: 6.9 },
            { optionName: 'Bartender', selected: false, id: 6.10 },
            { optionName: 'Baker', selected: false, id: 6.11 },
            { optionName: 'Event Planner', selected: false, id: 6.12 },
            { optionName: 'Chef', selected: false, id: 6.13 },
            { optionName: 'Travel Agent', selected: false, id: 6.14 },
            { optionName: 'Customer Service Executive', selected: false, id: 6.15 },
            { optionName: 'Hair Stylist', selected: false, id: 6.16 },
            { optionName: 'Hotel Manager', selected: false, id: 6.17 },
          ],
        },
        {
          optionName: 'INFORMATION TECHNOLOGY',
          id: 7,
          selected: false,
          subOptions: [
            { optionName: 'Computer Forensic Analyst', selected: false, id: 7.1 },
            { optionName: 'Data Analyst', selected: false, id: 7.2 },
            { optionName: 'Computer Programmer', selected: false, id: 7.3 },
            { optionName: 'Web Developer', selected: false, id: 7.4 },
            { optionName: 'Information Security Analyst', selected: false, id: 7.5 },
            { optionName: 'Business Intelligence Analyst', selected: false, id: 7.6 },
            { optionName: 'Network Engineer', selected: false, id: 7.7 },
            { optionName: 'Database Administrator', selected: false, id: 7.8 },
            { optionName: 'Telecommunications Engineer', selected: false, id: 7.9 },
            { optionName: 'Software Engineer', selected: false, id: 7.10 },
            { optionName: 'Network Architect', selected: false, id: 7.11 },
          ],
        },
        {
          optionName: 'LAW ENFORCEMENT',
          id: 8,
          selected: false,
          subOptions: [
            { optionName: 'Correctional Officer', selected: false, id: 8.1 },
            { optionName: 'Law Enforcement Officer', selected: false, id: 8.2 },
            { optionName: 'Police Dispatcher', selected: false, id: 8.3 },
            { optionName: 'Security Officer', selected: false, id: 8.4 },
            { optionName: 'Crime Analyst', selected: false, id: 8.5 },
            { optionName: 'State Trooper', selected: false, id: 8.6 },
            { optionName: 'Criminal Investigator', selected: false, id: 8.7 },
            { optionName: 'Police Sergeant', selected: false, id: 8.8 },
            { optionName: 'Cyber Crime Investigator', selected: false, id: 8.9 },
            { optionName: 'Special Agent', selected: false, id: 8.10 },
          ],
        },
        {
          optionName: 'SALES AND MARKETING',
          id: 9,
          selected: false,
          subOptions: [
            { optionName: 'Brand Ambassador', selected: false, id: 9.1 },
            { optionName: 'Social Media Specialist', selected: false, id: 9.2 },
            { optionName: 'Telemarketer', selected: false, id: 9.3 },
            { optionName: 'Marketing Coordinator', selected: false, id: 9.4 },
            { optionName: 'Advertising Executive', selected: false, id: 9.5 },
            { optionName: 'Social Media Manager', selected: false, id: 9.6 },
            { optionName: 'Digital Campaign Manager', selected: false, id: 9.7 },
            { optionName: 'Account Executive', selected: false, id: 9.8 },
            { optionName: 'Sales Representative', selected: false, id: 9.9 },
            { optionName: 'Market Researcher', selected: false, id: 9.10 },
            { optionName: 'Sales Engineer', selected: false, id: 9.11 },
            { optionName: 'Director of Marketing', selected: false, id: 9.12 },
          ],
        },
        {
          optionName: 'SCIENCE',
          id: 10,
          selected: false,
          subOptions: [
            { optionName: 'Marine Biologist', selected: false, id: 10.1 },
            { optionName: 'Meteorologist', selected: false, id: 10.2 },
            { optionName: 'Environmental Scientist', selected: false, id: 10.3 },
            { optionName: 'Food Technologist', selected: false, id: 10.4 },
            { optionName: 'Microbiologist', selected: false, id: 10.5 },
            { optionName: 'Biologist', selected: false, id: 10.6 },
            { optionName: 'Chemist', selected: false, id: 10.7 },
            { optionName: 'Research Scientist', selected: false, id: 10.8 },
            { optionName: 'Aeronautical Engineer', selected: false, id: 10.9 },
            { optionName: 'Data Scientist', selected: false, id: 10.10 },
          ],
        },
        {
          optionName: 'TRANSPORTATION',
          id: 11,
          selected: false,
          subOptions: [
            { optionName: 'Truck Driver', selected: false, id: 11.1 },
            { optionName: 'Pilot', selected: false, id: 11.2 },
            { optionName: 'Ship Captain', selected: false, id: 11.3 },
          ],
        },
    ]);
    // cities
    const [city, setCity] = useState([
        {   
            id: 8,
            optionName: 'Bakı',
            selected: false,
        },
        {
            id: 9,
            optionName: 'Gəncə',
            selected: false,
        },
        {
            id: 10,
            optionName: 'Sumqayıt',
            selected: false,
        },
        {
            id: 11,
            optionName: 'Şəki',
            selected: false,
        }
    ])
    // job type
    const [type, setType] = useState([
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
    // ages
    const [age, setAge] = useState([
        {   
            id: 8,
            optionName: '18-25',
            selected: false,
        },
        {
            id: 9,
            optionName: '26-30',
            selected: false,
        },
        {
            id: 10,
            optionName: '31-35',
            selected: false,
        },
        {
            id: 11,
            optionName: '36-40',
            selected: false,
        }
    ])
    // job experience
    const [experience, setExperience] = useState([
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
    const [education, setEducation] = useState([
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
    // salary types
    const [salaryType, setSalaryType] = useState([
        {
            id: 1,
            optionName: 'İllik',
            value: 'yearly',
            selected: false,
        },
        {
            id: 2,
            optionName: 'Aylıq',
            value: 'monthly',
            selected: false,
        },
        {
            id: 3,
            optionName: 'Saatlıq',
            value: 'hourly',
            selected: false,
        }
    ])
    
    const {companyJobsData:vacancies} = useSelector(state=>state.companyProfile);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(1);
    const [openFilters, setOpenFilters] = useState(false);
    const handleSort = (column) => {
        if (sortColumn === column) {
          // Toggle sort direction
          setSortDirection(-sortDirection);
        } else {
          // Set the new sorting column and default to ascending
          setSortColumn(column);
          setSortDirection(1);
        }
    };
    const sortedVacancies = [...vacancies].sort((a, b) => {
        if (sortColumn === 'id') {
          return sortDirection * (a.id - b.id);
        } else if (sortColumn === 'active') {
            return sortDirection * (a.active - b.active);
        } else if (sortColumn === 'name') {
            return sortDirection * a.name.localeCompare(b.name);
        } else if (sortColumn === 'category') {
          return sortDirection * a.category.localeCompare(b.category);
        } else if (sortColumn === 'subCategory') {
          return sortDirection * a.subCategory.localeCompare(b.subCategory);
        } else if (sortColumn === 'numberOfViews') {
          return sortDirection * (a.numberOfViews - b.numberOfViews);
        } else if (sortColumn === 'numberOfApplys') {
          return sortDirection * (a.numberOfApplys - b.numberOfApplys);
        } else if (sortColumn === 'city') {
          return sortDirection * a.city.localeCompare(b.city);
        } else if (sortColumn === 'type') {
          return sortDirection * a.type.localeCompare(b.type);
        // } else if (sortColumn === 'age') {
        //   return sortDirection * a.age.localeCompare(b.age);
        } else if (sortColumn === 'experience') {
          return sortDirection * a.experience.localeCompare(b.experience);
        } else if (sortColumn === 'education') {
          return sortDirection * a.education.localeCompare(b.education);
        } else if (sortColumn === 'salary') {
          return sortDirection * (a.salary - b.salary);
        } else if (sortColumn === 'salaryType') {
          return sortDirection * a.salaryType.localeCompare(b.salaryType);
        } else if (sortColumn === 'createdAt') {
          return sortDirection * a.createdAt.localeCompare(b.createdAt);
        } else if (sortColumn === 'endDate') {
          return sortDirection * a.endTime.localeCompare(b.endTime);
        }
        return 0;
    }).filter((item, index)=>{
        return item.name.toLowerCase().includes(searchQuery.toLowerCase())
    });
    // search vacancy
    const searchVacancy = (e) => {
        e.preventDefault();
        // console.log(e.target.search_form_input.value)
        setSearchQuery(e.target.search_form_input.value);
    };
  
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
    // start date changer function
    const startDateChange = (e)=>{
        if(e.target.name === 'minStartDate'){
            setFilter({...filter, minStartDate : e.target.value});
        }else if(e.target.name === 'maxStartDate'){
            setFilter({...filter, maxStartDate: e.target.value});
        }
    }
    // minimum start date onblur function
    const minStartDateBlur = ()=>{
        if(filter.maxStartDate && filter.minStartDate){
            if(filter.minStartDate > filter.maxStartDate){
                toast.warn('Minimum tarix maksimum tarixdən böyük ola bilməz!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return setFilter({...filter, minStartDate : ''});
            }    
        }
    }

    const deactivateVacancy = async (id) => {
        try {
            const {data} = await deactivatevacancy(id);
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

            }
            else{
                toast.warning(data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            console.log('error at deactivate vacancy,error: '+error.name)
        }
    }
   
    // maximum start date onblur function
    const maxStartDateBlur = ()=>{
        if(filter.minStartDate && filter.maxStartDate){
            if(filter.maxStartDate < filter.minStartDate){  
                toast.warn('Maksimum tarix minimum tarixdən kiçik ola bilməz!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });  
                return setFilter({...filter, maxStartDate: ''}); 
            }   
        }
    }
    // end date changer function
    const endDateChange = (e)=>{
        if(e.target.name === 'minEndDate'){
            setFilter({...filter, minEndDate : e.target.value});
        }else if(e.target.name === 'maxEndDate'){
            setFilter({...filter, maxEndDate: e.target.value});
        }
    }
    // minimum start date onblur function
    const minEndDateBlur = ()=>{
        if(filter.maxEndDate && filter.minEndDate){
            if(filter.minEndDate > filter.maxEndDate){
                toast.warn('Minimum tarix maksimum tarixdən böyük ola bilməz!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return setFilter({...filter, minEndDate : ''});
            }    
        }
    }   

    // maximum start date onblur function
    const maxEndDateBlur = ()=>{
        if(filter.minEndDate && filter.maxEndDate){
            if(filter.maxEndDate < filter.minEndDate){  
                toast.warn('Maksimum tarix minimum tarixdən kiçik ola bilməz!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });  
                return setFilter({...filter, maxEndDate: ''}); 
            }   
        }
    }

    const deletejob = async (id) => {
        try {
            const {data} = await deleteJob(id);
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
            }
            dispatch(deleteCompanyJob(id));
            
        } catch (error) {
            console.log('error at deleting job,error:'+error.name);
        }

    }
                    
    // filters opener function
    const openFiltersBox = ()=>{
        setOpenFilters(!openFilters);
    }

    const goDetail = (id) => {
        navigate('/vacancies/'+id);
        localStorage.removeItem('c_r_r_n_t');
        dispatch(updateCurrentJob(null));
    }

    return ( 
        <div className="company_profile_my_vacancies_container">
            {/* vakancy search form and new vacancy create button */}
            <div className="c_p_m_v_Search_form_and_new_cont">
                <form onSubmit={searchVacancy} className='c_p_m_v_Search_form'>
                    <input className='c_p_m_v_Search_form_input' name='search_form_input' type="text" placeholder='Vakansiyaları axtarın'/>
                    <button className='c_p_m_v_Search_form_sbmt' type="submit">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
                {/* filter button and create vacancy button */}
                <div className="c_p_m_v_Search_form_flt_btn_and_link">
                    <button className="c_p_m_v_Search_form_open_filters" onClick={openFiltersBox} title='Filter'>
                        <FontAwesomeIcon icon={faFilter} />
                    </button>
                    {/* create new vacancy  */}
                    <Link to={'/company_profile/vacancies/create_vacancy'} className="c_p_m_v_Search_form_create_new_vac">
                        <FontAwesomeIcon icon={faPlus} />
                        Yeni Vakansiya
                    </Link>
                </div>
            </div>
            {/* filters container */}
            <div className={`c_p_m_v_filters_container ${openFilters && 'c_p_m_v_filters_close'}`}>
                <ul className='c_p_m_v_filters'>
                    <li className='c_p_m_v_filters_list_item'>
                        <CustomSelectOption key="status" select_option_name={'Status'} select_option_id="active" subOptionId='' select_option_array={active} select_update={setActive} filter={filter} setFilter={setFilter}/>
                    </li>
                    <li className='c_p_m_v_filters_list_item'>
                        <CustomSelectOptionForCreatVacancy  subs={subs} setsubs={setsubs} key={'category'} select_option_name={'Kateqoriya'} select_option_id="category" subOptionId='category' select_option_array={category} select_update={setCategories} filter={filter} setFilter={setFilter}/>
                    </li>
                    <li className='c_p_m_v_filters_list_item'>
                        <CustomSelectOptionForCreatVacancy key={'sub_category'} select_option_name={'Alt Kateqoriya'} select_option_id="subCategory" subOptionId='subCategory' select_option_array={findSubForMain(category,subs)} select_update={setCategories} filter={filter} setFilter={setFilter} setsubs={setsubs} subs={subs}/>
                    </li>
                    <li className='c_p_m_v_filters_list_item'>
                        <CustomSelectOption select_option_name={'Şəhər'} select_option_id="city" select_option_array={city} select_update={setCity} filter={filter} setFilter={setFilter}/>       
                    </li>
                    <li className='c_p_m_v_filters_list_item'>
                        <CustomSelectOption select_option_name={'İş qrafiki'} select_option_id="type" select_option_array={type} select_update={setType} filter={filter} setFilter={setFilter}/>
                    </li>
                    <li className='c_p_m_v_filters_list_item'>
                        <CustomSelectOption select_option_name={'Yaş'} select_option_id="age" select_option_array={age} select_update={setAge} filter={filter} setFilter={setFilter}/>       
                    </li>
                    <li className='c_p_m_v_filters_list_item'>
                        <CustomSelectOption select_option_name={'İş təcrübəsi'} select_option_id="experience" select_option_array={experience} select_update={setExperience} filter={filter} setFilter={setFilter}/>
                    </li>
                    <li className='c_p_m_v_filters_list_item'>
                        <CustomSelectOption select_option_name={'Təhsil səviyyəsi'} select_option_id="education" select_option_array={education} select_update={setEducation} filter={filter} setFilter={setFilter}/>
                    </li>
                    <li className='c_p_m_v_filters_list_item'>
                        <CustomSelectOption select_option_name={'Əmək haqqı tipi'} select_option_id="salaryType" select_option_array={salaryType} select_update={setSalaryType} filter={filter} setFilter={setFilter}/>
                    </li>
                    {/* salary inputs */}
                    <li className='c_p_m_v_filters_list_item'>
                        <div className="c_p_m_v_filters_name">Əmək haqqı</div>
                        {/* minimum or maximum salary */}
                        <div className="c_p_m_v_filters_two_inp_cont">
                            {/* minimum salary */}
                            <input type="number" name='min_salary' className={`c_p_m_v_filters_salary_input ${filter.min_salary ? "c_p_m_v_filters_active_input" : ''}`} value={filter.min_salary ? filter.min_salary : ''} onChange={salaryFiltChange} placeholder='Min'/>
                            {/* maximum salary */}
                            <input type="number" name='max_salary' className={`c_p_m_v_filters_salary_input ${filter.max_salary ? "c_p_m_v_filters_active_input" : ''}`} value={filter.max_salary ? filter.max_salary : ''} onChange={salaryFiltChange} placeholder='Max'/>
                        </div>
                    </li> 
                    {/* dates for start  */}
                    <li className='c_p_m_v_filters_list_item'>
                        <div className="c_p_m_v_filters_name">Başlama tarixi</div>
                        {/* minimum or maximum salary */}
                        <div className="c_p_m_v_filters_two_inp_cont">
                            <div className="c_p_m_v_filters_two_inp">
                                <span className="c_p_m_v_filters_two_inp_label">Minimum Tarix</span>
                                {/* minimum date */}
                                <input type="date" name='minStartDate' max={filter.maxStartDate ? filter.maxStartDate : ''} className={`c_p_m_v_filter_date_inputs ${filter.minStartDate ? "c_p_m_v_filters_active_input" : ''}`} value={filter.minStartDate ? filter.minStartDate : ''} onChange={startDateChange} onBlur={minStartDateBlur}/>
                            </div>
                            <div className="c_p_m_v_filters_two_inp">
                                <span className="c_p_m_v_filters_two_inp_label">Maksimum Tarix</span>
                                {/* maximum date */}
                                <input type="date" name='maxStartDate' min={filter.minStartDate ? filter.minStartDate: ''} className={`c_p_m_v_filter_date_inputs ${filter.maxStartDate ? "c_p_m_v_filters_active_input" : ''}`} value={filter.maxStartDate ? filter.maxStartDate : ''} onChange={startDateChange} onBlur={maxStartDateBlur}/>
                            </div>
                        </div>
                    </li> 
                    {/* dates for end  */}
                    <li className='c_p_m_v_filters_list_item'>
                        <div className="c_p_m_v_filters_name">Bitmə tarixi</div>
                        {/* minimum or maximum salary */}
                        <div className="c_p_m_v_filters_two_inp_cont">
                            <div className="c_p_m_v_filters_two_inp">
                                <div className="c_p_m_v_filters_two_inp_label">Minimum Tarix</div>
                                {/* minimum date */}
                                <input type="date" name='minEndDate' max={filter.maxEndDate ? filter.maxEndDate : ''} className={`c_p_m_v_filter_date_inputs ${filter.minEndDate ? "c_p_m_v_filters_active_input" : ''}`} value={filter.minEndDate ? filter.minEndDate : ''} onChange={endDateChange} onBlur={minEndDateBlur}/>
                            </div>
                            <div className="c_p_m_v_filters_two_inp">
                                <span className="c_p_m_v_filters_two_inp_label">Maksimum Tarix</span>
                                {/* maximum date */}
                                <input type="date" name='maxEndDate' min={filter.minEndDate ? filter.minEndDate : ''} className={`c_p_m_v_filter_date_inputs ${filter.maxEndDate ? "c_p_m_v_filters_active_input" : ''}`} value={filter.maxEndDate ? filter.maxEndDate : ''} onChange={endDateChange} onBlur={maxEndDateBlur}/>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            {/* vacancies table */}
            {sortedVacancies.length > 0 ?
            <div className='c_p_vacancies_table_container'>
                <table className="c_p_vacancies_table">
                    <thead>
                        <tr className="c_p_vacancies_table_head">
                            <th className="c_p_count" onClick={() => handleSort('id')}>
                                №
                                {sortColumn === 'id' && (
                                    sortDirection === 1 ? 
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortUp} /></span> 
                                    :
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortDown} /></span> 
                                )}
                            </th>
                            <th className="c_p_status" onClick={() => handleSort('active')}>
                                Status
                                {sortColumn === 'active' && (
                                    sortDirection === 1 ? 
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortUp} /></span> 
                                    :
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortDown} /></span> 
                                )}
                            </th>
                            <th className="c_p_vacancy_name" onClick={() => handleSort('name')}>
                                Vacansiya Adı
                                {sortColumn === 'name' && (
                                    sortDirection === 1 ? 
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortUp} /></span> 
                                    :
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortDown} /></span> 
                                )}
                            </th>
                            <th className="c_p_category" onClick={() => handleSort('category')}>
                                Kateqoriya
                                {sortColumn === 'category' && (
                                    sortDirection === 1 ? 
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortUp} /></span> 
                                    :
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortDown} /></span> 
                                )}
                            </th>
                            <th className="c_p_subcategory" onClick={() => handleSort('subCategory')}>
                                Alt kateqoriya
                                {sortColumn === 'subCategory' && (
                                    sortDirection === 1 ? 
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortUp} /></span> 
                                    :
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortDown} /></span> 
                                )}
                            </th>
                            <th className="c_p_views_count" onClick={() => handleSort('numberOfViews')}>
                                Baxış sayı
                                {sortColumn === 'numberOfViews' && (
                                    sortDirection === 1 ? 
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortUp} /></span> 
                                    :
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortDown} /></span> 
                                )}
                            </th>
                            <th className="c_p_applies_count" onClick={() => handleSort('numberOfApplys')}>
                                Müraciət sayı
                                {sortColumn === 'numberOfApplys' && (
                                    sortDirection === 1 ? 
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortUp} /></span> 
                                    :
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortDown} /></span> 
                                )}
                            </th>
                            <th className="c_p_city" onClick={() => handleSort('city')}>
                                Şəhər
                                {sortColumn === 'city' && (
                                    sortDirection === 1 ? 
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortUp} /></span> 
                                    :
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortDown} /></span> 
                                )}
                            </th>
                            <th className="c_p_job_type" onClick={() => handleSort('type')}>
                                İş qrafiki
                                {sortColumn === 'type' && (
                                    sortDirection === 1 ? 
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortUp} /></span> 
                                    :
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortDown} /></span> 
                                )}
                            </th>
                            <th className="c_p_age" onClick={() => handleSort('age')}>
                                Yaş
                                {sortColumn === 'age' && (
                                    sortDirection === 1 ? 
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortUp} /></span> 
                                    :
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortDown} /></span> 
                                )}
                            </th>
                            <th className="c_p_experience" onClick={() => handleSort('experience')}>
                                Təcrübə
                                {sortColumn === 'experience' && (
                                    sortDirection === 1 ? 
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortUp} /></span> 
                                    :
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortDown} /></span> 
                                )}
                            </th>
                            <th className="c_p_education_level" onClick={() => handleSort('education')}>
                                Təhsil səviyyəsi
                                {sortColumn === 'education' && (
                                    sortDirection === 1 ? 
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortUp} /></span> 
                                    :
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortDown} /></span> 
                                )}
                            </th>
                            <th className="c_p_salary" onClick={() => handleSort('salary')}>
                                Əmək haqqı
                                {sortColumn === 'salary' && (
                                    sortDirection === 1 ? 
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortUp} /></span> 
                                    :
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortDown} /></span> 
                                )}
                            </th>
                            <th className="c_p_salary_type" onClick={() => handleSort('salaryType')}>
                                Əmək haqqı tipi
                                {sortColumn === 'salaryType' && (
                                    sortDirection === 1 ? 
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortUp} /></span> 
                                    :
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortDown} /></span> 
                                )}
                            </th>
                            <th className="c_p_start_date" onClick={() => handleSort('createdAt')}>
                                Başlama tarixi
                                {sortColumn === 'createdAt' && (
                                    sortDirection === 1 ? 
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortUp} /></span> 
                                    :
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortDown} /></span> 
                                )}
                            </th>
                            <th className="c_p_end_date" onClick={() => handleSort('endTime')}>
                                Son tarix
                                {sortColumn === 'endTime' && (
                                    sortDirection === 1 ? 
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortUp} /></span> 
                                    :
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortDown} /></span> 
                                )}
                            </th>
                            <th className="c_p_actions">
                                İdarəetmə
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {sortedVacancies.map((vacancy, index) => (
                        <tr key={vacancy._id}>
                            <td className="c_p_count">{index+1}</td>
                            <td onClick={()=>deactivateVacancy(vacancy._id)} className="c_p_status" title={vacancy.active ? 'deactive et':'active et'}>
                                {
                                    vacancy.active ? 
                                    <span className="c_p_status_sign c_p_status_active">Aktiv</span>
                                    :
                                    <span className="c_p_status_sign c_p_status_deactive">Deaktiv</span>
                                }
                            </td>
                            <td className="c_p_vacancy_name"><Link to={`/vacancies/${vacancy._id}`}>{vacancy.name}</Link></td>
                            <td className="c_p_category">{vacancy.category}</td>
                            <td className="c_p_subcategory">{vacancy.subCategory}</td>
                            <td className="c_p_views_count">{vacancy.numberOfViews}</td>
                            <td className="c_p_applies_count">{vacancy.numberOfApplys}</td>
                            <td className="c_p_city">{vacancy.city}</td>
                            <td className="c_p_job_type">{vacancy.type}</td>
                            <td className="c_p_age">{vacancy.age}</td>
                            <td className="c_p_experience">{vacancy.experience}</td>
                            <td className="c_p_education_level">{vacancy.education}</td>
                            <td className="c_p_salary">{vacancy.salary}</td>
                            <td className="c_p_salary_type">{vacancy.salaryType}</td>
                            <td className="c_p_start_date">{vacancy.createdAt.split('T')[0]}</td>
                            <td className="c_p_end_date">{vacancy.endTime.split('T')[0]}</td>
                            <td className="c_p_actions">
                                <Link to={`/company_profile/vacancies/create_vacancy/?editvacancy=${vacancy._id}&category=${vacancy.category}&subCategory=${vacancy.subCategory}&name=${vacancy.name}&city=${vacancy.city}&age=${vacancy.age}&type=${vacancy.type}&experience=${vacancy.experience}&education=${vacancy.education}&descriptionOfVacancy=${vacancy.descriptionOfVacancy}&specialRequirements=${vacancy.specialRequirements.join(',')}&skills=${vacancy.skills.join(',')}&salary=${vacancy.salary}&salaryType=${vacancy.salaryType}&agreedSalary=${vacancy.agreedSalary}&endTime=${vacancy.endTime.split('T')[0]}&premium=${vacancy.premium}`} className="c_p_actions_btn c_p_edit" title='Redaktə et'>
                                    <FontAwesomeIcon icon={faPen} />
                                </Link>
                                <button onClick={()=>deletejob(vacancy._id)} className="c_p_actions_btn c_p_deactivate" title='Sil'>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <button onClick={()=>goDetail(vacancy._id)} className="c_p_actions_btn c_p_details">
                                    Ətraflı
                                    <FontAwesomeIcon icon={faArrowRightLong} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div> : <div className='company_profile_my_vacancies_error'>Mövcud Vakansiya yoxdur!</div>}
        </div>
     );
}

export default CompanyProfileMyVacancies;
