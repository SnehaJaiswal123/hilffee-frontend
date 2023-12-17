import React, { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import axios from 'axios';

const VideoRecorder = () => {
  const [mediaBlob, setMediaBlob] = useState(null);
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    video: true,
    onStop: (blob) => {
      setMediaBlob(blob);
    },
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleStartRecording = () => {
    startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  const handleSaveVideo = async () => {
    if (!mediaBlob) {
      console.error('No recorded video to save.');
      return;
    }

    setIsUploading(true);

    try {
      const videoUrl = URL.createObjectURL(mediaBlob);

      console.log('Recorded Video URL:', videoUrl);

    } catch (error) {
      console.error('Error handling recorded video:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <video
        controls
        width="500"
        height="400"
        src={status === 'recording' ? undefined : {mediaBlob}}
      />
      <div>
        {status === 'idle' && <button onClick={handleStartRecording}>Start Recording</button>}
        {status === 'recording' && <button onClick={handleStopRecording}>Stop Recording</button>}
        {status === 'stopped' && <button onClick={handleSaveVideo} disabled={isUploading}>Save Video</button>}
        {isUploading && <p>Uploading...</p>}
      </div>
    </div>
  );
};

export default VideoRecorder;
