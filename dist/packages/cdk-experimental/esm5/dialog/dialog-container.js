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
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { BasePortalOutlet, CdkPortalOutlet } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Inject, Optional, ViewChild, ViewEncapsulation, } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { DialogConfig } from './dialog-config';
/**
 * @return {?}
 */
export function throwDialogContentAlreadyAttachedError() {
    throw Error('Attempting to attach dialog content after content is already attached');
}
/**
 * Internal component that wraps user-provided dialog content.
 * \@docs-private
 */
var CdkDialogContainer = /** @class */ (function (_super) {
    tslib_1.__extends(CdkDialogContainer, _super);
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
        _this._beforeEnter = new Subject();
        /**
         * A subject emitting after the dialog enters the view.
         */
        _this._afterEnter = new Subject();
        /**
         * A subject emitting before the dialog exits the view.
         */
        _this._beforeExit = new Subject();
        /**
         * A subject emitting after the dialog exits the view.
         */
        _this._afterExit = new Subject();
        /**
         * Stream of animation `done` events.
         */
        _this._animationDone = new Subject();
        // We use a Subject with a distinctUntilChanged, rather than a callback attached to .done,
        // because some browsers fire the done event twice and we don't want to emit duplicate events.
        // See: https://github.com/angular/angular/issues/24084
        _this._animationDone.pipe(distinctUntilChanged((/**
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
    function (portal) {
        if (this._portalHost.hasAttached()) {
            throwDialogContentAlreadyAttachedError();
        }
        this._savePreviouslyFocusedElement();
        return this._portalHost.attachComponentPortal(portal);
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
    function (portal) {
        if (this._portalHost.hasAttached()) {
            throwDialogContentAlreadyAttachedError();
        }
        this._savePreviouslyFocusedElement();
        return this._portalHost.attachTemplatePortal(portal);
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
        { type: Component, args: [{selector: 'cdk-dialog-container',
                    template: "<ng-template cdkPortalOutlet></ng-template>",
                    styles: ["cdk-dialog-container{background:#fff;border-radius:5px;display:block;padding:10px}"],
                    encapsulation: ViewEncapsulation.None,
                    // Using OnPush for dialogs caused some G3 sync issues. Disabled until we can track them down.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: ChangeDetectionStrategy.Default,
                    animations: [
                        trigger('dialog', [
                            state('enter', style({ opacity: 1 })),
                            state('exit, void', style({ opacity: 0 })),
                            transition('* => enter', animate('{{enterAnimationDuration}}')),
                            transition('* => exit, * => void', animate('{{exitAnimationDuration}}')),
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
        { type: ElementRef },
        { type: FocusTrapFactory },
        { type: ChangeDetectorRef },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] },
        { type: DialogConfig }
    ]; };
    CdkDialogContainer.propDecorators = {
        _ariaLabel: [{ type: HostBinding, args: ['attr.aria-label',] }],
        _ariaDescribedBy: [{ type: HostBinding, args: ['attr.aria-describedby',] }],
        _role: [{ type: HostBinding, args: ['attr.role',] }],
        _ariaModal: [{ type: HostBinding, args: ['attr.aria-modal',] }],
        _tabindex: [{ type: HostBinding, args: ['attr.tabindex',] }],
        _portalHost: [{ type: ViewChild, args: [CdkPortalOutlet, { static: true },] }]
    };
    return CdkDialogContainer;
}(BasePortalOutlet));
export { CdkDialogContainer };
if (false) {
    /**
     * State of the dialog animation.
     * @type {?}
     */
    CdkDialogContainer.prototype._state;
    /**
     * Element that was focused before the dialog was opened. Save this to restore upon close.
     * @type {?}
     * @private
     */
    CdkDialogContainer.prototype._elementFocusedBeforeDialogWasOpened;
    /**
     * The class that traps and manages focus within the dialog.
     * @type {?}
     * @private
     */
    CdkDialogContainer.prototype._focusTrap;
    /** @type {?} */
    CdkDialogContainer.prototype._ariaModal;
    /**
     * The portal host inside of this container into which the dialog content will be loaded.
     * @type {?}
     */
    CdkDialogContainer.prototype._portalHost;
    /**
     * A subject emitting before the dialog enters the view.
     * @type {?}
     */
    CdkDialogContainer.prototype._beforeEnter;
    /**
     * A subject emitting after the dialog enters the view.
     * @type {?}
     */
    CdkDialogContainer.prototype._afterEnter;
    /**
     * A subject emitting before the dialog exits the view.
     * @type {?}
     */
    CdkDialogContainer.prototype._beforeExit;
    /**
     * A subject emitting after the dialog exits the view.
     * @type {?}
     */
    CdkDialogContainer.prototype._afterExit;
    /**
     * Stream of animation `done` events.
     * @type {?}
     */
    CdkDialogContainer.prototype._animationDone;
    /**
     * @type {?}
     * @private
     */
    CdkDialogContainer.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    CdkDialogContainer.prototype._focusTrapFactory;
    /**
     * @type {?}
     * @private
     */
    CdkDialogContainer.prototype._changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    CdkDialogContainer.prototype._document;
    /**
     * The dialog configuration.
     * @type {?}
     */
    CdkDialogContainer.prototype._config;
}
//# sourceMappingURL=dialog-container.js.map