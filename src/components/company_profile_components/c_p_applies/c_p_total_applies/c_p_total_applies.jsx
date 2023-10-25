import { Link } from 'react-router-dom';
import './c_p_total_applies.css';
import { useSelector } from 'react-redux';
function CpTotalApplies() {
    const {companyJobsApplys:applyes} = useSelector(state=>state.companyProfile);
    console.log(applyes)
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
    console.log(applyes)
    return ( 
        <div className="c_p_total_applies_cont">
            {/* table container */}
            <div className="c_p_applies">
                <table className="c_p_applies_table">
                    <thead>
                        <tr>
                            <th>N</th>
                            <th>Ad</th>
                            <th>Vakansiya adı</th>
                            <th>Email</th>
                            <th>CV faylı</th>
                            <th>Status</th>
                            <th>İdarəetmə</th>
                        </tr>
                    </thead>
                    <tbody>                        
                        {applyes.map((apply,ind) => (
                            <tr key={apply._id}>
                                <td>{ind+1}</td>
                                <td>{apply.userName}</td>
                                <td>{apply.jobName}</td>
                                <td><Link to={`mailto:${apply.userEmail}`}>{apply.userEmail}</Link></td>
                                <td>{<Link target='blank' to={`${apply.file}`}>{"Cv yə bax"}</Link>}</td>
                                <td>
                                    <span className={`c_p_apply_status ${apply.status === "pending" ? 'c_p_apply_status_pending' : apply.status === "approved" ? "c_p_apply_status_accepted" : apply.status === "rejected" ? "c_p_apply_status_rejected" : "c_p_apply_status_thinking"}`}>{apply.status}</span>
                                </td>
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