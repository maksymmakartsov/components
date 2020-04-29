/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/forms'), require('@angular/cdk/bidi'), require('@angular/cdk/keycodes'), require('@angular/cdk/overlay'), require('@angular/cdk/a11y'), require('@angular/cdk/scrolling'), require('@angular/common'), require('@angular/cdk/portal')) :
	typeof define === 'function' && define.amd ? define('@angular/cdk-experimental/popover-edit', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/forms', '@angular/cdk/bidi', '@angular/cdk/keycodes', '@angular/cdk/overlay', '@angular/cdk/a11y', '@angular/cdk/scrolling', '@angular/common', '@angular/cdk/portal'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.cdkExperimental = global.ng.cdkExperimental || {}, global.ng.cdkExperimental.popoverEdit = {}),global.ng.core,global.rxjs,global.rxjs.operators,global.ng.forms,global.ng.cdk.bidi,global.ng.cdk.keycodes,global.ng.cdk.overlay,global.ng.cdk.a11y,global.ng.cdk.scrolling,global.ng.common,global.ng.cdk.portal));
}(this, (function (exports,core,rxjs,operators,forms,bidi,keycodes,overlay,a11y,scrolling,common,portal) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Selector for finding table cells.
 * @type {?}
 */
var CELL_SELECTOR = '.cdk-cell, .mat-cell, td';
/**
 * Selector for finding editable table cells.
 * @type {?}
 */
var EDITABLE_CELL_SELECTOR = '.cdk-popover-edit-cell, .mat-popover-edit-cell';
/**
 * Selector for finding table rows.
 * @type {?}
 */
var ROW_SELECTOR = '.cdk-row, .mat-row, tr';
/**
 * Selector for finding the table element.
 * @type {?}
 */
var TABLE_SELECTOR = 'table, cdk-table, mat-table';
/**
 * CSS class added to the edit lens pane.
 * @type {?}
 */
var EDIT_PANE_CLASS = 'cdk-edit-pane';
/**
 * Selector for finding the edit lens pane.
 * @type {?}
 */
var EDIT_PANE_SELECTOR = "." + EDIT_PANE_CLASS + ", .mat-edit-pane";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * IE 11 compatible matches implementation.
 * @param {?} element
 * @param {?} selector
 * @return {?}
 */
function matches(element, selector) {
    return element.matches ?
        element.matches(selector) :
        ((/** @type {?} */ (element)))['msMatchesSelector'](selector);
}
/**
 * IE 11 compatible closest implementation that is able to start from non-Element Nodes.
 * @param {?} element
 * @param {?} selector
 * @return {?}
 */
function closest(element, selector) {
    if (!(element instanceof Node)) {
        return null;
    }
    /** @type {?} */
    var curr = element;
    while (curr != null && !(curr instanceof Element)) {
        curr = curr.parentNode;
    }
    return curr && (/** @type {?} */ ((hasNativeClosest ?
        curr.closest(selector) : polyfillClosest(curr, selector))));
}
/**
 * Polyfill for browsers without Element.closest.
 * @param {?} element
 * @param {?} selector
 * @return {?}
 */
function polyfillClosest(element, selector) {
    /** @type {?} */
    var curr = element;
    while (curr != null && !(curr instanceof Element && matches(curr, selector))) {
        curr = curr.parentNode;
    }
    return (/** @type {?} */ ((curr || null)));
}
/** @type {?} */
var hasNativeClosest = !!Element.prototype.closest;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The delay applied to mouse events before hiding or showing hover content.
 * @type {?}
 */
var MOUSE_EVENT_DELAY_MS = 40;
/**
 * The delay for reacting to focus/blur changes.
 * @type {?}
 */
var FOCUS_DELAY = 0;
/**
 * Service for sharing delegated events and state for triggering table edits.
 */
var EditEventDispatcher = /** @class */ (function () {
    function EditEventDispatcher(_ngZone) {
        var _this = this;
        this._ngZone = _ngZone;
        /**
         * A subject that indicates which table cell is currently editing.
         */
        this.editing = new rxjs.Subject();
        /**
         * A subject that indicates which table row is currently hovered.
         */
        this.hovering = new rxjs.Subject();
        /**
         * A subject that indicates which table row currently contains focus.
         */
        this.focused = new rxjs.Subject();
        /**
         * A subject that indicates all elements in the table matching ROW_SELECTOR.
         */
        this.allRows = new rxjs.Subject();
        /**
         * A subject that emits mouse move events from the table indicating the targeted row.
         */
        this.mouseMove = new rxjs.Subject();
        this._editRef = null;
        // Optimization: Precompute common pipeable operators used per row/cell.
        this._distinctUntilChanged = operators.distinctUntilChanged();
        this._startWithNull = operators.startWith(null);
        this._distinctShare = rxjs.pipe((/** @type {?} */ (this._distinctUntilChanged)), operators.share());
        this._startWithNullDistinct = rxjs.pipe(this._startWithNull, (/** @type {?} */ (this._distinctUntilChanged)));
        /**
         * An observable that emits the row containing focus or an active edit.
         */
        this.editingOrFocused = rxjs.combineLatest([
            this.editing.pipe(operators.map((/**
             * @param {?} cell
             * @return {?}
             */
            function (cell) { return closest(cell, ROW_SELECTOR); })), this._startWithNull),
            this.focused.pipe(this._startWithNull),
        ]).pipe(operators.map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var editingRow = _a[0], focusedRow = _a[1];
            return focusedRow || editingRow;
        })), (/** @type {?} */ (this._distinctUntilChanged)), operators.auditTime(FOCUS_DELAY), (/** @type {?} */ (this._distinctUntilChanged)), operators.share());
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
        this._hoveredContentStateDistinct = rxjs.combineLatest([
            this._getFirstRowWithHoverContent(),
            this._getLastRowWithHoverContent(),
            this.editingOrFocused,
            this.hovering.pipe(operators.distinctUntilChanged(), operators.audit((/**
             * @param {?} row
             * @return {?}
             */
            function (row) { return _this.mouseMove.pipe(operators.filter((/**
             * @param {?} mouseMoveRow
             * @return {?}
             */
            function (mouseMoveRow) { return row === mouseMoveRow; })), _this._startWithNull, operators.debounceTime(MOUSE_EVENT_DELAY_MS)); })), this._startWithNullDistinct),
        ]).pipe(operators.skip(1), // Skip the initial emission of [null, null, null, null].
        operators.map(computeHoverContentState), operators.distinctUntilChanged(areMapEntriesEqual), 
        // Optimization: Enter the zone before share() so that we trigger a single
        // ApplicationRef.tick for all row updates.
        this._enterZone(), operators.share());
        this._editingDistinct = this.editing.pipe(operators.distinctUntilChanged(), this._enterZone(), operators.share());
        // Optimization: Share row events observable with subsequent callers.
        // At startup, calls will be sequential by row.
        this._lastSeenRow = null;
        this._lastSeenRowHoverOrFocus = null;
        this._editingDistinct.subscribe((/**
         * @param {?} cell
         * @return {?}
         */
        function (cell) {
            _this._currentlyEditing = cell;
        }));
    }
    Object.defineProperty(EditEventDispatcher.prototype, "editRef", {
        /** The EditRef for the currently active edit lens (if any). */
        get: /**
         * The EditRef for the currently active edit lens (if any).
         * @return {?}
         */
        function () {
            return this._editRef;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets an Observable that emits true when the specified element's cell
     * is editing and false when not.
     */
    /**
     * Gets an Observable that emits true when the specified element's cell
     * is editing and false when not.
     * @param {?} element
     * @return {?}
     */
    EditEventDispatcher.prototype.editingCell = /**
     * Gets an Observable that emits true when the specified element's cell
     * is editing and false when not.
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var cell = null;
        return this._editingDistinct.pipe(operators.map((/**
         * @param {?} editCell
         * @return {?}
         */
        function (editCell) { return editCell === (cell || (cell = closest(element, CELL_SELECTOR))); })), (/** @type {?} */ (this._distinctUntilChanged)));
    };
    /**
     * Stops editing for the specified cell. If the specified cell is not the current
     * edit cell, does nothing.
     */
    /**
     * Stops editing for the specified cell. If the specified cell is not the current
     * edit cell, does nothing.
     * @param {?} element
     * @return {?}
     */
    EditEventDispatcher.prototype.doneEditingCell = /**
     * Stops editing for the specified cell. If the specified cell is not the current
     * edit cell, does nothing.
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var cell = closest(element, CELL_SELECTOR);
        if (this._currentlyEditing === cell) {
            this.editing.next(null);
        }
    };
    /** Sets the currently active EditRef. */
    /**
     * Sets the currently active EditRef.
     * @param {?} ref
     * @return {?}
     */
    EditEventDispatcher.prototype.setActiveEditRef = /**
     * Sets the currently active EditRef.
     * @param {?} ref
     * @return {?}
     */
    function (ref) {
        this._editRef = ref;
    };
    /** Unsets the currently active EditRef, if the specified editRef is active. */
    /**
     * Unsets the currently active EditRef, if the specified editRef is active.
     * @param {?} ref
     * @return {?}
     */
    EditEventDispatcher.prototype.unsetActiveEditRef = /**
     * Unsets the currently active EditRef, if the specified editRef is active.
     * @param {?} ref
     * @return {?}
     */
    function (ref) {
        if (this._editRef !== ref) {
            return;
        }
        this._editRef = null;
    };
    /** Adds the specified table row to be tracked for first/last row comparisons. */
    /**
     * Adds the specified table row to be tracked for first/last row comparisons.
     * @param {?} row
     * @return {?}
     */
    EditEventDispatcher.prototype.registerRowWithHoverContent = /**
     * Adds the specified table row to be tracked for first/last row comparisons.
     * @param {?} row
     * @return {?}
     */
    function (row) {
        this._rowsWithHoverContent.set(row, (this._rowsWithHoverContent.get(row) || 0) + 1);
    };
    /**
     * Reference decrements and ultimately removes the specified table row from first/last row
     * comparisons.
     */
    /**
     * Reference decrements and ultimately removes the specified table row from first/last row
     * comparisons.
     * @param {?} row
     * @return {?}
     */
    EditEventDispatcher.prototype.deregisterRowWithHoverContent = /**
     * Reference decrements and ultimately removes the specified table row from first/last row
     * comparisons.
     * @param {?} row
     * @return {?}
     */
    function (row) {
        /** @type {?} */
        var refCount = this._rowsWithHoverContent.get(row) || 0;
        if (refCount <= 1) {
            this._rowsWithHoverContent.delete(row);
        }
        else {
            this._rowsWithHoverContent.set(row, refCount - 1);
        }
    };
    /**
     * Gets an Observable that emits true when the specified element's row
     * contains the focused element or is being hovered over and false when not.
     * Hovering is defined as when the mouse has momentarily stopped moving over the cell.
     */
    /**
     * Gets an Observable that emits true when the specified element's row
     * contains the focused element or is being hovered over and false when not.
     * Hovering is defined as when the mouse has momentarily stopped moving over the cell.
     * @param {?} row
     * @return {?}
     */
    EditEventDispatcher.prototype.hoverOrFocusOnRow = /**
     * Gets an Observable that emits true when the specified element's row
     * contains the focused element or is being hovered over and false when not.
     * Hovering is defined as when the mouse has momentarily stopped moving over the cell.
     * @param {?} row
     * @return {?}
     */
    function (row) {
        if (row !== this._lastSeenRow) {
            this._lastSeenRow = row;
            this._lastSeenRowHoverOrFocus = this._hoveredContentStateDistinct.pipe(operators.map((/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.get(row) || 0 /* OFF */; })), this._distinctShare);
        }
        return (/** @type {?} */ (this._lastSeenRowHoverOrFocus));
    };
    /**
     * RxJS operator that enters the Angular zone, used to reduce boilerplate in
     * re-entering the zone for stream pipelines.
     */
    /**
     * RxJS operator that enters the Angular zone, used to reduce boilerplate in
     * re-entering the zone for stream pipelines.
     * @private
     * @template T
     * @return {?}
     */
    EditEventDispatcher.prototype._enterZone = /**
     * RxJS operator that enters the Angular zone, used to reduce boilerplate in
     * re-entering the zone for stream pipelines.
     * @private
     * @template T
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} source
         * @return {?}
         */
        function (source) {
            return new rxjs.Observable((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) { return source.subscribe({
                next: (/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) { return _this._ngZone.run((/**
                 * @return {?}
                 */
                function () { return observer.next(value); })); }),
                error: (/**
                 * @param {?} err
                 * @return {?}
                 */
                function (err) { return observer.error(err); }),
                complete: (/**
                 * @return {?}
                 */
                function () { return observer.complete(); })
            }); }));
        });
    };
    /**
     * @private
     * @return {?}
     */
    EditEventDispatcher.prototype._getFirstRowWithHoverContent = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return this._mapAllRowsToSingleRow((/**
         * @param {?} rows
         * @return {?}
         */
        function (rows) {
            for (var i = 0, row = void 0; row = rows[i]; i++) {
                if (_this._rowsWithHoverContent.has((/** @type {?} */ (row)))) {
                    return (/** @type {?} */ (row));
                }
            }
            return null;
        }));
    };
    /**
     * @private
     * @return {?}
     */
    EditEventDispatcher.prototype._getLastRowWithHoverContent = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return this._mapAllRowsToSingleRow((/**
         * @param {?} rows
         * @return {?}
         */
        function (rows) {
            for (var i = rows.length - 1, row = void 0; row = rows[i]; i--) {
                if (_this._rowsWithHoverContent.has((/** @type {?} */ (row)))) {
                    return (/** @type {?} */ (row));
                }
            }
            return null;
        }));
    };
    /**
     * @private
     * @param {?} mapper
     * @return {?}
     */
    EditEventDispatcher.prototype._mapAllRowsToSingleRow = /**
     * @private
     * @param {?} mapper
     * @return {?}
     */
    function (mapper) {
        return this.allRows.pipe(operators.map(mapper), this._startWithNullDistinct);
    };
    EditEventDispatcher.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    EditEventDispatcher.ctorParameters = function () { return [
        { type: core.NgZone }
    ]; };
    return EditEventDispatcher;
}());
/**
 * @param {?} __0
 * @return {?}
 */
