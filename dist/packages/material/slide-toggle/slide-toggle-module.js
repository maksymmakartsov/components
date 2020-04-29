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
import { ObserversModule } from '@angular/cdk/observers';
import { NgModule } from '@angular/core';
import { GestureConfig, MatCommonModule, MatRippleModule } from '@angular/material/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { MatSlideToggle } from './slide-toggle';
import { MatSlideToggleRequiredValidator } from './slide-toggle-required-validator';
/**
 * This module is used by both original and MDC-based slide-toggle implementations.
 */
// tslint:disable-next-line:class-name
export class _MatSlideToggleRequiredValidatorModule {
}
_MatSlideToggleRequiredValidatorModule.decorators = [
    { type: NgModule, args: [{
                exports: [MatSlideToggleRequiredValidator],
                declarations: [MatSlideToggleRequiredValidator],
            },] },
];
export class MatSlideToggleModule {
}
MatSlideToggleModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    _MatSlideToggleRequiredValidatorModule,
                    MatRippleModule,
                    MatCommonModule,
                    ObserversModule,
                ],
                exports: [
                    _MatSlideToggleRequiredValidatorModule,
                    MatSlideToggle,
                    MatCommonModule
                ],
                declarations: [MatSlideToggle],
                providers: [
                    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }
                ],
            },] },
];
//# sourceMappingURL=slide-toggle-module.js.map