/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef, QueryList, OnDestroy, AfterContentInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { RippleGlobalOptions } from '@angular/material/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { _MatTabNavBase, _MatTabLinkBase } from '@angular/material/tabs';
import { Directionality } from '@angular/cdk/bidi';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { Platform } from '@angular/cdk/platform';
import { MatInkBar, MatInkBarItem, MatInkBarFoundation } from '../ink-bar';
/**
 * Navigation component matching the styles of the tab group header.
 * Provides anchored navigation with animated ink bar.
 */
export declare class MatTabNav extends _MatTabNavBase implements AfterContentInit {
    _items: QueryList<MatTabLink>;
    _tabListContainer: ElementRef;
    _tabList: ElementRef;
    _nextPaginator: ElementRef<HTMLElement>;
    _previousPaginator: ElementRef<HTMLElement>;
    _inkBar: MatInkBar;
    constructor(elementRef: ElementRef, dir: Directionality, ngZone: NgZone, changeDetectorRef: ChangeDetectorRef, viewportRuler: ViewportRuler, 
    /**
     * @deprecated @breaking-change 9.0.0 `platform` parameter to become required.
     */
    platform?: Platform, animationMode?: string);
    ngAfterContentInit(): void;
}
/**
 * Link inside of a `mat-tab-nav-bar`.
 */
export declare class MatTabLink extends _MatTabLinkBase implements MatInkBarItem, OnDestroy {
    _foundation: MatInkBarFoundation;
    constructor(tabNavBar: MatTabNav, elementRef: ElementRef, globalRippleOptions: RippleGlobalOptions | null, tabIndex: string, focusMonitor: FocusMonitor, _document: any, animationMode?: string);
    ngOnDestroy(): void;
}
