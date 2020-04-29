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
import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, forwardRef, Inject, Input, NgZone, Optional, QueryList, ViewChild, ViewEncapsulation, } from '@angular/core';
import { MAT_RIPPLE_GLOBAL_OPTIONS, mixinDisabled, mixinDisableRipple, mixinTabIndex, RippleRenderer, } from '@angular/material/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MatInkBar } from '../ink-bar';
import { MatPaginatedTabHeader } from '../paginated-tab-header';
import { startWith, takeUntil } from 'rxjs/operators';
/**
 * Base class with all of the `MatTabNav` functionality.
 * \@docs-private
 * @abstract
 */
var _MatTabNavBase = /** @class */ (function (_super) {
    tslib_1.__extends(_MatTabNavBase, _super);
    function _MatTabNavBase(elementRef, dir, ngZone, changeDetectorRef, viewportRuler, 
    /**
     * @deprecated @breaking-change 9.0.0 `platform` parameter to become required.
     */
    platform, animationMode) {
        var _this = _super.call(this, elementRef, changeDetectorRef, viewportRuler, dir, ngZone, platform, animationMode) || this;
        _this._disableRipple = false;
        /**
         * Theme color of the nav bar.
         */
        _this.color = 'primary';
        return _this;
    }
    Object.defineProperty(_MatTabNavBase.prototype, "backgroundColor", {
        /** Background color of the tab nav. */
        get: /**
         * Background color of the tab nav.
         * @return {?}
         */
        function () { return this._backgroundColor; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var classList = this._elementRef.nativeElement.classList;
            classList.remove("mat-background-" + this.backgroundColor);
            if (value) {
                classList.add("mat-background-" + value);
            }
            this._backgroundColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_MatTabNavBase.prototype, "disableRipple", {
        /** Whether the ripple effect is disabled or not. */
        get: /**
         * Whether the ripple effect is disabled or not.
         * @return {?}
         */
        function () { return this._disableRipple; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._disableRipple = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * @protected
     * @return {?}
     */
    _MatTabNavBase.prototype._itemSelected = /**
     * @protected
     * @return {?}
     */
    function () {
        // noop
    };
    /**
     * @return {?}
     */
    _MatTabNavBase.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // We need this to run before the `changes` subscription in parent to ensure that the
        // selectedIndex is up-to-date by the time the super class starts looking for it.
        this._items.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.updateActiveLink();
        }));
        _super.prototype.ngAfterContentInit.call(this);
    };
    /**
     * Notifies the component that the active link has been changed.
     * @breaking-change 8.0.0 `element` parameter to be removed.
     */
    /**
     * Notifies the component that the active link has been changed.
     * \@breaking-change 8.0.0 `element` parameter to be removed.
     * @param {?=} _element
     * @return {?}
     */
    _MatTabNavBase.prototype.updateActiveLink = /**
     * Notifies the component that the active link has been changed.
     * \@breaking-change 8.0.0 `element` parameter to be removed.
     * @param {?=} _element
     * @return {?}
     */
    function (_element) {
        if (!this._items) {
            return;
        }
        /** @type {?} */
        var items = this._items.toArray();
        for (var i = 0; i < items.length; i++) {
            if (items[i].active) {
                this.selectedIndex = i;
                this._changeDetectorRef.markForCheck();
                return;
            }
        }
        // The ink bar should hide itself if no items are active.
        this.selectedIndex = -1;
        this._inkBar.hide();
    };
    _MatTabNavBase.decorators = [
        { type: Directive, args: [{
                    // TODO(crisbeto): this selector can be removed when we update to Angular 9.0.
                    selector: 'do-not-use-abstract-mat-tab-nav-base'
                },] },
    ];
    /** @nocollapse */
    _MatTabNavBase.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: ViewportRuler },
        { type: Platform, decorators: [{ type: Optional }] },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
    ]; };
    _MatTabNavBase.propDecorators = {
        backgroundColor: [{ type: Input }],
        disableRipple: [{ type: Input }],
        color: [{ type: Input }]
    };
    return _MatTabNavBase;
}(MatPaginatedTabHeader));
export { _MatTabNavBase };
if (false) {
    /**
     * Query list of all tab links of the tab navigation.
     * @type {?}
     */
    _MatTabNavBase.prototype._items;
    /**
     * @type {?}
     * @private
     */
    _MatTabNavBase.prototype._backgroundColor;
    /**
     * @type {?}
     * @private
     */
    _MatTabNavBase.prototype._disableRipple;
    /**
     * Theme color of the nav bar.
     * @type {?}
     */
    _MatTabNavBase.prototype.color;
}
/**
 * Navigation component matching the styles of the tab group header.
 * Provides anchored navigation with animated ink bar.
 */
