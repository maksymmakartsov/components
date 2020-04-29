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
import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Clipboard } from './clipboard';
/**
 * Provides behavior for a button that when clicked copies content into user's
 * clipboard.
 *
 * Example usage:
 *
 * `<button copyToClipboard="Content to be copied">Copy me!</button>`
 */
var CdkCopyToClipboard = /** @class */ (function () {
    function CdkCopyToClipboard(clipboard) {
        this.clipboard = clipboard;
        /**
         * Content to be copied.
         */
        this.text = '';
        this.copied = new EventEmitter();
    }
    /**
     * @return {?}
     */
    CdkCopyToClipboard.prototype.doCopy = /**
     * @return {?}
     */
    function () {
        this.copied.emit(this.clipboard.copy(this.text));
    };
    CdkCopyToClipboard.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkCopyToClipboard]',
                    host: {
                        '(click)': 'doCopy()',
                    }
                },] },
    ];
    /** @nocollapse */
    CdkCopyToClipboard.ctorParameters = function () { return [
        { type: Clipboard }
    ]; };
    CdkCopyToClipboard.propDecorators = {
        text: [{ type: Input, args: ['cdkCopyToClipboard',] }],
        copied: [{ type: Output }]
    };
    return CdkCopyToClipboard;
}());
export { CdkCopyToClipboard };
if (false) {
    /**
     * Content to be copied.
     * @type {?}
     */
    CdkCopyToClipboard.prototype.text;
    /** @type {?} */
    CdkCopyToClipboard.prototype.copied;
    /**
     * @type {?}
     * @private
     */
    CdkCopyToClipboard.prototype.clipboard;
}
//# sourceMappingURL=copy-to-clipboard.js.map