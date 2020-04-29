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
export function typeInElement(element) {
    var modifiersAndKeys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        modifiersAndKeys[_i - 1] = arguments[_i];
    }
    /** @type {?} */
    var first = modifiersAndKeys[0];
    /** @type {?} */
    var modifiers;
    /** @type {?} */
    var rest;
    if (typeof first !== 'string' && first.keyCode === undefined && first.key === undefined) {
        modifiers = first;
        rest = modifiersAndKeys.slice(1);
    }
    else {
        modifiers = {};
        rest = modifiersAndKeys;
    }
    /** @type {?} */
    var keys = rest
        .map((/**
     * @param {?} k
     * @return {?}
     */
    function (k) { return typeof k === 'string' ?
        k.split('').map((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return ({ keyCode: c.toUpperCase().charCodeAt(0), key: c }); })) : [k]; }))
        .reduce((/**
     * @param {?} arr
     * @param {?} k
     * @return {?}
     */
    function (arr, k) { return arr.concat(k); }), []);
    triggerFocus(element);
    for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
        var key = keys_1[_a];
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