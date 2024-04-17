import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(401).end(); // bad request
  }
  console.log(req.body); // 로그인 시도한 이메일 가져오기
  res.status(200).end();
}
