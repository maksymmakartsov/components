/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { TemplatePortal } from '@angular/cdk/portal';
import { Directive, ElementRef, NgZone, TemplateRef, ViewContainerRef, HostListener, } from '@angular/core';
import { fromEvent, fromEventPattern, merge, ReplaySubject } from 'rxjs';
import { filter, map, mapTo, share, startWith, takeUntil, throttleTime, withLatestFrom, } from 'rxjs/operators';
import { CELL_SELECTOR, EDIT_PANE_CLASS, EDIT_PANE_SELECTOR, ROW_SELECTOR } from './constants';
import { EditEventDispatcher } from './edit-event-dispatcher';
import { EditServices } from './edit-services';
import { FocusDispatcher } from './focus-dispatcher';
import { FocusEscapeNotifierFactory } from './focus-escape-notifier';
import { closest } from './polyfill';
/**
 * Describes the number of columns before and after the originating cell that the
 * edit popup should span. In left to right locales, before means left and after means
 * right. In right to left locales before means right and after means left.
 * @record
 */
export function CdkPopoverEditColspan() { }
if (false) {
    /** @type {?|undefined} */
    CdkPopoverEditColspan.prototype.before;
    /** @type {?|undefined} */
    CdkPopoverEditColspan.prototype.after;
}
/**
 * Used for rate-limiting mousemove events.
 * @type {?}
 */
var MOUSE_MOVE_THROTTLE_TIME_MS = 10;
/**
 * A directive that must be attached to enable editability on a table.
 * It is responsible for setting up delegated event handlers and providing the
 * EditEventDispatcher service for use by the other edit directives.
 */
