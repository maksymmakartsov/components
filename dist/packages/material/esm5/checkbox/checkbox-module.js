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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatCheckbox } from './checkbox';
import { MatCheckboxRequiredValidator } from './checkbox-required-validator';
/**
 * This module is used by both original and MDC-based checkbox implementations.
 */
var _MatCheckboxRequiredValidatorModule = /** @class */ (function () {
    function _MatCheckboxRequiredValidatorModule() {
    }
    _MatCheckboxRequiredValidatorModule.decorators = [
        { type: NgModule, args: [{
                    exports: [MatCheckboxRequiredValidator],
                    declarations: [MatCheckboxRequiredValidator],
                },] },
    ];
    return _MatCheckboxRequiredValidatorModule;
}());
export { _MatCheckboxRequiredValidatorModule };
var MatCheckboxModule = /** @class */ (function () {
    function MatCheckboxModule() {
    }
    MatCheckboxModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule, MatRippleModule, MatCommonModule, ObserversModule,
                        _MatCheckboxRequiredValidatorModule
                    ],
                    exports: [MatCheckbox, MatCommonModule, _MatCheckboxRequiredValidatorModule],
                    declarations: [MatCheckbox],
                },] },
    ];
    return MatCheckboxModule;
}());
export { MatCheckboxModule };
//# sourceMappingURL=checkbox-module.js.map