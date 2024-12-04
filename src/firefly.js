import { getElemBySelector } from "./domUtils";

//огоньки

const container = getElemBySelector(".firefly-container");
// let randomTime = null;
const createFirefly = () => {
  const maxInterval = 1000;
  const minInterval = 300;
  const firefly = document.createElement("div");
  firefly.classList.add("firefly");

  // Случайное положение на экране
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * (window.innerHeight / 1.5);
  const randomWidth = Math.floor(Math.random() * (22 - 4) + 4);
  firefly.style.left = `${x}px`;
  firefly.style.bottom = `${y}px`;
  firefly.style.width = `${randomWidth}px`;
  firefly.style.height = `${randomWidth}px`;

  container.appendChild(firefly);

  setTimeout(() => {
    firefly.remove();
  }, 5000);

  const randomTime = Math.ceil(
    Math.random() * (maxInterval - minInterval) + minInterval
  );

  setTimeout(createFirefly, randomTime);
};

export { createFirefly };

// // Создаём несколько огоньков
// setInterval(() => {
//   createFirefly();
// }, 500);

// let timerId = setTimeout(() => {
//   createFirefly();
//   timerId = setTimeout(createFirefly(), 250);
// }, 350);
