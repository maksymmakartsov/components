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
/** @type {?} */
export var LIVE_ANNOUNCER_ELEMENT_TOKEN = new InjectionToken('liveAnnouncerElement', {
    providedIn: 'root',
    factory: LIVE_ANNOUNCER_ELEMENT_TOKEN_FACTORY,
});
/**
 * \@docs-private
 * @return {?}
 */
export function LIVE_ANNOUNCER_ELEMENT_TOKEN_FACTORY() {
    return null;
}
/**
 * Object that can be used to configure the default options for the LiveAnnouncer.
 * @record
 */
export function LiveAnnouncerDefaultOptions() { }
if (false) {
    /**
     * Default politeness for the announcements.
     * @type {?|undefined}
     */
    LiveAnnouncerDefaultOptions.prototype.politeness;
    /**
     * Default duration for the announcement messages.
     * @type {?|undefined}
     */
    LiveAnnouncerDefaultOptions.prototype.duration;
}
/**
 * Injection token that can be used to configure the default options for the LiveAnnouncer.
 * @type {?}
 */
export var LIVE_ANNOUNCER_DEFAULT_OPTIONS = new InjectionToken('LIVE_ANNOUNCER_DEFAULT_OPTIONS');
//# sourceMappingURL=live-announcer-tokens.js.map