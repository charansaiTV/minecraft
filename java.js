document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeButton = document.querySelector("#theme-toggle");
  const savedTheme = localStorage.getItem("minecraft-theme");
  if (savedTheme === "dark") root.dataset.theme = "dark";
  const updateThemeButton = () => {
    const dark = root.dataset.theme === "dark";
    themeButton.textContent = dark ? "☀ Light mode" : "☾ Dark mode";
    themeButton.setAttribute("aria-pressed", String(dark));
  };
  updateThemeButton();
  themeButton.addEventListener("click", () => {
    const dark = root.dataset.theme !== "dark";
    root.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("minecraft-theme", dark ? "dark" : "light");
    updateThemeButton();
  });

  const board = document.querySelector("#game-board");
  const status = document.querySelector("#game-status");
  const scoreLabel = document.querySelector("#game-score");
  const reset = document.querySelector("#game-reset");
  let target = 0;
  let score = 0;
  let found = false;
  const startGame = () => {
    board.replaceChildren();
    target = Math.floor(Math.random() * 16);
    score = 0;
    found = false;
    scoreLabel.textContent = "0";
    status.textContent = "A creeper is hiding under one block. Find it!";
    for (let index = 0; index < 16; index += 1) {
      const tile = document.createElement("button");
      tile.className = "tile";
      tile.type = "button";
      tile.setAttribute("aria-label", `Grass block ${index + 1}, hidden`);
      tile.textContent = "?";
      tile.addEventListener("click", () => {
        if (found || tile.classList.contains("revealed")) return;
        tile.classList.add("revealed");
        score += 1;
        scoreLabel.textContent = String(score);
        if (index === target) {
          tile.textContent = "💚";
          tile.setAttribute("aria-label", "Creeper found!");
          found = true;
          status.textContent = `Creeper found in ${score} ${score === 1 ? "try" : "tries"}! Nice work!`;
          board.querySelectorAll(".tile").forEach((item) => { item.disabled = true; });
        } else {
          tile.textContent = "🟫";
          tile.setAttribute("aria-label", `Dirt block ${index + 1}, empty`);
          status.textContent = "No creeper there. Try another block!";
        }
      });
      board.append(tile);
    }
  };
  reset.addEventListener("click", startGame);
  startGame();
});
