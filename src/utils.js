/**
 * @param {HTMLElement} el
 */
export function show(el) {
  el.removeAttribute("hidden");
}

/**
 * @param {HTMLElement} el
 */
export function hide(el) {
  el.setAttribute("hidden", "");
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
