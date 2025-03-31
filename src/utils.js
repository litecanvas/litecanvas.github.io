import Babel from "@babel/standalone";
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
  return Babel.transform(code, {
    presets: [[Babel.availablePresets["env"], { loose: true, modules: false }]],
    plugins: ["loopProtection"],
  }).code;
}

window.Babel = Babel;
Babel.registerPlugin("loopProtection", loopProtection(500));
