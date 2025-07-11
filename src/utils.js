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

// window.Babel = Babel;
Babel.registerPlugin("loopProtection", loopProtection(1000));

/**
 * @param {string} code
 * @returns {string}
 */
export function prepareCode(code) {
  let result;
  try {
    result = Babel.transform(code, {
      presets: [
        [Babel.availablePresets["env"], { loose: true, modules: false }],
      ],
      plugins: ["loopProtection"],
    }).code;
  } catch (e) {
    const message = e.message.split("\n")[0];
    result = `throw new SyntaxError(\`${message}\`);`;
  }
  return result;
}
