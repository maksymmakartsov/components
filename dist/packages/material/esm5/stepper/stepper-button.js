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
import { CdkStepperNext, CdkStepperPrevious } from '@angular/cdk/stepper';
import { Directive } from '@angular/core';
/**
 * Button that moves to the next step in a stepper workflow.
 */
var MatStepperNext = /** @class */ (function (_super) {
    tslib_1.__extends(MatStepperNext, _super);
    function MatStepperNext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatStepperNext.decorators = [
        { type: Directive, args: [{
                    selector: 'button[matStepperNext]',
                    host: {
                        '[type]': 'type',
                    },
                    inputs: ['type']
                },] },
    ];
    return MatStepperNext;
}(CdkStepperNext));
export { MatStepperNext };
/**
 * Button that moves to the previous step in a stepper workflow.
 */
var MatStepperPrevious = /** @class */ (function (_super) {
    tslib_1.__extends(MatStepperPrevious, _super);
    function MatStepperPrevious() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatStepperPrevious.decorators = [
        { type: Directive, args: [{
                    selector: 'button[matStepperPrevious]',
                    host: {
                        '[type]': 'type',
                    },
                    inputs: ['type']
                },] },
    ];
    return MatStepperPrevious;
}(CdkStepperPrevious));
export { MatStepperPrevious };
//# sourceMappingURL=stepper-button.js.map