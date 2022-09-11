import type { NextApiRequest, NextApiResponse } from "next";
import catharsis from "../../catharsis.json";

export type Meta = {
  id: number;
  name: string;
  image: string;
  attributes: any;
};

// eslint-disable-next-line
export default (req: NextApiRequest, res: NextApiResponse<Meta | unknown>) => {
  try {
    const id = parseInt(req.query.id as string, 10);
    if (isNaN(id)) {
      return res.status(404).json({ error: "Invalid id" });
    }
    const token = catharsis.find((token) => token.id === id);
    if (!token) {
      return res.status(404).json({ error: "Token not found" });
    }

    // @ts-ignore
    return res.status(200).json(token);
  } catch (e) {
    return res.status(500).json(e);
  }
};
