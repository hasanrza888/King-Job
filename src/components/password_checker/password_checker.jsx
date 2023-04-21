import './password_checker.css';
function PasswordChecker({pasLength, upperCase, lowerCase}) {    
    return ( 
        <div className="password_checker_container">
            <div className="password_checker_row">
                <span className= {`password_checker_row_color ${pasLength ? 'password_checker_row_color_active' : null}`}></span>
                <div className="password_checker_row_text">
                    Ən az 8 simvol
                </div>
            </div>
            <div className="password_checker_row">
                <span className= {`password_checker_row_color ${upperCase ? 'password_checker_row_color_active' : null}`}></span>
                <div className="password_checker_row_text">
                    Ən az 1 böyük hərf
                </div>
            </div>
            <div className="password_checker_row">
                <span className= {`password_checker_row_color ${lowerCase ? 'password_checker_row_color_active' : null}`}></span>
                <div className="password_checker_row_text">
                    Ən az 1 kiçik hərf
                </div>
            </div>
        </div>
     );
}

export default PasswordChecker;