import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { clearUser, setUser, setInfo } from './redux/reducers/userauthReducers';
import { setJobs } from './redux/reducers/jobReducers';
import { logout, loggedin, searchall } from './apiservices';
import { setSocket } from './redux/reducers/socketReducers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from './components/spinnerForPageLoading/LoadingSpinner';
// Lazy-loaded components
const CompanySignup = React.lazy(() => import('./components/company_signup/company_signup'));
const Footer = React.lazy(() => import('./components/footer/footer'));
const Header = React.lazy(() => import('./components/header/header'));
const UserSignup = React.lazy(() => import('./components/user_signup/user_signup'));
const About = React.lazy(() => import('./pages/about/about'));
const Companies = React.lazy(() => import('./pages/companies/companies'));
const Contact = React.lazy(() => import('./pages/contact/contact'));
const Home = React.lazy(() => import('./pages/home/home'));
const Login = React.lazy(() => import('./pages/login/login'));
const Notfound = React.lazy(() => import('./pages/not_found_page/not_found'));
const UserProfile = React.lazy(() => import('./pages/user_profile/user_profile'));
const Signup = React.lazy(() => import('./pages/signup/signup'));
const Vacancies = React.lazy(() => import('./pages/vacancies/vacancies'));
const PageTopBtn = React.lazy(() => import('./components/page_top_btn/page_top_btn'));
const PostDetail = React.lazy(() => import('./pages/post_Detail/post_detail'));
const VideoChat = React.lazy(() => import('./pages/videochat/VideoChat'));
const SendOtpForm = React.lazy(() => import('./components/sendOtpForm/sendOtpForm'));
const LoginForm = React.lazy(() => import('./components/login_form/login_form'));
const ForgotPasswordForm = React.lazy(() => import('./components/forgot_password_form/forgot_password_form'));
const UpdatePasswordForm = React.lazy(() => import('./components/update_password_form/update_password_form'));
const CompanyProfile = React.lazy(() => import('./pages/company_profile/company_profile'));
const CompanyProfileDashboard = React.lazy(() => import('./components/company_profile_components/company_profile_dashboard/company_profile_dashboard'));
const CompanyProfileVacancies = React.lazy(() => import('./components/company_profile_components/company_profile_vacancies/company_profile_vacancies'));
const CompanyProfileMyVacancies = React.lazy(() => import('./components/company_profile_components/company_profile_my_vacancies/company_profile_my_vacancies'));
const ComProCreateVacancy = React.lazy(() => import('./components/company_profile_components/com_pro_create_vacancy/com_pro_create_vacancy'));
const ComProPremiumVacancies = React.lazy(() => import('./components/company_profile_components/com_pro_premium_vacancies/com_pro_premium_vacancies'));

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [socket, setSocket] = useState(null);
  const { user, isLoggedIn, info } = useSelector(state => state.user);

  useEffect(() => {
    if (isLoggedIn) {
      setSocket(io('https://seal-app-5gg2a.ondigitalocean.app'));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await searchall();
        if (data.success) {
          dispatch(setJobs(data.jobs));
        }
      } catch (error) {
        console.log("error:", error.name);
      }
    };
    if (!location.search) {
      fetchJobs();
    }
  }, [dispatch, location.search]);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const { data } = await loggedin();
      console.log(data)
      if (!data.succes) {
        dispatch(clearUser());
        return;
      } else {
        if (data.user.returnedData.u_t_p === 'c_m_p') {
          if (data.user.info.isBlock) {
            console.log("okkkokokok")
            return logoutUser();
          }
        }
        dispatch(setUser(data.user.returnedData));
        dispatch(setInfo(data.user.info));
      }
    };
    checkLoggedIn();
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && user && socket) {
      socket.emit('joinRoom', user._id);
    }
  }, [user, isLoggedIn, socket]);

  async function logoutUser() {
    const { data } = await logout();
    if (data.success) {
      dispatch(clearUser());
    }
  }

  useEffect(() => {
    if (socket && isLoggedIn && user) {
      socket.on('company-block', (data) => {
        logoutUser();
        navigate('/login');
      });
    }
  }, [socket, isLoggedIn, navigate, user]);

  return (
    <div className='container'>
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
      <React.Suspense fallback={<LoadingSpinner />}>
        {!location.pathname.includes('/videochat') && <Header />}
        <div className={`main_pages_container ${location.pathname.includes('/company_profile') ? 'main_pages_top' : ''}`}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/vacancies' element={<Vacancies />} />
            <Route path='/vacancies/:id' element={<PostDetail />} />
            <Route path='/companies' element={<Companies />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/videochat/:meetingId' element={<VideoChat />} />
            <Route path='/login' element={<Login />}>
              <Route index element={<LoginForm />} />
              <Route path='forgot_password' element={<ForgotPasswordForm />} />
              <Route path='otp/:email' element={<SendOtpForm tema="password_changing" />} />
              <Route path='new_password/:email/:otp' element={<UpdatePasswordForm />} />
            </Route>
            <Route path='/signup' element={<Signup />}>
              <Route index element={<UserSignup />} />
              <Route path='user_signup' index element={<UserSignup />} />
              <Route path='company_signup' element={<CompanySignup />} />
            </Route>
            <Route path='/user_profile' element={<UserProfile />} />
            <Route path='/company_profile' element={<CompanyProfile />}>
              <Route index path='dashboard' element={<CompanyProfileDashboard />} />
              <Route path='vacancies' element={<CompanyProfileVacancies />}>
                <Route index element={<CompanyProfileMyVacancies />} />
                <Route path='create_vacancy' element={<ComProCreateVacancy />} />
                <Route path='premium' element={<ComProPremiumVacancies />} />
              </Route>
            </Route>
            <Route path='*' element={<Notfound />} />
          </Routes>
        </div>
        
        {!location.pathname.includes('/videochat') && <Footer />}
        <PageTopBtn />
      </React.Suspense>
    </div>
  );
}

export default App;
