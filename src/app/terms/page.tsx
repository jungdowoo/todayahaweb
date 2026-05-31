export const metadata = { title: "이용약관" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-black text-slate-950">이용약관</h1>
      <div className="mt-4 space-y-4 leading-8 text-slate-700">
        <p>오늘의 아하 콘텐츠는 일반 정보 제공을 목적으로 하며 전문적인 의학, 법률, 금융 자문을 대신하지 않습니다.</p>
        <p>서비스 화면과 콘텐츠는 운영 상황에 따라 변경될 수 있습니다.</p>
        <p>무단 수집, 복제, 자동화된 과도한 요청 등 서비스 운영을 방해하는 행위는 제한될 수 있습니다.</p>
      </div>
    </div>
  );
}
