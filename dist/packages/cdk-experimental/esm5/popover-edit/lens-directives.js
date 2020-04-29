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
import { ReplaySubject } from 'rxjs';
import { Directive, ElementRef, EventEmitter, Input, HostListener, } from '@angular/core';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { EDIT_PANE_SELECTOR } from './constants';
import { closest } from './polyfill';
import { EditRef } from './edit-ref';
/**
 * A directive that attaches to a form within the edit lens.
 * It coordinates the form state with the table-wide edit system and handles
 * closing the edit lens when the form is submitted or the user clicks
 * out.
 * @template FormValue
 */
var CdkEditControl = /** @class */ (function () {
    function CdkEditControl(elementRef, editRef) {
        this.elementRef = elementRef;
        this.editRef = editRef;
        this.destroyed = new ReplaySubject();
        /**
         * Specifies what should happen when the user clicks outside of the edit lens.
         * The default behavior is to close the lens without submitting the form.
         */
        this.clickOutBehavior = 'close';
        this.preservedFormValueChange = new EventEmitter();
        /**
         * Determines whether the lens will close on form submit if the form is not in a valid
         * state. By default the lens will remain open.
         */
        this.ignoreSubmitUnlessValid = true;
    }
    /**
     * @return {?}
     */
    CdkEditControl.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.editRef.init(this.preservedFormValue);
        this.editRef.finalValue.subscribe(this.preservedFormValueChange);
        this.editRef.blurred.subscribe((/**
         * @return {?}
         */
        function () { return _this._handleBlur(); }));
    };
    /**
     * @return {?}
     */
    CdkEditControl.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed.next();
        this.destroyed.complete();
    };
    /**
     * Called when the form submits. If ignoreSubmitUnlessValid is true, checks
     * the form for validity before proceeding.
     * Updates the revert state with the latest submitted value then closes the edit.
     */
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /**
     * Called when the form submits. If ignoreSubmitUnlessValid is true, checks
     * the form for validity before proceeding.
     * Updates the revert state with the latest submitted value then closes the edit.
     * @return {?}
     */
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    CdkEditControl.prototype.handleFormSubmit = /**
     * Called when the form submits. If ignoreSubmitUnlessValid is true, checks
     * the form for validity before proceeding.
     * Updates the revert state with the latest submitted value then closes the edit.
     * @return {?}
     */
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    function () {
        if (this.ignoreSubmitUnlessValid && !this.editRef.isValid()) {
            return;
        }
        this.editRef.updateRevertValue();
        this.editRef.close();
    };
    /** Called on Escape keyup. Closes the edit. */
    /**
     * Called on Escape keyup. Closes the edit.
     * @return {?}
     */
    CdkEditControl.prototype.close = /**
     * Called on Escape keyup. Closes the edit.
     * @return {?}
     */
    function () {
        // todo - allow this behavior to be customized as well, such as calling
        // reset before close
        this.editRef.close();
    };
    /**
     * Called on click anywhere in the document.
     * If the click was outside of the lens, trigger the specified click out behavior.
     */
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /**
     * Called on click anywhere in the document.
     * If the click was outside of the lens, trigger the specified click out behavior.
     * @param {?} evt
     * @return {?}
     */
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    CdkEditControl.prototype.handlePossibleClickOut = /**
     * Called on click anywhere in the document.
     * If the click was outside of the lens, trigger the specified click out behavior.
     * @param {?} evt
     * @return {?}
     */
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    function (evt) {
        if (closest(evt.target, EDIT_PANE_SELECTOR)) {
            return;
        }
        switch (this.clickOutBehavior) {
            case 'submit':
                // Manually cause the form to submit before closing.
                this._triggerFormSubmit();
                this.editRef.close();
                break;
            case 'close':
                this.editRef.close();
                break;
            default:
                break;
        }
    };
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /**
     * @param {?} event
     * @return {?}
     */
    CdkEditControl.prototype._handleKeydown = 
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.key === 'Escape' && !hasModifierKey(event)) {
            this.close();
            event.preventDefault();
        }
    };
    /** Triggers submit on tab out if clickOutBehavior is 'submit'. */
    /**
     * Triggers submit on tab out if clickOutBehavior is 'submit'.
     * @private
     * @return {?}
     */
    CdkEditControl.prototype._handleBlur = /**
     * Triggers submit on tab out if clickOutBehavior is 'submit'.
     * @private
     * @return {?}
     */
    function () {
        if (this.clickOutBehavior === 'submit') {
            // Manually cause the form to submit before closing.
            this._triggerFormSubmit();
        }
    };
    /**
     * @private
     * @return {?}
     */
    CdkEditControl.prototype._triggerFormSubmit = /**
     * @private
     * @return {?}
     */
    function () {
        (/** @type {?} */ (this.elementRef.nativeElement)).dispatchEvent(new Event('submit'));
    };
    CdkEditControl.decorators = [
        { type: Directive, args: [{
                    selector: 'form[cdkEditControl]',
                    inputs: [
                        'clickOutBehavior: cdkEditControlClickOutBehavior',
                        'preservedFormValue: cdkEditControlPreservedFormValue',
                        'ignoreSubmitUnlessValid: cdkEditControlIgnoreSubmitUnlessValid',
                    ],
                    outputs: ['preservedFormValueChange: cdkEditControlPreservedFormValueChange'],
                    providers: [EditRef],
                },] },
    ];
    /** @nocollapse */
    CdkEditControl.ctorParameters = function () { return [
        { type: ElementRef },
        { type: EditRef }
    ]; };
    CdkEditControl.propDecorators = {
        handleFormSubmit: [{ type: HostListener, args: ['ngSubmit',] }],
        handlePossibleClickOut: [{ type: HostListener, args: ['document:click', ['$event'],] }],
        _handleKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
    };
    return CdkEditControl;
}());
export { CdkEditControl };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    CdkEditControl.prototype.destroyed;
    /**
     * Specifies what should happen when the user clicks outside of the edit lens.
     * The default behavior is to close the lens without submitting the form.
     * @type {?}
     */
    CdkEditControl.prototype.clickOutBehavior;
    /**
     * A two-way binding for storing unsubmitted form state. If not provided
     * then form state will be discarded on close. The PeristBy directive is offered
     * as a convenient shortcut for these bindings.
     * @type {?}
     */
    CdkEditControl.prototype.preservedFormValue;
    /** @type {?} */
    CdkEditControl.prototype.preservedFormValueChange;
    /**
     * Determines whether the lens will close on form submit if the form is not in a valid
     * state. By default the lens will remain open.
     * @type {?}
     */
    CdkEditControl.prototype.ignoreSubmitUnlessValid;
    /**
     * @type {?}
     * @protected
     */
    CdkEditControl.prototype.elementRef;
    /** @type {?} */
    CdkEditControl.prototype.editRef;
}
/**
 * Reverts the form to its initial or previously submitted state on click.
 * @template FormValue
 */
