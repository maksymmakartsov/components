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
import { ObserversModule } from '@angular/cdk/observers';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatInkBar } from './ink-bar';
import { MatTab } from './tab';
import { MatTabBody, MatTabBodyPortal, _MatTabBodyBase } from './tab-body';
import { MatTabContent } from './tab-content';
import { MatTabGroup, _MatTabGroupBase } from './tab-group';
import { MatTabHeader, _MatTabHeaderBase } from './tab-header';
import { MatTabLabel } from './tab-label';
import { MatTabLabelWrapper } from './tab-label-wrapper';
import { MatTabLink, MatTabNav, _MatTabNavBase, _MatTabLinkBase } from './tab-nav-bar/tab-nav-bar';
import { MatPaginatedTabHeader } from './paginated-tab-header';
var MatTabsModule = /** @class */ (function () {
    function MatTabsModule() {
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
                    // Don't export all components because some are only to be used internally.
                    exports: [
                        MatCommonModule,
                        MatTabGroup,
                        MatTabLabel,
                        MatTab,
                        MatTabNav,
                        MatTabLink,
                        MatTabContent,
                    ],
                    declarations: [
                        MatTabGroup,
                        MatTabLabel,
                        MatTab,
                        MatInkBar,
                        MatTabLabelWrapper,
                        MatTabNav,
                        MatTabLink,
                        MatTabBody,
                        MatTabBodyPortal,
                        MatTabHeader,
                        MatTabContent,
                        (/** @type {?} */ (
                        // TODO(crisbeto): these can be removed once they're turned into selector-less directives.
                        MatPaginatedTabHeader)),
                        (/** @type {?} */ (_MatTabGroupBase)),
                        (/** @type {?} */ (_MatTabNavBase)),
                        (/** @type {?} */ (_MatTabBodyBase)),
                        (/** @type {?} */ (_MatTabHeaderBase)),
                        (/** @type {?} */ (_MatTabLinkBase)),
                    ],
                },] },
    ];
    return MatTabsModule;
}());
export { MatTabsModule };
//# sourceMappingURL=tabs-module.js.map