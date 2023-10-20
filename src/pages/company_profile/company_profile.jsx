import CompanyProfileMainWindow from '../../components/company_profile_components/company_profile_main_window/company_profile_main_window';
import CompanyProfileMenu from '../../components/company_profile_components/company_profile_menu/company_profile_menu';
import './company_profile.css';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllNumbersForCompanyMenuAndDashboard } from '../../apiservices';
import { setNumbers } from '../../redux/reducers/companyProfileReducers';

function CompanyProfile() {
    const dispatch = useDispatch();
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();
    const {user,isLoggedIn} = useSelector(state=>state.user);
    const {numbers} = useSelector(state=>state.companyProfile)
    // console.log(numbers)
    useEffect(()=>{
        if(!user && !isLoggedIn){
          navigate('/login')

        }
    },[isLoggedIn,user,navigate])
    const open_company_menu =()=>{
        setMenu(!menu);
    }
    const [menuNumbers,setMenuNumbers] = useState({
        jobsCount:0,
        premJobsCount:0,
        numOfAllApply:0,
        numOfApproved:0,
        numOfRejected:0
    })
    // console.log(user)
    useEffect(()=>{
        const fetchNumbersForMenuAndDashboard = async () => {
            try {
                const {data} = await getAllNumbersForCompanyMenuAndDashboard(user?._id);
                // console.log(data)
                // setMenuNumbers(data.values);
                dispatch(setNumbers(data.values))
                // console.log(data.values)
            } catch (error) {

                if(error.response && error.response.data){
                    console.log(error.response.data.message)
                }else{
                    console.log(error)
                }
            }
        }
        fetchNumbersForMenuAndDashboard();
    },[user,dispatch])
    return ( 
        <div className="company_profile_container">
            {/* menu and main window */}
            <div className="company_profile_menu_and_main_windows">
                {/* menus container */}
                <CompanyProfileMenu menuNumbers={numbers} open_company_menu={open_company_menu} menu={menu}/>
                {/* main windows container */}
                <CompanyProfileMainWindow open_company_menu={open_company_menu} menu={menu}/>
            </div>
        </div>
     );
}

export default CompanyProfile;