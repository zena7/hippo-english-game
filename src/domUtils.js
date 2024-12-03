export const getElemBySelector = (elem) => document.querySelector(elem);
export const hideElem = (elem) => (elem.style.display = "none");
export const showElem = (elem) => (elem.style.display = "block");

export function actWithClassHide({
  node,
  act = "add",
  className = "buttonHide",
} = {}) {
  const actions = {
    add: () => node.classList.add(className),
    remove: () => node.classList.remove(className),
  };

  actions[act]();
}
