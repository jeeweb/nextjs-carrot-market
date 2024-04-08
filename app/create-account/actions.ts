"use server";
import { z } from "zod";

// password 정규식 - 소문자, 대문자, 숫자, 특수문자 일부를 모두 포함하는지 검사
const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);

// username 요소 검증
// potato 단어 감지
const checkUsername = (username: string) => !username.includes("potato");
// password와 confirm_password 비교
const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

// 유효성검사를 위한 schema
const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string",
        required_error: "Where is my username???",
      })
      .min(5, "Way too short!!!")
      .max(10, "That is too loooong")
      .refine(checkUsername, "No potatoes allowed!"),
    email: z.string().email(),
    password: z
      .string()
      .min(10)
      .regex(
        passwordRegex,
        "Passwords must contain at least one UPPERCASE, lowercase, number and special characters #?!@$%^&*-"
      ),
    confirm_password: z.string().min(10),
  })
  .refine(checkPasswords, {
    message: "Both passwords should be the same!",
    path: ["confirm_password"],
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
