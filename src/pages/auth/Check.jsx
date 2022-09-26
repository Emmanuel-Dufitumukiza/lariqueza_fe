import react, { useEffect } from 'react'
import * as authService from '../../services/auth-service';

const Check = ()=>{
    useEffect(()=>{
        checkAuth();
    },[])

    const checkAuth = async()=>{
       const res = await authService.checkAuth();
       if(res.data.success == 'true'){
       return window.location = '/main'
       }
       localStorage.removeItem("token");
       return window.location = '/login'
    }
    return(
        <>
        <p>Please wait...</p>
        </>
    )
}

export default Check;