import MarkdownIt from "markdown-it";
import "virtual:uno.css";

import { SLIDES, type Slide } from "./slides";

const slidesList = document.querySelector(".slides-list");

const md = new MarkdownIt();

const BADGE_BASE_CLASSES =
  "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset shrink-0";

const getGradeBadgeCustomClasses = (grade: Slide["grade"]) => {
  switch (grade) {
    case 10:
      return "bg-yellow-500/20 text-yellow-500 ring-yellow-500/20";
    case 11:
      return "bg-orange-500/20 text-orange-500 ring-orange-500/20";
  }
};

const renderBadge = (text: string, customClasses?: string) =>
  `<span class="${BADGE_BASE_CLASSES} ${customClasses}">${text}</span>
`;

const generateSlidesLink = (subpath: string) => {
  const pathname = location.pathname.endsWith("/")
    ? location.pathname.slice(0, -1)
    : location.pathname;
  return `${pathname}/${subpath}`;
};

const renderSlideCards = () => {
  for (const slide of SLIDES) {
    const card = `
    <div class="slide-card bg-zinc-800 border-rd-2 p-4 border-2 border-solid border-transparent hover:border-gray-400 transition-border" data-grade="${slide.grade}">
      <div class="flex flex-row justify-between">
        <h2 class="inline-flex items-center gap-2 dark:text-white my-0 text-primary text-2xl font-bold">${renderBadge(`${slide.grade} класс`, getGradeBadgeCustomClasses(slide.grade))} ${slide.title}</h2>

        <a class="i-carbon-presentation-file text-white/50 hover:text-white text-3xl transition-text duration-300" target="_blank" href="${generateSlidesLink(slide.path)}"></a>
      </div>
      <div class="dark:text-gray-300">${md.render(slide.description)}</div>
      ${slide.tags ? `<div class="flex flex-row gap-2">${slide.tags.map((tag) => renderBadge(tag, "text-gray-400 bg-gray-400/20 ring-gray-400/20")).join("")}</div>` : ""}
    </div>
  `;

    slidesList?.insertAdjacentHTML("beforeend", card);
  }
};

renderSlideCards();

const slideCards = document.querySelectorAll(
  "div.slide-card",
) as NodeListOf<HTMLDivElement>;

const gradeRadioBtns = document.querySelectorAll(
  'input[name="grade-filter"]',
) as NodeListOf<HTMLInputElement>;

const filterSlidesByGrade = (grade: string | undefined) => {
  slideCards.forEach((slideCard) => {
    if (Boolean(grade) && slideCard.dataset.grade !== grade) {
      slideCard.classList.add("hidden");
    } else {
      slideCard.classList.remove("hidden");
    }
  });
};

gradeRadioBtns.forEach((gradeRadioBtn) =>
  gradeRadioBtn.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    filterSlidesByGrade(target.dataset.grade);
  }),
);
