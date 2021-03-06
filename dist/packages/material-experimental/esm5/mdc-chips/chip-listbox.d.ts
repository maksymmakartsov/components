/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusKeyManager } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, QueryList } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatChip, MatChipEvent } from './chip';
import { MatChipOption, MatChipSelectionChange } from './chip-option';
import { MatChipSet } from './chip-set';
/** Change event object that is emitted when the chip listbox value has changed. */
export declare class MatChipListboxChange {
    /** Chip listbox that emitted the event. */
    source: MatChipListbox;
    /** Value of the chip listbox when the event was emitted. */
    value: any;
    constructor(
    /** Chip listbox that emitted the event. */
    source: MatChipListbox, 
    /** Value of the chip listbox when the event was emitted. */
    value: any);
}
/**
 * Provider Expression that allows mat-chip-listbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export declare const MAT_CHIP_LISTBOX_CONTROL_VALUE_ACCESSOR: any;
/**
 * An extension of the MatChipSet component that supports chip selection.
 * Used with MatChipOption chips.
 */
export declare class MatChipListbox extends MatChipSet implements AfterContentInit, ControlValueAccessor {
    protected _elementRef: ElementRef;
    /** Subscription to selection changes in the chips. */
    private _chipSelectionSubscription;
    /** Subscription to blur changes in the chips. */
    private _chipBlurSubscription;
    /** Subscription to focus changes in the chips. */
    private _chipFocusSubscription;
    /** The FocusKeyManager which handles focus. */
    _keyManager: FocusKeyManager<MatChip>;
    /**
     * Function when touched. Set as part of ControlValueAccessor implementation.
     * @docs-private
     */
    _onTouched: () => void;
    /**
     * Function when changed. Set as part of ControlValueAccessor implementation.
     * @docs-private
     */
    _onChange: (value: any) => void;
    /** The ARIA role applied to the chip listbox. */
    readonly role: string | null;
    /** Whether the user should be allowed to select multiple chips. */
    multiple: boolean;
    private _multiple;
    /** The array of selected chips inside the chip listbox. */
    readonly selected: MatChipOption[] | MatChipOption;
    /** Orientation of the chip list. */
    ariaOrientation: 'horizontal' | 'vertical';
    /**
     * Whether or not this chip listbox is selectable.
     *
     * When a chip listbox is not selectable, the selected states for all
     * the chips inside the chip listbox are always ignored.
     */
    selectable: boolean;
    protected _selectable: boolean;
    /**
     * A function to compare the option values with the selected values. The first argument
     * is a value from an option. The second is a value from the selection. A boolean
     * should be returned.
     */
    compareWith: (o1: any, o2: any) => boolean;
    private _compareWith;
    /** Whether this chip listbox is required. */
    required: boolean;
    protected _required: boolean;
    /** Combined stream of all of the child chips' selection change events. */
    readonly chipSelectionChanges: Observable<MatChipSelectionChange>;
    /** Combined stream of all of the child chips' focus events. */
    readonly chipFocusChanges: Observable<MatChipEvent>;
    /** Combined stream of all of the child chips' blur events. */
    readonly chipBlurChanges: Observable<MatChipEvent>;
    /** The value of the listbox, which is the combined value of the selected chips. */
    value: any;
    protected _value: any;
    /** Event emitted when the selected chip listbox value has been changed by the user. */
    readonly change: EventEmitter<MatChipListboxChange>;
    _chips: QueryList<MatChipOption>;
    constructor(_elementRef: ElementRef, _changeDetectorRef: ChangeDetectorRef, _dir: Directionality);
    ngAfterContentInit(): void;
    /**
     * Focuses the first selected chip in this chip listbox, or the first non-disabled chip when there
     * are no selected chips.
     */
    focus(): void;
    /**
     * Implemented as part of ControlValueAccessor.
     * @docs-private
     */
    writeValue(value: any): void;
    /**
     * Implemented as part of ControlValueAccessor.
     * @docs-private
     */
    registerOnChange(fn: (value: any) => void): void;
    /**
     * Implemented as part of ControlValueAccessor.
     * @docs-private
     */
    registerOnTouched(fn: () => void): void;
    /**
     * Implemented as part of ControlValueAccessor.
     * @docs-private
     */
    setDisabledState(isDisabled: boolean): void;
    /** Selects all chips with value. */
    _setSelectionByValue(value: any, isUserInput?: boolean): void;
    /** Selects or deselects a chip by id. */
    _setSelected(index: number, selected: boolean): void;
    /** When blurred, marks the field as touched when focus moved outside the chip listbox. */
    _blur(): void;
    /**
     * Removes the `tabindex` from the chip listbox and resets it back afterwards, allowing the
     * user to tab out of it. This prevents the listbox from capturing focus and redirecting
     * it back to the first chip, creating a focus trap, if it user tries to tab away.
     */
    _allowFocusEscape(): void;
    /**
     * Handles custom keyboard shortcuts, and passes other keyboard events to the keyboard manager.
     */
    _keydown(event: KeyboardEvent): void;
    /** Marks the field as touched */
    private _markAsTouched;
    /** Emits change event to set the model value. */
    private _propagateChanges;
    /**
     * Initializes the chip listbox selection state to reflect any chips that were preselected.
     */
    private _initializeSelection;
    /**
     * Deselects every chip in the listbox.
     * @param skip Chip that should not be deselected.
     */
    private _clearSelection;
    /**
     * Finds and selects the chip based on its value.
     * @returns Chip that has the corresponding value.
     */
    private _selectValue;
    /** Syncs the chip-listbox selection state with the individual chips. */
    private _syncListboxProperties;
    /** Sets the mdc classes for single vs multi selection. */
    private _updateMdcSelectionClasses;
    /** Initializes the key manager to manage focus. */
    private _initKeyManager;
    /** Returns the first selected chip in this listbox, or undefined if no chips are selected. */
    private _getFirstSelectedChip;
    /** Unsubscribes from all chip events. */
    protected _dropSubscriptions(): void;
    /** Subscribes to events on the child chips. */
    protected _subscribeToChipEvents(): void;
    /** Subscribes to chip focus events. */
    private _listenToChipsFocus;
    /** Subscribes to chip blur events. */
    private _listenToChipsBlur;
    /** Subscribes to selection changes in the option chips. */
    private _listenToChipsSelection;
    /**
     * If the amount of chips changed, we need to update the
     * key manager state and focus the next closest chip.
     */
    private _updateFocusForDestroyedChips;
}