function computeHoverContentState(_a) {
    var firstRow = _a[0], lastRow = _a[1], activeRow = _a[2], hoverRow = _a[3];
    /** @type {?} */
    var hoverContentState = new Map();
    // Add focusable rows.
    for (var _i = 0, _b = [
        firstRow,
        lastRow,
        activeRow && activeRow.previousElementSibling,
        activeRow && activeRow.nextElementSibling,
    ]; _i < _b.length; _i++) {
        var focussableRow = _b[_i];
        if (focussableRow) {
            hoverContentState.set((/** @type {?} */ (focussableRow)), 1 /* FOCUSABLE */);
        }
    }
    // Add/overwrite with fully visible rows.
    for (var _c = 0, _d = [activeRow, hoverRow]; _c < _d.length; _c++) {
        var onRow = _d[_c];
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
    for (var _i = 0, _a = Array.from(a.keys()); _i < _a.length; _i++) {
        var aKey = _a[_i];
        if (b.get(aKey) !== a.get(aKey)) {
            return false;
        }
    }
    return true;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Used for communication between the form within the edit lens and the
 * table that launched it. Provided by CdkEditControl within the lens.
 * @template FormValue
 */
var EditRef = /** @class */ (function () {
    function EditRef(_form, _editEventDispatcher, _ngZone) {
        this._form = _form;
        this._editEventDispatcher = _editEventDispatcher;
        this._ngZone = _ngZone;
        /**
         * Emits the final value of this edit instance before closing.
         */
        this._finalValueSubject = new rxjs.Subject();
        this.finalValue = this._finalValueSubject.asObservable();
        /**
         * Emits when the user tabs out of this edit lens before closing.
         */
        this._blurredSubject = new rxjs.Subject();
        this.blurred = this._blurredSubject.asObservable();
        this._editEventDispatcher.setActiveEditRef(this);
    }
    /**
     * Called by the host directive's OnInit hook. Reads the initial state of the
     * form and overrides it with persisted state from previous openings, if
     * applicable.
     */
    /**
     * Called by the host directive's OnInit hook. Reads the initial state of the
     * form and overrides it with persisted state from previous openings, if
     * applicable.
     * @param {?} previousFormValue
     * @return {?}
     */
    EditRef.prototype.init = /**
     * Called by the host directive's OnInit hook. Reads the initial state of the
     * form and overrides it with persisted state from previous openings, if
     * applicable.
     * @param {?} previousFormValue
     * @return {?}
     */
    function (previousFormValue) {
        var _this = this;
        // Wait for the zone to stabilize before caching the initial value.
        // This ensures that all form controls have been initialized.
        this._ngZone.onStable.pipe(operators.take(1)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.updateRevertValue();
            if (previousFormValue) {
                _this.reset(previousFormValue);
            }
        }));
    };
    /**
     * @return {?}
     */
    EditRef.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._editEventDispatcher.unsetActiveEditRef(this);
        this._finalValueSubject.next(this._form.value);
        this._finalValueSubject.complete();
    };
    /** Whether the attached form is in a valid state. */
    /**
     * Whether the attached form is in a valid state.
     * @return {?}
     */
    EditRef.prototype.isValid = /**
     * Whether the attached form is in a valid state.
     * @return {?}
     */
    function () {
        return this._form.valid;
    };
    /** Set the form's current value as what it will be set to on revert/reset. */
    /**
     * Set the form's current value as what it will be set to on revert/reset.
     * @return {?}
     */
    EditRef.prototype.updateRevertValue = /**
     * Set the form's current value as what it will be set to on revert/reset.
     * @return {?}
     */
    function () {
        this._revertFormValue = this._form.value;
    };
    /** Tells the table to close the edit popup. */
    /**
     * Tells the table to close the edit popup.
     * @return {?}
     */
    EditRef.prototype.close = /**
     * Tells the table to close the edit popup.
     * @return {?}
     */
    function () {
        this._editEventDispatcher.editing.next(null);
    };
    /** Notifies the active edit that the user has moved focus out of the lens. */
    /**
     * Notifies the active edit that the user has moved focus out of the lens.
     * @return {?}
     */
    EditRef.prototype.blur = /**
     * Notifies the active edit that the user has moved focus out of the lens.
     * @return {?}
     */
    function () {
        this._blurredSubject.next();
    };
    /**
     * Resets the form value to the specified value or the previously set
     * revert value.
     */
    /**
     * Resets the form value to the specified value or the previously set
     * revert value.
     * @param {?=} value
     * @return {?}
     */
    EditRef.prototype.reset = /**
     * Resets the form value to the specified value or the previously set
     * revert value.
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        this._form.reset(value || this._revertFormValue);
    };
    EditRef.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    EditRef.ctorParameters = function () { return [
        { type: forms.ControlContainer, decorators: [{ type: core.Self }] },
        { type: EditEventDispatcher },
        { type: core.NgZone }
    ]; };
    return EditRef;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
            case keycodes.UP_ARROW:
                this.moveFocusVertically(cell, -1);
                break;
            case keycodes.DOWN_ARROW:
                this.moveFocusVertically(cell, 1);
                break;
            case keycodes.LEFT_ARROW:
                this.moveFocusHorizontally(cell, this.directionality.value === 'ltr' ? -1 : 1);
                break;
            case keycodes.RIGHT_ARROW:
                this.moveFocusHorizontally(cell, this.directionality.value === 'ltr' ? 1 : -1);
                break;
            default:
                // If the keyboard event is not handled, return now so that we don't `preventDefault`.
                return;
        }
        event.preventDefault();
    };
    FocusDispatcher.decorators = [
        { type: core.Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    FocusDispatcher.ctorParameters = function () { return [
        { type: bidi.Directionality }
    ]; };
    /** @nocollapse */ FocusDispatcher.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function FocusDispatcher_Factory() { return new FocusDispatcher(core.ɵɵinject(bidi.Directionality)); }, token: FocusDispatcher, providedIn: "root" });
    return FocusDispatcher;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A convenience class for preserving unsaved form state while an edit lens is closed.
 *
 * Example usage:
 * class MyComponent {
 *   readonly nameEditValues = new FormValueContainer&lt;Item, {name: string}&gt;();
 * }
 *
 * &lt;form cdkEditControl [(cdkEditControlPreservedFormValue)]="nameEditValues.for(item).value"&gt;
 * @template Key, FormValue
 */
