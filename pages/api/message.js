import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    const msgData = JSON.parse(req.body);
    const { data, error } = await supabase
      .from("messages")
      .insert(msgData)
      .select();
    res.status(200).json({ data });
  } catch (e) {
    res.status(400).json({ message: "Something went wrong" });
  }
}
