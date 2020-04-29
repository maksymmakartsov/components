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
import { Inject, Injectable, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FocusTrap, InteractivityChecker } from '@angular/cdk/a11y';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
import * as i2 from "@angular/common";
/** @enum {number} */
var FocusEscapeNotifierDirection = {
    START: 0,
    END: 1,
};
export { FocusEscapeNotifierDirection };
/**
 * Like FocusTrap, but rather than trapping focus within a dom region, notifies subscribers when
 * focus leaves the region.
 */
var /**
 * Like FocusTrap, but rather than trapping focus within a dom region, notifies subscribers when
 * focus leaves the region.
 */
FocusEscapeNotifier = /** @class */ (function (_super) {
    tslib_1.__extends(FocusEscapeNotifier, _super);
    function FocusEscapeNotifier(element, checker, ngZone, document) {
        var _this = _super.call(this, element, checker, ngZone, document, true /* deferAnchors */) || this;
        _this._escapeSubject = new Subject();
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
}(FocusTrap));
/**
 * Like FocusTrap, but rather than trapping focus within a dom region, notifies subscribers when
 * focus leaves the region.
 */
export { FocusEscapeNotifier };
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
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    FocusEscapeNotifierFactory.ctorParameters = function () { return [
        { type: InteractivityChecker },
        { type: NgZone },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    /** @nocollapse */ FocusEscapeNotifierFactory.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function FocusEscapeNotifierFactory_Factory() { return new FocusEscapeNotifierFactory(i0.ɵɵinject(i1.InteractivityChecker), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i2.DOCUMENT)); }, token: FocusEscapeNotifierFactory, providedIn: "root" });
    return FocusEscapeNotifierFactory;
}());
export { FocusEscapeNotifierFactory };
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