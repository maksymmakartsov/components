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
import { Injectable, NgZone } from '@angular/core';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay } from '@angular/cdk/overlay';
import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { EditEventDispatcher } from './edit-event-dispatcher';
import { FocusDispatcher } from './focus-dispatcher';
import { PopoverEditPositionStrategyFactory } from './popover-edit-position-strategy-factory';
/**
 * Optimization
 * Collects multiple Injectables into a singleton shared across the table. By reducing the
 * number of services injected into each CdkPopoverEdit, this saves about 0.023ms of cpu time
 * and 56 bytes of memory per instance.
 */
var EditServices = /** @class */ (function () {
    function EditServices(directionality, editEventDispatcher, focusDispatcher, focusTrapFactory, ngZone, overlay, positionFactory, scrollDispatcher, viewportRuler) {
        this.directionality = directionality;
        this.editEventDispatcher = editEventDispatcher;
        this.focusDispatcher = focusDispatcher;
        this.focusTrapFactory = focusTrapFactory;
        this.ngZone = ngZone;
        this.overlay = overlay;
        this.positionFactory = positionFactory;
        this.scrollDispatcher = scrollDispatcher;
        this.viewportRuler = viewportRuler;
    }
    EditServices.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    EditServices.ctorParameters = function () { return [
        { type: Directionality },
        { type: EditEventDispatcher },
        { type: FocusDispatcher },
        { type: FocusTrapFactory },
        { type: NgZone },
        { type: Overlay },
        { type: PopoverEditPositionStrategyFactory },
        { type: ScrollDispatcher },
        { type: ViewportRuler }
    ]; };
    return EditServices;
}());
export { EditServices };
if (false) {
    /** @type {?} */
    EditServices.prototype.directionality;
    /** @type {?} */
    EditServices.prototype.editEventDispatcher;
    /** @type {?} */
    EditServices.prototype.focusDispatcher;
    /** @type {?} */
    EditServices.prototype.focusTrapFactory;
    /** @type {?} */
    EditServices.prototype.ngZone;
    /** @type {?} */
    EditServices.prototype.overlay;
    /** @type {?} */
    EditServices.prototype.positionFactory;
    /** @type {?} */
    EditServices.prototype.scrollDispatcher;
    /** @type {?} */
    EditServices.prototype.viewportRuler;
}
//# sourceMappingURL=edit-services.js.map