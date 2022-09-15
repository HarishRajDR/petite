import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const link = req.query["link"];
  const surl = req.query["surl"];

  if (!(surl && link) || typeof link !== "string" || typeof surl !== "string") {
    res.statusCode = 404;

    res.send(JSON.stringify({ message: "Invalid Request" }));

    return;
  }

  //Adding the link to the database
  const addData = await prisma?.shortLink.create({
    data: {
      url: link,
      surl: surl,
    },
  });

  return res.status(200).json(addData);
};
