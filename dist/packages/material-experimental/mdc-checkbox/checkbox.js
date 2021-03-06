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
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MDCCheckboxFoundation } from '@material/checkbox';
import { numbers } from '@material/ripple';
/** @type {?} */
let nextUniqueId = 0;
/** @type {?} */
export const MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => MatCheckbox)),
    multi: true
};
/**
 * Change event object emitted by MatCheckbox.
 */
export class MatCheckboxChange {
}
if (false) {
    /**
     * The source MatCheckbox of the event.
     * @type {?}
     */
    MatCheckboxChange.prototype.source;
    /**
     * The new `checked` value of the checkbox.
     * @type {?}
     */
    MatCheckboxChange.prototype.checked;
}
export class MatCheckbox {
    /**
     * @param {?} _changeDetectorRef
     * @param {?} _platform
     * @param {?} tabIndex
     * @param {?} _clickAction
     * @param {?=} _animationMode
     */
    constructor(_changeDetectorRef, _platform, tabIndex, _clickAction, _animationMode) {
        this._changeDetectorRef = _changeDetectorRef;
        this._platform = _platform;
        this._clickAction = _clickAction;
        this._animationMode = _animationMode;
        /**
         * The `aria-label` attribute to use for the input element. In most cases, `aria-labelledby` will
         * take precedence so this may be omitted.
         */
        this.ariaLabel = '';
        /**
         * The `aria-labelledby` attribute to use for the input element.
         */
        this.ariaLabelledby = null;
        /**
         * The color palette  for this checkbox ('primary', 'accent', or 'warn').
         */
        this.color = 'accent';
        /**
         * Whether the label should appear after or before the checkbox. Defaults to 'after'.
         */
        this.labelPosition = 'after';
        /**
         * The `name` attribute to use for the input element.
         */
        this.name = null;
        this._uniqueId = `mat-mdc-checkbox-${++nextUniqueId}`;
        /**
         * A unique id for the checkbox. If none is supplied, it will be auto-generated.
         */
        this.id = this._uniqueId;
        this._checked = false;
        this._indeterminate = false;
        this._disabled = false;
        this._required = false;
        this._disableRipple = false;
        /**
         * Event emitted when the checkbox's `checked` value changes.
         */
        this.change = new EventEmitter();
        /**
         * Event emitted when the checkbox's `indeterminate` value changes.
         */
        this.indeterminateChange = new EventEmitter();
        /**
         * The set of classes that should be applied to the native input.
         */
        this._classes = { 'mdc-checkbox__native-control': true };
        /**
         * Animation config for the ripple.
         */
        this._rippleAnimation = {
            enterDuration: numbers.DEACTIVATION_TIMEOUT_MS,
            exitDuration: numbers.FG_DEACTIVATION_MS,
        };
        /**
         * ControlValueAccessor onChange
         */
        this._cvaOnChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        /**
         * ControlValueAccessor onTouch
         */
        this._cvaOnTouch = (/**
         * @return {?}
         */
        () => { });
        /**
         * A list of attributes that should not be modified by `MDCFoundation` classes.
         *
         * MDC uses animation events to determine when to update `aria-checked` which is unreliable.
         * Therefore we disable it and handle it ourselves.
         */
        this._attrBlacklist = new Set(['aria-checked']);
        /**
         * The `MDCCheckboxAdapter` instance for this checkbox.
         */
        this._checkboxAdapter = {
            addClass: (/**
             * @param {?} className
             * @return {?}
             */
            (className) => this._setClass(className, true)),
            removeClass: (/**
             * @param {?} className
             * @return {?}
             */
            (className) => this._setClass(className, false)),
            forceLayout: (/**
             * @return {?}
             */
            () => this._platform.isBrowser && this._checkbox.nativeElement.offsetWidth),
            hasNativeControl: (/**
             * @return {?}
             */
            () => !!this._nativeCheckbox),
            isAttachedToDOM: (/**
             * @return {?}
             */
            () => !!this._checkbox.nativeElement.parentNode),
            isChecked: (/**
             * @return {?}
             */
            () => this.checked),
            isIndeterminate: (/**
             * @return {?}
             */
            () => this.indeterminate),
            removeNativeControlAttr: (/**
             * @param {?} attr
             * @return {?}
             */
            (attr) => {
                if (!this._attrBlacklist.has(attr)) {
                    this._nativeCheckbox.nativeElement.removeAttribute(attr);
                }
            }),
            setNativeControlAttr: (/**
             * @param {?} attr
             * @param {?} value
             * @return {?}
             */
            (attr, value) => {
                if (!this._attrBlacklist.has(attr)) {
                    this._nativeCheckbox.nativeElement.setAttribute(attr, value);
                }
            }),
            setNativeControlDisabled: (/**
             * @param {?} disabled
             * @return {?}
             */
            (disabled) => this.disabled = disabled),
        };
        this.tabIndex = parseInt(tabIndex) || 0;
        this._checkboxFoundation = new MDCCheckboxFoundation(this._checkboxAdapter);
        // Note: We don't need to set up the MDCFormFieldFoundation. Its only purpose is to manage the
        // ripple, which we do ourselves instead.
    }
    /**
     * Whether the checkbox is checked.
     * @return {?}
     */
    get checked() {
        return this._checked;
    }
    /**
     * @param {?} checked
     * @return {?}
     */
    set checked(checked) {
        this._checked = coerceBooleanProperty(checked);
    }
    /**
     * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
     * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
     * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
     * set to false.
     * @return {?}
     */
    get indeterminate() {
        return this._indeterminate;
    }
    /**
     * @param {?} indeterminate
     * @return {?}
     */
    set indeterminate(indeterminate) {
        this._indeterminate = coerceBooleanProperty(indeterminate);
    }
    /**
     * Whether the checkbox is disabled.
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} disabled
     * @return {?}
     */
    set disabled(disabled) {
        this._disabled = coerceBooleanProperty(disabled);
    }
    /**
     * Whether the checkbox is required.
     * @return {?}
     */
    get required() {
        return this._required;
    }
    /**
     * @param {?} required
     * @return {?}
     */
    set required(required) {
        this._required = coerceBooleanProperty(required);
    }
    /**
     * Whether to disable the ripple on this checkbox.
     * @return {?}
     */
    get disableRipple() {
        return this._disableRipple;
    }
    /**
     * @param {?} disableRipple
     * @return {?}
     */
    set disableRipple(disableRipple) {
        this._disableRipple = coerceBooleanProperty(disableRipple);
    }
    /**
     * Returns the unique id for the visual hidden input.
     * @return {?}
     */
    get inputId() {
        return `${this.id || this._uniqueId}-input`;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._checkboxFoundation.init();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._checkboxFoundation.destroy();
    }
    /**
     * Implemented as part of `ControlValueAccessor`
     * \@docs-private
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._cvaOnChange = fn;
    }
    /**
     * Implemented as part of `ControlValueAccessor`
     * \@docs-private
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._cvaOnTouch = fn;
    }
    /**
     * Implemented as part of `ControlValueAccessor`
     * \@docs-private
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Implemented as part of `ControlValueAccessor`
     * \@docs-private
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.checked = !!value;
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Focuses the checkbox.
     * @return {?}
     */
    focus() {
        this._nativeCheckbox.nativeElement.focus();
    }
    /**
     * Toggles the `checked` state of the checkbox.
     * @return {?}
     */
    toggle() {
        this.checked = !this.checked;
        this._cvaOnChange(this.checked);
    }
    /**
     * Handles blur events on the native input.
     * @return {?}
     */
    _onBlur() {
        // When a focused element becomes disabled, the browser *immediately* fires a blur event.
        // Angular does not expect events to be raised during change detection, so any state change
        // (such as a form control's 'ng-touched') will cause a changed-after-checked error.
        // See https://github.com/angular/angular/issues/17793. To work around this, we defer
        // telling the form control it has been touched until the next tick.
        Promise.resolve().then((/**
         * @return {?}
         */
        () => {
            this._cvaOnTouch();
            this._changeDetectorRef.markForCheck();
        }));
    }
    /**
     * Handles click events on the native input.
     *
     * Note: we must listen to the `click` event rather than the `change` event because IE & Edge do
     * not actually change the checked state when the user clicks an indeterminate checkbox. By
     * listening to `click` instead we can override and normalize the behavior to change the checked
     * state like other browsers do.
     * @return {?}
     */
    _onClick() {
        if (this._clickAction === 'noop') {
            this._nativeCheckbox.nativeElement.checked = this.checked;
            this._nativeCheckbox.nativeElement.indeterminate = this.indeterminate;
            return;
        }
        if (this.indeterminate && this._clickAction !== 'check') {
            this.indeterminate = false;
            // tslint:disable:max-line-length
            // We use `Promise.resolve().then` to ensure the same timing as the original `MatCheckbox`:
            // https://github.com/angular/components/blob/309d5644aa610ee083c56a823ce7c422988730e8/src/lib/checkbox/checkbox.ts#L381
            // tslint:enable:max-line-length
            Promise.resolve().then((/**
             * @return {?}
             */
            () => this.indeterminateChange.next(this.indeterminate)));
        }
        else {
            this._nativeCheckbox.nativeElement.indeterminate = this.indeterminate;
        }
        this.checked = !this.checked;
        this._checkboxFoundation.handleChange();
        // Dispatch our change event
        /** @type {?} */
        const newEvent = new MatCheckboxChange();
        newEvent.source = (/** @type {?} */ (this));
        newEvent.checked = this.checked;
        this._cvaOnChange(this.checked);
        this.change.next(newEvent);
    }
    /**
     * Gets the value for the `aria-checked` attribute of the native input.
     * @return {?}
     */
    _getAriaChecked() {
        return this.checked ? 'true' : (this.indeterminate ? 'mixed' : 'false');
    }
    /**
     * Sets whether the given CSS class should be applied to the native input.
     * @private
     * @param {?} cssClass
     * @param {?} active
     * @return {?}
     */
    _setClass(cssClass, active) {
        this._classes[cssClass] = active;
        this._changeDetectorRef.markForCheck();
    }
}
MatCheckbox.decorators = [
    { type: Component, args: [{selector: 'mat-checkbox',
                template: "<div class=\"mdc-form-field\" [class.mdc-form-field--align-end]=\"labelPosition == 'before'\"><div #checkbox class=\"mdc-checkbox\"><input #nativeCheckbox type=\"checkbox\" [ngClass]=\"_classes\" [attr.aria-checked]=\"_getAriaChecked()\" [attr.aria-label]=\"ariaLabel || null\" [attr.aria-labelledby]=\"ariaLabelledby\" [attr.name]=\"name\" [attr.value]=\"value\" [checked]=\"checked\" [disabled]=\"disabled\" [indeterminate]=\"indeterminate\" [id]=\"inputId\" [required]=\"required\" [tabIndex]=\"tabIndex\" (blur)=\"_onBlur()\" (click)=\"_onClick()\" (change)=\"$event.stopPropagation()\"><div class=\"mdc-checkbox__background\"><svg class=\"mdc-checkbox__checkmark\" focusable=\"false\" viewBox=\"0 0 24 24\"><path class=\"mdc-checkbox__checkmark-path\" fill=\"none\" d=\"M1.73,12.91 8.1,19.28 22.79,4.59\"/></svg><div class=\"mdc-checkbox__mixedmark\"></div></div><div class=\"mat-mdc-checkbox-ripple\" mat-ripple [matRippleTrigger]=\"checkbox\" [matRippleDisabled]=\"disableRipple || disabled\" [matRippleCentered]=\"true\" [matRippleRadius]=\"20\" [matRippleAnimation]=\"_rippleAnimation\"></div></div><label #label [for]=\"inputId\" (click)=\"$event.stopPropagation()\"><ng-content></ng-content></label></div>",
                styles: ["@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.78334}50%{animation-timing-function:cubic-bezier(0,0,.2,1)}100%{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0,0,0,1)}100%{transform:scaleX(1)}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(.4,0,1,1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.78334}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0,0,.2,1);transform:rotate(0);opacity:1}to{transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(.14,0,0,1);transform:rotate(45deg);opacity:0}to{transform:rotate(360deg);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:mdc-animation-deceleration-curve-timing-function;transform:rotate(-45deg);opacity:0}to{transform:rotate(0);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(.14,0,0,1);transform:rotate(0);opacity:1}to{transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;transform:scaleX(1);opacity:1}100%,32.8%{transform:scaleX(0);opacity:0}}.mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom;padding:11px}.mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms}.mdc-checkbox .mdc-checkbox__background{left:11px;right:initial;top:11px}.mdc-checkbox[dir=rtl] .mdc-checkbox .mdc-checkbox__background,[dir=rtl] .mdc-checkbox .mdc-checkbox .mdc-checkbox__background{left:initial;right:11px}.mdc-checkbox .mdc-checkbox__background::before{top:-13px;left:-13px;width:40px;height:40px}.mdc-checkbox .mdc-checkbox__native-control{top:0;right:0;left:0;width:40px;height:40px}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-ud9f0cb8d}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-ud9f0cb8d}@media screen and (-ms-high-contrast:active){.mdc-checkbox__mixedmark{margin:0 1px}}.mdc-checkbox--disabled{cursor:default;pointer-events:none}.mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid currentColor;border-radius:2px;background-color:transparent;pointer-events:none;will-change:background-color,border-color;transition:background-color 90ms 0s cubic-bezier(.4,0,.6,1),border-color 90ms 0s cubic-bezier(.4,0,.6,1)}.mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0;transition:opacity 180ms 0s cubic-bezier(.4,0,.6,1)}.mdc-checkbox--upgraded .mdc-checkbox__checkmark{opacity:1}.mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms 0s cubic-bezier(.4,0,.6,1);stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.78334;stroke-dasharray:29.78334}.mdc-checkbox__mixedmark{width:100%;height:0;transform:scaleX(0) rotate(0);border-width:1px;border-style:solid;opacity:0;transition:opacity 90ms 0s cubic-bezier(.4,0,.6,1),transform 90ms 0s cubic-bezier(.4,0,.6,1)}.mdc-checkbox--upgraded .mdc-checkbox__background,.mdc-checkbox--upgraded .mdc-checkbox__checkmark,.mdc-checkbox--upgraded .mdc-checkbox__checkmark-path,.mdc-checkbox--upgraded .mdc-checkbox__mixedmark{transition:none!important}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background,.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background{animation-duration:180ms;animation-timing-function:linear}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear 0s;transition:none}.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{animation:mdc-checkbox-indeterminate-checked-checkmark .5s linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-checked-mixedmark .5s linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-unchecked-mixedmark .3s linear 0s;transition:none}.mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background{transition:border-color 90ms 0s cubic-bezier(0,0,.2,1),background-color 90ms 0s cubic-bezier(0,0,.2,1)}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mdc-checkbox__background::before{position:absolute;transform:scale(0,0);border-radius:50%;opacity:0;pointer-events:none;content:\"\";will-change:opacity,transform;transition:opacity 90ms 0s cubic-bezier(.4,0,.6,1),transform 90ms 0s cubic-bezier(.4,0,.6,1)}.mdc-checkbox__native-control:focus~.mdc-checkbox__background::before{transform:scale(1);opacity:.12;transition:opacity 80ms 0s cubic-bezier(0,0,.2,1),transform 80ms 0s cubic-bezier(0,0,.2,1)}.mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit}.mdc-checkbox__native-control:disabled{cursor:default;pointer-events:none}.mdc-checkbox--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-checkbox--touch .mdc-checkbox__native-control{top:-4px;right:-4px;left:-4px;width:48px;height:48px}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms 0s cubic-bezier(0,0,.2,1),transform 180ms 0s cubic-bezier(0,0,.2,1);opacity:1}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(-45deg)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark{transform:rotate(45deg);opacity:0;transition:opacity 90ms 0s cubic-bezier(.4,0,.6,1),transform 90ms 0s cubic-bezier(.4,0,.6,1)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(0);opacity:1}.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field>label{order:0;margin-right:auto;padding-left:4px}.mdc-form-field[dir=rtl]>label,[dir=rtl] .mdc-form-field>label{margin-left:auto;padding-right:4px}.mdc-form-field--align-end>label{order:-1;margin-left:auto;padding-right:4px}.mdc-form-field--align-end[dir=rtl]>label,[dir=rtl] .mdc-form-field--align-end>label{margin-right:auto;padding-left:4px}.mat-mdc-checkbox .mdc-checkbox:hover .mdc-checkbox__native-control:not([disabled])~.mdc-checkbox__background::before{opacity:.04;transform:scale(1);transition:opacity 80ms 0 cubic-bezier(0,0,.2,1),transform 80ms 0 cubic-bezier(0,0,.2,1)}.mat-mdc-checkbox .mdc-checkbox .mdc-checkbox__native-control:not([disabled]):focus~.mdc-checkbox__background::before{opacity:.16}.mat-mdc-checkbox .mat-ripple-element{opacity:.12}.mat-mdc-checkbox._mat-animation-noopable *,.mat-mdc-checkbox._mat-animation-noopable ::before{transition:none!important;animation:none!important}.mat-mdc-checkbox label:empty{display:none}.mat-mdc-checkbox .mdc-checkbox__background::before,.mat-mdc-checkbox-ripple{position:absolute;width:40px;height:40px;top:50%;left:50%;margin:-20px 0 0 -20px;pointer-events:none}"],
                host: {
                    'class': 'mat-mdc-checkbox',
                    '[attr.tabindex]': 'null',
                    '[class.mat-primary]': 'color == "primary"',
                    '[class.mat-accent]': 'color == "accent"',
                    '[class.mat-warn]': 'color == "warn"',
                    '[class._mat-animation-noopable]': `_animationMode === 'NoopAnimations'`,
                    '[id]': 'id',
                },
                providers: [MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR],
                exportAs: 'matCheckbox',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/** @nocollapse */
MatCheckbox.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Platform },
    { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_CHECKBOX_CLICK_ACTION,] }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];
MatCheckbox.propDecorators = {
    ariaLabel: [{ type: Input, args: ['aria-label',] }],
    ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }],
    color: [{ type: Input }],
    labelPosition: [{ type: Input }],
    name: [{ type: Input }],
    tabIndex: [{ type: Input }],
    value: [{ type: Input }],
    id: [{ type: Input }],
    checked: [{ type: Input }],
    indeterminate: [{ type: Input }],
    disabled: [{ type: Input }],
    required: [{ type: Input }],
    disableRipple: [{ type: Input }],
    change: [{ type: Output }],
    indeterminateChange: [{ type: Output }],
    _checkbox: [{ type: ViewChild, args: ['checkbox', { static: false },] }],
    _nativeCheckbox: [{ type: ViewChild, args: ['nativeCheckbox', { static: false },] }],
    _label: [{ type: ViewChild, args: ['label', { static: false },] }]
};
if (false) {
    /**
     * The `aria-label` attribute to use for the input element. In most cases, `aria-labelledby` will
     * take precedence so this may be omitted.
     * @type {?}
     */
    MatCheckbox.prototype.ariaLabel;
    /**
     * The `aria-labelledby` attribute to use for the input element.
     * @type {?}
     */
    MatCheckbox.prototype.ariaLabelledby;
    /**
     * The color palette  for this checkbox ('primary', 'accent', or 'warn').
     * @type {?}
     */
    MatCheckbox.prototype.color;
    /**
     * Whether the label should appear after or before the checkbox. Defaults to 'after'.
     * @type {?}
     */
    MatCheckbox.prototype.labelPosition;
    /**
     * The `name` attribute to use for the input element.
     * @type {?}
     */
    MatCheckbox.prototype.name;
    /**
     * The `tabindex` attribute to use for the input element.
     * @type {?}
     */
    MatCheckbox.prototype.tabIndex;
    /**
     * The `value` attribute to use for the input element
     * @type {?}
     */
    MatCheckbox.prototype.value;
    /**
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._uniqueId;
    /**
     * A unique id for the checkbox. If none is supplied, it will be auto-generated.
     * @type {?}
     */
    MatCheckbox.prototype.id;
    /**
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._checked;
    /**
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._indeterminate;
    /**
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._required;
    /**
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._disableRipple;
    /**
     * Event emitted when the checkbox's `checked` value changes.
     * @type {?}
     */
    MatCheckbox.prototype.change;
    /**
     * Event emitted when the checkbox's `indeterminate` value changes.
     * @type {?}
     */
    MatCheckbox.prototype.indeterminateChange;
    /**
     * The root element for the `MDCCheckbox`.
     * @type {?}
     */
    MatCheckbox.prototype._checkbox;
    /**
     * The native input element.
     * @type {?}
     */
    MatCheckbox.prototype._nativeCheckbox;
    /**
     * The native label element.
     * @type {?}
     */
    MatCheckbox.prototype._label;
    /**
     * The `MDCCheckboxFoundation` instance for this checkbox.
     * @type {?}
     */
    MatCheckbox.prototype._checkboxFoundation;
    /**
     * The set of classes that should be applied to the native input.
     * @type {?}
     */
    MatCheckbox.prototype._classes;
    /**
     * Animation config for the ripple.
     * @type {?}
     */
    MatCheckbox.prototype._rippleAnimation;
    /**
     * ControlValueAccessor onChange
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._cvaOnChange;
    /**
     * ControlValueAccessor onTouch
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._cvaOnTouch;
    /**
     * A list of attributes that should not be modified by `MDCFoundation` classes.
     *
     * MDC uses animation events to determine when to update `aria-checked` which is unreliable.
     * Therefore we disable it and handle it ourselves.
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._attrBlacklist;
    /**
     * The `MDCCheckboxAdapter` instance for this checkbox.
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._checkboxAdapter;
    /**
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._platform;
    /**
     * @type {?}
     * @private
     */
    MatCheckbox.prototype._clickAction;
    /** @type {?} */
    MatCheckbox.prototype._animationMode;
}
//# sourceMappingURL=checkbox.js.map