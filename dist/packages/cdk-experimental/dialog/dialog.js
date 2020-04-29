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
export class Dialog {
    /**
     * @param {?} _overlay
     * @param {?} _injector
     * @param {?} _dialogRefConstructor
     * @param {?} scrollStrategy
     * @param {?} _parentDialog
     * @param {?} location
     */
    constructor(_overlay, _injector, _dialogRefConstructor, 
    // TODO(crisbeto): the `any` here can be replaced
    // with the proper type once we start using Ivy.
    scrollStrategy, _parentDialog, location) {
        this._overlay = _overlay;
        this._injector = _injector;
        this._dialogRefConstructor = _dialogRefConstructor;
        this._parentDialog = _parentDialog;
        this._afterAllClosedBase = new Subject();
        // TODO(jelbourn): tighten the type on the right-hand side of this expression.
        this.afterAllClosed = defer((/**
         * @return {?}
         */
        () => this.openDialogs.length ?
            this._afterAllClosed : this._afterAllClosed.pipe(startWith(undefined))));
        this._afterOpened = new Subject();
        this._openDialogs = [];
        // Close all of the dialogs when the user goes forwards/backwards in history or when the
        // location hash changes. Note that this usually doesn't include clicking on links (unless
        // the user is using the `HashLocationStrategy`).
        if (!_parentDialog && location) {
            location.subscribe((/**
             * @return {?}
             */
            () => this.closeAll()));
        }
        this._scrollStrategy = scrollStrategy;
    }
    /**
     * Stream that emits when all dialogs are closed.
     * @return {?}
     */
    get _afterAllClosed() {
        return this._parentDialog ? this._parentDialog.afterAllClosed : this._afterAllClosedBase;
    }
    /**
     * Stream that emits when a dialog is opened.
     * @return {?}
     */
    get afterOpened() {
        return this._parentDialog ? this._parentDialog.afterOpened : this._afterOpened;
    }
    /**
     * Stream that emits when a dialog is opened.
     * @return {?}
     */
    get openDialogs() {
        return this._parentDialog ? this._parentDialog.openDialogs : this._openDialogs;
    }
    /**
     * Gets an open dialog by id.
     * @param {?} id
     * @return {?}
     */
    getById(id) {
        return this._openDialogs.find((/**
         * @param {?} ref
         * @return {?}
         */
        ref => ref.id === id));
    }
    /**
     * Closes all open dialogs.
     * @return {?}
     */
    closeAll() {
        this.openDialogs.forEach((/**
         * @param {?} ref
         * @return {?}
         */
        ref => ref.close()));
    }
    /**
     * Opens a dialog from a component.
     * @template T
     * @param {?} component
     * @param {?=} config
     * @return {?}
     */
    openFromComponent(component, config) {
        config = this._applyConfigDefaults(config);
        if (config.id && this.getById(config.id)) {
            throw Error(`Dialog with id "${config.id}" exists already. The dialog id must be unique.`);
        }
        /** @type {?} */
        const overlayRef = this._createOverlay(config);
        /** @type {?} */
        const dialogContainer = this._attachDialogContainer(overlayRef, config);
        /** @type {?} */
        const dialogRef = this._attachDialogContentForComponent(component, dialogContainer, overlayRef, config);
        this._registerDialogRef(dialogRef);
        return dialogRef;
    }
    /**
     * Opens a dialog from a template.
     * @template T
     * @param {?} template
     * @param {?=} config
     * @return {?}
     */
    openFromTemplate(template, config) {
        config = this._applyConfigDefaults(config);
        if (config.id && this.getById(config.id)) {
            throw Error(`Dialog with id "${config.id}" exists already. The dialog id must be unique.`);
        }
        /** @type {?} */
        const overlayRef = this._createOverlay(config);
        /** @type {?} */
        const dialogContainer = this._attachDialogContainer(overlayRef, config);
        /** @type {?} */
        const dialogRef = this._attachDialogContentForTemplate(template, dialogContainer, overlayRef, config);
        this._registerDialogRef(dialogRef);
        return dialogRef;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // Only close all the dialogs at this level.
        this._openDialogs.forEach((/**
         * @param {?} ref
         * @return {?}
         */
        ref => ref.close()));
    }
    /**
     * Forwards emitting events for when dialogs are opened and all dialogs are closed.
     * @private
     * @param {?} dialogRef
     * @return {?}
     */
    _registerDialogRef(dialogRef) {
        this.openDialogs.push(dialogRef);
        /** @type {?} */
        const dialogOpenSub = dialogRef.afterOpened().subscribe((/**
         * @return {?}
         */
        () => {
            this.afterOpened.next(dialogRef);
            dialogOpenSub.unsubscribe();
        }));
        /** @type {?} */
        const dialogCloseSub = dialogRef.afterClosed().subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            let dialogIndex = this._openDialogs.indexOf(dialogRef);
            if (dialogIndex > -1) {
                this._openDialogs.splice(dialogIndex, 1);
            }
            if (!this._openDialogs.length) {
                this._afterAllClosedBase.next();
                dialogCloseSub.unsubscribe();
            }
        }));
    }
    /**
     * Creates an overlay config from a dialog config.
     * @protected
     * @param {?} config The dialog configuration.
     * @return {?} The overlay configuration.
     */
    _createOverlay(config) {
        /** @type {?} */
        const overlayConfig = new OverlayConfig({
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
    }
    /**
     * Attaches an MatDialogContainer to a dialog's already-created overlay.
     * @protected
     * @param {?} overlay Reference to the dialog's underlying overlay.
     * @param {?} config The dialog configuration.
     * @return {?} A promise resolving to a ComponentRef for the attached container.
     */
    _attachDialogContainer(overlay, config) {
        /** @type {?} */
        const container = config.containerComponent || this._injector.get(DIALOG_CONTAINER);
        /** @type {?} */
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        /** @type {?} */
        const injector = new PortalInjector(userInjector || this._injector, new WeakMap([
            [DialogConfig, config]
        ]));
        /** @type {?} */
        const containerPortal = new ComponentPortal(container, config.viewContainerRef, injector);
        /** @type {?} */
        const containerRef = overlay.attach(containerPortal);
        containerRef.instance._config = config;
        return containerRef.instance;
    }
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
    _attachDialogContentForComponent(componentOrTemplateRef, dialogContainer, overlayRef, config) {
        // Create a reference to the dialog we're creating in order to give the user a handle
        // to modify and close it.
        /** @type {?} */
        const dialogRef = new this._dialogRefConstructor(overlayRef, dialogContainer, config.id);
        /** @type {?} */
        const injector = this._createInjector(config, dialogRef, dialogContainer);
        /** @type {?} */
        const contentRef = dialogContainer.attachComponentPortal(new ComponentPortal(componentOrTemplateRef, undefined, injector));
        dialogRef.componentInstance = contentRef.instance;
        dialogRef.disableClose = config.disableClose;
        dialogRef.updateSize({ width: config.width, height: config.height })
            .updatePosition(config.position);
        return dialogRef;
    }
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
    _attachDialogContentForTemplate(componentOrTemplateRef, dialogContainer, overlayRef, config) {
        // Create a reference to the dialog we're creating in order to give the user a handle
        // to modify and close it.
        /** @type {?} */
        const dialogRef = new this._dialogRefConstructor(overlayRef, dialogContainer, config.id);
        dialogContainer.attachTemplatePortal(new TemplatePortal(componentOrTemplateRef, (/** @type {?} */ (null)), (/** @type {?} */ ({ $implicit: config.data, dialogRef }))));
        dialogRef.updateSize({ width: config.width, height: config.height })
            .updatePosition(config.position);
        return dialogRef;
    }
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
    _createInjector(config, dialogRef, dialogContainer) {
        /** @type {?} */
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        /** @type {?} */
        const injectionTokens = new WeakMap([
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
    }
    /**
     * Expands the provided configuration object to include the default values for properties which
     * are undefined.
     * @private
     * @param {?=} config
     * @return {?}
     */
    _applyConfigDefaults(config) {
        /** @type {?} */
        const dialogConfig = (/** @type {?} */ (this._injector.get(DIALOG_CONFIG)));
        return Object.assign({}, new dialogConfig(), config);
    }
}
Dialog.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Dialog.ctorParameters = () => [
    { type: Overlay },
    { type: Injector },
    { type: Type, decorators: [{ type: Inject, args: [DIALOG_REF,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [DIALOG_SCROLL_STRATEGY,] }] },
    { type: Dialog, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: Location, decorators: [{ type: Optional }] }
];
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