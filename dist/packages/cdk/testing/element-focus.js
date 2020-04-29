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
import { dispatchFakeEvent } from './dispatch-events';
/**
 * @param {?} element
 * @param {?} event
 * @return {?}
 */
function triggerFocusChange(element, event) {
    /** @type {?} */
    let eventFired = false;
    /** @type {?} */
    const handler = (/**
     * @return {?}
     */
    () => eventFired = true);
    element.addEventListener(event, handler);
    element[event]();
    element.removeEventListener(event, handler);
    if (!eventFired) {
        dispatchFakeEvent(element, event);
    }
}
/**
 * Patches an elements focus and blur methods to emit events consistently and predictably.
 * This is necessary, because some browsers, like IE11, will call the focus handlers asynchronously,
 * while others won't fire them at all if the browser window is not focused.
 * \@docs-private
 * @param {?} element
 * @return {?}
 */
export function patchElementFocus(element) {
    element.focus = (/**
     * @return {?}
     */
    () => dispatchFakeEvent(element, 'focus'));
    element.blur = (/**
     * @return {?}
     */
    () => dispatchFakeEvent(element, 'blur'));
}
/**
 * \@docs-private
 * @param {?} element
 * @return {?}
 */
export function triggerFocus(element) {
    triggerFocusChange(element, 'focus');
}
/**
 * \@docs-private
 * @param {?} element
 * @return {?}
 */
export function triggerBlur(element) {
    triggerFocusChange(element, 'blur');
}
//# sourceMappingURL=element-focus.js.map