var   /**
 * A convenience class for preserving unsaved form state while an edit lens is closed.
 *
 * Example usage:
 * class MyComponent {
 *   readonly nameEditValues = new FormValueContainer&lt;Item, {name: string}&gt;();
 * }
 *
 * &lt;form cdkEditControl [(cdkEditControlPreservedFormValue)]="nameEditValues.for(item).value"&gt;
 * @template Key, FormValue
 */
FormValueContainer = /** @class */ (function () {
    function FormValueContainer() {
        this._formValues = new WeakMap();
    }
    /**
     * @param {?} key
     * @return {?}
     */
    FormValueContainer.prototype.for = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var _formValues = this._formValues;
        /** @type {?} */
        var entry = _formValues.get(key);
        if (!entry) {
            // Expose entry as an object so that we can [(two-way)] bind to its value member
            entry = {};
            _formValues.set(key, entry);
        }
        return entry;
    };
    return FormValueContainer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A directive that attaches to a form within the edit lens.
 * It coordinates the form state with the table-wide edit system and handles
 * closing the edit lens when the form is submitted or the user clicks
 * out.
 * @template FormValue
 */
var CdkEditControl = /** @class */ (function () {
    function CdkEditControl(elementRef, editRef) {
        this.elementRef = elementRef;
        this.editRef = editRef;
        this.destroyed = new rxjs.ReplaySubject();
        /**
         * Specifies what should happen when the user clicks outside of the edit lens.
         * The default behavior is to close the lens without submitting the form.
         */
        this.clickOutBehavior = 'close';
        this.preservedFormValueChange = new core.EventEmitter();
        /**
         * Determines whether the lens will close on form submit if the form is not in a valid
         * state. By default the lens will remain open.
         */
        this.ignoreSubmitUnlessValid = true;
    }
    /**
     * @return {?}
     */
    CdkEditControl.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.editRef.init(this.preservedFormValue);
        this.editRef.finalValue.subscribe(this.preservedFormValueChange);
        this.editRef.blurred.subscribe((/**
         * @return {?}
         */
        function () { return _this._handleBlur(); }));
    };
    /**
     * @return {?}
     */
    CdkEditControl.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed.next();
        this.destroyed.complete();
    };
    /**
     * Called when the form submits. If ignoreSubmitUnlessValid is true, checks
     * the form for validity before proceeding.
     * Updates the revert state with the latest submitted value then closes the edit.
     */
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /**
     * Called when the form submits. If ignoreSubmitUnlessValid is true, checks
     * the form for validity before proceeding.
     * Updates the revert state with the latest submitted value then closes the edit.
     * @return {?}
     */
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    CdkEditControl.prototype.handleFormSubmit = /**
     * Called when the form submits. If ignoreSubmitUnlessValid is true, checks
     * the form for validity before proceeding.
     * Updates the revert state with the latest submitted value then closes the edit.
     * @return {?}
     */
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    function () {
        if (this.ignoreSubmitUnlessValid && !this.editRef.isValid()) {
            return;
        }
        this.editRef.updateRevertValue();
        this.editRef.close();
    };
    /** Called on Escape keyup. Closes the edit. */
    /**
     * Called on Escape keyup. Closes the edit.
     * @return {?}
     */
    CdkEditControl.prototype.close = /**
     * Called on Escape keyup. Closes the edit.
     * @return {?}
     */
    function () {
        // todo - allow this behavior to be customized as well, such as calling
        // reset before close
        this.editRef.close();
    };
    /**
     * Called on click anywhere in the document.
     * If the click was outside of the lens, trigger the specified click out behavior.
     */
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /**
     * Called on click anywhere in the document.
     * If the click was outside of the lens, trigger the specified click out behavior.
     * @param {?} evt
     * @return {?}
     */
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    CdkEditControl.prototype.handlePossibleClickOut = /**
     * Called on click anywhere in the document.
     * If the click was outside of the lens, trigger the specified click out behavior.
     * @param {?} evt
     * @return {?}
     */
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    function (evt) {
        if (closest(evt.target, EDIT_PANE_SELECTOR)) {
            return;
        }
        switch (this.clickOutBehavior) {
            case 'submit':
                // Manually cause the form to submit before closing.
                this._triggerFormSubmit();
                this.editRef.close();
                break;
            case 'close':
                this.editRef.close();
                break;
            default:
                break;
        }
    };
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /**
     * @param {?} event
     * @return {?}
     */
    CdkEditControl.prototype._handleKeydown = 
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.key === 'Escape' && !keycodes.hasModifierKey(event)) {
            this.close();
            event.preventDefault();
        }
    };
    /** Triggers submit on tab out if clickOutBehavior is 'submit'. */
    /**
     * Triggers submit on tab out if clickOutBehavior is 'submit'.
     * @private
     * @return {?}
     */
    CdkEditControl.prototype._handleBlur = /**
     * Triggers submit on tab out if clickOutBehavior is 'submit'.
     * @private
     * @return {?}
     */
    function () {
        if (this.clickOutBehavior === 'submit') {
            // Manually cause the form to submit before closing.
            this._triggerFormSubmit();
        }
    };
    /**
     * @private
     * @return {?}
     */
    CdkEditControl.prototype._triggerFormSubmit = /**
     * @private
     * @return {?}
     */
    function () {
        (/** @type {?} */ (this.elementRef.nativeElement)).dispatchEvent(new Event('submit'));
    };
    CdkEditControl.decorators = [
        { type: core.Directive, args: [{
                    selector: 'form[cdkEditControl]',
                    inputs: [
                        'clickOutBehavior: cdkEditControlClickOutBehavior',
                        'preservedFormValue: cdkEditControlPreservedFormValue',
                        'ignoreSubmitUnlessValid: cdkEditControlIgnoreSubmitUnlessValid',
                    ],
                    outputs: ['preservedFormValueChange: cdkEditControlPreservedFormValueChange'],
                    providers: [EditRef],
                },] },
    ];
    /** @nocollapse */
    CdkEditControl.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: EditRef }
    ]; };
    CdkEditControl.propDecorators = {
        handleFormSubmit: [{ type: core.HostListener, args: ['ngSubmit',] }],
        handlePossibleClickOut: [{ type: core.HostListener, args: ['document:click', ['$event'],] }],
        _handleKeydown: [{ type: core.HostListener, args: ['keydown', ['$event'],] }]
    };
    return CdkEditControl;
}());
/**
 * Reverts the form to its initial or previously submitted state on click.
 * @template FormValue
 */
