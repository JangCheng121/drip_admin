import React, { useEffect, useRef } from 'react';
// import * as mpegts from 'mpegts.js';


const MpegtsPlayer = ({ src }) => {
    const videoRef = useRef(null);
    
    useEffect(() => {
      let player;
      if (typeof window !== 'undefined') {
        import('mpegts.js').then((mpegts) => {
          if (mpegts.isSupported()) {
            player = mpegts.createPlayer({
              type: 'mse', // Assuming 'mse' for Media Source Extensions
              url: src,
            }, {
              // Configuration options here
            });
            player.attachMediaElement(videoRef.current);
            player.load();
            player.play();
          }
        });
      }
    
      return () => {
        if (player) {
          player.pause();
          player.detachMediaElement();
          player.destroy();
        }
      };
    }, [src]);
    
    return <video 
        width={'100%'}
        height={'100%'}
        ref={videoRef} controls />;
    };
    
    export default MpegtsPlayer;
    