import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function UserProfile() {
    const navigate = useNavigate();
    const {user,isLoggedIn} = useSelector(state=>state.user);
    useEffect(()=>{
        if(!user && !isLoggedIn){
          navigate('/login',{state:{referrer:'/user_profile'}})
        }
      },[isLoggedIn,user,navigate])
    return ( 
        <div className="profile_page_container">
            profile page
        </div>
    );
}
export default UserProfile;