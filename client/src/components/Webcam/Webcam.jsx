import React, { useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 400,
  height: 375,
  facingMode: "user"
};

export const WebcamCapture = () => {
  const [image, setImage] = useState("");
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  });

  return (
    <div className="webcam-container">
      <div className="webcam-img">
        {image === "" ? (
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={375}
            videoConstraints={videoConstraints}
          />
        ) : (
          <img id="screen-image" src={image} alt="user-image"/>
        )}
      </div>
      <div>
        {image !== "" ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setImage("");
            }}
            className="webcam-btn capture"
          >
            Retake Image
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              capture();
            }}
            className="webcam-btn capture"
            id="webcam-btn"
          >
            Capture
          </button>
        )}
      </div>
    </div>
  );
};
