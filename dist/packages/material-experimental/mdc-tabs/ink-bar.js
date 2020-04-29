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
export class MatInkBar {
    /**
     * @param {?} _items
     */
    constructor(_items) {
        this._items = _items;
    }
    /**
     * Hides the ink bar.
     * @return {?}
     */
    hide() {
        this._items.forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => item._foundation.deactivate()));
    }
    /**
     * Aligns the ink bar to a DOM node.
     * @param {?} element
     * @return {?}
     */
    alignToElement(element) {
        /** @type {?} */
        const correspondingItem = this._items.find((/**
         * @param {?} item
         * @return {?}
         */
        item => item.elementRef.nativeElement === element));
        /** @type {?} */
        const currentItem = this._currentItem;
        if (currentItem) {
            currentItem._foundation.deactivate();
        }
        if (correspondingItem) {
            /** @type {?} */
            const clientRect = currentItem ?
                currentItem._foundation.computeContentClientRect() : undefined;
            // The MDC indicator won't animate unless we give it the `ClientRect` of the previous item.
            correspondingItem._foundation.activate(clientRect);
            this._currentItem = correspondingItem;
        }
    }
}
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
export class MatInkBarFoundation {
    /**
     * @param {?} elementRef
     * @param {?} document
     */
    constructor(elementRef, document) {
        this._adapter = {
            addClass: (/**
             * @param {?} className
             * @return {?}
             */
            className => {
                if (!this._destroyed) {
                    this._element.classList.add(className);
                }
            }),
            removeClass: (/**
             * @param {?} className
             * @return {?}
             */
            className => {
                if (!this._destroyed) {
                    this._element.classList.remove(className);
                }
            }),
            setContentStyleProperty: (/**
             * @param {?} propName
             * @param {?} value
             * @return {?}
             */
            (propName, value) => {
                this._indicatorContent.style.setProperty(propName, value);
            }),
            computeContentClientRect: (/**
             * @return {?}
             */
            () => {
                // `getBoundingClientRect` isn't available on the server.
                return this._destroyed || !this._indicatorContent.getBoundingClientRect ? {
                    width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0
                } : this._indicatorContent.getBoundingClientRect();
            })
        };
        this._element = elementRef.nativeElement;
        this._foundation = new MDCSlidingTabIndicatorFoundation(this._adapter);
        this._createIndicator(document);
    }
    /**
     * Aligns the ink bar to the current item.
     * @param {?=} clientRect
     * @return {?}
     */
    activate(clientRect) {
        this._foundation.activate(clientRect);
    }
    /**
     * Removes the ink bar from the current item.
     * @return {?}
     */
    deactivate() {
        this._foundation.deactivate();
    }
    /**
     * Gets the ClientRect of the indicator.
     * @return {?}
     */
    computeContentClientRect() {
        return this._foundation.computeContentClientRect();
    }
    /**
     * Initializes the foundation.
     * @return {?}
     */
    init() {
        this._foundation.init();
    }
    /**
     * Destroys the foundation.
     * @return {?}
     */
    destroy() {
        /** @type {?} */
        const indicator = this._indicator;
        if (indicator.parentNode) {
            indicator.parentNode.removeChild(indicator);
        }
        this._element = this._indicator = this._indicatorContent = (/** @type {?} */ (null));
        this._foundation.destroy();
        this._destroyed = true;
    }
    /**
     * @private
     * @param {?} document
     * @return {?}
     */
    _createIndicator(document) {
        if (!this._indicator) {
            /** @type {?} */
            const indicator = this._indicator = document.createElement('span');
            /** @type {?} */
            const content = this._indicatorContent = document.createElement('span');
            indicator.className = 'mdc-tab-indicator';
            content.className = 'mdc-tab-indicator__content mdc-tab-indicator__content--underline';
            indicator.appendChild(content);
            this._element.appendChild(indicator);
        }
    }
}
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