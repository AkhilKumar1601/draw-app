"use client";

import initDraw from "@/draw";
import { useEffect, useRef } from "react"

export default function Canvas() {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    
    if (canvasRef.current) {
      initDraw(canvasRef.current);
    }
  }, [canvasRef])

  return <div>
    <canvas height={1080} width={1080}></canvas>
  </div>
}