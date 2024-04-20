import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useUser() {
  const [user, setUser] = useState();
  const router = useRouter();
  useEffect(() => {
    fetch("/api/users/me")
      .then((response) => response.json())
      .then((data) => {
        if (!data.ok) {
          // 우리가 받은 데이터의 ok가 false라면 enter 화면으로 redirect
          return router.replace("/enter");
        }
        // 로그인 상태라면 data.profile을 user에 넣어주기
        setUser(data.profile);
      });
  }, [router]);
  return user;
}
