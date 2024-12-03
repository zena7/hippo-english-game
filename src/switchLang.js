import {
  actWithClassHide,
  getElemBySelector,
  hideElem,
  showElem,
} from "./domUtils";
import { currentLanguage, setCurrentLanguage } from "./state.js";

const isEnglish = (value) => value === "En";

const showOrHideBtns = (hideElems, showElems) => {
  hideElems.forEach((elem) => actWithClassHide({ node: elem }));
  showElems.forEach((elem) => actWithClassHide({ node: elem, act: "remove" }));
};

function switchLanguage(list, setScore, updateFoodList) {
  const [btnEn, btnRu, btnAgainEn, btnAgainRu] = Array.from(
    document.querySelectorAll(".controlPanelBtn")
  );
  const congratulationWrapRu = getElemBySelector(".congratulationWrapRu");
  const congratulationWrap = getElemBySelector(".congratulationWrap");

  changeLanguage();
  updateFoodList(currentLanguage, list);
  setScore({ lang: currentLanguage });

  if (isEnglish(currentLanguage)) {
    showElem(congratulationWrap);
    hideElem(congratulationWrapRu);
    showOrHideBtns([btnRu, btnAgainRu], [btnEn, btnAgainEn]);
  } else {
    showElem(congratulationWrapRu);
    hideElem(congratulationWrap);
    showOrHideBtns([btnEn, btnAgainEn], [btnRu, btnAgainRu]);
  }
}

function changeLanguage() {
  const langBtn = getElemBySelector(".language");

  setCurrentLanguage(langBtn.textContent === "Ru" ? "En" : "Ru");
  langBtn.textContent = currentLanguage;
}

export { currentLanguage, switchLanguage, isEnglish };
