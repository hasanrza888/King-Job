import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solid_bookmark} from "@fortawesome/free-solid-svg-icons";
import './post_box_save_btn.css';
import { useState } from "react";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
// import 'react-toastify/dist/ReactToastify.css';
function PostBoxSaveBtn({job_id, job_title}) {
    const [save_post, set_save_post] = useState(false);
    // function for adding jobs to saved 
    const add_saved_posts = (job_id)=>{
        set_save_post(!save_post);  
        if(save_post === false){
            toast.success(<div>"{job_title}" adlı vakansiya şəxsi hesabınızda <strong><u><Link to={'/user_profile/saved'}>sevimlilər</Link></u></strong> bölməsinə əlavə olundu.</div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }else{
            toast.info(<div>"{job_title}" adlı vakansiya şəxsi hesabınızda <strong><u><Link to={'/user_profile/saved'}>sevimlilər</Link></u></strong> bölməsindən çıxarıldı.</div>, {
                position: "top-right",
                autoClose: 5000,
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
        <div className="post_box_save_button" onClick={(job_id)=> {add_saved_posts(job_id)} }>
            {
                save_post ? <FontAwesomeIcon icon={solid_bookmark} /> : <FontAwesomeIcon icon={faBookmark} />
            }    
        </div>
     );
}
export default PostBoxSaveBtn;