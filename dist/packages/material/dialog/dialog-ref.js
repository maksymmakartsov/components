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
import { Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
// TODO(jelbourn): resizing
// Counter for unique dialog ids.
/** @type {?} */
let uniqueId = 0;
/** @enum {number} */
const MatDialogState = {
    OPEN: 0, CLOSING: 1, CLOSED: 2,
};
export { MatDialogState };
/**
 * Reference to a dialog opened via the MatDialog service.
 * @template T, R
 */
export class MatDialogRef {
    /**
     * @param {?} _overlayRef
     * @param {?} _containerInstance
     * @param {?=} _location
     * @param {?=} id
     */
    constructor(_overlayRef, _containerInstance, 
    // @breaking-change 8.0.0 `_location` parameter to be removed.
    _location, id = `mat-dialog-${uniqueId++}`) {
        this._overlayRef = _overlayRef;
        this._containerInstance = _containerInstance;
        this.id = id;
        /**
         * Whether the user is allowed to close the dialog.
         */
        this.disableClose = this._containerInstance._config.disableClose;
        /**
         * Subject for notifying the user that the dialog has finished opening.
         */
        this._afterOpened = new Subject();
        /**
         * Subject for notifying the user that the dialog has finished closing.
         */
        this._afterClosed = new Subject();
        /**
         * Subject for notifying the user that the dialog has started closing.
         */
        this._beforeClosed = new Subject();
        /**
         * Current state of the dialog.
         */
        this._state = 0 /* OPEN */;
        // Pass the id along to the container.
        _containerInstance._id = id;
        // Emit when opening animation completes
        _containerInstance._animationStateChanged.pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event.phaseName === 'done' && event.toState === 'enter')), take(1))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this._afterOpened.next();
            this._afterOpened.complete();
        }));
        // Dispose overlay when closing animation is complete
        _containerInstance._animationStateChanged.pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event.phaseName === 'done' && event.toState === 'exit')), take(1)).subscribe((/**
         * @return {?}
         */
        () => {
            clearTimeout(this._closeFallbackTimeout);
            this._overlayRef.dispose();
        }));
        _overlayRef.detachments().subscribe((/**
         * @return {?}
         */
        () => {
            this._beforeClosed.next(this._result);
            this._beforeClosed.complete();
            this._afterClosed.next(this._result);
            this._afterClosed.complete();
            this.componentInstance = (/** @type {?} */ (null));
            this._overlayRef.dispose();
        }));
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
     * Close the dialog.
     * @param {?=} dialogResult Optional result to return to the dialog opener.
     * @return {?}
     */
    close(dialogResult) {
        this._result = dialogResult;
        // Transition the backdrop in parallel to the dialog.
        this._containerInstance._animationStateChanged.pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event.phaseName === 'start')), take(1))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            this._beforeClosed.next(dialogResult);
            this._beforeClosed.complete();
            this._state = 2 /* CLOSED */;
            this._overlayRef.detachBackdrop();
            // The logic that disposes of the overlay depends on the exit animation completing, however
            // it isn't guaranteed if the parent view is destroyed while it's running. Add a fallback
            // timeout which will clean everything up if the animation hasn't fired within the specified
            // amount of time plus 100ms. We don't need to run this outside the NgZone, because for the
            // vast majority of cases the timeout will have been cleared before it has the chance to fire.
            this._closeFallbackTimeout = setTimeout((/**
             * @return {?}
             */
            () => {
                this._overlayRef.dispose();
            }), event.totalTime + 100);
        }));
        this._containerInstance._startExitAnimation();
        this._state = 1 /* CLOSING */;
    }
    /**
     * Gets an observable that is notified when the dialog is finished opening.
     * @return {?}
     */
    afterOpened() {
        return this._afterOpened.asObservable();
    }
    /**
     * Gets an observable that is notified when the dialog is finished closing.
     * @return {?}
     */
    afterClosed() {
        return this._afterClosed.asObservable();
    }
    /**
     * Gets an observable that is notified when the dialog has started closing.
     * @return {?}
     */
    beforeClosed() {
        return this._beforeClosed.asObservable();
    }
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     * @return {?}
     */
    backdropClick() {
        return this._overlayRef.backdropClick();
    }
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     * @return {?}
     */
    keydownEvents() {
        return this._overlayRef.keydownEvents();
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
     * Updates the dialog's width and height.
     * @template THIS
     * @this {THIS}
     * @param {?=} width New width of the dialog.
     * @param {?=} height New height of the dialog.
     * @return {THIS}
     */
    updateSize(width = '', height = '') {
        (/** @type {?} */ (this))._getPositionStrategy().width(width).height(height);
        (/** @type {?} */ (this))._overlayRef.updatePosition();
        return (/** @type {?} */ (this));
    }
    /**
     * Add a CSS class or an array of classes to the overlay pane.
     * @template THIS
     * @this {THIS}
     * @param {?} classes
     * @return {THIS}
     */
    addPanelClass(classes) {
        (/** @type {?} */ (this))._overlayRef.addPanelClass(classes);
        return (/** @type {?} */ (this));
    }
    /**
     * Remove a CSS class or an array of classes from the overlay pane.
     * @template THIS
     * @this {THIS}
     * @param {?} classes
     * @return {THIS}
     */
    removePanelClass(classes) {
        (/** @type {?} */ (this))._overlayRef.removePanelClass(classes);
        return (/** @type {?} */ (this));
    }
    /**
     * Gets an observable that is notified when the dialog is finished opening.
     * @deprecated Use `afterOpened` instead.
     * \@breaking-change 8.0.0
     * @return {?}
     */
    afterOpen() {
        return this.afterOpened();
    }
    /**
     * Gets an observable that is notified when the dialog has started closing.
     * @deprecated Use `beforeClosed` instead.
     * \@breaking-change 8.0.0
     * @return {?}
     */
    beforeClose() {
        return this.beforeClosed();
    }
    /**
     * Gets the current state of the dialog's lifecycle.
     * @return {?}
     */
    getState() {
        return this._state;
    }
    /**
     * Fetches the position strategy object from the overlay ref.
     * @private
     * @return {?}
     */
    _getPositionStrategy() {
        return (/** @type {?} */ (this._overlayRef.getConfig().positionStrategy));
    }
}
if (false) {
    /**
     * The instance of component opened into the dialog.
     * @type {?}
     */
    MatDialogRef.prototype.componentInstance;
    /**
     * Whether the user is allowed to close the dialog.
     * @type {?}
     */
    MatDialogRef.prototype.disableClose;
    /**
     * Subject for notifying the user that the dialog has finished opening.
     * @type {?}
     * @private
     */
    MatDialogRef.prototype._afterOpened;
    /**
     * Subject for notifying the user that the dialog has finished closing.
     * @type {?}
     * @private
     */
    MatDialogRef.prototype._afterClosed;
    /**
     * Subject for notifying the user that the dialog has started closing.
     * @type {?}
     * @private
     */
    MatDialogRef.prototype._beforeClosed;
    /**
     * Result to be passed to afterClosed.
     * @type {?}
     * @private
     */
    MatDialogRef.prototype._result;
    /**
     * Handle to the timeout that's running as a fallback in case the exit animation doesn't fire.
     * @type {?}
     * @private
     */
    MatDialogRef.prototype._closeFallbackTimeout;
    /**
     * Current state of the dialog.
     * @type {?}
     * @private
     */
    MatDialogRef.prototype._state;
    /**
     * @type {?}
     * @private
     */
    MatDialogRef.prototype._overlayRef;
    /** @type {?} */
    MatDialogRef.prototype._containerInstance;
    /** @type {?} */
    MatDialogRef.prototype.id;
}
//# sourceMappingURL=dialog-ref.js.map