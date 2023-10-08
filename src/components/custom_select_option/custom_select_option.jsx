import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './custom_select_option.css';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function CustomSelectOption({select_option_name, select_option_array, select_update, filter, setFilter, select_option_id, subOptionId}) {
    const [optionsShow, setOptionsShow] = useState(false);
    const [choosedOption, setChoosedOption] = useState('');
    const select_option_opener = ()=>{
        setOptionsShow(!optionsShow);
    }
    const mainOptionNameClk = (item, index, mainId)=> {
        // removes all selected main options and subOptions
        select_option_array.map((itemF, indexF) => {
            // removes all selected main options
            if(itemF['id'] !== mainId){
                itemF["selected"] = false;
            }else{
                // selects selected main option
                itemF["selected"] = !itemF["selected"];
                // managing main filter
                if(filter[`${select_option_id}`] === itemF['optionName']){
                    filter[`${select_option_id}`] = '';
                    setFilter({...filter});
                }else{
                    filter[`${select_option_id}`] = itemF['optionName'];
                    if(itemF['subOptions']){
                        filter[`${subOptionId}`] = '';
                        setFilter({...filter});
                    }
                }
            }            
            // removes all sub_options
            if(itemF['subOptions']){
                for(let i=0; i<itemF['subOptions'].length; i++){
                    itemF['subOptions'][i].selected = false;
                }    
            }            
        }); 
        // updates options state
        select_update([...select_option_array]);
        // close options window 
        setOptionsShow(false); 
    }
    const subOptionNameClick = (subItem, subIndex, item, index, subId)=>{
        // removes all selected main options and subOptions
        select_option_array.map((itemF) => {
            // removes all selected main options
            itemF["selected"] = false;
            // removes subOptions
            if(itemF['subOptions']){
                for(let i=0; i<itemF['subOptions'].length; i++){
                    if(itemF['subOptions'][i]['id']!== subId){
                        itemF['subOptions'][i].selected = false;  
                    }else{
                        // selects selected subOption
                        itemF['subOptions'][i].selected = !itemF['subOptions'][i].selected;
                        // managing main filter
                        if(filter[`${subOptionId}`] === itemF['subOptions'][i].subOptionsName){
                            filter[`${subOptionId}`] = ''; 
                            setFilter({...filter});
                        }else{
                            filter[`${select_option_id}`] = '';
                            filter[`${subOptionId}`] = itemF['subOptions'][i].subOptionsName;
                            setFilter({...filter});
                        }
                    }                    
                }    
            }            
        }); 
        // updates options state
        select_update([...select_option_array]);
        // close options window        
        setOptionsShow(false);
    }
    return ( 
        <div className="custom_select_option_container">
            {/* select name */}
            <div className={`custom_select_name_container ${filter[select_option_id] || filter[`${subOptionId}`] ? 'custom_select_name_active' : ''}`} onClick={select_option_opener}>
                <div className="custom_select_name">{filter[select_option_id] ? filter[select_option_id] : filter[subOptionId] ?  filter[subOptionId] : select_option_name}</div>
                <FontAwesomeIcon icon={faSortDown} />
            </div>
            {/* showing or hiding options */}
            <div className={`custom_options_container ${optionsShow ? "custom_options_show" : "custom_options_hide"}`}>
                <ul className="custom_options_lists">
                    { 
                        select_option_array.map((item, index)=>{
                            return <li key={index} className='custom_options_list'>
                                        <div className={`custom_options_list_item ${item['selected'] ? "custom_options_list_selected" : ''}`} onClick={()=> mainOptionNameClk(item, index, item['id'])}>{item['optionName']}</div>
                                        {
                                            item['subOptions'] ?
                                            <ul className='custom_options_sub_list'>
                                                {
                                                    // ____________ suboptions list _______________
                                                    
                                                    item['subOptions'].map((subItem, subIndex)=>
                                                        <li key={subItem["subOptionsName"]} className={`custom_options_sub_list_item ${subItem["selected"] ? "custom_options_list_selected" : ''}`} onClick={()=> subOptionNameClick(subItem, subIndex, item, index, subItem['id'])}>{subItem["subOptionsName"]}</li>
                                                    )
                                                }                                    
                                            </ul>
                                            : ''
                                        }
                                    </li>                            
                        })
                    }
                </ul>
            </div>                                        
        </div>
     );
}

export default CustomSelectOption;