import React, { useEffect, useRef } from 'react'

const OldTv = () => {

    const canvasRef = useRef(null);

    useEffect( () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();

        window.addEventListener('resize' ,resizeCanvas);

        const drawNoise = () => {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
              const color = Math.random() * 255;
              data[i] = color;         // Red
              data[i + 1] = color;     // Green
              data[i + 2] = color;     // Blue
              data[i + 3] = 255;       // Alpha
            }
            ctx.putImageData(imageData, 0, 0);
            requestAnimationFrame(drawNoise);
        };

        drawNoise();

        // clean up the unmount

    },[]);


  return <canvas ref={canvasRef} className="noise noise-animate" id="noise" />;
}

export default OldTv;