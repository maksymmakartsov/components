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
import { Directive, ElementRef, Inject, InjectionToken, NgZone, Optional } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
/**
 * Interface for a a MatInkBar positioner method, defining the positioning and width of the ink
 * bar in a set of tabs.
 * @record
 */
export function _MatInkBarPositioner() { }
/**
 * Injection token for the MatInkBar's Positioner.
 * @type {?}
 */
export var _MAT_INK_BAR_POSITIONER = new InjectionToken('MatInkBarPositioner', {
    providedIn: 'root',
    factory: _MAT_INK_BAR_POSITIONER_FACTORY
});
/**
 * The default positioner function for the MatInkBar.
 * \@docs-private
 * @return {?}
 */
export function _MAT_INK_BAR_POSITIONER_FACTORY() {
    /** @type {?} */
    var method = (/**
     * @param {?} element
     * @return {?}
     */
    function (element) { return ({
        left: element ? (element.offsetLeft || 0) + 'px' : '0',
        width: element ? (element.offsetWidth || 0) + 'px' : '0',
    }); });
    return method;
}
/**
 * The ink-bar is used to display and animate the line underneath the current active tab label.
 * \@docs-private
 */
var MatInkBar = /** @class */ (function () {
    function MatInkBar(_elementRef, _ngZone, _inkBarPositioner, _animationMode) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._inkBarPositioner = _inkBarPositioner;
        this._animationMode = _animationMode;
    }
    /**
     * Calculates the styles from the provided element in order to align the ink-bar to that element.
     * Shows the ink bar if previously set as hidden.
     * @param element
     */
    /**
     * Calculates the styles from the provided element in order to align the ink-bar to that element.
     * Shows the ink bar if previously set as hidden.
     * @param {?} element
     * @return {?}
     */
    MatInkBar.prototype.alignToElement = /**
     * Calculates the styles from the provided element in order to align the ink-bar to that element.
     * Shows the ink bar if previously set as hidden.
     * @param {?} element
     * @return {?}
     */
    function (element) {
        var _this = this;
        this.show();
        if (typeof requestAnimationFrame !== 'undefined') {
            this._ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                requestAnimationFrame((/**
                 * @return {?}
                 */
                function () { return _this._setStyles(element); }));
            }));
        }
        else {
            this._setStyles(element);
        }
    };
    /** Shows the ink bar. */
    /**
     * Shows the ink bar.
     * @return {?}
     */
    MatInkBar.prototype.show = /**
     * Shows the ink bar.
     * @return {?}
     */
    function () {
        this._elementRef.nativeElement.style.visibility = 'visible';
    };
    /** Hides the ink bar. */
    /**
     * Hides the ink bar.
     * @return {?}
     */
    MatInkBar.prototype.hide = /**
     * Hides the ink bar.
     * @return {?}
     */
    function () {
        this._elementRef.nativeElement.style.visibility = 'hidden';
    };
    /**
     * Sets the proper styles to the ink bar element.
     * @param element
     */
    /**
     * Sets the proper styles to the ink bar element.
     * @private
     * @param {?} element
     * @return {?}
     */
    MatInkBar.prototype._setStyles = /**
     * Sets the proper styles to the ink bar element.
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var positions = this._inkBarPositioner(element);
        /** @type {?} */
        var inkBar = this._elementRef.nativeElement;
        inkBar.style.left = positions.left;
        inkBar.style.width = positions.width;
    };
    MatInkBar.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-ink-bar',
                    host: {
                        'class': 'mat-ink-bar',
                        '[class._mat-animation-noopable]': "_animationMode === 'NoopAnimations'",
                    },
                },] },
    ];
    /** @nocollapse */
    MatInkBar.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: undefined, decorators: [{ type: Inject, args: [_MAT_INK_BAR_POSITIONER,] }] },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
    ]; };
    return MatInkBar;
}());
export { MatInkBar };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MatInkBar.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    MatInkBar.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    MatInkBar.prototype._inkBarPositioner;
    /** @type {?} */
    MatInkBar.prototype._animationMode;
}
//# sourceMappingURL=ink-bar.js.map