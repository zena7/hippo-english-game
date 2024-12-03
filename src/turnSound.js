import { actWithClassHide, getElemBySelector } from "./domUtils";
import { isThereSound, setIsThereSound } from "./state";

function turnSound() {
  const btnSoundOn = getElemBySelector(".volumeYes");
  const btnSoundNo = getElemBySelector(".volumeNo");

  setIsThereSound(!isThereSound);
  if (isThereSound) {
    actWithClassHide({ node: btnSoundOn, act: "remove" });
    actWithClassHide({ node: btnSoundNo });
  } else {
    actWithClassHide({ node: btnSoundNo, act: "remove" });
    actWithClassHide({ node: btnSoundOn });
  }
}

// export function getSoundState() {
//   return isThereSound;
// }

export { turnSound };