var CdkEditable = /** @class */ (function () {
    function CdkEditable(elementRef, editEventDispatcher, focusDispatcher, ngZone) {
        this.elementRef = elementRef;
        this.editEventDispatcher = editEventDispatcher;
        this.focusDispatcher = focusDispatcher;
        this.ngZone = ngZone;
        this.destroyed = new ReplaySubject();
    }
    /**
     * @return {?}
     */
    CdkEditable.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this._listenForTableEvents();
    };
    /**
     * @return {?}
     */
    CdkEditable.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed.next();
        this.destroyed.complete();
    };
    /**
     * @private
     * @return {?}
     */
    CdkEditable.prototype._listenForTableEvents = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var element = this.elementRef.nativeElement;
        /** @type {?} */
        var toClosest = (/**
         * @param {?} selector
         * @return {?}
         */
        function (selector) {
            return map((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return closest(event.target, selector); }));
        });
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            // Track mouse movement over the table to hide/show hover content.
            fromEvent(element, 'mouseover').pipe(toClosest(ROW_SELECTOR), takeUntil(_this.destroyed)).subscribe(_this.editEventDispatcher.hovering);
            fromEvent(element, 'mouseleave').pipe(mapTo(null), takeUntil(_this.destroyed)).subscribe(_this.editEventDispatcher.hovering);
            fromEvent(element, 'mousemove').pipe(throttleTime(MOUSE_MOVE_THROTTLE_TIME_MS), toClosest(ROW_SELECTOR), takeUntil(_this.destroyed)).subscribe(_this.editEventDispatcher.mouseMove);
            // Track focus within the table to hide/show/make focusable hover content.
            fromEventPattern((/**
             * @param {?} handler
             * @return {?}
             */
            function (handler) { return element.addEventListener('focus', handler, true); }), (/**
             * @param {?} handler
             * @return {?}
             */
            function (handler) { return element.removeEventListener('focus', handler, true); })).pipe(takeUntil(_this.destroyed), toClosest(ROW_SELECTOR), share()).subscribe(_this.editEventDispatcher.focused);
            fromEventPattern((/**
             * @param {?} handler
             * @return {?}
             */
            function (handler) { return element.addEventListener('blur', handler, true); }), (/**
             * @param {?} handler
             * @return {?}
             */
            function (handler) { return element.removeEventListener('blur', handler, true); })).pipe(takeUntil(_this.destroyed), mapTo(null), share()).subscribe(_this.editEventDispatcher.focused);
            // Keep track of rows within the table. This is used to know which rows with hover content
            // are first or last in the table. They are kept focusable in case focus enters from above
            // or below the table.
            _this.ngZone.onStable.pipe(takeUntil(_this.destroyed), 
            // Optimization: ignore dom changes while focus is within the table as we already
            // ensure that rows above and below the focused/active row are tabbable.
            withLatestFrom(_this.editEventDispatcher.editingOrFocused), filter((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _ = _a[0], activeRow = _a[1];
                return activeRow == null;
            })), map((/**
             * @return {?}
             */
            function () { return element.querySelectorAll(ROW_SELECTOR); })), share()).subscribe(_this.editEventDispatcher.allRows);
            fromEvent(element, 'keydown').pipe(filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event.key === 'Enter'; })), toClosest(CELL_SELECTOR), takeUntil(_this.destroyed)).subscribe(_this.editEventDispatcher.editing);
            // Keydown must be used here or else key autorepeat does not work properly on some platforms.
            fromEvent(element, 'keydown')
                .pipe(takeUntil(_this.destroyed))
                .subscribe(_this.focusDispatcher.keyObserver);
        }));
    };
    CdkEditable.decorators = [
        { type: Directive, args: [{
                    selector: 'table[editable], cdk-table[editable], mat-table[editable]',
                    providers: [EditEventDispatcher, EditServices],
                },] },
    ];
    /** @nocollapse */
    CdkEditable.ctorParameters = function () { return [
        { type: ElementRef },
        { type: EditEventDispatcher },
        { type: FocusDispatcher },
        { type: NgZone }
    ]; };
    return CdkEditable;
}());
export { CdkEditable };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    CdkEditable.prototype.destroyed;
    /**
     * @type {?}
     * @protected
     */
    CdkEditable.prototype.elementRef;
    /**
     * @type {?}
     * @protected
     */
    CdkEditable.prototype.editEventDispatcher;
    /**
     * @type {?}
     * @protected
     */
    CdkEditable.prototype.focusDispatcher;
    /**
     * @type {?}
     * @protected
     */
    CdkEditable.prototype.ngZone;
}
/** @type {?} */
var POPOVER_EDIT_HOST_BINDINGS = {
    'tabIndex': '0',
    'class': 'cdk-popover-edit-cell',
    '[attr.aria-haspopup]': 'true',
};
/** @type {?} */
var POPOVER_EDIT_INPUTS = [
    'template: cdkPopoverEdit',
    'context: cdkPopoverEditContext',
    'colspan: cdkPopoverEditColspan',
];
/**
 * Attaches an ng-template to a cell and shows it when instructed to by the
 * EditEventDispatcher service.
 * Makes the cell focusable.
 * @template C
 */
