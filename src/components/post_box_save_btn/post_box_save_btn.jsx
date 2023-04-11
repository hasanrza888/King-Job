import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solid_bookmark} from "@fortawesome/free-solid-svg-icons";
import './post_box_save_btn.css';
import { useState } from "react";
function PostBoxSaveBtn({job_id, setSuccessMsg}) {
    const [save_post, set_save_post] = useState(false);
    // function for adding jobs to saved 
    const add_saved_posts = (job_id)=>{
        set_save_post(!save_post);  
        if(save_post === false){
            setSuccessMsg(true);    
        }         
    }
    return (         
        <div className="post_box_save_button" onClick={(job_id)=> {add_saved_posts()} }>
            {
                save_post ? <FontAwesomeIcon icon={solid_bookmark} /> : <FontAwesomeIcon icon={faBookmark} />
            }                                              
        </div>
     );
}
export default PostBoxSaveBtn;