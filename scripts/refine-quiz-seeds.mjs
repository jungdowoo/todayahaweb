import { readFileSync, writeFileSync } from "node:fs";

const files = ["quiz-seed-part-1.json", "quiz-seed-part-2.json", "quiz-seed-part-3.json", "quiz-seed-part-4.json"];

const timeByDifficulty = {
  쉬움: 10,
  보통: 15,
  어려움: 20,
};

const distractorsByCategory = {
  생활: ["색깔이 바뀌기 때문", "무조건 세균이 많아서", "온도와는 상관없어서"],
  음식: ["음식이 모두 같은 속도로 변해서", "냄새만 달라져서", "용기 모양이 바뀌어서"],
  과학: ["바다가 그대로 비쳐서", "눈이 착각해서만", "공기가 색칠되어 있어서"],
  동물: ["사람을 따라 하려고만 해서", "항상 배가 고파서", "날씨가 바뀌어서만"],
  "역사/문화": ["우연히 생긴 유행이라서", "모든 사람이 똑같이 살았기 때문", "기록이 전혀 없어서"],
};

function cleanTitle(title) {
  return title.replace(/\?+$/g, "").trim();
}

function extractFocus(quiz) {
  const escapedTitle = quiz.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match =
    quiz.seoDescription.match(new RegExp(`${escapedTitle}\\s+(.+?)(?:을|를) 중심으로`)) ??
    quiz.seoDescription.match(new RegExp(`${escapedTitle}\\s+(.+?)(?:이|가) 왜 중요한지`));
  if (match?.[1]) return match[1].trim();

  const fallback = quiz.shortAnswer
    .replace(/처럼 여러 조건을 함께 보면 이해하기 쉽습니다\./g, "")
    .replace(/을 기억하면.*$/g, "")
    .replace(/를 기억하면.*$/g, "")
    .trim();

  return fallback || quiz.keywords?.[1] || "주변 조건";
}

function plainFocus(focus) {
  return focus
    .replace(/이라는 점$/g, "")
    .replace(/라는 점$/g, "")
    .replace(/인 점$/g, "")
    .replace(/는 점$/g, "는 것")
    .replace(/한 점$/g, "")
    .replace(/다는 점$/g, "다는 것")
    .trim();
}

function particle(text, pair = ["이", "가"]) {
  const last = [...text].at(-1);
  if (!last) return pair[1];
  const code = last.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return pair[1];
  return (code - 0xac00) % 28 === 0 ? pair[1] : pair[0];
}

function seoDescription(title, focus) {
  return `${title} ${focus}${particle(focus, ["이", "가"])} 왜 중요한지 쉽게 풀어봅니다. 정답과 이유, 생활 속 예시와 흔한 오해까지 함께 확인해 보세요.`;
}

function searchIntent(title) {
  return `${title}라는 궁금증을 빠르게 풀고, 실제 생활에서 어떻게 이해하면 좋은지 알고 싶은 사용자를 위한 검색 의도`;
}

function makeKeywords(title, category, focus) {
  const base = cleanTitle(title);
  const firstFocusWord = plainFocus(focus).split(/\s+/).slice(0, 3).join(" ");
  return [...new Set([base, `${base} 이유`, firstFocusWord, category, "생활 상식"])].slice(0, 6);
}

function makeLongTailKeywords(title, focus) {
  const base = cleanTitle(title);
  const core = plainFocus(focus);
  return [
    `${base} 이유`,
    `${base} 왜 그럴까`,
    `${base} 쉽게 설명`,
    `${core} 관련 상식`,
  ].slice(0, 6);
}

function makeMetaKeywords(keywords, longTailKeywords) {
  return [...new Set([...keywords, ...longTailKeywords.map((item) => item.split(" ").slice(0, 3).join(" "))])].slice(0, 8);
}

function oxQuestion(title) {
  return `${cleanTitle(title)}?`;
}

function multipleQuestion(title) {
  return `${cleanTitle(title)}?`;
}
function makeOptions(quiz, focus) {
  if (quiz.type === "OX") return ["O", "X"];

  const correct = plainFocus(focus);
  const distractors = distractorsByCategory[quiz.category] ?? distractorsByCategory["생활"];
  return [correct, ...distractors].slice(0, 4);
}

function easyExplanation(quiz, focus) {
  const core = plainFocus(focus);
  if (quiz.type === "OX" && quiz.answer === "X") {
    return `꼭 그렇게만 볼 수는 없습니다. ${core}${particle(core, ["이", "가"])} 핵심이지만, 상황에 따라 결과가 달라질 수 있습니다. 그래서 한 문장으로 단정하기보다 원인과 조건을 함께 보는 것이 좋습니다.`;
  }

  return `핵심은 ${core}입니다. 겉으로는 단순해 보여도 실제로는 주변 조건이 함께 작용합니다. 이 점을 알면 왜 그런 일이 생기는지 훨씬 쉽게 이해할 수 있습니다.`;
}

