/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component, Directive, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ComponentFactoryResolver, ViewContainerRef, Inject, forwardRef, ChangeDetectorRef, Optional, ElementRef, TemplateRef, ContentChild, ContentChildren, NgZone, Attribute, NgModule } from '@angular/core';
import { MatTabBodyPortal, matTabsAnimations, _MatTabBodyBase, MatTabContent, MatTabLabel, MatTabLabelWrapper, MatTab, _MatTabHeaderBase, _MatTabGroupBase, MAT_TABS_CONFIG, _MatTabNavBase, _MatTabLinkBase } from '@angular/material/tabs';
export { matTabsAnimations, _MAT_INK_BAR_POSITIONER, MatTabChangeEvent, MAT_TABS_CONFIG } from '@angular/material/tabs';
import { PortalHostDirective, PortalModule } from '@angular/cdk/portal';
import { Directionality } from '@angular/cdk/bidi';
import { MDCSlidingTabIndicatorFoundation } from '@material/tab-indicator';
import { DOCUMENT, CommonModule } from '@angular/common';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { Platform } from '@angular/cdk/platform';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MAT_RIPPLE_GLOBAL_OPTIONS, MatCommonModule, MatRippleModule } from '@angular/material/core';
import { FocusMonitor, A11yModule } from '@angular/cdk/a11y';
import { ObserversModule } from '@angular/cdk/observers';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The portal host directive for the contents of the tab.
 * \@docs-private
 */
let MatTabBodyPortal$1 = class MatTabBodyPortal extends MatTabBodyPortal {
    /**
     * @param {?} componentFactoryResolver
     * @param {?} viewContainerRef
     * @param {?} host
     */
    constructor(componentFactoryResolver, viewContainerRef, host) {
        super(componentFactoryResolver, viewContainerRef, host);
    }
};
MatTabBodyPortal$1.decorators = [
    { type: Directive, args: [{
                selector: '[matTabBodyHost]'
            },] },
];
/** @nocollapse */
MatTabBodyPortal$1.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ViewContainerRef },
    { type: MatTabBody, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => MatTabBody)),] }] }
];
/**
 * Wrapper for the contents of a tab.
 * \@docs-private
 */
