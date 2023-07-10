import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './custom_select_option.css';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function CustomSelectOption({select_option_name, select_option_array}) {
    const [optionsShow, setOptionsShow] = useState(false);
    const select_option_opener = ()=>{
        setOptionsShow(!optionsShow);
    }
    // window.addEventListener('click', (e)=>{
    //     if(e.target.className !== "custom_options_container"){
    //         setOptionsShow(!optionsShow);
    //     }
    //     console.log(e.target.className);
    // });
    return ( 
        <div className="custom_select_option_container">
            {/* select name */}
            <div className="custom_select_name_container" onClick={select_option_opener}>
                <div className="custom_select_name">{select_option_name}</div>
                <FontAwesomeIcon icon={faSortDown} />
            </div>
            {/* showing or hiding options */}
            <div className={`custom_options_container ${optionsShow ? "custom_options_show" : "custom_options_hide"}`}>
                <ul className="custom_options_list">
                    {
                        select_option_array.map((item, index)=>{
                            return <li key={item['categoryName']}>
                                        <div className="custom_options_list_item" onClick={()=> console.log(item['categoryName'])}>{item['categoryName']}</div>
                                        <ul className='custom_options_sub_list'>
                                            {
                                                item['subCategories'] ?
                                                (item['subCategories'].map((subItem, subIndex)=>
                                                    <li key={subItem} className='custom_options_sub_list_item' onClick={()=> console.log(subItem)}>{subItem}</li>
                                                )) : null
                                            }                                    
                                        </ul>
                                    </li>                            
                        })
                    }
                </ul>
            </div>                                        
        </div>
     );
}

export default CustomSelectOption;