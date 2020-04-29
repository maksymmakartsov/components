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
import { Injectable, Self, NgZone } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { EditEventDispatcher } from './edit-event-dispatcher';
/**
 * Used for communication between the form within the edit lens and the
 * table that launched it. Provided by CdkEditControl within the lens.
 * @template FormValue
 */
var EditRef = /** @class */ (function () {
    function EditRef(_form, _editEventDispatcher, _ngZone) {
        this._form = _form;
        this._editEventDispatcher = _editEventDispatcher;
        this._ngZone = _ngZone;
        /**
         * Emits the final value of this edit instance before closing.
         */
        this._finalValueSubject = new Subject();
        this.finalValue = this._finalValueSubject.asObservable();
        /**
         * Emits when the user tabs out of this edit lens before closing.
         */
        this._blurredSubject = new Subject();
        this.blurred = this._blurredSubject.asObservable();
        this._editEventDispatcher.setActiveEditRef(this);
    }
    /**
     * Called by the host directive's OnInit hook. Reads the initial state of the
     * form and overrides it with persisted state from previous openings, if
     * applicable.
     */
    /**
     * Called by the host directive's OnInit hook. Reads the initial state of the
     * form and overrides it with persisted state from previous openings, if
     * applicable.
     * @param {?} previousFormValue
     * @return {?}
     */
    EditRef.prototype.init = /**
     * Called by the host directive's OnInit hook. Reads the initial state of the
     * form and overrides it with persisted state from previous openings, if
     * applicable.
     * @param {?} previousFormValue
     * @return {?}
     */
    function (previousFormValue) {
        var _this = this;
        // Wait for the zone to stabilize before caching the initial value.
        // This ensures that all form controls have been initialized.
        this._ngZone.onStable.pipe(take(1)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.updateRevertValue();
            if (previousFormValue) {
                _this.reset(previousFormValue);
            }
        }));
    };
    /**
     * @return {?}
     */
    EditRef.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._editEventDispatcher.unsetActiveEditRef(this);
        this._finalValueSubject.next(this._form.value);
        this._finalValueSubject.complete();
    };
    /** Whether the attached form is in a valid state. */
    /**
     * Whether the attached form is in a valid state.
     * @return {?}
     */
    EditRef.prototype.isValid = /**
     * Whether the attached form is in a valid state.
     * @return {?}
     */
    function () {
        return this._form.valid;
    };
    /** Set the form's current value as what it will be set to on revert/reset. */
    /**
     * Set the form's current value as what it will be set to on revert/reset.
     * @return {?}
     */
    EditRef.prototype.updateRevertValue = /**
     * Set the form's current value as what it will be set to on revert/reset.
     * @return {?}
     */
    function () {
        this._revertFormValue = this._form.value;
    };
    /** Tells the table to close the edit popup. */
    /**
     * Tells the table to close the edit popup.
     * @return {?}
     */
    EditRef.prototype.close = /**
     * Tells the table to close the edit popup.
     * @return {?}
     */
    function () {
        this._editEventDispatcher.editing.next(null);
    };
    /** Notifies the active edit that the user has moved focus out of the lens. */
    /**
     * Notifies the active edit that the user has moved focus out of the lens.
     * @return {?}
     */
    EditRef.prototype.blur = /**
     * Notifies the active edit that the user has moved focus out of the lens.
     * @return {?}
     */
    function () {
        this._blurredSubject.next();
    };
    /**
     * Resets the form value to the specified value or the previously set
     * revert value.
     */
    /**
     * Resets the form value to the specified value or the previously set
     * revert value.
     * @param {?=} value
     * @return {?}
     */
    EditRef.prototype.reset = /**
     * Resets the form value to the specified value or the previously set
     * revert value.
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        this._form.reset(value || this._revertFormValue);
    };
    EditRef.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    EditRef.ctorParameters = function () { return [
        { type: ControlContainer, decorators: [{ type: Self }] },
        { type: EditEventDispatcher },
        { type: NgZone }
    ]; };
    return EditRef;
}());
export { EditRef };
if (false) {
    /**
     * Emits the final value of this edit instance before closing.
     * @type {?}
     * @private
     */
    EditRef.prototype._finalValueSubject;
    /** @type {?} */
    EditRef.prototype.finalValue;
    /**
     * Emits when the user tabs out of this edit lens before closing.
     * @type {?}
     * @private
     */
    EditRef.prototype._blurredSubject;
    /** @type {?} */
    EditRef.prototype.blurred;
    /**
     * The value to set the form back to on revert.
     * @type {?}
     * @private
     */
    EditRef.prototype._revertFormValue;
    /**
     * @type {?}
     * @private
     */
    EditRef.prototype._form;
    /**
     * @type {?}
     * @private
     */
    EditRef.prototype._editEventDispatcher;
    /**
     * @type {?}
     * @private
     */
    EditRef.prototype._ngZone;
}
//# sourceMappingURL=edit-ref.js.map