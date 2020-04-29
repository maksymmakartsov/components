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
import { Directive } from '@angular/core';
import { CdkEditControl, CdkEditRevert, CdkEditClose, EditRef, } from '@angular/cdk-experimental/popover-edit';
/**
 * A component that attaches to a form within the edit.
 * It coordinates the form state with the table-wide edit system and handles
 * closing the edit when the form is submitted or the user clicks
 * out.
 * @template FormValue
 */
var MatEditLens = /** @class */ (function (_super) {
    tslib_1.__extends(MatEditLens, _super);
    function MatEditLens() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatEditLens.decorators = [
        { type: Directive, args: [{
                    selector: 'form[matEditLens]',
                    host: {
                        'class': 'mat-edit-lens',
                    },
                    inputs: [
                        'clickOutBehavior: matEditLensClickOutBehavior',
                        'preservedFormValue: matEditLensPreservedFormValue',
                        'ignoreSubmitUnlessValid: matEditLensIgnoreSubmitUnlessValid',
                    ],
                    outputs: ['preservedFormValueChange: matEditLensPreservedFormValueChange'],
                    providers: [EditRef],
                },] },
    ];
    return MatEditLens;
}(CdkEditControl));
export { MatEditLens };
/**
 * Reverts the form to its initial or previously submitted state on click.
 * @template FormValue
 */
var MatEditRevert = /** @class */ (function (_super) {
    tslib_1.__extends(MatEditRevert, _super);
    function MatEditRevert() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatEditRevert.decorators = [
        { type: Directive, args: [{
                    selector: 'button[matEditRevert]',
                    host: {
                        'type': 'button',
                    }
                },] },
    ];
    return MatEditRevert;
}(CdkEditRevert));
export { MatEditRevert };
/**
 * Closes the lens on click.
 * @template FormValue
 */
var MatEditClose = /** @class */ (function (_super) {
    tslib_1.__extends(MatEditClose, _super);
    function MatEditClose() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatEditClose.decorators = [
        { type: Directive, args: [{
                    selector: 'button[matEditClose]',
                    host: {
                        'type': 'button',
                    }
                },] },
    ];
    return MatEditClose;
}(CdkEditClose));
export { MatEditClose };
//# sourceMappingURL=lens-directives.js.map