class MatTabBody extends _MatTabBodyBase {
    /**
     * @param {?} elementRef
     * @param {?} dir
     * @param {?} changeDetectorRef
     */
    constructor(elementRef, dir, changeDetectorRef) {
        super(elementRef, dir, changeDetectorRef);
    }
}
MatTabBody.decorators = [
    { type: Component, args: [{selector: 'mat-tab-body',
                template: "<div class=\"mat-mdc-tab-body-content\" #content [@translateTab]=\"{ value: _position, params: {animationDuration: animationDuration} }\" (@translateTab.start)=\"_onTranslateTabStarted($event)\" (@translateTab.done)=\"_translateTabComplete.next($event)\"><ng-template matTabBodyHost></ng-template></div>",
                styles: [".mat-mdc-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;flex-basis:100%}.mat-mdc-tab-body.mat-mdc-tab-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;flex-grow:1}.mat-mdc-tab-group.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body.mat-mdc-tab-body-active{overflow-y:hidden}.mat-mdc-tab-body-content{height:100%;overflow:auto}.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body-content{overflow:hidden}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [matTabsAnimations.translateTab],
                host: {
                    'class': 'mat-mdc-tab-body',
                },
            },] },
];
/** @nocollapse */
MatTabBody.ctorParameters = () => [
    { type: ElementRef },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef }
];
MatTabBody.propDecorators = {
    _portalHost: [{ type: ViewChild, args: [PortalHostDirective, { static: false },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Decorates the `ng-template` tags and reads out the template from it.
 */
let MatTabContent$1 = class MatTabContent extends MatTabContent {
};
MatTabContent$1.decorators = [
    { type: Directive, args: [{ selector: '[matTabContent]' },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Used to flag tab labels for use with the portal directive
 */
let MatTabLabel$1 = class MatTabLabel extends MatTabLabel {
};
MatTabLabel$1.decorators = [
    { type: Directive, args: [{
                selector: '[mat-tab-label], [matTabLabel]',
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Abstraction around the MDC tab indicator that manages the ink bar of a tab header.
 * \@docs-private
 */
class MatInkBar {
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
/**
 * Implementation of MDC's sliding tab indicator foundation.
 * \@docs-private
 */
class MatInkBarFoundation {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Used in the `mat-tab-group` view to display tab labels.
 * \@docs-private
 */
let MatTabLabelWrapper$1 = class MatTabLabelWrapper extends MatTabLabelWrapper {
    /**
     * @param {?} elementRef
     * @param {?} _document
     */
    constructor(elementRef, _document) {
        super(elementRef);
        this.elementRef = elementRef;
        this._foundation = new MatInkBarFoundation(elementRef, _document);
        this._foundation.init();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._foundation.destroy();
    }
    /**
     * Sets focus on the wrapper element
     * @return {?}
     */
    focus() {
        this.elementRef.nativeElement.focus();
    }
};
MatTabLabelWrapper$1.decorators = [
    { type: Directive, args: [{
                selector: '[matTabLabelWrapper]',
                inputs: ['disabled'],
                host: {
                    '[class.mat-mdc-tab-disabled]': 'disabled',
                    '[attr.aria-disabled]': '!!disabled',
                }
            },] },
];
/** @nocollapse */
MatTabLabelWrapper$1.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
let MatTab$1 = class MatTab extends MatTab {
};
MatTab$1.decorators = [
    { type: Component, args: [{selector: 'mat-tab',
                // Note that usually we'd go through a bit more trouble and set up another class so that
                // the inlined template of `MatTab` isn't duplicated, however the template is small enough
                // that creating the extra class will generate more code than just duplicating the template.
                template: "<ng-template><ng-content></ng-content></ng-template>",
                inputs: ['disabled'],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                exportAs: 'matTab',
            },] },
];
MatTab$1.propDecorators = {
    _explicitContent: [{ type: ContentChild, args: [MatTabContent$1, { read: TemplateRef, static: true },] }],
    templateLabel: [{ type: ContentChild, args: [MatTabLabel$1, { static: false },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The header of the tab group which displays a list of all the tabs in the tab group. Includes
 * an ink bar that follows the currently selected tab. When the tabs list's width exceeds the
 * width of the header container, then arrows will be displayed to allow the user to scroll
 * left and right across the header.
 * \@docs-private
 */
class MatTabHeader extends _MatTabHeaderBase {
    /**
     * @param {?} elementRef
     * @param {?} changeDetectorRef
     * @param {?} viewportRuler
     * @param {?} dir
     * @param {?} ngZone
     * @param {?} platform
     * @param {?=} animationMode
     */
    constructor(elementRef, changeDetectorRef, viewportRuler, dir, ngZone, platform, 
    // @breaking-change 9.0.0 `_animationMode` parameter to be made required.
    animationMode) {
        super(elementRef, changeDetectorRef, viewportRuler, dir, ngZone, platform, animationMode);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._inkBar = new MatInkBar(this._items);
        super.ngAfterContentInit();
    }
}
MatTabHeader.decorators = [
    { type: Component, args: [{selector: 'mat-tab-header',
                template: "<div class=\"mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-before\" #previousPaginator aria-hidden=\"true\" mat-ripple [matRippleDisabled]=\"_disableScrollBefore || disableRipple\" [class.mat-mdc-tab-header-pagination-disabled]=\"_disableScrollBefore\" (click)=\"_handlePaginatorClick('before')\" (mousedown)=\"_handlePaginatorPress('before')\" (touchend)=\"_stopInterval()\"><div class=\"mat-mdc-tab-header-pagination-chevron\"></div></div><div class=\"mat-mdc-tab-label-container\" #tabListContainer (keydown)=\"_handleKeydown($event)\"><div #tabList class=\"mat-mdc-tab-list\" [class._mat-animation-noopable]=\"_animationMode === 'NoopAnimations'\" role=\"tablist\" (cdkObserveContent)=\"_onContentChanges()\"><div class=\"mat-mdc-tab-labels\"><ng-content></ng-content></div></div></div><div class=\"mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-after\" #nextPaginator aria-hidden=\"true\" mat-ripple [matRippleDisabled]=\"_disableScrollAfter || disableRipple\" [class.mat-mdc-tab-header-pagination-disabled]=\"_disableScrollAfter\" (mousedown)=\"_handlePaginatorPress('after')\" (click)=\"_handlePaginatorClick('after')\" (touchend)=\"_stopInterval()\"><div class=\"mat-mdc-tab-header-pagination-chevron\"></div></div>",
                styles: [".mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator .mdc-tab-indicator__content--underline{border-top-width:2px}.mdc-tab-indicator .mdc-tab-indicator__content--icon{height:34px;font-size:34px}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(.4,0,.2,1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:.1s}.mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mat-mdc-tab-header-pagination{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:transparent;touch-action:none}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-pagination-after,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before{padding-right:4px}.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:'';height:8px;width:8px}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;opacity:.4;pointer-events:none}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform .5s cubic-bezier(.35,0,.25,1)}.mat-mdc-tab-label-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;opacity:.4}.mat-mdc-tab-labels{display:flex;flex:1 0 auto}[mat-align-tabs=center] .mat-mdc-tab-labels{justify-content:center}[mat-align-tabs=end] .mat-mdc-tab-labels{justify-content:flex-end}"],
                inputs: ['selectedIndex'],
                outputs: ['selectFocusedIndex', 'indexFocused'],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    'class': 'mat-mdc-tab-header',
                    '[class.mat-mdc-tab-header-pagination-controls-enabled]': '_showPaginationControls',
                    '[class.mat-mdc-tab-header-rtl]': "_getLayoutDirection() == 'rtl'",
                },
            },] },
];
/** @nocollapse */
MatTabHeader.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: ViewportRuler },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: NgZone },
    { type: Platform },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];
MatTabHeader.propDecorators = {
    _items: [{ type: ContentChildren, args: [MatTabLabelWrapper$1,] }],
    _tabListContainer: [{ type: ViewChild, args: ['tabListContainer', { static: true },] }],
    _tabList: [{ type: ViewChild, args: ['tabList', { static: true },] }],
    _nextPaginator: [{ type: ViewChild, args: ['nextPaginator', { static: false },] }],
    _previousPaginator: [{ type: ViewChild, args: ['previousPaginator', { static: false },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Material design tab-group component. Supports basic tab pairs (label + content) and includes
 * animated ink-bar, keyboard navigation, and screen reader.
 * See: https://material.io/design/components/tabs.html
 */
class MatTabGroup extends _MatTabGroupBase {
    /**
     * @param {?} elementRef
     * @param {?} changeDetectorRef
     * @param {?=} defaultConfig
     * @param {?=} animationMode
     */
    constructor(elementRef, changeDetectorRef, defaultConfig, animationMode) {
        super(elementRef, changeDetectorRef, defaultConfig, animationMode);
    }
}
MatTabGroup.decorators = [
    { type: Component, args: [{selector: 'mat-tab-group',
                exportAs: 'matTabGroup',
                template: "<mat-tab-header #tabHeader [selectedIndex]=\"selectedIndex\" [disableRipple]=\"disableRipple\" (indexFocused)=\"_focusChanged($event)\" (selectFocusedIndex)=\"selectedIndex = $event\"><div class=\"mdc-tab mat-mdc-tab\" #tabNode role=\"tab\" matTabLabelWrapper cdkMonitorElementFocus *ngFor=\"let tab of _tabs; let i = index\" [id]=\"_getTabLabelId(i)\" [attr.tabIndex]=\"_getTabIndex(tab, i)\" [attr.aria-posinset]=\"i + 1\" [attr.aria-setsize]=\"_tabs.length\" [attr.aria-controls]=\"_getTabContentId(i)\" [attr.aria-selected]=\"selectedIndex == i\" [attr.aria-label]=\"tab.ariaLabel || null\" [attr.aria-labelledby]=\"(!tab.ariaLabel && tab.ariaLabelledby) ? tab.ariaLabelledby : null\" [class.mdc-tab--active]=\"selectedIndex == i\" [disabled]=\"tab.disabled\" (click)=\"_handleClick(tab, tabHeader, i)\"><div class=\"mat-mdc-tab-ripple\" mat-ripple [matRippleTrigger]=\"tabNode\" [matRippleDisabled]=\"tab.disabled || disableRipple\"></div><span class=\"mdc-tab__content\"><span class=\"mdc-tab__text-label\"><ng-template [ngIf]=\"tab.templateLabel\"><ng-template [cdkPortalOutlet]=\"tab.templateLabel\"></ng-template></ng-template><ng-template [ngIf]=\"!tab.templateLabel\">{{tab.textLabel}}</ng-template></span></span></div></mat-tab-header><div class=\"mat-mdc-tab-body-wrapper\" [class._mat-animation-noopable]=\"_animationMode === 'NoopAnimations'\" #tabBodyWrapper><mat-tab-body role=\"tabpanel\" *ngFor=\"let tab of _tabs; let i = index\" [id]=\"_getTabContentId(i)\" [attr.aria-labelledby]=\"_getTabLabelId(i)\" [class.mat-mdc-tab-body-active]=\"selectedIndex == i\" [content]=\"tab.content\" [position]=\"tab.position\" [origin]=\"tab.origin\" [animationDuration]=\"animationDuration\" (_onCentered)=\"_removeTabBodyWrapperHeight()\" (_onCentering)=\"_setTabBodyWrapperHeight($event)\"></mat-tab-body></div>",
                styles: [".mdc-tab{padding-right:24px;padding-left:24px;position:relative;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:0;background:0 0;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{position:relative;display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;width:24px;height:24px;font-size:24px;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__icon,.mdc-tab--active .mdc-tab__text-label{transition-delay:.1s}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl],[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:0;padding-right:8px}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab.mdc-tab{height:48px;flex-grow:0;min-width:160px}.mat-mdc-tab::before{content:'';display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none}.mat-mdc-tab:hover::before{opacity:.04}.mat-mdc-tab.cdk-keyboard-focused::before,.mat-mdc-tab.cdk-program-focused::before{opacity:.12}.mat-mdc-tab .mat-ripple-element{opacity:.12}.mat-mdc-tab-group[mat-stretch-tabs]>.mat-mdc-tab-header .mat-mdc-tab{flex-grow:1}.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab-group{display:flex;flex-direction:column}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header{flex-direction:column-reverse}.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header .mdc-tab-indicator__content--underline{align-self:flex-start}.mat-mdc-tab-body-wrapper{position:relative;overflow:hidden;display:flex;transition:height .5s cubic-bezier(.35,0,.25,1)}._mat-animation-noopable.mat-mdc-tab-body-wrapper{transition:none;animation:none}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                inputs: ['color', 'disableRipple'],
                host: {
                    'class': 'mat-mdc-tab-group',
                    '[class.mat-mdc-tab-group-dynamic-height]': 'dynamicHeight',
                    '[class.mat-mdc-tab-group-inverted-header]': 'headerPosition === "below"',
                },
            },] },
];
/** @nocollapse */
MatTabGroup.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_TABS_CONFIG,] }, { type: Optional }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];
MatTabGroup.propDecorators = {
    _tabs: [{ type: ContentChildren, args: [MatTab$1,] }],
    _tabBodyWrapper: [{ type: ViewChild, args: ['tabBodyWrapper', { static: false },] }],
    _tabHeader: [{ type: ViewChild, args: ['tabHeader', { static: false },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Navigation component matching the styles of the tab group header.
 * Provides anchored navigation with animated ink bar.
 */
class MatTabNav extends _MatTabNavBase {
    /**
     * @param {?} elementRef
     * @param {?} dir
     * @param {?} ngZone
     * @param {?} changeDetectorRef
     * @param {?} viewportRuler
     * @param {?=} platform
     * @param {?=} animationMode
     */
    constructor(elementRef, dir, ngZone, changeDetectorRef, viewportRuler, 
    /**
     * @deprecated @breaking-change 9.0.0 `platform` parameter to become required.
     */
    platform, animationMode) {
        super(elementRef, dir, ngZone, changeDetectorRef, viewportRuler, platform, animationMode);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._inkBar = new MatInkBar(this._items);
        super.ngAfterContentInit();
    }
}
MatTabNav.decorators = [
    { type: Component, args: [{selector: '[mat-tab-nav-bar]',
                exportAs: 'matTabNavBar, matTabNav',
                inputs: ['color'],
                template: "<div class=\"mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-before\" #previousPaginator aria-hidden=\"true\" mat-ripple [matRippleDisabled]=\"_disableScrollBefore || disableRipple\" [class.mat-mdc-tab-header-pagination-disabled]=\"_disableScrollBefore\" (click)=\"_handlePaginatorClick('before')\" (mousedown)=\"_handlePaginatorPress('before')\" (touchend)=\"_stopInterval()\"><div class=\"mat-mdc-tab-header-pagination-chevron\"></div></div><div class=\"mat-mdc-tab-link-container\" #tabListContainer (keydown)=\"_handleKeydown($event)\"><div class=\"mat-mdc-tab-list\" #tabList (cdkObserveContent)=\"_onContentChanges()\"><div class=\"mat-mdc-tab-links\"><ng-content></ng-content></div></div></div><div class=\"mat-mdc-tab-header-pagination mat-mdc-tab-header-pagination-after\" #nextPaginator aria-hidden=\"true\" mat-ripple [matRippleDisabled]=\"_disableScrollAfter || disableRipple\" [class.mat-mdc-tab-header-pagination-disabled]=\"_disableScrollAfter\" (mousedown)=\"_handlePaginatorPress('after')\" (click)=\"_handlePaginatorClick('after')\" (touchend)=\"_stopInterval()\"><div class=\"mat-mdc-tab-header-pagination-chevron\"></div></div>",
                styles: [".mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mat-mdc-tab-header-pagination{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:transparent;touch-action:none}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-pagination-after,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before{padding-right:4px}.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:'';height:8px;width:8px}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;opacity:.4;pointer-events:none}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform .5s cubic-bezier(.35,0,.25,1)}.mat-mdc-tab-links{display:flex;flex:1 0 auto}[mat-align-tabs=center] .mat-mdc-tab-links{justify-content:center}[mat-align-tabs=end] .mat-mdc-tab-links{justify-content:flex-end}.mat-mdc-tab-link-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}"],
                host: {
                    'class': 'mat-mdc-tab-nav-bar mat-mdc-tab-header',
                    '[class.mat-mdc-tab-header-pagination-controls-enabled]': '_showPaginationControls',
                    '[class.mat-mdc-tab-header-rtl]': "_getLayoutDirection() == 'rtl'",
                    '[class.mat-primary]': 'color !== "warn" && color !== "accent"',
                    '[class.mat-accent]': 'color === "accent"',
                    '[class.mat-warn]': 'color === "warn"',
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/** @nocollapse */
MatTabNav.ctorParameters = () => [
    { type: ElementRef },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: ViewportRuler },
    { type: Platform, decorators: [{ type: Optional }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];
MatTabNav.propDecorators = {
    _items: [{ type: ContentChildren, args: [forwardRef((/**
                 * @return {?}
                 */
                () => MatTabLink)), { descendants: true },] }],
    _tabListContainer: [{ type: ViewChild, args: ['tabListContainer', { static: true },] }],
    _tabList: [{ type: ViewChild, args: ['tabList', { static: true },] }],
    _nextPaginator: [{ type: ViewChild, args: ['nextPaginator', { static: false },] }],
    _previousPaginator: [{ type: ViewChild, args: ['previousPaginator', { static: false },] }]
};
/**
 * Link inside of a `mat-tab-nav-bar`.
 */
class MatTabLink extends _MatTabLinkBase {
    /**
     * @param {?} tabNavBar
     * @param {?} elementRef
     * @param {?} globalRippleOptions
     * @param {?} tabIndex
     * @param {?} focusMonitor
     * @param {?} _document
     * @param {?=} animationMode
     */
    constructor(tabNavBar, elementRef, globalRippleOptions, tabIndex, focusMonitor, _document, animationMode) {
        super(tabNavBar, elementRef, globalRippleOptions, tabIndex, focusMonitor, animationMode);
        this._foundation = new MatInkBarFoundation(elementRef, _document);
        this._foundation.init();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this._foundation.destroy();
    }
}
MatTabLink.decorators = [
    { type: Component, args: [{selector: '[mat-tab-link], [matTabLink]',
                exportAs: 'matTabLink',
                inputs: ['disabled', 'disableRipple', 'tabIndex'],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: "<div class=\"mat-mdc-tab-ripple\" mat-ripple [matRippleTrigger]=\"elementRef.nativeElement\" [matRippleDisabled]=\"rippleDisabled\"></div><span class=\"mdc-tab__content\"><span class=\"mdc-tab__text-label\"><ng-content></ng-content></span></span>",
                styles: [".mdc-tab{padding-right:24px;padding-left:24px;position:relative;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:0;background:0 0;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{position:relative;display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;width:24px;height:24px;font-size:24px;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__icon,.mdc-tab--active .mdc-tab__text-label{transition-delay:.1s}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl],[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:0;padding-right:8px}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator .mdc-tab-indicator__content--underline{border-top-width:2px}.mdc-tab-indicator .mdc-tab-indicator__content--icon{height:34px;font-size:34px}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(.4,0,.2,1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:.1s}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab-link.mdc-tab{height:48px;flex-grow:0;min-width:160px}.mat-mdc-tab-link::before{content:'';display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none}.mat-mdc-tab-link:hover::before{opacity:.04}.mat-mdc-tab-link.cdk-keyboard-focused::before,.mat-mdc-tab-link.cdk-program-focused::before{opacity:.12}.mat-mdc-tab-link .mat-ripple-element{opacity:.12}.mat-mdc-tab-link.mat-mdc-tab-disabled{pointer-events:none;opacity:.4}.mat-mdc-tab-header[mat-stretch-tabs] .mat-mdc-tab-link{flex-grow:1}@media (max-width:599px){.mat-mdc-tab-link{min-width:72px}}"],
                host: {
                    'class': 'mdc-tab mat-mdc-tab-link',
                    '[attr.aria-current]': 'active ? "page" : null',
                    '[attr.aria-disabled]': 'disabled',
                    '[attr.tabIndex]': 'tabIndex',
                    '[class.mat-mdc-tab-disabled]': 'disabled',
                    '[class.mdc-tab--active]': 'active',
                }
            },] },
];
/** @nocollapse */
MatTabLink.ctorParameters = () => [
    { type: MatTabNav },
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RIPPLE_GLOBAL_OPTIONS,] }] },
    { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
    { type: FocusMonitor },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MatTabsModule {
}
MatTabsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatCommonModule,
                    PortalModule,
                    MatRippleModule,
                    ObserversModule,
                    A11yModule,
                ],
                exports: [
                    MatCommonModule,
                    MatTabContent$1,
                    MatTabLabel$1,
                    MatTab$1,
                    MatTabGroup,
                    MatTabNav,
                    MatTabLink,
                ],
                declarations: [
                    MatTabContent$1,
                    MatTabLabel$1,
                    MatTab$1,
                    MatTabGroup,
                    MatTabNav,
                    MatTabLink,
                    // Private directives, should not be exported.
                    MatTabBody,
                    MatTabBodyPortal$1,
                    MatTabLabelWrapper$1,
                    MatTabHeader
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { MatTabBodyPortal$1 as MatTabBodyPortal, MatTabContent$1 as MatTabContent, MatTabLabel$1 as MatTabLabel, MatTabLabelWrapper$1 as MatTabLabelWrapper, MatTab$1 as MatTab, MatInkBar, MatTabHeader, MatTabGroup, MatTabNav, MatTabLink, MatTabsModule, MatTabBody as ɵa };
//# sourceMappingURL=mdc-tabs.js.map
