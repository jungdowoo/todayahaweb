import { saveCategory } from "@/app/admin/actions";
import { getCategories } from "@/lib/quizzes";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-black text-slate-950">카테고리 관리</h1>
      <form action={saveCategory} className="mt-6 grid gap-3 rounded-lg border border-slate-200 p-5 sm:grid-cols-[1fr_1fr_auto]">
        <input name="name" className="rounded-lg border border-slate-300 px-4 py-3" placeholder="카테고리명" aria-label="카테고리명" required />
        <input name="slug" className="rounded-lg border border-slate-300 px-4 py-3" placeholder="slug" aria-label="slug" required />
        <input name="description" className="rounded-lg border border-slate-300 px-4 py-3 sm:col-span-2" placeholder="설명" aria-label="설명" />
        <input name="admin_password" className="rounded-lg border border-slate-300 px-4 py-3" placeholder="관리자 비밀번호" aria-label="관리자 비밀번호" type="password" />
        <button className="rounded-lg bg-slate-950 px-4 py-3 font-bold text-white" type="submit">
          저장
        </button>
      </form>
      <div className="mt-6 grid gap-3">
        {categories.map((category, index) => (
          <div key={`${category.id}-${index}`} className="rounded-lg border border-slate-200 p-4">
            <p className="font-black">{category.name}</p>
            <p className="text-sm text-slate-500">/{category.slug}</p>
            <p className="mt-2 text-sm text-slate-600">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
