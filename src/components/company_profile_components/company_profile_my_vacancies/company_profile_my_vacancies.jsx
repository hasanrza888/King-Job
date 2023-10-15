import './company_profile_my_vacancies.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faFilter, faMagnifyingGlass, faPen, faPlus, faSearch, faSortDown, faSortUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
function CompanyProfileMyVacancies() {
    const [searchQuery, setSearchQuery] = useState('');
    // Example vacancy data
    const vacancies = [
        {
            id: 1,
            status: true,
            name: 'Software Developer',
            category: 'Bank',
            subcategory: 'Web',
            views: 150,
            applies: 50,
            city: 'Bakı',
            jobType: 'Tam',
            age: '18-25',
            experience: '2-5 il',
            educationLevel: 'ALi',
            salary: '6600',
            salaryType: 'Aylıq',
            startDate: '12-10-2023',
            endDate: '31-12-2023',
        },
        {
            id: 2,
            status: false,
            name: 'Front end Developer',
            category: 'Information Technology',
            subcategory: 'Programming',
            views: 100,
            applies: 34,
            city: 'Ganca',
            jobType: 'Onlayn',
            age: '25-30',
            experience: '1 il',
            educationLevel: 'Orta',
            salary: '6000',
            salaryType: 'İllik',
            startDate: '14-10-2023',
            endDate: '25-12-2023',
        },    
        {
            id: 3,
            status: false,
            name: 'Front end Developer',
            category: 'Information Technology',
            subcategory: 'Programming',
            views: 100,
            applies: 90,
            city: 'Bakı',
            jobType: 'Onlayn',
            age: '30-35',
            experience: '2-5 il',
            educationLevel: 'ALi',
            salary: '6000',
            salaryType: 'Aylıq',
            startDate: '14-10-2023',
            endDate: '25-12-2023',
        },
        {
            id: 4,
            status: false,
            name: 'Front end Developer',
            category: 'Information Technology',
            subcategory: 'Programming',
            views: 100,
            applies: 90,
            city: 'Bakı',
            jobType: 'Onlayn',
            age: '35-40',
            experience: '2-5 il',
            educationLevel: 'ALi',
            salary: '6000',
            salaryType: 'Aylıq',
            startDate: '14-10-2023',
            endDate: '25-12-2023',
        },
    ];
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
        } else if (sortColumn === 'status') {
            return sortDirection * (a.status - b.status);
        } else if (sortColumn === 'name') {
            return sortDirection * a.name.localeCompare(b.name);
        } else if (sortColumn === 'category') {
          return sortDirection * a.category.localeCompare(b.category);
        } else if (sortColumn === 'subcategory') {
          return sortDirection * a.subcategory.localeCompare(b.subcategory);
        } else if (sortColumn === 'views') {
          return sortDirection * (a.views - b.views);
        } else if (sortColumn === 'applies') {
          return sortDirection * (a.applies - b.applies);
        } else if (sortColumn === 'city') {
          return sortDirection * a.city.localeCompare(b.city);
        } else if (sortColumn === 'jobType') {
          return sortDirection * a.jobType.localeCompare(b.jobType);
        } else if (sortColumn === 'age') {
          return sortDirection * a.age.localeCompare(b.age);
        } else if (sortColumn === 'experience') {
          return sortDirection * a.experience.localeCompare(b.experience);
        } else if (sortColumn === 'educationLevel') {
          return sortDirection * a.educationLevel.localeCompare(b.educationLevel);
        } else if (sortColumn === 'salary') {
          return sortDirection * (a.salary - b.salary);
        } else if (sortColumn === 'salaryType') {
          return sortDirection * a.salaryType.localeCompare(b.salaryType);
        } else if (sortColumn === 'startDate') {
          return sortDirection * a.startDate.localeCompare(b.startDate);
        } else if (sortColumn === 'endDate') {
          return sortDirection * a.endDate.localeCompare(b.endDate);
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
                            <th className="c_p_status" onClick={() => handleSort('status')}>
                                Status
                                {sortColumn === 'status' && (
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
                            <th className="c_p_subcategory" onClick={() => handleSort('subcategory')}>
                                Alt kateqoriya
                                {sortColumn === 'subcategory' && (
                                    sortDirection === 1 ? 
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortUp} /></span> 
                                    :
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortDown} /></span> 
                                )}
                            </th>
                            <th className="c_p_views_count" onClick={() => handleSort('views')}>
                                Baxış sayı
                                {sortColumn === 'views' && (
                                    sortDirection === 1 ? 
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortUp} /></span> 
                                    :
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortDown} /></span> 
                                )}
                            </th>
                            <th className="c_p_applies_count" onClick={() => handleSort('applies')}>
                                Müraciət sayı
                                {sortColumn === 'applies' && (
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
                            <th className="c_p_job_type" onClick={() => handleSort('jobType')}>
                                İş qrafiki
                                {sortColumn === 'jobType' && (
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
                            <th className="c_p_education_level" onClick={() => handleSort('educationLevel')}>
                                Təhsil səviyyəsi
                                {sortColumn === 'educationLevel' && (
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
                            <th className="c_p_start_date" onClick={() => handleSort('startDate')}>
                                Başlama tarixi
                                {sortColumn === 'startDate' && (
                                    sortDirection === 1 ? 
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortUp} /></span> 
                                    :
                                    <span className="c_p_vacancies_table_sort_btns"><FontAwesomeIcon icon={faSortDown} /></span> 
                                )}
                            </th>
                            <th className="c_p_end_date" onClick={() => handleSort('endDate')}>
                                Son tarix
                                {sortColumn === 'endDate' && (
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
                            <td className="c_p_count">{vacancy.id}</td>
                            <td className="c_p_status">
                                {
                                    vacancy.status ? 
                                    <span className="c_p_status_sign c_p_status_active">Aktiv</span>
                                    :
                                    <span className="c_p_status_sign c_p_status_deactive">Deaktiv</span>
                                }
                            </td>
                            <td className="c_p_vacancy_name"><Link to={'/vacancies/232'}>{vacancy.name}</Link></td>
                            <td className="c_p_category">{vacancy.category}</td>
                            <td className="c_p_subcategory">{vacancy.subcategory}</td>
                            <td className="c_p_views_count">{vacancy.views}</td>
                            <td className="c_p_applies_count">{vacancy.applies}</td>
                            <td className="c_p_city">{vacancy.city}</td>
                            <td className="c_p_job_type">{vacancy.jobType}</td>
                            <td className="c_p_age">{vacancy.age}</td>
                            <td className="c_p_experience">{vacancy.experience}</td>
                            <td className="c_p_education_level">{vacancy.educationLevel}</td>
                            <td className="c_p_salary">{vacancy.salary}</td>
                            <td className="c_p_salary_type">{vacancy.salaryType}</td>
                            <td className="c_p_start_date">{vacancy.startDate}</td>
                            <td className="c_p_end_date">{vacancy.endDate}</td>
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