import API from '../utils/Axios';

export const sendSellRequest = async(sell)=>{
   console.log("sell", sell)
   const res = await API.post("/requests/sell", sell);
   return res;
}

export const getSellRequests = async()=>{
   const res = await API.get("/requests/sells");
   return res;
}