var MatTabNav = /** @class */ (function (_super) {
    tslib_1.__extends(MatTabNav, _super);
    function MatTabNav(elementRef, dir, ngZone, changeDetectorRef, viewportRuler, 
    /**
     * @deprecated @breaking-change 9.0.0 `platform` parameter to become required.
     */
    platform, animationMode) {
        return _super.call(this, elementRef, dir, ngZone, changeDetectorRef, viewportRuler, platform, animationMode) || this;
    }
    MatTabNav.decorators = [
        { type: Component, args: [{selector: '[mat-tab-nav-bar]',
                    exportAs: 'matTabNavBar, matTabNav',
                    inputs: ['color'],
                    template: "<div class=\"mat-tab-header-pagination mat-tab-header-pagination-before mat-elevation-z4\" #previousPaginator aria-hidden=\"true\" mat-ripple [matRippleDisabled]=\"_disableScrollBefore || disableRipple\" [class.mat-tab-header-pagination-disabled]=\"_disableScrollBefore\" (click)=\"_handlePaginatorClick('before')\" (mousedown)=\"_handlePaginatorPress('before')\" (touchend)=\"_stopInterval()\"><div class=\"mat-tab-header-pagination-chevron\"></div></div><div class=\"mat-tab-link-container\" #tabListContainer (keydown)=\"_handleKeydown($event)\"><div class=\"mat-tab-list\" #tabList (cdkObserveContent)=\"_onContentChanges()\"><div class=\"mat-tab-links\"><ng-content></ng-content></div><mat-ink-bar></mat-ink-bar></div></div><div class=\"mat-tab-header-pagination mat-tab-header-pagination-after mat-elevation-z4\" #nextPaginator aria-hidden=\"true\" mat-ripple [matRippleDisabled]=\"_disableScrollAfter || disableRipple\" [class.mat-tab-header-pagination-disabled]=\"_disableScrollAfter\" (mousedown)=\"_handlePaginatorPress('after')\" (click)=\"_handlePaginatorClick('after')\" (touchend)=\"_stopInterval()\"><div class=\"mat-tab-header-pagination-chevron\"></div></div>",
                    styles: [".mat-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mat-tab-header-pagination{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:transparent;touch-action:none}.mat-tab-header-pagination-controls-enabled .mat-tab-header-pagination{display:flex}.mat-tab-header-pagination-before,.mat-tab-header-rtl .mat-tab-header-pagination-after{padding-left:4px}.mat-tab-header-pagination-before .mat-tab-header-pagination-chevron,.mat-tab-header-rtl .mat-tab-header-pagination-after .mat-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-tab-header-pagination-after,.mat-tab-header-rtl .mat-tab-header-pagination-before{padding-right:4px}.mat-tab-header-pagination-after .mat-tab-header-pagination-chevron,.mat-tab-header-rtl .mat-tab-header-pagination-before .mat-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:'';height:8px;width:8px}.mat-tab-header-pagination-disabled{box-shadow:none;cursor:default}.mat-tab-list{flex-grow:1;position:relative;transition:transform .5s cubic-bezier(.35,0,.25,1)}.mat-tab-links{display:flex}[mat-align-tabs=center] .mat-tab-links{justify-content:center}[mat-align-tabs=end] .mat-tab-links{justify-content:flex-end}.mat-ink-bar{position:absolute;bottom:0;height:2px;transition:.5s cubic-bezier(.35,0,.25,1)}._mat-animation-noopable.mat-ink-bar{transition:none;animation:none}.mat-tab-group-inverted-header .mat-ink-bar{bottom:auto;top:0}@media (-ms-high-contrast:active){.mat-ink-bar{outline:solid 2px;height:0}}.mat-tab-link-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mat-tab-link{height:48px;padding:0 24px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:inline-flex;justify-content:center;align-items:center;white-space:nowrap;vertical-align:top;text-decoration:none;position:relative;overflow:hidden;-webkit-tap-highlight-color:transparent}.mat-tab-link:focus{outline:0}.mat-tab-link:focus:not(.mat-tab-disabled){opacity:1}@media (-ms-high-contrast:active){.mat-tab-link:focus{outline:dotted 2px}}.mat-tab-link.mat-tab-disabled{cursor:default}@media (-ms-high-contrast:active){.mat-tab-link.mat-tab-disabled{opacity:.5}}.mat-tab-link .mat-tab-label-content{display:inline-flex;justify-content:center;align-items:center;white-space:nowrap}@media (-ms-high-contrast:active){.mat-tab-link{opacity:1}}[mat-stretch-tabs] .mat-tab-link{flex-basis:0;flex-grow:1}.mat-tab-link.mat-tab-disabled{pointer-events:none}@media (max-width:599px){.mat-tab-link{min-width:72px}}"],
                    host: {
                        'class': 'mat-tab-nav-bar mat-tab-header',
                        '[class.mat-tab-header-pagination-controls-enabled]': '_showPaginationControls',
                        '[class.mat-tab-header-rtl]': "_getLayoutDirection() == 'rtl'",
                        '[class.mat-primary]': 'color !== "warn" && color !== "accent"',
                        '[class.mat-accent]': 'color === "accent"',
                        '[class.mat-warn]': 'color === "warn"',
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatTabNav.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: ViewportRuler },
        { type: Platform, decorators: [{ type: Optional }] },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
    ]; };
    MatTabNav.propDecorators = {
        _items: [{ type: ContentChildren, args: [forwardRef((/**
                     * @return {?}
                     */
                    function () { return MatTabLink; })), { descendants: true },] }],
        _inkBar: [{ type: ViewChild, args: [MatInkBar, { static: true },] }],
        _tabListContainer: [{ type: ViewChild, args: ['tabListContainer', { static: true },] }],
        _tabList: [{ type: ViewChild, args: ['tabList', { static: true },] }],
        _nextPaginator: [{ type: ViewChild, args: ['nextPaginator', { static: false },] }],
        _previousPaginator: [{ type: ViewChild, args: ['previousPaginator', { static: false },] }]
    };
    return MatTabNav;
}(_MatTabNavBase));
export { MatTabNav };
if (false) {
    /** @type {?} */
    MatTabNav.prototype._items;
    /** @type {?} */
    MatTabNav.prototype._inkBar;
    /** @type {?} */
    MatTabNav.prototype._tabListContainer;
    /** @type {?} */
    MatTabNav.prototype._tabList;
    /** @type {?} */
    MatTabNav.prototype._nextPaginator;
    /** @type {?} */
    MatTabNav.prototype._previousPaginator;
}
// Boilerplate for applying mixins to MatTabLink.
var 
// Boilerplate for applying mixins to MatTabLink.
MatTabLinkMixinBase = /** @class */ (function () {
    function MatTabLinkMixinBase() {
    }
    return MatTabLinkMixinBase;
}());
/** @type {?} */
var _MatTabLinkMixinBase = mixinTabIndex(mixinDisableRipple(mixinDisabled(MatTabLinkMixinBase)));
/**
 * Base class with all of the `MatTabLink` functionality.
 */
var _MatTabLinkBase = /** @class */ (function (_super) {
    tslib_1.__extends(_MatTabLinkBase, _super);
    function _MatTabLinkBase(_tabNavBar, elementRef, globalRippleOptions, tabIndex, _focusMonitor, animationMode) {
        var _this = _super.call(this) || this;
        _this._tabNavBar = _tabNavBar;
        _this.elementRef = elementRef;
        _this._focusMonitor = _focusMonitor;
        /**
         * Whether the tab link is active or not.
         */
        _this._isActive = false;
        _this.rippleConfig = globalRippleOptions || {};
        _this.tabIndex = parseInt(tabIndex) || 0;
        if (animationMode === 'NoopAnimations') {
            _this.rippleConfig.animation = { enterDuration: 0, exitDuration: 0 };
        }
        _focusMonitor.monitor(elementRef);
        return _this;
    }
    Object.defineProperty(_MatTabLinkBase.prototype, "active", {
        /** Whether the link is active. */
        get: /**
         * Whether the link is active.
         * @return {?}
         */
        function () { return this._isActive; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._isActive) {
                this._isActive = value;
                this._tabNavBar.updateActiveLink(this.elementRef);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_MatTabLinkBase.prototype, "rippleDisabled", {
        /**
         * Whether ripples are disabled on interaction.
         * @docs-private
         */
        get: /**
         * Whether ripples are disabled on interaction.
         * \@docs-private
         * @return {?}
         */
        function () {
            return this.disabled || this.disableRipple || this._tabNavBar.disableRipple ||
                !!this.rippleConfig.disabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    _MatTabLinkBase.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.elementRef.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    _MatTabLinkBase.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._focusMonitor.stopMonitoring(this.elementRef);
    };
    _MatTabLinkBase.decorators = [
        { type: Directive, args: [{
                    // TODO(crisbeto): this selector can be removed when we update to Angular 9.0.
                    selector: 'do-not-use-abstract-mat-tab-link-base'
                },] },
    ];
    /** @nocollapse */
    _MatTabLinkBase.ctorParameters = function () { return [
        { type: _MatTabNavBase },
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RIPPLE_GLOBAL_OPTIONS,] }] },
        { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
        { type: FocusMonitor },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
    ]; };
    _MatTabLinkBase.propDecorators = {
        active: [{ type: Input }]
    };
    return _MatTabLinkBase;
}(_MatTabLinkMixinBase));
export { _MatTabLinkBase };
if (false) {
    /**
     * Whether the tab link is active or not.
     * @type {?}
     * @protected
     */
    _MatTabLinkBase.prototype._isActive;
    /**
     * Ripple configuration for ripples that are launched on pointer down. The ripple config
     * is set to the global ripple options since we don't have any configurable options for
     * the tab link ripples.
     * \@docs-private
     * @type {?}
     */
    _MatTabLinkBase.prototype.rippleConfig;
    /**
     * @type {?}
     * @private
     */
    _MatTabLinkBase.prototype._tabNavBar;
    /** @type {?} */
    _MatTabLinkBase.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    _MatTabLinkBase.prototype._focusMonitor;
}
/**
 * Link inside of a `mat-tab-nav-bar`.
 */
var MatTabLink = /** @class */ (function (_super) {
    tslib_1.__extends(MatTabLink, _super);
    function MatTabLink(tabNavBar, elementRef, ngZone, platform, globalRippleOptions, tabIndex, focusMonitor, animationMode) {
        var _this = _super.call(this, tabNavBar, elementRef, globalRippleOptions, tabIndex, focusMonitor, animationMode) || this;
        _this._tabLinkRipple = new RippleRenderer(_this, ngZone, elementRef, platform);
        _this._tabLinkRipple.setupTriggerEvents(elementRef.nativeElement);
        return _this;
    }
    /**
     * @return {?}
     */
    MatTabLink.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        this._tabLinkRipple._removeTriggerEvents();
    };
    MatTabLink.decorators = [
        { type: Directive, args: [{
                    selector: '[mat-tab-link], [matTabLink]',
                    exportAs: 'matTabLink',
                    inputs: ['disabled', 'disableRipple', 'tabIndex'],
                    host: {
                        'class': 'mat-tab-link',
                        '[attr.aria-current]': 'active ? "page" : null',
                        '[attr.aria-disabled]': 'disabled',
                        '[attr.tabIndex]': 'tabIndex',
                        '[class.mat-tab-disabled]': 'disabled',
                        '[class.mat-tab-label-active]': 'active',
                    }
                },] },
    ];
    /** @nocollapse */
    MatTabLink.ctorParameters = function () { return [
        { type: MatTabNav },
        { type: ElementRef },
        { type: NgZone },
        { type: Platform },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RIPPLE_GLOBAL_OPTIONS,] }] },
        { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
        { type: FocusMonitor },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
    ]; };
    return MatTabLink;
}(_MatTabLinkBase));
export { MatTabLink };
if (false) {
    /**
     * Reference to the RippleRenderer for the tab-link.
     * @type {?}
     * @private
     */
    MatTabLink.prototype._tabLinkRipple;
}
//# sourceMappingURL=tab-nav-bar.js.map