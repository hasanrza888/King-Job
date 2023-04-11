import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './page_top_btn.css'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
function PageTopBtn() {
    const [top, setTop] = useState(false);
    window.addEventListener('scroll', ()=>{
        if(document.documentElement.scrollTop > 0){
            setTop(true);
        }else{
            setTop(false);
        }
    })
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