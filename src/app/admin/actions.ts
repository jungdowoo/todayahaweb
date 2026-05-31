"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabaseClient";

function requireAdmin(formData: FormData) {
  const configured = process.env.ADMIN_PASSWORD;
  const submitted = String(formData.get("admin_password") ?? "");
  if (configured && submitted !== configured) {
    throw new Error("관리자 비밀번호가 올바르지 않습니다.");
  }
}

const text = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();
const nullable = (formData: FormData, key: string) => text(formData, key) || null;
const tags = (formData: FormData) =>
  text(formData, "tags")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

function quizPayload(formData: FormData) {
  return {
    slug: text(formData, "slug"),
    title: text(formData, "title"),
    question: text(formData, "question"),
    quiz_type: text(formData, "quiz_type") || "MULTIPLE",
    option_1: text(formData, "option_1"),
    option_2: text(formData, "option_2"),
    option_3: nullable(formData, "option_3"),
    option_4: nullable(formData, "option_4"),
    correct_answer: text(formData, "correct_answer"),
    short_explanation: text(formData, "short_explanation"),
    full_explanation: text(formData, "full_explanation"),
    detail_explanation: nullable(formData, "detail_explanation"),
    example_text: nullable(formData, "example_text"),
    misconception_text: nullable(formData, "misconception_text"),
    aha_point: text(formData, "aha_point"),
    category_id: nullable(formData, "category_id"),
    difficulty: text(formData, "difficulty") || "easy",
    reading_time: Number(text(formData, "reading_time") || 1),
    tags: tags(formData),
    seo_title: nullable(formData, "seo_title"),
    seo_description: nullable(formData, "seo_description"),
    is_published: formData.get("is_published") === "on",
    published_at: formData.get("is_published") === "on" ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };
}

export async function createQuiz(formData: FormData) {
  requireAdmin(formData);
  const supabase = getSupabaseServerClient();
  if (!supabase) return;

  const { error } = await supabase.from("quizzes").insert(quizPayload(formData));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/quizzes");
  revalidatePath("/quiz");
  redirect("/admin/quizzes");
}

export async function updateQuiz(formData: FormData) {
  requireAdmin(formData);
  const supabase = getSupabaseServerClient();
  const id = text(formData, "id");
  if (!supabase || !id) return;

  const { error } = await supabase.from("quizzes").update(quizPayload(formData)).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/quizzes");
  revalidatePath("/quiz");
  redirect("/admin/quizzes");
}

export async function saveCategory(formData: FormData) {
  requireAdmin(formData);
  const supabase = getSupabaseServerClient();
  if (!supabase) return;

  const { error } = await supabase.from("categories").upsert({
    name: text(formData, "name"),
    slug: text(formData, "slug"),
    description: text(formData, "description"),
  }, { onConflict: "slug" });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/categories");
  revalidatePath("/");
}