var CdkEditRevert = /** @class */ (function () {
    function CdkEditRevert(editRef) {
        this.editRef = editRef;
        /**
         * Type of the button. Defaults to `button` to avoid accident form submits.
         */
        this.type = 'button';
    }
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /**
     * @return {?}
     */
    CdkEditRevert.prototype.revertEdit = 
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /**
     * @return {?}
     */
    function () {
        this.editRef.reset();
    };
    CdkEditRevert.decorators = [
        { type: core.Directive, args: [{
                    selector: 'button[cdkEditRevert]',
                    host: {
                        'type': 'button',
                    }
                },] },
    ];
    /** @nocollapse */
    CdkEditRevert.ctorParameters = function () { return [
        { type: EditRef }
    ]; };
    CdkEditRevert.propDecorators = {
        type: [{ type: core.Input }],
        revertEdit: [{ type: core.HostListener, args: ['click',] }]
    };
    return CdkEditRevert;
}());
/**
 * Closes the lens on click.
 * @template FormValue
 */
var CdkEditClose = /** @class */ (function () {
    function CdkEditClose(editRef) {
        this.editRef = editRef;
        /**
         * Type of the button. Defaults to `button` to avoid accident form submits.
         */
        this.type = 'button';
    }
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /**
     * @return {?}
     */
    CdkEditClose.prototype.closeEdit = 
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /**
     * @return {?}
     */
    function () {
        // Note that we use `click` here, rather than a keyboard event, because some screen readers
        // will emit a fake click event instead of an enter keyboard event on buttons.
        this.editRef.close();
    };
    CdkEditClose.decorators = [
        { type: core.Directive, args: [{
                    selector: 'button[cdkEditClose]',
                    host: {
                        'type': 'button',
                    }
                },] },
    ];
    /** @nocollapse */
    CdkEditClose.ctorParameters = function () { return [
        { type: EditRef }
    ]; };
    CdkEditClose.propDecorators = {
        type: [{ type: core.Input }],
        closeEdit: [{ type: core.HostListener, args: ['click',] }]
    };
    return CdkEditClose;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Overridable factory responsible for configuring how cdkPopoverEdit popovers are positioned
 * and sized.
 * @abstract
 */
var PopoverEditPositionStrategyFactory = /** @class */ (function () {
    function PopoverEditPositionStrategyFactory() {
    }
    PopoverEditPositionStrategyFactory.decorators = [
        { type: core.Injectable },
    ];
    return PopoverEditPositionStrategyFactory;
}());
/**
 * Default implementation of PopoverEditPositionStrategyFactory.
 * Uses a FlexibleConnectedPositionStrategy anchored to the start + top of the cell.
 * Note: This will change to CoverPositionStrategy once it implemented.
 */
var DefaultPopoverEditPositionStrategyFactory = /** @class */ (function (_super) {
    __extends(DefaultPopoverEditPositionStrategyFactory, _super);
    function DefaultPopoverEditPositionStrategyFactory(direction, overlay$$1) {
        var _this = _super.call(this) || this;
        _this.direction = direction;
        _this.overlay = overlay$$1;
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
        { type: core.Injectable },
    ];
    /** @nocollapse */
    DefaultPopoverEditPositionStrategyFactory.ctorParameters = function () { return [
        { type: bidi.Directionality },
        { type: overlay.Overlay }
    ]; };
    return DefaultPopoverEditPositionStrategyFactory;
}(PopoverEditPositionStrategyFactory));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Optimization
 * Collects multiple Injectables into a singleton shared across the table. By reducing the
 * number of services injected into each CdkPopoverEdit, this saves about 0.023ms of cpu time
 * and 56 bytes of memory per instance.
 */
var EditServices = /** @class */ (function () {
    function EditServices(directionality, editEventDispatcher, focusDispatcher, focusTrapFactory, ngZone, overlay$$1, positionFactory, scrollDispatcher, viewportRuler) {
        this.directionality = directionality;
        this.editEventDispatcher = editEventDispatcher;
        this.focusDispatcher = focusDispatcher;
        this.focusTrapFactory = focusTrapFactory;
        this.ngZone = ngZone;
        this.overlay = overlay$$1;
        this.positionFactory = positionFactory;
        this.scrollDispatcher = scrollDispatcher;
        this.viewportRuler = viewportRuler;
    }
    EditServices.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    EditServices.ctorParameters = function () { return [
        { type: bidi.Directionality },
        { type: EditEventDispatcher },
        { type: FocusDispatcher },
        { type: a11y.FocusTrapFactory },
        { type: core.NgZone },
        { type: overlay.Overlay },
        { type: PopoverEditPositionStrategyFactory },
        { type: scrolling.ScrollDispatcher },
        { type: scrolling.ViewportRuler }
    ]; };
    return EditServices;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Like FocusTrap, but rather than trapping focus within a dom region, notifies subscribers when
 * focus leaves the region.
 */
var /**
 * Like FocusTrap, but rather than trapping focus within a dom region, notifies subscribers when
 * focus leaves the region.
 */
FocusEscapeNotifier = /** @class */ (function (_super) {
    __extends(FocusEscapeNotifier, _super);
    function FocusEscapeNotifier(element, checker, ngZone, document) {
        var _this = _super.call(this, element, checker, ngZone, document, true /* deferAnchors */) || this;
        _this._escapeSubject = new rxjs.Subject();
        // The focus trap adds "anchors" at the beginning and end of a trapped region that redirect
        // focus. We override that redirect behavior here with simply emitting on a stream.
        _this.startAnchorListener = (/**
         * @return {?}
         */
        function () {
            _this._escapeSubject.next(0 /* START */);
            return true;
        });
        _this.endAnchorListener = (/**
         * @return {?}
         */
        function () {
            _this._escapeSubject.next(1 /* END */);
            return true;
        });
        _this.attachAnchors();
        return _this;
    }
    /**
     * @return {?}
     */
    FocusEscapeNotifier.prototype.escapes = /**
     * @return {?}
     */
    function () {
        return this._escapeSubject.asObservable();
    };
    return FocusEscapeNotifier;
}(a11y.FocusTrap));
/**
 * Factory that allows easy instantiation of focus escape notifiers.
 */
var FocusEscapeNotifierFactory = /** @class */ (function () {
    function FocusEscapeNotifierFactory(_checker, _ngZone, _document) {
        this._checker = _checker;
        this._ngZone = _ngZone;
        this._document = _document;
    }
    /**
     * Creates a focus escape notifier region around the given element.
     * @param element The element around which focus will be monitored.
     * @returns The created focus escape notifier instance.
     */
    /**
     * Creates a focus escape notifier region around the given element.
     * @param {?} element The element around which focus will be monitored.
     * @return {?} The created focus escape notifier instance.
     */
    FocusEscapeNotifierFactory.prototype.create = /**
     * Creates a focus escape notifier region around the given element.
     * @param {?} element The element around which focus will be monitored.
     * @return {?} The created focus escape notifier instance.
     */
    function (element) {
        return new FocusEscapeNotifier(element, this._checker, this._ngZone, this._document);
    };
    FocusEscapeNotifierFactory.decorators = [
        { type: core.Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    FocusEscapeNotifierFactory.ctorParameters = function () { return [
        { type: a11y.InteractivityChecker },
        { type: core.NgZone },
        { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
    ]; };
    /** @nocollapse */ FocusEscapeNotifierFactory.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function FocusEscapeNotifierFactory_Factory() { return new FocusEscapeNotifierFactory(core.ɵɵinject(a11y.InteractivityChecker), core.ɵɵinject(core.NgZone), core.ɵɵinject(common.DOCUMENT)); }, token: FocusEscapeNotifierFactory, providedIn: "root" });
    return FocusEscapeNotifierFactory;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Used for rate-limiting mousemove events.
 * @type {?}
 */
var MOUSE_MOVE_THROTTLE_TIME_MS = 10;
/**
 * A directive that must be attached to enable editability on a table.
 * It is responsible for setting up delegated event handlers and providing the
 * EditEventDispatcher service for use by the other edit directives.
 */
var CdkEditable = /** @class */ (function () {
    function CdkEditable(elementRef, editEventDispatcher, focusDispatcher, ngZone) {
        this.elementRef = elementRef;
        this.editEventDispatcher = editEventDispatcher;
        this.focusDispatcher = focusDispatcher;
        this.ngZone = ngZone;
        this.destroyed = new rxjs.ReplaySubject();
    }
    /**
     * @return {?}
     */
    CdkEditable.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this._listenForTableEvents();
    };
    /**
     * @return {?}
     */
    CdkEditable.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed.next();
        this.destroyed.complete();
    };
    /**
     * @private
     * @return {?}
     */
    CdkEditable.prototype._listenForTableEvents = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var element = this.elementRef.nativeElement;
        /** @type {?} */
        var toClosest = (/**
         * @param {?} selector
         * @return {?}
         */
        function (selector) {
            return operators.map((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return closest(event.target, selector); }));
        });
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            // Track mouse movement over the table to hide/show hover content.
            rxjs.fromEvent(element, 'mouseover').pipe(toClosest(ROW_SELECTOR), operators.takeUntil(_this.destroyed)).subscribe(_this.editEventDispatcher.hovering);
            rxjs.fromEvent(element, 'mouseleave').pipe(operators.mapTo(null), operators.takeUntil(_this.destroyed)).subscribe(_this.editEventDispatcher.hovering);
            rxjs.fromEvent(element, 'mousemove').pipe(operators.throttleTime(MOUSE_MOVE_THROTTLE_TIME_MS), toClosest(ROW_SELECTOR), operators.takeUntil(_this.destroyed)).subscribe(_this.editEventDispatcher.mouseMove);
            // Track focus within the table to hide/show/make focusable hover content.
            rxjs.fromEventPattern((/**
             * @param {?} handler
             * @return {?}
             */
            function (handler) { return element.addEventListener('focus', handler, true); }), (/**
             * @param {?} handler
             * @return {?}
             */
            function (handler) { return element.removeEventListener('focus', handler, true); })).pipe(operators.takeUntil(_this.destroyed), toClosest(ROW_SELECTOR), operators.share()).subscribe(_this.editEventDispatcher.focused);
            rxjs.fromEventPattern((/**
             * @param {?} handler
             * @return {?}
             */
            function (handler) { return element.addEventListener('blur', handler, true); }), (/**
             * @param {?} handler
             * @return {?}
             */
            function (handler) { return element.removeEventListener('blur', handler, true); })).pipe(operators.takeUntil(_this.destroyed), operators.mapTo(null), operators.share()).subscribe(_this.editEventDispatcher.focused);
            // Keep track of rows within the table. This is used to know which rows with hover content
            // are first or last in the table. They are kept focusable in case focus enters from above
            // or below the table.
            _this.ngZone.onStable.pipe(operators.takeUntil(_this.destroyed), 
            // Optimization: ignore dom changes while focus is within the table as we already
            // ensure that rows above and below the focused/active row are tabbable.
            operators.withLatestFrom(_this.editEventDispatcher.editingOrFocused), operators.filter((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _ = _a[0], activeRow = _a[1];
                return activeRow == null;
            })), operators.map((/**
             * @return {?}
             */
            function () { return element.querySelectorAll(ROW_SELECTOR); })), operators.share()).subscribe(_this.editEventDispatcher.allRows);
            rxjs.fromEvent(element, 'keydown').pipe(operators.filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event.key === 'Enter'; })), toClosest(CELL_SELECTOR), operators.takeUntil(_this.destroyed)).subscribe(_this.editEventDispatcher.editing);
            // Keydown must be used here or else key autorepeat does not work properly on some platforms.
            rxjs.fromEvent(element, 'keydown')
                .pipe(operators.takeUntil(_this.destroyed))
                .subscribe(_this.focusDispatcher.keyObserver);
        }));
    };
    CdkEditable.decorators = [
        { type: core.Directive, args: [{
                    selector: 'table[editable], cdk-table[editable], mat-table[editable]',
                    providers: [EditEventDispatcher, EditServices],
                },] },
    ];
    /** @nocollapse */
    CdkEditable.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: EditEventDispatcher },
        { type: FocusDispatcher },
        { type: core.NgZone }
    ]; };
    return CdkEditable;
}());
/** @type {?} */
var POPOVER_EDIT_HOST_BINDINGS = {
    'tabIndex': '0',
    'class': 'cdk-popover-edit-cell',
    '[attr.aria-haspopup]': 'true',
};
/** @type {?} */
var POPOVER_EDIT_INPUTS = [
    'template: cdkPopoverEdit',
    'context: cdkPopoverEditContext',
    'colspan: cdkPopoverEditColspan',
];
/**
 * Attaches an ng-template to a cell and shows it when instructed to by the
 * EditEventDispatcher service.
 * Makes the cell focusable.
 * @template C
 */