var CdkEditRevert = /** @class */ (function () {
    function CdkEditRevert(editRef) {
        this.editRef = editRef;
        /**
         * Type of the button. Defaults to `button` to avoid accident form submits.
         */
        this.type = 'button';
    }
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /**
     * @return {?}
     */
    CdkEditRevert.prototype.revertEdit = 
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /**
     * @return {?}
     */
    function () {
        this.editRef.reset();
    };
    CdkEditRevert.decorators = [
        { type: Directive, args: [{
                    selector: 'button[cdkEditRevert]',
                    host: {
                        'type': 'button',
                    }
                },] },
    ];
    /** @nocollapse */
    CdkEditRevert.ctorParameters = function () { return [
        { type: EditRef }
    ]; };
    CdkEditRevert.propDecorators = {
        type: [{ type: Input }],
        revertEdit: [{ type: HostListener, args: ['click',] }]
    };
    return CdkEditRevert;
}());
export { CdkEditRevert };
if (false) {
    /**
     * Type of the button. Defaults to `button` to avoid accident form submits.
     * @type {?}
     */
    CdkEditRevert.prototype.type;
    /**
     * @type {?}
     * @protected
     */
    CdkEditRevert.prototype.editRef;
}
/**
 * Closes the lens on click.
 * @template FormValue
 */
var CdkEditClose = /** @class */ (function () {
    function CdkEditClose(editRef) {
        this.editRef = editRef;
        /**
         * Type of the button. Defaults to `button` to avoid accident form submits.
         */
        this.type = 'button';
    }
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /**
     * @return {?}
     */
    CdkEditClose.prototype.closeEdit = 
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /**
     * @return {?}
     */
    function () {
        // Note that we use `click` here, rather than a keyboard event, because some screen readers
        // will emit a fake click event instead of an enter keyboard event on buttons.
        this.editRef.close();
    };
    CdkEditClose.decorators = [
        { type: Directive, args: [{
                    selector: 'button[cdkEditClose]',
                    host: {
                        'type': 'button',
                    }
                },] },
    ];
    /** @nocollapse */
    CdkEditClose.ctorParameters = function () { return [
        { type: EditRef }
    ]; };
    CdkEditClose.propDecorators = {
        type: [{ type: Input }],
        closeEdit: [{ type: HostListener, args: ['click',] }]
    };
    return CdkEditClose;
}());
export { CdkEditClose };
if (false) {
    /**
     * Type of the button. Defaults to `button` to avoid accident form submits.
     * @type {?}
     */
    CdkEditClose.prototype.type;
    /**
     * @type {?}
     * @protected
     */
    CdkEditClose.prototype.editRef;
}
//# sourceMappingURL=lens-directives.js.map