"use client";

import React, { useState, useEffect, useRef } from "react";

const VideoWithFallback = () => {
  const [videoSrc, setVideoSrc] = useState("/videos/header-video.mp4");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (!videoElement) return;
    
    const handleError = () => {
      // If local video fails to load, switch to external URL
      setVideoSrc("https://www.conexwest.com/sites/default/files/0806%282%29-1.mp4");
    };
    
    videoElement.addEventListener('error', handleError);
    
    return () => {
      videoElement.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoWithFallback;