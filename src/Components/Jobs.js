import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Jobs(props) {

  return (
    <div className="job">
      <h3 className="job-title">{props.index}{'.'} {props.name}</h3>
      <div className="prompt">
        <label htmlFor="">Prompt1:</label>
        <Link style={{fontSize:"smaill"}} to='/app/recording' className="btn">Start Recording</Link>
      </div>
    </div>
  );
}
