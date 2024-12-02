import { showElem, hideElem, getElemBySelector } from "./domUtils";
import { mixedFood as mixed, mixedFoodEng as mixedEng } from "./data.js";

let currentLanguage = "Ru";
//тоже есть в main
const isEnglish = (value) => value === "En";

function switchLanguage(list, setScore) {
  const [btnEn, btnRu, btnAgainEn, btnAgainRu] = Array.from(
    document.querySelectorAll(".controlPanelBtn")
  );
  const congratulationWrapRu = getElemBySelector(".congratulationWrapRu");
  const congratulationWrap = getElemBySelector(".congratulationWrap");

  changeLanguage();
  updateFoodList(currentLanguage, list);
  setScore({ lang: currentLanguage });

  // for (let item of controlPanelBtns) {
  //   item.classList.toggle("buttonHide");
  // }

  if (isEnglish(currentLanguage)) {
    showElem(congratulationWrap);
    hideElem(congratulationWrapRu);
    btnEn.classList.remove("buttonHide");
    btnRu.classList.add("buttonHide");
    btnAgainEn.classList.remove("buttonHide");
    btnAgainRu.classList.add("buttonHide");
  } else {
    showElem(congratulationWrapRu);
    hideElem(congratulationWrap);
    btnRu.classList.remove("buttonHide");
    btnAgainRu.classList.remove("buttonHide");
    btnEn.classList.add("buttonHide");
    btnAgainEn.classList.add("buttonHide");
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
