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
import { GridKeyManager } from './grid-key-manager';
/**
 * A version of GridKeyManager where the cells are HTMLElements, and focus()
 * is called on a cell when it becomes active.
 */
var /**
 * A version of GridKeyManager where the cells are HTMLElements, and focus()
 * is called on a cell when it becomes active.
 */
GridFocusKeyManager = /** @class */ (function (_super) {
    tslib_1.__extends(GridFocusKeyManager, _super);
    function GridFocusKeyManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} cell
     * @return {?}
     */
    GridFocusKeyManager.prototype.setActiveCell = /**
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        _super.prototype.setActiveCell.call(this, cell);
        if (this.activeCell) {
            this.activeCell.focus();
        }
    };
    return GridFocusKeyManager;
}(GridKeyManager));
/**
 * A version of GridKeyManager where the cells are HTMLElements, and focus()
 * is called on a cell when it becomes active.
 */
export { GridFocusKeyManager };
//# sourceMappingURL=grid-focus-key-manager.js.map