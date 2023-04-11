import './not_found.css';
import svg from '../../images/404_not_found.svg';
import { useNavigate } from 'react-router-dom';
function Notfound() {
    const go_back = useNavigate(-1);
    return ( 
        <div className="not_found_page_container">
            <div className="not_found_page_head">
                Uyğun səhifə tapılmadı
            </div>
            <img src={svg} alt="404" className='not_found_page_image'/>
            <div className="not_found_page_back_btn" onClick={()=> go_back(-1)}>
                Geri
            </div>
        </div>
     );
}
export default Notfound;