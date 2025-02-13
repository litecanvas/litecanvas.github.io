import Babel from "babel-standalone";
import loopProtection from "./loop-protect";

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

/**
 * @param {string} code
 * @returns {string}
 */
export function prepareCode(code) {
  const timeout = 500;
  Babel.registerPlugin("loopProtection", loopProtection(timeout));

  return Babel.transform(code, {
    plugins: ["loopProtection"],
  }).code;
}
