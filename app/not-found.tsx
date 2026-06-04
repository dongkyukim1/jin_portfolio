import Link from "next/link";

export const metadata = {
  title: "페이지를 찾을 수 없어요",
};

export default function NotFound() {
  return (
    <main className="notfound">
      <span className="mono notfound-code">Error 404</span>
      <h1>찾으시는 화면이 없네요.</h1>
      <p>주소가 바뀌었거나 사라진 페이지일 수 있어요. 홈에서 다시 시작해 주세요.</p>
      <Link className="button button-primary" href="/">
        홈으로 돌아가기
      </Link>
    </main>
  );
}
