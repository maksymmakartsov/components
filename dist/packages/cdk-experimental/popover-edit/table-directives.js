/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
const MOUSE_MOVE_THROTTLE_TIME_MS = 10;
/**
 * A directive that must be attached to enable editability on a table.
 * It is responsible for setting up delegated event handlers and providing the
 * EditEventDispatcher service for use by the other edit directives.
 */
export class CdkEditable {
    /**
     * @param {?} elementRef
     * @param {?} editEventDispatcher
     * @param {?} focusDispatcher
     * @param {?} ngZone
     */
    constructor(elementRef, editEventDispatcher, focusDispatcher, ngZone) {
        this.elementRef = elementRef;
        this.editEventDispatcher = editEventDispatcher;
        this.focusDispatcher = focusDispatcher;
        this.ngZone = ngZone;
        this.destroyed = new ReplaySubject();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._listenForTableEvents();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
    /**
     * @private
     * @return {?}
     */
    _listenForTableEvents() {
        /** @type {?} */
        const element = this.elementRef.nativeElement;
        /** @type {?} */
        const toClosest = (/**
         * @param {?} selector
         * @return {?}
         */
        (selector) => map((/**
         * @param {?} event
         * @return {?}
         */
        (event) => closest(event.target, selector))));
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            // Track mouse movement over the table to hide/show hover content.
            fromEvent(element, 'mouseover').pipe(toClosest(ROW_SELECTOR), takeUntil(this.destroyed)).subscribe(this.editEventDispatcher.hovering);
            fromEvent(element, 'mouseleave').pipe(mapTo(null), takeUntil(this.destroyed)).subscribe(this.editEventDispatcher.hovering);
            fromEvent(element, 'mousemove').pipe(throttleTime(MOUSE_MOVE_THROTTLE_TIME_MS), toClosest(ROW_SELECTOR), takeUntil(this.destroyed)).subscribe(this.editEventDispatcher.mouseMove);
            // Track focus within the table to hide/show/make focusable hover content.
            fromEventPattern((/**
             * @param {?} handler
             * @return {?}
             */
            (handler) => element.addEventListener('focus', handler, true)), (/**
             * @param {?} handler
             * @return {?}
             */
            (handler) => element.removeEventListener('focus', handler, true))).pipe(takeUntil(this.destroyed), toClosest(ROW_SELECTOR), share()).subscribe(this.editEventDispatcher.focused);
            fromEventPattern((/**
             * @param {?} handler
             * @return {?}
             */
            (handler) => element.addEventListener('blur', handler, true)), (/**
             * @param {?} handler
             * @return {?}
             */
            (handler) => element.removeEventListener('blur', handler, true))).pipe(takeUntil(this.destroyed), mapTo(null), share()).subscribe(this.editEventDispatcher.focused);
            // Keep track of rows within the table. This is used to know which rows with hover content
            // are first or last in the table. They are kept focusable in case focus enters from above
            // or below the table.
            this.ngZone.onStable.pipe(takeUntil(this.destroyed), 
            // Optimization: ignore dom changes while focus is within the table as we already
            // ensure that rows above and below the focused/active row are tabbable.
            withLatestFrom(this.editEventDispatcher.editingOrFocused), filter((/**
             * @param {?} __0
             * @return {?}
             */
            ([_, activeRow]) => activeRow == null)), map((/**
             * @return {?}
             */
            () => element.querySelectorAll(ROW_SELECTOR))), share()).subscribe(this.editEventDispatcher.allRows);
            fromEvent(element, 'keydown').pipe(filter((/**
             * @param {?} event
             * @return {?}
             */
            event => event.key === 'Enter')), toClosest(CELL_SELECTOR), takeUntil(this.destroyed)).subscribe(this.editEventDispatcher.editing);
            // Keydown must be used here or else key autorepeat does not work properly on some platforms.
            fromEvent(element, 'keydown')
                .pipe(takeUntil(this.destroyed))
                .subscribe(this.focusDispatcher.keyObserver);
        }));
    }
}
CdkEditable.decorators = [
    { type: Directive, args: [{
                selector: 'table[editable], cdk-table[editable], mat-table[editable]',
                providers: [EditEventDispatcher, EditServices],
            },] },
];
/** @nocollapse */
CdkEditable.ctorParameters = () => [
    { type: ElementRef },
    { type: EditEventDispatcher },
    { type: FocusDispatcher },
    { type: NgZone }
];
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
const POPOVER_EDIT_HOST_BINDINGS = {
    'tabIndex': '0',
    'class': 'cdk-popover-edit-cell',
    '[attr.aria-haspopup]': 'true',
};
/** @type {?} */
const POPOVER_EDIT_INPUTS = [
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
export class CdkPopoverEdit {
    /**
     * @param {?} services
     * @param {?} elementRef
     * @param {?} viewContainerRef
     */
    constructor(services, elementRef, viewContainerRef) {
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
    /**
     * Specifies that the popup should cover additional table cells before and/or after
     * this one.
     * @return {?}
     */
    get colspan() {
        return this._colspan;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set colspan(value) {
        this._colspan = value;
        // Recompute positioning when the colspan changes.
        if (this.overlayRef) {
            this.overlayRef.updatePositionStrategy(this._getPositionStrategy());
            if (this.overlayRef.hasAttached()) {
                this._updateOverlaySize();
            }
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._startListeningToEditEvents();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
        if (this.focusTrap) {
            this.focusTrap.destroy();
            this.focusTrap = undefined;
        }
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
    }
    /**
     * @protected
     * @return {?}
     */
    initFocusTrap() {
        this.focusTrap = this.services.focusTrapFactory.create((/** @type {?} */ (this.overlayRef)).overlayElement);
    }
    /**
     * @protected
     * @return {?}
     */
    closeEditOverlay() {
        this.services.editEventDispatcher.doneEditingCell((/** @type {?} */ (this.elementRef.nativeElement)));
    }
    /**
     * @protected
     * @return {?}
     */
    panelClass() {
        return EDIT_PANE_CLASS;
    }
    /**
     * @private
     * @return {?}
     */
    _startListeningToEditEvents() {
        this.services.editEventDispatcher.editingCell((/** @type {?} */ (this.elementRef.nativeElement)))
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @param {?} open
         * @return {?}
         */
        (open) => {
            if (open && this.template) {
                if (!this.overlayRef) {
                    this._createEditOverlay();
                }
                this._showEditOverlay();
            }
            else if (this.overlayRef) {
                this._maybeReturnFocusToCell();
                this.overlayRef.detach();
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _createEditOverlay() {
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
        () => this.closeEditOverlay()));
    }
    /**
     * @private
     * @return {?}
     */
    _showEditOverlay() {
        (/** @type {?} */ (this.overlayRef)).attach(new TemplatePortal((/** @type {?} */ (this.template)), this.viewContainerRef, { $implicit: this.context }));
        // We have to defer trapping focus, because doing so too early can cause the form inside
        // the overlay to be submitted immediately if it was opened on an Enter keydown event.
        this.services.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            setTimeout((/**
             * @return {?}
             */
            () => {
                (/** @type {?} */ (this.focusTrap)).focusInitialElement();
            }));
        }));
        // Update the size of the popup initially and on subsequent changes to
        // scroll position and viewport size.
        merge(this.services.scrollDispatcher.scrolled(), this.services.viewportRuler.change())
            .pipe(startWith(null), takeUntil((/** @type {?} */ (this.overlayRef)).detachments()), takeUntil(this.destroyed))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this._updateOverlaySize();
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _getOverlayCells() {
        /** @type {?} */
        const cell = (/** @type {?} */ (closest((/** @type {?} */ (this.elementRef.nativeElement)), CELL_SELECTOR)));
        if (!this._colspan.before && !this._colspan.after) {
            return [cell];
        }
        /** @type {?} */
        const row = (/** @type {?} */ (closest((/** @type {?} */ (this.elementRef.nativeElement)), ROW_SELECTOR)));
        /** @type {?} */
        const rowCells = (/** @type {?} */ (Array.from(row.querySelectorAll(CELL_SELECTOR))));
        /** @type {?} */
        const ownIndex = rowCells.indexOf(cell);
        return rowCells.slice(ownIndex - (this._colspan.before || 0), ownIndex + (this._colspan.after || 0) + 1);
    }
    /**
     * @private
     * @return {?}
     */
    _getPositionStrategy() {
        return this.services.positionFactory.positionStrategyForCells(this._getOverlayCells());
    }
    /**
     * @private
     * @return {?}
     */
    _updateOverlaySize() {
        (/** @type {?} */ (this.overlayRef)).updateSize(this.services.positionFactory.sizeConfigForCells(this._getOverlayCells()));
    }
    /**
     * @private
     * @return {?}
     */
    _maybeReturnFocusToCell() {
        if (closest(document.activeElement, EDIT_PANE_SELECTOR) ===
            (/** @type {?} */ (this.overlayRef)).overlayElement) {
            (/** @type {?} */ (this.elementRef.nativeElement)).focus();
        }
    }
}
CdkPopoverEdit.decorators = [
    { type: Directive, args: [{
                selector: '[cdkPopoverEdit]:not([cdkPopoverEditTabOut])',
                host: POPOVER_EDIT_HOST_BINDINGS,
                inputs: POPOVER_EDIT_INPUTS,
            },] },
];
/** @nocollapse */
CdkPopoverEdit.ctorParameters = () => [
    { type: EditServices },
    { type: ElementRef },
    { type: ViewContainerRef }
];
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
export class CdkPopoverEditTabOut extends CdkPopoverEdit {
    /**
     * @param {?} elementRef
     * @param {?} viewContainerRef
     * @param {?} services
     * @param {?} focusEscapeNotifierFactory
     */
    constructor(elementRef, viewContainerRef, services, focusEscapeNotifierFactory) {
        super(services, elementRef, viewContainerRef);
        this.focusEscapeNotifierFactory = focusEscapeNotifierFactory;
    }
    /**
     * @protected
     * @return {?}
     */
    initFocusTrap() {
        this.focusTrap = this.focusEscapeNotifierFactory.create((/** @type {?} */ (this.overlayRef)).overlayElement);
        this.focusTrap.escapes().pipe(takeUntil(this.destroyed)).subscribe((/**
         * @param {?} direction
         * @return {?}
         */
        direction => {
            if (this.services.editEventDispatcher.editRef) {
                this.services.editEventDispatcher.editRef.blur();
            }
            this.services.focusDispatcher.moveFocusHorizontally((/** @type {?} */ (closest((/** @type {?} */ (this.elementRef.nativeElement)), CELL_SELECTOR))), direction === 0 /* START */ ? -1 : 1);
            this.closeEditOverlay();
        }));
    }
}
CdkPopoverEditTabOut.decorators = [
    { type: Directive, args: [{
                selector: '[cdkPopoverEdit][cdkPopoverEditTabOut]',
                host: POPOVER_EDIT_HOST_BINDINGS,
                inputs: POPOVER_EDIT_INPUTS,
            },] },
];
/** @nocollapse */
CdkPopoverEditTabOut.ctorParameters = () => [
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: EditServices },
    { type: FocusEscapeNotifierFactory }
];
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
export class CdkRowHoverContent {
    /**
     * @param {?} services
     * @param {?} elementRef
     * @param {?} templateRef
     * @param {?} viewContainerRef
     */
    constructor(services, elementRef, templateRef, viewContainerRef) {
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
    ngAfterViewInit() {
        this._row = (/** @type {?} */ (closest((/** @type {?} */ (this.elementRef.nativeElement)), ROW_SELECTOR)));
        this.services.editEventDispatcher.registerRowWithHoverContent(this._row);
        this._listenForHoverAndFocusEvents();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
        if (this.viewRef) {
            this.viewRef.destroy();
        }
        if (this._row) {
            this.services.editEventDispatcher.deregisterRowWithHoverContent(this._row);
        }
    }
    /**
     * Called immediately after the hover content is created and added to the dom.
     * In the CDK version, this is a noop but subclasses such as MatRowHoverContent use this
     * to prepare/style the inserted element.
     * @protected
     * @param {?} _
     * @return {?}
     */
    initElement(_) {
    }
    /**
     * Called when the hover content needs to be focusable to preserve a reasonable tab ordering
     * but should not yet be shown.
     * @protected
     * @param {?} element
     * @return {?}
     */
    makeElementHiddenButFocusable(element) {
        element.style.opacity = '0';
    }
    /**
     * Called when the hover content needs to be focusable to preserve a reasonable tab ordering
     * but should not yet be shown.
     * @protected
     * @param {?} element
     * @return {?}
     */
    makeElementVisible(element) {
        element.style.opacity = '';
    }
    /**
     * @private
     * @return {?}
     */
    _listenForHoverAndFocusEvents() {
        this.services.editEventDispatcher.hoverOrFocusOnRow((/** @type {?} */ (this._row)))
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @param {?} eventState
         * @return {?}
         */
        eventState => {
            // When in FOCUSABLE state, add the hover content to the dom but make it transparent so
            // that it is in the tab order relative to the currently focused row.
            if (eventState === 2 /* ON */ || eventState === 1 /* FOCUSABLE */) {
                if (!this.viewRef) {
                    this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef, {});
                    this.initElement((/** @type {?} */ (this.viewRef.rootNodes[0])));
                }
                else if (this.viewContainerRef.indexOf(this.viewRef) === -1) {
                    this.viewContainerRef.insert((/** @type {?} */ (this.viewRef)));
                }
                if (eventState === 2 /* ON */) {
                    this.makeElementVisible((/** @type {?} */ (this.viewRef.rootNodes[0])));
                }
                else {
                    this.makeElementHiddenButFocusable((/** @type {?} */ (this.viewRef.rootNodes[0])));
                }
            }
            else if (this.viewRef) {
                this.viewContainerRef.detach(this.viewContainerRef.indexOf(this.viewRef));
            }
        }));
    }
}
CdkRowHoverContent.decorators = [
    { type: Directive, args: [{
                selector: '[cdkRowHoverContent]',
            },] },
];
/** @nocollapse */
CdkRowHoverContent.ctorParameters = () => [
    { type: EditServices },
    { type: ElementRef },
    { type: TemplateRef },
    { type: ViewContainerRef }
];
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
export class CdkEditOpen {
    /**
     * @param {?} elementRef
     * @param {?} editEventDispatcher
     */
    constructor(elementRef, editEventDispatcher) {
        this.elementRef = elementRef;
        this.editEventDispatcher = editEventDispatcher;
        /** @type {?} */
        const nativeElement = elementRef.nativeElement;
        // Prevent accidental form submits.
        if (nativeElement.nodeName === 'BUTTON' && !nativeElement.getAttribute('type')) {
            nativeElement.setAttribute('type', 'button');
        }
    }
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /**
     * @param {?} evt
     * @return {?}
     */
    openEdit(evt) {
        this.editEventDispatcher.editing.next(closest((/** @type {?} */ (this.elementRef.nativeElement)), CELL_SELECTOR));
        evt.stopPropagation();
    }
}
CdkEditOpen.decorators = [
    { type: Directive, args: [{
                selector: '[cdkEditOpen]',
            },] },
];
/** @nocollapse */
CdkEditOpen.ctorParameters = () => [
    { type: ElementRef },
    { type: EditEventDispatcher }
];
CdkEditOpen.propDecorators = {
    openEdit: [{ type: HostListener, args: ['click', ['$event'],] }]
};
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