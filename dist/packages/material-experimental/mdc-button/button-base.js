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
import { ViewChild } from '@angular/core';
import { MatRipple, mixinColor, mixinDisabled, mixinDisableRipple } from '@angular/material/core';
import { numbers } from '@material/ripple';
/**
 * Inputs common to all buttons.
 * @type {?}
 */
export const MAT_BUTTON_INPUTS = ['disabled', 'disableRipple', 'color'];
/**
 * Shared host configuration for all buttons
 * @type {?}
 */
export const MAT_BUTTON_HOST = {
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
const HOST_SELECTOR_MDC_CLASS_PAIR = [
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
export class MatButtonMixinCore {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
if (false) {
    /** @type {?} */
    MatButtonMixinCore.prototype._elementRef;
}
/** @type {?} */
export const _MatButtonBaseMixin = mixinColor(mixinDisabled(mixinDisableRipple(MatButtonMixinCore)));
/**
 * Base class for all buttons.
 */
export class MatButtonBase extends _MatButtonBaseMixin {
    /**
     * @param {?} elementRef
     * @param {?} _platform
     * @param {?} _ngZone
     * @param {?=} _animationMode
     */
    constructor(elementRef, _platform, _ngZone, _animationMode) {
        super(elementRef);
        this._platform = _platform;
        this._ngZone = _ngZone;
        this._animationMode = _animationMode;
        /**
         * The ripple animation configuration to use for the buttons.
         */
        this._rippleAnimation = {
            enterDuration: numbers.DEACTIVATION_TIMEOUT_MS,
            exitDuration: numbers.FG_DEACTIVATION_MS
        };
        /**
         * Whether the ripple is centered on the button.
         */
        this._isRippleCentered = false;
        // For each of the variant selectors that is present in the button's host
        // attributes, add the correct corresponding MDC classes.
        for (const pair of HOST_SELECTOR_MDC_CLASS_PAIR) {
            if (this._hasHostAttributes(pair.selector)) {
                ((/** @type {?} */ (elementRef.nativeElement))).classList.add(...pair.mdcClasses);
            }
        }
    }
    /**
     * Focuses the button.
     * @return {?}
     */
    focus() {
        this._elementRef.nativeElement.focus();
    }
    /**
     * Gets whether the button has one of the given attributes.
     * @private
     * @param {...?} attributes
     * @return {?}
     */
    _hasHostAttributes(...attributes) {
        return attributes.some((/**
         * @param {?} attribute
         * @return {?}
         */
        attribute => this._elementRef.nativeElement.hasAttribute(attribute)));
    }
    /**
     * @return {?}
     */
    _isRippleDisabled() {
        return this.disableRipple || this.disabled;
    }
}
MatButtonBase.propDecorators = {
    ripple: [{ type: ViewChild, args: [MatRipple, { static: false },] }]
};
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
export const MAT_ANCHOR_INPUTS = ['disabled', 'disableRipple', 'color', 'tabIndex'];
/**
 * Shared host configuration for buttons using the `<a>` tag.
 * @type {?}
 */
export const MAT_ANCHOR_HOST = {
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
export class MatAnchorBase extends MatButtonBase {
    /**
     * @param {?} elementRef
     * @param {?} platform
     * @param {?} ngZone
     * @param {?=} animationMode
     */
    constructor(elementRef, platform, ngZone, animationMode) {
        super(elementRef, platform, ngZone, animationMode);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _haltDisabledEvents(event) {
        // A disabled button shouldn't apply any actions
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }
}
if (false) {
    /** @type {?} */
    MatAnchorBase.prototype.tabIndex;
}
//# sourceMappingURL=button-base.js.map