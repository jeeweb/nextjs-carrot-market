import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body; // phone 혹은 email 둘 중 하나의 데이터를 가짐
  let user;

  // Email로 로그인할 때
  if (email) {
    user = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (user) console.log("found it.");
    if (!user) {
      console.log("Did not find. Will create.");
      user = await client.user.create({
        data: {
          name: "Anonymous",
          email,
        },
      });
    }
    console.log(user);
  }

  // phone번호로 로그인할 때
  if (phone) {
    user = await client.user.findUnique({
      where: {
        // phone,   // 입력된 phone 데이터를 그냥 확인하면 string으로 들어오기 때문에 타입에러 발생
        phone: +phone, // string을 간단하게 number로 바꿔줌
      },
    });
    if (user) console.log("found it.");
    if (!user) {
      console.log("Did not find. Will create.");
      user = await client.user.create({
        data: {
          name: "Anonymous",
          phone: +phone, // string을 간단하게 number로 바꿔줌
        },
      });
    }
    console.log(user);
  }
  return res.status(200).end();
}

export default withHandler("POST", handler);
