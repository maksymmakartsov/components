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
import { _CELL_SELECTOR, _closest, CdkPopoverEdit, CdkPopoverEditTabOut, CdkRowHoverContent, CdkEditOpen } from '@angular/cdk-experimental/popover-edit';
/** @type {?} */
var POPOVER_EDIT_HOST_BINDINGS = {
    'tabIndex': '0',
    'class': 'mat-popover-edit-cell',
    '[attr.aria-haspopup]': 'true',
};
/** @type {?} */
var POPOVER_EDIT_INPUTS = [
    'template: matPopoverEdit',
    'context: matPopoverEditContext',
    'colspan: matPopoverEditColspan',
];
/** @type {?} */
var EDIT_PANE_CLASS = 'mat-edit-pane';
/** @type {?} */
var MAT_ROW_HOVER_CLASS = 'mat-row-hover-content';
/** @type {?} */
var MAT_ROW_HOVER_RTL_CLASS = MAT_ROW_HOVER_CLASS + '-rtl';
/** @type {?} */
var MAT_ROW_HOVER_ANIMATE_CLASS = MAT_ROW_HOVER_CLASS + '-visible';
/** @type {?} */
var MAT_ROW_HOVER_CELL_CLASS = MAT_ROW_HOVER_CLASS + '-host-cell';
/**
 * Attaches an ng-template to a cell and shows it when instructed to by the
 * EditEventDispatcher service.
 * Makes the cell focusable.
 * @template C
 */
var MatPopoverEdit = /** @class */ (function (_super) {
    tslib_1.__extends(MatPopoverEdit, _super);
    function MatPopoverEdit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @protected
     * @return {?}
     */
    MatPopoverEdit.prototype.panelClass = /**
     * @protected
     * @return {?}
     */
    function () {
        return EDIT_PANE_CLASS;
    };
    MatPopoverEdit.decorators = [
        { type: Directive, args: [{
                    selector: '[matPopoverEdit]:not([matPopoverEditTabOut])',
                    host: POPOVER_EDIT_HOST_BINDINGS,
                    inputs: POPOVER_EDIT_INPUTS,
                },] },
    ];
    return MatPopoverEdit;
}(CdkPopoverEdit));
export { MatPopoverEdit };
/**
 * Attaches an ng-template to a cell and shows it when instructed to by the
 * EditEventDispatcher service.
 * Makes the cell focusable.
 * @template C
 */
var MatPopoverEditTabOut = /** @class */ (function (_super) {
    tslib_1.__extends(MatPopoverEditTabOut, _super);
    function MatPopoverEditTabOut() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @protected
     * @return {?}
     */
    MatPopoverEditTabOut.prototype.panelClass = /**
     * @protected
     * @return {?}
     */
    function () {
        return EDIT_PANE_CLASS;
    };
    MatPopoverEditTabOut.decorators = [
        { type: Directive, args: [{
                    selector: '[matPopoverEdit][matPopoverEditTabOut]',
                    host: POPOVER_EDIT_HOST_BINDINGS,
                    inputs: POPOVER_EDIT_INPUTS,
                },] },
    ];
    return MatPopoverEditTabOut;
}(CdkPopoverEditTabOut));
export { MatPopoverEditTabOut };
/**
 * A structural directive that shows its contents when the table row containing
 * it is hovered or when an element in the row has focus.
 */
var MatRowHoverContent = /** @class */ (function (_super) {
    tslib_1.__extends(MatRowHoverContent, _super);
    function MatRowHoverContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @protected
     * @param {?} element
     * @return {?}
     */
    MatRowHoverContent.prototype.initElement = /**
     * @protected
     * @param {?} element
     * @return {?}
     */
    function (element) {
        _super.prototype.initElement.call(this, element);
        element.classList.add(MAT_ROW_HOVER_CLASS);
    };
    /**
     * @protected
     * @param {?} element
     * @return {?}
     */
    MatRowHoverContent.prototype.makeElementHiddenButFocusable = /**
     * @protected
     * @param {?} element
     * @return {?}
     */
    function (element) {
        element.classList.remove(MAT_ROW_HOVER_ANIMATE_CLASS);
    };
    /**
     * @protected
     * @param {?} element
     * @return {?}
     */
    MatRowHoverContent.prototype.makeElementVisible = /**
     * @protected
     * @param {?} element
     * @return {?}
     */
    function (element) {
        (/** @type {?} */ (_closest((/** @type {?} */ (this.elementRef.nativeElement)), _CELL_SELECTOR))).classList.add(MAT_ROW_HOVER_CELL_CLASS);
        if (this.services.directionality.value === 'rtl') {
            element.classList.add(MAT_ROW_HOVER_RTL_CLASS);
        }
        else {
            element.classList.remove(MAT_ROW_HOVER_RTL_CLASS);
        }
        element.classList.remove(MAT_ROW_HOVER_ANIMATE_CLASS);
        this.services.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            setTimeout((/**
             * @return {?}
             */
            function () {
                element.classList.add(MAT_ROW_HOVER_ANIMATE_CLASS);
            }));
        }));
    };
    MatRowHoverContent.decorators = [
        { type: Directive, args: [{
                    selector: '[matRowHoverContent]',
                },] },
    ];
    return MatRowHoverContent;
}(CdkRowHoverContent));
export { MatRowHoverContent };
/**
 * Opens the closest edit popover to this element, whether it's associated with this exact
 * element or an ancestor element.
 */
var MatEditOpen = /** @class */ (function (_super) {
    tslib_1.__extends(MatEditOpen, _super);
    function MatEditOpen() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatEditOpen.decorators = [
        { type: Directive, args: [{
                    selector: '[matEditOpen]',
                },] },
    ];
    return MatEditOpen;
}(CdkEditOpen));
export { MatEditOpen };
//# sourceMappingURL=table-directives.js.map