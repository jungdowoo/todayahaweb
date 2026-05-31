import Link from "next/link";

export const metadata = { title: "관리자" };

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-black text-slate-950">관리자</h1>
      <p className="mt-3 text-slate-600">초기 MVP용 관리자 화면입니다. 실제 운영 전 Supabase Auth로 교체할 수 있게 경로를 분리했습니다.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link className="rounded-lg border border-slate-200 p-5 font-black" href="/admin/quizzes">
          퀴즈 관리
        </Link>
        <Link className="rounded-lg border border-slate-200 p-5 font-black" href="/admin/categories">
          카테고리 관리
        </Link>
      </div>
    </div>
  );
}