var CdkPopoverEdit = /** @class */ (function () {
    function CdkPopoverEdit(services, elementRef, viewContainerRef) {
        this.services = services;
        this.elementRef = elementRef;
        this.viewContainerRef = viewContainerRef;
        /**
         * The edit lens template shown over the cell on edit.
         */
        this.template = null;
        this._colspan = {};
        this.destroyed = new rxjs.ReplaySubject();
    }
    Object.defineProperty(CdkPopoverEdit.prototype, "colspan", {
        /**
         * Specifies that the popup should cover additional table cells before and/or after
         * this one.
         */
        get: /**
         * Specifies that the popup should cover additional table cells before and/or after
         * this one.
         * @return {?}
         */
        function () {
            return this._colspan;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._colspan = value;
            // Recompute positioning when the colspan changes.
            if (this.overlayRef) {
                this.overlayRef.updatePositionStrategy(this._getPositionStrategy());
                if (this.overlayRef.hasAttached()) {
                    this._updateOverlaySize();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CdkPopoverEdit.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this._startListeningToEditEvents();
    };
    /**
     * @return {?}
     */
    CdkPopoverEdit.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed.next();
        this.destroyed.complete();
        if (this.focusTrap) {
            this.focusTrap.destroy();
            this.focusTrap = undefined;
        }
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
    };
    /**
     * @protected
     * @return {?}
     */
    CdkPopoverEdit.prototype.initFocusTrap = /**
     * @protected
     * @return {?}
     */
    function () {
        this.focusTrap = this.services.focusTrapFactory.create((/** @type {?} */ (this.overlayRef)).overlayElement);
    };
    /**
     * @protected
     * @return {?}
     */
    CdkPopoverEdit.prototype.closeEditOverlay = /**
     * @protected
     * @return {?}
     */
    function () {
        this.services.editEventDispatcher.doneEditingCell((/** @type {?} */ (this.elementRef.nativeElement)));
    };
    /**
     * @protected
     * @return {?}
     */
    CdkPopoverEdit.prototype.panelClass = /**
     * @protected
     * @return {?}
     */
    function () {
        return EDIT_PANE_CLASS;
    };
    /**
     * @private
     * @return {?}
     */
    CdkPopoverEdit.prototype._startListeningToEditEvents = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.services.editEventDispatcher.editingCell((/** @type {?} */ (this.elementRef.nativeElement)))
            .pipe(operators.takeUntil(this.destroyed))
            .subscribe((/**
         * @param {?} open
         * @return {?}
         */
        function (open) {
            if (open && _this.template) {
                if (!_this.overlayRef) {
                    _this._createEditOverlay();
                }
                _this._showEditOverlay();
            }
            else if (_this.overlayRef) {
                _this._maybeReturnFocusToCell();
                _this.overlayRef.detach();
            }
        }));
    };
    /**
     * @private
     * @return {?}
     */
    CdkPopoverEdit.prototype._createEditOverlay = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.overlayRef = this.services.overlay.create({
            disposeOnNavigation: true,
            panelClass: this.panelClass(),
            positionStrategy: this._getPositionStrategy(),
            scrollStrategy: this.services.overlay.scrollStrategies.reposition(),
            direction: this.services.directionality,
        });
        this.initFocusTrap();
        this.overlayRef.overlayElement.setAttribute('aria-role', 'dialog');
        this.overlayRef.detachments().subscribe((/**
         * @return {?}
         */
        function () { return _this.closeEditOverlay(); }));
    };
    /**
     * @private
     * @return {?}
     */
    CdkPopoverEdit.prototype._showEditOverlay = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        (/** @type {?} */ (this.overlayRef)).attach(new portal.TemplatePortal((/** @type {?} */ (this.template)), this.viewContainerRef, { $implicit: this.context }));
        // We have to defer trapping focus, because doing so too early can cause the form inside
        // the overlay to be submitted immediately if it was opened on an Enter keydown event.
        this.services.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            setTimeout((/**
             * @return {?}
             */
            function () {
                (/** @type {?} */ (_this.focusTrap)).focusInitialElement();
            }));
        }));
        // Update the size of the popup initially and on subsequent changes to
        // scroll position and viewport size.
        rxjs.merge(this.services.scrollDispatcher.scrolled(), this.services.viewportRuler.change())
            .pipe(operators.startWith(null), operators.takeUntil((/** @type {?} */ (this.overlayRef)).detachments()), operators.takeUntil(this.destroyed))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this._updateOverlaySize();
        }));
    };
    /**
     * @private
     * @return {?}
     */
    CdkPopoverEdit.prototype._getOverlayCells = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var cell = (/** @type {?} */ (closest((/** @type {?} */ (this.elementRef.nativeElement)), CELL_SELECTOR)));
        if (!this._colspan.before && !this._colspan.after) {
            return [cell];
        }
        /** @type {?} */
        var row = (/** @type {?} */ (closest((/** @type {?} */ (this.elementRef.nativeElement)), ROW_SELECTOR)));
        /** @type {?} */
        var rowCells = (/** @type {?} */ (Array.from(row.querySelectorAll(CELL_SELECTOR))));
        /** @type {?} */
        var ownIndex = rowCells.indexOf(cell);
        return rowCells.slice(ownIndex - (this._colspan.before || 0), ownIndex + (this._colspan.after || 0) + 1);
    };
    /**
     * @private
     * @return {?}
     */
    CdkPopoverEdit.prototype._getPositionStrategy = /**
     * @private
     * @return {?}
     */
    function () {
        return this.services.positionFactory.positionStrategyForCells(this._getOverlayCells());
    };
    /**
     * @private
     * @return {?}
     */
    CdkPopoverEdit.prototype._updateOverlaySize = /**
     * @private
     * @return {?}
     */
    function () {
        (/** @type {?} */ (this.overlayRef)).updateSize(this.services.positionFactory.sizeConfigForCells(this._getOverlayCells()));
    };
    /**
     * @private
     * @return {?}
     */
    CdkPopoverEdit.prototype._maybeReturnFocusToCell = /**
     * @private
     * @return {?}
     */
    function () {
        if (closest(document.activeElement, EDIT_PANE_SELECTOR) ===
            (/** @type {?} */ (this.overlayRef)).overlayElement) {
            (/** @type {?} */ (this.elementRef.nativeElement)).focus();
        }
    };
    CdkPopoverEdit.decorators = [
        { type: core.Directive, args: [{
                    selector: '[cdkPopoverEdit]:not([cdkPopoverEditTabOut])',
                    host: POPOVER_EDIT_HOST_BINDINGS,
                    inputs: POPOVER_EDIT_INPUTS,
                },] },
    ];
    /** @nocollapse */
    CdkPopoverEdit.ctorParameters = function () { return [
        { type: EditServices },
        { type: core.ElementRef },
        { type: core.ViewContainerRef }
    ]; };
    return CdkPopoverEdit;
}());
/**
 * Attaches an ng-template to a cell and shows it when instructed to by the
 * EditEventDispatcher service.
 * Makes the cell focusable.
 * @template C
 */
