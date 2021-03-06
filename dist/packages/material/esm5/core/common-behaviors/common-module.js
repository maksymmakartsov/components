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
import { NgModule, InjectionToken, Optional, Inject, isDevMode, Version } from '@angular/core';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { BidiModule } from '@angular/cdk/bidi';
import { VERSION as CDK_VERSION } from '@angular/cdk';
// Private version constant to circumvent test/build issues,
// i.e. avoid core to depend on the @angular/material primary entry-point
// Can be removed once the Material primary entry-point no longer
// re-exports all secondary entry-points
/** @type {?} */
var VERSION = new Version('0.0.0-PLACEHOLDER');
/**
 * \@docs-private
 * @return {?}
 */
export function MATERIAL_SANITY_CHECKS_FACTORY() {
    return true;
}
/**
 * Injection token that configures whether the Material sanity checks are enabled.
 * @type {?}
 */
export var MATERIAL_SANITY_CHECKS = new InjectionToken('mat-sanity-checks', {
    providedIn: 'root',
    factory: MATERIAL_SANITY_CHECKS_FACTORY,
});
/**
 * Module that captures anything that should be loaded and/or run for *all* Angular Material
 * components. This includes Bidi, etc.
 *
 * This module should be imported to each top-level component module (e.g., MatTabsModule).
 */
var MatCommonModule = /** @class */ (function () {
    function MatCommonModule(_sanityChecksEnabled, _hammerLoader) {
        this._sanityChecksEnabled = _sanityChecksEnabled;
        this._hammerLoader = _hammerLoader;
        /**
         * Whether we've done the global sanity checks (e.g. a theme is loaded, there is a doctype).
         */
        this._hasDoneGlobalChecks = false;
        /**
         * Whether we've already checked for HammerJs availability.
         */
        this._hasCheckedHammer = false;
        /**
         * Reference to the global `document` object.
         */
        this._document = typeof document === 'object' && document ? document : null;
        /**
         * Reference to the global 'window' object.
         */
        this._window = typeof window === 'object' && window ? window : null;
        if (this._areChecksEnabled() && !this._hasDoneGlobalChecks) {
            this._checkDoctypeIsDefined();
            this._checkThemeIsPresent();
            this._checkCdkVersionMatch();
            this._hasDoneGlobalChecks = true;
        }
    }
    /** Whether any sanity checks are enabled */
    /**
     * Whether any sanity checks are enabled
     * @private
     * @return {?}
     */
    MatCommonModule.prototype._areChecksEnabled = /**
     * Whether any sanity checks are enabled
     * @private
     * @return {?}
     */
    function () {
        return this._sanityChecksEnabled && isDevMode() && !this._isTestEnv();
    };
    /** Whether the code is running in tests. */
    /**
     * Whether the code is running in tests.
     * @private
     * @return {?}
     */
    MatCommonModule.prototype._isTestEnv = /**
     * Whether the code is running in tests.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var window = (/** @type {?} */ (this._window));
        return window && (window.__karma__ || window.jasmine);
    };
    /**
     * @private
     * @return {?}
     */
    MatCommonModule.prototype._checkDoctypeIsDefined = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._document && !this._document.doctype) {
            console.warn('Current document does not have a doctype. This may cause ' +
                'some Angular Material components not to behave as expected.');
        }
    };
    /**
     * @private
     * @return {?}
     */
    MatCommonModule.prototype._checkThemeIsPresent = /**
     * @private
     * @return {?}
     */
    function () {
        // We need to assert that the `body` is defined, because these checks run very early
        // and the `body` won't be defined if the consumer put their scripts in the `head`.
        if (!this._document || !this._document.body || typeof getComputedStyle !== 'function') {
            return;
        }
        /** @type {?} */
        var testElement = this._document.createElement('div');
        testElement.classList.add('mat-theme-loaded-marker');
        this._document.body.appendChild(testElement);
        /** @type {?} */
        var computedStyle = getComputedStyle(testElement);
        // In some situations the computed style of the test element can be null. For example in
        // Firefox, the computed style is null if an application is running inside of a hidden iframe.
        // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
        if (computedStyle && computedStyle.display !== 'none') {
            console.warn('Could not find Angular Material core theme. Most Material ' +
                'components may not work as expected. For more info refer ' +
                'to the theming guide: https://material.angular.io/guide/theming');
        }
        this._document.body.removeChild(testElement);
    };
    /** Checks whether the material version matches the cdk version */
    /**
     * Checks whether the material version matches the cdk version
     * @private
     * @return {?}
     */
    MatCommonModule.prototype._checkCdkVersionMatch = /**
     * Checks whether the material version matches the cdk version
     * @private
     * @return {?}
     */
    function () {
        if (VERSION.full !== CDK_VERSION.full) {
            console.warn('The Angular Material version (' + VERSION.full + ') does not match ' +
                'the Angular CDK version (' + CDK_VERSION.full + ').\n' +
                'Please ensure the versions of these two packages exactly match.');
        }
    };
    /** Checks whether HammerJS is available. */
    /**
     * Checks whether HammerJS is available.
     * @return {?}
     */
    MatCommonModule.prototype._checkHammerIsAvailable = /**
     * Checks whether HammerJS is available.
     * @return {?}
     */
    function () {
        if (this._hasCheckedHammer || !this._window) {
            return;
        }
        if (this._areChecksEnabled() && !((/** @type {?} */ (this._window)))['Hammer'] && !this._hammerLoader) {
            console.warn('Could not find HammerJS. Certain Angular Material components may not work correctly.');
        }
        this._hasCheckedHammer = true;
    };
    MatCommonModule.decorators = [
        { type: NgModule, args: [{
                    imports: [BidiModule],
                    exports: [BidiModule],
                },] },
    ];
    /** @nocollapse */
    MatCommonModule.ctorParameters = function () { return [
        { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [MATERIAL_SANITY_CHECKS,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [HAMMER_LOADER,] }] }
    ]; };
    return MatCommonModule;
}());
export { MatCommonModule };
if (false) {
    /**
     * Whether we've done the global sanity checks (e.g. a theme is loaded, there is a doctype).
     * @type {?}
     * @private
     */
    MatCommonModule.prototype._hasDoneGlobalChecks;
    /**
     * Whether we've already checked for HammerJs availability.
     * @type {?}
     * @private
     */
    MatCommonModule.prototype._hasCheckedHammer;
    /**
     * Reference to the global `document` object.
     * @type {?}
     * @private
     */
    MatCommonModule.prototype._document;
    /**
     * Reference to the global 'window' object.
     * @type {?}
     * @private
     */
    MatCommonModule.prototype._window;
    /**
     * @type {?}
     * @private
     */
    MatCommonModule.prototype._sanityChecksEnabled;
    /**
     * @type {?}
     * @private
     */
    MatCommonModule.prototype._hammerLoader;
}
//# sourceMappingURL=common-module.js.map