import {Routes, Route } from 'react-router-dom';
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
import Profile from './pages/profile/profile';
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
function App() {
  return (
    <div className='container'>
      {/* _______________ header _______________*/}
      <Header/>
      {/* ___________ routers ________________  */}
      <div className='main_pages_container'>
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
              <Route path='/login/otp/:email' element={<SendOtpForm />}/>
              <Route path='/login/new_password/:email/:otp' element={<UpdatePasswordForm />}/>
            </Route>
            <Route path='/signup' element={<Signup/>}>
              <Route index element={<UserSignup/>}/>
              <Route path='/signup/user_signup' index element={<UserSignup/>}/>
              <Route path='/signup/company_signup' element={<CompanySignup/>}/>
            </Route>
            <Route path='/profile' element={<Profile/>}/>
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