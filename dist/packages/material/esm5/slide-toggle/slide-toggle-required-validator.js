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
import { Directive, forwardRef, } from '@angular/core';
import { CheckboxRequiredValidator, NG_VALIDATORS, } from '@angular/forms';
/** @type {?} */
export var MAT_SLIDE_TOGGLE_REQUIRED_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return MatSlideToggleRequiredValidator; })),
    multi: true
};
/**
 * Validator for Material slide-toggle components with the required attribute in a
 * template-driven form. The default validator for required form controls asserts
 * that the control value is not undefined but that is not appropriate for a slide-toggle
 * where the value is always defined.
 *
 * Required slide-toggle form controls are valid when checked.
 */
var MatSlideToggleRequiredValidator = /** @class */ (function (_super) {
    tslib_1.__extends(MatSlideToggleRequiredValidator, _super);
    function MatSlideToggleRequiredValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatSlideToggleRequiredValidator.decorators = [
        { type: Directive, args: [{
                    selector: "mat-slide-toggle[required][formControlName],\n             mat-slide-toggle[required][formControl], mat-slide-toggle[required][ngModel]",
                    providers: [MAT_SLIDE_TOGGLE_REQUIRED_VALIDATOR],
                },] },
    ];
    return MatSlideToggleRequiredValidator;
}(CheckboxRequiredValidator));
export { MatSlideToggleRequiredValidator };
//# sourceMappingURL=slide-toggle-required-validator.js.map