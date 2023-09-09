import axiosInstance from './axiosInstances';


export const validateUserData = (userData,type) => {
    return axiosInstance.post('/checkUserAndValidate/'+type,userData);
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
export const updateUserForgottenPassword = (userData) => {
    return axiosInstance.post('/updatePassword',userData);
}
export const emailIsUserOrCompany = (data) => {
    return axiosInstance.post('/emailiusrorcmp',data);
}