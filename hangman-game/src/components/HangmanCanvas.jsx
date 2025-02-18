import React, { useRef, useEffect } from "react";

const HangmanCanvas = ({ wrongGuesses }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    drawHangman(wrongGuesses);
  }, [wrongGuesses]);

  const drawHangman = (stage) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";

    // Base
    ctx.beginPath();
    ctx.moveTo(20, 280);
    ctx.lineTo(180, 280);
    ctx.stroke();

    // Pole
    ctx.moveTo(50, 280);
    ctx.lineTo(50, 50);
    ctx.lineTo(120, 50);
    ctx.lineTo(120, 80);
    ctx.stroke();

    if (stage >= 0) {
      ctx.beginPath();
      ctx.arc(120, 100, 20, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (stage >= 1) {
      ctx.moveTo(120, 120);
      ctx.lineTo(120, 180);
      ctx.stroke();
    }
    if (stage >= 2) {
      ctx.moveTo(120, 140);
      ctx.lineTo(90, 160);
      ctx.stroke();
    }
    if (stage >= 3) {
      ctx.moveTo(120, 140);
      ctx.lineTo(150, 160);
      ctx.stroke();
    }
    if (stage >= 4) {
      ctx.moveTo(120, 180);
      ctx.lineTo(90, 230);
      ctx.stroke();
    }
    if (stage >= 5) {
      ctx.moveTo(120, 180);
      ctx.lineTo(150, 230);
      ctx.stroke();
    }
  };

  return <canvas ref={canvasRef} width={200} height={300} className="hangman-canvas"></canvas>;
};

export default HangmanCanvas;
