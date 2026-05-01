// Next.js route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import {
  retrieveDataByID,
  retrieveProducts,
} from "../utils/db/servicefirebase";

type Data = {
  status: boolean;
  status_code: number;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const produkParam = req.query.produk;
  const produkId = Array.isArray(produkParam)
    ? produkParam[produkParam.length - 1]
    : produkParam;

  if (produkId && produkId !== "produk") {
    const data = await retrieveDataByID("products", produkId);
    if (!data) {
      res.status(404).json({
        status: false,
        status_code: 404,
        data: null,
      });
      return;
    }
    res.status(200).json({ status: true, status_code: 200, data });
    return;
  } else {
    const data = await retrieveProducts("products");
    res.status(200).json({ status: true, status_code: 200, data });
  }
}