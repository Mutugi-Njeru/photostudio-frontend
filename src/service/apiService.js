import axios from "axios";

const BASE_REST_API_URL='http://localhost:8080/';

axios.interceptors.request.use(function (config) {
    config.headers['Authorization']=getToken()
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

export const loginUser=(auth)=>axios.post(BASE_REST_API_URL+ 'auth/authenticate', auth)
export const storeToken=(token)=>localStorage.setItem("token", token)
export const getToken=()=>localStorage.getItem("token") 
export const getRole =(username)=> axios.get(BASE_REST_API_URL+ 'role/get/' +username);
export const saveUserRole=(role)=>sessionStorage.setItem("userRole", role)
export const saveLoggedinUser=(username)=> sessionStorage.setItem("authenticatedUser", username)
export const getClientName=(username)=> axios.get(BASE_REST_API_URL+ 'client/get/' +username)
export const storeClientName=(name)=>localStorage.setItem("name", name)
export const getStoredClientName=()=>localStorage.getItem("name") 
export const signUpClient=(client)=>axios.post(BASE_REST_API_URL+ 'client/create', client)
export const logout=()=>{
    localStorage.clear();
    sessionStorage.clear();
  }

  export const isUserLoggedIn =()=>{
    const username=sessionStorage.getItem("authenticatedUser")
    const userRole = sessionStorage.getItem("userRole");

    if (username == null) {
      return { isAuth: false, userRole: null };
    } else {
      return { isAuth: true, userRole };
    }
  }
