import { getElemBySelector, hideElem, showElem } from "./domUtils";
const soundsBtns = document.querySelectorAll(".volumeBtn");

export let isThereSound = true;

export function turnSound() {
  const btnSoundOn = getElemBySelector(".volumeYes");
  const btnSoundNo = getElemBySelector(".volumeNo");

  isThereSound = !isThereSound;
  if (isThereSound) {
    btnSoundOn.classList.remove("buttonHide");
    btnSoundNo.classList.add("buttonHide");
  } else {
    btnSoundNo.classList.remove("buttonHide");
    btnSoundOn.classList.add("buttonHide");
  }
}

export function getSoundState() {
  return isThereSound;
}
