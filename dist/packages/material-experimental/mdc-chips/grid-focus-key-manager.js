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
import { GridKeyManager } from './grid-key-manager';
/**
 * A version of GridKeyManager where the cells are HTMLElements, and focus()
 * is called on a cell when it becomes active.
 */
export class GridFocusKeyManager extends GridKeyManager {
    /**
     * @param {?} cell
     * @return {?}
     */
    setActiveCell(cell) {
        super.setActiveCell(cell);
        if (this.activeCell) {
            this.activeCell.focus();
        }
    }
}
//# sourceMappingURL=grid-focus-key-manager.js.map