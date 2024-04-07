"use server";
import { z } from "zod";

// 유효성검사를 위한 schema
const formSchema = z.object({
  username: z.string().min(5).max(10), // string 타입의 최소 5자, 최대 10자
  email: z.string().email(),
  password: z.string().min(10),
  confirm_password: z.string().min(10),
});

export async function createAccount(prevState: any, formData: FormData) {
  // 유효성 검사 대상 데이터 - create-account의 각 input 데이터 가져오기
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  // console.log(data);

  /* parse()
  try {
    formSchema.parse(data);
  } catch (e) {
    console.log(e);
  }
  */

  // safeParse() -> 에러를 throw 하지 않음
  const result = formSchema.safeParse(data);
  // console.log(result)
  if (!result.success) {
    // console.log(result.error);  // console에 error표시
    return result.error.flatten();
  }
}
