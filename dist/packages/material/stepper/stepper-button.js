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
import { CdkStepperNext, CdkStepperPrevious } from '@angular/cdk/stepper';
import { Directive } from '@angular/core';
/**
 * Button that moves to the next step in a stepper workflow.
 */
export class MatStepperNext extends CdkStepperNext {
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
/**
 * Button that moves to the previous step in a stepper workflow.
 */
export class MatStepperPrevious extends CdkStepperPrevious {
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
//# sourceMappingURL=stepper-button.js.map