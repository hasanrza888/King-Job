import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solid_bookmark} from "@fortawesome/free-solid-svg-icons";
import './post_box_save_btn.css';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
// import 'react-toastify/dist/ReactToastify.css';
import { addFavoritJobs } from "../../apiservices";
import { updateFavJobs } from "../../redux/reducers/jobReducers";
function PostBoxSaveBtn({job_id, job_title}) {
    const dispatch = useDispatch();
    const {user,isLoggedIn} = useSelector(state=>state.user);
    const {jobs,loading,favoritJobs,loadingFavJobs} = useSelector(state=>state.job);
    console.log("From save btn",favoritJobs);
    const [save_post, set_save_post] = useState(false);
    
    useEffect(()=>{
        const chck = () => {
            set_save_post(favoritJobs.some(fav=>fav.job === job_id))
        }
        chck();
    },[favoritJobs, job_id])
    console.log(save_post)
    // function for adding jobs to saved 
    const add_saved_posts = async ()=>{
        // console.log(job_id)
        set_save_post(!save_post);
        if(isLoggedIn && user){
        try {
            const {data} = await addFavoritJobs(user?._id,job_id);
            console.log(data)
            if(data.succes){
                if(data.action === 'remove'){
                    const returnedData = favoritJobs.filter(fav=>fav.job!==job_id);
                    dispatch(updateFavJobs(returnedData));
                    toast.info(<div>"{job_title}" adlı vakansiya şəxsi hesabınızda <strong><u><Link to={'/user_profile/saved'}>sevimlilər</Link></u></strong> bölməsindən çıxarıldı.</div>, {
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                }
                else{

                    const returnedData = [...favoritJobs,data.data];
                    dispatch(updateFavJobs(returnedData));
                    toast.success(<div>"{job_title}" adlı vakansiya şəxsi hesabınızda <strong><u><Link to={'/user_profile/saved'}>sevimlilər</Link></u></strong> bölməsinə əlavə olundu.</div>, {
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                }
            }
            else{
                console.log("error at adding savedjob",data.message)
            }
        } catch (error) {
            console.log("error in save btn when adding saved jobs:",error.name)
        }

        // if(save_post === false){
        //     toast.success(<div>"{job_title}" adlı vakansiya şəxsi hesabınızda <strong><u><Link to={'/user_profile/saved'}>sevimlilər</Link></u></strong> bölməsinə əlavə olundu.</div>, {
        //         position: "top-right",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: false,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "light",
        //     });
        // }else{
        //     toast.info(<div>"{job_title}" adlı vakansiya şəxsi hesabınızda <strong><u><Link to={'/user_profile/saved'}>sevimlilər</Link></u></strong> bölməsindən çıxarıldı.</div>, {
        //         position: "top-right",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: false,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "light",
        //     });
        // } 
    }
    else{
        toast.warning(<div>Vakansiyanı sevimlilərə əlavə etmək üçün şəxsi hesabınıza daxil olmalısınız.<strong><u><Link to={'/login'}>buradan daxil olun</Link></u></strong></div>, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    }        
    }
    return (    
        <>  
        { ((isLoggedIn && user?.u_t_p === 'u_s_r') || !isLoggedIn) && <div className="post_box_save_button" onClick={(job_id)=> {add_saved_posts(job_id)} }>
            {
                save_post ? <FontAwesomeIcon icon={solid_bookmark} /> : <FontAwesomeIcon icon={faBookmark} />
            }    
        </div>}
        </>   
     );
}
export default PostBoxSaveBtn;