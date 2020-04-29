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
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, NgZone, Optional, ViewEncapsulation } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MAT_ANCHOR_HOST, MAT_ANCHOR_INPUTS, MAT_BUTTON_HOST, MAT_BUTTON_INPUTS, MatAnchorBase, MatButtonBase } from './button-base';
/**
 * Material Design button component. Users interact with a button to perform an action.
 * See https://material.io/components/buttons
 *
 * The `MatButton` class applies to native button elements and captures the appearances for
 * "text button", "outlined button", and "contained button" per the Material Design
 * specification. `MatButton` additionally captures an additional "flat" appearance, which matches
 * "contained" but without elevation.
 */
export class MatButton extends MatButtonBase {
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
export class MatAnchor extends MatAnchorBase {
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
//# sourceMappingURL=button.js.map