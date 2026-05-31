import { readFileSync } from "node:fs";

const files = ["quiz-seed-part-1.json", "quiz-seed-part-2.json", "quiz-seed-part-3.json", "quiz-seed-part-4.json"];
const required = [
  "category",
  "type",
  "difficulty",
  "timeLimitSeconds",
  "estimatedReadTime",
  "slug",
  "canonicalPath",
  "seoTitle",
  "seoDescription",
  "searchIntent",
  "title",
  "question",
  "options",
  "answer",
  "shortAnswer",
  "easyExplanation",
  "detailExplanation",
  "realLifeExample",
  "commonMisunderstanding",
  "ahaSummary",
  "keywords",
  "longTailKeywords",
  "metaKeywords",
  "interestingCount",
  "isPopular",
  "popularScore",
  "relatedQuizSlugs",
];

const all = files.flatMap((file) => JSON.parse(readFileSync(file, "utf8")));
const errors = [];
const counts = {};
const typeCounts = {};
const slugs = new Set();

for (const [index, quiz] of all.entries()) {
  for (const key of required) {
    if (!(key in quiz) || quiz[key] === null || quiz[key] === undefined || quiz[key] === "") {
      errors.push(`missing ${key} at ${index}`);
    }
  }

  counts[quiz.category] = (counts[quiz.category] ?? 0) + 1;
  typeCounts[quiz.type] = (typeCounts[quiz.type] ?? 0) + 1;

  if (slugs.has(quiz.slug)) errors.push(`duplicate slug ${quiz.slug}`);
  slugs.add(quiz.slug);
  if (!/^[a-z0-9-]+$/.test(quiz.slug)) errors.push(`bad slug ${quiz.slug}`);
  if (quiz.canonicalPath !== `/quiz/${quiz.slug}`) errors.push(`bad canonical ${quiz.slug}`);

  const expectedTime = { 쉬움: 10, 보통: 15, 어려움: 20 }[quiz.difficulty];
  if (quiz.timeLimitSeconds !== expectedTime) errors.push(`bad time limit ${quiz.slug}`);

  if (quiz.type === "OX") {
    if (JSON.stringify(quiz.options) !== JSON.stringify(["O", "X"])) errors.push(`bad ox options ${quiz.slug}`);
    if (!["O", "X"].includes(quiz.answer)) errors.push(`bad ox answer ${quiz.slug}`);
  } else {
    if (quiz.type !== "MULTIPLE_CHOICE") errors.push(`bad type ${quiz.slug}`);
    if (!Array.isArray(quiz.options) || quiz.options.length !== 4) errors.push(`bad mc options ${quiz.slug}`);
    if (!quiz.options.includes(quiz.answer)) errors.push(`answer not in options ${quiz.slug}`);
  }

  if (!Array.isArray(quiz.keywords) || quiz.keywords.length < 3 || quiz.keywords.length > 6) {
    errors.push(`bad keywords ${quiz.slug}`);
  }
  if (!Array.isArray(quiz.longTailKeywords) || quiz.longTailKeywords.length < 3 || quiz.longTailKeywords.length > 6) {
    errors.push(`bad longTailKeywords ${quiz.slug}`);
  }
  if (!Array.isArray(quiz.metaKeywords) || quiz.metaKeywords.length < 5 || quiz.metaKeywords.length > 8) {
    errors.push(`bad metaKeywords ${quiz.slug}`);
  }
  if (quiz.interestingCount !== 0 || quiz.isPopular !== false || quiz.popularScore !== 0) {
    errors.push(`bad popularity fields ${quiz.slug}`);
  }
  if (!Array.isArray(quiz.relatedQuizSlugs)) errors.push(`bad related ${quiz.slug}`);
  if ([...quiz.detailExplanation].length < 500) {
    errors.push(`short detail ${quiz.slug}: ${[...quiz.detailExplanation].length}`);
  }
}

const result = {
  total: all.length,
  counts,
  typeCounts,
  minDetail: Math.min(...all.map((quiz) => [...quiz.detailExplanation].length)),
  maxDetail: Math.max(...all.map((quiz) => [...quiz.detailExplanation].length)),
  errors: errors.slice(0, 20),
  errorCount: errors.length,
};

console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exit(1);
