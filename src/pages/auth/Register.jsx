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

const Register = ()=>{
    const navigate = useNavigate();

    const [error, setError] = useState(null);

        useEffect(()=>{
        const token = localStorage.getItem("token");

        if(token){
          window.location.href = "/check";
          return ;
        }
    },[])

    const [fullName, setFullName] = useState(null);
    const [email, setEmail] = useState  (null);
    const [password, setPassword] = useState (null);

    const signup = async(e)=>{
      e.preventDefault();
      setError(null);
      if(fullName?.trim()?.length>0 && email && password){
        const res = await authService.Signup({
          fullNames: fullName?.trim(),
          email: email?.trim(),
          password: password,
        });

      if(res.data.token!=null){
       return  window.location.href = "/main"
      }

      setError(res.data.message);
    }
    }

    return(
    <>
    <div className="login-page bg-gray-100 absolute min-h-full w-full top-0 left-0  flex justify-center items-center">
      <div className="bg-white px-11 py-14 rounded-md shadow-lg w-[95%] md:w-[35%] mx-auto flex my-20 justify-center items-center">
        <form method='POST' onSubmit={signup} className='w-full'>

           <div className="top-header items-center justify-center flex text-center mb-5 w-full">
            <div className='w-full'>
                 <h1 className='text-large text-danger font-bold'>Create Account</h1>

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

                 <p>Or use your email for registeration:</p>
            </div>
           </div>

            <div className="inpt-cont w-full mb-5">
                <input onChange={(e)=>{
                setFullName(e.target.value)
                }} type="text" placeholder='Full Names' required className='py-4 px-4 rounded-md bg-gray-100 w-full' />
            </div>

               {/* <div className="inpt-cont w-full mb-5">
                <input type="text" placeholder='Phone Number' required className='py-4 px-4 rounded-md bg-gray-100 w-full' />
            </div> */}

            <div className="inpt-cont w-full mb-5">
              <input onChange={(e)=>{
                setEmail(e.target.value)
                }} type="email" placeholder='Email address' required className='py-4 px-4 rounded-md bg-gray-100 w-full' />
              {
                error?
              <small className='text-danger font-semibold'>{error}</small>
:
<></>
              }
            </div>

            <div className="inpt-cont w-full mb-5">
              <input onChange={(e)=>{
                setPassword(e.target.value)
                }} type="password" placeholder='Password' required className='py-4 px-4 rounded-md bg-gray-100 w-full' />
            </div>

            {/* <div className="inpt-cont w-full mb-6">
              <input type="password" placeholder='Confirm Password' required className='py-4 px-4 rounded-md bg-gray-100 w-full' />
            </div> */}

            <div className="inpt-cont w-full mb-7">
              <label className='label-cont'>I agree to the <a href="#" className='text-danger'>Terms</a> and <a href="#" className='text-danger'>Privacy Policy</a>.
  <input type="checkbox"  required className='p-4 h-[20px] w-[20px] rounded-md bg-danger'/>
  <span className="checkmark"></span>
</label>
            </div>

<div className="grid grid-cols-2 gap-x-6">
         <div className="inpt-cont w-full mb-5 grid grid-cols-1">
        <button type='submit' className='py-4 px-4 rounded-md bg-danger text-white font-bold'>Sign Up</button>
     </div>

          <div className="inpt-cont w-full mb-5 grid grid-cols-1">
        <button onClick={()=>{
          navigate("/login")
        }} type='button' className='py-4 px-4 rounded-md bg-white border-danger text-danger font-bold'>Sign In</button>
     </div>
</div>

        </form>
      </div>
    </div>
    </>
    ) 
}

export default Register;