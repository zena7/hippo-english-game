// import "normalize.css";
// import "./style.css";

import { allowedFoods, allowedFoodsEng } from "./data";
import {
  getElemBySelector,
  hideElem,
  showElem,
  getArrayOfElems,
} from "./domUtils";
import { switchLanguage, isEnglish } from "./switchLang";
import { currentLanguage, name } from "./state.js";
import { turnSound } from "./turnSound";
import { isThereSound } from "./state.js";
import { mixedFood as mixed, mixedFoodEng as mixedEng } from "./data.js";

const busket = getElemBySelector(".busket");
const list = getElemBySelector(".food");
const hippo = document.querySelectorAll(".hippo")[0];
const hippoYes = getElemBySelector(".hippoYes");
const hippoNo = getElemBySelector(".hippoNo");

window.addEventListener("load", () => {
  document.querySelector(".game-page").classList.add("loaded");
});

const score = getElemBySelector(".score").firstElementChild;
export const setScore = ({ lang = "Ru", value = 0, reset = false }) => {
  let [text, curVal] = score.textContent.split(" ");

  text = isEnglish(lang) ? "Score" : "Очки";
  score.textContent = `${text} ${reset ? 0 : Number(curVal) + value}`;
};

function updateFoodList(lang, list) {
  let food = isEnglish(lang) ? mixedEng : mixed;

  list.innerHTML = "";
  food.forEach((item) => {
    list.insertAdjacentHTML(
      "beforeend",
      `<li class="liView"><h1 data-species="${item}" >${item}</h1></li>`
    );
  });
}

let audioYes, audioNo;

async function loadAudio() {
  const [soundYesModule, soundNoModule] = await Promise.all([
    import("./assets/audio/soundYes.mp3"),
    import("./assets/audio/soundNo.mp3"),
  ]);

  audioYes = new Audio(soundYesModule.default);
  audioNo = new Audio(soundNoModule.default);
}

window.addEventListener("load", loadAudio);

const audioDiv = getElemBySelector(".audio");
audioDiv.addEventListener("click", async () => {
  if (!audioYes || !audioNo) await loadAudio();
  turnSound();
});

function setUserName(name) {
  const congratulationsArray = getArrayOfElems(".nameFromStorage");

  congratulationsArray.forEach((item) => {
    let [text, _] = item.textContent.split("!");
    item.textContent = `${text}, ${name ?? ""}!`;
  });
}

setUserName(name);

const darkPhone = getElemBySelector(".endOfGameBackground");
let foodMouseDown = false;
let coordinate = "";

updateFoodList(currentLanguage, list);

document.addEventListener("mousedown", handleMouseDown);

let target = null;
let previousHippo = null;

const showInitialHippo = () => {
  if (previousHippo === "yes") hideElem(hippoYes);
  if (previousHippo === "no") hideElem(hippoNo);
  showElem(hippo);
  previousHippo = null;
};

function handleMouseDown(e) {
  e.preventDefault();

  if (e.target.tagName === "H1") {
    foodMouseDown = true;
    showInitialHippo();

    const rect = e.target.getBoundingClientRect(); // Получаем размер и позицию исходного элемента
    const offsetX = e.pageX - rect.left; // Смещение мыши по X
    const offsetY = e.pageY - rect.top; // Смещение мыши по Y

    if (!e.target.classList.contains("duplicate")) {
      target = e.target.cloneNode(true);
      target.classList.add("duplicate");
      e.target.parentNode.classList.toggle("liView");
      target.classList.add("liView");
      e.target.style.visibility = "hidden";
      target.style.left = `${e.pageX - offsetX}px`; // Используем смещение для начальной позиции
      target.style.top = `${e.pageY - offsetY}px`;
      document.body.append(target);
      target.style.padding = "0.8rem 0.7rem";
      target.style.position = "absolute";
    } else {
      target = e.target;
    }

    target.dataset.offsetX = offsetX;
    target.dataset.offsetY = offsetY;

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp, { once: true });
  }
}

function handleMove(e) {
  e.preventDefault();

  if (foodMouseDown) {
    const offsetX = parseFloat(target.dataset.offsetX); // Получаем сохранённое смещение
    const offsetY = parseFloat(target.dataset.offsetY);
    target.style.left = `${e.pageX - offsetX}px`;
    target.style.top = `${e.pageY - offsetY}px`;
  }
}

