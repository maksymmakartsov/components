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
import { Component, Directive, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ComponentFactoryResolver, ViewContainerRef, Inject, forwardRef, ChangeDetectorRef, Optional, ElementRef, } from '@angular/core';
import { MatTabBodyPortal as BaseMatTabBodyPortal, matTabsAnimations, _MatTabBodyBase, } from '@angular/material/tabs';
import { PortalHostDirective } from '@angular/cdk/portal';
import { Directionality } from '@angular/cdk/bidi';
/**
 * The portal host directive for the contents of the tab.
 * \@docs-private
 */
var MatTabBodyPortal = /** @class */ (function (_super) {
    tslib_1.__extends(MatTabBodyPortal, _super);
    function MatTabBodyPortal(componentFactoryResolver, viewContainerRef, host) {
        return _super.call(this, componentFactoryResolver, viewContainerRef, host) || this;
    }
    MatTabBodyPortal.decorators = [
        { type: Directive, args: [{
                    selector: '[matTabBodyHost]'
                },] },
    ];
    /** @nocollapse */
    MatTabBodyPortal.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: ViewContainerRef },
        { type: MatTabBody, decorators: [{ type: Inject, args: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return MatTabBody; })),] }] }
    ]; };
    return MatTabBodyPortal;
}(BaseMatTabBodyPortal));
export { MatTabBodyPortal };
/**
 * Wrapper for the contents of a tab.
 * \@docs-private
 */
var MatTabBody = /** @class */ (function (_super) {
    tslib_1.__extends(MatTabBody, _super);
    function MatTabBody(elementRef, dir, changeDetectorRef) {
        return _super.call(this, elementRef, dir, changeDetectorRef) || this;
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
    MatTabBody.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: ChangeDetectorRef }
    ]; };
    MatTabBody.propDecorators = {
        _portalHost: [{ type: ViewChild, args: [PortalHostDirective, { static: false },] }]
    };
    return MatTabBody;
}(_MatTabBodyBase));
export { MatTabBody };
if (false) {
    /** @type {?} */
    MatTabBody.prototype._portalHost;
}
//# sourceMappingURL=tab-body.js.map