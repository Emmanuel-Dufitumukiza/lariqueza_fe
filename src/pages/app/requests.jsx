import react, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar';
import * as sellsService from '../../services/sells-service';
import ImgsViewer from "react-images-viewer";

const Page = ()=>{

const [sells, setSells] = useState([])
const [currentPost, setCurrentPost] = useState([])

const getSells = async()=>{
  const res = await sellsService.getSellRequests();
  setSells(res.data);
}

useEffect(()=>{
  getSells();
},[])

const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

  const currencyRegex = /\d{1,3}(?=(\d{3})+(?!\d))/g;

    return(
      <>
     <div className="md:grid tet-center md:float-none grid-cols-2 gap-5 relative top-[150px] justify-center items-center w-[60%] mx-auto">
          {
            sells?.map((sell)=>(
                 <div  className={`flex justify-center mb-4 w-[400px] md:w-auto ${sell?.photos?.length>0? '' : 'hidden'}`}>
  <div  className="rounded-lg shadow-lg bg-white max-w-sm">
    <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
      <img  className="rounded-t-lg min-w-full h-[300px] object-cover" src={sell?.photos[0]?.url} alt=""/>
    </a>
    <div  className="p-6 max-h-[360px] md:h-[280px]">
<div className='grid grid-cols-2'>
          <h5  className="text-gray-900 text-xl font-medium mb-2 text-left">{sell?.property_name}</h5>

      <h5  className="text-gray-900 text-xl font-medium mb-2 text-right text-danger">{sell?.price?.replace(
                                                                          currencyRegex,
                                                                          '$&,',
                                                                        ) + " RWF"}</h5>
</div>

      <p  className="text-gray-700 text-base mb-4 w-full wrap">
      {
        sell?.description?.length>200 ?
sell?.description?.slice(0,200)+"..."
        :
sell?.description
      }
      </p>

 <p className="text-gray-600 text-sm mb-3">Posted { + new Date(sell?.createdAt)?.getFullYear() + "-"+month[new Date(sell?.createdAt)?.getMonth()]+"-"+new Date(sell?.createdAt)?.getDate() +" - "+new Date(sell?.createdAt)?.toLocaleTimeString()}</p>

      <button onClick={()=>setCurrentPost(sell)} data-bs-toggle="modal" data-bs-target="#exampleModalLg" type="button"  className=" inline-block px-6 py-2.5 bg-danger text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-danger hover:shadow-lg focus:bg-danger focus:shadow-lg focus:outline-none focus:ring-0 active:bg-danger active:shadow-lg transition duration-150 ease-in-out">View Request</button>
    </div>
  </div>
</div>
            ))
          }



     </div>

<div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="exampleModalLg" tabindex="-1" aria-labelledby="exampleModalLgLabel" aria-modal="true" role="dialog">
  <div className="modal-dialog modal-dialog-scrollable  modal-dialog-centered modal-lg relative w-auto pointer-events-none">
    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLgLabel">
          {currentPost?.property_name}
        </h5>
        <button type="button"
          className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body relative p-4">
             <div className='mb-3'>
          <p className='font-semibold text-blue-400'>Full names:</p>
          <p className=' font-semibold'>{currentPost?.user?.username}</p>
        </div>
           <div className='mb-3'>
          <p className='font-semibold text-blue-400'>Email address:</p>
          <p className=' font-semibold'>{currentPost?.user?.email}</p>
        </div>
                <div className='mb-3'>
          <p className='font-semibold text-blue-400'>Description:</p>
          <p className=' font-semibold wrap'>{currentPost?.description}</p>
        </div>
        <div className='mb-3'>
          <p className='font-semibold text-blue-400'>Telephone number:</p>
          <p className=' font-semibold'>{currentPost?.telephone}</p>
        </div>
         <div className='mb-3'>
          <p className='font-semibold text-blue-400'>Is Price Negotiable?</p>
          <p className=' font-semibold'> {currentPost?.negotiable?.toString()}</p>
        </div>
            <div className='mb-3'>
          <p className='font-semibold text-blue-400'>Price:</p>
          <p className=' font-semibold'>{currentPost?.price?.replace(
                                                                          currencyRegex,
                                                                          '$&,',
                                                                        ) + " RWF"}</p>
        </div>
            <div className='mb-3'>
          <p className='font-semibold text-blue-400'>District :</p>
          <p className=' font-semibold'>{currentPost?.district}</p>
        </div>
              <div className='mb-3'>
          <p className='font-semibold text-blue-400'>Sector :</p>
          <p className=' font-semibold'>{currentPost?.sector}</p>
        </div>
              <div className='mb-3'>
          <p className='font-semibold text-blue-400'>Cell :</p>
          <p className=' font-semibold'>{currentPost?.cell}</p>
        </div>
              <div className='mb-3'>
          <p className='font-semibold text-blue-400'>Village :</p>
          <p className=' font-semibold'>{currentPost?.village}</p>
        </div>

{
  currentPost?.category?
           <div className='mb-3'>
          <p className='font-semibold text-blue-400'>Category :</p>
          <p className=' font-semibold'>{currentPost?.category}</p>
        </div>
  :
  <></>
}

<div className='mb-3'>
          <p className='font-semibold text-blue-400 mb-3'>Photos :</p>

  <div className="images grid grid-cols-3 gap-x-3">
  {
    currentPost?.photos?.map((photo)=>(
      <div>
        <img src={photo?.url} alt="" className='rounded-md' />
      </div>
    ))
  }
  </div>
</div>


      </div>
    </div>
  </div>
</div>

     </>
    )
}

const Requests = ()=>{
    return (
        <>
         <Navbar Page={<Page/>} ></Navbar>
        </>
    )
}

export default Requests;