var CdkPopoverEditTabOut = /** @class */ (function (_super) {
    __extends(CdkPopoverEditTabOut, _super);
    function CdkPopoverEditTabOut(elementRef, viewContainerRef, services, focusEscapeNotifierFactory) {
        var _this = _super.call(this, services, elementRef, viewContainerRef) || this;
        _this.focusEscapeNotifierFactory = focusEscapeNotifierFactory;
        return _this;
    }
    /**
     * @protected
     * @return {?}
     */
    CdkPopoverEditTabOut.prototype.initFocusTrap = /**
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        this.focusTrap = this.focusEscapeNotifierFactory.create((/** @type {?} */ (this.overlayRef)).overlayElement);
        this.focusTrap.escapes().pipe(operators.takeUntil(this.destroyed)).subscribe((/**
         * @param {?} direction
         * @return {?}
         */
        function (direction) {
            if (_this.services.editEventDispatcher.editRef) {
                _this.services.editEventDispatcher.editRef.blur();
            }
            _this.services.focusDispatcher.moveFocusHorizontally((/** @type {?} */ (closest((/** @type {?} */ (_this.elementRef.nativeElement)), CELL_SELECTOR))), direction === 0 /* START */ ? -1 : 1);
            _this.closeEditOverlay();
        }));
    };
    CdkPopoverEditTabOut.decorators = [
        { type: core.Directive, args: [{
                    selector: '[cdkPopoverEdit][cdkPopoverEditTabOut]',
                    host: POPOVER_EDIT_HOST_BINDINGS,
                    inputs: POPOVER_EDIT_INPUTS,
                },] },
    ];
    /** @nocollapse */
    CdkPopoverEditTabOut.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ViewContainerRef },
        { type: EditServices },
        { type: FocusEscapeNotifierFactory }
    ]; };
    return CdkPopoverEditTabOut;
}(CdkPopoverEdit));
/**
 * A structural directive that shows its contents when the table row containing
 * it is hovered or when an element in the row has focus.
 */
