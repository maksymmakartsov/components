/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/animations'), require('@angular/cdk/a11y'), require('@angular/cdk/portal'), require('@angular/common'), require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/cdk/keycodes'), require('@angular/cdk/overlay'), require('@angular/cdk/bidi')) :
	typeof define === 'function' && define.amd ? define('@angular/cdk-experimental/dialog', ['exports', '@angular/animations', '@angular/cdk/a11y', '@angular/cdk/portal', '@angular/common', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/cdk/keycodes', '@angular/cdk/overlay', '@angular/cdk/bidi'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.cdkExperimental = global.ng.cdkExperimental || {}, global.ng.cdkExperimental.dialog = {}),global.ng.animations,global.ng.cdk.a11y,global.ng.cdk.portal,global.ng.common,global.ng.core,global.rxjs,global.rxjs.operators,global.ng.cdk.keycodes,global.ng.cdk.overlay,global.ng.cdk.bidi));
}(this, (function (exports,animations,a11y,portal,common,core,rxjs,operators,keycodes,overlay,bidi) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template D
 */
var   /**
 * @template D
 */
DialogConfig = /** @class */ (function () {
    function DialogConfig() {
        /**
         * The ARIA role of the dialog.
         */
        this.role = 'dialog';
        /**
         * Custom class(es) for the overlay panel.
         */
        this.panelClass = '';
        /**
         * Whether the dialog has a background.
         */
        this.hasBackdrop = true;
        /**
         * Custom class(es) for the backdrop.
         */
        this.backdropClass = '';
        /**
         * Whether the dialog can be closed by user interaction.
         */
        this.disableClose = false;
        /**
         * The width of the dialog.
         */
        this.width = '';
        /**
         * The height of the dialog.
         */
        this.height = '';
        /**
         * The minimum width of the dialog.
         */
        this.minWidth = '';
        /**
         * The minimum height of the dialog.
         */
        this.minHeight = '';
        /**
         * The maximum width of the dialog.
         */
        this.maxWidth = '80vw';
        /**
         * The maximum height of the dialog.
         */
        this.maxHeight = '';
        /**
         * Data to be injected into the dialog content.
         */
        this.data = null;
        /**
         * ID of the element that describes the dialog.
         */
        this.ariaDescribedBy = null;
        /**
         * Aria label to assign to the dialog element
         */
        this.ariaLabel = null;
        /**
         * Whether the dialog should focus the first focusable element on open.
         */
        this.autoFocus = true;
        /**
         * Duration of the enter animation. Has to be a valid CSS value (e.g. 100ms).
         */
        this.enterAnimationDuration = '225ms';
        /**
         * Duration of the exit animation. Has to be a valid CSS value (e.g. 50ms).
         */
        this.exitAnimationDuration = '225ms';
    }
    return DialogConfig;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function throwDialogContentAlreadyAttachedError() {
    throw Error('Attempting to attach dialog content after content is already attached');
}
/**
 * Internal component that wraps user-provided dialog content.
 * \@docs-private
 */
var CdkDialogContainer = /** @class */ (function (_super) {
    __extends(CdkDialogContainer, _super);
    function CdkDialogContainer(_elementRef, _focusTrapFactory, _changeDetectorRef, _document, _config) {
        var _this = _super.call(this) || this;
        _this._elementRef = _elementRef;
        _this._focusTrapFactory = _focusTrapFactory;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._document = _document;
        _this._config = _config;
        /**
         * State of the dialog animation.
         */
        _this._state = 'enter';
        /**
         * Element that was focused before the dialog was opened. Save this to restore upon close.
         */
        _this._elementFocusedBeforeDialogWasOpened = null;
        /**
         * The class that traps and manages focus within the dialog.
         */
        _this._focusTrap = _this._focusTrapFactory.create(_this._elementRef.nativeElement);
        _this._ariaModal = true;
        /**
         * A subject emitting before the dialog enters the view.
         */
        _this._beforeEnter = new rxjs.Subject();
        /**
         * A subject emitting after the dialog enters the view.
         */
        _this._afterEnter = new rxjs.Subject();
        /**
         * A subject emitting before the dialog exits the view.
         */
        _this._beforeExit = new rxjs.Subject();
        /**
         * A subject emitting after the dialog exits the view.
         */
        _this._afterExit = new rxjs.Subject();
        /**
         * Stream of animation `done` events.
         */
        _this._animationDone = new rxjs.Subject();
        // We use a Subject with a distinctUntilChanged, rather than a callback attached to .done,
        // because some browsers fire the done event twice and we don't want to emit duplicate events.
        // See: https://github.com/angular/angular/issues/24084
        _this._animationDone.pipe(operators.distinctUntilChanged((/**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (x, y) {
            return x.fromState === y.fromState && x.toState === y.toState;
        }))).subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // Emit lifecycle events based on animation `done` callback.
            if (event.toState === 'enter') {
                _this._autoFocusFirstTabbableElement();
                _this._afterEnter.next();
                _this._afterEnter.complete();
            }
            if (event.fromState === 'enter' && (event.toState === 'void' || event.toState === 'exit')) {
                _this._returnFocusAfterDialog();
                _this._afterExit.next();
                _this._afterExit.complete();
            }
        }));
        return _this;
    }
    Object.defineProperty(CdkDialogContainer.prototype, "_ariaLabel", {
        // @HostBinding is used in the class as it is expected to be extended. Since @Component decorator
        // metadata is not inherited by child classes, instead the host binding data is defined in a way
        // that can be inherited.
        // tslint:disable:no-host-decorator-in-concrete
        get: 
        // @HostBinding is used in the class as it is expected to be extended. Since @Component decorator
        // metadata is not inherited by child classes, instead the host binding data is defined in a way
        // that can be inherited.
        // tslint:disable:no-host-decorator-in-concrete
        /**
         * @return {?}
         */
        function () { return this._config.ariaLabel || null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkDialogContainer.prototype, "_ariaDescribedBy", {
        get: /**
         * @return {?}
         */
        function () { return this._config.ariaDescribedBy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkDialogContainer.prototype, "_role", {
        get: /**
         * @return {?}
         */
        function () { return this._config.role; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkDialogContainer.prototype, "_tabindex", {
        get: /**
         * @return {?}
         */
        function () { return -1; },
        enumerable: true,
        configurable: true
    });
    /** Destroy focus trap to place focus back to the element focused before the dialog opened. */
    /**
     * Destroy focus trap to place focus back to the element focused before the dialog opened.
     * @return {?}
     */
    CdkDialogContainer.prototype.ngOnDestroy = /**
     * Destroy focus trap to place focus back to the element focused before the dialog opened.
     * @return {?}
     */
    function () {
        this._focusTrap.destroy();
        this._animationDone.complete();
    };
    /**
     * Attach a ComponentPortal as content to this dialog container.
     * @param portal Portal to be attached as the dialog content.
     */
    /**
     * Attach a ComponentPortal as content to this dialog container.
     * @template T
     * @param {?} portal Portal to be attached as the dialog content.
     * @return {?}
     */
    CdkDialogContainer.prototype.attachComponentPortal = /**
     * Attach a ComponentPortal as content to this dialog container.
     * @template T
     * @param {?} portal Portal to be attached as the dialog content.
     * @return {?}
     */
    function (portal$$1) {
        if (this._portalHost.hasAttached()) {
            throwDialogContentAlreadyAttachedError();
        }
        this._savePreviouslyFocusedElement();
        return this._portalHost.attachComponentPortal(portal$$1);
    };
    /**
     * Attach a TemplatePortal as content to this dialog container.
     * @param portal Portal to be attached as the dialog content.
     */
    /**
     * Attach a TemplatePortal as content to this dialog container.
     * @template C
     * @param {?} portal Portal to be attached as the dialog content.
     * @return {?}
     */
    CdkDialogContainer.prototype.attachTemplatePortal = /**
     * Attach a TemplatePortal as content to this dialog container.
     * @template C
     * @param {?} portal Portal to be attached as the dialog content.
     * @return {?}
     */
    function (portal$$1) {
        if (this._portalHost.hasAttached()) {
            throwDialogContentAlreadyAttachedError();
        }
        this._savePreviouslyFocusedElement();
        return this._portalHost.attachTemplatePortal(portal$$1);
    };
    /** Emit lifecycle events based on animation `start` callback. */
    /**
     * Emit lifecycle events based on animation `start` callback.
     * @param {?} event
     * @return {?}
     */
    CdkDialogContainer.prototype._onAnimationStart = /**
     * Emit lifecycle events based on animation `start` callback.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.toState === 'enter') {
            this._beforeEnter.next();
            this._beforeEnter.complete();
        }
        if (event.fromState === 'enter' && (event.toState === 'void' || event.toState === 'exit')) {
            this._beforeExit.next();
            this._beforeExit.complete();
        }
    };
    /** Starts the dialog exit animation. */
    /**
     * Starts the dialog exit animation.
     * @return {?}
     */
    CdkDialogContainer.prototype._startExiting = /**
     * Starts the dialog exit animation.
     * @return {?}
     */
    function () {
        this._state = 'exit';
        // Mark the container for check so it can react if the
        // view container is using OnPush change detection.
        this._changeDetectorRef.markForCheck();
    };
    /** Saves a reference to the element that was focused before the dialog was opened. */
    /**
     * Saves a reference to the element that was focused before the dialog was opened.
     * @private
     * @return {?}
     */
    CdkDialogContainer.prototype._savePreviouslyFocusedElement = /**
     * Saves a reference to the element that was focused before the dialog was opened.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._document) {
            this._elementFocusedBeforeDialogWasOpened = (/** @type {?} */ (this._document.activeElement));
            // Move focus onto the dialog immediately in order to prevent the user from accidentally
            // opening multiple dialogs at the same time. Needs to be async, because the element
            // may not be focusable immediately.
            Promise.resolve().then((/**
             * @return {?}
             */
            function () { return _this._elementRef.nativeElement.focus(); }));
        }
    };
    /**
     * Autofocus the first tabbable element inside of the dialog, if there is not a tabbable element,
     * focus the dialog instead.
     */
    /**
     * Autofocus the first tabbable element inside of the dialog, if there is not a tabbable element,
     * focus the dialog instead.
     * @private
     * @return {?}
     */
    CdkDialogContainer.prototype._autoFocusFirstTabbableElement = /**
     * Autofocus the first tabbable element inside of the dialog, if there is not a tabbable element,
     * focus the dialog instead.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = this._elementRef.nativeElement;
        // If were to attempt to focus immediately, then the content of the dialog would not yet be
        // ready in instances where change detection has to run first. To deal with this, we simply
        // wait for the microtask queue to be empty.
        if (this._config.autoFocus) {
            this._focusTrap.focusInitialElementWhenReady().then((/**
             * @param {?} hasMovedFocus
             * @return {?}
             */
            function (hasMovedFocus) {
                // If we didn't find any focusable elements inside the dialog, focus the
                // container so the user can't tab into other elements behind it.
                if (!hasMovedFocus) {
                    element.focus();
                }
            }));
        }
        else {
            /** @type {?} */
            var activeElement = this._document.activeElement;
            // Otherwise ensure that focus is on the dialog container. It's possible that a different
            // component tried to move focus while the open animation was running. See:
            // https://github.com/angular/components/issues/16215. Note that we only want to do this
            // if the focus isn't inside the dialog already, because it's possible that the consumer
            // turned off `autoFocus` in order to move focus themselves.
            if (activeElement !== element && !element.contains(activeElement)) {
                element.focus();
            }
        }
    };
    /** Returns the focus to the element focused before the dialog was open. */
    /**
     * Returns the focus to the element focused before the dialog was open.
     * @private
     * @return {?}
     */
    CdkDialogContainer.prototype._returnFocusAfterDialog = /**
     * Returns the focus to the element focused before the dialog was open.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var toFocus = this._elementFocusedBeforeDialogWasOpened;
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (toFocus && typeof toFocus.focus === 'function') {
            toFocus.focus();
        }
    };
    CdkDialogContainer.decorators = [
        { type: core.Component, args: [{selector: 'cdk-dialog-container',
                    template: "<ng-template cdkPortalOutlet></ng-template>",
                    styles: ["cdk-dialog-container{background:#fff;border-radius:5px;display:block;padding:10px}"],
                    encapsulation: core.ViewEncapsulation.None,
                    // Using OnPush for dialogs caused some G3 sync issues. Disabled until we can track them down.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: core.ChangeDetectionStrategy.Default,
                    animations: [
                        animations.trigger('dialog', [
                            animations.state('enter', animations.style({ opacity: 1 })),
                            animations.state('exit, void', animations.style({ opacity: 0 })),
                            animations.transition('* => enter', animations.animate('{{enterAnimationDuration}}')),
                            animations.transition('* => exit, * => void', animations.animate('{{exitAnimationDuration}}')),
                        ])
                    ],
                    host: {
                        '[@dialog]': "{\n      value: _state,\n      params: {\n        enterAnimationDuration: _config.enterAnimationDuration,\n        exitAnimationDuration: _config.exitAnimationDuration\n      }\n    }",
                        '(@dialog.start)': '_onAnimationStart($event)',
                        '(@dialog.done)': '_animationDone.next($event)',
                    },
                },] },
    ];
    /** @nocollapse */
    CdkDialogContainer.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: a11y.FocusTrapFactory },
        { type: core.ChangeDetectorRef },
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [common.DOCUMENT,] }] },
        { type: DialogConfig }
    ]; };
    CdkDialogContainer.propDecorators = {
        _ariaLabel: [{ type: core.HostBinding, args: ['attr.aria-label',] }],
        _ariaDescribedBy: [{ type: core.HostBinding, args: ['attr.aria-describedby',] }],
        _role: [{ type: core.HostBinding, args: ['attr.role',] }],
        _ariaModal: [{ type: core.HostBinding, args: ['attr.aria-modal',] }],
        _tabindex: [{ type: core.HostBinding, args: ['attr.tabindex',] }],
        _portalHost: [{ type: core.ViewChild, args: [portal.CdkPortalOutlet, { static: true },] }]
    };
    return CdkDialogContainer;
}(portal.BasePortalOutlet));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Unique id for the created dialog.
 * @type {?}
 */
