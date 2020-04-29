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
import { Platform } from '@angular/cdk/platform';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ContentChild, Directive, ElementRef, EventEmitter, Inject, Input, NgZone, Optional, Output, ViewEncapsulation } from '@angular/core';
import { MAT_RIPPLE_GLOBAL_OPTIONS, mixinColor, mixinDisableRipple, mixinTabIndex, RippleRenderer, } from '@angular/material/core';
import { MDCChipFoundation } from '@material/chips';
import { numbers } from '@material/ripple';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatChipAvatar, MatChipTrailingIcon, MatChipRemove } from './chip-icons';
/** @type {?} */
var uid = 0;
/**
 * Represents an event fired on an individual `mat-chip`.
 * @record
 */
export function MatChipEvent() { }
if (false) {
    /**
     * The chip the event was fired on.
     * @type {?}
     */
    MatChipEvent.prototype.chip;
}
/**
 * Directive to add MDC CSS to non-basic chips.
 * \@docs-private
 */
var MatChipCssInternalOnly = /** @class */ (function () {
    function MatChipCssInternalOnly() {
    }
    MatChipCssInternalOnly.decorators = [
        { type: Directive, args: [{
                    selector: "mat-chip, mat-chip-option, mat-chip-row, [mat-chip], [mat-chip-option],\n    [mat-chip-row]",
                    host: { 'class': 'mat-mdc-chip mdc-chip' }
                },] },
    ];
    return MatChipCssInternalOnly;
}());
export { MatChipCssInternalOnly };
/**
 * Boilerplate for applying mixins to MatChip.
 * \@docs-private
 */
var /**
 * Boilerplate for applying mixins to MatChip.
 * \@docs-private
 */
MatChipBase = /** @class */ (function () {
    function MatChipBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return MatChipBase;
}());
if (false) {
    /** @type {?} */
    MatChipBase.prototype.disabled;
    /** @type {?} */
    MatChipBase.prototype._elementRef;
}
/** @type {?} */
var _MatChipMixinBase = mixinTabIndex(mixinColor(mixinDisableRipple(MatChipBase), 'primary'), -1);
/**
 * Material design styled Chip base component. Used inside the MatChipSet component.
 *
 * Extended by MatChipOption and MatChipRow for different interaction patterns.
 */
