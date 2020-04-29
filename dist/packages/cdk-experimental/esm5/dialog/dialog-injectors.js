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
import { InjectionToken } from '@angular/core';
import { Overlay, } from '@angular/cdk/overlay';
/**
 * Injection token for the Dialog's ScrollStrategy.
 * @type {?}
 */
export var DIALOG_SCROLL_STRATEGY = new InjectionToken('DialogScrollStrategy');
/**
 * Injection token for the Dialog's Data.
 * @type {?}
 */
export var DIALOG_DATA = new InjectionToken('DialogData');
/**
 * Injection token for the DialogRef constructor.
 * @type {?}
 */
export var DIALOG_REF = new InjectionToken('DialogRef');
/**
 * Injection token for the DialogConfig.
 * @type {?}
 */
export var DIALOG_CONFIG = new InjectionToken('DialogConfig');
/**
 * Injection token for the Dialog's DialogContainer component.
 * @type {?}
 */
export var DIALOG_CONTAINER = new InjectionToken('DialogContainer');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
export function MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return (/**
     * @return {?}
     */
    function () { return overlay.scrollStrategies.block(); });
}
/**
 * \@docs-private
 * @type {?}
 */
export var MAT_DIALOG_SCROLL_STRATEGY_PROVIDER = {
    provide: DIALOG_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
};
//# sourceMappingURL=dialog-injectors.js.map