import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './tg_sb_btn.css';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

function TgSbBtn() {
    return ( 
        <span className="tg_sb_btn_container" title='Telegram Kanala Abunə olun!'>
            <FontAwesomeIcon icon={faTelegram} />
            <div className="tg_sb_box_container">
                <h2>Vakansiyaları axtarma, vakansiyalar sənə gəlsin !</h2>
                <h3>Sadəcə telegram kanalımıza abunə ol.</h3>
                <h4>Telegram kanalımızda vakansiyalar avtomatik paylaşılır</h4>
                <Link to='https://t.me/the_kingjob' target="_blank">Kanala abunə ol</Link>
            </div>
        </span>
     );
}

export default TgSbBtn;