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
import { Directionality } from '@angular/cdk/bidi';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, Input, Optional, Renderer2 } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CdkTree, CdkTreeNode } from './tree';
/**
 * Regex used to split a string on its CSS units.
 * @type {?}
 */
var cssUnitPattern = /([A-Za-z%]+)$/;
/**
 * Indent for the children tree dataNodes.
 * This directive will add left-padding to the node to show hierarchy.
 * @template T
 */
var CdkTreeNodePadding = /** @class */ (function () {
    function CdkTreeNodePadding(_treeNode, _tree, _renderer, _element, _dir) {
        var _this = this;
        this._treeNode = _treeNode;
        this._tree = _tree;
        this._renderer = _renderer;
        this._element = _element;
        this._dir = _dir;
        /**
         * Subject that emits when the component has been destroyed.
         */
        this._destroyed = new Subject();
        /**
         * CSS units used for the indentation value.
         */
        this.indentUnits = 'px';
        this._indent = 40;
        this._setPadding();
        if (_dir) {
            _dir.change.pipe(takeUntil(this._destroyed)).subscribe((/**
             * @return {?}
             */
            function () { return _this._setPadding(true); }));
        }
        // In Ivy the indentation binding might be set before the tree node's data has been added,
        // which means that we'll miss the first render. We have to subscribe to changes in the
        // data to ensure that everything is up to date.
        _treeNode._dataChanges.subscribe((/**
         * @return {?}
         */
        function () { return _this._setPadding(); }));
    }
    Object.defineProperty(CdkTreeNodePadding.prototype, "level", {
        /** The level of depth of the tree node. The padding will be `level * indent` pixels. */
        get: /**
         * The level of depth of the tree node. The padding will be `level * indent` pixels.
         * @return {?}
         */
        function () { return this._level; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // Set to null as the fallback value so that _setPadding can fall back to the node level if the
            // consumer set the directive as `cdkTreeNodePadding=""`. We still want to take this value if
            // they set 0 explicitly.
            this._level = (/** @type {?} */ (coerceNumberProperty(value, null)));
            this._setPadding();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkTreeNodePadding.prototype, "indent", {
        /**
         * The indent for each level. Can be a number or a CSS string.
         * Default number 40px from material design menu sub-menu spec.
         */
        get: /**
         * The indent for each level. Can be a number or a CSS string.
         * Default number 40px from material design menu sub-menu spec.
         * @return {?}
         */
        function () { return this._indent; },
        set: /**
         * @param {?} indent
         * @return {?}
         */
        function (indent) {
            /** @type {?} */
            var value = indent;
            /** @type {?} */
            var units = 'px';
            if (typeof indent === 'string') {
                /** @type {?} */
                var parts = indent.split(cssUnitPattern);
                value = parts[0];
                units = parts[1] || units;
            }
            this.indentUnits = units;
            this._indent = coerceNumberProperty(value);
            this._setPadding();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CdkTreeNodePadding.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._destroyed.next();
        this._destroyed.complete();
    };
    /** The padding indent value for the tree node. Returns a string with px numbers if not null. */
    /**
     * The padding indent value for the tree node. Returns a string with px numbers if not null.
     * @return {?}
     */
    CdkTreeNodePadding.prototype._paddingIndent = /**
     * The padding indent value for the tree node. Returns a string with px numbers if not null.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var nodeLevel = (this._treeNode.data && this._tree.treeControl.getLevel)
            ? this._tree.treeControl.getLevel(this._treeNode.data)
            : null;
        /** @type {?} */
        var level = this._level == null ? nodeLevel : this._level;
        return typeof level === 'number' ? "" + level * this._indent + this.indentUnits : null;
    };
    /**
     * @param {?=} forceChange
     * @return {?}
     */
    CdkTreeNodePadding.prototype._setPadding = /**
     * @param {?=} forceChange
     * @return {?}
     */
    function (forceChange) {
        if (forceChange === void 0) { forceChange = false; }
        /** @type {?} */
        var padding = this._paddingIndent();
        if (padding !== this._currentPadding || forceChange) {
            /** @type {?} */
            var element = this._element.nativeElement;
            /** @type {?} */
            var paddingProp = this._dir && this._dir.value === 'rtl' ? 'paddingRight' : 'paddingLeft';
            /** @type {?} */
            var resetProp = paddingProp === 'paddingLeft' ? 'paddingRight' : 'paddingLeft';
            this._renderer.setStyle(element, paddingProp, padding);
            this._renderer.setStyle(element, resetProp, null);
            this._currentPadding = padding;
        }
    };
    CdkTreeNodePadding.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkTreeNodePadding]',
                },] },
    ];
    /** @nocollapse */
    CdkTreeNodePadding.ctorParameters = function () { return [
        { type: CdkTreeNode },
        { type: CdkTree },
        { type: Renderer2 },
        { type: ElementRef },
        { type: Directionality, decorators: [{ type: Optional }] }
    ]; };
    CdkTreeNodePadding.propDecorators = {
        level: [{ type: Input, args: ['cdkTreeNodePadding',] }],
        indent: [{ type: Input, args: ['cdkTreeNodePaddingIndent',] }]
    };
    return CdkTreeNodePadding;
}());
export { CdkTreeNodePadding };
if (false) {
    /**
     * Current padding value applied to the element. Used to avoid unnecessarily hitting the DOM.
     * @type {?}
     * @private
     */
    CdkTreeNodePadding.prototype._currentPadding;
    /**
     * Subject that emits when the component has been destroyed.
     * @type {?}
     * @private
     */
    CdkTreeNodePadding.prototype._destroyed;
    /**
     * CSS units used for the indentation value.
     * @type {?}
     */
    CdkTreeNodePadding.prototype.indentUnits;
    /** @type {?} */
    CdkTreeNodePadding.prototype._level;
    /** @type {?} */
    CdkTreeNodePadding.prototype._indent;
    /**
     * @type {?}
     * @private
     */
    CdkTreeNodePadding.prototype._treeNode;
    /**
     * @type {?}
     * @private
     */
    CdkTreeNodePadding.prototype._tree;
    /**
     * @type {?}
     * @private
     */
    CdkTreeNodePadding.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    CdkTreeNodePadding.prototype._element;
    /**
     * @type {?}
     * @private
     */
    CdkTreeNodePadding.prototype._dir;
}
//# sourceMappingURL=padding.js.map