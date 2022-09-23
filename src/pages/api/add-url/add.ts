import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const link = req.query["link"];
  const slug = req.query["surl"];

  if (!(slug && link) || typeof link !== "string" || typeof slug !== "string") {
    res.statusCode = 404;

    res.send(JSON.stringify({ message: "Invalid Request" }));

    return;
  }

  //Check for availability of slug
  const usedSlugs = await prisma?.shortLink.findMany({
    where: {
      surl: {
        equals: slug,
      },
    },
  });

  console.log(usedSlugs);

  if (usedSlugs.length) {
    res.statusCode = 404;
    res.send(
      JSON.stringify({
        error: true,
      })
    );
    return;
  }

  console.log("I'm here!");

  //Adding the link to the database
  const addData = await prisma?.shortLink.create({
    data: {
      url: link,
      surl: slug,
    },
  });

  return res.status(201).json({ ...addData, error: false });
};
