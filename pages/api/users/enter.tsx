import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body; // phone 혹은 email 둘 중 하나의 데이터를 가짐
  const payload = phone ? { phone: +phone } : { email };
  const user = await client.user.upsert({
    where: {
      ...payload,
      /*
        ...(phone && { phone: +phone }),  // ...(phone ? { phone: +phone }: {}),
        ...(email && { email })           // ...(email ? { email }: {}),
      */
    },
    create: {
      name: "Anonymous",
      ...payload,
      /*
        ...(phone && { phone: +phone }),  // ...(phone ? { phone: +phone }: {}),
        ...(email && { email })           // ...(email ? { email }: {}),
      */
    },
    update: {},
  });
  console.log(user);

  return res.status(200).end();
}

export default withHandler("POST", handler);
