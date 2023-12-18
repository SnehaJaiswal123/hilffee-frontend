import React, { useEffect, useState } from 'react'
import Jobs from './Jobs'
import axios from 'axios'

const Myjobs = () => {

  const [jobs,setJobs]=useState([])

  useEffect(()=>{
     const fun=async()=>{
      const data=localStorage.getItem('userdata')
      const jsonData=JSON.parse(data)
     await axios.get('https://hilfee-backend.onrender.com/getuserrole/',{
      params:{owner:jsonData.data.user._id}
     })
     .then((res)=>setJobs(res.data))
     .catch((e)=>console.log(e))
     console.log(jobs);
     }
     fun()
  },[])

  return (
    <div className='myjobs-main'>
      {
        jobs.map((job,i)=>{
          console.log(1);
          return <Jobs index={i+1} name={job.jobRole}/>
        })
      }
      
    </div>
  )
}

export default Myjobs
