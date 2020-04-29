/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ViewChild, ChangeDetectionStrategy, Component, ElementRef, Inject, NgZone, Optional, ViewEncapsulation, NgModule } from '@angular/core';
import { MatRipple, mixinColor, mixinDisabled, mixinDisableRipple, MatCommonModule, MatRippleModule } from '@angular/material/core';
import { numbers } from '@material/ripple';
import { Platform } from '@angular/cdk/platform';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Inputs common to all buttons.
 * @type {?}
 */
const MAT_BUTTON_INPUTS = ['disabled', 'disableRipple', 'color'];
/**
 * Shared host configuration for all buttons
 * @type {?}
 */
const MAT_BUTTON_HOST = {
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
class MatButtonMixinCore {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
/** @type {?} */
const _MatButtonBaseMixin = mixinColor(mixinDisabled(mixinDisableRipple(MatButtonMixinCore)));
/**
 * Base class for all buttons.
 */
class MatButtonBase extends _MatButtonBaseMixin {
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
/**
 * Shared inputs by buttons using the `<a>` tag
 * @type {?}
 */
const MAT_ANCHOR_INPUTS = ['disabled', 'disableRipple', 'color', 'tabIndex'];
/**
 * Shared host configuration for buttons using the `<a>` tag.
 * @type {?}
 */
const MAT_ANCHOR_HOST = {
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
class MatAnchorBase extends MatButtonBase {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Material Design button component. Users interact with a button to perform an action.
 * See https://material.io/components/buttons
 *
 * The `MatButton` class applies to native button elements and captures the appearances for
 * "text button", "outlined button", and "contained button" per the Material Design
 * specification. `MatButton` additionally captures an additional "flat" appearance, which matches
 * "contained" but without elevation.
 */
class MatButton extends MatButtonBase {
    /**
     * @param {?} elementRef
     * @param {?} platform
     * @param {?} ngZone
     * @param {?=} animationMode
     */
    constructor(elementRef, platform, ngZone, animationMode) {
        super(elementRef, platform, ngZone, animationMode);
    }
}
MatButton.decorators = [
    { type: Component, args: [{selector: `
    button[mat-button], button[mat-raised-button], button[mat-flat-button],
    button[mat-stroked-button]
  `,
                template: "<span class=\"mat-mdc-button-state\"></span><ng-content select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd])\"></ng-content><span class=\"mdc-button__label\"><ng-content></ng-content></span><ng-content select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd]\"></ng-content><span matRipple class=\"mat-mdc-button-ripple\" [matRippleAnimation]=\"_rippleAnimation\" [matRippleDisabled]=\"_isRippleDisabled()\" [matRippleCentered]=\"_isRippleCentered\" [matRippleTrigger]=\"_elementRef.nativeElement\"></span>",
                styles: [".mdc-button{padding:0 8px 0 8px;display:inline-flex;position:relative;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:0;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle;border-radius:4px}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:0}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button .mdc-button__ripple{border-radius:4px}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;width:18px;height:18px;font-size:18px;vertical-align:top}.mdc-button .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button .mdc-button__icon{margin-left:8px;margin-right:0}.mdc-button .mdc-button__touch{position:absolute;top:50%;right:0;left:0;height:48px;transform:translateY(-50%)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}.mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button__label+.mdc-button__icon{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--outlined .mdc-button__icon,.mdc-button--raised .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon{margin-left:-4px;margin-right:8px}.mdc-button--outlined .mdc-button__icon[dir=rtl],.mdc-button--raised .mdc-button__icon[dir=rtl],.mdc-button--unelevated .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__icon,[dir=rtl] .mdc-button--raised .mdc-button__icon,[dir=rtl] .mdc-button--unelevated .mdc-button__icon{margin-left:8px;margin-right:-4px}.mdc-button--outlined .mdc-button__label+.mdc-button__icon,.mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:-4px}.mdc-button--outlined .mdc-button__label+.mdc-button__icon[dir=rtl],.mdc-button--raised .mdc-button__label+.mdc-button__icon[dir=rtl],.mdc-button--unelevated .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__label+.mdc-button__icon,[dir=rtl] .mdc-button--raised .mdc-button__label+.mdc-button__icon,[dir=rtl] .mdc-button--unelevated .mdc-button__label+.mdc-button__icon{margin-left:-4px;margin-right:8px}.mdc-button--raised,.mdc-button--unelevated{padding:0 16px 0 16px}.mdc-button--raised{transition:box-shadow 280ms cubic-bezier(.4,0,.2,1)}.mdc-button--outlined{border-style:solid;padding:0 15px 0 15px;border-width:1px}.mdc-button--outlined .mdc-button__ripple{top:-1px;left:-1px;border:1px solid transparent}.mdc-button--touch{margin-top:6px;margin-bottom:6px}.mat-mdc-button,.mat-mdc-outlined-button,.mat-mdc-raised-button,.mat-mdc-unelevated-button{height:36px}@media (-ms-high-contrast:active){.mat-mdc-button:not(.mdc-button--outlined),.mat-mdc-outlined-button:not(.mdc-button--outlined),.mat-mdc-raised-button:not(.mdc-button--outlined),.mat-mdc-unelevated-button:not(.mdc-button--outlined){outline:solid 1px}}.mat-mdc-button .mat-mdc-button-state::after,.mat-mdc-button .mat-mdc-button-state::before,.mat-mdc-outlined-button .mat-mdc-button-state::after,.mat-mdc-outlined-button .mat-mdc-button-state::before,.mat-mdc-raised-button .mat-mdc-button-state::after,.mat-mdc-raised-button .mat-mdc-button-state::before,.mat-mdc-unelevated-button .mat-mdc-button-state::after,.mat-mdc-unelevated-button .mat-mdc-button-state::before{content:'';pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;border-radius:inherit}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-button .mat-mdc-button-state,.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mat-mdc-button-state,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mat-mdc-button-state,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mat-mdc-button-state{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-button[disabled],.mat-mdc-outlined-button[disabled],.mat-mdc-raised-button[disabled],.mat-mdc-unelevated-button[disabled]{cursor:default;pointer-events:none}.mat-mdc-outlined-button .mat-mdc-button-ripple{top:-1px;left:-1px;bottom:-1px;right:-1px}"],
                inputs: MAT_BUTTON_INPUTS,
                host: MAT_BUTTON_HOST,
                exportAs: 'matButton',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/** @nocollapse */
MatButton.ctorParameters = () => [
    { type: ElementRef },
    { type: Platform },
    { type: NgZone },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];
/**
 * Material Design button component for anchor elements. Anchor elements are used to provide
 * links for the user to navigate across different routes or pages.
 * See https://material.io/components/buttons
 *
 * The `MatAnchor` class applies to native anchor elements and captures the appearances for
 * "text button", "outlined button", and "contained button" per the Material Design
 * specification. `MatAnchor` additionally captures an additional "flat" appearance, which matches
 * "contained" but without elevation.
 */
class MatAnchor extends MatAnchorBase {
    /**
     * @param {?} elementRef
     * @param {?} platform
     * @param {?} ngZone
     * @param {?=} animationMode
     */
    constructor(elementRef, platform, ngZone, animationMode) {
        super(elementRef, platform, ngZone, animationMode);
    }
}
MatAnchor.decorators = [
    { type: Component, args: [{selector: `a[mat-button], a[mat-raised-button], a[mat-flat-button], a[mat-stroked-button]`,
                exportAs: 'matButton, matAnchor',
                host: MAT_ANCHOR_HOST,
                inputs: MAT_ANCHOR_INPUTS,
                template: "<span class=\"mat-mdc-button-state\"></span><ng-content select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd])\"></ng-content><span class=\"mdc-button__label\"><ng-content></ng-content></span><ng-content select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd]\"></ng-content><span matRipple class=\"mat-mdc-button-ripple\" [matRippleAnimation]=\"_rippleAnimation\" [matRippleDisabled]=\"_isRippleDisabled()\" [matRippleCentered]=\"_isRippleCentered\" [matRippleTrigger]=\"_elementRef.nativeElement\"></span>",
                styles: [".mdc-button{padding:0 8px 0 8px;display:inline-flex;position:relative;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:0;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle;border-radius:4px}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:0}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button .mdc-button__ripple{border-radius:4px}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;width:18px;height:18px;font-size:18px;vertical-align:top}.mdc-button .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button .mdc-button__icon{margin-left:8px;margin-right:0}.mdc-button .mdc-button__touch{position:absolute;top:50%;right:0;left:0;height:48px;transform:translateY(-50%)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}.mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button__label+.mdc-button__icon{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--outlined .mdc-button__icon,.mdc-button--raised .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon{margin-left:-4px;margin-right:8px}.mdc-button--outlined .mdc-button__icon[dir=rtl],.mdc-button--raised .mdc-button__icon[dir=rtl],.mdc-button--unelevated .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__icon,[dir=rtl] .mdc-button--raised .mdc-button__icon,[dir=rtl] .mdc-button--unelevated .mdc-button__icon{margin-left:8px;margin-right:-4px}.mdc-button--outlined .mdc-button__label+.mdc-button__icon,.mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:-4px}.mdc-button--outlined .mdc-button__label+.mdc-button__icon[dir=rtl],.mdc-button--raised .mdc-button__label+.mdc-button__icon[dir=rtl],.mdc-button--unelevated .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__label+.mdc-button__icon,[dir=rtl] .mdc-button--raised .mdc-button__label+.mdc-button__icon,[dir=rtl] .mdc-button--unelevated .mdc-button__label+.mdc-button__icon{margin-left:-4px;margin-right:8px}.mdc-button--raised,.mdc-button--unelevated{padding:0 16px 0 16px}.mdc-button--raised{transition:box-shadow 280ms cubic-bezier(.4,0,.2,1)}.mdc-button--outlined{border-style:solid;padding:0 15px 0 15px;border-width:1px}.mdc-button--outlined .mdc-button__ripple{top:-1px;left:-1px;border:1px solid transparent}.mdc-button--touch{margin-top:6px;margin-bottom:6px}.mat-mdc-button,.mat-mdc-outlined-button,.mat-mdc-raised-button,.mat-mdc-unelevated-button{height:36px}@media (-ms-high-contrast:active){.mat-mdc-button:not(.mdc-button--outlined),.mat-mdc-outlined-button:not(.mdc-button--outlined),.mat-mdc-raised-button:not(.mdc-button--outlined),.mat-mdc-unelevated-button:not(.mdc-button--outlined){outline:solid 1px}}.mat-mdc-button .mat-mdc-button-state::after,.mat-mdc-button .mat-mdc-button-state::before,.mat-mdc-outlined-button .mat-mdc-button-state::after,.mat-mdc-outlined-button .mat-mdc-button-state::before,.mat-mdc-raised-button .mat-mdc-button-state::after,.mat-mdc-raised-button .mat-mdc-button-state::before,.mat-mdc-unelevated-button .mat-mdc-button-state::after,.mat-mdc-unelevated-button .mat-mdc-button-state::before{content:'';pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;border-radius:inherit}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-button .mat-mdc-button-state,.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mat-mdc-button-state,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mat-mdc-button-state,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mat-mdc-button-state{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-button[disabled],.mat-mdc-outlined-button[disabled],.mat-mdc-raised-button[disabled],.mat-mdc-unelevated-button[disabled]{cursor:default;pointer-events:none}.mat-mdc-outlined-button .mat-mdc-button-ripple{top:-1px;left:-1px;bottom:-1px;right:-1px}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/** @nocollapse */
MatAnchor.ctorParameters = () => [
    { type: ElementRef },
    { type: Platform },
    { type: NgZone },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Material Design floating action button (FAB) component. These buttons represent the primary
 * or most common action for users to interact with.
 * See https://material.io/components/buttons-floating-action-button/
 *
 * The `MatFabButton` class has two appearances: normal and mini.
 */
class MatFabButton extends MatButtonBase {
    /**
     * @param {?} elementRef
     * @param {?} platform
     * @param {?} ngZone
     * @param {?=} animationMode
     */
    constructor(elementRef, platform, ngZone, animationMode) {
        super(elementRef, platform, ngZone, animationMode);
        // The FAB by default has its color set to accent.
        this.color = (/** @type {?} */ ('accent'));
    }
}
MatFabButton.decorators = [
    { type: Component, args: [{selector: `button[mat-fab], button[mat-mini-fab]`,
                template: "<span class=\"mat-mdc-button-state\"></span><ng-content select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd])\"></ng-content><span class=\"mdc-button__label\"><ng-content></ng-content></span><ng-content select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd]\"></ng-content><span matRipple class=\"mat-mdc-button-ripple\" [matRippleAnimation]=\"_rippleAnimation\" [matRippleDisabled]=\"_isRippleDisabled()\" [matRippleCentered]=\"_isRippleCentered\" [matRippleTrigger]=\"_elementRef.nativeElement\"></span>",
                styles: [".mdc-fab{display:inline-flex;position:relative;align-items:center;justify-content:center;box-sizing:border-box;width:56px;height:56px;padding:0;border:none;fill:currentColor;text-decoration:none;cursor:pointer;user-select:none;-moz-appearance:none;-webkit-appearance:none;transition:box-shadow 280ms cubic-bezier(.4,0,.2,1),opacity 15ms linear 30ms,transform 270ms 0s cubic-bezier(0,0,.2,1)}.mdc-fab:not(.mdc-fab--extended){border-radius:50%}.mdc-fab:not(.mdc-fab--extended) .mdc-fab__ripple{border-radius:50%}.mdc-fab::-moz-focus-inner{padding:0;border:0}.mdc-fab:active,.mdc-fab:focus{outline:0}.mdc-fab:hover{cursor:pointer}.mdc-fab>svg{width:100%}.mdc-fab .mat-icon,.mdc-fab .mdc-fab__icon{width:24px;height:24px;font-size:24px}.mdc-fab--mini{width:40px;height:40px}.mdc-fab--extended{border-radius:24px;padding:0 20px;width:auto;max-width:100%;height:48px}.mdc-fab--extended .mdc-fab__ripple{border-radius:24px}.mdc-fab--extended .mat-icon,.mdc-fab--extended .mdc-fab__icon{margin-left:-8px;margin-right:12px}.mdc-fab--extended .mat-icon[dir=rtl],.mdc-fab--extended .mdc-fab__icon[dir=rtl],[dir=rtl] .mdc-fab--extended .mat-icon,[dir=rtl] .mdc-fab--extended .mdc-fab__icon{margin-left:12px;margin-right:-8px}.mdc-fab--extended .mdc-fab__label+.mat-icon,.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon{margin-left:12px;margin-right:-8px}.mdc-fab--extended .mdc-fab__label+.mat-icon[dir=rtl],.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon[dir=rtl],[dir=rtl] .mdc-fab--extended .mdc-fab__label+.mat-icon,[dir=rtl] .mdc-fab--extended .mdc-fab__label+.mdc-fab__icon{margin-left:-8px;margin-right:12px}.mdc-fab__label{justify-content:flex-start;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mat-icon,.mdc-fab__icon{transition:transform 180ms 90ms cubic-bezier(0,0,.2,1);fill:currentColor;will-change:transform}.mdc-fab .mat-icon,.mdc-fab .mdc-fab__icon{display:inline-flex;align-items:center;justify-content:center}.mdc-fab--exited{transform:scale(0);opacity:0;transition:opacity 15ms linear 150ms,transform 180ms 0s cubic-bezier(.4,0,1,1)}.mdc-fab--exited .mat-icon,.mdc-fab--exited .mdc-fab__icon{transform:scale(0);transition:transform 135ms 0s cubic-bezier(.4,0,1,1)}.mat-mdc-fab .mat-mdc-button-state::after,.mat-mdc-fab .mat-mdc-button-state::before,.mat-mdc-mini-fab .mat-mdc-button-state::after,.mat-mdc-mini-fab .mat-mdc-button-state::before{content:'';pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;border-radius:inherit}.mat-mdc-fab .mat-mdc-button-ripple,.mat-mdc-fab .mat-mdc-button-state,.mat-mdc-mini-fab .mat-mdc-button-ripple,.mat-mdc-mini-fab .mat-mdc-button-state{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-fab[disabled],.mat-mdc-mini-fab[disabled]{cursor:default;pointer-events:none}"],
                inputs: MAT_BUTTON_INPUTS,
                host: MAT_BUTTON_HOST,
                exportAs: 'matButton',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/** @nocollapse */
MatFabButton.ctorParameters = () => [
    { type: ElementRef },
    { type: Platform },
    { type: NgZone },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];
/**
 * Material Design floating action button (FAB) component for anchor elements. Anchor elements
 * are used to provide links for the user to navigate across different routes or pages.
 * See https://material.io/components/buttons-floating-action-button/
 *
 * The `MatFabAnchor` class has two appearances: normal and mini.
 */
class MatFabAnchor extends MatAnchor {
    /**
     * @param {?} elementRef
     * @param {?} platform
     * @param {?} ngZone
     * @param {?=} animationMode
     */
    constructor(elementRef, platform, ngZone, animationMode) {
        super(elementRef, platform, ngZone, animationMode);
        // The FAB by default has its color set to accent.
        this.color = (/** @type {?} */ ('accent'));
    }
}
MatFabAnchor.decorators = [
    { type: Component, args: [{selector: `a[mat-fab], a[mat-mini-fab]`,
                template: "<span class=\"mat-mdc-button-state\"></span><ng-content select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd])\"></ng-content><span class=\"mdc-button__label\"><ng-content></ng-content></span><ng-content select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd]\"></ng-content><span matRipple class=\"mat-mdc-button-ripple\" [matRippleAnimation]=\"_rippleAnimation\" [matRippleDisabled]=\"_isRippleDisabled()\" [matRippleCentered]=\"_isRippleCentered\" [matRippleTrigger]=\"_elementRef.nativeElement\"></span>",
                styles: [".mdc-fab{display:inline-flex;position:relative;align-items:center;justify-content:center;box-sizing:border-box;width:56px;height:56px;padding:0;border:none;fill:currentColor;text-decoration:none;cursor:pointer;user-select:none;-moz-appearance:none;-webkit-appearance:none;transition:box-shadow 280ms cubic-bezier(.4,0,.2,1),opacity 15ms linear 30ms,transform 270ms 0s cubic-bezier(0,0,.2,1)}.mdc-fab:not(.mdc-fab--extended){border-radius:50%}.mdc-fab:not(.mdc-fab--extended) .mdc-fab__ripple{border-radius:50%}.mdc-fab::-moz-focus-inner{padding:0;border:0}.mdc-fab:active,.mdc-fab:focus{outline:0}.mdc-fab:hover{cursor:pointer}.mdc-fab>svg{width:100%}.mdc-fab .mat-icon,.mdc-fab .mdc-fab__icon{width:24px;height:24px;font-size:24px}.mdc-fab--mini{width:40px;height:40px}.mdc-fab--extended{border-radius:24px;padding:0 20px;width:auto;max-width:100%;height:48px}.mdc-fab--extended .mdc-fab__ripple{border-radius:24px}.mdc-fab--extended .mat-icon,.mdc-fab--extended .mdc-fab__icon{margin-left:-8px;margin-right:12px}.mdc-fab--extended .mat-icon[dir=rtl],.mdc-fab--extended .mdc-fab__icon[dir=rtl],[dir=rtl] .mdc-fab--extended .mat-icon,[dir=rtl] .mdc-fab--extended .mdc-fab__icon{margin-left:12px;margin-right:-8px}.mdc-fab--extended .mdc-fab__label+.mat-icon,.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon{margin-left:12px;margin-right:-8px}.mdc-fab--extended .mdc-fab__label+.mat-icon[dir=rtl],.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon[dir=rtl],[dir=rtl] .mdc-fab--extended .mdc-fab__label+.mat-icon,[dir=rtl] .mdc-fab--extended .mdc-fab__label+.mdc-fab__icon{margin-left:-8px;margin-right:12px}.mdc-fab__label{justify-content:flex-start;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mat-icon,.mdc-fab__icon{transition:transform 180ms 90ms cubic-bezier(0,0,.2,1);fill:currentColor;will-change:transform}.mdc-fab .mat-icon,.mdc-fab .mdc-fab__icon{display:inline-flex;align-items:center;justify-content:center}.mdc-fab--exited{transform:scale(0);opacity:0;transition:opacity 15ms linear 150ms,transform 180ms 0s cubic-bezier(.4,0,1,1)}.mdc-fab--exited .mat-icon,.mdc-fab--exited .mdc-fab__icon{transform:scale(0);transition:transform 135ms 0s cubic-bezier(.4,0,1,1)}.mat-mdc-fab .mat-mdc-button-state::after,.mat-mdc-fab .mat-mdc-button-state::before,.mat-mdc-mini-fab .mat-mdc-button-state::after,.mat-mdc-mini-fab .mat-mdc-button-state::before{content:'';pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;border-radius:inherit}.mat-mdc-fab .mat-mdc-button-ripple,.mat-mdc-fab .mat-mdc-button-state,.mat-mdc-mini-fab .mat-mdc-button-ripple,.mat-mdc-mini-fab .mat-mdc-button-state{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-fab[disabled],.mat-mdc-mini-fab[disabled]{cursor:default;pointer-events:none}"],
                inputs: MAT_ANCHOR_INPUTS,
                host: MAT_ANCHOR_HOST,
                exportAs: 'matButton, matAnchor',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/** @nocollapse */
MatFabAnchor.ctorParameters = () => [
    { type: ElementRef },
    { type: Platform },
    { type: NgZone },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Material Design icon button component. This type of button displays a single interactive icon for
 * users to perform an action.
 * See https://material.io/develop/web/components/buttons/icon-buttons/
 */
class MatIconButton extends MatButtonBase {
    /**
     * @param {?} elementRef
     * @param {?} platform
     * @param {?} ngZone
     * @param {?=} animationMode
     */
    constructor(elementRef, platform, ngZone, animationMode) {
        super(elementRef, platform, ngZone, animationMode);
        // Set the ripple to be centered for icon buttons
        this._isRippleCentered = true;
    }
}
MatIconButton.decorators = [
    { type: Component, args: [{selector: `button[mat-icon-button]`,
                template: "<span class=\"mat-mdc-button-state\"></span><ng-content select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd])\"></ng-content><span class=\"mdc-button__label\"><ng-content></ng-content></span><ng-content select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd]\"></ng-content><span matRipple class=\"mat-mdc-button-ripple\" [matRippleAnimation]=\"_rippleAnimation\" [matRippleDisabled]=\"_isRippleDisabled()\" [matRippleCentered]=\"_isRippleCentered\" [matRippleTrigger]=\"_elementRef.nativeElement\"></span>",
                styles: [".mdc-icon-button{width:48px;height:48px;padding:12px;font-size:24px;display:inline-block;position:relative;box-sizing:border-box;border:none;outline:0;background-color:transparent;fill:currentColor;color:inherit;text-decoration:none;cursor:pointer;user-select:none}.mdc-icon-button img,.mdc-icon-button svg{width:24px;height:24px}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mat-mdc-icon-button{border-radius:50%}.mat-mdc-icon-button .mat-mdc-button-state::after,.mat-mdc-icon-button .mat-mdc-button-state::before{content:'';pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;border-radius:inherit;border-radius:50%}.mat-mdc-icon-button .mat-mdc-button-ripple,.mat-mdc-icon-button .mat-mdc-button-state{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-icon-button[disabled]{cursor:default;pointer-events:none}"],
                inputs: MAT_BUTTON_INPUTS,
                host: MAT_BUTTON_HOST,
                exportAs: 'matButton',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/** @nocollapse */
MatIconButton.ctorParameters = () => [
    { type: ElementRef },
    { type: Platform },
    { type: NgZone },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];
/**
 * Material Design icon button component for anchor elements. This button displays a single
 * interaction icon that allows users to navigate across different routes or pages.
 * See https://material.io/develop/web/components/buttons/icon-buttons/
 */
class MatIconAnchor extends MatAnchorBase {
    /**
     * @param {?} elementRef
     * @param {?} platform
     * @param {?} ngZone
     * @param {?=} animationMode
     */
    constructor(elementRef, platform, ngZone, animationMode) {
        super(elementRef, platform, ngZone, animationMode);
        // Set the ripple to be centered for icon buttons
        this._isRippleCentered = true;
    }
}
MatIconAnchor.decorators = [
    { type: Component, args: [{selector: `a[mat-icon-button]`,
                template: "<span class=\"mat-mdc-button-state\"></span><ng-content select=\".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd])\"></ng-content><span class=\"mdc-button__label\"><ng-content></ng-content></span><ng-content select=\".material-icons[iconPositionEnd], mat-icon[iconPositionEnd]\"></ng-content><span matRipple class=\"mat-mdc-button-ripple\" [matRippleAnimation]=\"_rippleAnimation\" [matRippleDisabled]=\"_isRippleDisabled()\" [matRippleCentered]=\"_isRippleCentered\" [matRippleTrigger]=\"_elementRef.nativeElement\"></span>",
                styles: [".mdc-icon-button{width:48px;height:48px;padding:12px;font-size:24px;display:inline-block;position:relative;box-sizing:border-box;border:none;outline:0;background-color:transparent;fill:currentColor;color:inherit;text-decoration:none;cursor:pointer;user-select:none}.mdc-icon-button img,.mdc-icon-button svg{width:24px;height:24px}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mat-mdc-icon-button{border-radius:50%}.mat-mdc-icon-button .mat-mdc-button-state::after,.mat-mdc-icon-button .mat-mdc-button-state::before{content:'';pointer-events:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;border-radius:inherit;border-radius:50%}.mat-mdc-icon-button .mat-mdc-button-ripple,.mat-mdc-icon-button .mat-mdc-button-state{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-icon-button[disabled]{cursor:default;pointer-events:none}"],
                inputs: MAT_ANCHOR_INPUTS,
                host: MAT_ANCHOR_HOST,
                exportAs: 'matButton, matAnchor',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/** @nocollapse */
MatIconAnchor.ctorParameters = () => [
    { type: ElementRef },
    { type: Platform },
    { type: NgZone },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MatButtonModule {
}
MatButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [MatCommonModule, CommonModule, MatRippleModule],
                exports: [
                    MatAnchor,
                    MatButton,
                    MatIconAnchor,
                    MatIconButton,
                    MatFabAnchor,
                    MatFabButton,
                    MatCommonModule,
                ],
                declarations: [
                    MatAnchor,
                    MatButton,
                    MatIconAnchor,
                    MatIconButton,
                    MatFabAnchor,
                    MatFabButton,
                ],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { MatButton, MatAnchor, MatFabButton, MatFabAnchor, MatIconButton, MatIconAnchor, MatButtonModule, MAT_ANCHOR_HOST as ɵg, MAT_ANCHOR_INPUTS as ɵf, MAT_BUTTON_HOST as ɵb, MAT_BUTTON_INPUTS as ɵa, MatAnchorBase as ɵh, MatButtonBase as ɵe, MatButtonMixinCore as ɵc, _MatButtonBaseMixin as ɵd };
//# sourceMappingURL=mdc-button.js.map
