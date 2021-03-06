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
import { QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, } from '@angular/cdk/keycodes';
/**
 * The keys handled by the GridKeyManager keydown method.
 * @type {?}
 */
export var NAVIGATION_KEYS = [DOWN_ARROW, UP_ARROW, RIGHT_ARROW, LEFT_ARROW];
/**
 * This interface is for rows that can be passed to a GridKeyManager.
 * @record
 * @template T
 */
export function GridKeyManagerRow() { }
if (false) {
    /** @type {?} */
    GridKeyManagerRow.prototype.cells;
}
/**
 * This class manages keyboard events for grids. If you pass it a query list
 * of GridKeyManagerRow, it will set the active cell correctly when arrow events occur.
 *
 * GridKeyManager expects that rows may change dynamically, but the cells for a given row are
 * static. It also expects that all rows have the same number of cells.
 * @template T
 */
var /**
 * This class manages keyboard events for grids. If you pass it a query list
 * of GridKeyManagerRow, it will set the active cell correctly when arrow events occur.
 *
 * GridKeyManager expects that rows may change dynamically, but the cells for a given row are
 * static. It also expects that all rows have the same number of cells.
 * @template T
 */
GridKeyManager = /** @class */ (function () {
    function GridKeyManager(_rows) {
        var _this = this;
        this._rows = _rows;
        this._activeRowIndex = -1;
        this._activeColumnIndex = -1;
        this._activeRow = null;
        this._activeCell = null;
        this._dir = 'ltr';
        /**
         * Stream that emits whenever the active cell of the grid manager changes.
         */
        this.change = new Subject();
        // We allow for the rows to be an array because, in some cases, the consumer may
        // not have access to a QueryList of the rows they want to manage (e.g. when the
        // rows aren't being collected via `ViewChildren` or `ContentChildren`).
        if (_rows instanceof QueryList) {
            _rows.changes.subscribe((/**
             * @param {?} newRows
             * @return {?}
             */
            function (newRows) {
                if (_this._activeRow) {
                    /** @type {?} */
                    var newIndex = newRows.toArray().indexOf(_this._activeRow);
                    if (newIndex > -1 && newIndex !== _this._activeRowIndex) {
                        _this._activeRowIndex = newIndex;
                    }
                }
            }));
        }
    }
    /**
     * Configures the directionality of the key manager's horizontal movement.
     * @param direction Direction which is considered forward movement across a row.
     *
     * If withDirectionality is not set, the default is 'ltr'.
     */
    /**
     * Configures the directionality of the key manager's horizontal movement.
     * @template THIS
     * @this {THIS}
     * @param {?} direction Direction which is considered forward movement across a row.
     *
     * If withDirectionality is not set, the default is 'ltr'.
     * @return {THIS}
     */
    GridKeyManager.prototype.withDirectionality = /**
     * Configures the directionality of the key manager's horizontal movement.
     * @template THIS
     * @this {THIS}
     * @param {?} direction Direction which is considered forward movement across a row.
     *
     * If withDirectionality is not set, the default is 'ltr'.
     * @return {THIS}
     */
    function (direction) {
        (/** @type {?} */ (this))._dir = direction;
        return (/** @type {?} */ (this));
    };
    /**
     * @param {?} cell
     * @return {?}
     */
    GridKeyManager.prototype.setActiveCell = /**
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        /** @type {?} */
        var previousRowIndex = this._activeRowIndex;
        /** @type {?} */
        var previousColumnIndex = this._activeColumnIndex;
        this.updateActiveCell(cell);
        if (this._activeRowIndex !== previousRowIndex ||
            this._activeColumnIndex !== previousColumnIndex) {
            this.change.next({ row: this._activeRowIndex, column: this._activeColumnIndex });
        }
    };
    /**
     * Sets the active cell depending on the key event passed in.
     * @param event Keyboard event to be used for determining which element should be active.
     */
    /**
     * Sets the active cell depending on the key event passed in.
     * @param {?} event Keyboard event to be used for determining which element should be active.
     * @return {?}
     */
    GridKeyManager.prototype.onKeydown = /**
     * Sets the active cell depending on the key event passed in.
     * @param {?} event Keyboard event to be used for determining which element should be active.
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var keyCode = event.keyCode;
        switch (keyCode) {
            case DOWN_ARROW:
                this.setNextRowActive();
                break;
            case UP_ARROW:
                this.setPreviousRowActive();
                break;
            case RIGHT_ARROW:
                this._dir === 'rtl' ? this.setPreviousColumnActive() : this.setNextColumnActive();
                break;
            case LEFT_ARROW:
                this._dir === 'rtl' ? this.setNextColumnActive() : this.setPreviousColumnActive();
                break;
            default:
                // Note that we return here, in order to avoid preventing
                // the default action of non-navigational keys.
                return;
        }
        event.preventDefault();
    };
    Object.defineProperty(GridKeyManager.prototype, "activeRowIndex", {
        /** Index of the currently active row. */
        get: /**
         * Index of the currently active row.
         * @return {?}
         */
        function () {
            return this._activeRowIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridKeyManager.prototype, "activeColumnIndex", {
        /** Index of the currently active column. */
        get: /**
         * Index of the currently active column.
         * @return {?}
         */
        function () {
            return this._activeColumnIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridKeyManager.prototype, "activeCell", {
        /** The active cell. */
        get: /**
         * The active cell.
         * @return {?}
         */
        function () {
            return this._activeCell;
        },
        enumerable: true,
        configurable: true
    });
    /** Sets the active cell to the first cell in the grid. */
    /**
     * Sets the active cell to the first cell in the grid.
     * @return {?}
     */
    GridKeyManager.prototype.setFirstCellActive = /**
     * Sets the active cell to the first cell in the grid.
     * @return {?}
     */
    function () {
        this._setActiveCellByIndex(0, 0);
    };
    /** Sets the active cell to the last cell in the grid. */
    /**
     * Sets the active cell to the last cell in the grid.
     * @return {?}
     */
    GridKeyManager.prototype.setLastCellActive = /**
     * Sets the active cell to the last cell in the grid.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var lastRowIndex = this._rows.length - 1;
        /** @type {?} */
        var lastRow = this._getRowsArray()[lastRowIndex];
        this._setActiveCellByIndex(lastRowIndex, lastRow.cells.length - 1);
    };
    /** Sets the active row to the next row in the grid. Active column is unchanged. */
    /**
     * Sets the active row to the next row in the grid. Active column is unchanged.
     * @return {?}
     */
    GridKeyManager.prototype.setNextRowActive = /**
     * Sets the active row to the next row in the grid. Active column is unchanged.
     * @return {?}
     */
    function () {
        this._activeRowIndex < 0 ? this.setFirstCellActive() : this._setActiveCellByDelta(1, 0);
    };
    /** Sets the active row to the previous row in the grid. Active column is unchanged. */
    /**
     * Sets the active row to the previous row in the grid. Active column is unchanged.
     * @return {?}
     */
    GridKeyManager.prototype.setPreviousRowActive = /**
     * Sets the active row to the previous row in the grid. Active column is unchanged.
     * @return {?}
     */
    function () {
        this._setActiveCellByDelta(-1, 0);
    };
    /**
     * Sets the active column to the next column in the grid.
     * Active row is unchanged, unless we reach the end of a row.
     */
    /**
     * Sets the active column to the next column in the grid.
     * Active row is unchanged, unless we reach the end of a row.
     * @return {?}
     */
    GridKeyManager.prototype.setNextColumnActive = /**
     * Sets the active column to the next column in the grid.
     * Active row is unchanged, unless we reach the end of a row.
     * @return {?}
     */
    function () {
        this._activeRowIndex < 0 ? this.setFirstCellActive() : this._setActiveCellByDelta(0, 1);
    };
    /**
     * Sets the active column to the previous column in the grid.
     * Active row is unchanged, unless we reach the end of a row.
     */
    /**
     * Sets the active column to the previous column in the grid.
     * Active row is unchanged, unless we reach the end of a row.
     * @return {?}
     */
    GridKeyManager.prototype.setPreviousColumnActive = /**
     * Sets the active column to the previous column in the grid.
     * Active row is unchanged, unless we reach the end of a row.
     * @return {?}
     */
    function () {
        this._setActiveCellByDelta(0, -1);
    };
    /**
     * @param {?} cell
     * @return {?}
     */
    GridKeyManager.prototype.updateActiveCell = /**
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        var _this = this;
        /** @type {?} */
        var rowArray = this._getRowsArray();
        if (typeof cell === 'object' && typeof cell.row === 'number' &&
            typeof cell.column === 'number') {
            this._activeRowIndex = cell.row;
            this._activeColumnIndex = cell.column;
            this._activeRow = rowArray[cell.row] || null;
            this._activeCell = this._activeRow ? this._activeRow.cells[cell.column] || null : null;
        }
        else {
            rowArray.forEach((/**
             * @param {?} row
             * @param {?} rowIndex
             * @return {?}
             */
            function (row, rowIndex) {
                /** @type {?} */
                var columnIndex = row.cells.indexOf(cell);
                if (columnIndex !== -1) {
                    _this._activeRowIndex = rowIndex;
                    _this._activeColumnIndex = columnIndex;
                    _this._activeRow = row;
                    _this._activeCell = row.cells[columnIndex];
                }
            }));
        }
    };
    /**
     * This method sets the active cell, given the row and columns deltas
     * between the currently active cell and the new active cell.
     */
    /**
     * This method sets the active cell, given the row and columns deltas
     * between the currently active cell and the new active cell.
     * @private
     * @param {?} rowDelta
     * @param {?} columnDelta
     * @return {?}
     */
    GridKeyManager.prototype._setActiveCellByDelta = /**
     * This method sets the active cell, given the row and columns deltas
     * between the currently active cell and the new active cell.
     * @private
     * @param {?} rowDelta
     * @param {?} columnDelta
     * @return {?}
     */
    function (rowDelta, columnDelta) {
        // If delta puts us past the last cell in a row, move to the first cell of the next row.
        if (this._activeRow && this._activeColumnIndex + columnDelta >= this._activeRow.cells.length) {
            this._setActiveCellByIndex(this._activeRowIndex + 1, 0);
            // If delta puts us prior to the first cell in a row, move to the last cell of the previous row.
        }
        else if (this._activeColumnIndex + columnDelta < 0) {
            /** @type {?} */
            var previousRowIndex = this._activeRowIndex - 1;
            /** @type {?} */
            var previousRow = this._getRowsArray()[previousRowIndex];
            if (previousRow) {
                this._setActiveCellByIndex(previousRowIndex, previousRow.cells.length - 1);
            }
        }
        else {
            this._setActiveCellByIndex(this._activeRowIndex + rowDelta, this._activeColumnIndex + columnDelta);
        }
    };
    /**
     * Sets the active cell to the cell at the indices specified, if they are valid.
     */
    /**
     * Sets the active cell to the cell at the indices specified, if they are valid.
     * @private
     * @param {?} rowIndex
     * @param {?} columnIndex
     * @return {?}
     */
    GridKeyManager.prototype._setActiveCellByIndex = /**
     * Sets the active cell to the cell at the indices specified, if they are valid.
     * @private
     * @param {?} rowIndex
     * @param {?} columnIndex
     * @return {?}
     */
    function (rowIndex, columnIndex) {
        /** @type {?} */
        var rows = this._getRowsArray();
        /** @type {?} */
        var targetRow = rows[rowIndex];
        if (!targetRow || !targetRow.cells[columnIndex]) {
            return;
        }
        this.setActiveCell({ row: rowIndex, column: columnIndex });
    };
    /** Returns the rows as an array. */
    /**
     * Returns the rows as an array.
     * @private
     * @return {?}
     */
    GridKeyManager.prototype._getRowsArray = /**
     * Returns the rows as an array.
     * @private
     * @return {?}
     */
    function () {
        return this._rows instanceof QueryList ? this._rows.toArray() : this._rows;
    };
    return GridKeyManager;
}());
/**
 * This class manages keyboard events for grids. If you pass it a query list
 * of GridKeyManagerRow, it will set the active cell correctly when arrow events occur.
 *
 * GridKeyManager expects that rows may change dynamically, but the cells for a given row are
 * static. It also expects that all rows have the same number of cells.
 * @template T
 */
export { GridKeyManager };
if (false) {
    /**
     * @type {?}
     * @private
     */
    GridKeyManager.prototype._activeRowIndex;
    /**
     * @type {?}
     * @private
     */
    GridKeyManager.prototype._activeColumnIndex;
    /**
     * @type {?}
     * @private
     */
    GridKeyManager.prototype._activeRow;
    /**
     * @type {?}
     * @private
     */
    GridKeyManager.prototype._activeCell;
    /**
     * @type {?}
     * @private
     */
    GridKeyManager.prototype._dir;
    /**
     * Stream that emits whenever the active cell of the grid manager changes.
     * @type {?}
     */
    GridKeyManager.prototype.change;
    /**
     * @type {?}
     * @private
     */
    GridKeyManager.prototype._rows;
}
//# sourceMappingURL=grid-key-manager.js.map