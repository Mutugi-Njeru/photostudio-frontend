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
export const storeClientId=(clientId)=>localStorage.setItem("clientId", clientId)
export const storeUserId=(userId)=>localStorage.setItem("userId", userId)
export const getStoredUserId=()=>localStorage.getItem("userId")
export const getStoredClientName=()=>localStorage.getItem("name") 
export const getStoredClientId=()=>localStorage.getItem("clientId")
export const signUpClient=(client)=>axios.post(BASE_REST_API_URL+ 'client/create', client)
export const resetPassword=(email)=>axios.put(BASE_REST_API_URL+ 'user/password/' +email)
export const getCLientId=(username)=>axios.get(BASE_REST_API_URL+ 'client/get/id/' +username) 
export const bookSession=(session)=>axios.post(BASE_REST_API_URL+ 'event/add', session) 
export const getClientDetails=(clientId)=> axios.get(BASE_REST_API_URL+ 'client/details/' + clientId)
export const updateClientDetails=(clientId, client)=> axios.put(BASE_REST_API_URL+ 'client/update/'+ clientId, client)
export const updateClientPassword=(clientId, password)=> axios.put(BASE_REST_API_URL+ 'client/password/'+ clientId, password)
export const deactivateClientAccount=(clientId)=> axios.put(BASE_REST_API_URL+ 'client/deactivate/'+ clientId);
export const getClientEvents=(clientId)=> axios.get(BASE_REST_API_URL+ 'event/client/' + clientId)
export const getAllClients=()=> axios.get(BASE_REST_API_URL+ 'client/all')
export const deactivateUser=(userId)=> axios.put(BASE_REST_API_URL+ 'user/deactivate/'+ userId)
export const reactivateUser=(userId)=> axios.put(BASE_REST_API_URL+ 'user/reactivate/'+ userId)
export const getUserId=(username)=> axios.get(BASE_REST_API_URL+ 'user/get/id/' +username)
export const getAllEvents=()=> axios.get(BASE_REST_API_URL+ 'event/all')
export const approveEvent=(eventId)=> axios.put(BASE_REST_API_URL+ 'event/approve/'+ eventId)
export const rejectEvent=(eventId)=> axios.put(BASE_REST_API_URL+ 'event/reject/'+ eventId)
export const completeEvent=(eventId)=> axios.put(BASE_REST_API_URL+ 'event/complete/'+ eventId)
export const getAllUsers =()=>axios.get(BASE_REST_API_URL+ 'user/get-all')
export const getUser=(userId)=>axios.get(BASE_REST_API_URL+ 'user/get-user/' +userId)
export const updateUser=(userId, user)=>axios.put(BASE_REST_API_URL+ 'user/update/'+ userId, user)
export const updateUserPassword=(userId, password)=> axios.put(BASE_REST_API_URL+ 'user/update/password/' +userId, password)
export const createUser=(user)=>axios.post(BASE_REST_API_URL+ 'user/create', user)


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
