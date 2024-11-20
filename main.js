import "normalize.css";
import "./style.css";

let currentLanguage = "Ru";
const busket = document.querySelector(".busket");
const list = document.querySelector(".food");
const hippo = document.querySelectorAll(".hippo")[0];
const hippoYes = document.querySelector(".hippoYes");
const hippoNo = document.querySelector(".hippoNo");
const score = document.querySelector(".score").firstElementChild;
let previousHippo = null;
const audioYes = new Audio("./assets/audio/soundYes.mp3");
const audioNo = new Audio("./assets/audio/soundNo.mp3");

updateFoodList(currentLanguage);
console.dir(busket.getBoundingClientRect());

let hippoDown = false;
let coordinate = "";

document.addEventListener("mousedown", handleMouseDown);
let target = null;

function handleMouseDown(e) {
  // busket.style.backgroundColor = "white";
  // console.log(e.target.tagName)
  e.preventDefault();

  if (e.target.tagName === "H1") {
    hippoDown = true;
    if (previousHippo === "yes") hippoYes.style.display = "none";
    if (previousHippo === "no") hippoNo.style.display = "none";
    hippo.style.display = "block";

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
  console.log(
    `x: ${x}, y: ${y} and for X: ${butLeft},${butRight} for Y:  ${butTop}, ${butBottom}`
  );

  if (x >= butLeft && x <= butRight && y >= butTop && y <= butBottom) {
    let targetValue = target.dataset.species;
    hippo.style.display = "none";

    if (checkFood(targetValue)) {
      hippoYes.style.display = "block";
      previousHippo = "yes";
      let [text, value] = score.textContent.split(" ");
      score.textContent = `${text} ${Number(value) + 10}`;
      audioYes.play();
      // busket.style.backgroundColor = "green";
    } else {
      hippoNo.style.display = "block";
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

function hippoIconAnination() {
  const hippo = document.querySelectorAll(".hippo");
  console.log("HIPPO", hippo);
}

hippoIconAnination();

const buttonLang = document.querySelector(".buttonLang");
buttonLang.addEventListener("click", switchLanguage);

function switchLanguage() {
  const lang = document.querySelector(".language");
  currentLanguage = lang.textContent === "Ru" ? "En" : "Ru";
  lang.textContent = currentLanguage;
  console.log("IN HANDLER", currentLanguage);
  updateFoodList(currentLanguage);
}

function updateFoodList(lang) {
  const mixed = [
    "Рыба",
    "Трава",
    "Орехи",
    "Водяные растения",
    "Сено",
    "Листья",
    "Фрукты (яблоки, арбузы, бананы)",
    "Огурцы",
    "Морковь",
    "Конфеты",
    "Капуста",
    "Свёкла",
    "Лук",
    "Чеснок",
    "Тыква",
    "Брокколи",
    "Мясо",
    "Цитрусовые (апельсины, лимоны, грейпфруты)",
    "Чай",
    "Картофель",
    "Грибы",
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
