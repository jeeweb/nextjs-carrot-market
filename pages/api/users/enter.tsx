import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body; // phone 혹은 email 둘 중 하나의 데이터를 가짐
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + ""; // 랜덤숫자토큰
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          // user를 검색해서 만약 찾으면 token과 connect, 못찾으면 새로 생성
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  console.log(token);

  if (phone) {
    /* 크래딧 낭비 방지를 위한 주석처리
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.MY_PHONE!,
      body: `Your login token is ${payload}.`,
    });
    console.log(message);*/
  }

  return res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
