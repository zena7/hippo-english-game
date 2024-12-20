let currentLanguage = "Ru";
const setCurrentLanguage = (value) => (currentLanguage = value);
let isThereSound = true;
const setIsThereSound = (value) => (isThereSound = value);
let name = window.localStorage.getItem("userName");

export {
  currentLanguage,
  setCurrentLanguage,
  isThereSound,
  setIsThereSound,
  name,
};
