import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const RecordView = () => {
  const {type}=useParams();
  const [recorded, setRecorded] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState('');
  const { status, previewStream, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true });

    const navigate=useNavigate()

  const submitRecording = async () => {
    try {
      toast('Prompt submitted')
      const response = await axios.get(mediaBlobUrl, { responseType: "blob" });
      const formData = new FormData();
      formData.append(
        "video",
        new Blob([response.data], { type: "video/mp4" }),
        "video.mp4"
      );
      formData.append('id',type)
      const uploadResponse = await axios.post(
        "https://hilfee-backend.onrender.com/recording",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(uploadResponse.data);
      setRecordedUrl(uploadResponse.data);
      navigate('/app/jobs')
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const ReStartRecording = () => {
    stopRecording();
    startRecording();
  };

  const VideoPreview = ({ stream }) => {
    const videoRef = useRef(null);

    useEffect(() => {
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
      }
    }, [stream]);
    if (!stream) {
      return null;
    }
    return <video ref={videoRef} width={500} height={500} autoPlay controls />;
  };

  useEffect(()=>{
     const getjob=async()=>{
      try{
        const response=await axios.get('https://hilfee-backend.onrender.com/getjobbyid',{
        params:{id:type}
       })
       console.log('status',response.data.status);
       if(response.data.status==true){
          setRecorded(true)
          console.log(response.data.videoUrl);
          setRecordedUrl(response.data.videoUrl)
       }
      }
      catch(e){
        console.log(e);
      }
       
     }
     getjob()
  },[])

  return (
    <div>
      {
        recorded==true?<>
        <video src={recordedUrl} controls />
        </>:
        <>
        </>
      }
      {status === "idle"&&recorded!==true ? (
        <>
          <div className="vdopreview">
          <video src={mediaBlobUrl} controls />
          </div>
          <button className="btn" onClick={startRecording}>
            Start Recording
          </button>
        </>
      ) : (
        <></>
      )}

      {status == "recording"&&recorded!==true ? (
        <>
          <div className="vdopreview">
            <VideoPreview stream={previewStream} />
          </div>
          <button className="btn" onClick={stopRecording}>
            Stop Recording
          </button>
          <button className="btn" onClick={ReStartRecording}>
            Restart Recording
          </button>
        </>
      ) : (
        <></>
      )}
      {status == "stopped"&&recorded!==true ? (
        <>
          <video src={recorded} controls />
          <button className="btn" onClick={submitRecording}>
            Submit
          </button>
        </>
      ) : (
        <></>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default RecordView;
