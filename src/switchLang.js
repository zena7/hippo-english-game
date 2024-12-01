import { showElem, hideElem, getElemBySelector } from "./domUtils";
import { mixedFood as mixed, mixedFoodEng as mixedEng } from "./data.js";
import { setScore } from "./main.js";

let currentLanguage = "Ru";

function switchLanguage(list) {
  const controlPanelBtns = document.querySelectorAll(".controlPanelBtn");
  const congratulationWrapRu = getElemBySelector(".congratulationWrapRu");
  const congratulationWrap = getElemBySelector(".congratulationWrap");

  changeLanguage();
  updateFoodList(currentLanguage, list);
  setScore({ lang: currentLanguage });

  for (let item of controlPanelBtns) {
    item.classList.toggle("buttonHide");
  }

  if (currentLanguage === "En") {
    showElem(congratulationWrap);
    hideElem(congratulationWrapRu);
  } else {
    showElem(congratulationWrapRu);
    hideElem(congratulationWrap);
  }
}

function changeLanguage() {
  const lang = getElemBySelector(".language");

  currentLanguage = lang.textContent === "Ru" ? "En" : "Ru";
  lang.textContent = currentLanguage;
}

function updateFoodList(lang, list) {
  // const list = getElemBySelector(".food");
  let food = lang === "Ru" ? mixed : mixedEng;

  list.innerHTML = "";
  food.forEach((item) => {
    list.insertAdjacentHTML(
      "beforeend",
      `<li class="liView"><h1 data-species="${item}" >${item}</h1></li>`
    );
  });
}

export { currentLanguage, switchLanguage, updateFoodList };

// ПРОБЛЕМА С КНОПКАМИ В МЕНЮ. КОСЯК С ЯЗЫКОМ. НУЖНО ПРОВЕРИТЬ
//ОБЫЧНО ПОСЛЕ ЗАКРЫТИЯ ОКНА МЕНЮ НАЧИНАЮТСЯ КОСЯКИ
