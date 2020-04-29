/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/coercion'), require('@angular/cdk/platform'), require('@angular/core'), require('@angular/forms'), require('@angular/material/checkbox'), require('@angular/platform-browser/animations'), require('@material/checkbox'), require('@material/ripple'), require('@angular/common'), require('@angular/material/core')) :
	typeof define === 'function' && define.amd ? define('@angular/material-experimental/mdc-checkbox', ['exports', '@angular/cdk/coercion', '@angular/cdk/platform', '@angular/core', '@angular/forms', '@angular/material/checkbox', '@angular/platform-browser/animations', '@material/checkbox', '@material/ripple', '@angular/common', '@angular/material/core'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.materialExperimental = global.ng.materialExperimental || {}, global.ng.materialExperimental.mdcCheckbox = {}),global.ng.cdk.coercion,global.ng.cdk.platform,global.ng.core,global.ng.forms,global.ng.material.checkbox,global.ng.platformBrowser.animations,global.mdc.checkbox,global.mdc.ripple,global.ng.common,global.ng.material.core));
}(this, (function (exports,coercion,platform,core,forms,checkbox,animations,checkbox$1,ripple,common,core$1) { 'use strict';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var nextUniqueId = 0;
/** @type {?} */
var MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef((/**
     * @return {?}
     */
    function () { return MatCheckbox; })),
    multi: true
};
/**
 * Change event object emitted by MatCheckbox.
 */
var   /**
 * Change event object emitted by MatCheckbox.
 */
MatCheckboxChange = /** @class */ (function () {
    function MatCheckboxChange() {
    }
    return MatCheckboxChange;
}());
var MatCheckbox = /** @class */ (function () {
    function MatCheckbox(_changeDetectorRef, _platform, tabIndex, _clickAction, _animationMode) {
        var _this = this;
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
        this._uniqueId = "mat-mdc-checkbox-" + ++nextUniqueId;
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
        this.change = new core.EventEmitter();
        /**
         * Event emitted when the checkbox's `indeterminate` value changes.
         */
        this.indeterminateChange = new core.EventEmitter();
        /**
         * The set of classes that should be applied to the native input.
         */
        this._classes = { 'mdc-checkbox__native-control': true };
        /**
         * Animation config for the ripple.
         */
        this._rippleAnimation = {
            enterDuration: ripple.numbers.DEACTIVATION_TIMEOUT_MS,
            exitDuration: ripple.numbers.FG_DEACTIVATION_MS,
        };
        /**
         * ControlValueAccessor onChange
         */
        this._cvaOnChange = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
        /**
         * ControlValueAccessor onTouch
         */
        this._cvaOnTouch = (/**
         * @return {?}
         */
        function () { });
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
            function (className) { return _this._setClass(className, true); }),
            removeClass: (/**
             * @param {?} className
             * @return {?}
             */
            function (className) { return _this._setClass(className, false); }),
            forceLayout: (/**
             * @return {?}
             */
            function () { return _this._platform.isBrowser && _this._checkbox.nativeElement.offsetWidth; }),
            hasNativeControl: (/**
             * @return {?}
             */
            function () { return !!_this._nativeCheckbox; }),
            isAttachedToDOM: (/**
             * @return {?}
             */
            function () { return !!_this._checkbox.nativeElement.parentNode; }),
            isChecked: (/**
             * @return {?}
             */
            function () { return _this.checked; }),
            isIndeterminate: (/**
             * @return {?}
             */
            function () { return _this.indeterminate; }),
            removeNativeControlAttr: (/**
             * @param {?} attr
             * @return {?}
             */
            function (attr) {
                if (!_this._attrBlacklist.has(attr)) {
                    _this._nativeCheckbox.nativeElement.removeAttribute(attr);
                }
            }),
            setNativeControlAttr: (/**
             * @param {?} attr
             * @param {?} value
             * @return {?}
             */
            function (attr, value) {
                if (!_this._attrBlacklist.has(attr)) {
                    _this._nativeCheckbox.nativeElement.setAttribute(attr, value);
                }
            }),
            setNativeControlDisabled: (/**
             * @param {?} disabled
             * @return {?}
             */
            function (disabled) { return _this.disabled = disabled; }),
        };
        this.tabIndex = parseInt(tabIndex) || 0;
        this._checkboxFoundation = new checkbox$1.MDCCheckboxFoundation(this._checkboxAdapter);
        // Note: We don't need to set up the MDCFormFieldFoundation. Its only purpose is to manage the
        // ripple, which we do ourselves instead.
    }
    Object.defineProperty(MatCheckbox.prototype, "checked", {
        /** Whether the checkbox is checked. */
        get: /**
         * Whether the checkbox is checked.
         * @return {?}
         */
        function () {
            return this._checked;
        },
        set: /**
         * @param {?} checked
         * @return {?}
         */
        function (checked) {
            this._checked = coercion.coerceBooleanProperty(checked);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCheckbox.prototype, "indeterminate", {
        /**
         * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
         * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
         * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
         * set to false.
         */
        get: /**
         * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
         * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
         * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
         * set to false.
         * @return {?}
         */
        function () {
            return this._indeterminate;
        },
        set: /**
         * @param {?} indeterminate
         * @return {?}
         */
        function (indeterminate) {
            this._indeterminate = coercion.coerceBooleanProperty(indeterminate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCheckbox.prototype, "disabled", {
        /** Whether the checkbox is disabled. */
        get: /**
         * Whether the checkbox is disabled.
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} disabled
         * @return {?}
         */
        function (disabled) {
            this._disabled = coercion.coerceBooleanProperty(disabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCheckbox.prototype, "required", {
        /** Whether the checkbox is required. */
        get: /**
         * Whether the checkbox is required.
         * @return {?}
         */
        function () {
            return this._required;
        },
        set: /**
         * @param {?} required
         * @return {?}
         */
        function (required) {
            this._required = coercion.coerceBooleanProperty(required);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCheckbox.prototype, "disableRipple", {
        /** Whether to disable the ripple on this checkbox. */
        get: /**
         * Whether to disable the ripple on this checkbox.
         * @return {?}
         */
        function () {
            return this._disableRipple;
        },
        set: /**
         * @param {?} disableRipple
         * @return {?}
         */
        function (disableRipple) {
            this._disableRipple = coercion.coerceBooleanProperty(disableRipple);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCheckbox.prototype, "inputId", {
        /** Returns the unique id for the visual hidden input. */
        get: /**
         * Returns the unique id for the visual hidden input.
         * @return {?}
         */
        function () {
            return (this.id || this._uniqueId) + "-input";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatCheckbox.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this._checkboxFoundation.init();
    };
    /**
     * @return {?}
     */
    MatCheckbox.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._checkboxFoundation.destroy();
    };
    /**
     * Implemented as part of `ControlValueAccessor`
     * @docs-private
     */
    /**
     * Implemented as part of `ControlValueAccessor`
     * \@docs-private
     * @param {?} fn
     * @return {?}
     */
    MatCheckbox.prototype.registerOnChange = /**
     * Implemented as part of `ControlValueAccessor`
     * \@docs-private
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._cvaOnChange = fn;
    };
    /**
     * Implemented as part of `ControlValueAccessor`
     * @docs-private
     */
    /**
     * Implemented as part of `ControlValueAccessor`
     * \@docs-private
     * @param {?} fn
     * @return {?}
     */
    MatCheckbox.prototype.registerOnTouched = /**
     * Implemented as part of `ControlValueAccessor`
     * \@docs-private
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._cvaOnTouch = fn;
    };
    /**
     * Implemented as part of `ControlValueAccessor`
     * @docs-private
     */
    /**
     * Implemented as part of `ControlValueAccessor`
     * \@docs-private
     * @param {?} isDisabled
     * @return {?}
     */
    MatCheckbox.prototype.setDisabledState = /**
     * Implemented as part of `ControlValueAccessor`
     * \@docs-private
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Implemented as part of `ControlValueAccessor`
     * @docs-private
     */
    /**
     * Implemented as part of `ControlValueAccessor`
     * \@docs-private
     * @param {?} value
     * @return {?}
     */
    MatCheckbox.prototype.writeValue = /**
     * Implemented as part of `ControlValueAccessor`
     * \@docs-private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.checked = !!value;
        this._changeDetectorRef.markForCheck();
    };
    /** Focuses the checkbox. */
    /**
     * Focuses the checkbox.
     * @return {?}
     */
    MatCheckbox.prototype.focus = /**
     * Focuses the checkbox.
     * @return {?}
     */
    function () {
        this._nativeCheckbox.nativeElement.focus();
    };
    /** Toggles the `checked` state of the checkbox. */
    /**
     * Toggles the `checked` state of the checkbox.
     * @return {?}
     */
    MatCheckbox.prototype.toggle = /**
     * Toggles the `checked` state of the checkbox.
     * @return {?}
     */
    function () {
        this.checked = !this.checked;
        this._cvaOnChange(this.checked);
    };
    /** Handles blur events on the native input. */
    /**
     * Handles blur events on the native input.
     * @return {?}
     */
    MatCheckbox.prototype._onBlur = /**
     * Handles blur events on the native input.
     * @return {?}
     */
    function () {
        var _this = this;
        // When a focused element becomes disabled, the browser *immediately* fires a blur event.
        // Angular does not expect events to be raised during change detection, so any state change
        // (such as a form control's 'ng-touched') will cause a changed-after-checked error.
        // See https://github.com/angular/angular/issues/17793. To work around this, we defer
        // telling the form control it has been touched until the next tick.
        Promise.resolve().then((/**
         * @return {?}
         */
        function () {
            _this._cvaOnTouch();
            _this._changeDetectorRef.markForCheck();
        }));
    };
    /**
     * Handles click events on the native input.
     *
     * Note: we must listen to the `click` event rather than the `change` event because IE & Edge do
     * not actually change the checked state when the user clicks an indeterminate checkbox. By
     * listening to `click` instead we can override and normalize the behavior to change the checked
     * state like other browsers do.
     */
    /**
     * Handles click events on the native input.
     *
     * Note: we must listen to the `click` event rather than the `change` event because IE & Edge do
     * not actually change the checked state when the user clicks an indeterminate checkbox. By
     * listening to `click` instead we can override and normalize the behavior to change the checked
     * state like other browsers do.
     * @return {?}
     */
    MatCheckbox.prototype._onClick = /**
     * Handles click events on the native input.
     *
     * Note: we must listen to the `click` event rather than the `change` event because IE & Edge do
     * not actually change the checked state when the user clicks an indeterminate checkbox. By
     * listening to `click` instead we can override and normalize the behavior to change the checked
     * state like other browsers do.
     * @return {?}
     */
    function () {
        var _this = this;
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
            function () { return _this.indeterminateChange.next(_this.indeterminate); }));
        }
        else {
            this._nativeCheckbox.nativeElement.indeterminate = this.indeterminate;
        }
        this.checked = !this.checked;
        this._checkboxFoundation.handleChange();
        // Dispatch our change event
        /** @type {?} */
        var newEvent = new MatCheckboxChange();
        newEvent.source = (/** @type {?} */ (this));
        newEvent.checked = this.checked;
        this._cvaOnChange(this.checked);
        this.change.next(newEvent);
    };
    /** Gets the value for the `aria-checked` attribute of the native input. */
    /**
     * Gets the value for the `aria-checked` attribute of the native input.
     * @return {?}
     */
    MatCheckbox.prototype._getAriaChecked = /**
     * Gets the value for the `aria-checked` attribute of the native input.
     * @return {?}
     */
    function () {
        return this.checked ? 'true' : (this.indeterminate ? 'mixed' : 'false');
    };
    /** Sets whether the given CSS class should be applied to the native input. */
    /**
     * Sets whether the given CSS class should be applied to the native input.
     * @private
     * @param {?} cssClass
     * @param {?} active
     * @return {?}
     */
    MatCheckbox.prototype._setClass = /**
     * Sets whether the given CSS class should be applied to the native input.
     * @private
     * @param {?} cssClass
     * @param {?} active
     * @return {?}
     */
    function (cssClass, active) {
        this._classes[cssClass] = active;
        this._changeDetectorRef.markForCheck();
    };
    MatCheckbox.decorators = [
        { type: core.Component, args: [{selector: 'mat-checkbox',
                    template: "<div class=\"mdc-form-field\" [class.mdc-form-field--align-end]=\"labelPosition == 'before'\"><div #checkbox class=\"mdc-checkbox\"><input #nativeCheckbox type=\"checkbox\" [ngClass]=\"_classes\" [attr.aria-checked]=\"_getAriaChecked()\" [attr.aria-label]=\"ariaLabel || null\" [attr.aria-labelledby]=\"ariaLabelledby\" [attr.name]=\"name\" [attr.value]=\"value\" [checked]=\"checked\" [disabled]=\"disabled\" [indeterminate]=\"indeterminate\" [id]=\"inputId\" [required]=\"required\" [tabIndex]=\"tabIndex\" (blur)=\"_onBlur()\" (click)=\"_onClick()\" (change)=\"$event.stopPropagation()\"><div class=\"mdc-checkbox__background\"><svg class=\"mdc-checkbox__checkmark\" focusable=\"false\" viewBox=\"0 0 24 24\"><path class=\"mdc-checkbox__checkmark-path\" fill=\"none\" d=\"M1.73,12.91 8.1,19.28 22.79,4.59\"/></svg><div class=\"mdc-checkbox__mixedmark\"></div></div><div class=\"mat-mdc-checkbox-ripple\" mat-ripple [matRippleTrigger]=\"checkbox\" [matRippleDisabled]=\"disableRipple || disabled\" [matRippleCentered]=\"true\" [matRippleRadius]=\"20\" [matRippleAnimation]=\"_rippleAnimation\"></div></div><label #label [for]=\"inputId\" (click)=\"$event.stopPropagation()\"><ng-content></ng-content></label></div>",
                    styles: ["@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.78334}50%{animation-timing-function:cubic-bezier(0,0,.2,1)}100%{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0,0,0,1)}100%{transform:scaleX(1)}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(.4,0,1,1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.78334}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0,0,.2,1);transform:rotate(0);opacity:1}to{transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(.14,0,0,1);transform:rotate(45deg);opacity:0}to{transform:rotate(360deg);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:mdc-animation-deceleration-curve-timing-function;transform:rotate(-45deg);opacity:0}to{transform:rotate(0);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(.14,0,0,1);transform:rotate(0);opacity:1}to{transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;transform:scaleX(1);opacity:1}100%,32.8%{transform:scaleX(0);opacity:0}}.mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom;padding:11px}.mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms}.mdc-checkbox .mdc-checkbox__background{left:11px;right:initial;top:11px}.mdc-checkbox[dir=rtl] .mdc-checkbox .mdc-checkbox__background,[dir=rtl] .mdc-checkbox .mdc-checkbox .mdc-checkbox__background{left:initial;right:11px}.mdc-checkbox .mdc-checkbox__background::before{top:-13px;left:-13px;width:40px;height:40px}.mdc-checkbox .mdc-checkbox__native-control{top:0;right:0;left:0;width:40px;height:40px}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-ud9f0cb8d}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-ud9f0cb8d}@media screen and (-ms-high-contrast:active){.mdc-checkbox__mixedmark{margin:0 1px}}.mdc-checkbox--disabled{cursor:default;pointer-events:none}.mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid currentColor;border-radius:2px;background-color:transparent;pointer-events:none;will-change:background-color,border-color;transition:background-color 90ms 0s cubic-bezier(.4,0,.6,1),border-color 90ms 0s cubic-bezier(.4,0,.6,1)}.mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0;transition:opacity 180ms 0s cubic-bezier(.4,0,.6,1)}.mdc-checkbox--upgraded .mdc-checkbox__checkmark{opacity:1}.mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms 0s cubic-bezier(.4,0,.6,1);stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.78334;stroke-dasharray:29.78334}.mdc-checkbox__mixedmark{width:100%;height:0;transform:scaleX(0) rotate(0);border-width:1px;border-style:solid;opacity:0;transition:opacity 90ms 0s cubic-bezier(.4,0,.6,1),transform 90ms 0s cubic-bezier(.4,0,.6,1)}.mdc-checkbox--upgraded .mdc-checkbox__background,.mdc-checkbox--upgraded .mdc-checkbox__checkmark,.mdc-checkbox--upgraded .mdc-checkbox__checkmark-path,.mdc-checkbox--upgraded .mdc-checkbox__mixedmark{transition:none!important}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background,.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background{animation-duration:180ms;animation-timing-function:linear}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear 0s;transition:none}.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{animation:mdc-checkbox-indeterminate-checked-checkmark .5s linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-checked-mixedmark .5s linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-unchecked-mixedmark .3s linear 0s;transition:none}.mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background{transition:border-color 90ms 0s cubic-bezier(0,0,.2,1),background-color 90ms 0s cubic-bezier(0,0,.2,1)}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mdc-checkbox__background::before{position:absolute;transform:scale(0,0);border-radius:50%;opacity:0;pointer-events:none;content:\"\";will-change:opacity,transform;transition:opacity 90ms 0s cubic-bezier(.4,0,.6,1),transform 90ms 0s cubic-bezier(.4,0,.6,1)}.mdc-checkbox__native-control:focus~.mdc-checkbox__background::before{transform:scale(1);opacity:.12;transition:opacity 80ms 0s cubic-bezier(0,0,.2,1),transform 80ms 0s cubic-bezier(0,0,.2,1)}.mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit}.mdc-checkbox__native-control:disabled{cursor:default;pointer-events:none}.mdc-checkbox--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-checkbox--touch .mdc-checkbox__native-control{top:-4px;right:-4px;left:-4px;width:48px;height:48px}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms 0s cubic-bezier(0,0,.2,1),transform 180ms 0s cubic-bezier(0,0,.2,1);opacity:1}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(-45deg)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark{transform:rotate(45deg);opacity:0;transition:opacity 90ms 0s cubic-bezier(.4,0,.6,1),transform 90ms 0s cubic-bezier(.4,0,.6,1)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(0);opacity:1}.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field>label{order:0;margin-right:auto;padding-left:4px}.mdc-form-field[dir=rtl]>label,[dir=rtl] .mdc-form-field>label{margin-left:auto;padding-right:4px}.mdc-form-field--align-end>label{order:-1;margin-left:auto;padding-right:4px}.mdc-form-field--align-end[dir=rtl]>label,[dir=rtl] .mdc-form-field--align-end>label{margin-right:auto;padding-left:4px}.mat-mdc-checkbox .mdc-checkbox:hover .mdc-checkbox__native-control:not([disabled])~.mdc-checkbox__background::before{opacity:.04;transform:scale(1);transition:opacity 80ms 0 cubic-bezier(0,0,.2,1),transform 80ms 0 cubic-bezier(0,0,.2,1)}.mat-mdc-checkbox .mdc-checkbox .mdc-checkbox__native-control:not([disabled]):focus~.mdc-checkbox__background::before{opacity:.16}.mat-mdc-checkbox .mat-ripple-element{opacity:.12}.mat-mdc-checkbox._mat-animation-noopable *,.mat-mdc-checkbox._mat-animation-noopable ::before{transition:none!important;animation:none!important}.mat-mdc-checkbox label:empty{display:none}.mat-mdc-checkbox .mdc-checkbox__background::before,.mat-mdc-checkbox-ripple{position:absolute;width:40px;height:40px;top:50%;left:50%;margin:-20px 0 0 -20px;pointer-events:none}"],
                    host: {
                        'class': 'mat-mdc-checkbox',
                        '[attr.tabindex]': 'null',
                        '[class.mat-primary]': 'color == "primary"',
                        '[class.mat-accent]': 'color == "accent"',
                        '[class.mat-warn]': 'color == "warn"',
                        '[class._mat-animation-noopable]': "_animationMode === 'NoopAnimations'",
                        '[id]': 'id',
                    },
                    providers: [MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR],
                    exportAs: 'matCheckbox',
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatCheckbox.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef },
        { type: platform.Platform },
        { type: String, decorators: [{ type: core.Attribute, args: ['tabindex',] }] },
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [checkbox.MAT_CHECKBOX_CLICK_ACTION,] }] },
        { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [animations.ANIMATION_MODULE_TYPE,] }] }
    ]; };
    MatCheckbox.propDecorators = {
        ariaLabel: [{ type: core.Input, args: ['aria-label',] }],
        ariaLabelledby: [{ type: core.Input, args: ['aria-labelledby',] }],
        color: [{ type: core.Input }],
        labelPosition: [{ type: core.Input }],
        name: [{ type: core.Input }],
        tabIndex: [{ type: core.Input }],
        value: [{ type: core.Input }],
        id: [{ type: core.Input }],
        checked: [{ type: core.Input }],
        indeterminate: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        required: [{ type: core.Input }],
        disableRipple: [{ type: core.Input }],
        change: [{ type: core.Output }],
        indeterminateChange: [{ type: core.Output }],
        _checkbox: [{ type: core.ViewChild, args: ['checkbox', { static: false },] }],
        _nativeCheckbox: [{ type: core.ViewChild, args: ['nativeCheckbox', { static: false },] }],
        _label: [{ type: core.ViewChild, args: ['label', { static: false },] }]
    };
    return MatCheckbox;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MatCheckboxModule = /** @class */ (function () {
    function MatCheckboxModule() {
    }
    MatCheckboxModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [core$1.MatCommonModule, core$1.MatRippleModule, common.CommonModule, checkbox._MatCheckboxRequiredValidatorModule],
                    exports: [MatCheckbox, core$1.MatCommonModule, checkbox._MatCheckboxRequiredValidatorModule],
                    declarations: [MatCheckbox],
                },] },
    ];
    return MatCheckboxModule;
}());

exports.MAT_CHECKBOX_CLICK_ACTION = checkbox.MAT_CHECKBOX_CLICK_ACTION;
exports.MAT_CHECKBOX_REQUIRED_VALIDATOR = checkbox.MAT_CHECKBOX_REQUIRED_VALIDATOR;
exports.MatCheckboxRequiredValidator = checkbox.MatCheckboxRequiredValidator;
exports._MatCheckboxRequiredValidatorModule = checkbox._MatCheckboxRequiredValidatorModule;
exports.TransitionCheckState = checkbox.TransitionCheckState;
exports.MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR = MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR;
exports.MatCheckboxChange = MatCheckboxChange;
exports.MatCheckbox = MatCheckbox;
exports.MatCheckboxModule = MatCheckboxModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-experimental-mdc-checkbox.umd.js.map
