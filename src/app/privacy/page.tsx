export const metadata = { title: "개인정보처리방침" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-black text-slate-950">개인정보처리방침</h1>
      <div className="mt-4 space-y-4 leading-8 text-slate-700">
        <p>오늘의 아하는 초기 MVP에서 회원가입 없이 서비스를 제공합니다.</p>
        <p>퀴즈 풀이 기록은 통계 목적의 익명 데이터로 저장될 수 있으며, 북마크는 사용자의 브라우저 localStorage에 저장됩니다.</p>
        <p>문의 과정에서 전달된 이메일 주소와 내용은 답변 목적에 한해 사용합니다.</p>
      </div>
    </div>
  );
}