var MatChip = /** @class */ (function (_super) {
    tslib_1.__extends(MatChip, _super);
    function MatChip(_changeDetectorRef, _elementRef, _platform, _ngZone, _globalRippleOptions, _dir, 
    // @breaking-change 8.0.0 `animationMode` parameter to become required.
    animationMode) {
        var _this = _super.call(this, _elementRef) || this;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._elementRef = _elementRef;
        _this._platform = _platform;
        _this._ngZone = _ngZone;
        _this._globalRippleOptions = _globalRippleOptions;
        _this._dir = _dir;
        /**
         * Emits when the chip is focused.
         */
        _this._onFocus = new Subject();
        /**
         * Emits when the chip is blurred.
         */
        _this._onBlur = new Subject();
        _this.HANDLED_KEYS = [];
        /**
         * Whether the chip has focus.
         */
        _this._hasFocusInternal = false;
        /**
         * Default unique id for the chip.
         */
        _this._uniqueId = "mat-mdc-chip-" + uid++;
        /**
         * A unique id for the chip. If none is supplied, it will be auto-generated.
         */
        _this.id = _this._uniqueId;
        _this._disabled = false;
        _this._removable = true;
        _this._highlighted = false;
        /**
         * Emitted when the user interacts with the remove icon.
         */
        _this.removeIconInteraction = new EventEmitter();
        /**
         * Emitted when the user interacts with the chip.
         */
        _this.interaction = new EventEmitter();
        /**
         * Emitted when the chip is destroyed.
         */
        _this.destroyed = new EventEmitter();
        /**
         * Emitted when a chip is to be removed.
         */
        _this.removed = new EventEmitter();
        /**
         * The unstyled chip selector for this component.
         */
        _this.basicChipAttrName = 'mat-basic-chip';
        /**
         * Subject that emits when the component has been destroyed.
         */
        _this._destroyed = new Subject();
        /**
         * Implementation of the MDC chip adapter interface.
         * These methods are called by the chip foundation.
         */
        _this._chipAdapter = {
            addClass: (/**
             * @param {?} className
             * @return {?}
             */
            function (className) { return _this._setMdcClass(className, true); }),
            removeClass: (/**
             * @param {?} className
             * @return {?}
             */
            function (className) { return _this._setMdcClass(className, false); }),
            hasClass: (/**
             * @param {?} className
             * @return {?}
             */
            function (className) { return _this._elementRef.nativeElement.classList.contains(className); }),
            addClassToLeadingIcon: (/**
             * @param {?} className
             * @return {?}
             */
            function (className) { return _this.leadingIcon.setClass(className, true); }),
            removeClassFromLeadingIcon: (/**
             * @param {?} className
             * @return {?}
             */
            function (className) { return _this.leadingIcon.setClass(className, false); }),
            eventTargetHasClass: (/**
             * @param {?} target
             * @param {?} className
             * @return {?}
             */
            function (target, className) {
                return target ? ((/** @type {?} */ (target))).classList.contains(className) : false;
            }),
            notifyInteraction: (/**
             * @return {?}
             */
            function () { return _this.interaction.emit(_this.id); }),
            notifySelection: (/**
             * @return {?}
             */
            function () {
                // No-op. We call dispatchSelectionEvent ourselves in MatChipOption, because we want to
                // specify whether selection occurred via user input.
            }),
            notifyNavigation: (/**
             * @return {?}
             */
            function () {
                // TODO: This is a new feature added by MDC; consider exposing this event to users in the
                // future.
            }),
            notifyTrailingIconInteraction: (/**
             * @return {?}
             */
            function () { return _this.removeIconInteraction.emit(_this.id); }),
            notifyRemoval: (/**
             * @return {?}
             */
            function () { return _this.removed.emit({ chip: _this }); }),
            getComputedStyleValue: (/**
             * @param {?} propertyName
             * @return {?}
             */
            function (propertyName) {
                return window.getComputedStyle(_this._elementRef.nativeElement).getPropertyValue(propertyName);
            }),
            setStyleProperty: (/**
             * @param {?} propertyName
             * @param {?} value
             * @return {?}
             */
            function (propertyName, value) {
                _this._elementRef.nativeElement.style.setProperty(propertyName, value);
            }),
            hasLeadingIcon: (/**
             * @return {?}
             */
            function () { return !!_this.leadingIcon; }),
            hasTrailingAction: (/**
             * @return {?}
             */
            function () { return !!_this.trailingIcon; }),
            isRTL: (/**
             * @return {?}
             */
            function () { return !!_this._dir && _this._dir.value === 'rtl'; }),
            focusPrimaryAction: (/**
             * @return {?}
             */
            function () {
                // Angular Material MDC chips fully manage focus. TODO: Managing focus and handling keyboard
                // events was added by MDC after our implementation; consider consolidating.
            }),
            focusTrailingAction: (/**
             * @return {?}
             */
            function () { }),
            setTrailingActionAttr: (/**
             * @param {?} attr
             * @param {?} value
             * @return {?}
             */
            function (attr, value) {
                return _this.trailingIcon && _this.trailingIcon.setAttribute(attr, value);
            }),
            setPrimaryActionAttr: (/**
             * @param {?} name
             * @param {?} value
             * @return {?}
             */
            function (name, value) {
                // MDC is currently using this method to set aria-checked on choice and filter chips,
                // which in the MDC templates have role="checkbox" and role="radio" respectively.
                // We have role="option" on those chips instead, so we do not want aria-checked.
                // Since we also manage the tabindex ourselves, we don't allow MDC to set it.
                if (name === 'aria-checked' || name === 'tabindex') {
                    return;
                }
                _this._elementRef.nativeElement.setAttribute(name, value);
            }),
            // The 2 functions below are used by the MDC ripple, which we aren't using,
            // so they will never be called
            getRootBoundingClientRect: (/**
             * @return {?}
             */
            function () { return _this._elementRef.nativeElement.getBoundingClientRect(); }),
            getCheckmarkBoundingClientRect: (/**
             * @return {?}
             */
            function () { return null; }),
        };
        _this._chipFoundation = new MDCChipFoundation(_this._chipAdapter);
        _this._animationsDisabled = animationMode === 'NoopAnimations';
        return _this;
    }
    Object.defineProperty(MatChip.prototype, "_hasFocus", {
        get: /**
         * @return {?}
         */
        function () {
            return this._hasFocusInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChip.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = coerceBooleanProperty(value);
            if (this.removeIcon) {
                this.removeIcon.disabled = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChip.prototype, "value", {
        /** The value of the chip. Defaults to the content inside `<mat-chip>` tags. */
        get: /**
         * The value of the chip. Defaults to the content inside `<mat-chip>` tags.
         * @return {?}
         */
        function () {
            return this._value !== undefined
                ? this._value
                : this._elementRef.nativeElement.textContent;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._value = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChip.prototype, "removable", {
        /**
         * Determines whether or not the chip displays the remove styling and emits (removed) events.
         */
        get: /**
         * Determines whether or not the chip displays the remove styling and emits (removed) events.
         * @return {?}
         */
        function () { return this._removable; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._removable = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChip.prototype, "highlighted", {
        /**
         * Colors the chip for emphasis as if it were selected.
         */
        get: /**
         * Colors the chip for emphasis as if it were selected.
         * @return {?}
         */
        function () { return this._highlighted; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._highlighted = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChip.prototype, "rippleDisabled", {
        /**
         * Implemented as part of RippleTarget. Whether ripples are disabled on interaction.
         * @docs-private
         */
        get: /**
         * Implemented as part of RippleTarget. Whether ripples are disabled on interaction.
         * \@docs-private
         * @return {?}
         */
        function () {
            return this.disabled || this.disableRipple || !!this.rippleConfig.disabled ||
                this._isBasicChip();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatChip.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._initRemoveIcon();
    };
    /**
     * @return {?}
     */
    MatChip.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this._initRipple();
        this._chipFoundation.init();
    };
    /**
     * @return {?}
     */
    MatChip.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed.emit({ chip: this });
        this._destroyed.next();
        this._destroyed.complete();
        this._rippleRenderer._removeTriggerEvents();
        this._chipFoundation.destroy();
    };
    /** Sets up the remove icon chip foundation, and subscribes to remove icon events. */
    /**
     * Sets up the remove icon chip foundation, and subscribes to remove icon events.
     * @return {?}
     */
    MatChip.prototype._initRemoveIcon = /**
     * Sets up the remove icon chip foundation, and subscribes to remove icon events.
     * @return {?}
     */
    function () {
        if (this.removeIcon) {
            this._chipFoundation.setShouldRemoveOnTrailingIconClick(true);
            this._listenToRemoveIconInteraction();
            this.removeIcon.disabled = this.disabled;
        }
    };
    /** Handles interaction with the remove icon. */
    /**
     * Handles interaction with the remove icon.
     * @return {?}
     */
    MatChip.prototype._listenToRemoveIconInteraction = /**
     * Handles interaction with the remove icon.
     * @return {?}
     */
    function () {
        var _this = this;
        this.removeIcon.interaction
            .pipe(takeUntil(this._destroyed))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // The MDC chip foundation calls stopPropagation() for any trailing icon interaction
            // event, even ones it doesn't handle, so we want to avoid passing it keyboard events
            // for which we have a custom handler.
            if (_this.disabled || (event instanceof KeyboardEvent &&
                _this.HANDLED_KEYS.indexOf(event.keyCode) !== -1)) {
                return;
            }
            _this._chipFoundation.handleTrailingIconInteraction(event);
        }));
    };
    /**
     * Allows for programmatic removal of the chip.
     *
     * Informs any listeners of the removal request. Does not remove the chip from the DOM.
     */
    /**
     * Allows for programmatic removal of the chip.
     *
     * Informs any listeners of the removal request. Does not remove the chip from the DOM.
     * @return {?}
     */
    MatChip.prototype.remove = /**
     * Allows for programmatic removal of the chip.
     *
     * Informs any listeners of the removal request. Does not remove the chip from the DOM.
     * @return {?}
     */
    function () {
        if (this.removable) {
            this._chipFoundation.beginExit();
        }
    };
    /** Whether this chip is a basic (unstyled) chip. */
    /**
     * Whether this chip is a basic (unstyled) chip.
     * @return {?}
     */
    MatChip.prototype._isBasicChip = /**
     * Whether this chip is a basic (unstyled) chip.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = (/** @type {?} */ (this._elementRef.nativeElement));
        return element.hasAttribute(this.basicChipAttrName) ||
            element.tagName.toLowerCase() === this.basicChipAttrName;
    };
    /** Sets whether the given CSS class should be applied to the MDC chip. */
    /**
     * Sets whether the given CSS class should be applied to the MDC chip.
     * @private
     * @param {?} cssClass
     * @param {?} active
     * @return {?}
     */
    MatChip.prototype._setMdcClass = /**
     * Sets whether the given CSS class should be applied to the MDC chip.
     * @private
     * @param {?} cssClass
     * @param {?} active
     * @return {?}
     */
    function (cssClass, active) {
        /** @type {?} */
        var classes = this._elementRef.nativeElement.classList;
        active ? classes.add(cssClass) : classes.remove(cssClass);
        this._changeDetectorRef.markForCheck();
    };
    /** Initializes the ripple renderer. */
    /**
     * Initializes the ripple renderer.
     * @private
     * @return {?}
     */
    MatChip.prototype._initRipple = /**
     * Initializes the ripple renderer.
     * @private
     * @return {?}
     */
    function () {
        this.rippleConfig = this._globalRippleOptions || {};
        // Configure ripple animation to match MDC Ripple.
        this.rippleConfig.animation = {
            enterDuration: numbers.DEACTIVATION_TIMEOUT_MS,
            exitDuration: numbers.FG_DEACTIVATION_MS,
        };
        this._rippleRenderer =
            new RippleRenderer(this, this._ngZone, this._elementRef, this._platform);
        this._rippleRenderer.setupTriggerEvents(this._elementRef);
    };
    /** Forwards interaction events to the MDC chip foundation. */
    /**
     * Forwards interaction events to the MDC chip foundation.
     * @param {?} event
     * @return {?}
     */
    MatChip.prototype._handleInteraction = /**
     * Forwards interaction events to the MDC chip foundation.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.disabled) {
            this._chipFoundation.handleInteraction(event);
        }
    };
    MatChip.decorators = [
        { type: Component, args: [{selector: 'mat-basic-chip, mat-chip',
                    inputs: ['color', 'disableRipple'],
                    exportAs: 'matChip',
                    template: "<ng-content select=\"mat-chip-avatar, [matChipAvatar]\"></ng-content><div class=\"mdc-chip__text mdc-chip__action--primary\"><ng-content></ng-content></div><ng-content select=\"mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]\"></ng-content>",
                    styles: [".mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}.mdc-chip__icon--trailing[dir=rtl],[dir=rtl] .mdc-chip__icon--trailing{margin-left:-4px;margin-right:4px}.mdc-chip{border-radius:16px;height:32px;display:inline-flex;position:relative;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:0;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip.mdc-chip--selected .mdc-chip__checkmark{margin-left:-4px;margin-right:4px}.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl],.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark{margin-left:4px;margin-right:-4px}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;left:0;height:48px;transform:translateY(-50%)}.mdc-chip--exit{opacity:0}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:0;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(.4,0,.6,1);stroke-width:2px;stroke-dashoffset:29.78334;stroke-dasharray:29.78334}.mdc-chip__text:focus{outline:0}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(.4,0,.2,1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0s}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-chip-entry{from{transform:scale(.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry .1s cubic-bezier(0,0,.2,1)}._mat-animation-noopable{transition:none;animation:none}.mat-mdc-chip{cursor:default;overflow:hidden;transform:translateZ(0)}@media (-ms-high-contrast:active){.mat-mdc-chip{outline:solid 1px}.mat-mdc-chip:focus{outline:dotted 2px}}.mat-mdc-chip:not(.mat-mdc-chip-disabled) div:focus .mdc-chip__text::after,.mat-mdc-chip:not(.mat-mdc-chip-disabled):focus .mdc-chip__text::after,.mat-mdc-chip:not(.mat-mdc-chip-disabled):hover .mdc-chip__text::after{content:'';position:absolute;width:100%;height:100%;background:#000;opacity:.2;top:0;left:0;pointer-events:none}.mat-mdc-chip-disabled.mat-mdc-chip{opacity:.4}.mat-mdc-chip-disabled.mat-mdc-chip .mat-chip-row-focusable-text-content,.mat-mdc-chip-disabled.mat-mdc-chip .mat-mdc-chip-trailing-icon{pointer-events:none}.mat-mdc-chip-set-stacked{flex-direction:column;align-items:flex-start}.mat-mdc-chip-set-stacked .mat-mdc-chip{width:100%}input.mat-mdc-chip-input{flex:1 0 150px}"],
                    host: {
                        '[class.mat-mdc-chip-disabled]': 'disabled',
                        '[class.mat-mdc-chip-highlighted]': 'highlighted',
                        '[class.mat-mdc-chip-with-avatar]': 'leadingIcon',
                        '[class.mat-mdc-chip-with-trailing-icon]': 'trailingIcon || removeIcon',
                        '[class.mat-mdc-basic-chip]': '_isBasicChip()',
                        '[class.mat-mdc-standard-chip]': '!_isBasicChip()',
                        '[class._mat-animation-noopable]': '_animationsDisabled',
                        '[id]': 'id',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '(transitionend)': '_chipFoundation.handleTransitionEnd($event)'
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatChip.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: Platform },
        { type: NgZone },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RIPPLE_GLOBAL_OPTIONS,] }] },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
    ]; };
    MatChip.propDecorators = {
        id: [{ type: Input }],
        disabled: [{ type: Input }],
        value: [{ type: Input }],
        removable: [{ type: Input }],
        highlighted: [{ type: Input }],
        removeIconInteraction: [{ type: Output }],
        interaction: [{ type: Output }],
        destroyed: [{ type: Output }],
        removed: [{ type: Output }],
        leadingIcon: [{ type: ContentChild, args: [MatChipAvatar, { static: false },] }],
        trailingIcon: [{ type: ContentChild, args: [MatChipTrailingIcon, { static: false },] }],
        removeIcon: [{ type: ContentChild, args: [MatChipRemove, { static: false },] }]
    };
    return MatChip;
}(_MatChipMixinBase));
export { MatChip };
if (false) {
    /**
     * Emits when the chip is focused.
     * @type {?}
     */
    MatChip.prototype._onFocus;
    /**
     * Emits when the chip is blurred.
     * @type {?}
     */
    MatChip.prototype._onBlur;
    /** @type {?} */
    MatChip.prototype.HANDLED_KEYS;
    /**
     * Whether the chip has focus.
     * @type {?}
     * @protected
     */
    MatChip.prototype._hasFocusInternal;
    /**
     * Whether animations for the chip are enabled.
     * @type {?}
     */
    MatChip.prototype._animationsDisabled;
    /**
     * Default unique id for the chip.
     * @type {?}
     * @private
     */
    MatChip.prototype._uniqueId;
    /**
     * A unique id for the chip. If none is supplied, it will be auto-generated.
     * @type {?}
     */
    MatChip.prototype.id;
    /**
     * @type {?}
     * @protected
     */
    MatChip.prototype._disabled;
    /**
     * @type {?}
     * @protected
     */
    MatChip.prototype._value;
    /**
     * @type {?}
     * @protected
     */
    MatChip.prototype._removable;
    /**
     * @type {?}
     * @protected
     */
    MatChip.prototype._highlighted;
    /**
     * Emitted when the user interacts with the remove icon.
     * @type {?}
     */
    MatChip.prototype.removeIconInteraction;
    /**
     * Emitted when the user interacts with the chip.
     * @type {?}
     */
    MatChip.prototype.interaction;
    /**
     * Emitted when the chip is destroyed.
     * @type {?}
     */
    MatChip.prototype.destroyed;
    /**
     * Emitted when a chip is to be removed.
     * @type {?}
     */
    MatChip.prototype.removed;
    /**
     * The MDC foundation containing business logic for MDC chip.
     * @type {?}
     */
    MatChip.prototype._chipFoundation;
    /**
     * The unstyled chip selector for this component.
     * @type {?}
     * @protected
     */
    MatChip.prototype.basicChipAttrName;
    /**
     * Subject that emits when the component has been destroyed.
     * @type {?}
     * @protected
     */
    MatChip.prototype._destroyed;
    /**
     * The ripple renderer for this chip.
     * @type {?}
     * @private
     */
    MatChip.prototype._rippleRenderer;
    /**
     * Ripple configuration for ripples that are launched on pointer down.
     * Implemented as part of RippleTarget.
     * \@docs-private
     * @type {?}
     */
    MatChip.prototype.rippleConfig;
    /**
     * The chip's leading icon.
     * @type {?}
     */
    MatChip.prototype.leadingIcon;
    /**
     * The chip's trailing icon.
     * @type {?}
     */
    MatChip.prototype.trailingIcon;
    /**
     * The chip's trailing remove icon.
     * @type {?}
     */
    MatChip.prototype.removeIcon;
    /**
     * Implementation of the MDC chip adapter interface.
     * These methods are called by the chip foundation.
     * @type {?}
     * @protected
     */
    MatChip.prototype._chipAdapter;
    /** @type {?} */
    MatChip.prototype._changeDetectorRef;
    /** @type {?} */
    MatChip.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    MatChip.prototype._platform;
    /**
     * @type {?}
     * @protected
     */
    MatChip.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    MatChip.prototype._globalRippleOptions;
    /**
     * @type {?}
     * @private
     */
    MatChip.prototype._dir;
}
//# sourceMappingURL=chip.js.map