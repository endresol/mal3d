import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Load file from server
    const fileContent = fs.readFileSync("./scripts/whitelist.json", "utf8");
    res.status(200).json({ content: fileContent });
  } else if (req.method === "POST") {
    // Save file to server
    const { content } = req.body;
    fs.writeFileSync("./scripts/whitelist.json", content);
    res.status(200).json({ message: "File saved successfully" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
