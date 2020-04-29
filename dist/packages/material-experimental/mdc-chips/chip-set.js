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
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, Input, Optional, QueryList, ViewEncapsulation } from '@angular/core';
import { mixinTabIndex } from '@angular/material/core';
import { MDCChipSetFoundation } from '@material/chips';
import { merge, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { MatChip } from './chip';
/** @type {?} */
let uid = 0;
/**
 * Boilerplate for applying mixins to MatChipSet.
 * \@docs-private
 */
class MatChipSetBase {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) { }
}
if (false) {
    /** @type {?} */
    MatChipSetBase.prototype.disabled;
}
/** @type {?} */
const _MatChipSetMixinBase = mixinTabIndex(MatChipSetBase);
/**
 * Basic container component for the MatChip component.
 *
 * Extended by MatChipListbox and MatChipGrid for different interaction patterns.
 */
export class MatChipSet extends _MatChipSetMixinBase {
    /**
     * @param {?} _elementRef
     * @param {?} _changeDetectorRef
     * @param {?} _dir
     */
    constructor(_elementRef, _changeDetectorRef, _dir) {
        super(_elementRef);
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._dir = _dir;
        /**
         * When a chip is destroyed, we store the index of the destroyed chip until the chips
         * query list notifies about the update. This is necessary because we cannot determine an
         * appropriate chip that should receive focus until the array of chips updated completely.
         */
        this._lastDestroyedChipIndex = null;
        /**
         * Subject that emits when the component has been destroyed.
         */
        this._destroyed = new Subject();
        /**
         * Implementation of the MDC chip-set adapter interface.
         * These methods are called by the chip set foundation.
         */
        this._chipSetAdapter = {
            hasClass: (/**
             * @param {?} className
             * @return {?}
             */
            (className) => this._hasMdcClass(className)),
            // No-op. We keep track of chips via ContentChildren, which will be updated when a chip is
            // removed.
            removeChipAtIndex: (/**
             * @return {?}
             */
            () => { }),
            // No-op for base chip set. MatChipListbox overrides the adapter to provide this method.
            selectChipAtIndex: (/**
             * @return {?}
             */
            () => { }),
            getIndexOfChipById: (/**
             * @param {?} id
             * @return {?}
             */
            (id) => this._chips.toArray().findIndex((/**
             * @param {?} chip
             * @return {?}
             */
            chip => chip.id === id))),
            focusChipPrimaryActionAtIndex: (/**
             * @return {?}
             */
            () => { }),
            focusChipTrailingActionAtIndex: (/**
             * @return {?}
             */
            () => { }),
            removeFocusFromChipAtIndex: (/**
             * @return {?}
             */
            () => { }),
            isRTL: (/**
             * @return {?}
             */
            () => !!this._dir && this._dir.value === 'rtl'),
            getChipListCount: (/**
             * @return {?}
             */
            () => this._chips.length),
        };
        /**
         * Uid of the chip set
         */
        this._uid = `mat-mdc-chip-set-${uid++}`;
        /**
         * Map from class to whether the class is enabled.
         * Enabled classes are set on the MDC chip-set div.
         */
        this._mdcClasses = {};
        this._disabled = false;
        this._chipSetFoundation = new MDCChipSetFoundation(this._chipSetAdapter);
    }
    /**
     * Whether the chip set is disabled.
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        this._syncChipsState();
    }
    /**
     * Whether the chip list contains chips or not.
     * @return {?}
     */
    get empty() { return this._chips.length === 0; }
    /**
     * The ARIA role applied to the chip set.
     * @return {?}
     */
    get role() { return this.empty ? null : 'presentation'; }
    /**
     * Whether any of the chips inside of this chip-set has focus.
     * @return {?}
     */
    get focused() { return this._hasFocusedChip(); }
    /**
     * Combined stream of all of the child chips' remove events.
     * @return {?}
     */
    get chipRemoveChanges() {
        return merge(...this._chips.map((/**
         * @param {?} chip
         * @return {?}
         */
        chip => chip.removed)));
    }
    /**
     * Combined stream of all of the child chips' remove events.
     * @return {?}
     */
    get chipDestroyedChanges() {
        return merge(...this._chips.map((/**
         * @param {?} chip
         * @return {?}
         */
        chip => chip.destroyed)));
    }
    /**
     * Combined stream of all of the child chips' interaction events.
     * @return {?}
     */
    get chipInteractionChanges() {
        return merge(...this._chips.map((/**
         * @param {?} chip
         * @return {?}
         */
        chip => chip.interaction)));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._chipSetFoundation.init();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._chips.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe((/**
         * @return {?}
         */
        () => {
            if (this.disabled) {
                // Since this happens after the content has been
                // checked, we need to defer it to the next tick.
                Promise.resolve().then((/**
                 * @return {?}
                 */
                () => {
                    this._syncChipsState();
                }));
            }
            this._resetChips();
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._dropSubscriptions();
        this._destroyed.next();
        this._destroyed.complete();
        this._chipSetFoundation.destroy();
    }
    /**
     * Checks whether any of the chips is focused.
     * @protected
     * @return {?}
     */
    _hasFocusedChip() {
        return this._chips.some((/**
         * @param {?} chip
         * @return {?}
         */
        chip => chip._hasFocus));
    }
    /**
     * Syncs the chip-set's state with the individual chips.
     * @protected
     * @return {?}
     */
    _syncChipsState() {
        if (this._chips) {
            this._chips.forEach((/**
             * @param {?} chip
             * @return {?}
             */
            chip => {
                chip.disabled = this._disabled;
                chip._changeDetectorRef.markForCheck();
            }));
        }
    }
    /**
     * Sets whether the given CSS class should be applied to the MDC chip.
     * @protected
     * @param {?} cssClass
     * @param {?} active
     * @return {?}
     */
    _setMdcClass(cssClass, active) {
        /** @type {?} */
        const classes = this._elementRef.nativeElement.classList;
        active ? classes.add(cssClass) : classes.remove(cssClass);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Adapter method that returns true if the chip set has the given MDC class.
     * @protected
     * @param {?} className
     * @return {?}
     */
    _hasMdcClass(className) {
        return this._elementRef.nativeElement.classList.contains(className);
    }
    /**
     * Updates subscriptions to chip events.
     * @private
     * @return {?}
     */
    _resetChips() {
        this._dropSubscriptions();
        this._subscribeToChipEvents();
    }
    /**
     * Subscribes to events on the child chips.
     * @protected
     * @return {?}
     */
    _subscribeToChipEvents() {
        this._listenToChipsRemove();
        this._listenToChipsDestroyed();
        this._listenToChipsInteraction();
    }
    /**
     * Subscribes to chip removal events.
     * @private
     * @return {?}
     */
    _listenToChipsRemove() {
        this._chipRemoveSubscription = this.chipRemoveChanges.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this._chipSetFoundation.handleChipRemoval(event.chip.id);
        }));
    }
    /**
     * Subscribes to chip destroyed events.
     * @private
     * @return {?}
     */
    _listenToChipsDestroyed() {
        this._chipDestroyedSubscription = this.chipDestroyedChanges.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const chip = event.chip;
            /** @type {?} */
            const chipIndex = this._chips.toArray().indexOf(event.chip);
            // In case the chip that will be removed is currently focused, we temporarily store
            // the index in order to be able to determine an appropriate sibling chip that will
            // receive focus.
            if (this._isValidIndex(chipIndex) && chip._hasFocus) {
                this._lastDestroyedChipIndex = chipIndex;
            }
        }));
    }
    /**
     * Subscribes to chip interaction events.
     * @private
     * @return {?}
     */
    _listenToChipsInteraction() {
        this._chipInteractionSubscription = this.chipInteractionChanges.subscribe((/**
         * @param {?} id
         * @return {?}
         */
        (id) => {
            this._chipSetFoundation.handleChipInteraction(id);
        }));
    }
    /**
     * Unsubscribes from all chip events.
     * @protected
     * @return {?}
     */
    _dropSubscriptions() {
        if (this._chipRemoveSubscription) {
            this._chipRemoveSubscription.unsubscribe();
            this._chipRemoveSubscription = null;
        }
        if (this._chipInteractionSubscription) {
            this._chipInteractionSubscription.unsubscribe();
            this._chipInteractionSubscription = null;
        }
        if (this._chipDestroyedSubscription) {
            this._chipDestroyedSubscription.unsubscribe();
            this._chipDestroyedSubscription = null;
        }
    }
    /**
     * Dummy method for subclasses to override. Base chip set cannot be focused.
     * @return {?}
     */
    focus() { }
    /**
     * Utility to ensure all indexes are valid.
     *
     * @protected
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of chips.
     */
    _isValidIndex(index) {
        return index >= 0 && index < this._chips.length;
    }
    /**
     * Checks whether an event comes from inside a chip element.
     * @protected
     * @param {?} event
     * @return {?}
     */
    _originatesFromChip(event) {
        /** @type {?} */
        let currentElement = (/** @type {?} */ (event.target));
        while (currentElement && currentElement !== this._elementRef.nativeElement) {
            if (currentElement.classList.contains('mdc-chip')) {
                return true;
            }
            currentElement = currentElement.parentElement;
        }
        return false;
    }
}
MatChipSet.decorators = [
    { type: Component, args: [{selector: 'mat-chip-set',
                template: '<ng-content></ng-content>',
                styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}.mdc-chip__icon--trailing[dir=rtl],[dir=rtl] .mdc-chip__icon--trailing{margin-left:-4px;margin-right:4px}.mdc-chip{border-radius:16px;height:32px;display:inline-flex;position:relative;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:0;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip.mdc-chip--selected .mdc-chip__checkmark{margin-left:-4px;margin-right:4px}.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl],.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark{margin-left:4px;margin-right:-4px}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;left:0;height:48px;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:0;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(.4,0,.6,1);stroke-width:2px;stroke-dashoffset:29.78334;stroke-dasharray:29.78334}.mdc-chip__text:focus{outline:0}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(.4,0,.2,1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0s}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry .1s cubic-bezier(0,0,.2,1)}._mat-animation-noopable{transition:none;animation:none}.mat-mdc-chip{cursor:default;overflow:hidden;transform:translateZ(0)}@media (-ms-high-contrast:active){.mat-mdc-chip{outline:solid 1px}.mat-mdc-chip:focus{outline:dotted 2px}}.mat-mdc-chip:not(.mat-mdc-chip-disabled) div:focus .mdc-chip__text::after,.mat-mdc-chip:not(.mat-mdc-chip-disabled):focus .mdc-chip__text::after,.mat-mdc-chip:not(.mat-mdc-chip-disabled):hover .mdc-chip__text::after{content:'';position:absolute;width:100%;height:100%;background:#000;opacity:.2;top:0;left:0;pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-chip-row-focusable-text-content,.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon{pointer-events:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}"],
                host: {
                    'class': 'mat-mdc-chip-set mdc-chip-set',
                    '[attr.role]': 'role',
                    // TODO: replace this binding with use of AriaDescriber
                    '[attr.aria-describedby]': '_ariaDescribedby || null',
                    '[id]': '_uid',
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/** @nocollapse */
MatChipSet.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Directionality, decorators: [{ type: Optional }] }
];
MatChipSet.propDecorators = {
    disabled: [{ type: Input }],
    _chips: [{ type: ContentChildren, args: [MatChip,] }]
};
if (false) {
    /**
     * Subscription to remove changes in chips.
     * @type {?}
     * @private
     */
    MatChipSet.prototype._chipRemoveSubscription;
    /**
     * Subscription to destroyed events in chips.
     * @type {?}
     * @private
     */
    MatChipSet.prototype._chipDestroyedSubscription;
    /**
     * Subscription to chip interactions.
     * @type {?}
     * @private
     */
    MatChipSet.prototype._chipInteractionSubscription;
    /**
     * When a chip is destroyed, we store the index of the destroyed chip until the chips
     * query list notifies about the update. This is necessary because we cannot determine an
     * appropriate chip that should receive focus until the array of chips updated completely.
     * @type {?}
     * @protected
     */
    MatChipSet.prototype._lastDestroyedChipIndex;
    /**
     * The MDC foundation containing business logic for MDC chip-set.
     * @type {?}
     * @protected
     */
    MatChipSet.prototype._chipSetFoundation;
    /**
     * Subject that emits when the component has been destroyed.
     * @type {?}
     * @protected
     */
    MatChipSet.prototype._destroyed;
    /**
     * Implementation of the MDC chip-set adapter interface.
     * These methods are called by the chip set foundation.
     * @type {?}
     * @protected
     */
    MatChipSet.prototype._chipSetAdapter;
    /**
     * The aria-describedby attribute on the chip list for improved a11y.
     * @type {?}
     */
    MatChipSet.prototype._ariaDescribedby;
    /**
     * Uid of the chip set
     * @type {?}
     */
    MatChipSet.prototype._uid;
    /**
     * Map from class to whether the class is enabled.
     * Enabled classes are set on the MDC chip-set div.
     * @type {?}
     */
    MatChipSet.prototype._mdcClasses;
    /**
     * @type {?}
     * @protected
     */
    MatChipSet.prototype._disabled;
    /**
     * The chips that are part of this chip set.
     * @type {?}
     */
    MatChipSet.prototype._chips;
    /**
     * @type {?}
     * @protected
     */
    MatChipSet.prototype._elementRef;
    /**
     * @type {?}
     * @protected
     */
    MatChipSet.prototype._changeDetectorRef;
    /**
     * @type {?}
     * @protected
     */
    MatChipSet.prototype._dir;
}
//# sourceMappingURL=chip-set.js.map