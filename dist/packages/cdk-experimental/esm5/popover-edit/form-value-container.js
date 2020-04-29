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
/**
 * @record
 * @template FormValue
 */
export function Entry() { }
if (false) {
    /** @type {?|undefined} */
    Entry.prototype.value;
}
/**
 * A convenience class for preserving unsaved form state while an edit lens is closed.
 *
 * Example usage:
 * class MyComponent {
 *   readonly nameEditValues = new FormValueContainer&lt;Item, {name: string}&gt;();
 * }
 *
 * &lt;form cdkEditControl [(cdkEditControlPreservedFormValue)]="nameEditValues.for(item).value"&gt;
 * @template Key, FormValue
 */
var /**
 * A convenience class for preserving unsaved form state while an edit lens is closed.
 *
 * Example usage:
 * class MyComponent {
 *   readonly nameEditValues = new FormValueContainer&lt;Item, {name: string}&gt;();
 * }
 *
 * &lt;form cdkEditControl [(cdkEditControlPreservedFormValue)]="nameEditValues.for(item).value"&gt;
 * @template Key, FormValue
 */
FormValueContainer = /** @class */ (function () {
    function FormValueContainer() {
        this._formValues = new WeakMap();
    }
    /**
     * @param {?} key
     * @return {?}
     */
    FormValueContainer.prototype.for = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var _formValues = this._formValues;
        /** @type {?} */
        var entry = _formValues.get(key);
        if (!entry) {
            // Expose entry as an object so that we can [(two-way)] bind to its value member
            entry = {};
            _formValues.set(key, entry);
        }
        return entry;
    };
    return FormValueContainer;
}());
/**
 * A convenience class for preserving unsaved form state while an edit lens is closed.
 *
 * Example usage:
 * class MyComponent {
 *   readonly nameEditValues = new FormValueContainer&lt;Item, {name: string}&gt;();
 * }
 *
 * &lt;form cdkEditControl [(cdkEditControlPreservedFormValue)]="nameEditValues.for(item).value"&gt;
 * @template Key, FormValue
 */
export { FormValueContainer };
if (false) {
    /**
     * @type {?}
     * @private
     */
    FormValueContainer.prototype._formValues;
}
//# sourceMappingURL=form-value-container.js.map