import react, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar';

import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Provinces, Districts, Sectors, Cells, Villages } from 'rwanda';
import Select from 'react-select';
import { BsCamera, BsPlus } from 'react-icons/bs';
import 'tw-elements';
import jwt_decode from "jwt-decode";
import * as sellsService from '../../services/sells-service';
import { useNavigate } from 'react-router-dom';

const Sell = ()=>{

    const navigate  = useNavigate();

    const [allDistricts, setAllDistricts] = useState([])
    const [allSectors, setAllSectors] = useState([])
    const [allCells, setAllCells] = useState([])
    const [allVillages, setAllVillages] = useState([])

    const [dist, SetDist] = useState(null)
    const [cell, SetCell] = useState(null)
    const [sector, SetSector] = useState(null)
    const [village, SetVillage] = useState(null)

    useEffect(()=>{
    let arr = [];
    Districts()?.map((d)=>{
     arr.push({value: d, label: d})
    })
    setAllDistricts(arr)
},[])

const getSectors =(dist)=>{
    SetDist(dist)
    Provinces().map((p)=>{
        Districts(p)?.map((d)=>{
            if(d == dist){
                let arr = []
                 Sectors(p,dist)?.map((s)=>{
                 arr.push({value: s, label: s})
                });
                setAllSectors(arr);
                return 0;
            }
        })
    })
}

const getCells =(sector)=>{
    SetSector(sector)
    Provinces().map((p)=>{
        Districts(p)?.map((d)=>{
            Sectors(p,d)?.map((s)=>{
                if(s == sector){
                        let arr = []
                 Cells(p,d,sector)?.map((c)=>{
                 arr.push({value: c, label: c})
                });
                setAllCells(arr);
                    return 0;
                }
            })
        })
    })
}

const getVillage =(cell)=>{
    SetCell(cell)
    Provinces().map((p)=>{
        Districts(p)?.map((d)=>{
            Sectors(p,d)?.map((s)=>{
                if(s == sector){
                Cells(p,d,s)?.map((c)=>{
                    if(c == cell){
                        console.log(p,d,s,c)

                let arr = []
             Villages(p,d,s,cell)?.map((v)=>{
                 arr.push({value: v, label: v})
                });
                setAllVillages(arr);

                        return 0;
                    }
                })
            }
            })
            
        })
    })
}

    const [cameraImages, setCameraImages] = useState([]);

      function handleTakePhoto (dataUri) {
    console.log('takePhoto',dataUri);
    setCameraImages([...cameraImages, dataUri]);
  }

    const options = [
  {value: 'Agricultural', label: 'Agricultural'},
   {value: 'Commercial', label: 'Commercial'},
   {value: 'Industrial', label: 'Industrial'} ,
   {value: 'Residential', label: 'Residential'}
];
const defaultOption = options[0];

const [images, setImages] = useState([]);

  const loadFile = function(event) {

  const reader = new FileReader();
  let file =event.target.files[0]
  reader.addEventListener("load", () => {
    setImages([...images,reader.result]);
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}

const [modelOpen, setModelOpen] = useState(false);
const [tel, setTel] = useState(null);
const [name, setName] = useState(null);
const [cat, setCategory] = useState(null);
const [price, setPrice] = useState(null);
const [desc, setDesc] = useState(null);
const [negotiable,setNegotiable] = useState(false);

const submit = async(e)=>{
    e.preventDefault();

    if(dist && sector && cell && village && name && tel && images?.length>0 && cat && price && desc){
      let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/duldhdjsj/image/upload';
      let imagesInfo = [];

      
    for(let i=0; i<images.length; i++){   
            let data = {
                "file": images[i],
                "upload_preset": "s1ef0r8m",
            }

            const r = await fetch(CLOUDINARY_URL, {
                body: JSON.stringify(data),
                headers: {
                  'content-type': 'application/json'
                },
                method: 'POST',
              });

               let imageInfo = await r.json()
                console.log(imageInfo)
                imagesInfo.push({url: imageInfo?.url, public_id: imageInfo?.public_id})

              if(i+1 == images.length){
                        let token = localStorage.getItem("token");
        let decoded = jwt_decode(token);
        
        const res = await sellsService.sendSellRequest({
            user: decoded?.userId,
            district: dist,
            cell: cell,
            village: village,
            sector: sector,
            property_name: name,
            price: price,
            telephone: tel,
            photos: imagesInfo,
            negotiable: negotiable,
            description: desc,
            category: cat
        })

        navigate("/requests");
              }
    }

    console.log("image info", imagesInfo);

        return ;
    }else{
       alert("Please make sure all fields are filled");
    }
}



    return(
   <>

   <div className="child w-[80%] md:w-full float-right relative top-[100px] flex items-center justify-center z-[8]">
 {/* <Camera
      onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
    /> */}

    {/* <h2 className='font-bold text-xl text-dark mb-20'>Sell Property</h2> */}

    <form method='POST' onSubmit={submit} className='md:w-[40%] top-20 relative bg-white rounded-md shadow-lg p-6'>
        <div className="inpt-cont w-full block mb-3">
            <label htmlFor="" className='mt-2 mr-2'>Property Name</label>
            <input required onKeyUp={(e)=>{
                setName(e.target.value);
            }} type="text" maxLength={150} className='outline-none py-2 px-6 w-full' />
        </div>

               <div className="inpt-cont w-full block mb-3">
            <label htmlFor="" className='mt-2 mr-2'>Description (400 words)</label>
            <textarea rows={4} required onKeyUp={(e)=>{
                setDesc(e.target.value);
            }} type="text" maxLength={'400'} className='outline-none py-2 px-6 w-full md:w-full' />
        </div>

                    <div className="inpt-cont w-full mb-3">
            <label htmlFor="" className='mt-2 mr-2'>Property Category</label>
                 <Select
    placeholder="Select Category"
        onChange={(e)=>{
            setCategory(e.value);
        }}
        options={options}
      />
        </div>

                            <div className="inpt-cont w-full mb-3">
            <label htmlFor="" className='mt-2 mr-2'>District</label>
            <Select
             options={allDistricts} onChange={(e)=>{
                getSectors(e.value)
            }} placeholder="Select District" />
        </div>

            <div className="inpt-cont w-full mb-3">
            <label htmlFor="" className='mt-2 mr-2'>Sector</label>
            <Select options={allSectors} onChange={(e)=>{
getCells(e.value)
            }} placeholder={'Select Sector'}  />
        </div>

                    <div className="inpt-cont w-full mb-3">
            <label htmlFor="" className='mt-2 mr-2'>Cell</label>
            <Select options={allCells} onChange={(e)=>{
getVillage(e.value)
            }} placeholder={'Select Cell'}/>
        </div>

                          <div className="inpt-cont w-full mb-3">
            <label htmlFor="" className='mt-2 mr-2'>Village</label>
            <Select options={allVillages} onChange={(e)=>{
    SetVillage(e.value)
            }} placeholder={'Select Village'} />
        </div>

                   <div className="inpt-cont w-full mb-3">
            <label htmlFor="" className='mt-2 mr-2'>Telephone Number (+250)</label>
            <input
             onKeyUp={(e)=>{
                setTel(e.target.value);
            }} type="number" required maxLength={'9'} className='outline-none py-2 px-6 w-full' />
        </div>

          <div className="grid grid-cols-2 gap-x-6">
                  <div className="inpt-cont w-full mb-3 grid grid-cols-1">
            <label htmlFor="" className='mt-2 mr-2'>Property Price (RWF)</label>
            <input onKeyUp={(e)=>{
                setPrice(e.target.value)
            }} required type="number" maxLength={10} className='outline-none py-2 px-6 w-full' />
        </div>

               <div className="inpt-cont w-full mb-3 grid grid-cols-1">
                          <label className='label-cont mt-10 '>
                            Is Price Negotiable?
  <input 
 id='check'
  onKeyUp={(e)=>{
                setNegotiable(e.target.checked);
            }}
  type="checkbox" className='p-4 h-[20px] w-[20px] rounded-md bg-danger'/>
  <span className="checkmark"></span>
</label>
        </div>
          </div>

        <div className="inpt-cont w-full mb-3">
            <label htmlFor="img1" className='mt-2 mr-2 flex cursor-pointer'> <BsPlus size={24}></BsPlus> Click To Upload Photo</label>
            <button onClick={()=>setModelOpen(true)} type='button' className='flex gap-x-2 mt-3'  data-bs-toggle="modal" data-bs-target="#exampleModalLg"><BsCamera size={24}></BsCamera> Use Camera</button>
            <input  type="file" id='img1'  accept="image/*" onChange={(e)=>{
                loadFile(e)
            }} className='outline-none hidden py-2 px-6 md:w-full' />
        </div>

{
    images?.map((img)=>(
                <div className='w-full mb-3'>
            <img src={img} id='output' className='max-w-full' alt="" />
        </div>
    ))
}

<div className="text-center my-10">
<button  className='py-4 px-10 bg-danger rounded-md outline-none text-white'>Submit</button>
</div>
    </form>
    
</div>

<div  className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="exampleModalLg" tabindex="-1" aria-modal="true" role="dialog"
data-bs-backdrop="static" data-bs-keyboard="false" 
  aria-labelledby="staticBackdropLabel" aria-hidden="true"
>
  <div  className="modal-dialog-scrollable h-[90vh] modal-dialog-centered modal-dialog modal-lg relative w-auto pointer-events-none">
    <div  className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div  className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
        <h5  className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLgLabel">
          Take Property Photo
        </h5>
        <button type="button"
        onClick={()=>setModelOpen(false)}
           className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div  className="modal-body relative p-4">
<div>
    {
        modelOpen && cameraImages?.length<4?
        <Camera
        sizeFactor={1}
 onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
/>
        :
<></>
    }
</div>

<div className='my-3'>
  <div className="images-cont grid grid-cols-4 gap-x-3 ">
   {
    cameraImages?.map((img)=>(
        <div className="img-cont">
   <img src={img} alt="" />
   </div>
    ))
   }
  </div>
</div>

    <div className="text-center mx-auto my-4">
        <button data-bs-dismiss="modal" aria-label="Close" onClick={()=>{
            let arr = [];
            for(let i=0; i<cameraImages?.length; i++) {
              arr.push(cameraImages[i]);
            }
                 for(let i=0; i<images?.length; i++) {
              arr.push(images[i]);
            }
            setImages(arr);
            setModelOpen(false);
            setCameraImages([]);
        }} type='button' className='py-4 px-10 bg-danger rounded-md outline-none text-white'>Open</button>
    </div>
    
      </div>
    </div>
  </div>
</div>
   
   </>
    )
}

const SellPage = ()=>{
    return (
        <>
         <Navbar Page={<Sell/>}></Navbar>
        </>
    )
}

export default SellPage;