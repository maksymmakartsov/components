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
import { BACKSPACE, DELETE } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatChip } from './chip';
import { NAVIGATION_KEYS } from './grid-key-manager';
/**
 * An extension of the MatChip component used with MatChipGrid and
 * the matChipInputFor directive.
 */
var MatChipRow = /** @class */ (function (_super) {
    tslib_1.__extends(MatChipRow, _super);
    function MatChipRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.basicChipAttrName = 'mat-basic-chip-row';
        /**
         * Key codes for which this component has a custom handler.
         */
        _this.HANDLED_KEYS = NAVIGATION_KEYS.concat([BACKSPACE, DELETE]);
        return _this;
    }
    /**
     * @return {?}
     */
    MatChipRow.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngAfterContentInit.call(this);
        if (this.removeIcon) {
            // Defer setting the value in order to avoid the "Expression
            // has changed after it was checked" errors from Angular.
            setTimeout((/**
             * @return {?}
             */
            function () {
                // removeIcon has tabIndex 0 for regular chips, but should only be focusable by
                // the GridFocusKeyManager for row chips.
                _this.removeIcon.tabIndex = -1;
            }));
        }
    };
    /**
     * @return {?}
     */
    MatChipRow.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngAfterViewInit.call(this);
        this.cells = this.removeIcon ?
            [this.chipContent.nativeElement, this.removeIcon._elementRef.nativeElement] :
            [this.chipContent.nativeElement];
    };
    /**
     * Allows for programmatic focusing of the chip.
     * Sends focus to the first grid cell. The row chip element itself
     * is never focused.
     */
    /**
     * Allows for programmatic focusing of the chip.
     * Sends focus to the first grid cell. The row chip element itself
     * is never focused.
     * @return {?}
     */
    MatChipRow.prototype.focus = /**
     * Allows for programmatic focusing of the chip.
     * Sends focus to the first grid cell. The row chip element itself
     * is never focused.
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        if (!this._hasFocusInternal) {
            this._onFocus.next({ chip: this });
        }
        this.chipContent.nativeElement.focus();
    };
    /**
     * Emits a blur event when one of the gridcells loses focus, unless focus moved
     * to the other gridcell.
     */
    /**
     * Emits a blur event when one of the gridcells loses focus, unless focus moved
     * to the other gridcell.
     * @return {?}
     */
    MatChipRow.prototype._focusout = /**
     * Emits a blur event when one of the gridcells loses focus, unless focus moved
     * to the other gridcell.
     * @return {?}
     */
    function () {
        var _this = this;
        this._hasFocusInternal = false;
        // Wait to see if focus moves to the other gridcell
        setTimeout((/**
         * @return {?}
         */
        function () {
            if (_this._hasFocus) {
                return;
            }
            _this._onBlur.next({ chip: _this });
        }));
    };
    /** Records that the chip has focus when one of the gridcells is focused. */
    /**
     * Records that the chip has focus when one of the gridcells is focused.
     * @return {?}
     */
    MatChipRow.prototype._focusin = /**
     * Records that the chip has focus when one of the gridcells is focused.
     * @return {?}
     */
    function () {
        this._hasFocusInternal = true;
    };
    /** Sends focus to the first gridcell when the user clicks anywhere inside the chip. */
    /**
     * Sends focus to the first gridcell when the user clicks anywhere inside the chip.
     * @param {?} event
     * @return {?}
     */
    MatChipRow.prototype._mousedown = /**
     * Sends focus to the first gridcell when the user clicks anywhere inside the chip.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.disabled) {
            this.focus();
        }
        event.preventDefault();
    };
    /** Handles custom key presses. */
    /**
     * Handles custom key presses.
     * @param {?} event
     * @return {?}
     */
    MatChipRow.prototype._keydown = /**
     * Handles custom key presses.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.disabled) {
            return;
        }
        switch (event.keyCode) {
            case DELETE:
            case BACKSPACE:
                // Remove the focused chip
                this.remove();
                // Always prevent so page navigation does not occur
                event.preventDefault();
                break;
            default:
                this._handleInteraction(event);
        }
    };
    MatChipRow.decorators = [
        { type: Component, args: [{selector: 'mat-chip-row, mat-basic-chip-row',
                    template: "<div role=\"gridcell\"><div #chipContent tabindex=\"-1\" class=\"mat-chip-row-focusable-text-content\"><ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content><span class=\"mdc-chip__text\"><ng-content></ng-content></span><ng-content select=\"mat-chip-trailing-icon,[matChipTrailingIcon]\"></ng-content></div></div><div role=\"gridcell\" *ngIf=\"removeIcon\"><ng-content select=\"[matChipRemove]\"></ng-content></div>",
                    styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}.mdc-chip__icon--trailing[dir=rtl],[dir=rtl] .mdc-chip__icon--trailing{margin-left:-4px;margin-right:4px}.mdc-chip{border-radius:16px;height:32px;display:inline-flex;position:relative;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:0;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip.mdc-chip--selected .mdc-chip__checkmark{margin-left:-4px;margin-right:4px}.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl],.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark{margin-left:4px;margin-right:-4px}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;left:0;height:48px;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:0;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(.4,0,.6,1);stroke-width:2px;stroke-dashoffset:29.78334;stroke-dasharray:29.78334}.mdc-chip__text:focus{outline:0}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(.4,0,.2,1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0s}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry .1s cubic-bezier(0,0,.2,1)}._mat-animation-noopable{transition:none;animation:none}.mat-mdc-chip{cursor:default;overflow:hidden;transform:translateZ(0)}@media (-ms-high-contrast:active){.mat-mdc-chip{outline:solid 1px}.mat-mdc-chip:focus{outline:dotted 2px}}.mat-mdc-chip:not(.mat-mdc-chip-disabled) div:focus .mdc-chip__text::after,.mat-mdc-chip:not(.mat-mdc-chip-disabled):focus .mdc-chip__text::after,.mat-mdc-chip:not(.mat-mdc-chip-disabled):hover .mdc-chip__text::after{content:'';position:absolute;width:100%;height:100%;background:#000;opacity:.2;top:0;left:0;pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-chip-row-focusable-text-content,.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon{pointer-events:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}"],
                    inputs: ['color', 'disableRipple', 'tabIndex'],
                    host: {
                        'role': 'row',
                        '[class.mat-mdc-chip-disabled]': 'disabled',
                        '[class.mat-mdc-chip-highlighted]': 'highlighted',
                        '[class.mat-mdc-chip-with-avatar]': 'leadingIcon',
                        '[class.mat-mdc-chip-with-trailing-icon]': 'trailingIcon || removeIcon',
                        '[id]': 'id',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[tabIndex]': 'tabIndex',
                        '(mousedown)': '_mousedown($event)',
                        '(keydown)': '_keydown($event)',
                        '(transitionend)': '_chipFoundation.handleTransitionEnd($event)',
                        '(focusin)': '_focusin()',
                        '(focusout)': '_focusout()'
                    },
                    providers: [{ provide: MatChip, useExisting: MatChipRow }],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                },] },
    ];
    MatChipRow.propDecorators = {
        chipContent: [{ type: ViewChild, args: ['chipContent', { static: false },] }]
    };
    return MatChipRow;
}(MatChip));
export { MatChipRow };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    MatChipRow.prototype.basicChipAttrName;
    /**
     * The focusable wrapper element in the first gridcell, which contains all
     * chip content other than the remove icon.
     * @type {?}
     */
    MatChipRow.prototype.chipContent;
    /**
     * The focusable grid cells for this row. Implemented as part of GridKeyManagerRow.
     * @type {?}
     */
    MatChipRow.prototype.cells;
    /**
     * Key codes for which this component has a custom handler.
     * @type {?}
     */
    MatChipRow.prototype.HANDLED_KEYS;
}
//# sourceMappingURL=chip-row.js.map