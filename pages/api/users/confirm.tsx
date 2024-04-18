import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

// req.session에 user가 있는 걸 타입스크립트에 알려주기
declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.session);
  const { token } = req.body;

  // token을 받아서 해당 token이 존재하는지 확인하고 존재한다면 해당 token 리턴받고, 없다면 null
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
    include: { user: true },
  });
  if (!exists) return res.status(404).end();

  console.log(exists);
  // token이 있다면 정보가 확인되지만 user 정보는 없음 (userId만 보임).
  // findUnique에 'include: {user: true}' 추가하면 user정보까지 가져올 수 있음

  req.session.user = {
    id: exists.userId,
  };
  await req.session.save(); // 개발자도구 - Application - Cookies 에서 확인 가능

  res.status(200).end();
}

export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "carrotsession",
  password: "429108371985741902734",
});
