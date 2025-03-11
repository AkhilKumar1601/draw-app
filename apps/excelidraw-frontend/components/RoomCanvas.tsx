import { BACKEND_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export default function RoomCanvas({roomId} : {roomId : string}) {

  const [socket,setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
     
    const ws = new WebSocket(`${BACKEND_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4NGRlMzU1My0yNThmLTQ3YmMtODdlYy1iYTI5MWIwODg0YmEiLCJpYXQiOjE3MzcyMTczMjF9.b2Q3B-RUDAV0equhOjET7Hyl1AQaBf1FW4szk6mvGxU`)

    ws.onopen = () => {
      setSocket(ws);
      const data = JSON.stringify({
        type : "join_room",
        roomId
      })

      ws.send(data);
    }
     
  },[])

  if(!socket) {
    return <div>
      Connecting to Server...
    </div>
  }

  return <div>
    <Canvas roomId={roomId} socket={socket}></Canvas>
  </div>

}