var uniqueId = 0;
/**
 * Reference to a dialog opened via the Dialog service.
 * @template T, R
 */
var   /**
 * Reference to a dialog opened via the Dialog service.
 * @template T, R
 */
DialogRef = /** @class */ (function () {
    function DialogRef(_overlayRef, _containerInstance, id) {
        var _this = this;
        if (id === void 0) { id = "dialog-" + uniqueId++; }
        this._overlayRef = _overlayRef;
        this._containerInstance = _containerInstance;
        this.id = id;
        // If the dialog has a backdrop, handle clicks from the backdrop.
        if (_containerInstance._config.hasBackdrop) {
            _overlayRef.backdropClick().subscribe((/**
             * @return {?}
             */
            function () {
                if (!_this.disableClose) {
                    _this.close();
                }
            }));
        }
        this.beforeClosed().subscribe((/**
         * @return {?}
         */
        function () {
            _this._overlayRef.detachBackdrop();
        }));
        this.afterClosed().subscribe((/**
         * @return {?}
         */
        function () {
            _this._overlayRef.detach();
            _this._overlayRef.dispose();
            _this.componentInstance = (/** @type {?} */ (null));
        }));
        // Close when escape keydown event occurs
        _overlayRef.keydownEvents()
            .pipe(operators.filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return event.keyCode === keycodes.ESCAPE && !_this.disableClose && !keycodes.hasModifierKey(event);
        })))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            event.preventDefault();
            _this.close();
        }));
    }
    /** Gets an observable that emits when the overlay's backdrop has been clicked. */
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     * @return {?}
     */
    DialogRef.prototype.backdropClick = /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     * @return {?}
     */
    function () {
        return this._overlayRef.backdropClick();
    };
    /**
     * Close the dialog.
     * @param dialogResult Optional result to return to the dialog opener.
     */
    /**
     * Close the dialog.
     * @param {?=} dialogResult Optional result to return to the dialog opener.
     * @return {?}
     */
    DialogRef.prototype.close = /**
     * Close the dialog.
     * @param {?=} dialogResult Optional result to return to the dialog opener.
     * @return {?}
     */
    function (dialogResult) {
        this._result = dialogResult;
        this._containerInstance._startExiting();
    };
    /**
     * Updates the dialog's position.
     * @param position New dialog position.
     */
    /**
     * Updates the dialog's position.
     * @template THIS
     * @this {THIS}
     * @param {?=} position New dialog position.
     * @return {THIS}
     */
    DialogRef.prototype.updatePosition = /**
     * Updates the dialog's position.
     * @template THIS
     * @this {THIS}
     * @param {?=} position New dialog position.
     * @return {THIS}
     */
    function (position) {
        /** @type {?} */
        var strategy = (/** @type {?} */ (this))._getPositionStrategy();
        if (position && (position.left || position.right)) {
            position.left ? strategy.left(position.left) : strategy.right(position.right);
        }
        else {
            strategy.centerHorizontally();
        }
        if (position && (position.top || position.bottom)) {
            position.top ? strategy.top(position.top) : strategy.bottom(position.bottom);
        }
        else {
            strategy.centerVertically();
        }
        (/** @type {?} */ (this))._overlayRef.updatePosition();
        return (/** @type {?} */ (this));
    };
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     */
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     * @return {?}
     */
    DialogRef.prototype.keydownEvents = /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     * @return {?}
     */
    function () {
        return this._overlayRef.keydownEvents();
    };
    /**
     * Updates the dialog's width and height, defined, min and max.
     * @param size New size for the overlay.
     */
    /**
     * Updates the dialog's width and height, defined, min and max.
     * @template THIS
     * @this {THIS}
     * @param {?} size New size for the overlay.
     * @return {THIS}
     */
    DialogRef.prototype.updateSize = /**
     * Updates the dialog's width and height, defined, min and max.
     * @template THIS
     * @this {THIS}
     * @param {?} size New size for the overlay.
     * @return {THIS}
     */
    function (size) {
        if (size.width) {
            (/** @type {?} */ (this))._getPositionStrategy().width(size.width.toString());
        }
        if (size.height) {
            (/** @type {?} */ (this))._getPositionStrategy().height(size.height.toString());
        }
        (/** @type {?} */ (this))._overlayRef.updateSize(size);
        (/** @type {?} */ (this))._overlayRef.updatePosition();
        return (/** @type {?} */ (this));
    };
    /** Fetches the position strategy object from the overlay ref. */
    /**
     * Fetches the position strategy object from the overlay ref.
     * @private
     * @return {?}
     */
    DialogRef.prototype._getPositionStrategy = /**
     * Fetches the position strategy object from the overlay ref.
     * @private
     * @return {?}
     */
    function () {
        return (/** @type {?} */ (this._overlayRef.getConfig().positionStrategy));
    };
    /** Gets an observable that emits when dialog begins opening. */
    /**
     * Gets an observable that emits when dialog begins opening.
     * @return {?}
     */
    DialogRef.prototype.beforeOpened = /**
     * Gets an observable that emits when dialog begins opening.
     * @return {?}
     */
    function () {
        return this._containerInstance._beforeEnter.asObservable();
    };
    /** Gets an observable that emits when dialog is finished opening. */
    /**
     * Gets an observable that emits when dialog is finished opening.
     * @return {?}
     */
    DialogRef.prototype.afterOpened = /**
     * Gets an observable that emits when dialog is finished opening.
     * @return {?}
     */
    function () {
        return this._containerInstance._afterEnter.asObservable();
    };
    /** Gets an observable that emits when dialog begins closing. */
    /**
     * Gets an observable that emits when dialog begins closing.
     * @return {?}
     */
    DialogRef.prototype.beforeClosed = /**
     * Gets an observable that emits when dialog begins closing.
     * @return {?}
     */
    function () {
        var _this = this;
        return this._containerInstance._beforeExit.pipe(operators.map((/**
         * @return {?}
         */
        function () { return _this._result; })));
    };
    /** Gets an observable that emits when dialog is finished closing. */
    /**
     * Gets an observable that emits when dialog is finished closing.
     * @return {?}
     */
    DialogRef.prototype.afterClosed = /**
     * Gets an observable that emits when dialog is finished closing.
     * @return {?}
     */
    function () {
        var _this = this;
        return this._containerInstance._afterExit.pipe(operators.map((/**
         * @return {?}
         */
        function () { return _this._result; })));
    };
    return DialogRef;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Injection token for the Dialog's ScrollStrategy.
 * @type {?}
 */
