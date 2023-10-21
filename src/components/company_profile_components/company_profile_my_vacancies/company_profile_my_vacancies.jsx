import './company_profile_my_vacancies.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faFilter, faMagnifyingGlass, faPen, faPlus, faSearch, faSortDown, faSortUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {toast} from 'react-toastify'
import { deactivatevacancy,deleteJob } from '../../../apiservices';
import { updateCurrentJob } from '../../../redux/reducers/jobReducers';
import { updateCompanyJob,deleteCompanyJob } from '../../../redux/reducers/companyProfileReducers';
function CompanyProfileMyVacancies() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {companyJobsData:vacancies} = useSelector(state=>state.companyProfile);
    // console.log(vacancies)
    const [searchQuery, setSearchQuery] = useState('');
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(1);
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
    });
    // search vacancy
    const searchVacancy = (e) => {
        e.preventDefault();
        // console.log(e.target.search_form_input.value)
        setSearchQuery(e.target.search_form_input.value);
    };
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

    const goDetail = (id) => {
        navigate('/vacancies/'+id);
        localStorage.removeItem('c_r_r_n_t');
        dispatch(updateCurrentJob(null));
    }
    return ( 
        <div className="company_profile_my_vacancies_container">
            <div className="c_p_m_v_Search_form_and_new_cont">
                <form onSubmit={searchVacancy} className='c_p_m_v_Search_form'>
                    <input className='c_p_m_v_Search_form_input' name='search_form_input' type="text" placeholder='Vakansiyaları axtarın'/>
                    <button className='c_p_m_v_Search_form_sbmt' type="submit">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
                {/* create new vacancy  */}
                <Link to={'/company_profile/vacancies/create_vacancy'} className="c_p_m_v_Search_form_create_new_vac">
                    <FontAwesomeIcon icon={faPlus} />
                    Yeni Vakansiya
                </Link>
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
                    {sortedVacancies.filter((item)=>{return item.name.toLowerCase().includes(searchQuery.toLowerCase())}).map((vacancy, index) => (
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