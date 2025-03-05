import { z } from "zod";

export const CreateSignupSchema = z.object({
  username : z.string().min(3).max(30),
  password : z.string().min(5),
  name : z.string()
});

export const CreateSigninSchema = z.object({
  username : z.string().min(3).max(30),
  password : z.string().min(5)
});

export const CreateRoomSchema = z.object({
  name : z.string()
})