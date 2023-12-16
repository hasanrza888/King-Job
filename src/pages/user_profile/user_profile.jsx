import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/page_title_maker/page_title";
function UserProfile() {
    const navigate = useNavigate();
    const {user,isLoggedIn} = useSelector(state=>state.user);
    useEffect(()=>{
        if(!user && !isLoggedIn){
          navigate('/login');
        }
      },[isLoggedIn,user,navigate])
    useEffect(()=>{
      PageTitle('Hesabım');
    },[])
    return ( 
        <div className="profile_page_container">
            Tezliklə xidmətinizdə
        </div>
    );
}
export default UserProfile;