import API from '../utils/Axios';

export const Signup = async(user)=>{
   const res = await API.post("/auth/register", user);
   return res;
}

export const Login = async(user)=>{
   const res = await API.post("/auth/login", user);
   return res;
}

export const getUser = async()=>{
   const res = await API.get("/auth/getUser");
   return res;
}

export const checkAuth = async()=>{
   const res = await API.get("/auth/checkauth");
   return res;
}