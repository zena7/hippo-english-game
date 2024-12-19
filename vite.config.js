import { defineConfig } from "vite";

export default defineConfig({
  base: "/hippo-english-game/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        game: "game.html",
      },
    },
  },
});