var CdkPopoverEdit = /** @class */ (function () {
    function CdkPopoverEdit(services, elementRef, viewContainerRef) {
        this.services = services;
        this.elementRef = elementRef;
        this.viewContainerRef = viewContainerRef;
        /**
         * The edit lens template shown over the cell on edit.
         */
        this.template = null;
        this._colspan = {};
        this.destroyed = new ReplaySubject();
    }
    Object.defineProperty(CdkPopoverEdit.prototype, "colspan", {
        /**
         * Specifies that the popup should cover additional table cells before and/or after
         * this one.
         */
        get: /**
         * Specifies that the popup should cover additional table cells before and/or after
         * this one.
         * @return {?}
         */
        function () {
            return this._colspan;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._colspan = value;
            // Recompute positioning when the colspan changes.
            if (this.overlayRef) {
                this.overlayRef.updatePositionStrategy(this._getPositionStrategy());
                if (this.overlayRef.hasAttached()) {
                    this._updateOverlaySize();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CdkPopoverEdit.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this._startListeningToEditEvents();
    };
    /**
     * @return {?}
     */
    CdkPopoverEdit.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed.next();
        this.destroyed.complete();
        if (this.focusTrap) {
            this.focusTrap.destroy();
            this.focusTrap = undefined;
        }
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
    };
    /**
     * @protected
     * @return {?}
     */
    CdkPopoverEdit.prototype.initFocusTrap = /**
     * @protected
     * @return {?}
     */
    function () {
        this.focusTrap = this.services.focusTrapFactory.create((/** @type {?} */ (this.overlayRef)).overlayElement);
    };
    /**
     * @protected
     * @return {?}
     */
    CdkPopoverEdit.prototype.closeEditOverlay = /**
     * @protected
     * @return {?}
     */
    function () {
        this.services.editEventDispatcher.doneEditingCell((/** @type {?} */ (this.elementRef.nativeElement)));
    };
    /**
     * @protected
     * @return {?}
     */
    CdkPopoverEdit.prototype.panelClass = /**
     * @protected
     * @return {?}
     */
    function () {
        return EDIT_PANE_CLASS;
    };
    /**
     * @private
     * @return {?}
     */
    CdkPopoverEdit.prototype._startListeningToEditEvents = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.services.editEventDispatcher.editingCell((/** @type {?} */ (this.elementRef.nativeElement)))
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @param {?} open
         * @return {?}
         */
        function (open) {
            if (open && _this.template) {
                if (!_this.overlayRef) {
                    _this._createEditOverlay();
                }
                _this._showEditOverlay();
            }
            else if (_this.overlayRef) {
                _this._maybeReturnFocusToCell();
                _this.overlayRef.detach();
            }
        }));
    };
    /**
     * @private
     * @return {?}
     */
    CdkPopoverEdit.prototype._createEditOverlay = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.overlayRef = this.services.overlay.create({
            disposeOnNavigation: true,
            panelClass: this.panelClass(),
            positionStrategy: this._getPositionStrategy(),
            scrollStrategy: this.services.overlay.scrollStrategies.reposition(),
            direction: this.services.directionality,
        });
        this.initFocusTrap();
        this.overlayRef.overlayElement.setAttribute('aria-role', 'dialog');
        this.overlayRef.detachments().subscribe((/**
         * @return {?}
         */
        function () { return _this.closeEditOverlay(); }));
    };
    /**
     * @private
     * @return {?}
     */
    CdkPopoverEdit.prototype._showEditOverlay = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        (/** @type {?} */ (this.overlayRef)).attach(new TemplatePortal((/** @type {?} */ (this.template)), this.viewContainerRef, { $implicit: this.context }));
        // We have to defer trapping focus, because doing so too early can cause the form inside
        // the overlay to be submitted immediately if it was opened on an Enter keydown event.
        this.services.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            setTimeout((/**
             * @return {?}
             */
            function () {
                (/** @type {?} */ (_this.focusTrap)).focusInitialElement();
            }));
        }));
        // Update the size of the popup initially and on subsequent changes to
        // scroll position and viewport size.
        merge(this.services.scrollDispatcher.scrolled(), this.services.viewportRuler.change())
            .pipe(startWith(null), takeUntil((/** @type {?} */ (this.overlayRef)).detachments()), takeUntil(this.destroyed))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this._updateOverlaySize();
        }));
    };
    /**
     * @private
     * @return {?}
     */
    CdkPopoverEdit.prototype._getOverlayCells = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var cell = (/** @type {?} */ (closest((/** @type {?} */ (this.elementRef.nativeElement)), CELL_SELECTOR)));
        if (!this._colspan.before && !this._colspan.after) {
            return [cell];
        }
        /** @type {?} */
        var row = (/** @type {?} */ (closest((/** @type {?} */ (this.elementRef.nativeElement)), ROW_SELECTOR)));
        /** @type {?} */
        var rowCells = (/** @type {?} */ (Array.from(row.querySelectorAll(CELL_SELECTOR))));
        /** @type {?} */
        var ownIndex = rowCells.indexOf(cell);
        return rowCells.slice(ownIndex - (this._colspan.before || 0), ownIndex + (this._colspan.after || 0) + 1);
    };
    /**
     * @private
     * @return {?}
     */
    CdkPopoverEdit.prototype._getPositionStrategy = /**
     * @private
     * @return {?}
     */
    function () {
        return this.services.positionFactory.positionStrategyForCells(this._getOverlayCells());
    };
    /**
     * @private
     * @return {?}
     */
    CdkPopoverEdit.prototype._updateOverlaySize = /**
     * @private
     * @return {?}
     */
    function () {
        (/** @type {?} */ (this.overlayRef)).updateSize(this.services.positionFactory.sizeConfigForCells(this._getOverlayCells()));
    };
    /**
     * @private
     * @return {?}
     */
    CdkPopoverEdit.prototype._maybeReturnFocusToCell = /**
     * @private
     * @return {?}
     */
    function () {
        if (closest(document.activeElement, EDIT_PANE_SELECTOR) ===
            (/** @type {?} */ (this.overlayRef)).overlayElement) {
            (/** @type {?} */ (this.elementRef.nativeElement)).focus();
        }
    };
    CdkPopoverEdit.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkPopoverEdit]:not([cdkPopoverEditTabOut])',
                    host: POPOVER_EDIT_HOST_BINDINGS,
                    inputs: POPOVER_EDIT_INPUTS,
                },] },
    ];
    /** @nocollapse */
    CdkPopoverEdit.ctorParameters = function () { return [
        { type: EditServices },
        { type: ElementRef },
        { type: ViewContainerRef }
    ]; };
    return CdkPopoverEdit;
}());
export { CdkPopoverEdit };
if (false) {
    /**
     * The edit lens template shown over the cell on edit.
     * @type {?}
     */
    CdkPopoverEdit.prototype.template;
    /**
     * Implicit context to pass along to the template. Can be omitted if the template
     * is defined within the cell.
     * @type {?}
     */
    CdkPopoverEdit.prototype.context;
    /**
     * @type {?}
     * @private
     */
    CdkPopoverEdit.prototype._colspan;
    /**
     * @type {?}
     * @protected
     */
    CdkPopoverEdit.prototype.focusTrap;
    /**
     * @type {?}
     * @protected
     */
    CdkPopoverEdit.prototype.overlayRef;
    /**
     * @type {?}
     * @protected
     */
    CdkPopoverEdit.prototype.destroyed;
    /**
     * @type {?}
     * @protected
     */
    CdkPopoverEdit.prototype.services;
    /**
     * @type {?}
     * @protected
     */
    CdkPopoverEdit.prototype.elementRef;
    /**
     * @type {?}
     * @protected
     */
    CdkPopoverEdit.prototype.viewContainerRef;
}
/**
 * Attaches an ng-template to a cell and shows it when instructed to by the
 * EditEventDispatcher service.
 * Makes the cell focusable.
 * @template C
 */
