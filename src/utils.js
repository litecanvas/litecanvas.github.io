/**
 * @param {HTMLElement} el
 */
export function show(el) {
  el.hidden = false;
  el.style.display = "";
}

/**
 * @param {HTMLElement} el
 */
export function hide(el) {
  el.hidden = true;
  el.style.display = "none";
}

/**
 * @param {string} selector
 * @param {HTMLElement} parent
 * @return {HTMLElement|null}
 */
export function $(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * @param {string} selector
 * @param {HTMLElement} parent
 * @return {HTMLElement|null}
 */
export function $$(selector, parent = document) {
  return parent.querySelectorAll(selector);
}
