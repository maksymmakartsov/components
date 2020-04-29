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
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BACKSPACE, TAB } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input, Optional, Output, QueryList, Self, ViewEncapsulation } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher, mixinErrorState, } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { merge } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { MatChipRow } from './chip-row';
import { MatChipSet } from './chip-set';
import { GridFocusKeyManager } from './grid-focus-key-manager';
/**
 * Change event object that is emitted when the chip grid value has changed.
 */
var /**
 * Change event object that is emitted when the chip grid value has changed.
 */
MatChipGridChange = /** @class */ (function () {
    function MatChipGridChange(source, value) {
        this.source = source;
        this.value = value;
    }
    return MatChipGridChange;
}());
/**
 * Change event object that is emitted when the chip grid value has changed.
 */
export { MatChipGridChange };
if (false) {
    /**
     * Chip grid that emitted the event.
     * @type {?}
     */
    MatChipGridChange.prototype.source;
    /**
     * Value of the chip grid when the event was emitted.
     * @type {?}
     */
    MatChipGridChange.prototype.value;
}
/**
 * Boilerplate for applying mixins to MatChipGrid.
 * \@docs-private
 */
var /**
 * Boilerplate for applying mixins to MatChipGrid.
 * \@docs-private
 */
MatChipGridBase = /** @class */ (function (_super) {
    tslib_1.__extends(MatChipGridBase, _super);
    function MatChipGridBase(_elementRef, _changeDetectorRef, _dir, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) {
        var _this = _super.call(this, _elementRef, _changeDetectorRef, _dir) || this;
        _this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        _this._parentForm = _parentForm;
        _this._parentFormGroup = _parentFormGroup;
        _this.ngControl = ngControl;
        return _this;
    }
    return MatChipGridBase;
}(MatChipSet));
if (false) {
    /** @type {?} */
    MatChipGridBase.prototype._defaultErrorStateMatcher;
    /** @type {?} */
    MatChipGridBase.prototype._parentForm;
    /** @type {?} */
    MatChipGridBase.prototype._parentFormGroup;
    /**
     * \@docs-private
     * @type {?}
     */
    MatChipGridBase.prototype.ngControl;
}
/** @type {?} */
var _MatChipGridMixinBase = mixinErrorState(MatChipGridBase);
/**
 * An extension of the MatChipSet component used with MatChipRow chips and
 * the matChipInputFor directive.
 */
