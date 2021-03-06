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
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatBottomSheetContainer } from './bottom-sheet-container';
var MatBottomSheetModule = /** @class */ (function () {
    function MatBottomSheetModule() {
    }
    MatBottomSheetModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        MatCommonModule,
                        PortalModule,
                    ],
                    exports: [MatBottomSheetContainer, MatCommonModule],
                    declarations: [MatBottomSheetContainer],
                    entryComponents: [MatBottomSheetContainer],
                },] },
    ];
    return MatBottomSheetModule;
}());
export { MatBottomSheetModule };
//# sourceMappingURL=bottom-sheet-module.js.map