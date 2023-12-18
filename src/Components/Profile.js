import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'


const Profile = () => {
    const [image,setImage]=useState('')
    const [name,setName]=useState('')
    const [date,setDate]=useState('')

    const imageRef=useRef(null)

    const handleImageSelect=(e)=>{
        setImage(e.target.files[0])   
    }
   const handlename=(e)=>{
      setName(e.target.value)
   }
   const handledate=(e)=>{
    setDate(e.target.value)
   }
    const handleInputImage=()=>{
        imageRef.current.click()
   }

  const submitProfile=async(e)=>{
    const data=localStorage.getItem('userdata')
    const jsonData=JSON.parse(data)
    console.log({owner:jsonData.data.user._id});
      const formdata=new FormData()
      formdata.append('file',image)
      formdata.append('name',name)
      formdata.append('dob',date)
      formdata.append('owner',jsonData.data.user._id)
      await axios.post('https://hilfee-backend.onrender.com/createprofile',formdata)
      .then((res)=>setImage(res.data.img))
      .catch((e)=>console.log({myerr:e}))
  }

  useEffect(() => {
    const fetchUsers = async () => {
    const data=localStorage.getItem('userdata')
    const jsonData=JSON.parse(data)
    console.log(jsonData.data.user._id);
      try {
        const response = await axios.get('https://hilfee-backend.onrender.com/getprofile',{
          params:{owner:jsonData.data.user._id}
        });
        console.log(response);
        setImage(response.data.img)
        setName(response.data.name)
        setDate(response.data.dob)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='profile-main'>
      <div onClick={handleInputImage}>
         {image? <img className='img' src={image} alt={image.name}/>    
        :<img className='img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpbF9MRc872DyqrFDJJ3MRq68r08IaEKCNGzAqYNpeSK38HOao_E2_50CtB2V4TGM_5ag&usqp=CAU' alt="image" />}
        <input type="file"
        name='file'
        ref={imageRef}
        onChange={handleImageSelect}
        style={{display:"none"}}
       />
      </div>
      
      <div className='profile-name'>
        <label htmlFor="">Name:</label>
        <input type="text" value={name} onChange={handlename}/></div>
      <div className='profile-dob'>
      <label htmlFor="">DOB:</label>
        <input type="date" onChange={handledate}/></div>
      <div><button onClick={submitProfile}>Submit</button></div>
    </div>
  )
}

export default Profile
