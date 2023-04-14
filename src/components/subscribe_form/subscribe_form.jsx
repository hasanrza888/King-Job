import './subscribe_form.css';
function SubscribeForm() {
    return ( 
        <div className="subscribe_form_container">
            <form action="#" className="subscribe_form">
                <input type="email" className="subscribe_form_input" placeholder='Email' required/>
                <input type="submit" value="Abunə Ol" className='subscribe_form_submit_btn' />
            </form>
        </div>
    );
}

export default SubscribeForm;