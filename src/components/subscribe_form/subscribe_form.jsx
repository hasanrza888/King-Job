import { useState } from 'react';
import './subscribe_form.css';
import MultiSelectOption from '../multi_select_option/multi_select_option';
import { toast } from 'react-toastify';
import { email_checker } from '../email_checker/email_checker';
function SubscribeForm() {
    const [sendingData, setSendingData] = useState(false);
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState({
        errorCheck: false,
        errorContent : ''
    });
    const [multi_select, setMultiSelect] = useState([
        {   
            id: 1,
            option_name: 'IT',
            selected: false,
        },
        {   
            id: 2,
            option_name: 'Bank',
            selected: false,
        },
        {   
            id: 3,
            option_name: 'Tikinti',
            selected: false,
        },
        {   
            id: 4,
            option_name: 'Mühasibatlıq',
            selected: false,
        },
        {   
            id: 5,
            option_name: 'Marketinq',
            selected: false,
        }
    ]);
    const choosed_selects = multi_select.filter(item => item.selected).map(item2 => item2.option_name);
    const email_change_func = (e)=>{
        setEmail(e.target.value);
    }
    const subscribe_from_handle =(e)=>{
        e.preventDefault();
        if(choosed_selects.length > 0 && email_checker(email)){
            // query to database
            setSendingData(true);
            setErrorMessage({...errorMessage, errorCheck: false, errorContent: ''});
            toast.success('Uğurla abunə oldunuz', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }else if(choosed_selects.length === 0){
            setErrorMessage({...errorMessage, errorCheck: true, errorContent: 'Kateqoriya Seçməmisiniz !'});
        }else if(!email_checker(email)){
            setErrorMessage({...errorMessage, errorCheck: true, errorContent: 'Email sintaksisi səhvdir !'});

        }
    };
    return ( 
        <div className="subscribe_form_container">
            <div className="subscribe_form_categories">
                <MultiSelectOption choosed_selects={choosed_selects}  multi_select_name='Kateqoriya seçin' multi_select_array={multi_select} multi_select_update={setMultiSelect}/>
            </div>
            <div className="subscribe_form_categories_number">{choosed_selects.length > 0 ? `${choosed_selects.length} seçilmiş kateqoriya` : ''}</div>
            <form action="#" className="subscribe_form" onSubmit={subscribe_from_handle}>
                <input type="email" value={email} onChange={email_change_func} className="subscribe_form_input" placeholder='Email' required/>
                <div className="subscribe_form_submit_btn_container">
                    <input type="submit" value="Abunə Ol" className='subscribe_form_submit_btn' />  
                    {
                        sendingData ? <div className="send_data_submit_btn_loader"></div> : ''
                    }  
                </div>
                
            </form>
            {
            errorMessage.errorCheck ? 
            <div className="subscribe_form_error_message">{errorMessage.errorContent}</div> 
            : ''
            }
        </div>
    );
}

export default SubscribeForm;