function detailExplanation(quiz, focus) {
  const base = cleanTitle(quiz.title);
  const core = plainFocus(focus);
  const categoryLead = {
    생활: "생활 속 현상은 온도, 습도, 사용 습관처럼 작은 조건에 따라 달라지는 일이 많습니다.",
    음식: "음식은 수분, 온도, 공기, 보관 시간에 따라 맛과 상태가 쉽게 달라집니다.",
    과학: "과학 현상은 눈에 보이는 결과 뒤에 빛, 공기, 물, 힘 같은 원인이 숨어 있는 경우가 많습니다.",
    동물: "동물 행동은 귀엽게 보이는 모습 안에 안전, 먹이, 의사 표현 같은 이유가 들어 있습니다.",
    "역사/문화": "역사와 문화는 지금의 기준만으로 보면 낯설지만, 당시 생활 환경을 생각하면 이해하기 쉬워집니다.",
  }[quiz.category];

  return `${base}를 이해하려면 먼저 ${core}${particle(core, ["을", "를"])} 떠올리면 됩니다. ${categoryLead} 많은 사람이 이 질문에서 헷갈리는 이유는 겉으로 보이는 모습만 보고 바로 결론을 내리기 때문입니다. 하지만 실제로는 한 가지 원인만 움직이는 것이 아니라 주변 조건이 함께 영향을 줍니다. 예를 들어 같은 물건이나 음식, 같은 장소라도 온도와 습도, 시간이 달라지면 결과가 다르게 보일 수 있습니다. 그래서 이 문제는 "무조건 그렇다" 또는 "절대 아니다"처럼 나누기보다, 어떤 상황에서 그런 일이 잘 생기는지 보는 편이 정확합니다. 일상에서는 냄새, 색, 촉감, 소리처럼 바로 확인할 수 있는 단서를 먼저 살피면 도움이 됩니다. 또 인터넷에서 본 짧은 상식만 믿고 행동하기보다, 실제 상황과 맞는지 한 번 더 생각하는 것이 좋습니다. 주변 사람에게 설명할 때도 어려운 말보다 눈에 보이는 변화와 원인을 연결해 말하면 훨씬 이해하기 쉽습니다. 오늘 기억할 점은 ${core}${particle(core, ["이", "가"])} 이 질문의 중심이라는 것입니다.`;
}

function realLifeExample(quiz, focus) {
  const core = plainFocus(focus);
  return `실제 생활에서는 같은 현상처럼 보여도 장소, 온도, 습도, 사용 방법에 따라 결과가 조금씩 달라질 수 있습니다. 이럴 때는 ${core}${particle(core, ["을", "를"])} 먼저 떠올리면 이유를 더 쉽게 설명할 수 있습니다.`;
}

function commonMisunderstanding(quiz) {
  if (quiz.type === "OX") {
    return "많은 사람이 O 또는 X 하나만 외우고 모든 상황에 똑같이 적용하려 합니다. 하지만 실제로는 조건이 달라지면 결과도 달라질 수 있습니다.";
  }

  return "겉으로 보이는 결과만 보고 이유를 하나로 단정하면 오해가 생기기 쉽습니다. 정답은 보통 눈에 보이지 않는 조건까지 함께 봐야 이해됩니다.";
}

function ahaSummary(focus) {
  const core = plainFocus(focus);
  return `${core}${particle(core, ["이", "가"])} 핵심입니다.`;
}

function refineQuiz(quiz) {
  const focus = extractFocus(quiz);
  const options = makeOptions(quiz, focus);
  const answer = quiz.type === "OX" ? quiz.answer : options[0];
  const keywords = makeKeywords(quiz.title, quiz.category, focus);
  const longTailKeywords = makeLongTailKeywords(quiz.title, focus);

  return {
    ...quiz,
    timeLimitSeconds: timeByDifficulty[quiz.difficulty] ?? 10,
    canonicalPath: `/quiz/${quiz.slug}`,
    seoDescription: seoDescription(quiz.title, focus),
    searchIntent: searchIntent(quiz.title),
    keywords,
    longTailKeywords,
    metaKeywords: makeMetaKeywords(keywords, longTailKeywords),
    question: quiz.type === "OX" ? oxQuestion(quiz.title, answer, focus) : multipleQuestion(quiz.title),
    options,
    answer,
    shortAnswer: quiz.type === "OX" && answer === "X" ? "항상 맞는 말은 아닙니다." : `${plainFocus(focus)}${particle(plainFocus(focus), ["이", "가"])} 핵심입니다.`,
    easyExplanation: easyExplanation({ ...quiz, answer }, focus),
    detailExplanation: detailExplanation(quiz, focus),
    realLifeExample: realLifeExample(quiz, focus),
    commonMisunderstanding: commonMisunderstanding(quiz),
    ahaSummary: ahaSummary(focus),
    interestingCount: 0,
    isPopular: false,
    popularScore: 0,
    relatedQuizSlugs: [],
  };
}

for (const file of files) {
  const data = JSON.parse(readFileSync(file, "utf8"));
  writeFileSync(file, `${JSON.stringify(data.map(refineQuiz), null, 2)}\n`, "utf8");
}

console.log("Refined quiz seed files.");
