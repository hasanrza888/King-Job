import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './custom_select_option_for_creat_vacancy.css';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function CustomSelectOptionForCreatVacancy({select_option_name,filter,setFilter, select_option_array, select_update,select_option_id, subOptionId,setsubs,subs}) {
    const [optionsShow, setOptionsShow] = useState(false);
    const [choosedOption, setChoosedOption] = useState('');
    const select_option_opener = ()=>{
        setOptionsShow(!optionsShow);
    }
    const mainOptionNameClk = (item, index, mainId)=> {
        // console.log(filter)
        // removes all selected main options and subOptions
        select_option_array.map((itemF, indexF) => {
            // removes all selected main options
            console.log(itemF["id"],mainId)
            if(itemF['id'] !== mainId){
                // console.log("mmmm")
                itemF["selected"] = false;
            }else{
                // selects selected main option
                itemF["selected"] = !itemF["selected"];
                // managing main filter
            }                     
        }); 
        // console.log(select_option_array)
        if(subOptionId === 'category'){
            setsubs(item['optionName']);
            setFilter({...filter,category:item['optionName'],subCategory:''})
            select_update([...select_option_array]);
        }
        else{
            setFilter({...filter,subCategory:item['optionName']})
        }
        // updates options state
        
        // close options window 
        setOptionsShow(false); 
        // console.log(filter)
    }
    console.log(filter)
    return ( 
        <div className="custom_select_option_container_creat_vacancy">
            {/* select name */}
            <div className={`custom_select_name_container_creat_vacancy ${filter[select_option_id] ? 'custom_select_name_active_creat_vacancy' : ''}`} onClick={select_option_opener}>
                <div className="custom_select_name_creat_vacancy">{filter[select_option_id] ? filter[select_option_id] : select_option_name}</div>
                <FontAwesomeIcon icon={faSortDown} />
            </div>
            {/* showing or hiding options */}
            <div className={`custom_options_container_creat_vacancy ${optionsShow ? "custom_options_show_creat_vacancy" : "custom_options_hide_creat_vacancy"}`}>
                <ul className="custom_options_lists_creat_vacancy">
                    { 
                        select_option_array?.map((item, index)=>{
                            return <li key={index} className='custom_options_list_creat_vacancy'>
                                        <div className={`custom_options_list_item_creat_vacancy ${item['selected'] ? "custom_options_list_selected_creat_vacancy" : ''}`} onClick={()=> mainOptionNameClk(item, index, item['id'])}>{item['optionName']}</div>
                                        
                                    </li>                            
                        })
                    }
                </ul>
            </div>                                        
        </div>
     );
}

export default CustomSelectOptionForCreatVacancy;