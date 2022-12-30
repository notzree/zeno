import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const userData = JSON.parse(req.body);
  res.status(200).json(req.body);
  
}
