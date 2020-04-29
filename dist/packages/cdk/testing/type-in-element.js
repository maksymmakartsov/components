/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { dispatchFakeEvent, dispatchKeyboardEvent } from './dispatch-events';
import { triggerFocus } from './element-focus';
/**
 * Checks whether the given Element is a text input element.
 * \@docs-private
 * @param {?} element
 * @return {?}
 */
export function isTextInput(element) {
    return element.nodeName.toLowerCase() === 'input' ||
        element.nodeName.toLowerCase() === 'textarea';
}
/**
 * @param {?} element
 * @param {...?} modifiersAndKeys
 * @return {?}
 */
export function typeInElement(element, ...modifiersAndKeys) {
    /** @type {?} */
    const first = modifiersAndKeys[0];
    /** @type {?} */
    let modifiers;
    /** @type {?} */
    let rest;
    if (typeof first !== 'string' && first.keyCode === undefined && first.key === undefined) {
        modifiers = first;
        rest = modifiersAndKeys.slice(1);
    }
    else {
        modifiers = {};
        rest = modifiersAndKeys;
    }
    /** @type {?} */
    const keys = rest
        .map((/**
     * @param {?} k
     * @return {?}
     */
    k => typeof k === 'string' ?
        k.split('').map((/**
         * @param {?} c
         * @return {?}
         */
        c => ({ keyCode: c.toUpperCase().charCodeAt(0), key: c }))) : [k]))
        .reduce((/**
     * @param {?} arr
     * @param {?} k
     * @return {?}
     */
    (arr, k) => arr.concat(k)), []);
    triggerFocus(element);
    for (const key of keys) {
        dispatchKeyboardEvent(element, 'keydown', key.keyCode, key.key, element, modifiers);
        dispatchKeyboardEvent(element, 'keypress', key.keyCode, key.key, element, modifiers);
        if (isTextInput(element) && key.key && key.key.length === 1) {
            element.value += key.key;
            dispatchFakeEvent(element, 'input');
        }
        dispatchKeyboardEvent(element, 'keyup', key.keyCode, key.key, element, modifiers);
    }
}
/**
 * Clears the text in an input or textarea element.
 * \@docs-private
 * @param {?} element
 * @return {?}
 */
export function clearElement(element) {
    triggerFocus((/** @type {?} */ (element)));
    element.value = '';
    dispatchFakeEvent(element, 'input');
}
//# sourceMappingURL=type-in-element.js.map