function handleUp(e) {
  foodMouseDown = false;
  coordinate = `${e.pageX},${e.pageY}`;
  includesTarget(coordinate);
  coordinate = "";

  let collectionLength = Array.from(list.children).filter((item) =>
    item.classList.contains("liView")
  );

  if (collectionLength.length === 0 && previousHippo) {
    const finalElem = getElemBySelector(".endOfGame");
    setTimeout(() => {
      showElem(finalElem);
      showElem(darkPhone);
    }, 1000);
  }

  document.removeEventListener("mousemove", handleMove);
}

function includesTarget(coord) {
  const [x, y] = coord.split(",");
  const {
    top: butTop,
    bottom: butBottom,
    left: butLeft,
    right: butRight,
  } = busket.getBoundingClientRect();

  if (x >= butLeft && x <= butRight && y >= butTop && y <= butBottom) {
    let targetValue = target.dataset.species;
    hideElem(hippo);
    target.remove();

    if (checkFood(targetValue)) {
      showElem(hippoYes);
      previousHippo = "yes";
      setScore({ lang: currentLanguage, value: 10 });
      isThereSound && audioYes.play();
    } else {
      showElem(hippoNo);
      previousHippo = "no";
      isThereSound && audioNo.play();
    }
  }
}

function checkFood(food) {
  return (isEnglish(currentLanguage) ? allowedFoodsEng : allowedFoods).includes(
    food
  );
}

const buttonLang = getElemBySelector(".buttonLang");
buttonLang.addEventListener("click", () =>
  switchLanguage(list, setScore, updateFoodList)
);

const foodAllowedEn = getElemBySelector(".controlPanelShowListEn");
const foodAllowedRu = getElemBySelector(".controlPanelShowListRu");

const sectionEndOfGame = getElemBySelector(".endOfGame");
const buttonCloseSectionEndOfGame = getElemBySelector(".btnClose");
const divlistOfAllowedFood = getElemBySelector(".listOfAllowedFood");
let listOfAllowedFoodOpend = false;

buttonCloseSectionEndOfGame.addEventListener("click", closeSection);

const congratulationText = getElemBySelector(".congratulationWrap");
const hippoEndOfGame = getElemBySelector(".hippoEndOfGame");
const congratulationTextRu = getElemBySelector(".congratulationWrapRu");

function setVisibility(elementsToShow = [], elementsToHide = []) {
  elementsToShow.forEach(showElem);
  elementsToHide.forEach(hideElem);
}

function closeSection() {
  if (listOfAllowedFoodOpend) {
    setVisibility([
      isEnglish(currentLanguage) ? congratulationText : congratulationTextRu,
      hippoEndOfGame,
    ]);

    if (isEnglish(currentLanguage)) {
      foodAllowedEn.classList.remove("buttonHide");
      foodAllowedRu.classList.add("buttonHide");
    } else {
      foodAllowedRu.classList.remove("buttonHide");
      foodAllowedEn.classList.add("buttonHide");
    }

    divlistOfAllowedFood.classList.toggle("active");
    listOfAllowedFoodOpend = false;
  }

  setVisibility([], [sectionEndOfGame, darkPhone]);
  showInitialHippo();
}

const controlPanel = getElemBySelector(".controlPanel");

controlPanel.addEventListener("click", (event) => {
  if (event.target.classList.contains("controlPanelShowList")) {
    setVisibility(
      [],
      [congratulationText, congratulationTextRu, hippoEndOfGame]
    );

    foodAllowedEn.classList.add("buttonHide");
    foodAllowedRu.classList.add("buttonHide");

    listOfAllowedFoodOpend = true;
    divlistOfAllowedFood.classList.toggle("active");
    controlPanel.style.top = "1%";
  }

  if (event.target.classList.contains("controlPanelplayAgain")) {
    closeSection();
    updateFoodList(currentLanguage, list);
    showInitialHippo();
    setScore({ lang: currentLanguage, reset: true });
  }
});

window.addEventListener("load", async () => {
  const { createFirefly } = await import("./firefly.js");
  createFirefly();
});