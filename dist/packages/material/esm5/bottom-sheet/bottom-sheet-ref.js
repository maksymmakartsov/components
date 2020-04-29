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
import { merge, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
/**
 * Reference to a bottom sheet dispatched from the bottom sheet service.
 * @template T, R
 */
var /**
 * Reference to a bottom sheet dispatched from the bottom sheet service.
 * @template T, R
 */
MatBottomSheetRef = /** @class */ (function () {
    function MatBottomSheetRef(containerInstance, _overlayRef, 
    // @breaking-change 8.0.0 `_location` parameter to be removed.
    _location) {
        var _this = this;
        this._overlayRef = _overlayRef;
        /**
         * Subject for notifying the user that the bottom sheet has been dismissed.
         */
        this._afterDismissed = new Subject();
        /**
         * Subject for notifying the user that the bottom sheet has opened and appeared.
         */
        this._afterOpened = new Subject();
        this.containerInstance = containerInstance;
        this.disableClose = containerInstance.bottomSheetConfig.disableClose;
        // Emit when opening animation completes
        containerInstance._animationStateChanged.pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event.phaseName === 'done' && event.toState === 'visible'; })), take(1))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this._afterOpened.next();
            _this._afterOpened.complete();
        }));
        // Dispose overlay when closing animation is complete
        containerInstance._animationStateChanged
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event.phaseName === 'done' && event.toState === 'hidden'; })), take(1))
            .subscribe((/**
         * @return {?}
         */
        function () {
            clearTimeout(_this._closeFallbackTimeout);
            _overlayRef.dispose();
        }));
        _overlayRef.detachments().pipe(take(1)).subscribe((/**
         * @return {?}
         */
        function () {
            _this._afterDismissed.next(_this._result);
            _this._afterDismissed.complete();
        }));
        merge(_overlayRef.backdropClick(), _overlayRef.keydownEvents().pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event.keyCode === ESCAPE; })))).subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (!_this.disableClose &&
                (event.type !== 'keydown' || !hasModifierKey((/** @type {?} */ (event))))) {
                event.preventDefault();
                _this.dismiss();
            }
        }));
    }
    /**
     * Dismisses the bottom sheet.
     * @param result Data to be passed back to the bottom sheet opener.
     */
    /**
     * Dismisses the bottom sheet.
     * @param {?=} result Data to be passed back to the bottom sheet opener.
     * @return {?}
     */
    MatBottomSheetRef.prototype.dismiss = /**
     * Dismisses the bottom sheet.
     * @param {?=} result Data to be passed back to the bottom sheet opener.
     * @return {?}
     */
    function (result) {
        var _this = this;
        if (!this._afterDismissed.closed) {
            // Transition the backdrop in parallel to the bottom sheet.
            this.containerInstance._animationStateChanged.pipe(filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event.phaseName === 'start'; })), take(1)).subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                // The logic that disposes of the overlay depends on the exit animation completing, however
                // it isn't guaranteed if the parent view is destroyed while it's running. Add a fallback
                // timeout which will clean everything up if the animation hasn't fired within the specified
                // amount of time plus 100ms. We don't need to run this outside the NgZone, because for the
                // vast majority of cases the timeout will have been cleared before it has fired.
                _this._closeFallbackTimeout = setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this._overlayRef.dispose();
                }), event.totalTime + 100);
                _this._overlayRef.detachBackdrop();
            }));
            this._result = result;
            this.containerInstance.exit();
        }
    };
    /** Gets an observable that is notified when the bottom sheet is finished closing. */
    /**
     * Gets an observable that is notified when the bottom sheet is finished closing.
     * @return {?}
     */
    MatBottomSheetRef.prototype.afterDismissed = /**
     * Gets an observable that is notified when the bottom sheet is finished closing.
     * @return {?}
     */
    function () {
        return this._afterDismissed.asObservable();
    };
    /** Gets an observable that is notified when the bottom sheet has opened and appeared. */
    /**
     * Gets an observable that is notified when the bottom sheet has opened and appeared.
     * @return {?}
     */
    MatBottomSheetRef.prototype.afterOpened = /**
     * Gets an observable that is notified when the bottom sheet has opened and appeared.
     * @return {?}
     */
    function () {
        return this._afterOpened.asObservable();
    };
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     */
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     * @return {?}
     */
    MatBottomSheetRef.prototype.backdropClick = /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     * @return {?}
     */
    function () {
        return this._overlayRef.backdropClick();
    };
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     */
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     * @return {?}
     */
    MatBottomSheetRef.prototype.keydownEvents = /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     * @return {?}
     */
    function () {
        return this._overlayRef.keydownEvents();
    };
    return MatBottomSheetRef;
}());
/**
 * Reference to a bottom sheet dispatched from the bottom sheet service.
 * @template T, R
 */
export { MatBottomSheetRef };
if (false) {
    /**
     * Instance of the component making up the content of the bottom sheet.
     * @type {?}
     */
    MatBottomSheetRef.prototype.instance;
    /**
     * Instance of the component into which the bottom sheet content is projected.
     * \@docs-private
     * @type {?}
     */
    MatBottomSheetRef.prototype.containerInstance;
    /**
     * Whether the user is allowed to close the bottom sheet.
     * @type {?}
     */
    MatBottomSheetRef.prototype.disableClose;
    /**
     * Subject for notifying the user that the bottom sheet has been dismissed.
     * @type {?}
     * @private
     */
    MatBottomSheetRef.prototype._afterDismissed;
    /**
     * Subject for notifying the user that the bottom sheet has opened and appeared.
     * @type {?}
     * @private
     */
    MatBottomSheetRef.prototype._afterOpened;
    /**
     * Result to be passed down to the `afterDismissed` stream.
     * @type {?}
     * @private
     */
    MatBottomSheetRef.prototype._result;
    /**
     * Handle to the timeout that's running as a fallback in case the exit animation doesn't fire.
     * @type {?}
     * @private
     */
    MatBottomSheetRef.prototype._closeFallbackTimeout;
    /**
     * @type {?}
     * @private
     */
    MatBottomSheetRef.prototype._overlayRef;
}
//# sourceMappingURL=bottom-sheet-ref.js.map