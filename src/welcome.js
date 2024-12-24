const startForm = document.querySelector(".start-game-form");
console.log("JS WELCOME CONNECTED");

startForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  window.localStorage.setItem("userName", name);
  document.querySelector(".welcome-page").classList.add("fade-out");

  setTimeout(() => {
    window.location.href = `game.html`;
  }, 1200);
});
