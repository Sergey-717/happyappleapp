// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma";

export function getTabelNameByKey(key: string): string {
  switch (key) {
    case "modelId":
      return `"Model".id`;
    case "valueId":
      return `"Values".id`;
    default:
      return ``;
  }
}

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const categoryId = req.query.categoryId;
  const filter: any = { ...req.query, categoryId: undefined } || {};
  let whereIn: string = `WHERE "Categories".id='${categoryId}'`;
  let orderBy: string = ``;

  Object.entries(filter).forEach(([key, value]: any) => {
    switch (key) {
      case "order":
        orderBy = "ORDER BY " + (value as string).split(",").map((el) => el);
        break;
      case "new":
        whereIn += value !== "all" ? `AND ${value}` : ``;
        break;
      case "modelId":
      case "valueId":
        whereIn += ` AND ${getTabelNameByKey(key)} IN (${(value as string)
          .split(",")
          .map((el) => `'${el}'`)})`;
        break;
    }
  });

  const data = await prisma.$queryRaw(
    Prisma.raw(`SELECT DISTINCT
    "Products".*
    FROM "Products"
    JOIN "Model" ON "Products"."modelId"="Model".id
    JOIN "Categories" ON "Categories".id="Model"."categoryId"
    JOIN "ProductCharacteristicValues" ON "Products".id="ProductCharacteristicValues"."productId"
    JOIN "Values" ON "Values".id="ProductCharacteristicValues"."valueId"
    JOIN "Characteristics" ON "Characteristics".id="ProductCharacteristicValues"."characteristicId"
    ${whereIn} ${orderBy}
  `)
  );

  res.status(200).send(data);
};
