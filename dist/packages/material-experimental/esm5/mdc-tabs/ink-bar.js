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
import { MDCSlidingTabIndicatorFoundation } from '@material/tab-indicator';
/**
 * Item inside a tab header relative to which the ink bar can be aligned.
 * \@docs-private
 * @record
 */
export function MatInkBarItem() { }
if (false) {
    /** @type {?} */
    MatInkBarItem.prototype._foundation;
    /** @type {?} */
    MatInkBarItem.prototype.elementRef;
}
/**
 * Abstraction around the MDC tab indicator that manages the ink bar of a tab header.
 * \@docs-private
 */
var /**
 * Abstraction around the MDC tab indicator that manages the ink bar of a tab header.
 * \@docs-private
 */
MatInkBar = /** @class */ (function () {
    function MatInkBar(_items) {
        this._items = _items;
    }
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
        this._items.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item._foundation.deactivate(); }));
    };
    /** Aligns the ink bar to a DOM node. */
    /**
     * Aligns the ink bar to a DOM node.
     * @param {?} element
     * @return {?}
     */
    MatInkBar.prototype.alignToElement = /**
     * Aligns the ink bar to a DOM node.
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var correspondingItem = this._items.find((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.elementRef.nativeElement === element; }));
        /** @type {?} */
        var currentItem = this._currentItem;
        if (currentItem) {
            currentItem._foundation.deactivate();
        }
        if (correspondingItem) {
            /** @type {?} */
            var clientRect = currentItem ?
                currentItem._foundation.computeContentClientRect() : undefined;
            // The MDC indicator won't animate unless we give it the `ClientRect` of the previous item.
            correspondingItem._foundation.activate(clientRect);
            this._currentItem = correspondingItem;
        }
    };
    return MatInkBar;
}());
/**
 * Abstraction around the MDC tab indicator that manages the ink bar of a tab header.
 * \@docs-private
 */
export { MatInkBar };
if (false) {
    /**
     * Item to which the ink bar is aligned currently.
     * @type {?}
     * @private
     */
    MatInkBar.prototype._currentItem;
    /**
     * @type {?}
     * @private
     */
    MatInkBar.prototype._items;
}
/**
 * Implementation of MDC's sliding tab indicator foundation.
 * \@docs-private
 */
var /**
 * Implementation of MDC's sliding tab indicator foundation.
 * \@docs-private
 */
MatInkBarFoundation = /** @class */ (function () {
    function MatInkBarFoundation(elementRef, document) {
        var _this = this;
        this._adapter = {
            addClass: (/**
             * @param {?} className
             * @return {?}
             */
            function (className) {
                if (!_this._destroyed) {
                    _this._element.classList.add(className);
                }
            }),
            removeClass: (/**
             * @param {?} className
             * @return {?}
             */
            function (className) {
                if (!_this._destroyed) {
                    _this._element.classList.remove(className);
                }
            }),
            setContentStyleProperty: (/**
             * @param {?} propName
             * @param {?} value
             * @return {?}
             */
            function (propName, value) {
                _this._indicatorContent.style.setProperty(propName, value);
            }),
            computeContentClientRect: (/**
             * @return {?}
             */
            function () {
                // `getBoundingClientRect` isn't available on the server.
                return _this._destroyed || !_this._indicatorContent.getBoundingClientRect ? {
                    width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0
                } : _this._indicatorContent.getBoundingClientRect();
            })
        };
        this._element = elementRef.nativeElement;
        this._foundation = new MDCSlidingTabIndicatorFoundation(this._adapter);
        this._createIndicator(document);
    }
    /** Aligns the ink bar to the current item. */
    /**
     * Aligns the ink bar to the current item.
     * @param {?=} clientRect
     * @return {?}
     */
    MatInkBarFoundation.prototype.activate = /**
     * Aligns the ink bar to the current item.
     * @param {?=} clientRect
     * @return {?}
     */
    function (clientRect) {
        this._foundation.activate(clientRect);
    };
    /** Removes the ink bar from the current item. */
    /**
     * Removes the ink bar from the current item.
     * @return {?}
     */
    MatInkBarFoundation.prototype.deactivate = /**
     * Removes the ink bar from the current item.
     * @return {?}
     */
    function () {
        this._foundation.deactivate();
    };
    /** Gets the ClientRect of the indicator. */
    /**
     * Gets the ClientRect of the indicator.
     * @return {?}
     */
    MatInkBarFoundation.prototype.computeContentClientRect = /**
     * Gets the ClientRect of the indicator.
     * @return {?}
     */
    function () {
        return this._foundation.computeContentClientRect();
    };
    /** Initializes the foundation. */
    /**
     * Initializes the foundation.
     * @return {?}
     */
    MatInkBarFoundation.prototype.init = /**
     * Initializes the foundation.
     * @return {?}
     */
    function () {
        this._foundation.init();
    };
    /** Destroys the foundation. */
    /**
     * Destroys the foundation.
     * @return {?}
     */
    MatInkBarFoundation.prototype.destroy = /**
     * Destroys the foundation.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var indicator = this._indicator;
        if (indicator.parentNode) {
            indicator.parentNode.removeChild(indicator);
        }
        this._element = this._indicator = this._indicatorContent = (/** @type {?} */ (null));
        this._foundation.destroy();
        this._destroyed = true;
    };
    /**
     * @private
     * @param {?} document
     * @return {?}
     */
    MatInkBarFoundation.prototype._createIndicator = /**
     * @private
     * @param {?} document
     * @return {?}
     */
    function (document) {
        if (!this._indicator) {
            /** @type {?} */
            var indicator = this._indicator = document.createElement('span');
            /** @type {?} */
            var content = this._indicatorContent = document.createElement('span');
            indicator.className = 'mdc-tab-indicator';
            content.className = 'mdc-tab-indicator__content mdc-tab-indicator__content--underline';
            indicator.appendChild(content);
            this._element.appendChild(indicator);
        }
    };
    return MatInkBarFoundation;
}());
/**
 * Implementation of MDC's sliding tab indicator foundation.
 * \@docs-private
 */
export { MatInkBarFoundation };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MatInkBarFoundation.prototype._destroyed;
    /**
     * @type {?}
     * @private
     */
    MatInkBarFoundation.prototype._foundation;
    /**
     * @type {?}
     * @private
     */
    MatInkBarFoundation.prototype._element;
    /**
     * @type {?}
     * @private
     */
    MatInkBarFoundation.prototype._indicator;
    /**
     * @type {?}
     * @private
     */
    MatInkBarFoundation.prototype._indicatorContent;
    /**
     * @type {?}
     * @private
     */
    MatInkBarFoundation.prototype._adapter;
}
//# sourceMappingURL=ink-bar.js.map