var DIALOG_SCROLL_STRATEGY = new core.InjectionToken('DialogScrollStrategy');
/**
 * Injection token for the Dialog's Data.
 * @type {?}
 */
var DIALOG_DATA = new core.InjectionToken('DialogData');
/**
 * Injection token for the DialogRef constructor.
 * @type {?}
 */
var DIALOG_REF = new core.InjectionToken('DialogRef');
/**
 * Injection token for the DialogConfig.
 * @type {?}
 */
var DIALOG_CONFIG = new core.InjectionToken('DialogConfig');
/**
 * Injection token for the Dialog's DialogContainer component.
 * @type {?}
 */
var DIALOG_CONTAINER = new core.InjectionToken('DialogContainer');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
function MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay$$1) {
    return (/**
     * @return {?}
     */
    function () { return overlay$$1.scrollStrategies.block(); });
}
/**
 * \@docs-private
 * @type {?}
 */
var MAT_DIALOG_SCROLL_STRATEGY_PROVIDER = {
    provide: DIALOG_SCROLL_STRATEGY,
    deps: [overlay.Overlay],
    useFactory: MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service to open modal dialogs.
 */
var Dialog = /** @class */ (function () {
    function Dialog(_overlay, _injector, _dialogRefConstructor, 
    // TODO(crisbeto): the `any` here can be replaced
    // with the proper type once we start using Ivy.
    scrollStrategy, _parentDialog, location) {
        var _this = this;
        this._overlay = _overlay;
        this._injector = _injector;
        this._dialogRefConstructor = _dialogRefConstructor;
        this._parentDialog = _parentDialog;
        this._afterAllClosedBase = new rxjs.Subject();
        // TODO(jelbourn): tighten the type on the right-hand side of this expression.
        this.afterAllClosed = rxjs.defer((/**
         * @return {?}
         */
        function () { return _this.openDialogs.length ?
            _this._afterAllClosed : _this._afterAllClosed.pipe(operators.startWith(undefined)); }));
        this._afterOpened = new rxjs.Subject();
        this._openDialogs = [];
        // Close all of the dialogs when the user goes forwards/backwards in history or when the
        // location hash changes. Note that this usually doesn't include clicking on links (unless
        // the user is using the `HashLocationStrategy`).
        if (!_parentDialog && location) {
            location.subscribe((/**
             * @return {?}
             */
            function () { return _this.closeAll(); }));
        }
        this._scrollStrategy = scrollStrategy;
    }
    Object.defineProperty(Dialog.prototype, "_afterAllClosed", {
        /** Stream that emits when all dialogs are closed. */
        get: /**
         * Stream that emits when all dialogs are closed.
         * @return {?}
         */
        function () {
            return this._parentDialog ? this._parentDialog.afterAllClosed : this._afterAllClosedBase;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dialog.prototype, "afterOpened", {
        /** Stream that emits when a dialog is opened. */
        get: /**
         * Stream that emits when a dialog is opened.
         * @return {?}
         */
        function () {
            return this._parentDialog ? this._parentDialog.afterOpened : this._afterOpened;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dialog.prototype, "openDialogs", {
        /** Stream that emits when a dialog is opened. */
        get: /**
         * Stream that emits when a dialog is opened.
         * @return {?}
         */
        function () {
            return this._parentDialog ? this._parentDialog.openDialogs : this._openDialogs;
        },
        enumerable: true,
        configurable: true
    });
    /** Gets an open dialog by id. */
    /**
     * Gets an open dialog by id.
     * @param {?} id
     * @return {?}
     */
    Dialog.prototype.getById = /**
     * Gets an open dialog by id.
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this._openDialogs.find((/**
         * @param {?} ref
         * @return {?}
         */
        function (ref) { return ref.id === id; }));
    };
    /** Closes all open dialogs. */
    /**
     * Closes all open dialogs.
     * @return {?}
     */
    Dialog.prototype.closeAll = /**
     * Closes all open dialogs.
     * @return {?}
     */
    function () {
        this.openDialogs.forEach((/**
         * @param {?} ref
         * @return {?}
         */
        function (ref) { return ref.close(); }));
    };
    /** Opens a dialog from a component. */
    /**
     * Opens a dialog from a component.
     * @template T
     * @param {?} component
     * @param {?=} config
     * @return {?}
     */
    Dialog.prototype.openFromComponent = /**
     * Opens a dialog from a component.
     * @template T
     * @param {?} component
     * @param {?=} config
     * @return {?}
     */
    function (component, config) {
        config = this._applyConfigDefaults(config);
        if (config.id && this.getById(config.id)) {
            throw Error("Dialog with id \"" + config.id + "\" exists already. The dialog id must be unique.");
        }
        /** @type {?} */
        var overlayRef = this._createOverlay(config);
        /** @type {?} */
        var dialogContainer = this._attachDialogContainer(overlayRef, config);
        /** @type {?} */
        var dialogRef = this._attachDialogContentForComponent(component, dialogContainer, overlayRef, config);
        this._registerDialogRef(dialogRef);
        return dialogRef;
    };
    /** Opens a dialog from a template. */
    /**
     * Opens a dialog from a template.
     * @template T
     * @param {?} template
     * @param {?=} config
     * @return {?}
     */
    Dialog.prototype.openFromTemplate = /**
     * Opens a dialog from a template.
     * @template T
     * @param {?} template
     * @param {?=} config
     * @return {?}
     */
    function (template, config) {
        config = this._applyConfigDefaults(config);
        if (config.id && this.getById(config.id)) {
            throw Error("Dialog with id \"" + config.id + "\" exists already. The dialog id must be unique.");
        }
        /** @type {?} */
        var overlayRef = this._createOverlay(config);
        /** @type {?} */
        var dialogContainer = this._attachDialogContainer(overlayRef, config);
        /** @type {?} */
        var dialogRef = this._attachDialogContentForTemplate(template, dialogContainer, overlayRef, config);
        this._registerDialogRef(dialogRef);
        return dialogRef;
    };
    /**
     * @return {?}
     */
    Dialog.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        // Only close all the dialogs at this level.
        this._openDialogs.forEach((/**
         * @param {?} ref
         * @return {?}
         */
        function (ref) { return ref.close(); }));
    };
    /**
     * Forwards emitting events for when dialogs are opened and all dialogs are closed.
     */
    /**
     * Forwards emitting events for when dialogs are opened and all dialogs are closed.
     * @private
     * @param {?} dialogRef
     * @return {?}
     */
    Dialog.prototype._registerDialogRef = /**
     * Forwards emitting events for when dialogs are opened and all dialogs are closed.
     * @private
     * @param {?} dialogRef
     * @return {?}
     */
    function (dialogRef) {
        var _this = this;
        this.openDialogs.push(dialogRef);
        /** @type {?} */
        var dialogOpenSub = dialogRef.afterOpened().subscribe((/**
         * @return {?}
         */
        function () {
            _this.afterOpened.next(dialogRef);
            dialogOpenSub.unsubscribe();
        }));
        /** @type {?} */
        var dialogCloseSub = dialogRef.afterClosed().subscribe((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var dialogIndex = _this._openDialogs.indexOf(dialogRef);
            if (dialogIndex > -1) {
                _this._openDialogs.splice(dialogIndex, 1);
            }
            if (!_this._openDialogs.length) {
                _this._afterAllClosedBase.next();
                dialogCloseSub.unsubscribe();
            }
        }));
    };
    /**
     * Creates an overlay config from a dialog config.
     * @param config The dialog configuration.
     * @returns The overlay configuration.
     */
    /**
     * Creates an overlay config from a dialog config.
     * @protected
     * @param {?} config The dialog configuration.
     * @return {?} The overlay configuration.
     */
    Dialog.prototype._createOverlay = /**
     * Creates an overlay config from a dialog config.
     * @protected
     * @param {?} config The dialog configuration.
     * @return {?} The overlay configuration.
     */
    function (config) {
        /** @type {?} */
        var overlayConfig = new overlay.OverlayConfig({
            positionStrategy: this._overlay.position().global(),
            scrollStrategy: this._scrollStrategy(),
            panelClass: config.panelClass,
            hasBackdrop: config.hasBackdrop,
            direction: config.direction,
            minWidth: config.minWidth,
            minHeight: config.minHeight,
            maxWidth: config.maxWidth,
            maxHeight: config.maxHeight
        });
        if (config.backdropClass) {
            overlayConfig.backdropClass = config.backdropClass;
        }
        return this._overlay.create(overlayConfig);
    };
    /**
     * Attaches an MatDialogContainer to a dialog's already-created overlay.
     * @param overlay Reference to the dialog's underlying overlay.
     * @param config The dialog configuration.
     * @returns A promise resolving to a ComponentRef for the attached container.
     */
    /**
     * Attaches an MatDialogContainer to a dialog's already-created overlay.
     * @protected
     * @param {?} overlay Reference to the dialog's underlying overlay.
     * @param {?} config The dialog configuration.
     * @return {?} A promise resolving to a ComponentRef for the attached container.
     */
    Dialog.prototype._attachDialogContainer = /**
     * Attaches an MatDialogContainer to a dialog's already-created overlay.
     * @protected
     * @param {?} overlay Reference to the dialog's underlying overlay.
     * @param {?} config The dialog configuration.
     * @return {?} A promise resolving to a ComponentRef for the attached container.
     */
    function (overlay$$1, config) {
        /** @type {?} */
        var container = config.containerComponent || this._injector.get(DIALOG_CONTAINER);
        /** @type {?} */
        var userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        /** @type {?} */
        var injector = new portal.PortalInjector(userInjector || this._injector, new WeakMap([
            [DialogConfig, config]
        ]));
        /** @type {?} */
        var containerPortal = new portal.ComponentPortal(container, config.viewContainerRef, injector);
        /** @type {?} */
        var containerRef = overlay$$1.attach(containerPortal);
        containerRef.instance._config = config;
        return containerRef.instance;
    };
    /**
     * Attaches the user-provided component to the already-created MatDialogContainer.
     * @param componentOrTemplateRef The type of component being loaded into the dialog,
     *     or a TemplateRef to instantiate as the content.
     * @param dialogContainer Reference to the wrapping MatDialogContainer.
     * @param overlayRef Reference to the overlay in which the dialog resides.
     * @param config The dialog configuration.
     * @returns A promise resolving to the MatDialogRef that should be returned to the user.
     */
    /**
     * Attaches the user-provided component to the already-created MatDialogContainer.
     * @protected
     * @template T
     * @param {?} componentOrTemplateRef The type of component being loaded into the dialog,
     *     or a TemplateRef to instantiate as the content.
     * @param {?} dialogContainer Reference to the wrapping MatDialogContainer.
     * @param {?} overlayRef Reference to the overlay in which the dialog resides.
     * @param {?} config The dialog configuration.
     * @return {?} A promise resolving to the MatDialogRef that should be returned to the user.
     */
    Dialog.prototype._attachDialogContentForComponent = /**
     * Attaches the user-provided component to the already-created MatDialogContainer.
     * @protected
     * @template T
     * @param {?} componentOrTemplateRef The type of component being loaded into the dialog,
     *     or a TemplateRef to instantiate as the content.
     * @param {?} dialogContainer Reference to the wrapping MatDialogContainer.
     * @param {?} overlayRef Reference to the overlay in which the dialog resides.
     * @param {?} config The dialog configuration.
     * @return {?} A promise resolving to the MatDialogRef that should be returned to the user.
     */
    function (componentOrTemplateRef, dialogContainer, overlayRef, config) {
        // Create a reference to the dialog we're creating in order to give the user a handle
        // to modify and close it.
        /** @type {?} */
        var dialogRef = new this._dialogRefConstructor(overlayRef, dialogContainer, config.id);
        /** @type {?} */
        var injector = this._createInjector(config, dialogRef, dialogContainer);
        /** @type {?} */
        var contentRef = dialogContainer.attachComponentPortal(new portal.ComponentPortal(componentOrTemplateRef, undefined, injector));
        dialogRef.componentInstance = contentRef.instance;
        dialogRef.disableClose = config.disableClose;
        dialogRef.updateSize({ width: config.width, height: config.height })
            .updatePosition(config.position);
        return dialogRef;
    };
    /**
     * Attaches the user-provided component to the already-created MatDialogContainer.
     * @param componentOrTemplateRef The type of component being loaded into the dialog,
     *     or a TemplateRef to instantiate as the content.
     * @param dialogContainer Reference to the wrapping MatDialogContainer.
     * @param overlayRef Reference to the overlay in which the dialog resides.
     * @param config The dialog configuration.
     * @returns A promise resolving to the MatDialogRef that should be returned to the user.
     */
    /**
     * Attaches the user-provided component to the already-created MatDialogContainer.
     * @protected
     * @template T
     * @param {?} componentOrTemplateRef The type of component being loaded into the dialog,
     *     or a TemplateRef to instantiate as the content.
     * @param {?} dialogContainer Reference to the wrapping MatDialogContainer.
     * @param {?} overlayRef Reference to the overlay in which the dialog resides.
     * @param {?} config The dialog configuration.
     * @return {?} A promise resolving to the MatDialogRef that should be returned to the user.
     */
    Dialog.prototype._attachDialogContentForTemplate = /**
     * Attaches the user-provided component to the already-created MatDialogContainer.
     * @protected
     * @template T
     * @param {?} componentOrTemplateRef The type of component being loaded into the dialog,
     *     or a TemplateRef to instantiate as the content.
     * @param {?} dialogContainer Reference to the wrapping MatDialogContainer.
     * @param {?} overlayRef Reference to the overlay in which the dialog resides.
     * @param {?} config The dialog configuration.
     * @return {?} A promise resolving to the MatDialogRef that should be returned to the user.
     */
    function (componentOrTemplateRef, dialogContainer, overlayRef, config) {
        // Create a reference to the dialog we're creating in order to give the user a handle
        // to modify and close it.
        /** @type {?} */
        var dialogRef = new this._dialogRefConstructor(overlayRef, dialogContainer, config.id);
        dialogContainer.attachTemplatePortal(new portal.TemplatePortal(componentOrTemplateRef, (/** @type {?} */ (null)), (/** @type {?} */ ({ $implicit: config.data, dialogRef: dialogRef }))));
        dialogRef.updateSize({ width: config.width, height: config.height })
            .updatePosition(config.position);
        return dialogRef;
    };
    /**
     * Creates a custom injector to be used inside the dialog. This allows a component loaded inside
     * of a dialog to close itself and, optionally, to return a value.
     * @param config Config object that is used to construct the dialog.
     * @param dialogRef Reference to the dialog.
     * @param container Dialog container element that wraps all of the contents.
     * @returns The custom injector that can be used inside the dialog.
     */
    /**
     * Creates a custom injector to be used inside the dialog. This allows a component loaded inside
     * of a dialog to close itself and, optionally, to return a value.
     * @private
     * @template T
     * @param {?} config Config object that is used to construct the dialog.
     * @param {?} dialogRef Reference to the dialog.
     * @param {?} dialogContainer
     * @return {?} The custom injector that can be used inside the dialog.
     */
    Dialog.prototype._createInjector = /**
     * Creates a custom injector to be used inside the dialog. This allows a component loaded inside
     * of a dialog to close itself and, optionally, to return a value.
     * @private
     * @template T
     * @param {?} config Config object that is used to construct the dialog.
     * @param {?} dialogRef Reference to the dialog.
     * @param {?} dialogContainer
     * @return {?} The custom injector that can be used inside the dialog.
     */
    function (config, dialogRef, dialogContainer) {
        /** @type {?} */
        var userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        /** @type {?} */
        var injectionTokens = new WeakMap([
            [this._injector.get(DIALOG_REF), dialogRef],
            [this._injector.get(DIALOG_CONTAINER), dialogContainer],
            [DIALOG_DATA, config.data]
        ]);
        if (config.direction &&
            (!userInjector || !userInjector.get(bidi.Directionality, null))) {
            injectionTokens.set(bidi.Directionality, {
                value: config.direction,
                change: rxjs.of()
            });
        }
        return new portal.PortalInjector(userInjector || this._injector, injectionTokens);
    };
    /**
     * Expands the provided configuration object to include the default values for properties which
     * are undefined.
     */
    /**
     * Expands the provided configuration object to include the default values for properties which
     * are undefined.
     * @private
     * @param {?=} config
     * @return {?}
     */
    Dialog.prototype._applyConfigDefaults = /**
     * Expands the provided configuration object to include the default values for properties which
     * are undefined.
     * @private
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        /** @type {?} */
        var dialogConfig = (/** @type {?} */ (this._injector.get(DIALOG_CONFIG)));
        return __assign({}, new dialogConfig(), config);
    };
    Dialog.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    Dialog.ctorParameters = function () { return [
        { type: overlay.Overlay },
        { type: core.Injector },
        { type: core.Type, decorators: [{ type: core.Inject, args: [DIALOG_REF,] }] },
        { type: undefined, decorators: [{ type: core.Inject, args: [DIALOG_SCROLL_STRATEGY,] }] },
        { type: Dialog, decorators: [{ type: core.Optional }, { type: core.SkipSelf }] },
        { type: common.Location, decorators: [{ type: core.Optional }] }
    ]; };
    return Dialog;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ɵ0 = DialogRef, ɵ1 = CdkDialogContainer, ɵ2 = DialogConfig;
var DialogModule = /** @class */ (function () {
    function DialogModule() {
    }
    DialogModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        overlay.OverlayModule,
                        portal.PortalModule,
                        a11y.A11yModule,
                    ],
                    exports: [
                        // Re-export the PortalModule so that people extending the `CdkDialogContainer`
                        // don't have to remember to import it or be faced with an unhelpful error.
                        portal.PortalModule,
                        CdkDialogContainer,
                    ],
                    declarations: [
                        CdkDialogContainer,
                    ],
                    providers: [
                        Dialog,
                        MAT_DIALOG_SCROLL_STRATEGY_PROVIDER,
                        { provide: DIALOG_REF, useValue: ɵ0 },
                        { provide: DIALOG_CONTAINER, useValue: ɵ1 },
                        { provide: DIALOG_CONFIG, useValue: ɵ2 },
                    ],
                    entryComponents: [CdkDialogContainer],
                },] },
    ];
    return DialogModule;
}());

exports.throwDialogContentAlreadyAttachedError = throwDialogContentAlreadyAttachedError;
exports.CdkDialogContainer = CdkDialogContainer;
exports.DialogConfig = DialogConfig;
exports.DialogRef = DialogRef;
exports.Dialog = Dialog;
exports.DialogModule = DialogModule;
exports.MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY = MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY;
exports.DIALOG_SCROLL_STRATEGY = DIALOG_SCROLL_STRATEGY;
exports.DIALOG_DATA = DIALOG_DATA;
exports.DIALOG_REF = DIALOG_REF;
exports.DIALOG_CONFIG = DIALOG_CONFIG;
exports.DIALOG_CONTAINER = DIALOG_CONTAINER;
exports.MAT_DIALOG_SCROLL_STRATEGY_PROVIDER = MAT_DIALOG_SCROLL_STRATEGY_PROVIDER;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cdk-experimental-dialog.umd.js.map
