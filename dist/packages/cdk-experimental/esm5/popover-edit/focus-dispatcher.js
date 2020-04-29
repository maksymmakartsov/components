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
import { Directionality } from '@angular/cdk/bidi';
import { LEFT_ARROW, UP_ARROW, RIGHT_ARROW, DOWN_ARROW } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import { EDITABLE_CELL_SELECTOR, ROW_SELECTOR, TABLE_SELECTOR } from './constants';
import { closest } from './polyfill';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
/**
 * Service responsible for moving cell focus around in response to keyboard events.
 * May be overridden to customize the keyboard behavior of popover edit.
 */
var FocusDispatcher = /** @class */ (function () {
    function FocusDispatcher(directionality) {
        var _this = this;
        this.directionality = directionality;
        this.keyObserver = { next: (/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return _this.handleKeyboardEvent(event); }) };
    }
    /**
     * Moves focus to earlier or later cells (in dom order) by offset cells relative to
     * currentCell.
     */
    /**
     * Moves focus to earlier or later cells (in dom order) by offset cells relative to
     * currentCell.
     * @param {?} currentCell
     * @param {?} offset
     * @return {?}
     */
    FocusDispatcher.prototype.moveFocusHorizontally = /**
     * Moves focus to earlier or later cells (in dom order) by offset cells relative to
     * currentCell.
     * @param {?} currentCell
     * @param {?} offset
     * @return {?}
     */
    function (currentCell, offset) {
        /** @type {?} */
        var cells = (/** @type {?} */ (Array.from((/** @type {?} */ (closest(currentCell, TABLE_SELECTOR))).querySelectorAll(EDITABLE_CELL_SELECTOR))));
        /** @type {?} */
        var currentIndex = cells.indexOf(currentCell);
        /** @type {?} */
        var newIndex = currentIndex + offset;
        if (cells[newIndex]) {
            cells[newIndex].focus();
        }
    };
    /** Moves focus to up or down by row by offset cells relative to currentCell. */
    /**
     * Moves focus to up or down by row by offset cells relative to currentCell.
     * @param {?} currentCell
     * @param {?} offset
     * @return {?}
     */
    FocusDispatcher.prototype.moveFocusVertically = /**
     * Moves focus to up or down by row by offset cells relative to currentCell.
     * @param {?} currentCell
     * @param {?} offset
     * @return {?}
     */
    function (currentCell, offset) {
        /** @type {?} */
        var currentRow = (/** @type {?} */ (closest(currentCell, ROW_SELECTOR)));
        /** @type {?} */
        var rows = Array.from((/** @type {?} */ (closest(currentRow, TABLE_SELECTOR))).querySelectorAll(ROW_SELECTOR));
        /** @type {?} */
        var currentRowIndex = rows.indexOf(currentRow);
        /** @type {?} */
        var currentIndexWithinRow = Array.from(currentRow.querySelectorAll(EDITABLE_CELL_SELECTOR)).indexOf(currentCell);
        /** @type {?} */
        var newRowIndex = currentRowIndex + offset;
        if (rows[newRowIndex]) {
            /** @type {?} */
            var rowToFocus = (/** @type {?} */ (Array.from(rows[newRowIndex].querySelectorAll(EDITABLE_CELL_SELECTOR))));
            if (rowToFocus[currentIndexWithinRow]) {
                rowToFocus[currentIndexWithinRow].focus();
            }
        }
    };
    /** Translates arrow keydown events into focus move operations. */
    /**
     * Translates arrow keydown events into focus move operations.
     * @protected
     * @param {?} event
     * @return {?}
     */
    FocusDispatcher.prototype.handleKeyboardEvent = /**
     * Translates arrow keydown events into focus move operations.
     * @protected
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var cell = (/** @type {?} */ (closest(event.target, EDITABLE_CELL_SELECTOR)));
        if (!cell) {
            return;
        }
        switch (event.keyCode) {
            case UP_ARROW:
                this.moveFocusVertically(cell, -1);
                break;
            case DOWN_ARROW:
                this.moveFocusVertically(cell, 1);
                break;
            case LEFT_ARROW:
                this.moveFocusHorizontally(cell, this.directionality.value === 'ltr' ? -1 : 1);
                break;
            case RIGHT_ARROW:
                this.moveFocusHorizontally(cell, this.directionality.value === 'ltr' ? 1 : -1);
                break;
            default:
                // If the keyboard event is not handled, return now so that we don't `preventDefault`.
                return;
        }
        event.preventDefault();
    };
    FocusDispatcher.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    FocusDispatcher.ctorParameters = function () { return [
        { type: Directionality }
    ]; };
    /** @nocollapse */ FocusDispatcher.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function FocusDispatcher_Factory() { return new FocusDispatcher(i0.ɵɵinject(i1.Directionality)); }, token: FocusDispatcher, providedIn: "root" });
    return FocusDispatcher;
}());
export { FocusDispatcher };
if (false) {
    /**
     * Observes keydown events triggered from the table.
     * @type {?}
     */
    FocusDispatcher.prototype.keyObserver;
    /**
     * @type {?}
     * @protected
     */
    FocusDispatcher.prototype.directionality;
}
//# sourceMappingURL=focus-dispatcher.js.map