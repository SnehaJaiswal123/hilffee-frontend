import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Jobs(props) {

  const RecordVideo=()=>{
     const navigate=useNavigate()
     navigate('/app/recording')
  }
  return (
    <div className="job">
      <h3 className="job-title">{props.index}{'.'} {props.name}</h3>
      <div className="prompt">
        <label htmlFor="">Prompt1:</label>
        <Link style={{fontSize:"smaill"}} to='/app/recording'>Start Recording</Link>
      </div>
    </div>
  );
}
