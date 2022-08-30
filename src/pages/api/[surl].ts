import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;

  console.log(query);
};
