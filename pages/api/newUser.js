import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  const userData = JSON.parse(req.body);
  res.status(200).json(req.body);
  
}
