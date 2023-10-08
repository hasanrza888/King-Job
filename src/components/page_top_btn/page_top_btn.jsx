import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './page_top_btn.css'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
function PageTopBtn() {
    const [top, setTop] = useState(false);
    const openTopBtn = ()=>{
        setTop(document.documentElement.scrollTop > 0);
    }
    // window.addEventListener('scroll', openTopBtn);
    useEffect(()=>{
        window.addEventListener('scroll', openTopBtn);
        return ()=>{
            window.removeEventListener('scroll', openTopBtn);
        }
    },[])
    const go_to_top = ()=>{
        window.scrollTo(0 , 0);
    }
    return ( 
        <div onClick={go_to_top} className={top ? 'page_top_button' : 'page_top_button_none'} title='Önə get'>
            <FontAwesomeIcon icon={faAngleUp} />
        </div>
    );
}

export default PageTopBtn;