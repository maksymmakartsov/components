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
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * A service for copying text to the clipboard.
 *
 * Example usage:
 *
 * clipboard.copy("copy this text");
 */
export class Clipboard {
    /**
     * @param {?} document
     */
    constructor(document) {
        this._document = document;
    }
    /**
     * Copies the provided text into the user's clipboard.
     *
     * @param {?} text The string to copy.
     * @return {?} Whether the operation was successful.
     */
    copy(text) {
        /** @type {?} */
        const pendingCopy = this.beginCopy(text);
        /** @type {?} */
        const successful = pendingCopy.copy();
        pendingCopy.destroy();
        return successful;
    }
    /**
     * Prepares a string to be copied later. This is useful for large strings
     * which take too long to successfully render and be copied in the same tick.
     *
     * The caller must call `destroy` on the returned `PendingCopy`.
     *
     * @param {?} text The string to copy.
     * @return {?} the pending copy operation.
     */
    beginCopy(text) {
        return new PendingCopy(text, this._document);
    }
}
Clipboard.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */
Clipboard.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ Clipboard.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function Clipboard_Factory() { return new Clipboard(i0.ɵɵinject(i1.DOCUMENT)); }, token: Clipboard, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    Clipboard.prototype._document;
}
/**
 * A pending copy-to-clipboard operation.
 *
 * The implementation of copying text to the clipboard modifies the DOM and
 * forces a relayout. This relayout can take too long if the string is large,
 * causing the execCommand('copy') to happen too long after the user clicked.
 * This results in the browser refusing to copy. This object lets the
 * relayout happen in a separate tick from copying by providing a copy function
 * that can be called later.
 *
 * Destroy must be called when no longer in use, regardless of whether `copy` is
 * called.
 */
export class PendingCopy {
    /**
     * @param {?} text
     * @param {?} _document
     */
    constructor(text, _document) {
        this._document = _document;
        /** @type {?} */
        const textarea = this._textarea = this._document.createElement('textarea');
        /** @type {?} */
        const styles = textarea.style;
        // Hide the element for display and accessibility. Set an
        // absolute position so the page layout isn't affected.
        styles.opacity = '0';
        styles.position = 'absolute';
        styles.left = styles.top = '-999em';
        textarea.setAttribute('aria-hidden', 'true');
        textarea.value = text;
        this._document.body.appendChild(textarea);
    }
    /**
     * Finishes copying the text.
     * @return {?}
     */
    copy() {
        /** @type {?} */
        const textarea = this._textarea;
        /** @type {?} */
        let successful = false;
        try { // Older browsers could throw if copy is not supported.
            if (textarea) {
                /** @type {?} */
                const currentFocus = this._document.activeElement;
                textarea.select();
                textarea.setSelectionRange(0, textarea.value.length);
                successful = this._document.execCommand('copy');
                if (currentFocus && currentFocus instanceof HTMLElement) {
                    currentFocus.focus();
                }
            }
        }
        catch (_a) {
            // Discard error.
            // Initial setting of {@code successful} will represent failure here.
        }
        return successful;
    }
    /**
     * Cleans up DOM changes used to perform the copy operation.
     * @return {?}
     */
    destroy() {
        /** @type {?} */
        const textarea = this._textarea;
        if (textarea) {
            if (textarea.parentNode) {
                textarea.parentNode.removeChild(textarea);
            }
            this._textarea = undefined;
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    PendingCopy.prototype._textarea;
    /**
     * @type {?}
     * @private
     */
    PendingCopy.prototype._document;
}
//# sourceMappingURL=clipboard.js.map