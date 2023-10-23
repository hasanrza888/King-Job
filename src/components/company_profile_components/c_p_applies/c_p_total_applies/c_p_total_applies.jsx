import { Link } from 'react-router-dom';
import './c_p_total_applies.css';

function CpTotalApplies() {
    const applies = [
        // Example applies data
        {
          id: 1,
          FirstName: 'John',
          LastName: 'Doe',
          VacancyName: 'Software Engineer',
          Email: 'john.doe@example.com',
          CVFile: 'resume.pdf'
        },
        {
          id: 2,
          FirstName: 'Jane',
          LastName: 'Smith',
          VacancyName: 'Marketing Specialist',
          Email: 'jane.smith@example.com',
          CVFile: 'cv.doc'
        },
        // Add more applies as needed
    ];

    return ( 
        <div className="c_p_total_applies_cont">
            {/* table container */}
            <div className="c_p_applies">
                <table className="c_p_applies_table">
                    <thead>
                        <tr>
                            <th>Ad</th>
                            <th>Soyad</th>
                            <th>Vakansiya adı</th>
                            <th>Email</th>
                            <th>CV faylı</th>
                            <th>İdarəetmə</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applies.map((apply) => (
                            <tr key={apply.id}>
                                <td>{apply.FirstName}</td>
                                <td>{apply.LastName}</td>
                                <td>{apply.VacancyName}</td>
                                <td><Link to={`mailto:${apply.Email}`}>{apply.Email}</Link></td>
                                <td>{<Link to={`/${apply.CVFile}`}>{apply.CVFile}</Link>}</td>
                                <td className='applies_manage'>
                                    <button className="c_p_action_button cancel-button">Ləğv et</button>
                                    <button className="c_p_action_button select-button">Seç</button>
                                    <button className="c_p_action_button interview-button">Müsahibə dəvəti</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
     );
}

export default CpTotalApplies;