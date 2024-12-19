const startForm = document.querySelector(".start-game-form");
startForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  window.localStorage.setItem("userName", name);
  document.body.classList.add("fade-out");

  setTimeout(() => {
    window.location.href = "game.html";
  }, 1200);
});

// import("./main.js").then(() => {
//   console.log("Game logic preloaded");
// });
