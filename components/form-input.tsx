import { InputHTMLAttributes } from "react";

interface FormInputProps {
  name: string; // name 속성을 필수로 작성하게 하기 위해 남겨놓기
  errors?: string[];
  // 아래 속성들은 input 기본 속성들로, 직접 적어주는 대신 spread로 받아오기
  // type: string;
  // placeholder: string;
  // required: boolean;
}

export default function FormInput({
  errors = [],
  name,
  ...rest
}: FormInputProps & InputHTMLAttributes<HTMLInputElement>) {
  console.log(rest);
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="bg-transparent rounded-md w-full h-10 px-2 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
