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
import { ChangeDetectorRef, Directive, ElementRef, } from '@angular/core';
import { mixinDisabled, mixinTabIndex, } from '@angular/material/core';
import { Subject } from 'rxjs';
/**
 * Directive to add CSS classes to chip leading icon.
 * \@docs-private
 */
var MatChipAvatar = /** @class */ (function () {
    function MatChipAvatar(_changeDetectorRef, _elementRef) {
        this._changeDetectorRef = _changeDetectorRef;
        this._elementRef = _elementRef;
    }
    /** Sets whether the given CSS class should be applied to the leading icon. */
    /**
     * Sets whether the given CSS class should be applied to the leading icon.
     * @param {?} cssClass
     * @param {?} active
     * @return {?}
     */
    MatChipAvatar.prototype.setClass = /**
     * Sets whether the given CSS class should be applied to the leading icon.
     * @param {?} cssClass
     * @param {?} active
     * @return {?}
     */
    function (cssClass, active) {
        this._elementRef.nativeElement.classList.toggle(cssClass, active);
        this._changeDetectorRef.markForCheck();
    };
    MatChipAvatar.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-chip-avatar, [matChipAvatar]',
                    host: {
                        'class': 'mat-mdc-chip-avatar mdc-chip__icon mdc-chip__icon--leading',
                        'role': 'img'
                    }
                },] },
    ];
    /** @nocollapse */
    MatChipAvatar.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    return MatChipAvatar;
}());
export { MatChipAvatar };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MatChipAvatar.prototype._changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    MatChipAvatar.prototype._elementRef;
}
/**
 * Directive to add CSS classes to and configure attributes for chip trailing icon.
 * \@docs-private
 */
var MatChipTrailingIcon = /** @class */ (function () {
    function MatChipTrailingIcon(_elementRef) {
        this._elementRef = _elementRef;
    }
    /**
     * @return {?}
     */
    MatChipTrailingIcon.prototype.focus = /**
     * @return {?}
     */
    function () {
        this._elementRef.nativeElement.focus();
    };
    /** Sets an attribute on the icon. */
    /**
     * Sets an attribute on the icon.
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    MatChipTrailingIcon.prototype.setAttribute = /**
     * Sets an attribute on the icon.
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (name, value) {
        this._elementRef.nativeElement.setAttribute(name, value);
    };
    MatChipTrailingIcon.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-chip-trailing-icon, [matChipTrailingIcon]',
                    host: {
                        'class': 'mat-mdc-chip-trailing-icon mdc-chip__icon mdc-chip__icon--trailing',
                        'tabindex': '-1',
                        'aria-hidden': 'true',
                    }
                },] },
    ];
    /** @nocollapse */
    MatChipTrailingIcon.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return MatChipTrailingIcon;
}());
export { MatChipTrailingIcon };
if (false) {
    /** @type {?} */
    MatChipTrailingIcon.prototype._elementRef;
}
/**
 * Boilerplate for applying mixins to MatChipRemove.
 * \@docs-private
 */
var /**
 * Boilerplate for applying mixins to MatChipRemove.
 * \@docs-private
 */
MatChipRemoveBase = /** @class */ (function (_super) {
    tslib_1.__extends(MatChipRemoveBase, _super);
    function MatChipRemoveBase(_elementRef) {
        return _super.call(this, _elementRef) || this;
    }
    return MatChipRemoveBase;
}(MatChipTrailingIcon));
/** @type {?} */
var _MatChipRemoveMixinBase = mixinTabIndex(mixinDisabled(MatChipRemoveBase));
/**
 * Directive to remove the parent chip when the trailing icon is clicked or
 * when the ENTER key is pressed on it.
 *
 * Recommended for use with the Material Design "cancel" icon
 * available at https://material.io/icons/#ic_cancel.
 *
 * Example:
 *
 *     `<mat-chip>
 *       <mat-icon matChipRemove>cancel</mat-icon>
 *     </mat-chip>`
 */
var MatChipRemove = /** @class */ (function (_super) {
    tslib_1.__extends(MatChipRemove, _super);
    function MatChipRemove(_elementRef) {
        var _this = _super.call(this, _elementRef) || this;
        /**
         * Emits when the user interacts with the icon.
         * \@docs-private
         */
        _this.interaction = new Subject();
        return _this;
    }
    MatChipRemove.decorators = [
        { type: Directive, args: [{
                    selector: '[matChipRemove]',
                    inputs: ['disabled', 'tabIndex'],
                    host: {
                        'class': 'mat-mdc-chip-remove mat-mdc-chip-trailing-icon mdc-chip__icon mdc-chip__icon--trailing',
                        '[tabIndex]': 'tabIndex',
                        'role': 'button',
                        '(click)': 'interaction.next($event)',
                        '(keydown)': 'interaction.next($event)',
                    }
                },] },
    ];
    /** @nocollapse */
    MatChipRemove.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return MatChipRemove;
}(_MatChipRemoveMixinBase));
export { MatChipRemove };
if (false) {
    /**
     * Emits when the user interacts with the icon.
     * \@docs-private
     * @type {?}
     */
    MatChipRemove.prototype.interaction;
}
//# sourceMappingURL=chip-icons.js.map