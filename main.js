import "normalize.css";
import { allowedFoods, allowedFoodsEng } from "./src/data";
import { getElemBySelector, hideElem, showElem } from "./src/domUtils";
import {
  currentLanguage,
  switchLanguage,
  updateFoodList,
} from "./src/switchLang";
import "./style.css";
import { turnSound, getSoundState } from "./src/turnSound";

const busket = getElemBySelector(".busket");
const list = getElemBySelector(".food");
const hippo = document.querySelectorAll(".hippo")[0];
const hippoYes = getElemBySelector(".hippoYes");
const hippoNo = getElemBySelector(".hippoNo");

const isEnglish = (value) => value === "En";

const score = getElemBySelector(".score").firstElementChild;
export const setScore = ({ lang = "Ru", value = 0, reset = false }) => {
  let [text, curVal] = score.textContent.split(" ");

  text = isEnglish(lang) ? "Score" : "Очки";
  score.textContent = `${text} ${reset ? 0 : Number(curVal) + value}`;
};

const audioYes = new Audio("./assets/audio/soundYes.mp3");
const audioNo = new Audio("./assets/audio/soundNo.mp3");
const audioDiv = getElemBySelector(".audio");
audioDiv.addEventListener("click", () => {
  turnSound();
});

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

    if (!e.target.classList.contains("duplicate")) {
      target = e.target.cloneNode(true);
      target.classList.add("duplicate");
      e.target.parentNode.classList.toggle("liView");
      target.classList.add("liView");
      e.target.style.visibility = "hidden";
      document.body.append(target);
      target.style.padding = "0.5rem 0.5rem";
      target.style.position = "absolute";
    } else {
      target = e.target;
    }

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp, { once: true });
  }
}

function handleMove(e) {
  e.preventDefault();

  if (foodMouseDown) {
    target.style.left = `${e.pageX - target.offsetWidth / 2}px`;
    target.style.top = `${e.pageY - target.offsetHeight / 2}px`;
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
      getSoundState() && audioYes.play();
    } else {
      showElem(hippoNo);
      previousHippo = "no";
      getSoundState() && audioNo.play();
    }
  }
}

function checkFood(food) {
  return (isEnglish(currentLanguage) ? allowedFoodsEng : allowedFoods).includes(
    food
  );
}

const buttonLang = getElemBySelector(".buttonLang");
buttonLang.addEventListener("click", () => switchLanguage(list));

const foodAllowed = getElemBySelector(".controlPanelShowList");
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
      isEnglish(currentLanguage) ? foodAllowed : foodAllowedRu,
      hippoEndOfGame,
    ]);
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
      [
        congratulationText,
        congratulationTextRu,
        hippoEndOfGame,
        foodAllowed,
        foodAllowedRu,
      ]
    );

    listOfAllowedFoodOpend = true;
    divlistOfAllowedFood.classList.toggle("active");
  }

  if (event.target.classList.contains("controlPanelplayAgain")) {
    closeSection();
    updateFoodList(currentLanguage, list);
    showInitialHippo();
    setScore({ lang: currentLanguage, reset: true });
  }
});
