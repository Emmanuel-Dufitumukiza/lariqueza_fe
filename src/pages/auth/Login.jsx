import react, {useEffect, useState} from 'react'
import {BsGoogle,BsTwitter,BsGithub} from 'react-icons/bs'
import {FaFacebookF} from 'react-icons/fa'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";
import * as authService from '../../services/auth-service';

const Login = ()=>{
    const navigate = useNavigate();

    function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

        const [error, setError] = useState(null);
        const [checked, setChecked] = useState(false);

        useEffect(()=>{

        const token = localStorage.getItem("token");

        if(token){
          window.location.href = "/check";
          return ;
        }

         const emailCookie = getCookie('email');
         const passCookie = getCookie('password');

         if(emailCookie && passCookie){
         const check = document.getElementById("check");
         if(check){
          check.checked = true;
          setChecked(true)
         }
          setEmail(emailCookie);
          setPassword(passCookie);
         }

        },[])

    const [email, setEmail] = useState  (null);
    const [password, setPassword] = useState (null);

    const login = async(e)=>{
      e.preventDefault();
      setError(null);
      if(email && password){
        const res = await authService.Login({
          email: email?.trim(),
          password: password,
        });

      if(res.data.token!=null){
        localStorage.setItem("token", res.data.token);
       if(checked){
        document.cookie = "email="+email;
        document.cookie = "password="+password;
       }if(!checked){
        document.cookie = "email=";
        document.cookie = "password=";
       }
       return  window.location.href = "/main"
      }

      setError(res.data.message);
    }
    }

    return(
    <>
    <div className="login-page bg-gray-100 absolute min-h-full w-full top-0 left-0  flex justify-center items-center">
      <div className="bg-white px-11 py-14 rounded-md shadow-lg w-[95%] md:w-[35%] mx-auto flex my-20 justify-center items-center">
        <form  method='POST' onSubmit={login}  className='w-full'>

           <div className="top-header items-center justify-center flex text-center mb-5 w-full">
            <div className='w-full'>
                 <h1 className='text-large text-danger font-bold'>Login To Your Account</h1>

 <div className="socila-medias flex gap-x-5 w-full my-8 justify-center ">
  <div className="social">
   <BsGoogle size={20}></BsGoogle>
  </div>

  <div className="social">
   <FaFacebookF size={20}></FaFacebookF>
  </div>


    <div className="social">
   <BsTwitter size={20}></BsTwitter>
  </div>

    <div className="social">
   <BsGithub size={20}></BsGithub>
  </div>

 </div>

                 <p>Or use your email/phone to login:</p>
            </div>
           </div>

                                     {
                error?
                   <div className="inpt-cont w-full mb-5 text-center danger-alert">
              <small className='text-danger font-semibold text-center'>{error}</small>
              </div>
:
<></>
              }

            <div className="inpt-cont w-full mb-5">
              <input onChange={(e)=>{
                setEmail(e.target.value)
                }} type="email" defaultValue={email} placeholder='Email address' required className='py-4 px-4 rounded-md bg-gray-100 w-full' />
            </div>

            <div className="inpt-cont w-full mb-6">
              <input defaultValue={password} onChange={(e)=>{
                setPassword(e.target.value)
                }} type="password" placeholder='Password' required className='py-4 px-4 rounded-md bg-gray-100 w-full' />
            </div>

            <div className="inpt-cont w-full mb-20">
              <label className='label-cont float-left '>Remember me.
  <input 
 id='check'
  onChange={(e)=>{
    setChecked(e.target.checked)
  }} type="checkbox" className='p-4 h-[20px] w-[20px] rounded-md bg-danger'/>
  <span className="checkmark"></span>
</label>

<p className='float-right'>
  <a href="#" className='dangerLink'>Forgot Password?</a>
</p>
            </div>

<div className="grid grid-cols-2 gap-x-6 clear-left	">
         <div className="inpt-cont w-full mb-5 grid grid-cols-1">
        <button type='submit' className='py-4 px-4 rounded-md bg-danger text-white font-bold'>Sign In</button>
     </div>

          <div className="inpt-cont w-full mb-5 grid grid-cols-1">
        <button type='button' onClick={()=>{
          navigate("/register")
        }}
         className='py-4 px-4 rounded-md bg-white border-danger text-danger font-bold'>Sign Up</button>
     </div>
</div>

        </form>
      </div>
    </div>
    </>
    ) 
}

export default Login;