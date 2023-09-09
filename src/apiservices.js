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