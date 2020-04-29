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
import { Directionality } from '@angular/cdk/bidi';
import { Overlay } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
/**
 * Overridable factory responsible for configuring how cdkPopoverEdit popovers are positioned
 * and sized.
 * @abstract
 */
var PopoverEditPositionStrategyFactory = /** @class */ (function () {
    function PopoverEditPositionStrategyFactory() {
    }
    PopoverEditPositionStrategyFactory.decorators = [
        { type: Injectable },
    ];
    return PopoverEditPositionStrategyFactory;
}());
export { PopoverEditPositionStrategyFactory };
if (false) {
    /**
     * Creates a PositionStrategy based on the specified table cells.
     * The cells will be provided in DOM order.
     * @abstract
     * @param {?} cells
     * @return {?}
     */
    PopoverEditPositionStrategyFactory.prototype.positionStrategyForCells = function (cells) { };
    /**
     * Creates an OverlaySizeConfig based on the specified table cells.
     * The cells will be provided in DOM order.
     * @abstract
     * @param {?} cells
     * @return {?}
     */
    PopoverEditPositionStrategyFactory.prototype.sizeConfigForCells = function (cells) { };
}
/**
 * Default implementation of PopoverEditPositionStrategyFactory.
 * Uses a FlexibleConnectedPositionStrategy anchored to the start + top of the cell.
 * Note: This will change to CoverPositionStrategy once it implemented.
 */
var DefaultPopoverEditPositionStrategyFactory = /** @class */ (function (_super) {
    tslib_1.__extends(DefaultPopoverEditPositionStrategyFactory, _super);
    function DefaultPopoverEditPositionStrategyFactory(direction, overlay) {
        var _this = _super.call(this) || this;
        _this.direction = direction;
        _this.overlay = overlay;
        return _this;
    }
    /**
     * @param {?} cells
     * @return {?}
     */
    DefaultPopoverEditPositionStrategyFactory.prototype.positionStrategyForCells = /**
     * @param {?} cells
     * @return {?}
     */
    function (cells) {
        return this.overlay.position()
            .flexibleConnectedTo(cells[0])
            .withGrowAfterOpen()
            .withPush()
            .withViewportMargin(16)
            .withPositions([{
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
            }]);
    };
    /**
     * @param {?} cells
     * @return {?}
     */
    DefaultPopoverEditPositionStrategyFactory.prototype.sizeConfigForCells = /**
     * @param {?} cells
     * @return {?}
     */
    function (cells) {
        if (cells.length === 0) {
            return {};
        }
        if (cells.length === 1) {
            return { width: cells[0].getBoundingClientRect().width };
        }
        /** @type {?} */
        var firstCell;
        /** @type {?} */
        var lastCell;
        if (this.direction.value === 'ltr') {
            firstCell = cells[0];
            lastCell = cells[cells.length - 1];
        }
        else {
            lastCell = cells[0];
            firstCell = cells[cells.length - 1];
        }
        return { width: lastCell.getBoundingClientRect().right - firstCell.getBoundingClientRect().left };
    };
    DefaultPopoverEditPositionStrategyFactory.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DefaultPopoverEditPositionStrategyFactory.ctorParameters = function () { return [
        { type: Directionality },
        { type: Overlay }
    ]; };
    return DefaultPopoverEditPositionStrategyFactory;
}(PopoverEditPositionStrategyFactory));
export { DefaultPopoverEditPositionStrategyFactory };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    DefaultPopoverEditPositionStrategyFactory.prototype.direction;
    /**
     * @type {?}
     * @protected
     */
    DefaultPopoverEditPositionStrategyFactory.prototype.overlay;
}
//# sourceMappingURL=popover-edit-position-strategy-factory.js.map