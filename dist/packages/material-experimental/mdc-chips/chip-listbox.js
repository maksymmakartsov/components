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
import { FocusKeyManager } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { END, HOME } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Input, Optional, Output, QueryList, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MDCChipSetFoundation } from '@material/chips';
import { merge } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { MatChipOption } from './chip-option';
import { MatChipSet } from './chip-set';
/**
 * Change event object that is emitted when the chip listbox value has changed.
 */
export class MatChipListboxChange {
    /**
     * @param {?} source
     * @param {?} value
     */
    constructor(source, value) {
        this.source = source;
        this.value = value;
    }
}
if (false) {
    /**
     * Chip listbox that emitted the event.
     * @type {?}
     */
    MatChipListboxChange.prototype.source;
    /**
     * Value of the chip listbox when the event was emitted.
     * @type {?}
     */
    MatChipListboxChange.prototype.value;
}
/**
 * Provider Expression that allows mat-chip-listbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * \@docs-private
 * @type {?}
 */
export const MAT_CHIP_LISTBOX_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => MatChipListbox)),
    multi: true
};
/**
 * An extension of the MatChipSet component that supports chip selection.
 * Used with MatChipOption chips.
 */
export class MatChipListbox extends MatChipSet {
    /**
     * @param {?} _elementRef
     * @param {?} _changeDetectorRef
     * @param {?} _dir
     */
    constructor(_elementRef, _changeDetectorRef, _dir) {
        super(_elementRef, _changeDetectorRef, _dir);
        this._elementRef = _elementRef;
        /**
         * Function when touched. Set as part of ControlValueAccessor implementation.
         * \@docs-private
         */
        this._onTouched = (/**
         * @return {?}
         */
        () => { });
        /**
         * Function when changed. Set as part of ControlValueAccessor implementation.
         * \@docs-private
         */
        this._onChange = (/**
         * @return {?}
         */
        () => { });
        this._multiple = false;
        /**
         * Orientation of the chip list.
         */
        this.ariaOrientation = 'horizontal';
        this._selectable = true;
        this._compareWith = (/**
         * @param {?} o1
         * @param {?} o2
         * @return {?}
         */
        (o1, o2) => o1 === o2);
        this._required = false;
        /**
         * Event emitted when the selected chip listbox value has been changed by the user.
         */
        this.change = new EventEmitter();
        this._chipSetAdapter.selectChipAtIndex = (/**
         * @param {?} index
         * @param {?} selected
         * @return {?}
         */
        (index, selected) => {
            this._setSelected(index, selected);
        });
        // Reinitialize the foundation with our overridden adapter
        this._chipSetFoundation = new MDCChipSetFoundation(this._chipSetAdapter);
        this._updateMdcSelectionClasses();
    }
    /**
     * The ARIA role applied to the chip listbox.
     * @return {?}
     */
    get role() { return this.empty ? null : 'listbox'; }
    /**
     * Whether the user should be allowed to select multiple chips.
     * @return {?}
     */
    get multiple() { return this._multiple; }
    /**
     * @param {?} value
     * @return {?}
     */
    set multiple(value) {
        this._multiple = coerceBooleanProperty(value);
        this._updateMdcSelectionClasses();
        this._syncListboxProperties();
    }
    /**
     * The array of selected chips inside the chip listbox.
     * @return {?}
     */
    get selected() {
        /** @type {?} */
        const selectedChips = this._chips.toArray().filter((/**
         * @param {?} chip
         * @return {?}
         */
        chip => chip.selected));
        return this.multiple ? selectedChips : selectedChips[0];
    }
    /**
     * Whether or not this chip listbox is selectable.
     *
     * When a chip listbox is not selectable, the selected states for all
     * the chips inside the chip listbox are always ignored.
     * @return {?}
     */
    get selectable() { return this._selectable; }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectable(value) {
        this._selectable = coerceBooleanProperty(value);
        this._updateMdcSelectionClasses();
        this._syncListboxProperties();
    }
    /**
     * A function to compare the option values with the selected values. The first argument
     * is a value from an option. The second is a value from the selection. A boolean
     * should be returned.
     * @return {?}
     */
    get compareWith() { return this._compareWith; }
    /**
     * @param {?} fn
     * @return {?}
     */
    set compareWith(fn) {
        this._compareWith = fn;
        this._initializeSelection();
    }
    /**
     * Whether this chip listbox is required.
     * @return {?}
     */
    get required() { return this._required; }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) {
        this._required = coerceBooleanProperty(value);
    }
    /**
     * Combined stream of all of the child chips' selection change events.
     * @return {?}
     */
    get chipSelectionChanges() {
        return merge(...this._chips.map((/**
         * @param {?} chip
         * @return {?}
         */
        chip => chip.selectionChange)));
    }
    /**
     * Combined stream of all of the child chips' focus events.
     * @return {?}
     */
    get chipFocusChanges() {
        return merge(...this._chips.map((/**
         * @param {?} chip
         * @return {?}
         */
        chip => chip._onFocus)));
    }
    /**
     * Combined stream of all of the child chips' blur events.
     * @return {?}
     */
    get chipBlurChanges() {
        return merge(...this._chips.map((/**
         * @param {?} chip
         * @return {?}
         */
        chip => chip._onBlur)));
    }
    /**
     * The value of the listbox, which is the combined value of the selected chips.
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this.writeValue(value);
        this._value = value;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        super.ngAfterContentInit();
        this._initKeyManager();
        this._chips.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe((/**
         * @return {?}
         */
        () => {
            // Update listbox selectable/multiple properties on chips
            this._syncListboxProperties();
            // Reset chips selected/deselected status
            this._initializeSelection();
            // Check to see if we have a destroyed chip and need to refocus
            this._updateFocusForDestroyedChips();
        }));
    }
    /**
     * Focuses the first selected chip in this chip listbox, or the first non-disabled chip when there
     * are no selected chips.
     * @return {?}
     */
    focus() {
        if (this.disabled) {
            return;
        }
        /** @type {?} */
        const firstSelectedChip = this._getFirstSelectedChip();
        if (firstSelectedChip) {
            /** @type {?} */
            const firstSelectedChipIndex = this._chips.toArray().indexOf(firstSelectedChip);
            this._keyManager.setActiveItem(firstSelectedChipIndex);
        }
        else if (this._chips.length > 0) {
            this._keyManager.setFirstItemActive();
        }
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * \@docs-private
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (this._chips) {
            this._setSelectionByValue(value, false);
        }
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * \@docs-private
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * \@docs-private
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * \@docs-private
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * Selects all chips with value.
     * @param {?} value
     * @param {?=} isUserInput
     * @return {?}
     */
    _setSelectionByValue(value, isUserInput = true) {
        this._clearSelection();
        if (Array.isArray(value)) {
            value.forEach((/**
             * @param {?} currentValue
             * @return {?}
             */
            currentValue => this._selectValue(currentValue, isUserInput)));
        }
        else {
            /** @type {?} */
            const correspondingChip = this._selectValue(value, isUserInput);
            // Shift focus to the active item. Note that we shouldn't do this in multiple
            // mode, because we don't know what chip the user interacted with last.
            if (correspondingChip) {
                if (isUserInput) {
                    this._keyManager.setActiveItem(correspondingChip);
                }
            }
        }
    }
    /**
     * Selects or deselects a chip by id.
     * @param {?} index
     * @param {?} selected
     * @return {?}
     */
    _setSelected(index, selected) {
        /** @type {?} */
        const chip = this._chips.toArray()[index];
        if (chip && chip.selected != selected) {
            chip.toggleSelected(true);
        }
    }
    /**
     * When blurred, marks the field as touched when focus moved outside the chip listbox.
     * @return {?}
     */
    _blur() {
        if (this.disabled) {
            return;
        }
        if (!this.focused) {
            this._keyManager.setActiveItem(-1);
        }
        // Wait to see if focus moves to an indivdual chip.
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (!this.focused) {
                this._propagateChanges();
                this._markAsTouched();
            }
        }));
    }
    /**
     * Removes the `tabindex` from the chip listbox and resets it back afterwards, allowing the
     * user to tab out of it. This prevents the listbox from capturing focus and redirecting
     * it back to the first chip, creating a focus trap, if it user tries to tab away.
     * @return {?}
     */
    _allowFocusEscape() {
        /** @type {?} */
        const previousTabIndex = this.tabIndex;
        if (this.tabIndex !== -1) {
            this.tabIndex = -1;
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.tabIndex = previousTabIndex;
                this._changeDetectorRef.markForCheck();
            }));
        }
    }
    /**
     * Handles custom keyboard shortcuts, and passes other keyboard events to the keyboard manager.
     * @param {?} event
     * @return {?}
     */
    _keydown(event) {
        if (this._originatesFromChip(event)) {
            if (event.keyCode === HOME) {
                this._keyManager.setFirstItemActive();
                event.preventDefault();
            }
            else if (event.keyCode === END) {
                this._keyManager.setLastItemActive();
                event.preventDefault();
            }
            else {
                this._keyManager.onKeydown(event);
            }
        }
    }
    /**
     * Marks the field as touched
     * @private
     * @return {?}
     */
    _markAsTouched() {
        this._onTouched();
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Emits change event to set the model value.
     * @private
     * @param {?=} fallbackValue
     * @return {?}
     */
    _propagateChanges(fallbackValue) {
        /** @type {?} */
        let valueToEmit = null;
        if (Array.isArray(this.selected)) {
            valueToEmit = this.selected.map((/**
             * @param {?} chip
             * @return {?}
             */
            chip => chip.value));
        }
        else {
            valueToEmit = this.selected ? this.selected.value : fallbackValue;
        }
        this._value = valueToEmit;
        this.change.emit(new MatChipListboxChange(this, valueToEmit));
        this._onChange(valueToEmit);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Initializes the chip listbox selection state to reflect any chips that were preselected.
     * @private
     * @return {?}
     */
    _initializeSelection() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            // Defer setting the value in order to avoid the "Expression
            // has changed after it was checked" errors from Angular.
            this._chips.forEach((/**
             * @param {?} chip
             * @return {?}
             */
            chip => {
                if (chip.selected) {
                    this._chipSetFoundation.select(chip.id);
                }
            }));
        }));
    }
    /**
     * Deselects every chip in the listbox.
     * @private
     * @param {?=} skip Chip that should not be deselected.
     * @return {?}
     */
    _clearSelection(skip) {
        this._chips.forEach((/**
         * @param {?} chip
         * @return {?}
         */
        chip => {
            if (chip !== skip) {
                chip.deselect();
            }
        }));
    }
    /**
     * Finds and selects the chip based on its value.
     * @private
     * @param {?} value
     * @param {?=} isUserInput
     * @return {?} Chip that has the corresponding value.
     */
    _selectValue(value, isUserInput = true) {
        /** @type {?} */
        const correspondingChip = this._chips.find((/**
         * @param {?} chip
         * @return {?}
         */
        chip => {
            return chip.value != null && this._compareWith(chip.value, value);
        }));
        if (correspondingChip) {
            isUserInput ? correspondingChip.selectViaInteraction() : correspondingChip.select();
        }
        return correspondingChip;
    }
    /**
     * Syncs the chip-listbox selection state with the individual chips.
     * @private
     * @return {?}
     */
    _syncListboxProperties() {
        if (this._chips) {
            // Defer setting the value in order to avoid the "Expression
            // has changed after it was checked" errors from Angular.
            Promise.resolve().then((/**
             * @return {?}
             */
            () => {
                this._chips.forEach((/**
                 * @param {?} chip
                 * @return {?}
                 */
                chip => {
                    chip._chipListMultiple = this.multiple;
                    chip.chipListSelectable = this._selectable;
                    chip._changeDetectorRef.markForCheck();
                }));
            }));
        }
    }
    /**
     * Sets the mdc classes for single vs multi selection.
     * @private
     * @return {?}
     */
    _updateMdcSelectionClasses() {
        this._setMdcClass('mdc-chip-set--filter', this.selectable && this.multiple);
        this._setMdcClass('mdc-chip-set--choice', this.selectable && !this.multiple);
    }
    /**
     * Initializes the key manager to manage focus.
     * @private
     * @return {?}
     */
    _initKeyManager() {
        this._keyManager = new FocusKeyManager(this._chips)
            .withWrap()
            .withVerticalOrientation()
            .withHorizontalOrientation(this._dir ? this._dir.value : 'ltr');
        if (this._dir) {
            this._dir.change
                .pipe(takeUntil(this._destroyed))
                .subscribe((/**
             * @param {?} dir
             * @return {?}
             */
            dir => this._keyManager.withHorizontalOrientation(dir)));
        }
        this._keyManager.tabOut.pipe(takeUntil(this._destroyed)).subscribe((/**
         * @return {?}
         */
        () => {
            this._allowFocusEscape();
        }));
    }
    /**
     * Returns the first selected chip in this listbox, or undefined if no chips are selected.
     * @private
     * @return {?}
     */
    _getFirstSelectedChip() {
        if (Array.isArray(this.selected)) {
            return this.selected.length ? this.selected[0] : undefined;
        }
        else {
            return this.selected;
        }
    }
    /**
     * Unsubscribes from all chip events.
     * @protected
     * @return {?}
     */
    _dropSubscriptions() {
        super._dropSubscriptions();
        if (this._chipSelectionSubscription) {
            this._chipSelectionSubscription.unsubscribe();
            this._chipSelectionSubscription = null;
        }
        if (this._chipBlurSubscription) {
            this._chipBlurSubscription.unsubscribe();
            this._chipBlurSubscription = null;
        }
        if (this._chipFocusSubscription) {
            this._chipFocusSubscription.unsubscribe();
            this._chipFocusSubscription = null;
        }
    }
    /**
     * Subscribes to events on the child chips.
     * @protected
     * @return {?}
     */
    _subscribeToChipEvents() {
        super._subscribeToChipEvents();
        this._listenToChipsSelection();
        this._listenToChipsFocus();
        this._listenToChipsBlur();
    }
    /**
     * Subscribes to chip focus events.
     * @private
     * @return {?}
     */
    _listenToChipsFocus() {
        this._chipFocusSubscription = this.chipFocusChanges.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            let chipIndex = this._chips.toArray().indexOf((/** @type {?} */ (event.chip)));
            if (this._isValidIndex(chipIndex)) {
                this._keyManager.updateActiveItemIndex(chipIndex);
            }
        }));
    }
    /**
     * Subscribes to chip blur events.
     * @private
     * @return {?}
     */
    _listenToChipsBlur() {
        this._chipBlurSubscription = this.chipBlurChanges.subscribe((/**
         * @return {?}
         */
        () => {
            this._blur();
        }));
    }
    /**
     * Subscribes to selection changes in the option chips.
     * @private
     * @return {?}
     */
    _listenToChipsSelection() {
        this._chipSelectionSubscription = this.chipSelectionChanges.subscribe((/**
         * @param {?} chipSelectionChange
         * @return {?}
         */
        (chipSelectionChange) => {
            this._chipSetFoundation.handleChipSelection(chipSelectionChange.source.id, chipSelectionChange.selected, false);
            if (chipSelectionChange.isUserInput) {
                this._propagateChanges();
            }
        }));
    }
    /**
     * If the amount of chips changed, we need to update the
     * key manager state and focus the next closest chip.
     * @private
     * @return {?}
     */
    _updateFocusForDestroyedChips() {
        // Move focus to the closest chip. If no other chips remain, focus the chip-listbox itself.
        if (this._lastDestroyedChipIndex != null) {
            if (this._chips.length) {
                /** @type {?} */
                const newChipIndex = Math.min(this._lastDestroyedChipIndex, this._chips.length - 1);
                this._keyManager.setActiveItem(newChipIndex);
            }
            else {
                this.focus();
            }
        }
        this._lastDestroyedChipIndex = null;
    }
}
MatChipListbox.decorators = [
    { type: Component, args: [{selector: 'mat-chip-listbox',
                template: '<ng-content></ng-content>',
                styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}.mdc-chip__icon--trailing[dir=rtl],[dir=rtl] .mdc-chip__icon--trailing{margin-left:-4px;margin-right:4px}.mdc-chip{border-radius:16px;height:32px;display:inline-flex;position:relative;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:0;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip.mdc-chip--selected .mdc-chip__checkmark{margin-left:-4px;margin-right:4px}.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl],.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark{margin-left:4px;margin-right:-4px}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;left:0;height:48px;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:0;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(.4,0,.6,1);stroke-width:2px;stroke-dashoffset:29.78334;stroke-dasharray:29.78334}.mdc-chip__text:focus{outline:0}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(.4,0,.2,1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0s}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry .1s cubic-bezier(0,0,.2,1)}._mat-animation-noopable{transition:none;animation:none}.mat-mdc-chip{cursor:default;overflow:hidden;transform:translateZ(0)}@media (-ms-high-contrast:active){.mat-mdc-chip{outline:solid 1px}.mat-mdc-chip:focus{outline:dotted 2px}}.mat-mdc-chip:not(.mat-mdc-chip-disabled) div:focus .mdc-chip__text::after,.mat-mdc-chip:not(.mat-mdc-chip-disabled):focus .mdc-chip__text::after,.mat-mdc-chip:not(.mat-mdc-chip-disabled):hover .mdc-chip__text::after{content:'';position:absolute;width:100%;height:100%;background:#000;opacity:.2;top:0;left:0;pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-chip-row-focusable-text-content,.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon{pointer-events:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}"],
                inputs: ['tabIndex'],
                host: {
                    'class': 'mat-mdc-chip-set mat-mdc-chip-listbox mdc-chip-set',
                    '[attr.role]': 'role',
                    '[tabIndex]': 'empty ? -1 : tabIndex',
                    // TODO: replace this binding with use of AriaDescriber
                    '[attr.aria-describedby]': '_ariaDescribedby || null',
                    '[attr.aria-required]': 'required.toString()',
                    '[attr.aria-disabled]': 'disabled.toString()',
                    '[attr.aria-multiselectable]': 'multiple',
                    '[attr.aria-orientation]': 'ariaOrientation',
                    '[class.mat-mdc-chip-list-disabled]': 'disabled',
                    '[class.mat-mdc-chip-list-required]': 'required',
                    '(focus)': 'focus()',
                    '(blur)': '_blur()',
                    '(keydown)': '_keydown($event)',
                    '[id]': '_uid',
                },
                providers: [MAT_CHIP_LISTBOX_CONTROL_VALUE_ACCESSOR],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/** @nocollapse */
MatChipListbox.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Directionality, decorators: [{ type: Optional }] }
];
MatChipListbox.propDecorators = {
    multiple: [{ type: Input }],
    ariaOrientation: [{ type: Input, args: ['aria-orientation',] }],
    selectable: [{ type: Input }],
    compareWith: [{ type: Input }],
    required: [{ type: Input }],
    value: [{ type: Input }],
    change: [{ type: Output }],
    _chips: [{ type: ContentChildren, args: [MatChipOption, {
                    // We need to use `descendants: true`, because Ivy will no longer match
                    // indirect descendants if it's left as false.
                    descendants: true
                },] }]
};
if (false) {
    /**
     * Subscription to selection changes in the chips.
     * @type {?}
     * @private
     */
    MatChipListbox.prototype._chipSelectionSubscription;
    /**
     * Subscription to blur changes in the chips.
     * @type {?}
     * @private
     */
    MatChipListbox.prototype._chipBlurSubscription;
    /**
     * Subscription to focus changes in the chips.
     * @type {?}
     * @private
     */
    MatChipListbox.prototype._chipFocusSubscription;
    /**
     * The FocusKeyManager which handles focus.
     * @type {?}
     */
    MatChipListbox.prototype._keyManager;
    /**
     * Function when touched. Set as part of ControlValueAccessor implementation.
     * \@docs-private
     * @type {?}
     */
    MatChipListbox.prototype._onTouched;
    /**
     * Function when changed. Set as part of ControlValueAccessor implementation.
     * \@docs-private
     * @type {?}
     */
    MatChipListbox.prototype._onChange;
    /**
     * @type {?}
     * @private
     */
    MatChipListbox.prototype._multiple;
    /**
     * Orientation of the chip list.
     * @type {?}
     */
    MatChipListbox.prototype.ariaOrientation;
    /**
     * @type {?}
     * @protected
     */
    MatChipListbox.prototype._selectable;
    /**
     * @type {?}
     * @private
     */
    MatChipListbox.prototype._compareWith;
    /**
     * @type {?}
     * @protected
     */
    MatChipListbox.prototype._required;
    /**
     * @type {?}
     * @protected
     */
    MatChipListbox.prototype._value;
    /**
     * Event emitted when the selected chip listbox value has been changed by the user.
     * @type {?}
     */
    MatChipListbox.prototype.change;
    /** @type {?} */
    MatChipListbox.prototype._chips;
    /**
     * @type {?}
     * @protected
     */
    MatChipListbox.prototype._elementRef;
}
//# sourceMappingURL=chip-listbox.js.map