import react,{useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/images/logo.jpg'
import Sell from '../pages/app/sell'
import * as authService from '../services/auth-service';

const Navbar = ({Page})=>{

        const sidebar = useRef();
    const toggle = useRef();
    const [currentUser, setCurrentUser] = useState({})

        useEffect(()=>{
            
        const token = localStorage.getItem("token");

        if(!token){
          window.location.href = "/check";
          return ;
        }

        getUserInfo();
    },[])

    const getUserInfo = async()=>{
          const res = await authService.getUser();
           setCurrentUser(res.data);
    }

    const toggleMenu = ()=>{  
      if(sidebar){
        sidebar.current.classList.toggle("close");
      }
    }

    const Logout = ()=>{
        localStorage.removeItem("token");
        window.location.href = '/'
    }

    const navigate = useNavigate();

    return (
        <>
<div className="main-component">
            <nav ref={sidebar} className="sidebar float-left shadow-md">
        <header>
            <div className="image-text">
                <span className="image">
                    <img src={Logo} alt=""/>
                </span>

                <div className="text logo-text">
                    <span className="name">REQUEZA</span>
                    <span className="profession">Company LTD</span>
                </div>
            </div>

            <i onClick={toggleMenu} className='bx bx-chevron-right toggle'></i>
        </header>

        <div className="menu-bar">
            <div className="menu">

                <li className="search-box">
                    <i className='bx bx-search icon'></i>
                    <input type="text" placeholder="Search..."/>
                </li>

                <ul className="menu-links">
                    <li className="nav-link">
                        <a href="#">
                            <i className='bx bx-home-alt icon' ></i>
                            <span className="text nav-text">Dashboard</span>
                        </a>
                    </li>

                    <li className="nav-link">
                        <a href="#">
                            <i className='bx bx-bar-chart-alt-2 icon' ></i>
                            <span className="text nav-text">Buy Property</span>
                        </a>
                    </li>

                    <li className="nav-link">
                        <a href="#" onClick={()=>navigate("/sell")}>
                            <i className='bx bx-pie-chart-alt icon' ></i>
                            <span className="text nav-text">Sell Property</span>
                        </a>
                    </li>

                    <li className="nav-link">
                        <a href="#">
                            <i className='bx bx-user icon' ></i>
                            <span className="text nav-text">Manage Users</span>
                        </a>
                    </li>

                                        <li className="nav-link">
                        <a href="#" onClick={()=>navigate("/requests")}>
                            <i className='bx bx-wallet icon' ></i>
                            <span className="text nav-text">Requests</span>
                        </a>
                    </li>

                    <li className="nav-link">
                        <a href="#">
                            <i className='bx bx-wallet icon' ></i>
                            <span className="text nav-text">Responses</span>
                        </a>
                    </li>

                </ul>
            </div>

            <div className="bottom-content">
                <li className="">
                    <a href="#" onClick={Logout}>
                        <i className='bx bx-log-out icon' ></i>
                        <span className="text nav-text">Logout</span>
                    </a>
                </li>

                <li className="mode">
                    <div className="sun-moon">
                        <i className='bx bx-moon icon moon'></i>
                        <i className='bx bx-sun icon sun'></i>
                    </div>
                    <span className="mode-text text">Dark mode</span>

                    <div className="toggle-switch">
                        <span className="switch"></span>
                    </div>
                </li>
                
            </div>
        </div>

    </nav>

    <div className="top-side-bar px-10 z-[9] bg-white w-full fixed top-0 float-right right-0 shadow-md flex justify-end items-center gap-x-5">

                    <div className="nav-link">
                        <a href="#">
                            <i className='bx bx-bell icon' style={{fontSize: '25px'}}></i>
                        </a>
                    </div>

                        <div className="nav-link">
                        <a href="#">
                            <i className='bx bx-envelope icon' style={{fontSize: '25px'}}></i>
                        </a>
                    </div>

<div className="flex gap-x-1">
         <div className="user-profile">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA3W3oppN7sdVCsUWwwnPIn9pX6E6G2UW70w&usqp=CAU" alt="" />
     </div>

     <p className='mt-2'>{currentUser?.username}</p>
</div>
     
    </div>

  {Page}

  <div className='h-[100px] w-full relative top-[150px]'></div>

</div>
        </>
    )
}

export default Navbar;