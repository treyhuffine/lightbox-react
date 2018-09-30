import React from 'react';

const Video = () => (
  <iframe
    title="cats"
    width="560"
    height="315"
    src="https://www.youtube.com/embed/5dsGWM5XGdg"
    style={{
      maxWidth: '97%',
      position: 'absolute',
      left: 0,
      right: 0,
      margin: 'auto',
      top: '50%',
      transform: 'translateY(-50%)',
    }}
  />
);

export default Video;
