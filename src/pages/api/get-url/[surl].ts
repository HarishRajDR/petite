import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const surl = req.query["surl"];

  console.log(surl);

  if (!surl || typeof surl !== "string") {
    res.statusCode = 404;

    res.send(JSON.stringify({ message: "Please use with short url phrase" }));

    return;
  }

  const data = await prisma.shortLink.findFirst({
    where: {
      surl: {
        equals: surl,
      },
    },
  });

  if (!data) {
    res.statusCode = 404;

    res.send(JSON.stringify({ message: "URL Does not exist" }));

    return;
  }

  return res.json(data);
};
