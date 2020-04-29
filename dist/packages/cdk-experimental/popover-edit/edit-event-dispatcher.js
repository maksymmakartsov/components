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
import { Injectable, NgZone } from '@angular/core';
import { combineLatest, Observable, pipe, Subject } from 'rxjs';
import { audit, auditTime, debounceTime, distinctUntilChanged, filter, map, share, skip, startWith, } from 'rxjs/operators';
import { CELL_SELECTOR, ROW_SELECTOR } from './constants';
import { closest } from './polyfill';
/**
 * The delay applied to mouse events before hiding or showing hover content.
 * @type {?}
 */
const MOUSE_EVENT_DELAY_MS = 40;
/**
 * The delay for reacting to focus/blur changes.
 * @type {?}
 */
const FOCUS_DELAY = 0;
/** @enum {number} */
const HoverContentState = {
    OFF: 0,
    FOCUSABLE: 1,
    ON: 2,
};
export { HoverContentState };
/**
 * Service for sharing delegated events and state for triggering table edits.
 */
export class EditEventDispatcher {
    /**
     * @param {?} _ngZone
     */
    constructor(_ngZone) {
        this._ngZone = _ngZone;
        /**
         * A subject that indicates which table cell is currently editing.
         */
        this.editing = new Subject();
        /**
         * A subject that indicates which table row is currently hovered.
         */
        this.hovering = new Subject();
        /**
         * A subject that indicates which table row currently contains focus.
         */
        this.focused = new Subject();
        /**
         * A subject that indicates all elements in the table matching ROW_SELECTOR.
         */
        this.allRows = new Subject();
        /**
         * A subject that emits mouse move events from the table indicating the targeted row.
         */
        this.mouseMove = new Subject();
        this._editRef = null;
        // Optimization: Precompute common pipeable operators used per row/cell.
        this._distinctUntilChanged = distinctUntilChanged();
        this._startWithNull = startWith(null);
        this._distinctShare = pipe((/** @type {?} */ (this._distinctUntilChanged)), share());
        this._startWithNullDistinct = pipe(this._startWithNull, (/** @type {?} */ (this._distinctUntilChanged)));
        /**
         * An observable that emits the row containing focus or an active edit.
         */
        this.editingOrFocused = combineLatest([
            this.editing.pipe(map((/**
             * @param {?} cell
             * @return {?}
             */
            cell => closest(cell, ROW_SELECTOR))), this._startWithNull),
            this.focused.pipe(this._startWithNull),
        ]).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([editingRow, focusedRow]) => focusedRow || editingRow)), (/** @type {?} */ (this._distinctUntilChanged)), auditTime(FOCUS_DELAY), (/** @type {?} */ (this._distinctUntilChanged)), share());
        /**
         * Tracks rows that contain hover content with a reference count.
         */
        this._rowsWithHoverContent = new WeakMap();
        /**
         * The table cell that has an active edit lens (or null).
         */
        this._currentlyEditing = null;
        /**
         * The combined set of row hover content states organized by row.
         */
        this._hoveredContentStateDistinct = combineLatest([
            this._getFirstRowWithHoverContent(),
            this._getLastRowWithHoverContent(),
            this.editingOrFocused,
            this.hovering.pipe(distinctUntilChanged(), audit((/**
             * @param {?} row
             * @return {?}
             */
            row => this.mouseMove.pipe(filter((/**
             * @param {?} mouseMoveRow
             * @return {?}
             */
            mouseMoveRow => row === mouseMoveRow)), this._startWithNull, debounceTime(MOUSE_EVENT_DELAY_MS)))), this._startWithNullDistinct),
        ]).pipe(skip(1), // Skip the initial emission of [null, null, null, null].
        map(computeHoverContentState), distinctUntilChanged(areMapEntriesEqual), 
        // Optimization: Enter the zone before share() so that we trigger a single
        // ApplicationRef.tick for all row updates.
        this._enterZone(), share());
        this._editingDistinct = this.editing.pipe(distinctUntilChanged(), this._enterZone(), share());
        // Optimization: Share row events observable with subsequent callers.
        // At startup, calls will be sequential by row.
        this._lastSeenRow = null;
        this._lastSeenRowHoverOrFocus = null;
        this._editingDistinct.subscribe((/**
         * @param {?} cell
         * @return {?}
         */
        cell => {
            this._currentlyEditing = cell;
        }));
    }
    /**
     * The EditRef for the currently active edit lens (if any).
     * @return {?}
     */
    get editRef() {
        return this._editRef;
    }
    /**
     * Gets an Observable that emits true when the specified element's cell
     * is editing and false when not.
     * @param {?} element
     * @return {?}
     */
    editingCell(element) {
        /** @type {?} */
        let cell = null;
        return this._editingDistinct.pipe(map((/**
         * @param {?} editCell
         * @return {?}
         */
        editCell => editCell === (cell || (cell = closest(element, CELL_SELECTOR))))), (/** @type {?} */ (this._distinctUntilChanged)));
    }
    /**
     * Stops editing for the specified cell. If the specified cell is not the current
     * edit cell, does nothing.
     * @param {?} element
     * @return {?}
     */
    doneEditingCell(element) {
        /** @type {?} */
        const cell = closest(element, CELL_SELECTOR);
        if (this._currentlyEditing === cell) {
            this.editing.next(null);
        }
    }
    /**
     * Sets the currently active EditRef.
     * @param {?} ref
     * @return {?}
     */
    setActiveEditRef(ref) {
        this._editRef = ref;
    }
    /**
     * Unsets the currently active EditRef, if the specified editRef is active.
     * @param {?} ref
     * @return {?}
     */
    unsetActiveEditRef(ref) {
        if (this._editRef !== ref) {
            return;
        }
        this._editRef = null;
    }
    /**
     * Adds the specified table row to be tracked for first/last row comparisons.
     * @param {?} row
     * @return {?}
     */
    registerRowWithHoverContent(row) {
        this._rowsWithHoverContent.set(row, (this._rowsWithHoverContent.get(row) || 0) + 1);
    }
    /**
     * Reference decrements and ultimately removes the specified table row from first/last row
     * comparisons.
     * @param {?} row
     * @return {?}
     */
    deregisterRowWithHoverContent(row) {
        /** @type {?} */
        const refCount = this._rowsWithHoverContent.get(row) || 0;
        if (refCount <= 1) {
            this._rowsWithHoverContent.delete(row);
        }
        else {
            this._rowsWithHoverContent.set(row, refCount - 1);
        }
    }
    /**
     * Gets an Observable that emits true when the specified element's row
     * contains the focused element or is being hovered over and false when not.
     * Hovering is defined as when the mouse has momentarily stopped moving over the cell.
     * @param {?} row
     * @return {?}
     */
    hoverOrFocusOnRow(row) {
        if (row !== this._lastSeenRow) {
            this._lastSeenRow = row;
            this._lastSeenRowHoverOrFocus = this._hoveredContentStateDistinct.pipe(map((/**
             * @param {?} state
             * @return {?}
             */
            state => state.get(row) || 0 /* OFF */)), this._distinctShare);
        }
        return (/** @type {?} */ (this._lastSeenRowHoverOrFocus));
    }
    /**
     * RxJS operator that enters the Angular zone, used to reduce boilerplate in
     * re-entering the zone for stream pipelines.
     * @private
     * @template T
     * @return {?}
     */
    _enterZone() {
        return (/**
         * @param {?} source
         * @return {?}
         */
        (source) => new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => source.subscribe({
            next: (/**
             * @param {?} value
             * @return {?}
             */
            (value) => this._ngZone.run((/**
             * @return {?}
             */
            () => observer.next(value)))),
            error: (/**
             * @param {?} err
             * @return {?}
             */
            (err) => observer.error(err)),
            complete: (/**
             * @return {?}
             */
            () => observer.complete())
        }))));
    }
    /**
     * @private
     * @return {?}
     */
    _getFirstRowWithHoverContent() {
        return this._mapAllRowsToSingleRow((/**
         * @param {?} rows
         * @return {?}
         */
        rows => {
            for (let i = 0, row; row = rows[i]; i++) {
                if (this._rowsWithHoverContent.has((/** @type {?} */ (row)))) {
                    return (/** @type {?} */ (row));
                }
            }
            return null;
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _getLastRowWithHoverContent() {
        return this._mapAllRowsToSingleRow((/**
         * @param {?} rows
         * @return {?}
         */
        rows => {
            for (let i = rows.length - 1, row; row = rows[i]; i--) {
                if (this._rowsWithHoverContent.has((/** @type {?} */ (row)))) {
                    return (/** @type {?} */ (row));
                }
            }
            return null;
        }));
    }
    /**
     * @private
     * @param {?} mapper
     * @return {?}
     */
    _mapAllRowsToSingleRow(mapper) {
        return this.allRows.pipe(map(mapper), this._startWithNullDistinct);
    }
}
EditEventDispatcher.decorators = [
    { type: Injectable },
];
/** @nocollapse */
EditEventDispatcher.ctorParameters = () => [
    { type: NgZone }
];
if (false) {
    /**
     * A subject that indicates which table cell is currently editing.
     * @type {?}
     */
    EditEventDispatcher.prototype.editing;
    /**
     * A subject that indicates which table row is currently hovered.
     * @type {?}
     */
    EditEventDispatcher.prototype.hovering;
    /**
     * A subject that indicates which table row currently contains focus.
     * @type {?}
     */
    EditEventDispatcher.prototype.focused;
    /**
     * A subject that indicates all elements in the table matching ROW_SELECTOR.
     * @type {?}
     */
    EditEventDispatcher.prototype.allRows;
    /**
     * A subject that emits mouse move events from the table indicating the targeted row.
     * @type {?}
     */
    EditEventDispatcher.prototype.mouseMove;
    /**
     * @type {?}
     * @private
     */
    EditEventDispatcher.prototype._editRef;
    /**
     * @type {?}
     * @private
     */
    EditEventDispatcher.prototype._distinctUntilChanged;
    /**
     * @type {?}
     * @private
     */
    EditEventDispatcher.prototype._startWithNull;
    /**
     * @type {?}
     * @private
     */
    EditEventDispatcher.prototype._distinctShare;
    /**
     * @type {?}
     * @private
     */
    EditEventDispatcher.prototype._startWithNullDistinct;
    /**
     * An observable that emits the row containing focus or an active edit.
     * @type {?}
     */
    EditEventDispatcher.prototype.editingOrFocused;
    /**
     * Tracks rows that contain hover content with a reference count.
     * @type {?}
     * @private
     */
    EditEventDispatcher.prototype._rowsWithHoverContent;
    /**
     * The table cell that has an active edit lens (or null).
     * @type {?}
     * @private
     */
    EditEventDispatcher.prototype._currentlyEditing;
    /**
     * The combined set of row hover content states organized by row.
     * @type {?}
     * @private
     */
    EditEventDispatcher.prototype._hoveredContentStateDistinct;
    /**
     * @type {?}
     * @private
     */
    EditEventDispatcher.prototype._editingDistinct;
    /**
     * @type {?}
     * @private
     */
    EditEventDispatcher.prototype._lastSeenRow;
    /**
     * @type {?}
     * @private
     */
    EditEventDispatcher.prototype._lastSeenRowHoverOrFocus;
    /**
     * @type {?}
     * @private
     */
    EditEventDispatcher.prototype._ngZone;
}
/**
 * @param {?} __0
 * @return {?}
 */
function computeHoverContentState([firstRow, lastRow, activeRow, hoverRow]) {
    /** @type {?} */
    const hoverContentState = new Map();
    // Add focusable rows.
    for (const focussableRow of [
        firstRow,
        lastRow,
        activeRow && activeRow.previousElementSibling,
        activeRow && activeRow.nextElementSibling,
    ]) {
        if (focussableRow) {
            hoverContentState.set((/** @type {?} */ (focussableRow)), 1 /* FOCUSABLE */);
        }
    }
    // Add/overwrite with fully visible rows.
    for (const onRow of [activeRow, hoverRow]) {
        if (onRow) {
            hoverContentState.set(onRow, 2 /* ON */);
        }
    }
    return hoverContentState;
}
/**
 * @template K, V
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function areMapEntriesEqual(a, b) {
    if (a.size !== b.size) {
        return false;
    }
    // TODO: use Map.prototype.entries once we're off IE11.
    for (const aKey of Array.from(a.keys())) {
        if (b.get(aKey) !== a.get(aKey)) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=edit-event-dispatcher.js.map