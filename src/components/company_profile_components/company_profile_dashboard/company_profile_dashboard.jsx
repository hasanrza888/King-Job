import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './company_profile_dashboard.css';
import { faArrowTrendDown, faArrowTrendUp, faBriefcase, faCheck, faEye, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { BarChart, Bar, Pie, Cell, PieChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector,useDispatch } from 'react-redux';
function CompanyProfileDashboard() {
    const dispatch = useDispatch();
    const {numbers} = useSelector(state=>state.companyProfile)
    const Vacancies_analytics_bar = [
        {
          name: 'Yanvar',
          Adi: 4000,
          Premium: 2400,
          amt: 2400,
        },
        {
          name: 'Fevral',
          Adi: 3000,
          Premium: 1398,
          amt: 2210,
        },
        {
          name: 'Mart',
          Adi: 2000,
          Premium: 9800,
          amt: 2290,
        },
        {
          name: 'Aprel',
          Adi: 2780,
          Premium: 3908,
          amt: 2000,
        },
        {
          name: 'May',
          Adi: 1890,
          Premium: 4800,
          amt: 2181,
        },
        {
          name: 'İyun',
          Adi: 2390,
          Premium: 3800,
          amt: 2500,
        },
        {
          name: 'İyul',
          Adi: 3490,
          Premium: 4300,
          amt: 2100,
        },
        {
          name: 'Avqust',
          Adi: 3490,
          Premium: 4300,
          amt: 2100,
        },
        {
          name: 'Sentyabr',
          Adi: 3490,
          Premium: 4300,
          amt: 2100,
        },
        {
          name: 'Oktyabr',
          Adi: 3490,
          Premium: 4300,
          amt: 2100,
        },
        {
          name: 'Noyabr',
          Adi: 3490,
          Premium: 4300,
          amt: 2100,
        },
        {
          name: 'Dekabr',
          Adi: 3490,
          Premium: 4300,
          amt: 2100,
        }
    ];
    const Vacancies_analytics_pie = [
        { name: 'Adi', value: 200 },
        { name: 'Premium', value: 20 }
    ];
    const COLORS = ['#98A2FF', '#CAD7FF'];
    return ( 
    <div className="company_profile_dashboard_container">
        {/* overview statistics */}
        <div className="company_profile_dashboard_overview">
            {/* overview card */}
            <div className="company_profile_dashboard_overview_card">
                {/* card logo and description */}
                <div className="company_profile_dashboard_overview_logo_and_desc">
                    {/* logo */}
                    <div className="company_profile_dashboard_overview_logo">
                        <FontAwesomeIcon icon={faCheck} />
                    </div>
                    {/* description container */}
                    <div className="company_profile_dashboard_overview_desc">
                        {/* overview name */}
                        <div className="company_profile_dashboard_overview_name">Qəbul edilmiş namizədlər</div>
                        {/* overview count */}
                        <div className="company_profile_dashboard_overview_count">{numbers?.numOfApproved}</div>
                    </div>
                </div>
                <div className="company_profile_dashboard_overview_change">
                    {/* change name */}
                    <div className="company_profile_dashboard_overview_change_name">Sonuncu ay</div>
                    {/* change count */}
                    <div className="company_profile_dashboard_overview_change_count">
                        <FontAwesomeIcon className='company_profile_dashboard_overview_increase' icon={faArrowTrendUp} />
                        <div className="company_profile_dashboard_overview_change_count_number company_profile_dashboard_overview_increase">
                            +10%
                        </div>
                    </div>
                </div>
            </div>
            {/* overview card */}
            <div className="company_profile_dashboard_overview_card">
                {/* card logo and description */}
                <div className="company_profile_dashboard_overview_logo_and_desc">
                    {/* logo */}
                    <div className="company_profile_dashboard_overview_logo">
                        <FontAwesomeIcon icon={faBriefcase} />
                    </div>
                    {/* description container */}
                    <div className="company_profile_dashboard_overview_desc">
                        {/* overview name */}
                        <div className="company_profile_dashboard_overview_name">Vakansiyalar</div>
                        {/* overview count */}
                        <div className="company_profile_dashboard_overview_count">{numbers?.jobsCount}</div>
                    </div>
                </div>
                <div className="company_profile_dashboard_overview_change">
                    {/* change name */}
                    <div className="company_profile_dashboard_overview_change_name">Sonuncu ay</div> 
                    {/* change count */}
                    <div className="company_profile_dashboard_overview_change_count">
                        <FontAwesomeIcon className='company_profile_dashboard_overview_decrease' icon={faArrowTrendDown} />
                        <div className="company_profile_dashboard_overview_change_count_number company_profile_dashboard_overview_decrease">
                            -3%
                        </div>
                    </div>
                </div>
            </div>
            {/* overview card */}
            <div className="company_profile_dashboard_overview_card">
                {/* card logo and description */}
                <div className="company_profile_dashboard_overview_logo_and_desc">
                    {/* logo */}
                    <div className="company_profile_dashboard_overview_logo">
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </div>
                    {/* description container */}
                    <div className="company_profile_dashboard_overview_desc">
                        {/* overview name */}
                        <div className="company_profile_dashboard_overview_name">Müraciətlər</div>
                        {/* overview count */}
                        <div className="company_profile_dashboard_overview_count">{numbers?.numOfAllApply}</div>
                    </div>
                </div>
                <div className="company_profile_dashboard_overview_change">
                    {/* change name */}
                    <div className="company_profile_dashboard_overview_change_name">Sonuncu ay</div>
                    {/* change count */}
                    <div className="company_profile_dashboard_overview_change_count">
                        <FontAwesomeIcon className='company_profile_dashboard_overview_increase' icon={faArrowTrendUp} />
                        <div className="company_profile_dashboard_overview_change_count_number company_profile_dashboard_overview_increase">
                            +3%
                        </div>
                    </div>
                </div>
            </div>
            {/* overview card */}
            <div className="company_profile_dashboard_overview_card">
                {/* card logo and description */}
                <div className="company_profile_dashboard_overview_logo_and_desc">
                    {/* logo */}
                    <div className="company_profile_dashboard_overview_logo">
                        <FontAwesomeIcon icon={faEye} />
                    </div>
                    {/* description container */}
                    <div className="company_profile_dashboard_overview_desc">
                        {/* overview name */}
                        <div className="company_profile_dashboard_overview_name">Vakansiyalara baxış</div>
                        {/* overview count */}
                        <div className="company_profile_dashboard_overview_count">{numbers?.allView}</div>
                    </div>
                </div>
                <div className="company_profile_dashboard_overview_change">
                    {/* change name */}
                    <div className="company_profile_dashboard_overview_change_name">Sonuncu ay</div>
                    {/* change count */}
                    <div className="company_profile_dashboard_overview_change_count">
                        <FontAwesomeIcon className='company_profile_dashboard_overview_increase' icon={faArrowTrendUp} />
                        <div className="company_profile_dashboard_overview_change_count_number company_profile_dashboard_overview_increase">
                            +9%
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="company_profile_dashboard_charts_container">
            {/* chart name */}
            <div className="company_profile_dashboard_chart_name">Vakansiyalar</div>
            {/* charts container */}
            <div className="company_profile_dashboard_chart_bar_and_pie">
                {/* bar chart */}
                <div className="company_profile_dashboard_chart_bar">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                        width={500}
                        height={300}
                        data={Vacancies_analytics_bar}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Adi" fill="#98A2FF" />
                            <Bar dataKey="Premium" fill="#CAD7FF" />
                        </BarChart>
                    </ResponsiveContainer>     
                </div>
                {/* pie chart */}
                <div className="company_profile_dashboard_chart_pie">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={400}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={false}
                            data={Vacancies_analytics_pie}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        >
                            {Vacancies_analytics_pie.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                </div>
            </div>
        </div>
    </div> );
}

export default CompanyProfileDashboard;