var MatChipGrid = /** @class */ (function (_super) {
    tslib_1.__extends(MatChipGrid, _super);
    function MatChipGrid(_elementRef, _changeDetectorRef, _dir, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, ngControl) {
        var _this = _super.call(this, _elementRef, _changeDetectorRef, _dir, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) || this;
        _this.ngControl = ngControl;
        /**
         * Implemented as part of MatFormFieldControl.
         * \@docs-private
         */
        _this.controlType = 'mat-chip-grid';
        /**
         * Function when touched. Set as part of ControlValueAccessor implementation.
         * \@docs-private
         */
        _this._onTouched = (/**
         * @return {?}
         */
        function () { });
        /**
         * Function when changed. Set as part of ControlValueAccessor implementation.
         * \@docs-private
         */
        _this._onChange = (/**
         * @return {?}
         */
        function () { });
        _this._required = false;
        /**
         * Emits when the chip grid value has been changed by the user.
         */
        _this.change = new EventEmitter();
        /**
         * Emits whenever the raw value of the chip-grid changes. This is here primarily
         * to facilitate the two-way binding for the `value` input.
         * \@docs-private
         */
        _this.valueChange = new EventEmitter();
        if (_this.ngControl) {
            _this.ngControl.valueAccessor = _this;
        }
        return _this;
    }
    Object.defineProperty(MatChipGrid.prototype, "disabled", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of MatFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () { return this.ngControl ? !!this.ngControl.disabled : this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = coerceBooleanProperty(value);
            this._syncChipsState();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipGrid.prototype, "id", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of MatFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () { return this._chipInput.id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipGrid.prototype, "empty", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of MatFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () { return this._chipInput.empty && this._chips.length === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipGrid.prototype, "role", {
        /** The ARIA role applied to the chip grid. */
        get: /**
         * The ARIA role applied to the chip grid.
         * @return {?}
         */
        function () { return this.empty ? null : 'grid'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipGrid.prototype, "placeholder", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of MatFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            return this._chipInput ? this._chipInput.placeholder : this._placeholder;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._placeholder = value;
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipGrid.prototype, "focused", {
        /** Whether any chips or the matChipInput inside of this chip-grid has focus. */
        get: /**
         * Whether any chips or the matChipInput inside of this chip-grid has focus.
         * @return {?}
         */
        function () { return this._chipInput.focused || this._hasFocusedChip(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipGrid.prototype, "required", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of MatFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () { return this._required; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._required = coerceBooleanProperty(value);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipGrid.prototype, "shouldLabelFloat", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of MatFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () { return !this.empty || this.focused; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipGrid.prototype, "value", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of MatFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () { return this._value; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipGrid.prototype, "chipBlurChanges", {
        /** Combined stream of all of the child chips' blur events. */
        get: /**
         * Combined stream of all of the child chips' blur events.
         * @return {?}
         */
        function () {
            return merge.apply(void 0, this._chips.map((/**
             * @param {?} chip
             * @return {?}
             */
            function (chip) { return chip._onBlur; })));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipGrid.prototype, "chipFocusChanges", {
        /** Combined stream of all of the child chips' focus events. */
        get: /**
         * Combined stream of all of the child chips' focus events.
         * @return {?}
         */
        function () {
            return merge.apply(void 0, this._chips.map((/**
             * @param {?} chip
             * @return {?}
             */
            function (chip) { return chip._onFocus; })));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatChipGrid.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngAfterContentInit.call(this);
        this._initKeyManager();
        this._chips.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe((/**
         * @return {?}
         */
        function () {
            // Check to see if we have a destroyed chip and need to refocus
            _this._updateFocusForDestroyedChips();
            _this.stateChanges.next();
        }));
    };
    /**
     * @return {?}
     */
    MatChipGrid.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngAfterViewInit.call(this);
        if (!this._chipInput) {
            throw Error('mat-chip-grid must be used in combination with matChipInputFor.');
        }
    };
    /**
     * @return {?}
     */
    MatChipGrid.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    };
    /**
     * @return {?}
     */
    MatChipGrid.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        this.stateChanges.complete();
    };
    /** Associates an HTML input element with this chip grid. */
    /**
     * Associates an HTML input element with this chip grid.
     * @param {?} inputElement
     * @return {?}
     */
    MatChipGrid.prototype.registerInput = /**
     * Associates an HTML input element with this chip grid.
     * @param {?} inputElement
     * @return {?}
     */
    function (inputElement) {
        this._chipInput = inputElement;
        this._setMdcClass('mdc-chip-set--input', true);
    };
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    /**
     * Implemented as part of MatFormFieldControl.
     * \@docs-private
     * @param {?} event
     * @return {?}
     */
    MatChipGrid.prototype.onContainerClick = /**
     * Implemented as part of MatFormFieldControl.
     * \@docs-private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this._originatesFromChip(event) && !this.disabled) {
            this.focus();
        }
    };
    /**
     * Focuses the first chip in this chip grid, or the associated input when there
     * are no eligible chips.
     */
    /**
     * Focuses the first chip in this chip grid, or the associated input when there
     * are no eligible chips.
     * @return {?}
     */
    MatChipGrid.prototype.focus = /**
     * Focuses the first chip in this chip grid, or the associated input when there
     * are no eligible chips.
     * @return {?}
     */
    function () {
        if (this.disabled || this._chipInput.focused) {
            return;
        }
        if (this._chips.length > 0) {
            this._keyManager.setFirstCellActive();
        }
        else {
            this._focusInput();
        }
        this.stateChanges.next();
    };
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    /**
     * Implemented as part of MatFormFieldControl.
     * \@docs-private
     * @param {?} ids
     * @return {?}
     */
    MatChipGrid.prototype.setDescribedByIds = /**
     * Implemented as part of MatFormFieldControl.
     * \@docs-private
     * @param {?} ids
     * @return {?}
     */
    function (ids) { this._ariaDescribedby = ids.join(' '); };
    /**
     * Implemented as part of ControlValueAccessor.
     * @docs-private
     */
    /**
     * Implemented as part of ControlValueAccessor.
     * \@docs-private
     * @param {?} value
     * @return {?}
     */
    MatChipGrid.prototype.writeValue = /**
     * Implemented as part of ControlValueAccessor.
     * \@docs-private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // The user is responsible for creating the child chips, so we just store the value.
        this._value = value;
    };
    /**
     * Implemented as part of ControlValueAccessor.
     * @docs-private
     */
    /**
     * Implemented as part of ControlValueAccessor.
     * \@docs-private
     * @param {?} fn
     * @return {?}
     */
    MatChipGrid.prototype.registerOnChange = /**
     * Implemented as part of ControlValueAccessor.
     * \@docs-private
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onChange = fn;
    };
    /**
     * Implemented as part of ControlValueAccessor.
     * @docs-private
     */
    /**
     * Implemented as part of ControlValueAccessor.
     * \@docs-private
     * @param {?} fn
     * @return {?}
     */
    MatChipGrid.prototype.registerOnTouched = /**
     * Implemented as part of ControlValueAccessor.
     * \@docs-private
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onTouched = fn;
    };
    /**
     * Implemented as part of ControlValueAccessor.
     * @docs-private
     */
    /**
     * Implemented as part of ControlValueAccessor.
     * \@docs-private
     * @param {?} isDisabled
     * @return {?}
     */
    MatChipGrid.prototype.setDisabledState = /**
     * Implemented as part of ControlValueAccessor.
     * \@docs-private
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
        this.stateChanges.next();
    };
    /** When blurred, mark the field as touched when focus moved outside the chip grid. */
    /**
     * When blurred, mark the field as touched when focus moved outside the chip grid.
     * @return {?}
     */
    MatChipGrid.prototype._blur = /**
     * When blurred, mark the field as touched when focus moved outside the chip grid.
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.disabled) {
            return;
        }
        // Check whether the focus moved to chip input.
        // If the focus is not moved to chip input, mark the field as touched. If the focus moved
        // to chip input, do nothing.
        // Timeout is needed to wait for the focus() event trigger on chip input.
        setTimeout((/**
         * @return {?}
         */
        function () {
            if (!_this.focused) {
                _this._keyManager.setActiveCell({ row: -1, column: -1 });
                _this._propagateChanges();
                _this._markAsTouched();
            }
        }));
    };
    /**
     * Removes the `tabindex` from the chip grid and resets it back afterwards, allowing the
     * user to tab out of it. This prevents the grid from capturing focus and redirecting
     * it back to the first chip, creating a focus trap, if it user tries to tab away.
     */
    /**
     * Removes the `tabindex` from the chip grid and resets it back afterwards, allowing the
     * user to tab out of it. This prevents the grid from capturing focus and redirecting
     * it back to the first chip, creating a focus trap, if it user tries to tab away.
     * @return {?}
     */
    MatChipGrid.prototype._allowFocusEscape = /**
     * Removes the `tabindex` from the chip grid and resets it back afterwards, allowing the
     * user to tab out of it. This prevents the grid from capturing focus and redirecting
     * it back to the first chip, creating a focus trap, if it user tries to tab away.
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._chipInput.focused) {
            return;
        }
        /** @type {?} */
        var previousTabIndex = this.tabIndex;
        if (this.tabIndex !== -1) {
            this.tabIndex = -1;
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.tabIndex = previousTabIndex;
                _this._changeDetectorRef.markForCheck();
            }));
        }
    };
    /** Handles custom keyboard events. */
    /**
     * Handles custom keyboard events.
     * @param {?} event
     * @return {?}
     */
    MatChipGrid.prototype._keydown = /**
     * Handles custom keyboard events.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var target = (/** @type {?} */ (event.target));
        // If they are on an empty input and hit backspace, focus the last chip
        if (event.keyCode === BACKSPACE && this._isEmptyInput(target)) {
            if (this._chips.length) {
                this._keyManager.setLastCellActive();
            }
            event.preventDefault();
        }
        else if (event.keyCode === TAB && target.id !== (/** @type {?} */ (this._chipInput)).id) {
            this._allowFocusEscape();
        }
        else if (this._originatesFromChip(event)) {
            this._keyManager.onKeydown(event);
        }
        this.stateChanges.next();
    };
    /** Unsubscribes from all chip events. */
    /**
     * Unsubscribes from all chip events.
     * @protected
     * @return {?}
     */
    MatChipGrid.prototype._dropSubscriptions = /**
     * Unsubscribes from all chip events.
     * @protected
     * @return {?}
     */
    function () {
        _super.prototype._dropSubscriptions.call(this);
        if (this._chipBlurSubscription) {
            this._chipBlurSubscription.unsubscribe();
            this._chipBlurSubscription = null;
        }
        if (this._chipFocusSubscription) {
            this._chipFocusSubscription.unsubscribe();
            this._chipFocusSubscription = null;
        }
    };
    /** Subscribes to events on the child chips. */
    /**
     * Subscribes to events on the child chips.
     * @protected
     * @return {?}
     */
    MatChipGrid.prototype._subscribeToChipEvents = /**
     * Subscribes to events on the child chips.
     * @protected
     * @return {?}
     */
    function () {
        _super.prototype._subscribeToChipEvents.call(this);
        this._listenToChipsFocus();
        this._listenToChipsBlur();
    };
    /** Initializes the key manager to manage focus. */
    /**
     * Initializes the key manager to manage focus.
     * @private
     * @return {?}
     */
    MatChipGrid.prototype._initKeyManager = /**
     * Initializes the key manager to manage focus.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._keyManager = new GridFocusKeyManager(this._chips)
            .withDirectionality(this._dir ? this._dir.value : 'ltr');
        if (this._dir) {
            this._dir.change
                .pipe(takeUntil(this._destroyed))
                .subscribe((/**
             * @param {?} dir
             * @return {?}
             */
            function (dir) { return _this._keyManager.withDirectionality(dir); }));
        }
    };
    /** Subscribes to chip focus events. */
    /**
     * Subscribes to chip focus events.
     * @private
     * @return {?}
     */
    MatChipGrid.prototype._listenToChipsFocus = /**
     * Subscribes to chip focus events.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._chipFocusSubscription = this.chipFocusChanges.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var chipIndex = _this._chips.toArray().indexOf((/** @type {?} */ (event.chip)));
            if (_this._isValidIndex(chipIndex)) {
                _this._keyManager.updateActiveCell({ row: chipIndex, column: 0 });
            }
        }));
    };
    /** Subscribes to chip blur events. */
    /**
     * Subscribes to chip blur events.
     * @private
     * @return {?}
     */
    MatChipGrid.prototype._listenToChipsBlur = /**
     * Subscribes to chip blur events.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._chipBlurSubscription = this.chipBlurChanges.subscribe((/**
         * @return {?}
         */
        function () {
            _this._blur();
            _this.stateChanges.next();
        }));
    };
    /** Emits change event to set the model value. */
    /**
     * Emits change event to set the model value.
     * @private
     * @param {?=} fallbackValue
     * @return {?}
     */
    MatChipGrid.prototype._propagateChanges = /**
     * Emits change event to set the model value.
     * @private
     * @param {?=} fallbackValue
     * @return {?}
     */
    function (fallbackValue) {
        /** @type {?} */
        var valueToEmit = this._chips.length ? this._chips.toArray().map((/**
         * @param {?} chip
         * @return {?}
         */
        function (chip) { return chip.value; })) : fallbackValue;
        this._value = valueToEmit;
        this.change.emit(new MatChipGridChange(this, valueToEmit));
        this.valueChange.emit(valueToEmit);
        this._onChange(valueToEmit);
        this._changeDetectorRef.markForCheck();
    };
    /** Mark the field as touched */
    /**
     * Mark the field as touched
     * @private
     * @return {?}
     */
    MatChipGrid.prototype._markAsTouched = /**
     * Mark the field as touched
     * @private
     * @return {?}
     */
    function () {
        this._onTouched();
        this._changeDetectorRef.markForCheck();
        this.stateChanges.next();
    };
    /**
     * If the amount of chips changed, we need to focus the next closest chip.
     */
    /**
     * If the amount of chips changed, we need to focus the next closest chip.
     * @private
     * @return {?}
     */
    MatChipGrid.prototype._updateFocusForDestroyedChips = /**
     * If the amount of chips changed, we need to focus the next closest chip.
     * @private
     * @return {?}
     */
    function () {
        // Move focus to the closest chip. If no other chips remain, focus the chip-grid itself.
        if (this._lastDestroyedChipIndex != null) {
            if (this._chips.length) {
                /** @type {?} */
                var newChipIndex = Math.min(this._lastDestroyedChipIndex, this._chips.length - 1);
                this._keyManager.setActiveCell({
                    row: newChipIndex,
                    column: this._keyManager.activeColumnIndex
                });
            }
            else {
                this.focus();
            }
        }
        this._lastDestroyedChipIndex = null;
    };
    /** Focus input element. */
    /**
     * Focus input element.
     * @private
     * @return {?}
     */
    MatChipGrid.prototype._focusInput = /**
     * Focus input element.
     * @private
     * @return {?}
     */
    function () {
        this._chipInput.focus();
    };
    /** Returns true if element is an input with no value. */
    /**
     * Returns true if element is an input with no value.
     * @private
     * @param {?} element
     * @return {?}
     */
    MatChipGrid.prototype._isEmptyInput = /**
     * Returns true if element is an input with no value.
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        if (element && element.id === (/** @type {?} */ (this._chipInput)).id) {
            return this._chipInput.empty;
        }
        return false;
    };
    MatChipGrid.decorators = [
        { type: Component, args: [{selector: 'mat-chip-grid',
                    template: '<ng-content></ng-content>',
                    styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}.mdc-chip__icon--trailing[dir=rtl],[dir=rtl] .mdc-chip__icon--trailing{margin-left:-4px;margin-right:4px}.mdc-chip{border-radius:16px;height:32px;display:inline-flex;position:relative;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:0;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip.mdc-chip--selected .mdc-chip__checkmark{margin-left:-4px;margin-right:4px}.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl],.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark{margin-left:4px;margin-right:-4px}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;left:0;height:48px;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:0;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(.4,0,.6,1);stroke-width:2px;stroke-dashoffset:29.78334;stroke-dasharray:29.78334}.mdc-chip__text:focus{outline:0}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(.4,0,.2,1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0s}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry .1s cubic-bezier(0,0,.2,1)}._mat-animation-noopable{transition:none;animation:none}.mat-mdc-chip{cursor:default;overflow:hidden;transform:translateZ(0)}@media (-ms-high-contrast:active){.mat-mdc-chip{outline:solid 1px}.mat-mdc-chip:focus{outline:dotted 2px}}.mat-mdc-chip:not(.mat-mdc-chip-disabled) div:focus .mdc-chip__text::after,.mat-mdc-chip:not(.mat-mdc-chip-disabled):focus .mdc-chip__text::after,.mat-mdc-chip:not(.mat-mdc-chip-disabled):hover .mdc-chip__text::after{content:'';position:absolute;width:100%;height:100%;background:#000;opacity:.2;top:0;left:0;pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-chip-row-focusable-text-content,.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon{pointer-events:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}"],
                    inputs: ['tabIndex'],
                    host: {
                        'class': 'mat-mdc-chip-set mat-mdc-chip-grid mdc-chip-set',
                        '[attr.role]': 'role',
                        '[tabIndex]': '_chips && _chips.length === 0 ? -1 : tabIndex',
                        // TODO: replace this binding with use of AriaDescriber
                        '[attr.aria-describedby]': '_ariaDescribedby || null',
                        '[attr.aria-required]': 'required.toString()',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.aria-invalid]': 'errorState',
                        '[class.mat-mdc-chip-list-disabled]': 'disabled',
                        '[class.mat-mdc-chip-list-invalid]': 'errorState',
                        '[class.mat-mdc-chip-list-required]': 'required',
                        '(focus)': 'focus()',
                        '(blur)': '_blur()',
                        '(keydown)': '_keydown($event)',
                        '[id]': '_uid',
                    },
                    providers: [{ provide: MatFormFieldControl, useExisting: MatChipGrid }],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatChipGrid.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: NgForm, decorators: [{ type: Optional }] },
        { type: FormGroupDirective, decorators: [{ type: Optional }] },
        { type: ErrorStateMatcher },
        { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
    ]; };
    MatChipGrid.propDecorators = {
        disabled: [{ type: Input }],
        placeholder: [{ type: Input }, { type: Input }],
        required: [{ type: Input }],
        value: [{ type: Input }],
        change: [{ type: Output }],
        valueChange: [{ type: Output }],
        _chips: [{ type: ContentChildren, args: [MatChipRow, {
                        // We need to use `descendants: true`, because Ivy will no longer match
                        // indirect descendants if it's left as false.
                        descendants: true
                    },] }]
    };
    return MatChipGrid;
}(_MatChipGridMixinBase));
export { MatChipGrid };
if (false) {
    /**
     * Implemented as part of MatFormFieldControl.
     * \@docs-private
     * @type {?}
     */
    MatChipGrid.prototype.controlType;
    /**
     * Subscription to blur changes in the chips.
     * @type {?}
     * @private
     */
    MatChipGrid.prototype._chipBlurSubscription;
    /**
     * Subscription to focus changes in the chips.
     * @type {?}
     * @private
     */
    MatChipGrid.prototype._chipFocusSubscription;
    /**
     * The chip input to add more chips
     * @type {?}
     * @protected
     */
    MatChipGrid.prototype._chipInput;
    /**
     * Function when touched. Set as part of ControlValueAccessor implementation.
     * \@docs-private
     * @type {?}
     */
    MatChipGrid.prototype._onTouched;
    /**
     * Function when changed. Set as part of ControlValueAccessor implementation.
     * \@docs-private
     * @type {?}
     */
    MatChipGrid.prototype._onChange;
    /**
     * The GridFocusKeyManager which handles focus.
     * @type {?}
     */
    MatChipGrid.prototype._keyManager;
    /**
     * @type {?}
     * @protected
     */
    MatChipGrid.prototype._placeholder;
    /**
     * @type {?}
     * @protected
     */
    MatChipGrid.prototype._required;
    /**
     * @type {?}
     * @protected
     */
    MatChipGrid.prototype._value;
    /**
     * Emits when the chip grid value has been changed by the user.
     * @type {?}
     */
    MatChipGrid.prototype.change;
    /**
     * Emits whenever the raw value of the chip-grid changes. This is here primarily
     * to facilitate the two-way binding for the `value` input.
     * \@docs-private
     * @type {?}
     */
    MatChipGrid.prototype.valueChange;
    /** @type {?} */
    MatChipGrid.prototype._chips;
    /**
     * \@docs-private
     * @type {?}
     */
    MatChipGrid.prototype.ngControl;
}
//# sourceMappingURL=chip-grid.js.map