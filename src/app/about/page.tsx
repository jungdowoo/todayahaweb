export const metadata = { title: "소개" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-black text-slate-950">오늘의 아하! 소개</h1>
      <p className="mt-4 leading-8 text-slate-700">
        오늘의 아하는 생활 속 질문을 퀴즈로 풀고, 정답 뒤에 숨어 있는 원리를 차분히 설명하는 상식 콘텐츠 사이트입니다.
        짧은 선택 경험과 충분한 해설을 함께 제공해 사용자는 재미있게 배우고, 검색 사용자는 필요한 정보를 빠르게 이해할 수 있습니다.
      </p>
    </div>
  );
}
