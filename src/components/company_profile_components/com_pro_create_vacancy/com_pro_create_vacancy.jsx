import { useEffect, useState } from 'react';
import CustomSelectOption from '../../custom_select_option/custom_select_option';
import CustomSelectOptionForCreatVacancy from './custom_select_option_for_creat_vacancy'
import './com_pro_create_vacancy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faClock } from '@fortawesome/free-regular-svg-icons';
import { faCalendar, faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CreatePremiumForVacany from './c_p_c_v_create_premium/c_p_c_v_create_premium';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getJobWithId } from '../../../apiservices';
function ComProCreateVacancy() {
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    const [specReqVal, setSpecReqVal] = useState('');
    const [specSkillsVal, setSpecSkillsVal] = useState('');
    const [completed, setCompleted] = useState(false);
    const {companyJobsData:vacancies} = useSelector(state=>state.companyProfile);
    const location = useLocation(); 
    const searchParams = new URLSearchParams(location.search); 
    // console.log(searchParams.get('specialRequirements').split(','))
    const editableVacancyId = searchParams.get('editvacancy')
    const [editablevanacy,seteditablevacancy] = useState(null);
    const [filter, setFilter] = useState({
        category:searchParams.get('category') ||  "",
        subCategory: searchParams.get('subCategory') ||"",
        name: searchParams.get('name') ||"",
        city:searchParams.get('city') || "",
        age:searchParams.get('age') || "",
        type:searchParams.get('type') || "",
        experience:searchParams.get('experience') || "",
        education:searchParams.get('education') || "",
        descriptionOfVacancy:searchParams.get('descriptionOfVacancy') || "<p><br></p>",
        specialRequirements:searchParams.get('specialRequirements')?.split(',') || [],
        skills:searchParams.get('skills')?.split(',') || [],
        salary:searchParams.get('salary') || 0,
        salaryType:searchParams.get('salaryType') || "",
        agreedSalary: JSON.parse(searchParams.get('agreedSalary')),
        endTime:searchParams.get('endTime') || "",
        premium:JSON.parse(searchParams.get('premium'))===null ?false :JSON.parse(searchParams.get('premium'))
    })
    const [salaryTypes, setSalaryTypes] = useState([
        {
            id: 1,
            selected:filter.salaryType === 'Saatlıq',
            icon: <FontAwesomeIcon icon={faClock} />,
            type: 'Saatlıq'
        },
        {
            id: 2,
            selected:filter.salaryType === 'Aylıq',
            icon: <FontAwesomeIcon icon={faCalendarDays} />,
            type: 'Aylıq'
        },
        {
            id: 3,
            selected: filter.salaryType === 'İllik',
            icon: <FontAwesomeIcon icon={faCalendar} />,
            type: 'İllik'
        }
    ]) 
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
            { optionName: 'UI/UX designer', selected: false, id: 1.15 },
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
      
    // filter
    
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
    
    // _________ error message for form ____________ 
    const [errorMessage, setErrorMessage] = useState({
        errorCheck: false,
        errorContent: ''
    })
    // checkbox function for agreed salary
    const acceptAgreedSalaryFunc = ()=>{
        setFilter({...filter, salary: '', salaryType: '', agreedSalary: !filter.agreedSalary});
        salaryTypes.map((itemA, indexA)=>{
            itemA.selected = false;
        })
        setSalaryTypes([...salaryTypes]);
    }
    // const [selectedDate, setSelectedDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    // max date set
    useEffect(() => {
        const today = new Date();
        const maxDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());

        // Format the maximum date as YYYY-MM-DD
        const maxDateFormatted = maxDate.toISOString().split('T')[0];

        setMaxDate(maxDateFormatted);
    }, []);
    // date change
    const handleDateChange = (event) => {
        setFilter({...filter, endTime: event.target.value});
    };
    // date checker for maximum and minimum when writing in input field
    const handleBlur = () => {
        const selectedDateObj = new Date(filter.endTime);
        const maxDateObj = new Date(maxDate);
        const min_date = new Date(minDate);

        if (selectedDateObj > maxDateObj || min_date > selectedDateObj) {
          toast.warn('Tarixi yalnız 1 il ərzində seçə bilərsiniz', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
          setFilter({...filter, endTime: ''});
        }
        
      };
    // change salary types
    const changeSalaryTypeF = (item)=>{
        salaryTypes.map((itemA, indexA)=>{
            if(itemA.id !== item.id){
                itemA.selected = false;
            }
            if(itemA.id === item.id && itemA.selected === false){
                itemA.selected = true;
                setFilter({...filter, salaryType: itemA.type, agreedSalary: false});
            }
        })
        setSalaryTypes([...salaryTypes]);
    }
    // change vacancy name
    const vacancyNameChange = (e)=>{
        setFilter({...filter, name: e.target.value});
    }
    // change salary
    const changeVacSalary = (e)=>{
        setFilter({...filter, salary: e.target.value, agreedSalary: false});
    }
    // react quill toolbar options
    const modules = {
      toolbar: [
        // [{ 'header': '1' }, { 'header': '2' }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],  
        [{ 'align': [] }],
        ['clean'] 
      ],
    };
    // vacancy description
    const changeVacancyDescription =(e)=>{
        setFilter({...filter, descriptionOfVacancy: e});
    }
    // change special requierements
    const specReqChange = (e)=>{
        setSpecReqVal(e.target.value);
    }
    // add special requirements function
    const addSpecReqFunc =()=>{
        if(specReqVal.length > 0){
            setFilter({...filter, specialRequirements: [...filter.specialRequirements, specReqVal]});   
            setSpecReqVal(''); 
        }
    }
    // add special requirements function when pressing ENTER button
    const enterAddSpecReq = (e)=>{
        if(e.key === 'Enter'){
            addSpecReqFunc();
            e.preventDefault();
        }
    }
    // change special skills value
    const specialSkillsChange =(e)=>{
        setSpecSkillsVal(e.target.value);
    }
    // add special skills function
    const addSpecialSkills = ()=>{
        if(specSkillsVal.length > 0){
            setFilter({...filter, skills: [...filter.skills, specSkillsVal]});  
            setSpecSkillsVal('');
        }
    }
    // add special skills function when pressing ENTER button
    const enterAddSpecialSkills = (e)=>{
        if(e.key === 'Enter'){
            addSpecialSkills();
            e.preventDefault();
        }
    }
    const removeSpecSkills = (index)=>{
        const filteredSkills = filter.skills.filter((itemR, indexR)=> indexR != index);
        setFilter({...filter, skills: [...filteredSkills]});
    }
    // form submit function
    const post_vacancy_form_submit = (e)=>{
        e.preventDefault();
        if(filter.category && filter.subCategory && filter.name && filter.city && filter.type && filter.experience && filter.education && filter.descriptionOfVacancy != "<p><br></p>" && filter.specialRequirements.length >0 && filter.skills.length >0 && (filter.agreedSalary || (filter.salary && filter.salaryType)) && filter.endTime){
            // submit to database, Mr Shixkarim
            setErrorMessage({...errorMessage, errorCheck:false, errorContent: ''});
            // console.log('ready to goooooooo!');
            // go to premium
            setCompleted(true);
        }else if(!filter.category){
            setErrorMessage({...errorMessage, errorCheck:true, errorContent: 'Kateqoriya seçilməyib !'});
        }else if(!filter.subCategory){
            setErrorMessage({...errorMessage, errorCheck:true, errorContent: 'Alt kateqoriya seçilməyib !'});
        }else if(!filter.city){
            setErrorMessage({...errorMessage, errorCheck:true, errorContent: 'Şəhər seçilməyib !'});
        }else if(!filter.type){
            setErrorMessage({...errorMessage, errorCheck:true, errorContent: 'İş qrafiki seçilməyib !'});
        }else if(!filter.experience){
            setErrorMessage({...errorMessage, errorCheck:true, errorContent: 'İş təcrübəsi seçilməyib !'});
        }else if(!filter.education){
            setErrorMessage({...errorMessage, errorCheck:true, errorContent: 'Təhsil səviyyəsi seçilməyib !'});
        }else if(filter.descriptionOfVacancy === "<p><br></p>"){
            setErrorMessage({...errorMessage, errorCheck:true, errorContent: 'Vakansiya təsviri yazılmayıb !'});
        }else if(filter.specialRequirements.length === 0){
            setErrorMessage({...errorMessage, errorCheck:true, errorContent: 'Xüsusi tələblər yazılmayıb !'});
        }else if(filter.skills.length === 0){
            setErrorMessage({...errorMessage, errorCheck:true, errorContent: 'Bacarıqlar yazılmayıb !'});
        }else if(filter.agreedSalary === false){
            if(!filter.salary){
                setErrorMessage({...errorMessage, errorCheck:true, errorContent: 'Maaş yazılmayıb !'});    
            }else if(!filter.salaryType){
                setErrorMessage({...errorMessage, errorCheck:true, errorContent: 'Maaş tipi seçilməyib !'}); 
            }
        }
    }
    // console.log(filter)
    return ( 
        <>{completed ? 
            <CreatePremiumForVacany editvacancy={editableVacancyId} setCompleted = {setCompleted} filter={filter} setFilter={setFilter}/>:
        <div className="com_pro_create_vacancy_container">
            {/* page head text */}
            <div className="com_pro_create_vacancy_p_title">Yeni Vakansiya</div>
            {/* vacancy create form container*/}
            <div className="com_pro_create_vacancy_form_container">
                {/* vacancy create form */}
                <form className="com_pro_create_vacancy_form" onSubmit={post_vacancy_form_submit}>
                    {/* form one line => category */}
                    <div className="com_pro_create_vacancy_form_line">
                        {/* name and description */}
                        <div className="com_pro_create_vacancy_form_line_name_and_desc">
                            {/* line name */}
                            <div className="com_pro_create_vacancy_form_line_name">Kateqoriya</div>
                            {/* line description */}
                            <div className="com_pro_create_vacancy_form_line_desc">Vakansiyanın aid olduğu əsas kateqoriyanı seçin</div>
                        </div>
                        {/* form input */}
                        <div className="com_pro_create_vacancy_form_line_input">
                            <div className="com_pro_create_vacancy_form_options">
                                <CustomSelectOptionForCreatVacancy  subs={subs} setsubs={setsubs} key={'category'} select_option_name={'Kateqoriya'} select_option_id="category" subOptionId='category' select_option_array={category} select_update={setCategories} filter={filter} setFilter={setFilter}/>
                            </div>
                        </div>
                    </div>
                    {/* form one line sub category */}
                    <div className="com_pro_create_vacancy_form_line">
                        {/* name and description */}
                        <div className="com_pro_create_vacancy_form_line_name_and_desc">
                            {/* line name */}
                            <div className="com_pro_create_vacancy_form_line_name">Alt Kateqoriya</div>
                            {/* line description */}
                            <div className="com_pro_create_vacancy_form_line_desc">Vakansiyanın aid olduğu alt kateqoriyanı seçin</div>
                        </div>
                        {/* form input */}
                        <div className="com_pro_create_vacancy_form_line_input">
                            <div className="com_pro_create_vacancy_form_options">
                                <CustomSelectOptionForCreatVacancy key={'sub_category'} select_option_name={'Alt Kateqoriya'} select_option_id="subCategory" subOptionId='subCategory' select_option_array={findSubForMain(category,subs)} select_update={setCategories} filter={filter} setFilter={setFilter} setsubs={setsubs} subs={subs}/>
                            </div>
                        </div>
                    </div>
                    {/* form one line vacancy name */}
                    <div className="com_pro_create_vacancy_form_line">
                        {/* name and description */}
                        <div className="com_pro_create_vacancy_form_line_name_and_desc">
                            {/* line name */}
                            <div className="com_pro_create_vacancy_form_line_name">Vakansiya adı</div>
                            {/* line description */}
                            <div className="com_pro_create_vacancy_form_line_desc">Vakansiya üçün uyğun ad yazın</div>
                        </div>
                        {/* form input */}
                        <div className="com_pro_create_vacancy_form_line_input">
                            <input className='com_pro_create_vacancy_form_line_input_txt' value={filter.name} onChange={vacancyNameChange} type="text" name="vacancy_name" placeholder='Baş mühasib' required/>
                        </div>
                    </div>
                    {/* form one line => city */}
                    <div className="com_pro_create_vacancy_form_line">
                        {/* name and description */}
                        <div className="com_pro_create_vacancy_form_line_name_and_desc">
                            {/* line name */}
                            <div className="com_pro_create_vacancy_form_line_name">Şəhər</div>
                            {/* line description */}
                            <div className="com_pro_create_vacancy_form_line_desc">Şirkətin olduğu şəhəri yazın</div>
                        </div>
                        {/* form input */}
                        <div className="com_pro_create_vacancy_form_line_input">
                            <div className="com_pro_create_vacancy_form_options">
                                <CustomSelectOption select_option_name={'Şəhər'} select_option_id="city" select_option_array={city} select_update={setCity} filter={filter} setFilter={setFilter}/>       
                            </div>
                        </div>
                    </div>
                    {/* form one line => job type */}
                    <div className="com_pro_create_vacancy_form_line">
                        {/* name and description */}
                        <div className="com_pro_create_vacancy_form_line_name_and_desc">
                            {/* line name */}
                            <div className="com_pro_create_vacancy_form_line_name">İş qrafiki</div>
                            {/* line description */}
                            <div className="com_pro_create_vacancy_form_line_desc">İş vaxtı üçün qrafik seçin</div>
                        </div>
                        {/* form input */}
                        <div className="com_pro_create_vacancy_form_line_input">
                            <div className="com_pro_create_vacancy_form_options">
                                <CustomSelectOption select_option_name={'İş qrafiki'} select_option_id="type" select_option_array={type} select_update={setType} filter={filter} setFilter={setFilter}/>
                            </div>
                        </div>
                    </div>
                    {/* form one line => age */}
                    <div className="com_pro_create_vacancy_form_line">
                        {/* name and description */}
                        <div className="com_pro_create_vacancy_form_line_name_and_desc">
                            {/* line name */}
                            <div className="com_pro_create_vacancy_form_line_name">Yaş</div>
                            {/* line description */}
                            <div className="com_pro_create_vacancy_form_line_desc">Namizəd üçün uyğun olan yaşı qeyd edin</div>
                        </div>
                        {/* form input */}
                        <div className="com_pro_create_vacancy_form_line_input">
                            <div className="com_pro_create_vacancy_form_options">
                                <CustomSelectOption select_option_name={'Yaş'} select_option_id="age" select_option_array={age} select_update={setAge} filter={filter} setFilter={setFilter}/>       
                            </div>
                        </div>
                    </div>
                    {/* form one line => experience */}
                    <div className="com_pro_create_vacancy_form_line">
                        {/* name and description */}
                        <div className="com_pro_create_vacancy_form_line_name_and_desc">
                            {/* line name */}
                            <div className="com_pro_create_vacancy_form_line_name">İş təcrübəsi</div>
                            {/* line description */}
                            <div className="com_pro_create_vacancy_form_line_desc">Namizəd üçün tələb olunan iş təcrübəsini seçin</div>
                        </div>
                        {/* form input */}
                        <div className="com_pro_create_vacancy_form_line_input">
                            <div className="com_pro_create_vacancy_form_options">
                                <CustomSelectOption select_option_name={'İş təcrübəsi'} select_option_id="experience" select_option_array={experience} select_update={setExperience} filter={filter} setFilter={setFilter}/>
                            </div>
                        </div>
                    </div>
                    {/* form one line => education */}
                    <div className="com_pro_create_vacancy_form_line">
                        {/* name and description */}
                        <div className="com_pro_create_vacancy_form_line_name_and_desc">
                            {/* line name */}
                            <div className="com_pro_create_vacancy_form_line_name">Təhsil səviyyəsi</div>
                            {/* line description */}
                            <div className="com_pro_create_vacancy_form_line_desc">Namizəd üçün tələb olunan təhsil səviyyəsini seçin</div>
                        </div>
                        {/* form input */}
                        <div className="com_pro_create_vacancy_form_line_input">
                            <div className="com_pro_create_vacancy_form_options">
                                <CustomSelectOption select_option_name={'Təhsil səviyyəsi'} select_option_id="education" select_option_array={education} select_update={setEducation} filter={filter} setFilter={setFilter}/>
                            </div>
                        </div>
                    </div>
                    {/* form one line => description */}
                    <div className="com_pro_create_vacancy_form_line">
                        {/* name and description */}
                        <div className="com_pro_create_vacancy_form_line_name_and_desc">
                            {/* line name */}
                            <div className="com_pro_create_vacancy_form_line_name">Vakansiyanın təsviri</div>
                            {/* line description */}
                            <div className="com_pro_create_vacancy_form_line_desc">Vakansiyanı təsvir edən cümlələr yazın</div>
                        </div>
                        {/* form input */}
                        <div className="com_pro_create_vacancy_form_line_input">
                            {/* rich text editor goes here */}
                            <ReactQuill theme="snow" modules={modules} value={filter.descriptionOfVacancy} onChange={changeVacancyDescription} />
                        </div>
                    </div>
                    {/* form one line special requirements*/}
                    <div className="com_pro_create_vacancy_form_line">
                        {/* name and description */}
                        <div className="com_pro_create_vacancy_form_line_name_and_desc">
                            {/* line name */}
                            <div className="com_pro_create_vacancy_form_line_name">Xüsusi tələblər</div>
                            {/* line description */}
                            <div className="com_pro_create_vacancy_form_line_desc">Vakansiya üçün xüsusi tələbləri əlavə edin</div>
                        </div>
                        {/* form input */}
                        <div className="com_pro_create_vacancy_form_line_sub_form">
                            {/* to do list add form for speacial requirements */}
                            <div className='com_pro_create_vacancy_form_line_sub_form_cont'>
                                {/* form input */}
                                <input type="text" placeholder='Tələblər' value={specReqVal} onChange={specReqChange} onKeyDown={enterAddSpecReq} className='com_pro_create_vacancy_form_line_sub_form_input'/>
                                {/* submit button */}
                                <div className='com_pro_create_vacancy_form_line_sub_form_submit' onClick={addSpecReqFunc}>Əlavə et</div>
                                {/* <input type="submit" className='com_pro_create_vacancy_form_line_sub_form_submit' value="Əlavə et" /> */}
                            </div>
                            {/* to do contents for speacial requirements*/}
                            {
                                filter.specialRequirements.length > 0 ?
                                <div className="com_pro_create_vacancy_form_line_sub_form_contents">
                                    <ul className="c_p_c_v_sub_form_cont_list">
                                     {
                                        filter.specialRequirements.map((item, index)=>{
                                            return <li key={index}>{item}</li>
                                        })
                                     }   
                                    </ul>
                                </div>
                                : ''
                            }
                        </div>
                    </div>
                    {/* form one line => special skills*/}
                    <div className="com_pro_create_vacancy_form_line">
                        {/* name and description */}
                        <div className="com_pro_create_vacancy_form_line_name_and_desc">
                            {/* line name */}
                            <div className="com_pro_create_vacancy_form_line_name">Xüsusi Bacarıqlar</div>
                            {/* line description */}
                            <div className="com_pro_create_vacancy_form_line_desc">Vakansiya üçün xüsusi bacarıqları əlavə edin</div>
                        </div>
                        {/* form input */}
                        <div className="com_pro_create_vacancy_form_line_sub_form">
                            {/* to do list add form for speacial requirements */}
                            <div className='com_pro_create_vacancy_form_line_sub_form_cont'>
                                {/* form input */}
                                <input type="text" placeholder='Word, Python, AutoCad' value={specSkillsVal} onChange={specialSkillsChange} onKeyDown={enterAddSpecialSkills} className='com_pro_create_vacancy_form_line_sub_form_input'/>
                                {/* submit button */}
                                <div className='com_pro_create_vacancy_form_line_sub_form_submit' onClick={addSpecialSkills}>Əlavə et</div>
                                {/* <input type="submit" className='com_pro_create_vacancy_form_line_sub_form_submit' value="Əlavə et" /> */}
                            </div>
                            {/* to do contents for speacial requirements*/}
                            {
                                filter.skills.length > 0 ?
                                <div className="com_pro_create_vacancy_form_line_sub_form_contents">
                                    {/* special requirements */}
                                    <ul className="c_p_c_v_sub_form_spec_req">
                                        {
                                            filter.skills.map((item, index)=>{
                                                return <li key={index}>
                                                            {item}
                                                            <FontAwesomeIcon icon={faXmark} onClick={()=> removeSpecSkills(index)}/>
                                                        </li>
                                            })
                                        }
                                    </ul>
                                </div>
                                :''
                            }
                            
                        </div>
                    </div>
                    {/* form one line => salary*/}
                    <div className="com_pro_create_vacancy_form_line">
                        {/* name and description */}
                        <div className="com_pro_create_vacancy_form_line_name_and_desc">
                            {/* line name */}
                            <div className="com_pro_create_vacancy_form_line_name">Əmək haqqı</div>
                            {/* line description */}
                            <div className="com_pro_create_vacancy_form_line_desc">Vakansiya üçün uyğun olan əmək haqqı tipini seçin və dəyərini yazın</div>
                        </div>
                        {/* form input */}
                        <div className="com_pro_create_vacancy_form_line_input">
                            {/* salary types boxes container*/}
                            <div className="com_pro_create_vacancy_form_salary_types">
                                {
                                    salaryTypes.map((item, index)=>{
                                        return <div className="com_pro_create_vacancy_form_salary_type_box" key={item.id} onClick={()=> {changeSalaryTypeF(item)}}>
                                        {/* active cicrle */}
                                        <div className={`com_pro_create_vacancy_form_salary_type_box_active ${item.selected ? 'salary_type_box_active_selected': ''}`}></div>
                                        <div className="com_pro_crt_vcn_fm_sal_typ_bx_icon_and_name">
                                            {item.icon}
                                            <div className="com_pro_crt_vcn_fm_sal_typ_bx_name">{item.type}</div>
                                        </div>
                                    </div>
                                    })
                                }
                            </div>
                            {/* salary input */}
                            <input type="number" value={filter.salary} onChange={changeVacSalary} className="com_pro_create_vacancy_form_line_input_txt" placeholder='Əmək haqqı'/>
                            {/* agreed salary */}
                            <div className="com_pro_create_vacancy_form_line_checkbox_cont">
                                <div className={`com_pro_create_vacancy_form_line_checkbox ${filter.agreedSalary ? "com_pro_create_vacancy_form_line_checkbox_accepted" : ""}`} onClick={acceptAgreedSalaryFunc}>
                                    {filter.agreedSalary ? <span className="com_pro_create_vacancy_form_line_checkbox_checkmark"></span> : null} 
                                </div>
                                <div className="com_pro_create_vacancy_form_line_checkbox_txt">Razılaşma yolu ilə</div>
                            </div>
                        </div>
                    </div>
                    {/* form one line => end time*/}
                    <div className="com_pro_create_vacancy_form_line">
                        {/* name and description */}
                        <div className="com_pro_create_vacancy_form_line_name_and_desc">
                            {/* line name */}
                            <div className="com_pro_create_vacancy_form_line_name">Bitmə tarixi</div>
                            {/* line description */}
                            <div className="com_pro_create_vacancy_form_line_desc">Vakansiya üçün son bitmə tarixi seçin. Elanın aktiv olma müddəti maksimum 1 il ola bilər</div>
                        </div>
                        {/* form input */}
                        <div className="com_pro_create_vacancy_form_line_input">
                            <input type="date" value={filter.endTime} min={minDate} max={maxDate} onBlur={handleBlur} onChange={handleDateChange} className='com_pro_create_vacancy_form_line_input_final_date' name="final_date" required/>
                            <div className="com_pro_create_vacancy_form_error"></div>
                        </div>
                    </div>
                    <div className="com_pro_create_vacancy_form_errors_cont">
                        {
                            errorMessage.errorCheck ? errorMessage.errorContent : ''
                        }
                    </div>
                    {/* form submit */}
                    <button 
                    type="submit" 
                    className={`com_pro_create_vacancy_form_main_submit ${filter.category && filter.subCategory && filter.name && filter.city && filter.type && filter.experience && filter.education && filter.descriptionOfVacancy != "<p><br></p>" && filter.specialRequirements.length >0 && filter.skills.length >0 && (filter.agreedSalary || (filter.salary && filter.salaryType)) && filter.endTime ? 'com_pro_create_vacancy_form_main_submit_ready' : ''}`}
                    >
                        Növbəti
                    </button>
                </form>
            </div>
        </div>
    }</>
        
     );
}

export default ComProCreateVacancy;