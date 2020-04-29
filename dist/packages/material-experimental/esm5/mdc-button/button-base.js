/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ViewChild } from '@angular/core';
import { MatRipple, mixinColor, mixinDisabled, mixinDisableRipple } from '@angular/material/core';
import { numbers } from '@material/ripple';
/**
 * Inputs common to all buttons.
 * @type {?}
 */
export var MAT_BUTTON_INPUTS = ['disabled', 'disableRipple', 'color'];
/**
 * Shared host configuration for all buttons
 * @type {?}
 */
export var MAT_BUTTON_HOST = {
    '[attr.disabled]': 'disabled || null',
    '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
    // MDC automatically applies the primary theme color to the button, but we want to support
    // an unthemed version. If color is undefined, apply a CSS class that makes it easy to
    // select and style this "theme".
    '[class.mat-unthemed]': '!color',
};
/**
 * List of classes to add to buttons instances based on host attribute selector.
 * @type {?}
 */
var HOST_SELECTOR_MDC_CLASS_PAIR = [
    {
        selector: 'mat-button',
        mdcClasses: ['mdc-button', 'mat-mdc-button'],
    },
    {
        selector: 'mat-flat-button',
        mdcClasses: ['mdc-button', 'mdc-button--unelevated', 'mat-mdc-unelevated-button'],
    },
    {
        selector: 'mat-raised-button',
        mdcClasses: ['mdc-button', 'mdc-button--raised', 'mat-mdc-raised-button'],
    },
    {
        selector: 'mat-stroked-button',
        mdcClasses: ['mdc-button', 'mdc-button--outlined', 'mat-mdc-outlined-button'],
    },
    {
        selector: 'mat-fab',
        mdcClasses: ['mdc-fab', 'mat-mdc-fab'],
    },
    {
        selector: 'mat-mini-fab',
        mdcClasses: ['mdc-fab', 'mdc-fab--mini', 'mat-mdc-mini-fab'],
    },
    {
        selector: 'mat-icon-button',
        mdcClasses: ['mdc-icon-button', 'mat-mdc-icon-button'],
    }
];
// Boilerplate for applying mixins to MatButton.
/**
 * \@docs-private
 */
var 
// Boilerplate for applying mixins to MatButton.
/**
 * \@docs-private
 */
MatButtonMixinCore = /** @class */ (function () {
    function MatButtonMixinCore(_elementRef) {
        this._elementRef = _elementRef;
    }
    return MatButtonMixinCore;
}());
// Boilerplate for applying mixins to MatButton.
/**
 * \@docs-private
 */
export { MatButtonMixinCore };
if (false) {
    /** @type {?} */
    MatButtonMixinCore.prototype._elementRef;
}
/** @type {?} */
export var _MatButtonBaseMixin = mixinColor(mixinDisabled(mixinDisableRipple(MatButtonMixinCore)));
/**
 * Base class for all buttons.
 */
