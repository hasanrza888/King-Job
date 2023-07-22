import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './custom_select_option.css';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function CustomSelectOption({select_option_name, select_option_array, select_update, filter, setFilter, select_option_id}) {
    const [optionsShow, setOptionsShow] = useState(false);
    const [choosedOption, setChoosedOption] = useState('');
    const select_option_opener = ()=>{
        setOptionsShow(!optionsShow);
    }
    const mainOptionNameClk = (item, index)=> {
        if(filter[`${select_option_id}`] !== `${item['optionName']}`){
            setChoosedOption(`${item['optionName']}`); 
            if(filter){
                filter[`${select_option_id}`] = item['optionName'];
                setFilter({...filter});
            }
        }else{
            setChoosedOption('');
            if(filter){
                filter[`${select_option_id}`] = '';
                setFilter({...filter});
            }
        }
        // close options window 
        setOptionsShow(false); 
        // removes all selected main options
        select_option_array.map((itemF, indexF) => {
            if(indexF !== index){
                itemF["selected"] = false;
            }            
            if(itemF['subOptions']){
                for(let i=0; i<itemF['subOptions'].length; i++){
                    itemF['subOptions'][i].selected = false;
                }    
            }            
        }); 
        select_option_array[index].selected = !select_option_array[index].selected;
        select_update([...select_option_array]);
    }
    const subOptionNameClick = (subItem, subIndex, item, index)=>{
        if(filter[`${select_option_id}`] !== `${subItem["subOptionsName"]}`){
            setChoosedOption(`${subItem["subOptionsName"]}`);
            if(filter){
                filter[`${select_option_id}`] = subItem["subOptionsName"];
                setFilter({...filter});
            }
        }else{
            setChoosedOption('');
            if(filter){
                filter[`${select_option_id}`] = '';
                setFilter({...filter});
            }
        }
        // close options window        
        setOptionsShow(false);
        // removes all selected main options
        select_option_array.map((itemF) => {
            itemF["selected"] = false;
            if(itemF['subOptions']){
                for(let i=0; i<itemF['subOptions'].length; i++){
                    if(i !== subIndex){
                        itemF['subOptions'][i].selected = false;    
                    }                    
                }    
            }            
        }); 
        select_option_array[index]['subOptions'][subIndex].selected = !select_option_array[index]['subOptions'][subIndex].selected;
        select_update([...select_option_array]);
    }
    return ( 
        <div className="custom_select_option_container">
            {/* {console.log(choosedOption)} */}
            {/* select name */}
            <div className={`custom_select_name_container ${filter[select_option_id] ? 'custom_select_name_active' : ''}`} onClick={select_option_opener}>
                <div className="custom_select_name">{filter[`${select_option_id}`] ? filter[`${select_option_id}`] : select_option_name}</div>
                <FontAwesomeIcon icon={faSortDown} />
            </div>
            {/* showing or hiding options */}
            <div className={`custom_options_container ${optionsShow ? "custom_options_show" : "custom_options_hide"}`}>
                <ul className="custom_options_lists">
                    { 
                        select_option_array.map((item, index)=>{
                            return <li key={index} className='custom_options_list'>
                                        <div className={`custom_options_list_item ${item['selected'] ? "custom_options_list_selected" : ''}`} onClick={()=> mainOptionNameClk(item, index)}>{item['optionName']}</div>
                                        <ul className='custom_options_sub_list'>
                                            {
                                                // ____________ suboptions list _______________
                                                item['subOptions'] ?
                                                (item['subOptions'].map((subItem, subIndex)=>
                                                    <li key={subItem["subOptionsName"]} className={`custom_options_sub_list_item ${subItem["selected"] ? "custom_options_list_selected" : ''}`} onClick={()=> subOptionNameClick(subItem, subIndex, item, index)}>{subItem["subOptionsName"]}</li>
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