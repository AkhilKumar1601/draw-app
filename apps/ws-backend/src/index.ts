import { WebSocket,WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config"; 
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port : 8080});

function checkUser(token : string) : string | null {
  try {

    const decoded = jwt.verify(token,JWT_SECRET) || "";

    if(typeof decoded == "string") {
      return null
    }

    if(!decoded || !decoded.userId) {
      return null;
    }

    return decoded.userId;

  } catch (e) {
    return null;
  }
 }

interface User {
  ws : WebSocket,
  rooms : string[],
  userId : string
};

const users : User[] = [];

wss.on('connection', function connection(ws,request) {
  const url = request.url;
  if(!url) {
    return;
  }
  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";

  const userId = checkUser(token);

  if(userId == null) {
    ws.close();
    return null;
  }

  users.push({
    ws,
    rooms : [],
    userId
  })

  ws.on('message', async function message(data) {
    const parshedData = JSON.parse(data as unknown as string);

    if(parshedData.type === "join_room") {
      const user = users.find(x => x.ws === ws);
      user?.rooms.push(parshedData.roomId);
    }

    if(parshedData.type === "leave_room") {
      const user = users.find(x => x.ws === ws);
      if(!user) {
        return;
      }
      user.rooms = user?.rooms.filter(x => x === parshedData.room);
    }

    if(parshedData.type === "chat") {
      const roomId = parshedData.roomId;
      const message = parshedData.message;

      await prismaClient.chat.create({
         data : {
          roomId : roomId,
          message : message,
          userId : userId
         }
      });

      users.forEach(user => {
        if(user.rooms.includes(roomId)) {
          user.ws.send(JSON.stringify({
            type : "chat",
            message : message,
            roomId : roomId
          }))
        }
      })
    }
  })

})