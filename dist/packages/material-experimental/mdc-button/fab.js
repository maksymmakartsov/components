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
import { MatAnchor } from './button';
import { MAT_ANCHOR_HOST, MAT_ANCHOR_INPUTS, MAT_BUTTON_HOST, MAT_BUTTON_INPUTS, MatButtonBase } from './button-base';
/**
 * Material Design floating action button (FAB) component. These buttons represent the primary
 * or most common action for users to interact with.
 * See https://material.io/components/buttons-floating-action-button/
 *
 * The `MatFabButton` class has two appearances: normal and mini.
 */
export class MatFabButton extends MatButtonBase {
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
if (false) {
    /** @type {?} */
    MatFabButton.prototype.color;
}
/**
 * Material Design floating action button (FAB) component for anchor elements. Anchor elements
 * are used to provide links for the user to navigate across different routes or pages.
 * See https://material.io/components/buttons-floating-action-button/
 *
 * The `MatFabAnchor` class has two appearances: normal and mini.
 */
export class MatFabAnchor extends MatAnchor {
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
if (false) {
    /** @type {?} */
    MatFabAnchor.prototype.color;
}
//# sourceMappingURL=fab.js.map