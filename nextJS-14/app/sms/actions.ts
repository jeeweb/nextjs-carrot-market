"use server";
import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "Wrong phone format"
  );

const tokenSchema = z.coerce.number();

interface ActionState {
  token: boolean;
}

export async function smsLogIn(prevState: ActionState, formData: FormData) {
  // console.log(typeof formData.get("token")); // string
  // console.log(typeof tokenSchema.parse(formData.get("token"))); // number
  const phone = formData.get("phone");
  const token = formData.get("token");
  if (!prevState.token) {
    // 유저가 전화번호만 입력한 경우
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      // 잘못된 전화번호를 입력한다면
      console.log(result.error.flatten());
      return {
        token: false, // token을 false로 return. 유저가 다음 단계로 넘어갈 수 없음
        error: result.error.flatten(),
      };
    } else {
      return {
        token: true,
      };
    }
  } else {
    // token을 받은 경우
    const result = tokenSchema.safeParse(token);
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      // 인증 성공하여 화면이 넘어가므로 아무것도 return 하지 않음
      // 유저를 home으로 redirect
      redirect("/");
    }
  }
}
