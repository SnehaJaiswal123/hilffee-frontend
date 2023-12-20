import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PromptContext } from "../Context/Prompt";
import RecordView from "./RecordView";

export default function Jobs(props) {


  return (
    <div className="job">
      <h3 className="job-title">{props.index}{'.'} {props.name}</h3>
      <div className="prompt">
        <label htmlFor="">Prompt1:</label>
        
        <Link to={{ pathname: `/app/recording/${props.jobid}` }}>{props.videostatus==true?'view':'start recording'}</Link>
      </div>
    </div>
  );
}
