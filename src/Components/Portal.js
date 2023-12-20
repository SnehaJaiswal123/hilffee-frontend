import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Portal = () => {
  const [selectedRole,setSelectedRole]=useState("Retail/B2C Sales - Inside Sales")
  
  const handleJobSelect=(e)=>{
    setSelectedRole(e.target.value);
  }
  const handleAddjobs=async()=>{
    toast("Job Added");
    const data=localStorage.getItem('userdata')
    const jsonData=JSON.parse(data)
    const config = {
      headers: { "Content-type": "application/json"},
    };
    await axios.post('https://hilfee-backend.onrender.com/createjob/',
    {
       jobRole:selectedRole,
       owner:jsonData.data.user._id
    },
    config
    )
    .then((res)=>console.log("role saved"))
    .catch((e)=>console.log(e))

  }

  return (
    <div className="portal-main">
      <div>
        <label className="role">
          Select Role:
        </label>
        <select onChange={handleJobSelect} className="drop-down" id="role">
          <option value="Retail/B2C Sales - Inside Sales">Retail/B2C Sales - Inside Sales</option>
          <option value="Retail/B2C Sales - Field Sales">Retail/B2C Sales - Field Sales</option>
          <option value="Enterprise/B2B Sales">Enterprise/B2B Sales</option>
          <option value="BD/Pre Sales">BD/Pre Sales</option>
          <option value="Sales Support and Operations">Sales Support and Operations</option>
        </select>
      </div>
      <button onClick={handleAddjobs} className="btn">
        Add to my jobs
      </button>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Portal;