var MatButtonBase = /** @class */ (function (_super) {
    tslib_1.__extends(MatButtonBase, _super);
    function MatButtonBase(elementRef, _platform, _ngZone, _animationMode) {
        var _a;
        var _this = _super.call(this, elementRef) || this;
        _this._platform = _platform;
        _this._ngZone = _ngZone;
        _this._animationMode = _animationMode;
        /**
         * The ripple animation configuration to use for the buttons.
         */
        _this._rippleAnimation = {
            enterDuration: numbers.DEACTIVATION_TIMEOUT_MS,
            exitDuration: numbers.FG_DEACTIVATION_MS
        };
        /**
         * Whether the ripple is centered on the button.
         */
        _this._isRippleCentered = false;
        // For each of the variant selectors that is present in the button's host
        // attributes, add the correct corresponding MDC classes.
        for (var _i = 0, HOST_SELECTOR_MDC_CLASS_PAIR_1 = HOST_SELECTOR_MDC_CLASS_PAIR; _i < HOST_SELECTOR_MDC_CLASS_PAIR_1.length; _i++) {
            var pair = HOST_SELECTOR_MDC_CLASS_PAIR_1[_i];
            if (_this._hasHostAttributes(pair.selector)) {
                (_a = ((/** @type {?} */ (elementRef.nativeElement))).classList).add.apply(_a, pair.mdcClasses);
            }
        }
        return _this;
    }
    /** Focuses the button. */
    /**
     * Focuses the button.
     * @return {?}
     */
    MatButtonBase.prototype.focus = /**
     * Focuses the button.
     * @return {?}
     */
    function () {
        this._elementRef.nativeElement.focus();
    };
    /** Gets whether the button has one of the given attributes. */
    /**
     * Gets whether the button has one of the given attributes.
     * @private
     * @param {...?} attributes
     * @return {?}
     */
    MatButtonBase.prototype._hasHostAttributes = /**
     * Gets whether the button has one of the given attributes.
     * @private
     * @param {...?} attributes
     * @return {?}
     */
    function () {
        var _this = this;
        var attributes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            attributes[_i] = arguments[_i];
        }
        return attributes.some((/**
         * @param {?} attribute
         * @return {?}
         */
        function (attribute) { return _this._elementRef.nativeElement.hasAttribute(attribute); }));
    };
    /**
     * @return {?}
     */
    MatButtonBase.prototype._isRippleDisabled = /**
     * @return {?}
     */
    function () {
        return this.disableRipple || this.disabled;
    };
    MatButtonBase.propDecorators = {
        ripple: [{ type: ViewChild, args: [MatRipple, { static: false },] }]
    };
    return MatButtonBase;
}(_MatButtonBaseMixin));
export { MatButtonBase };
if (false) {
    /**
     * The ripple animation configuration to use for the buttons.
     * @type {?}
     */
    MatButtonBase.prototype._rippleAnimation;
    /**
     * Whether the ripple is centered on the button.
     * @type {?}
     */
    MatButtonBase.prototype._isRippleCentered;
    /**
     * Reference to the MatRipple instance of the button.
     * @type {?}
     */
    MatButtonBase.prototype.ripple;
    /** @type {?} */
    MatButtonBase.prototype._platform;
    /** @type {?} */
    MatButtonBase.prototype._ngZone;
    /** @type {?} */
    MatButtonBase.prototype._animationMode;
}
/**
 * Shared inputs by buttons using the `<a>` tag
 * @type {?}
 */
export var MAT_ANCHOR_INPUTS = ['disabled', 'disableRipple', 'color', 'tabIndex'];
/**
 * Shared host configuration for buttons using the `<a>` tag.
 * @type {?}
 */
export var MAT_ANCHOR_HOST = {
    '[attr.disabled]': 'disabled || null',
    '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
    // Note that we ignore the user-specified tabindex when it's disabled for
    // consistency with the `mat-button` applied on native buttons where even
    // though they have an index, they're not tabbable.
    '[attr.tabindex]': 'disabled ? -1 : (tabIndex || 0)',
    '[attr.aria-disabled]': 'disabled.toString()',
    '(click)': '_haltDisabledEvents($event)',
    // MDC automatically applies the primary theme color to the button, but we want to support
    // an unthemed version. If color is undefined, apply a CSS class that makes it easy to
    // select and style this "theme".
    '[class.mat-unthemed]': '!color',
};
/**
 * Anchor button base.
 */
var /**
 * Anchor button base.
 */
MatAnchorBase = /** @class */ (function (_super) {
    tslib_1.__extends(MatAnchorBase, _super);
    function MatAnchorBase(elementRef, platform, ngZone, animationMode) {
        return _super.call(this, elementRef, platform, ngZone, animationMode) || this;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    MatAnchorBase.prototype._haltDisabledEvents = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // A disabled button shouldn't apply any actions
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    };
    return MatAnchorBase;
}(MatButtonBase));
/**
 * Anchor button base.
 */
export { MatAnchorBase };
if (false) {
    /** @type {?} */
    MatAnchorBase.prototype.tabIndex;
}
//# sourceMappingURL=button-base.js.map