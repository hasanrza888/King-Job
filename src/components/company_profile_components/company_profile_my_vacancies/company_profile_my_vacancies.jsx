import './company_profile_my_vacancies.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faFilter, faMagnifyingGlass, faPen, faPlus, faSearch, faSortDown, faSortUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
function CompanyProfileMyVacancies() {
    const {companyJobsData:vacancies} = useSelector(state=>state.companyProfile);
    console.log(vacancies)
    const [searchQuery, setSearchQuery] = useState('');
    // const vacancies = [
    //     {
    //         id: 1,
    //         active: true,
    //         name: 'Software Developer',
    //         category: 'Bank',
    //         subCategory: 'Web',
    //         numberOfViews: 150,
    //         numberOfApplys: 31,
    //         applies: 50,
    //         city: 'Bakı',
    //         type: 'Tam',
    //         age: '18-25',
    //         experience: '2-5 il',
    //         education: 'ALi',
    //         salary: '6600',
    //         salaryType: 'Aylıq',
    //         createdAt: '12-10-2023',
    //         endTime: '31-12-2023',
    //     },
    //     {
    //         id: 2,
    //         active: false,
    //         name: 'Front end Developer',
    //         category: 'Information Technology',
    //         subCategory: 'Programming',
    //         numberOfViews: 100,
    //         numberOfApplys: 34,
    //         city: 'Ganca',
    //         type: 'Onlayn',
    //         age: '25-30',
    //         experience: '1 il',
    //         education: 'Orta',
    //         salary: '6000',
    //         salaryType: 'İllik',
    //         createdAt: '14-10-2023',
    //         endTime: '25-12-2023',
    //     }
    // ];
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
                        <tr key={vacancy.id}>
                            <td className="c_p_count">{index+1}</td>
                            <td className="c_p_status">
                                {
                                    vacancy.active ? 
                                    <span className="c_p_status_sign c_p_status_active">Aktiv</span>
                                    :
                                    <span className="c_p_status_sign c_p_status_deactive">Deaktiv</span>
                                }
                            </td>
                            <td className="c_p_vacancy_name"><Link to={'/vacancies/232'}>{vacancy.name}</Link></td>
                            <td className="c_p_category">{vacancy.category}</td>
                            <td className="c_p_subcategory">{vacancy.subCategory}</td>
                            <td className="c_p_views_count">{vacancy.numberOfViews}</td>
                            <td className="c_p_applies_count">{vacancy.numberOfApplys}</td>
                            <td className="c_p_city">{vacancy.city}</td>
                            <td className="c_p_job_type">{vacancy.type}</td>
                            <td className="c_p_age">{21}</td>
                            <td className="c_p_experience">{vacancy.experience}</td>
                            <td className="c_p_education_level">{vacancy.education}</td>
                            <td className="c_p_salary">{vacancy.salary}</td>
                            <td className="c_p_salary_type">{vacancy.salaryType}</td>
                            <td className="c_p_start_date">{vacancy.createdAt.split('T')[0]}</td>
                            <td className="c_p_end_date">{vacancy.endTime.split('T')[0]}</td>
                            <td className="c_p_actions">
                                <button className="c_p_actions_btn c_p_edit" title='Redaktə et'>
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                                <button className="c_p_actions_btn c_p_deactivate" title='Deaktiv et'>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <Link to="/vacancies/232"className="c_p_actions_btn c_p_details">
                                    Ətraflı
                                    <FontAwesomeIcon icon={faArrowRightLong} />
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
     );
}

export default CompanyProfileMyVacancies;