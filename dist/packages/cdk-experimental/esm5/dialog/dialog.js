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
import { SkipSelf, Optional, Injectable, Injector, Inject, Type } from '@angular/core';
import { ComponentPortal, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
import { of as observableOf, Subject, defer } from 'rxjs';
import { Location } from '@angular/common';
import { DialogConfig } from './dialog-config';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay, OverlayConfig, } from '@angular/cdk/overlay';
import { startWith } from 'rxjs/operators';
import { DIALOG_SCROLL_STRATEGY, DIALOG_DATA, DIALOG_REF, DIALOG_CONTAINER, DIALOG_CONFIG, } from './dialog-injectors';
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
        this._afterAllClosedBase = new Subject();
        // TODO(jelbourn): tighten the type on the right-hand side of this expression.
        this.afterAllClosed = defer((/**
         * @return {?}
         */
        function () { return _this.openDialogs.length ?
            _this._afterAllClosed : _this._afterAllClosed.pipe(startWith(undefined)); }));
        this._afterOpened = new Subject();
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
        var overlayConfig = new OverlayConfig({
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
    function (overlay, config) {
        /** @type {?} */
        var container = config.containerComponent || this._injector.get(DIALOG_CONTAINER);
        /** @type {?} */
        var userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        /** @type {?} */
        var injector = new PortalInjector(userInjector || this._injector, new WeakMap([
            [DialogConfig, config]
        ]));
        /** @type {?} */
        var containerPortal = new ComponentPortal(container, config.viewContainerRef, injector);
        /** @type {?} */
        var containerRef = overlay.attach(containerPortal);
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
        var contentRef = dialogContainer.attachComponentPortal(new ComponentPortal(componentOrTemplateRef, undefined, injector));
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
        dialogContainer.attachTemplatePortal(new TemplatePortal(componentOrTemplateRef, (/** @type {?} */ (null)), (/** @type {?} */ ({ $implicit: config.data, dialogRef: dialogRef }))));
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
            (!userInjector || !userInjector.get(Directionality, null))) {
            injectionTokens.set(Directionality, {
                value: config.direction,
                change: observableOf()
            });
        }
        return new PortalInjector(userInjector || this._injector, injectionTokens);
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
        return tslib_1.__assign({}, new dialogConfig(), config);
    };
    Dialog.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Dialog.ctorParameters = function () { return [
        { type: Overlay },
        { type: Injector },
        { type: Type, decorators: [{ type: Inject, args: [DIALOG_REF,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [DIALOG_SCROLL_STRATEGY,] }] },
        { type: Dialog, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: Location, decorators: [{ type: Optional }] }
    ]; };
    return Dialog;
}());
export { Dialog };
if (false) {
    /**
     * @type {?}
     * @private
     */
    Dialog.prototype._scrollStrategy;
    /** @type {?} */
    Dialog.prototype._afterAllClosedBase;
    /** @type {?} */
    Dialog.prototype.afterAllClosed;
    /** @type {?} */
    Dialog.prototype._afterOpened;
    /** @type {?} */
    Dialog.prototype._openDialogs;
    /**
     * @type {?}
     * @private
     */
    Dialog.prototype._overlay;
    /**
     * @type {?}
     * @private
     */
    Dialog.prototype._injector;
    /**
     * @type {?}
     * @private
     */
    Dialog.prototype._dialogRefConstructor;
    /**
     * @type {?}
     * @private
     */
    Dialog.prototype._parentDialog;
}
//# sourceMappingURL=dialog.js.map