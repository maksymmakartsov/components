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
import { Directive, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatTabLabelWrapper as BaseMatTabLabelWrapper } from '@angular/material/tabs';
import { MatInkBarFoundation } from './ink-bar';
/**
 * Used in the `mat-tab-group` view to display tab labels.
 * \@docs-private
 */
var MatTabLabelWrapper = /** @class */ (function (_super) {
    tslib_1.__extends(MatTabLabelWrapper, _super);
    function MatTabLabelWrapper(elementRef, _document) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        _this._foundation = new MatInkBarFoundation(elementRef, _document);
        _this._foundation.init();
        return _this;
    }
    /**
     * @return {?}
     */
    MatTabLabelWrapper.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._foundation.destroy();
    };
    /** Sets focus on the wrapper element */
    /**
     * Sets focus on the wrapper element
     * @return {?}
     */
    MatTabLabelWrapper.prototype.focus = /**
     * Sets focus on the wrapper element
     * @return {?}
     */
    function () {
        this.elementRef.nativeElement.focus();
    };
    MatTabLabelWrapper.decorators = [
        { type: Directive, args: [{
                    selector: '[matTabLabelWrapper]',
                    inputs: ['disabled'],
                    host: {
                        '[class.mat-mdc-tab-disabled]': 'disabled',
                        '[attr.aria-disabled]': '!!disabled',
                    }
                },] },
    ];
    /** @nocollapse */
    MatTabLabelWrapper.ctorParameters = function () { return [
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    return MatTabLabelWrapper;
}(BaseMatTabLabelWrapper));
export { MatTabLabelWrapper };
if (false) {
    /** @type {?} */
    MatTabLabelWrapper.prototype._foundation;
    /** @type {?} */
    MatTabLabelWrapper.prototype.elementRef;
}
//# sourceMappingURL=tab-label-wrapper.js.map