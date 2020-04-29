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
 * Material Design icon button component. This type of button displays a single interactive icon for
 * users to perform an action.
 * See https://material.io/develop/web/components/buttons/icon-buttons/
 */
export class MatIconButton extends MatButtonBase {
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
if (false) {
    /** @type {?} */
    MatIconButton.prototype._isRippleCentered;
}
/**
 * Material Design icon button component for anchor elements. This button displays a single
 * interaction icon that allows users to navigate across different routes or pages.
 * See https://material.io/develop/web/components/buttons/icon-buttons/
 */
export class MatIconAnchor extends MatAnchorBase {
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
if (false) {
    /** @type {?} */
    MatIconAnchor.prototype._isRippleCentered;
}
//# sourceMappingURL=icon-button.js.map