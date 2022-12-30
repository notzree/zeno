import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    const msgData =JSON.parse(req.body);
    const savedMsgData = await prisma.messages.create({
    data: msgData
   
    });
    res.status(200).json(msgData);
  } catch (e) {
    res.status(400).json({ message: "Something went wrong" });
  }


}
