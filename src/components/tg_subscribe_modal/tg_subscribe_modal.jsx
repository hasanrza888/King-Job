import { Link } from "react-router-dom";
import './tg_subscribe_modal.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
function TgSubscribeModal({setOpenTg}) {
    const close_tg_modal =()=>{
        setOpenTg(false);
        localStorage.setItem('t_s_i', true); 
    }
    const closeModal =(e)=>{
        if(e.target.className === "tg_subscribe_modal_container"){
            close_tg_modal();
        }
    }
    return ( 
        <div className="tg_subscribe_modal_container" onClick={(e)=> closeModal(e)}>
            {/* modal inside */}
            <div className="tg_subscribe_modal">
                <h2>Vakansiyaları axtarma, vakansiyalar sənə gəlsin !</h2>
                <h3>Sadəcə telegram kanalımıza abunə ol.</h3>
                <h4>Telegram kanalımızda vakansiyalar avtomatik paylaşılır</h4>
                {/* tg channel link */}
                <div className="tg_subscribe_modal_icon_link">
                    <FontAwesomeIcon icon={faTelegram} />
                    <Link to='https://t.me/the_kingjob' target="_blank" onClick={close_tg_modal}>Kanala abunə ol</Link>
                </div>
                {/* modal close */}
                <button className="tg_subscribe_modal_close" onClick={close_tg_modal}>Bağla</button>
            </div>
        </div>
     );
}

export default TgSubscribeModal;