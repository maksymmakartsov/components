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
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { map, filter } from 'rxjs/operators';
/**
 * Unique id for the created dialog.
 * @type {?}
 */
let uniqueId = 0;
/**
 * Reference to a dialog opened via the Dialog service.
 * @template T, R
 */
export class DialogRef {
    /**
     * @param {?} _overlayRef
     * @param {?} _containerInstance
     * @param {?=} id
     */
    constructor(_overlayRef, _containerInstance, id = `dialog-${uniqueId++}`) {
        this._overlayRef = _overlayRef;
        this._containerInstance = _containerInstance;
        this.id = id;
        // If the dialog has a backdrop, handle clicks from the backdrop.
        if (_containerInstance._config.hasBackdrop) {
            _overlayRef.backdropClick().subscribe((/**
             * @return {?}
             */
            () => {
                if (!this.disableClose) {
                    this.close();
                }
            }));
        }
        this.beforeClosed().subscribe((/**
         * @return {?}
         */
        () => {
            this._overlayRef.detachBackdrop();
        }));
        this.afterClosed().subscribe((/**
         * @return {?}
         */
        () => {
            this._overlayRef.detach();
            this._overlayRef.dispose();
            this.componentInstance = (/** @type {?} */ (null));
        }));
        // Close when escape keydown event occurs
        _overlayRef.keydownEvents()
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            return event.keyCode === ESCAPE && !this.disableClose && !hasModifierKey(event);
        })))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            event.preventDefault();
            this.close();
        }));
    }
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     * @return {?}
     */
    backdropClick() {
        return this._overlayRef.backdropClick();
    }
    /**
     * Close the dialog.
     * @param {?=} dialogResult Optional result to return to the dialog opener.
     * @return {?}
     */
    close(dialogResult) {
        this._result = dialogResult;
        this._containerInstance._startExiting();
    }
    /**
     * Updates the dialog's position.
     * @template THIS
     * @this {THIS}
     * @param {?=} position New dialog position.
     * @return {THIS}
     */
    updatePosition(position) {
        /** @type {?} */
        let strategy = (/** @type {?} */ (this))._getPositionStrategy();
        if (position && (position.left || position.right)) {
            position.left ? strategy.left(position.left) : strategy.right(position.right);
        }
        else {
            strategy.centerHorizontally();
        }
        if (position && (position.top || position.bottom)) {
            position.top ? strategy.top(position.top) : strategy.bottom(position.bottom);
        }
        else {
            strategy.centerVertically();
        }
        (/** @type {?} */ (this))._overlayRef.updatePosition();
        return (/** @type {?} */ (this));
    }
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     * @return {?}
     */
    keydownEvents() {
        return this._overlayRef.keydownEvents();
    }
    /**
     * Updates the dialog's width and height, defined, min and max.
     * @template THIS
     * @this {THIS}
     * @param {?} size New size for the overlay.
     * @return {THIS}
     */
    updateSize(size) {
        if (size.width) {
            (/** @type {?} */ (this))._getPositionStrategy().width(size.width.toString());
        }
        if (size.height) {
            (/** @type {?} */ (this))._getPositionStrategy().height(size.height.toString());
        }
        (/** @type {?} */ (this))._overlayRef.updateSize(size);
        (/** @type {?} */ (this))._overlayRef.updatePosition();
        return (/** @type {?} */ (this));
    }
    /**
     * Fetches the position strategy object from the overlay ref.
     * @private
     * @return {?}
     */
    _getPositionStrategy() {
        return (/** @type {?} */ (this._overlayRef.getConfig().positionStrategy));
    }
    /**
     * Gets an observable that emits when dialog begins opening.
     * @return {?}
     */
    beforeOpened() {
        return this._containerInstance._beforeEnter.asObservable();
    }
    /**
     * Gets an observable that emits when dialog is finished opening.
     * @return {?}
     */
    afterOpened() {
        return this._containerInstance._afterEnter.asObservable();
    }
    /**
     * Gets an observable that emits when dialog begins closing.
     * @return {?}
     */
    beforeClosed() {
        return this._containerInstance._beforeExit.pipe(map((/**
         * @return {?}
         */
        () => this._result)));
    }
    /**
     * Gets an observable that emits when dialog is finished closing.
     * @return {?}
     */
    afterClosed() {
        return this._containerInstance._afterExit.pipe(map((/**
         * @return {?}
         */
        () => this._result)));
    }
}
if (false) {
    /**
     * The instance of the component in the dialog.
     * @type {?}
     */
    DialogRef.prototype.componentInstance;
    /**
     * Whether the user is allowed to close the dialog.
     * @type {?}
     */
    DialogRef.prototype.disableClose;
    /**
     * Result to be passed to afterClosed.
     * @type {?}
     * @private
     */
    DialogRef.prototype._result;
    /** @type {?} */
    DialogRef.prototype._overlayRef;
    /**
     * @type {?}
     * @protected
     */
    DialogRef.prototype._containerInstance;
    /** @type {?} */
    DialogRef.prototype.id;
}
//# sourceMappingURL=dialog-ref.js.map