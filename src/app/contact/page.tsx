export const metadata = { title: "문의하기" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-black text-slate-950">문의하기</h1>
      <p className="mt-4 leading-8 text-slate-700">
        콘텐츠 제안, 오류 제보, 제휴 문의는 운영 이메일을 연결해 받을 수 있습니다. 배포 전 실제 문의 수신 주소를 README의 환경 설정과
        함께 반영하세요.
      </p>
      <form className="mt-6 space-y-3 rounded-lg border border-slate-200 bg-white p-5">
        <input className="w-full rounded-lg border border-slate-300 px-4 py-3" placeholder="이메일" aria-label="이메일" />
        <textarea className="min-h-36 w-full rounded-lg border border-slate-300 px-4 py-3" placeholder="문의 내용" aria-label="문의 내용" />
        <button className="rounded-lg bg-slate-950 px-5 py-3 font-bold text-white" type="button">
          문의 내용 확인
        </button>
      </form>
    </div>
  );
}