var CdkRowHoverContent = /** @class */ (function () {
    function CdkRowHoverContent(services, elementRef, templateRef, viewContainerRef) {
        this.services = services;
        this.elementRef = elementRef;
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
        this.destroyed = new rxjs.ReplaySubject();
        this.viewRef = null;
    }
    /**
     * @return {?}
     */
    CdkRowHoverContent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this._row = (/** @type {?} */ (closest((/** @type {?} */ (this.elementRef.nativeElement)), ROW_SELECTOR)));
        this.services.editEventDispatcher.registerRowWithHoverContent(this._row);
        this._listenForHoverAndFocusEvents();
    };
    /**
     * @return {?}
     */
    CdkRowHoverContent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed.next();
        this.destroyed.complete();
        if (this.viewRef) {
            this.viewRef.destroy();
        }
        if (this._row) {
            this.services.editEventDispatcher.deregisterRowWithHoverContent(this._row);
        }
    };
    /**
     * Called immediately after the hover content is created and added to the dom.
     * In the CDK version, this is a noop but subclasses such as MatRowHoverContent use this
     * to prepare/style the inserted element.
     */
    /**
     * Called immediately after the hover content is created and added to the dom.
     * In the CDK version, this is a noop but subclasses such as MatRowHoverContent use this
     * to prepare/style the inserted element.
     * @protected
     * @param {?} _
     * @return {?}
     */
    CdkRowHoverContent.prototype.initElement = /**
     * Called immediately after the hover content is created and added to the dom.
     * In the CDK version, this is a noop but subclasses such as MatRowHoverContent use this
     * to prepare/style the inserted element.
     * @protected
     * @param {?} _
     * @return {?}
     */
    function (_) {
    };
    /**
     * Called when the hover content needs to be focusable to preserve a reasonable tab ordering
     * but should not yet be shown.
     */
    /**
     * Called when the hover content needs to be focusable to preserve a reasonable tab ordering
     * but should not yet be shown.
     * @protected
     * @param {?} element
     * @return {?}
     */
    CdkRowHoverContent.prototype.makeElementHiddenButFocusable = /**
     * Called when the hover content needs to be focusable to preserve a reasonable tab ordering
     * but should not yet be shown.
     * @protected
     * @param {?} element
     * @return {?}
     */
    function (element) {
        element.style.opacity = '0';
    };
    /**
     * Called when the hover content needs to be focusable to preserve a reasonable tab ordering
     * but should not yet be shown.
     */
    /**
     * Called when the hover content needs to be focusable to preserve a reasonable tab ordering
     * but should not yet be shown.
     * @protected
     * @param {?} element
     * @return {?}
     */
    CdkRowHoverContent.prototype.makeElementVisible = /**
     * Called when the hover content needs to be focusable to preserve a reasonable tab ordering
     * but should not yet be shown.
     * @protected
     * @param {?} element
     * @return {?}
     */
    function (element) {
        element.style.opacity = '';
    };
    /**
     * @private
     * @return {?}
     */
    CdkRowHoverContent.prototype._listenForHoverAndFocusEvents = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.services.editEventDispatcher.hoverOrFocusOnRow((/** @type {?} */ (this._row)))
            .pipe(operators.takeUntil(this.destroyed))
            .subscribe((/**
         * @param {?} eventState
         * @return {?}
         */
        function (eventState) {
            // When in FOCUSABLE state, add the hover content to the dom but make it transparent so
            // that it is in the tab order relative to the currently focused row.
            if (eventState === 2 /* ON */ || eventState === 1 /* FOCUSABLE */) {
                if (!_this.viewRef) {
                    _this.viewRef = _this.viewContainerRef.createEmbeddedView(_this.templateRef, {});
                    _this.initElement((/** @type {?} */ (_this.viewRef.rootNodes[0])));
                }
                else if (_this.viewContainerRef.indexOf(_this.viewRef) === -1) {
                    _this.viewContainerRef.insert((/** @type {?} */ (_this.viewRef)));
                }
                if (eventState === 2 /* ON */) {
                    _this.makeElementVisible((/** @type {?} */ (_this.viewRef.rootNodes[0])));
                }
                else {
                    _this.makeElementHiddenButFocusable((/** @type {?} */ (_this.viewRef.rootNodes[0])));
                }
            }
            else if (_this.viewRef) {
                _this.viewContainerRef.detach(_this.viewContainerRef.indexOf(_this.viewRef));
            }
        }));
    };
    CdkRowHoverContent.decorators = [
        { type: core.Directive, args: [{
                    selector: '[cdkRowHoverContent]',
                },] },
    ];
    /** @nocollapse */
    CdkRowHoverContent.ctorParameters = function () { return [
        { type: EditServices },
        { type: core.ElementRef },
        { type: core.TemplateRef },
        { type: core.ViewContainerRef }
    ]; };
    return CdkRowHoverContent;
}());
/**
 * Opens the closest edit popover to this element, whether it's associated with this exact
 * element or an ancestor element.
 */
