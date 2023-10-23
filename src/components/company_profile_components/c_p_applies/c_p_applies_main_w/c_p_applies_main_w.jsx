import { Outlet } from 'react-router-dom';
import './c_p_applies_main_w.css';

function CpAppliesMainWindow() {
    return ( 
        <div className="c_p_applies_main_w_cont">
            <Outlet />
        </div>
     );
}

export default CpAppliesMainWindow;