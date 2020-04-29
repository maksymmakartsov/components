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
import { ChangeDetectionStrategy, Component, ViewEncapsulation, TemplateRef, ContentChild, } from '@angular/core';
import { MatTab as BaseMatTab } from '@angular/material/tabs';
import { MatTabContent } from './tab-content';
import { MatTabLabel } from './tab-label';
export class MatTab extends BaseMatTab {
}
MatTab.decorators = [
    { type: Component, args: [{selector: 'mat-tab',
                // Note that usually we'd go through a bit more trouble and set up another class so that
                // the inlined template of `MatTab` isn't duplicated, however the template is small enough
                // that creating the extra class will generate more code than just duplicating the template.
                template: "<ng-template><ng-content></ng-content></ng-template>",
                inputs: ['disabled'],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                exportAs: 'matTab',
            },] },
];
MatTab.propDecorators = {
    _explicitContent: [{ type: ContentChild, args: [MatTabContent, { read: TemplateRef, static: true },] }],
    templateLabel: [{ type: ContentChild, args: [MatTabLabel, { static: false },] }]
};
if (false) {
    /**
     * Template provided in the tab content that will be used if present, used to enable lazy-loading
     * @type {?}
     */
    MatTab.prototype._explicitContent;
    /**
     * Content for the tab label given by `<ng-template mat-tab-label>`.
     * @type {?}
     */
    MatTab.prototype.templateLabel;
}
//# sourceMappingURL=tab.js.map