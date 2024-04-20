import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        // 공통으로 적용되는 SWR의 fetcher 함수 기본값 지정
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
        // refreshInterval: 2000,  // SWR에 있는 모든 쿼리에 2000ms 마다 새로고침 적용
      }}
    >
      <div className="w-full max-w-xl mx-auto">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
