// @ts-nocheck

import { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../../helpers/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("getting data:", req.query.address);

  if (req.method === "GET") {
    const address = req.query.address;

    const result = await excuteQuery({
      query: {
        sql: "SELECT nft_id FROM nfts_apenft WHERE owner = ?",
        rowsAsArray: true,
      },
      values: [req.query.address],
    });

    // const nftIds = result.map((nft) => nft.nft_id);
    res.status(200).json({ nft_ids: result });
  }
}

export default handler;
