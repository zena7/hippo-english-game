import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

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
  "Острая пища",
  "Шоколад",
  "Кофе",
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
  "Spicy food",
  "Chocolate",
  "Coffee",
  "Tea",
  "Potatoes",
  "Mushrooms",
];

const busket = document.querySelector(".busket");
const list = document.querySelector(".food");
const hippo = document.querySelectorAll(".hippo")[0];
const hippoYes = document.querySelector(".hippoYes");
const hippoNo = document.querySelector(".hippoNo");
// const sampleHtml =
mixed.forEach((item) => {
  list.insertAdjacentHTML(
    "beforeend",
    `<li class="liView"><h1 data-species="${item}" >${item}</h1></li>`
  );
});

console.dir(busket.getBoundingClientRect());

let hippoDown = false;
let coordinate = "";

document.addEventListener("mousedown", handleMouseDown);
let target = null;

function handleMouseDown(e) {
  // busket.style.backgroundColor = "white";
  // console.log(e.target.tagName)
  hippo.style.display = "block";
  if (e.target.tagName === "H1") {
    target = e.target.cloneNode(true);
    console.log("T", target, "parentNode:", e.target.parentNode);

    e.target.parentNode.classList.toggle("liView");
    target.classList.add("liView");

    e.preventDefault();
    hippoDown = true;
    e.target.style.visibility = "hidden";
    document.body.append(target);
    target.style.padding = "0.5rem 0.5rem";
    target.style.position = "absolute";

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
  // console.log("WIDTH", target.offsetWidth)
  // console.log('UP', coordinate, );
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
      // busket.style.backgroundColor = "green";
    } else {
      hippoNo.style.display = "block";
      // busket.style.backgroundColor = "red";
    }
    // busket.style.backgroundСolor = '#535bf2';
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
    "Острая пища",
    "Шоколад",
    "Конфеты",
    "Кофе",
    "Чай",
    "Картофель",
    "Грибы",
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
    "Coffee",
    "Tea",
    "Potatoes",
    "Mushrooms",
    "Garlic",
    "Onion",
    "Nuts",
  ];

  console.log(
    food,
    typeof food,
    food.length,
    allowedFoods.includes(food),
    allowedFoods.includes("Водяные растения"),
    "Трава".length
  );

  return allowedFoods.includes(food);
}

function hippoIconAnination() {
  const hippo = document.querySelectorAll(".hippo");
  console.log("HIPPO", hippo);
}

hippoIconAnination();