var CdkPopoverEditTabOut = /** @class */ (function (_super) {
    tslib_1.__extends(CdkPopoverEditTabOut, _super);
    function CdkPopoverEditTabOut(elementRef, viewContainerRef, services, focusEscapeNotifierFactory) {
        var _this = _super.call(this, services, elementRef, viewContainerRef) || this;
        _this.focusEscapeNotifierFactory = focusEscapeNotifierFactory;
        return _this;
    }
    /**
     * @protected
     * @return {?}
     */
    CdkPopoverEditTabOut.prototype.initFocusTrap = /**
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        this.focusTrap = this.focusEscapeNotifierFactory.create((/** @type {?} */ (this.overlayRef)).overlayElement);
        this.focusTrap.escapes().pipe(takeUntil(this.destroyed)).subscribe((/**
         * @param {?} direction
         * @return {?}
         */
        function (direction) {
            if (_this.services.editEventDispatcher.editRef) {
                _this.services.editEventDispatcher.editRef.blur();
            }
            _this.services.focusDispatcher.moveFocusHorizontally((/** @type {?} */ (closest((/** @type {?} */ (_this.elementRef.nativeElement)), CELL_SELECTOR))), direction === 0 /* START */ ? -1 : 1);
            _this.closeEditOverlay();
        }));
    };
    CdkPopoverEditTabOut.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkPopoverEdit][cdkPopoverEditTabOut]',
                    host: POPOVER_EDIT_HOST_BINDINGS,
                    inputs: POPOVER_EDIT_INPUTS,
                },] },
    ];
    /** @nocollapse */
    CdkPopoverEditTabOut.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ViewContainerRef },
        { type: EditServices },
        { type: FocusEscapeNotifierFactory }
    ]; };
    return CdkPopoverEditTabOut;
}(CdkPopoverEdit));
export { CdkPopoverEditTabOut };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    CdkPopoverEditTabOut.prototype.focusTrap;
    /**
     * @type {?}
     * @protected
     */
    CdkPopoverEditTabOut.prototype.focusEscapeNotifierFactory;
}
/**
 * A structural directive that shows its contents when the table row containing
 * it is hovered or when an element in the row has focus.
 */
