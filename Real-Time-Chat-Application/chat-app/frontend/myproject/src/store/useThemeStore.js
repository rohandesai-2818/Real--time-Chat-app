import { create } from "zustand";

const themeColors = {
  light: { bg: "white", text: "black" },
  dark: { bg: "gray.900", text: "white" },
  cupcake: { bg: "pink.100", text: "purple.900" },
  bumblebee: { bg: "yellow.200", text: "black" },
  emerald: { bg: "green.500", text: "white" },
  corporate: { bg: "blue.800", text: "white" },
  synthwave: { bg: "purple.700", text: "pink.300" },
  retro: { bg: "orange.300", text: "black" },
  cyberpunk: { bg: "yellow.400", text: "pink.900" },
  valentine: { bg: "red.300", text: "white" },
  halloween: { bg: "orange.700", text: "black" },
  garden: { bg: "green.300", text: "brown.800" },
  forest: { bg: "green.700", text: "white" },
  aqua: { bg: "blue.300", text: "black" },
  lofi: { bg: "gray.100", text: "black" },
  pastel: { bg: "pink.200", text: "black" },
  fantasy: { bg: "purple.500", text: "white" },
  wireframe: { bg: "gray.300", text: "black" },
  black: { bg: "black", text: "white" },
  luxury: { bg: "purple.900", text: "gold.300" },
  dracula: { bg: "black", text: "purple.300" },
  cmyk: { bg: "cyan.500", text: "magenta.700" },
  autumn: { bg: "brown.700", text: "orange.300" },
  business: { bg: "gray.800", text: "white" },
  acid: { bg: "yellow.600", text: "black" },
  lemonade: { bg: "yellow.300", text: "green.700" },
  night: { bg: "gray.900", text: "white" },
  coffee: { bg: "brown.800", text: "beige.200" },
  winter: { bg: "blue.200", text: "gray.900" },
  dim: { bg: "gray.700", text: "gray.300" },
  nord: { bg: "blue.900", text: "white" },
  sunset: { bg: "orange.500", text: "black" },
};

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
  getThemeColors: (theme) => themeColors[theme] || themeColors["coffee"],
}));
