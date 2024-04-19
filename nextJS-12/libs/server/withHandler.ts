import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

interface ConfigType {
  method: "GET" | "POST" | "DELETE";
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

export default function withHandler({
  method,
  isPrivate = true, // 로그인 화면만 public이고 대부분의 화면은 private 이기 때문에 true를 기본 설정으로 지정
  handler,
}: ConfigType) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    // res.json({ hello: true }); // 데이터가 들어오는지 확인차 예시코드

    if (req.method !== method) {
      // 만약 req.method가 우리가 원한 method가 아니라면 405 응답
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: "Plz log in." });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
