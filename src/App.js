import {Routes, Route, useLocation,useNavigate } from 'react-router-dom';
import './App.css';
import CompanySignup from './components/company_signup/company_signup';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import UserSignup from './components/user_signup/user_signup';
import About from './pages/about/about';
import Companies from './pages/companies/companies';
import Contact from './pages/contact/contact';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Notfound from './pages/not_found_page/not_found';
import UserProfile from './pages/user_profile/user_profile';
import Signup from './pages/signup/signup';
import Vacancies from './pages/vacancies/vacancies';
import PageTopBtn from './components/page_top_btn/page_top_btn';
import PostDetail from './pages/post_Detail/post_detail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SendOtpForm from './components/sendOtpForm/sendOtpForm';
import LoginForm from './components/login_form/login_form';
import ForgotPasswordForm from './components/forgot_password_form/forgot_password_form';
import UpdatePasswordForm from './components/update_password_form/update_password_form';
import CompanyProfile from './pages/company_profile/company_profile';
import { useState ,useEffect} from 'react';
import CompanyProfileDashboard from './components/company_profile_components/company_profile_dashboard/company_profile_dashboard';
import CompanyProfileVacancies from './components/company_profile_components/company_profile_vacancies/company_profile_vacancies';
import CompanyProfileMyVacancies from './components/company_profile_components/company_profile_my_vacancies/company_profile_my_vacancies';
import ComProCreateVacancy from './components/company_profile_components/com_pro_create_vacancy/com_pro_create_vacancy';
import ComProPremiumVacancies from './components/company_profile_components/com_pro_premium_vacancies/com_pro_premium_vacancies';
import { useDispatch,useSelector } from 'react-redux';
import io from 'socket.io-client';
import { clearUser } from './redux/reducers/userauthReducers';
import { logout } from './apiservices';
import { setSocket } from './redux/reducers/socketReducers';
function App() {
  const navigate = useNavigate();
  const socket = io('https://seal-app-5gg2a.ondigitalocean.app/api');
  const {user,isLoggedIn} = useSelector(state=>state.user);
  useEffect(()=>{
    if(isLoggedIn && user){
      socket.emit('joinRoom',user._id)
    }
  },[user,isLoggedIn,socket])
  const location = useLocation();
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSocket(socket));
    return () => {
      socket.disconnect();
    };
  }, [dispatch, socket]);
  const lgout = async () => {
    const {data} = await logout();
    if(data.success){
      dispatch(clearUser())
    } 
  }
  useEffect(()=>{
    socket.on('company-block',data=>{
      console.log(data)
      lgout();
      navigate('/login')
    })
  },[socket])
  return (
    <div className='container'>
      {/* _______________ header _______________*/}
      <Header/>
      {/* ___________ routers ________________  */}
      <div className={`main_pages_container ${location.pathname.includes('/company_profile') ? 'main_pages_top' : ''}`}>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/vacancies' element={<Vacancies/>} />
          <Route path='/vacancies/:id' element={<PostDetail />} />
          <Route path='/companies' element={<Companies/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/login' element={<Login/>}>
            <Route index element={<LoginForm />} />
            <Route path='/login/forgot_password' element={<ForgotPasswordForm />} />
            <Route path='/login/otp/:email' element={<SendOtpForm tema="password_changing"/>}/>
            <Route path='/login/new_password/:email/:otp' element={<UpdatePasswordForm />}/>
          </Route>
          <Route path='/signup' element={<Signup/>}>
            <Route index element={<UserSignup/>}/>
            <Route path='/signup/user_signup' index element={<UserSignup/>}/>
            <Route path='/signup/company_signup' element={<CompanySignup/>}/>
          </Route>
          <Route path='/user_profile' element={<UserProfile/>}/>
          {/* _________________  company profile routers __________________ */}
          <Route path='/company_profile' element={<CompanyProfile />}>
            <Route index path='/company_profile/dashboard' element={<CompanyProfileDashboard />} />
            <Route path='/company_profile/vacancies' element={<CompanyProfileVacancies />}>
              <Route index element={<CompanyProfileMyVacancies />} />
              {/* <Route path='/company_profile/vacancies/my_vacancies' element={<CompanyProfileMyVacancies />} /> */}
              <Route path='/company_profile/vacancies/create_vacancy' element={<ComProCreateVacancy />}/>
              <Route path='/company_profile/vacancies/premium' element={<ComProPremiumVacancies />}/>
            </Route>
          </Route>
          <Route path='*' element={<Notfound/>} />            
        </Routes>
      </div>            
      {/* notification message in react toastify */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* ________ footer _____________________ */}
      <Footer/>
      <PageTopBtn />
    </div>
  );
}
export default App;