var CdkRowHoverContent = /** @class */ (function () {
    function CdkRowHoverContent(services, elementRef, templateRef, viewContainerRef) {
        this.services = services;
        this.elementRef = elementRef;
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
        this.destroyed = new ReplaySubject();
        this.viewRef = null;
    }
    /**
     * @return {?}
     */
    CdkRowHoverContent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this._row = (/** @type {?} */ (closest((/** @type {?} */ (this.elementRef.nativeElement)), ROW_SELECTOR)));
        this.services.editEventDispatcher.registerRowWithHoverContent(this._row);
        this._listenForHoverAndFocusEvents();
    };
    /**
     * @return {?}
     */
    CdkRowHoverContent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed.next();
        this.destroyed.complete();
        if (this.viewRef) {
            this.viewRef.destroy();
        }
        if (this._row) {
            this.services.editEventDispatcher.deregisterRowWithHoverContent(this._row);
        }
    };
    /**
     * Called immediately after the hover content is created and added to the dom.
     * In the CDK version, this is a noop but subclasses such as MatRowHoverContent use this
     * to prepare/style the inserted element.
     */
    /**
     * Called immediately after the hover content is created and added to the dom.
     * In the CDK version, this is a noop but subclasses such as MatRowHoverContent use this
     * to prepare/style the inserted element.
     * @protected
     * @param {?} _
     * @return {?}
     */
    CdkRowHoverContent.prototype.initElement = /**
     * Called immediately after the hover content is created and added to the dom.
     * In the CDK version, this is a noop but subclasses such as MatRowHoverContent use this
     * to prepare/style the inserted element.
     * @protected
     * @param {?} _
     * @return {?}
     */
    function (_) {
    };
    /**
     * Called when the hover content needs to be focusable to preserve a reasonable tab ordering
     * but should not yet be shown.
     */
    /**
     * Called when the hover content needs to be focusable to preserve a reasonable tab ordering
     * but should not yet be shown.
     * @protected
     * @param {?} element
     * @return {?}
     */
    CdkRowHoverContent.prototype.makeElementHiddenButFocusable = /**
     * Called when the hover content needs to be focusable to preserve a reasonable tab ordering
     * but should not yet be shown.
     * @protected
     * @param {?} element
     * @return {?}
     */
    function (element) {
        element.style.opacity = '0';
    };
    /**
     * Called when the hover content needs to be focusable to preserve a reasonable tab ordering
     * but should not yet be shown.
     */
    /**
     * Called when the hover content needs to be focusable to preserve a reasonable tab ordering
     * but should not yet be shown.
     * @protected
     * @param {?} element
     * @return {?}
     */
    CdkRowHoverContent.prototype.makeElementVisible = /**
     * Called when the hover content needs to be focusable to preserve a reasonable tab ordering
     * but should not yet be shown.
     * @protected
     * @param {?} element
     * @return {?}
     */
    function (element) {
        element.style.opacity = '';
    };
    /**
     * @private
     * @return {?}
     */
    CdkRowHoverContent.prototype._listenForHoverAndFocusEvents = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.services.editEventDispatcher.hoverOrFocusOnRow((/** @type {?} */ (this._row)))
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @param {?} eventState
         * @return {?}
         */
        function (eventState) {
            // When in FOCUSABLE state, add the hover content to the dom but make it transparent so
            // that it is in the tab order relative to the currently focused row.
            if (eventState === 2 /* ON */ || eventState === 1 /* FOCUSABLE */) {
                if (!_this.viewRef) {
                    _this.viewRef = _this.viewContainerRef.createEmbeddedView(_this.templateRef, {});
                    _this.initElement((/** @type {?} */ (_this.viewRef.rootNodes[0])));
                }
                else if (_this.viewContainerRef.indexOf(_this.viewRef) === -1) {
                    _this.viewContainerRef.insert((/** @type {?} */ (_this.viewRef)));
                }
                if (eventState === 2 /* ON */) {
                    _this.makeElementVisible((/** @type {?} */ (_this.viewRef.rootNodes[0])));
                }
                else {
                    _this.makeElementHiddenButFocusable((/** @type {?} */ (_this.viewRef.rootNodes[0])));
                }
            }
            else if (_this.viewRef) {
                _this.viewContainerRef.detach(_this.viewContainerRef.indexOf(_this.viewRef));
            }
        }));
    };
    CdkRowHoverContent.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkRowHoverContent]',
                },] },
    ];
    /** @nocollapse */
    CdkRowHoverContent.ctorParameters = function () { return [
        { type: EditServices },
        { type: ElementRef },
        { type: TemplateRef },
        { type: ViewContainerRef }
    ]; };
    return CdkRowHoverContent;
}());
export { CdkRowHoverContent };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    CdkRowHoverContent.prototype.destroyed;
    /**
     * @type {?}
     * @protected
     */
    CdkRowHoverContent.prototype.viewRef;
    /**
     * @type {?}
     * @private
     */
    CdkRowHoverContent.prototype._row;
    /**
     * @type {?}
     * @protected
     */
    CdkRowHoverContent.prototype.services;
    /**
     * @type {?}
     * @protected
     */
    CdkRowHoverContent.prototype.elementRef;
    /**
     * @type {?}
     * @protected
     */
    CdkRowHoverContent.prototype.templateRef;
    /**
     * @type {?}
     * @protected
     */
    CdkRowHoverContent.prototype.viewContainerRef;
}
/**
 * Opens the closest edit popover to this element, whether it's associated with this exact
 * element or an ancestor element.
 */
