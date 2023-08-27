import { useState } from 'react';
import './multi_select_option.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
function MultiSelectOption({multi_select_name, multi_select_array, multi_select_update}) {
    const [optionsShow, setOptionsShow] = useState(false);
    const [search, setSearch] = useState('');
    const open_multi_selects =()=>{
        setOptionsShow(!optionsShow);
    }
    const add_Choosed_options = (id)=>{
        multi_select_array.map((item, index)=>{
            if(item['id'] === id && item['selected'] === false){
                return item['selected'] = true;
            }else if(item['id'] === id && item['selected'] === true){
                return item['selected'] = false; 
            }
        })
        multi_select_update([...multi_select_array]);
    }
    const multi_options_search_change =(e)=>{
        setSearch(e.target.value);
    }
    const multi_options_close_btn =()=>{
        setOptionsShow(!optionsShow);
    }
    return ( 
        <div className="multi_select_option_container">
            {/* select name */}
            <div className={`multi_select_name_container`} onClick={open_multi_selects}>
                <div className="multi_select_name">
                    {
                        multi_select_array.filter(item=> item['selected'] === true).length > 0 ? 
                        multi_select_array.filter(item=> item['selected'] === true).map((item, index)=> {
                            return <div className="multi_select_name_item" key={item['id']}>{item['option_name']}</div>
                        }) 
                        : multi_select_name
                    }
                </div>
            </div>
            {/* showing or hiding options */}
            <div className={`multi_options_container ${optionsShow ? "multi_options_show" : "multi_options_hide"}`}>
                <div className="multi_options_search_and_close_btn">
                    <input type="text" placeholder='Axtar' className='multi_options_search' onChange={multi_options_search_change} value={search}/>
                    <FontAwesomeIcon icon={faXmark} title='Bağla' onClick={multi_options_close_btn}/>
                </div>
                <ul className="multi_options_lists">
                    { 
                        multi_select_array.filter(searchItem => searchItem['option_name'].toLowerCase().includes(search.toLowerCase())).map((item, index)=>{
                            return <li key={item.id} className='multi_options_list'>
                                        <div className={`multi_options_list_item ${item['selected'] ? "multi_options_list_selected" : ''}`} onClick={(id)=>{add_Choosed_options(item['id'])}}>{item['option_name']}</div>
                                    </li>                            
                        })
                    }
                </ul>
            </div> 
        </div>
     );
}

export default MultiSelectOption;