import express from "express";
import cors from "cors";
import { CreateRoomSchema, CreateSigninSchema, CreateSignupSchema } from "@repo/common/types";
import argon2 from "argon2";
import { prismaClient } from "@repo/db/client";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CustomRequest, middleware } from "./middleware";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req,res) => {
  const parshedData = await CreateSignupSchema.safeParse(req.body);
  if(!parshedData.success) {
    res.json({
      message : "Incorrect inputs"
    })
    return;
  }

  try {

    const hashedPassword = argon2.hash(parshedData.data.password);
    const user = await prismaClient.user.create({
      data : {
        email : parshedData.data.username,
        password : hashedPassword,
        name : parshedData.data.name
      }
    })

    res.json({
      message : "User created successfully, Signup successfull",
      userId : user.id
    })

  } catch (e) {
    res.json({
      message : "Error while signup"
    })
  }
})


app.post("/signin", async (req,res) => {
  const parshedData = await CreateSigninSchema.safeParse(req.body);
  if(!parshedData.success) {
    res.json({
      message : "Incorrect inputs"
    })
    return;
  } 

  try {

    const user = await prismaClient.user.findFirst({
      where : {
        email : parshedData.data.username
      }
    })

    if(!user) {
      res.json({
        message : "Email is not corrrect"
      })
      return;
    }

    const isValidPassword = await argon2.verify(user.password,parshedData.data.password);
    if(!isValidPassword) {
      res.json({
        message : "Incorrect password"
      })
      return;
    }

    const token = jwt.sign({
      userId : user.id
    },JWT_SECRET);

    res.json({
      message : "User signin successfully",
      token
    })

  } catch(e) {
    res.json({
      message : "Error while signin"
    })
  }
})

app.post("/room", middleware, async (req : CustomRequest,res) => {
  const parshedData = await CreateRoomSchema.safeParse(req.body);
  if(!parshedData.success) {
    res.json({
      message : "Incorrect inputs"
    })
    return;
  }

  try {

    const userId = req.userId;

    const room = await prismaClient.room.create({
      data : {
        slug : parshedData.data.name,
        adminId : userId
      }
    })

    res.json({
      message : room.id
    })

  } catch (e) {

    res.json({
      message : "Error while creating room"
    })

  }
})

app.get("/chat/:roomId", async (req,res) => {
 try {
    const roomId = Number(req.params.roomId);

    const messages = await prismaClient.chat.findMany({
      where : {
        roomId : roomId
      },
      orderBy : {
        id : "desc"
      },
      take : 50
    })
  
    res.json({
      messages
    })
 } catch(e) {
    res.json({
      messages : []
    })
 }
})

app.get("/room/:slug", async (req,res) => {
  const slug = req.params.slug;

  const room = await prismaClient.room.findFirst({
    where : {
      slug
    }
  })

  res.json({
    room
  })
})

app.listen(3001);
