import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "nextJS-12/libs/server/withHandler";
import client from "nextJS-12/libs/server/client";
import { withApiSession } from "nextJS-12/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // user profile 조회하기
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });
  res.json({
    ok: true,
    profile,
  });
}

export default withApiSession(withHandler("GET", handler));
