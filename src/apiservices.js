import axiosInstance from './axiosInstances';


export const validateUserData = (userData) => {
    return axiosInstance.post('/checkUserAndValidate',userData);
}
export const verifyEmailAndSendOtp = (data) => {
    return axiosInstance.post('/verifyEmailAndSendOtp',data);
}
export const verifyOtp = (data) => {
    return axiosInstance.post('/verifyOtp',data);
}
export const registerUser = (userData) => {
    return axiosInstance.post('/registerUser',userData);
}
export const registerCompany = (companyData) => {
    return axiosInstance.post('/registerCompany',companyData);
}
export const updateUserForgottenPassword = (userData) => {
    return axiosInstance.post('/updatePassword',userData);
}
export const updateCompanyForgottenPassword = (userData) => {
    return axiosInstance.post('/changeCompanyForgottenPassword',userData)
}
export const emailIsUserOrCompany = (data) => {
    return axiosInstance.post('/emailiusrorcmp',data);
}
export const loginUser = (data) => {
    return axiosInstance.post('/loginUser',data);
}
export const loginCompany = (data) => {
    return axiosInstance.post('/loginCompany',data);
}
export const logout = () => {
    return axiosInstance.get('/logout');
}
export const loggedin = () => {
    return axiosInstance.get('/loggedin');
}
export const getjobs = () => {
    return axiosInstance.get('/getJobs');
}
export const getfilteroptions = () => {
    return axiosInstance.get('/getctgsubctg');
}
export const getJobWithId = (id) => {
    return axiosInstance.get('/getJobWithId/'+id);
}
export const searchJobs = (params) => {
    return axiosInstance.get('/searchJobs'+params)
}
export const getFavoritJobs = (id) => {
    return axiosInstance.get('/getAllUSerSavedJobs/'+id);
}
export const addFavoritJobs = (userid,jobid) => {
    return axiosInstance.post('/addJobToSaved/'+userid+'/'+jobid);
}
export const getCategories = () => {
    return axiosInstance.get('/allcategories');
}

export const subscribe = (data) => {
    return axiosInstance.post('/addEmail',data)
}

export const searchadvance = (value) => {
    return axiosInstance.get(`/advancesearch?value=${value}`)
}



export const searchall = (query) => {
    const r = query === undefined ? '' :query
    return axiosInstance.get('/searchJobsTest'+r);
}


export const analyzcv = (data) => {
    return axiosInstance.post('/cvanalyzer',data)

}


export const getcompanies = () => {
    return axiosInstance.get('/getCompanies')
}


export const checkMeetingBetweenUserAndCompany = (data) => {
    return axiosInstance.post('/checkMeetingBetweenUserAndCompanyAndSet',data);
}


export const apllyNewJob = (data) => {
    return axiosInstance.post('/postApply',data);
}




export const getAllNumbersForCompanyMenuAndDashboard = (id) => {
    return axiosInstance.get('/getNumbersForCompanyMenu/'+id);
}

export const getMonthlyVacancyData = (id) => {
    return axiosInstance.get('/getMontlhyVakansyData/'+id);
}