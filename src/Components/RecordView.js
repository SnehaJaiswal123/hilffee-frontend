import { useEffect, useRef } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

const RecordView = () => {
  const { status,previewStream, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true });

    const submitRecording=async()=>{
      try {
        const formData = new FormData();
        formData.append('file', new File([mediaBlobUrl], 'recorded-video.webm'));
    
        const response = await axios.post('https://hilfee-backend.onrender.com/recording', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        console.log(response.data);
    
      } catch (error) {
        console.error('Error uploading video:', error);
    
      } finally {
        setIsUploading(false);
      }
    }

    const ReStartRecording=()=>{
      stopRecording()
      startRecording()
    }

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

  return (
    <div>
      {
        status==='idle'?
        <>
        <video src={mediaBlobUrl} controls />
        <button className='btn' onClick={startRecording}>Start Recording</button>
        </>:
        <>
        </>
      }
  
      {(status=='recording')?
        <div className="vdopreview"><VideoPreview stream={previewStream}/></div>:
         <></>
      }
      {status=='recording'?
          <>
          <button className='btn' onClick={stopRecording}>Stop Recording</button>
          <button className='btn' onClick={ReStartRecording}>Restart Recording</button>
          </>:
          <></>
      }
      {
        status=='stopped'?
        <>
        <video src={mediaBlobUrl} controls />
        <button className='btn' onClick={submitRecording}>Submit</button>
        </>:
        <></>
      }
      
      
    </div>
  );
};

export default RecordView