var CdkEditOpen = /** @class */ (function () {
    function CdkEditOpen(elementRef, editEventDispatcher) {
        this.elementRef = elementRef;
        this.editEventDispatcher = editEventDispatcher;
        /** @type {?} */
        var nativeElement = elementRef.nativeElement;
        // Prevent accidental form submits.
        if (nativeElement.nodeName === 'BUTTON' && !nativeElement.getAttribute('type')) {
            nativeElement.setAttribute('type', 'button');
        }
    }
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /**
     * @param {?} evt
     * @return {?}
     */
    CdkEditOpen.prototype.openEdit = 
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        this.editEventDispatcher.editing.next(closest((/** @type {?} */ (this.elementRef.nativeElement)), CELL_SELECTOR));
        evt.stopPropagation();
    };
    CdkEditOpen.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkEditOpen]',
                },] },
    ];
    /** @nocollapse */
    CdkEditOpen.ctorParameters = function () { return [
        { type: ElementRef },
        { type: EditEventDispatcher }
    ]; };
    CdkEditOpen.propDecorators = {
        openEdit: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return CdkEditOpen;
}());
export { CdkEditOpen };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    CdkEditOpen.prototype.elementRef;
    /**
     * @type {?}
     * @protected
     */
    CdkEditOpen.prototype.editEventDispatcher;
}
//# sourceMappingURL=table-directives.js.map