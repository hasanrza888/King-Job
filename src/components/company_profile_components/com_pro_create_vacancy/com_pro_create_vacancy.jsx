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
function ComProCreateVacancy() {
    const [acceptAgreedSalary, setAcceptAgreedSalary] = useState(false);
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    const [specReqVal, setSpecReqVal] = useState('');
    const [specSkillsVal, setSpecSkillsVal] = useState('');
    const genCategor = [
        {
            optionName: 'IT',
            id: 1,
            selected: false,
        },
        {
            optionName: 'Bank', 
            id: 2, 
            selected: false,  
        },
        {
            optionName: 'Marketinq və Satış',
            id:3,
            selected: false,
        }

    ]
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
            optionName: 'IT',
            id: 1,
            selected: false,
            subOptions: [
                {optionName: "Web", selected: false, id: 1.1},
                {optionName: "QA", selected: false, id: 1.2},
                {optionName: "Security", selected: false, id: 1.3},
            ]
        },
        {
            optionName: 'Bank', 
            id: 2, 
            selected: false,          
            subOptions: [
                {optionName: "Kredit mütəxəssisi", selected: false, id: 2.1},
                {optionName: "Analitik", selected: false, id: 2.2},
                {optionName: "Əməliyyatçı", selected: false, id: 2.3},
                {optionName: "Şöbə müdiri", selected: false, id: 2.4}
            ]
        },
        {
            optionName: 'Marketinq və Satış',
            id:3,
            selected: false,
            subOptions: null,
        }
    ]);
    // filter
    const [filter, setFilter] = useState({
        company: "",
        category: "",
        subCategory: "",
        name: "",
        city: "",
        type: "",
        experience: "",
        education: "",
        descriptionOfVacancy: "",
        specialRequirements: [],
        skills: [],
        salary: "",
        salaryType: "",
        premium: false,
        endTime: "",
    })
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
    const [salaryTypes, setSalaryTypes] = useState([
        {
            id: 1,
            selected: false,
            icon: <FontAwesomeIcon icon={faClock} />,
            type: 'Saatlıq'
        },
        {
            id: 2,
            selected: false,
            icon: <FontAwesomeIcon icon={faCalendarDays} />,
            type: 'Aylıq'
        },
        {
            id: 3,
            selected: false,
            icon: <FontAwesomeIcon icon={faCalendar} />,
            type: 'İllik'
        }
    ]) 
    // checkbox function for agreed salary
    const acceptAgreedSalaryFunc = ()=>{
        setAcceptAgreedSalary(!acceptAgreedSalary);
        setFilter({...filter, salary: ''});
        salaryTypes.map((itemA, indexA)=>{
            itemA.selected = false;
        })
        setSalaryTypes([...salaryTypes]);
    }
    // checkbox function for premium vacancy
    const acceptPremiunFunc = ()=>{
        setFilter({...filter, premium: !filter.premium});
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
                setFilter({...filter, salaryType: itemA.type});
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
        setFilter({...filter, salary: e.target.value});
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
    return ( 
        <div className="com_pro_create_vacancy_container">
            {/* page head text */}
            <div className="com_pro_create_vacancy_p_title">Yeni Vakansiya</div>
            {/* vacancy create form container*/}
            <div className="com_pro_create_vacancy_form_container">
                {/* vacancy create form */}
                <form className="com_pro_create_vacancy_form">
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
                            <input className='com_pro_create_vacancy_form_line_input_txt' value={filter.name} onChange={vacancyNameChange} type="text" name="vacancy_name" placeholder='Baş mühasib' />
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
                            <input type="number" value={filter.salary} onChange={changeVacSalary} className="com_pro_create_vacancy_form_line_input_txt" placeholder='Əmək haqqı' required/>
                            {/* agreed salary */}
                            <div className="com_pro_create_vacancy_form_line_checkbox_cont">
                                <div className={`com_pro_create_vacancy_form_line_checkbox ${acceptAgreedSalary ? "com_pro_create_vacancy_form_line_checkbox_accepted" : ""}`} onClick={acceptAgreedSalaryFunc}>
                                    {acceptAgreedSalary ? <span className="com_pro_create_vacancy_form_line_checkbox_checkmark"></span> : null} 
                                </div>
                                <div className="com_pro_create_vacancy_form_line_checkbox_txt">Razılaşma yolu ilə</div>
                            </div>
                        </div>
                    </div>
                    {/* form one line => premium*/}
                    <div className="com_pro_create_vacancy_form_line">
                        {/* name and description */}
                        <div className="com_pro_create_vacancy_form_line_name_and_desc">
                            {/* line name */}
                            <div className="com_pro_create_vacancy_form_line_name">Premium elan</div>
                            {/* line description */}
                            <div className="com_pro_create_vacancy_form_line_desc">Vakansiya elanınızı premium edərək daha çox baxışlar əldə edin və daha tez namizədləri tapın</div>
                        </div>
                        {/* form input */}
                        <div className="com_pro_create_vacancy_form_line_input">
                            <div className="com_pro_create_vacancy_form_line_input_desc">
                            Xidmətdən istifadə haqqı <span>15</span> manatdır və istifadə müddəti <span>20</span> gündür
                            </div>
                            {/* agreed advertisement */}
                            <div className="com_pro_create_vacancy_form_line_checkbox_cont">
                                <div className={`com_pro_create_vacancy_form_line_checkbox ${filter.premium ? "com_pro_create_vacancy_form_line_checkbox_accepted" : ""}`} onClick={acceptPremiunFunc}>
                                    {filter.premium ? <span className="com_pro_create_vacancy_form_line_checkbox_checkmark"></span> : null} 
                                </div>
                                <div className="com_pro_create_vacancy_form_line_checkbox_txt">Bu xidmətdən istifadə etməyə razıyam</div>
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
                            <input type="date" value={filter.endTime} min={minDate} max={maxDate} onBlur={handleBlur} onChange={handleDateChange} className='com_pro_create_vacancy_form_line_input_final_date' name="final_date"/>
                            <div className="com_pro_create_vacancy_form_error"></div>
                        </div>
                    </div>
                    {/* form submit */}
                    <button type="submit" className="com_pro_create_vacancy_form_main_submit">Növbəti</button>
                </form>
            </div>
        </div>
     );
}

export default ComProCreateVacancy;