var CdkEditOpen = /** @class */ (function () {
    function CdkEditOpen(elementRef, editEventDispatcher) {
        this.elementRef = elementRef;
        this.editEventDispatcher = editEventDispatcher;
        /** @type {?} */
        var nativeElement = elementRef.nativeElement;
        // Prevent accidental form submits.
        if (nativeElement.nodeName === 'BUTTON' && !nativeElement.getAttribute('type')) {
            nativeElement.setAttribute('type', 'button');
        }
    }
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /**
     * @param {?} evt
     * @return {?}
     */
    CdkEditOpen.prototype.openEdit = 
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        this.editEventDispatcher.editing.next(closest((/** @type {?} */ (this.elementRef.nativeElement)), CELL_SELECTOR));
        evt.stopPropagation();
    };
    CdkEditOpen.decorators = [
        { type: core.Directive, args: [{
                    selector: '[cdkEditOpen]',
                },] },
    ];
    /** @nocollapse */
    CdkEditOpen.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: EditEventDispatcher }
    ]; };
    CdkEditOpen.propDecorators = {
        openEdit: [{ type: core.HostListener, args: ['click', ['$event'],] }]
    };
    return CdkEditOpen;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var EXPORTED_DECLARATIONS = [
    CdkPopoverEdit,
    CdkPopoverEditTabOut,
    CdkRowHoverContent,
    CdkEditControl,
    CdkEditRevert,
    CdkEditClose,
    CdkEditable,
    CdkEditOpen,
];
var CdkPopoverEditModule = /** @class */ (function () {
    function CdkPopoverEditModule() {
    }
    CdkPopoverEditModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        overlay.OverlayModule,
                    ],
                    exports: EXPORTED_DECLARATIONS,
                    declarations: EXPORTED_DECLARATIONS,
                    providers: [{
                            provide: PopoverEditPositionStrategyFactory,
                            useClass: DefaultPopoverEditPositionStrategyFactory
                        }],
                },] },
    ];
    return CdkPopoverEditModule;
}());

exports._CELL_SELECTOR = CELL_SELECTOR;
exports._closest = closest;
exports.EditEventDispatcher = EditEventDispatcher;
exports.EditRef = EditRef;
exports.FocusDispatcher = FocusDispatcher;
exports.FormValueContainer = FormValueContainer;
exports.CdkEditControl = CdkEditControl;
exports.CdkEditRevert = CdkEditRevert;
exports.CdkEditClose = CdkEditClose;
exports.CdkPopoverEditModule = CdkPopoverEditModule;
exports.PopoverEditPositionStrategyFactory = PopoverEditPositionStrategyFactory;
exports.DefaultPopoverEditPositionStrategyFactory = DefaultPopoverEditPositionStrategyFactory;
exports.CdkEditable = CdkEditable;
exports.CdkPopoverEdit = CdkPopoverEdit;
exports.CdkPopoverEditTabOut = CdkPopoverEditTabOut;
exports.CdkRowHoverContent = CdkRowHoverContent;
exports.CdkEditOpen = CdkEditOpen;
exports.ɵa = EditServices;
exports.ɵb = FocusEscapeNotifierFactory;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cdk-experimental-popover-edit.umd.js.map
