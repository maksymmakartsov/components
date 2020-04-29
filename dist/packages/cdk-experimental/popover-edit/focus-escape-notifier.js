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
import { Inject, Injectable, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FocusTrap, InteractivityChecker } from '@angular/cdk/a11y';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
import * as i2 from "@angular/common";
/** @enum {number} */
const FocusEscapeNotifierDirection = {
    START: 0,
    END: 1,
};
export { FocusEscapeNotifierDirection };
/**
 * Like FocusTrap, but rather than trapping focus within a dom region, notifies subscribers when
 * focus leaves the region.
 */
export class FocusEscapeNotifier extends FocusTrap {
    /**
     * @param {?} element
     * @param {?} checker
     * @param {?} ngZone
     * @param {?} document
     */
    constructor(element, checker, ngZone, document) {
        super(element, checker, ngZone, document, true /* deferAnchors */);
        this._escapeSubject = new Subject();
        // The focus trap adds "anchors" at the beginning and end of a trapped region that redirect
        // focus. We override that redirect behavior here with simply emitting on a stream.
        this.startAnchorListener = (/**
         * @return {?}
         */
        () => {
            this._escapeSubject.next(0 /* START */);
            return true;
        });
        this.endAnchorListener = (/**
         * @return {?}
         */
        () => {
            this._escapeSubject.next(1 /* END */);
            return true;
        });
        this.attachAnchors();
    }
    /**
     * @return {?}
     */
    escapes() {
        return this._escapeSubject.asObservable();
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    FocusEscapeNotifier.prototype._escapeSubject;
}
/**
 * Factory that allows easy instantiation of focus escape notifiers.
 */
export class FocusEscapeNotifierFactory {
    /**
     * @param {?} _checker
     * @param {?} _ngZone
     * @param {?} _document
     */
    constructor(_checker, _ngZone, _document) {
        this._checker = _checker;
        this._ngZone = _ngZone;
        this._document = _document;
    }
    /**
     * Creates a focus escape notifier region around the given element.
     * @param {?} element The element around which focus will be monitored.
     * @return {?} The created focus escape notifier instance.
     */
    create(element) {
        return new FocusEscapeNotifier(element, this._checker, this._ngZone, this._document);
    }
}
FocusEscapeNotifierFactory.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */
FocusEscapeNotifierFactory.ctorParameters = () => [
    { type: InteractivityChecker },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ FocusEscapeNotifierFactory.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function FocusEscapeNotifierFactory_Factory() { return new FocusEscapeNotifierFactory(i0.ɵɵinject(i1.InteractivityChecker), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i2.DOCUMENT)); }, token: FocusEscapeNotifierFactory, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    FocusEscapeNotifierFactory.prototype._document;
    /**
     * @type {?}
     * @private
     */
    FocusEscapeNotifierFactory.prototype._checker;
    /**
     * @type {?}
     * @private
     */
    FocusEscapeNotifierFactory.prototype._ngZone;
}
//# sourceMappingURL=focus-escape-notifier.js.map