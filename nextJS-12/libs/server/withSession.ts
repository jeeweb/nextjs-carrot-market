import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "carrotsession",
  password: process.env.COOKIE_PASSWORD!,
  // virtual environment에서 password를 가져와야하는데 undefined 일 가능성의 우려를 없애기 위해 !를 붙여서 Nullish(null 이나 undefined) 값이 아님을 단언해줌
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
