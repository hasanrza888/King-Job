import './not_found.css';
import svg from '../../images/404_not_found.svg';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/page_title_maker/page_title';
import { useEffect } from 'react';
function Notfound() {
    const go_back = useNavigate();
    useEffect(()=>{
        PageTitle('Tapılmadı');
    },[])
    return ( 
        <div className="not_found_page_container">
            <div className="not_found_page_head">
                Uyğun səhifə tapılmadı !
            </div>
            <img src={svg} alt="404" className='not_found_page_image'/>
            <div className="not_found_page_back_btn" onClick={()=> go_back(-1)}>
                Geri
            </div>
        </div>
     );
}
export default Notfound;