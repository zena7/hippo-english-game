import "normalize.css";
import "./style.css";

let currentLanguage = "Ru";
const getElemBySelector = (elem) => document.querySelector(elem);
const hideElem = (elem) => (elem.style.display = "none");
const showElem = (elem) => (elem.style.display = "block");
const busket = getElemBySelector(".busket");
const list = getElemBySelector(".food");
console.log("List", list, list.children);
const hippo = document.querySelectorAll(".hippo")[0];
const hippoYes = getElemBySelector(".hippoYes");
const hippoNo = getElemBySelector(".hippoNo");
const score = getElemBySelector(".score").firstElementChild;
const darkPhone = getElemBySelector(".endOfGameBackground");

let previousHippo = null;
const audioYes = new Audio("./assets/audio/soundYes.mp3");
const audioNo = new Audio("./assets/audio/soundNo.mp3");
let hippoDown = false;
let coordinate = "";

updateFoodList(currentLanguage);
document.addEventListener("mousedown", handleMouseDown);
let target = null;

function handleMouseDown(e) {
  e.preventDefault();

  if (e.target.tagName === "H1") {
    hippoDown = true;
    if (previousHippo === "yes") hideElem(hippoYes);
    if (previousHippo === "no") hideElem(hippoNo);
    showElem(hippo);

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

  if (hippoDown) {
    target.style.left = `${e.pageX - target.offsetWidth / 2}px`;
    target.style.top = `${e.pageY - target.offsetHeight / 2}px`;
  }
}

function handleUp(e) {
  hippoDown = false;
  coordinate = `${e.pageX},${e.pageY}`;
  includesTarget(coordinate);
  coordinate = "";
  console.log("List", list, list.children.length);

  let collectionLength = Array.from(list.children).filter((item) =>
    item.classList.contains("liView")
  );

  if (collectionLength.length === 0) {
    const finalElem = getElemBySelector(".endOfGame");
    setTimeout(() => {
      showElem(finalElem);
      showElem(darkPhone);
    }, 1500);
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
    // setTimeout(() => target.remove(), 1100);

    if (checkFood(targetValue)) {
      showElem(hippoYes);
      previousHippo = "yes";
      let [text, value] = score.textContent.split(" ");
      text = currentLanguage === "Ru" ? "Очки" : "Score";
      score.textContent = `${text} ${Number(value) + 10}`;
      audioYes.play();
    } else {
      showElem(hippoNo);
      previousHippo = "no";
      audioNo.play();
    }
  }
}

function checkFood(food) {
  const allowedFoods = [
    "Трава",
    "Водяные растения",
    "Сено",
    "Листья",
    "Фрукты (яблоки, арбузы, бананы)",
    "Огурцы",
    "Морковь",
    "Капуста",
    "Свёкла",
    "Тыква",
    "Брокколи",
  ];
  const forbiddenFoods = [
    "Мясо",
    "Рыба",
    "Цитрусовые (апельсины, лимоны, грейпфруты)",
    "Чай",
    "Картофель",
    "Грибы",
    "Конфеты",
    "Чеснок",
    "Лук",
    "Орехи",
  ];
  const allowedFoodsEng = [
    "Grass",
    "Aquatic plants",
    "Hay",
    "Leaves",
    "Fruits (apples, watermelons, bananas)",
    "Cucumbers",
    "Carrots",
    "Cabbage",
    "Beets",
    "Pumpkin",
    "Broccoli",
  ];
  const forbiddenFoodsEng = [
    "Meat",
    "Fish",
    "Citrus fruits (oranges, lemons, grapefruits)",
    "Spicy food",
    "Chocolate",
    "Candies",
    "Tea",
    "Potatoes",
    "Mushrooms",
    "Garlic",
    "Onion",
    "Nuts",
  ];

  return (currentLanguage === "Ru" ? allowedFoods : allowedFoodsEng).includes(
    food
  );
}

const buttonLang = getElemBySelector(".buttonLang");
buttonLang.addEventListener("click", switchLanguage);

function switchLanguage(e) {
  const lang = getElemBySelector(".language");
  currentLanguage = lang.textContent === "Ru" ? "En" : "Ru";
  lang.textContent = currentLanguage;
  updateFoodList(currentLanguage);
  let [text, value] = score.textContent.split(" ");
  text = currentLanguage === "Ru" ? "Очки" : "Score";
  score.textContent = `${text} ${Number(value)}`;
}

function updateFoodList(lang) {
  const mixed = [
    "Рыба",
    "Трава",
    "Орехи",
    "Водяные растения",
    // "Сено",
    // "Листья",
    // "Фрукты (яблоки, арбузы, бананы)",
    // "Огурцы",
    // "Морковь",
    // "Конфеты",
    // "Капуста",
    // "Свёкла",
    // "Лук",
    // "Чеснок",
    // "Тыква",
    // "Брокколи",
    // "Мясо",
    // "Цитрусовые (апельсины, лимоны, грейпфруты)",
    // "Чай",
    // "Картофель",
    // "Грибы",
  ];
  const mixedEng = [
    "Fish",
    "Grass",
    "Nuts",
    "Aquatic plants",
    "Hay",
    "Leaves",
    "Fruits (apples, watermelons, bananas)",
    "Cucumbers",
    "Carrots",
    "Candies",
    "Cabbage",
    "Beets",
    "Onion",
    "Garlic",
    "Pumpkin",
    "Broccoli",
    "Meat",
    "Citrus fruits (oranges, lemons, grapefruits)",
    "Tea",
    "Potatoes",
    "Mushrooms",
  ];

  let food = lang === "Ru" ? mixed : mixedEng;
  list.innerHTML = "";
  food.forEach((item) => {
    list.insertAdjacentHTML(
      "beforeend",
      `<li class="liView"><h1 data-species="${item}" >${item}</h1></li>`
    );
  });
}

const sectionEndOfGame = getElemBySelector(".endOfGame");
const buttonCloseSectionEndOfGame = getElemBySelector(".btnClose");
const btnPlayAgain = getElemBySelector(".controlPanelplayAgain");

buttonCloseSectionEndOfGame.addEventListener("click", closeSection);

function closeSection() {
  console.log("click enfOfGame");
  hideElem(sectionEndOfGame);
  hideElem(darkPhone);
}

btnPlayAgain.addEventListener("click", () => {
  console.log("AGAIN");
  closeSection();
  updateFoodList(currentLanguage);
  if (previousHippo === "yes") hideElem(hippoYes);
  if (previousHippo === "no") hideElem(hippoNo);
  showElem(hippo);
});
