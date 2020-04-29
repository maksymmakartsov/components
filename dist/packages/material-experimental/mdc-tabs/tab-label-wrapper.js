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
import { Directive, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatTabLabelWrapper as BaseMatTabLabelWrapper } from '@angular/material/tabs';
import { MatInkBarFoundation } from './ink-bar';
/**
 * Used in the `mat-tab-group` view to display tab labels.
 * \@docs-private
 */
export class MatTabLabelWrapper extends BaseMatTabLabelWrapper {
    /**
     * @param {?} elementRef
     * @param {?} _document
     */
    constructor(elementRef, _document) {
        super(elementRef);
        this.elementRef = elementRef;
        this._foundation = new MatInkBarFoundation(elementRef, _document);
        this._foundation.init();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._foundation.destroy();
    }
    /**
     * Sets focus on the wrapper element
     * @return {?}
     */
    focus() {
        this.elementRef.nativeElement.focus();
    }
}
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
MatTabLabelWrapper.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
if (false) {
    /** @type {?} */
    MatTabLabelWrapper.prototype._foundation;
    /** @type {?} */
    MatTabLabelWrapper.prototype.elementRef;
}
//# sourceMappingURL=tab-label-wrapper.js.map