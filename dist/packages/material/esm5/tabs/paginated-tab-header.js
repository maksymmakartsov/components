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
import { ChangeDetectorRef, ElementRef, NgZone, Optional, EventEmitter, Directive, Inject, } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { END, ENTER, HOME, SPACE, hasModifierKey } from '@angular/cdk/keycodes';
import { merge, of as observableOf, Subject, timer, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Platform, normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
/**
 * Config used to bind passive event listeners
 * @type {?}
 */
var passiveEventListenerOptions = (/** @type {?} */ (normalizePassiveListenerOptions({ passive: true })));
/**
 * The distance in pixels that will be overshot when scrolling a tab label into view. This helps
 * provide a small affordance to the label next to it.
 * @type {?}
 */
var EXAGGERATED_OVERSCROLL = 60;
/**
 * Amount of milliseconds to wait before starting to scroll the header automatically.
 * Set a little conservatively in order to handle fake events dispatched on touch devices.
 * @type {?}
 */
var HEADER_SCROLL_DELAY = 650;
/**
 * Interval in milliseconds at which to scroll the header
 * while the user is holding their pointer.
 * @type {?}
 */
var HEADER_SCROLL_INTERVAL = 100;
/**
 * Base class for a tab header that supported pagination.
 * \@docs-private
 * @abstract
 */
var MatPaginatedTabHeader = /** @class */ (function () {
    function MatPaginatedTabHeader(_elementRef, _changeDetectorRef, _viewportRuler, _dir, _ngZone, _platform, _animationMode) {
        var _this = this;
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._viewportRuler = _viewportRuler;
        this._dir = _dir;
        this._ngZone = _ngZone;
        this._platform = _platform;
        this._animationMode = _animationMode;
        /**
         * The distance in pixels that the tab labels should be translated to the left.
         */
        this._scrollDistance = 0;
        /**
         * Whether the header should scroll to the selected index after the view has been checked.
         */
        this._selectedIndexChanged = false;
        /**
         * Emits when the component is destroyed.
         */
        this._destroyed = new Subject();
        /**
         * Whether the controls for pagination should be displayed
         */
        this._showPaginationControls = false;
        /**
         * Whether the tab list can be scrolled more towards the end of the tab label list.
         */
        this._disableScrollAfter = true;
        /**
         * Whether the tab list can be scrolled more towards the beginning of the tab label list.
         */
        this._disableScrollBefore = true;
        /**
         * Stream that will stop the automated scrolling.
         */
        this._stopScrolling = new Subject();
        this._selectedIndex = 0;
        /**
         * Event emitted when the option is selected.
         */
        this.selectFocusedIndex = new EventEmitter();
        /**
         * Event emitted when a label is focused.
         */
        this.indexFocused = new EventEmitter();
        // Bind the `mouseleave` event on the outside since it doesn't change anything in the view.
        _ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            fromEvent(_elementRef.nativeElement, 'mouseleave')
                .pipe(takeUntil(_this._destroyed))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this._stopInterval();
            }));
        }));
    }
    Object.defineProperty(MatPaginatedTabHeader.prototype, "selectedIndex", {
        /** The index of the active tab. */
        get: /**
         * The index of the active tab.
         * @return {?}
         */
        function () { return this._selectedIndex; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = coerceNumberProperty(value);
            if (this._selectedIndex != value) {
                this._selectedIndexChanged = true;
                this._selectedIndex = value;
                if (this._keyManager) {
                    this._keyManager.updateActiveItemIndex(value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatPaginatedTabHeader.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // We need to handle these events manually, because we want to bind passive event listeners.
        fromEvent(this._previousPaginator.nativeElement, 'touchstart', passiveEventListenerOptions)
            .pipe(takeUntil(this._destroyed))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this._handlePaginatorPress('before');
        }));
        fromEvent(this._nextPaginator.nativeElement, 'touchstart', passiveEventListenerOptions)
            .pipe(takeUntil(this._destroyed))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this._handlePaginatorPress('after');
        }));
    };
    /**
     * @return {?}
     */
    MatPaginatedTabHeader.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var dirChange = this._dir ? this._dir.change : observableOf(null);
        /** @type {?} */
        var resize = this._viewportRuler.change(150);
        /** @type {?} */
        var realign = (/**
         * @return {?}
         */
        function () {
            _this.updatePagination();
            _this._alignInkBarToSelectedTab();
        });
        this._keyManager = new FocusKeyManager(this._items)
            .withHorizontalOrientation(this._getLayoutDirection())
            .withWrap();
        this._keyManager.updateActiveItem(0);
        // Defer the first call in order to allow for slower browsers to lay out the elements.
        // This helps in cases where the user lands directly on a page with paginated tabs.
        typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame(realign) : realign();
        // On dir change or window resize, realign the ink bar and update the orientation of
        // the key manager if the direction has changed.
        merge(dirChange, resize, this._items.changes).pipe(takeUntil(this._destroyed)).subscribe((/**
         * @return {?}
         */
        function () {
            realign();
            _this._keyManager.withHorizontalOrientation(_this._getLayoutDirection());
        }));
        // If there is a change in the focus key manager we need to emit the `indexFocused`
        // event in order to provide a public event that notifies about focus changes. Also we realign
        // the tabs container by scrolling the new focused tab into the visible section.
        this._keyManager.change.pipe(takeUntil(this._destroyed)).subscribe((/**
         * @param {?} newFocusIndex
         * @return {?}
         */
        function (newFocusIndex) {
            _this.indexFocused.emit(newFocusIndex);
            _this._setTabFocus(newFocusIndex);
        }));
    };
    /**
     * @return {?}
     */
    MatPaginatedTabHeader.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        // If the number of tab labels have changed, check if scrolling should be enabled
        if (this._tabLabelCount != this._items.length) {
            this.updatePagination();
            this._tabLabelCount = this._items.length;
            this._changeDetectorRef.markForCheck();
        }
        // If the selected index has changed, scroll to the label and check if the scrolling controls
        // should be disabled.
        if (this._selectedIndexChanged) {
            this._scrollToLabel(this._selectedIndex);
            this._checkScrollingControls();
            this._alignInkBarToSelectedTab();
            this._selectedIndexChanged = false;
            this._changeDetectorRef.markForCheck();
        }
        // If the scroll distance has been changed (tab selected, focused, scroll controls activated),
        // then translate the header to reflect this.
        if (this._scrollDistanceChanged) {
            this._updateTabScrollPosition();
            this._scrollDistanceChanged = false;
            this._changeDetectorRef.markForCheck();
        }
    };
    /**
     * @return {?}
     */
    MatPaginatedTabHeader.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._destroyed.next();
        this._destroyed.complete();
        this._stopScrolling.complete();
    };
    /** Handles keyboard events on the header. */
    /**
     * Handles keyboard events on the header.
     * @param {?} event
     * @return {?}
     */
    MatPaginatedTabHeader.prototype._handleKeydown = /**
     * Handles keyboard events on the header.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // We don't handle any key bindings with a modifier key.
        if (hasModifierKey(event)) {
            return;
        }
        switch (event.keyCode) {
            case HOME:
                this._keyManager.setFirstItemActive();
                event.preventDefault();
                break;
            case END:
                this._keyManager.setLastItemActive();
                event.preventDefault();
                break;
            case ENTER:
            case SPACE:
                this.selectFocusedIndex.emit(this.focusIndex);
                this._itemSelected(event);
                break;
            default:
                this._keyManager.onKeydown(event);
        }
    };
    /**
     * Callback for when the MutationObserver detects that the content has changed.
     */
    /**
     * Callback for when the MutationObserver detects that the content has changed.
     * @return {?}
     */
    MatPaginatedTabHeader.prototype._onContentChanges = /**
     * Callback for when the MutationObserver detects that the content has changed.
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var textContent = this._elementRef.nativeElement.textContent;
        // We need to diff the text content of the header, because the MutationObserver callback
        // will fire even if the text content didn't change which is inefficient and is prone
        // to infinite loops if a poorly constructed expression is passed in (see #14249).
        if (textContent !== this._currentTextContent) {
            this._currentTextContent = textContent || '';
            // The content observer runs outside the `NgZone` by default, which
            // means that we need to bring the callback back in ourselves.
            this._ngZone.run((/**
             * @return {?}
             */
            function () {
                _this.updatePagination();
                _this._alignInkBarToSelectedTab();
                _this._changeDetectorRef.markForCheck();
            }));
        }
    };
    /**
     * Updates the view whether pagination should be enabled or not.
     *
     * WARNING: Calling this method can be very costly in terms of performance. It should be called
     * as infrequently as possible from outside of the Tabs component as it causes a reflow of the
     * page.
     */
    /**
     * Updates the view whether pagination should be enabled or not.
     *
     * WARNING: Calling this method can be very costly in terms of performance. It should be called
     * as infrequently as possible from outside of the Tabs component as it causes a reflow of the
     * page.
     * @return {?}
     */
    MatPaginatedTabHeader.prototype.updatePagination = /**
     * Updates the view whether pagination should be enabled or not.
     *
     * WARNING: Calling this method can be very costly in terms of performance. It should be called
     * as infrequently as possible from outside of the Tabs component as it causes a reflow of the
     * page.
     * @return {?}
     */
    function () {
        this._checkPaginationEnabled();
        this._checkScrollingControls();
        this._updateTabScrollPosition();
    };
    Object.defineProperty(MatPaginatedTabHeader.prototype, "focusIndex", {
        /** Tracks which element has focus; used for keyboard navigation */
        get: /**
         * Tracks which element has focus; used for keyboard navigation
         * @return {?}
         */
        function () {
            return this._keyManager ? (/** @type {?} */ (this._keyManager.activeItemIndex)) : 0;
        },
        /** When the focus index is set, we must manually send focus to the correct label */
        set: /**
         * When the focus index is set, we must manually send focus to the correct label
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!this._isValidIndex(value) || this.focusIndex === value || !this._keyManager) {
                return;
            }
            this._keyManager.setActiveItem(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
     * providing a valid index and return true.
     */
    /**
     * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
     * providing a valid index and return true.
     * @param {?} index
     * @return {?}
     */
    MatPaginatedTabHeader.prototype._isValidIndex = /**
     * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
     * providing a valid index and return true.
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (!this._items) {
            return true;
        }
        /** @type {?} */
        var tab = this._items ? this._items.toArray()[index] : null;
        return !!tab && !tab.disabled;
    };
    /**
     * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
     * scrolling is enabled.
     */
    /**
     * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
     * scrolling is enabled.
     * @param {?} tabIndex
     * @return {?}
     */
    MatPaginatedTabHeader.prototype._setTabFocus = /**
     * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
     * scrolling is enabled.
     * @param {?} tabIndex
     * @return {?}
     */
    function (tabIndex) {
        if (this._showPaginationControls) {
            this._scrollToLabel(tabIndex);
        }
        if (this._items && this._items.length) {
            this._items.toArray()[tabIndex].focus();
            // Do not let the browser manage scrolling to focus the element, this will be handled
            // by using translation. In LTR, the scroll left should be 0. In RTL, the scroll width
            // should be the full width minus the offset width.
            /** @type {?} */
            var containerEl = this._tabListContainer.nativeElement;
            /** @type {?} */
            var dir = this._getLayoutDirection();
            if (dir == 'ltr') {
                containerEl.scrollLeft = 0;
            }
            else {
                containerEl.scrollLeft = containerEl.scrollWidth - containerEl.offsetWidth;
            }
        }
    };
    /** The layout direction of the containing app. */
    /**
     * The layout direction of the containing app.
     * @return {?}
     */
    MatPaginatedTabHeader.prototype._getLayoutDirection = /**
     * The layout direction of the containing app.
     * @return {?}
     */
    function () {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    };
    /** Performs the CSS transformation on the tab list that will cause the list to scroll. */
    /**
     * Performs the CSS transformation on the tab list that will cause the list to scroll.
     * @return {?}
     */
    MatPaginatedTabHeader.prototype._updateTabScrollPosition = /**
     * Performs the CSS transformation on the tab list that will cause the list to scroll.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var scrollDistance = this.scrollDistance;
        /** @type {?} */
        var platform = this._platform;
        /** @type {?} */
        var translateX = this._getLayoutDirection() === 'ltr' ? -scrollDistance : scrollDistance;
        // Don't use `translate3d` here because we don't want to create a new layer. A new layer
        // seems to cause flickering and overflow in Internet Explorer. For example, the ink bar
        // and ripples will exceed the boundaries of the visible tab bar.
        // See: https://github.com/angular/components/issues/10276
        // We round the `transform` here, because transforms with sub-pixel precision cause some
        // browsers to blur the content of the element.
        this._tabList.nativeElement.style.transform = "translateX(" + Math.round(translateX) + "px)";
        // Setting the `transform` on IE will change the scroll offset of the parent, causing the
        // position to be thrown off in some cases. We have to reset it ourselves to ensure that
        // it doesn't get thrown off. Note that we scope it only to IE and Edge, because messing
        // with the scroll position throws off Chrome 71+ in RTL mode (see #14689).
        // @breaking-change 9.0.0 Remove null check for `platform` after it can no longer be undefined.
        if (platform && (platform.TRIDENT || platform.EDGE)) {
            this._tabListContainer.nativeElement.scrollLeft = 0;
        }
    };
    Object.defineProperty(MatPaginatedTabHeader.prototype, "scrollDistance", {
        /** Sets the distance in pixels that the tab header should be transformed in the X-axis. */
        get: /**
         * Sets the distance in pixels that the tab header should be transformed in the X-axis.
         * @return {?}
         */
        function () { return this._scrollDistance; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._scrollTo(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
     * the end of the list, respectively). The distance to scroll is computed to be a third of the
     * length of the tab list view window.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    /**
     * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
     * the end of the list, respectively). The distance to scroll is computed to be a third of the
     * length of the tab list view window.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @param {?} direction
     * @return {?}
     */
    MatPaginatedTabHeader.prototype._scrollHeader = /**
     * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
     * the end of the list, respectively). The distance to scroll is computed to be a third of the
     * length of the tab list view window.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @param {?} direction
     * @return {?}
     */
    function (direction) {
        /** @type {?} */
        var viewLength = this._tabListContainer.nativeElement.offsetWidth;
        // Move the scroll distance one-third the length of the tab list's viewport.
        /** @type {?} */
        var scrollAmount = (direction == 'before' ? -1 : 1) * viewLength / 3;
        return this._scrollTo(this._scrollDistance + scrollAmount);
    };
    /** Handles click events on the pagination arrows. */
    /**
     * Handles click events on the pagination arrows.
     * @param {?} direction
     * @return {?}
     */
    MatPaginatedTabHeader.prototype._handlePaginatorClick = /**
     * Handles click events on the pagination arrows.
     * @param {?} direction
     * @return {?}
     */
    function (direction) {
        this._stopInterval();
        this._scrollHeader(direction);
    };
    /**
     * Moves the tab list such that the desired tab label (marked by index) is moved into view.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    /**
     * Moves the tab list such that the desired tab label (marked by index) is moved into view.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @param {?} labelIndex
     * @return {?}
     */
    MatPaginatedTabHeader.prototype._scrollToLabel = /**
     * Moves the tab list such that the desired tab label (marked by index) is moved into view.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @param {?} labelIndex
     * @return {?}
     */
    function (labelIndex) {
        /** @type {?} */
        var selectedLabel = this._items ? this._items.toArray()[labelIndex] : null;
        if (!selectedLabel) {
            return;
        }
        // The view length is the visible width of the tab labels.
        /** @type {?} */
        var viewLength = this._tabListContainer.nativeElement.offsetWidth;
        var _a = selectedLabel.elementRef.nativeElement, offsetLeft = _a.offsetLeft, offsetWidth = _a.offsetWidth;
        /** @type {?} */
        var labelBeforePos;
        /** @type {?} */
        var labelAfterPos;
        if (this._getLayoutDirection() == 'ltr') {
            labelBeforePos = offsetLeft;
            labelAfterPos = labelBeforePos + offsetWidth;
        }
        else {
            labelAfterPos = this._tabList.nativeElement.offsetWidth - offsetLeft;
            labelBeforePos = labelAfterPos - offsetWidth;
        }
        /** @type {?} */
        var beforeVisiblePos = this.scrollDistance;
        /** @type {?} */
        var afterVisiblePos = this.scrollDistance + viewLength;
        if (labelBeforePos < beforeVisiblePos) {
            // Scroll header to move label to the before direction
            this.scrollDistance -= beforeVisiblePos - labelBeforePos + EXAGGERATED_OVERSCROLL;
        }
        else if (labelAfterPos > afterVisiblePos) {
            // Scroll header to move label to the after direction
            this.scrollDistance += labelAfterPos - afterVisiblePos + EXAGGERATED_OVERSCROLL;
        }
    };
    /**
     * Evaluate whether the pagination controls should be displayed. If the scroll width of the
     * tab list is wider than the size of the header container, then the pagination controls should
     * be shown.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    /**
     * Evaluate whether the pagination controls should be displayed. If the scroll width of the
     * tab list is wider than the size of the header container, then the pagination controls should
     * be shown.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    MatPaginatedTabHeader.prototype._checkPaginationEnabled = /**
     * Evaluate whether the pagination controls should be displayed. If the scroll width of the
     * tab list is wider than the size of the header container, then the pagination controls should
     * be shown.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var isEnabled = this._tabList.nativeElement.scrollWidth > this._elementRef.nativeElement.offsetWidth;
        if (!isEnabled) {
            this.scrollDistance = 0;
        }
        if (isEnabled !== this._showPaginationControls) {
            this._changeDetectorRef.markForCheck();
        }
        this._showPaginationControls = isEnabled;
    };
    /**
     * Evaluate whether the before and after controls should be enabled or disabled.
     * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
     * before button. If the header is at the end of the list (scroll distance is equal to the
     * maximum distance we can scroll), then disable the after button.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    /**
     * Evaluate whether the before and after controls should be enabled or disabled.
     * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
     * before button. If the header is at the end of the list (scroll distance is equal to the
     * maximum distance we can scroll), then disable the after button.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    MatPaginatedTabHeader.prototype._checkScrollingControls = /**
     * Evaluate whether the before and after controls should be enabled or disabled.
     * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
     * before button. If the header is at the end of the list (scroll distance is equal to the
     * maximum distance we can scroll), then disable the after button.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    function () {
        // Check if the pagination arrows should be activated.
        this._disableScrollBefore = this.scrollDistance == 0;
        this._disableScrollAfter = this.scrollDistance == this._getMaxScrollDistance();
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Determines what is the maximum length in pixels that can be set for the scroll distance. This
     * is equal to the difference in width between the tab list container and tab header container.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     */
    /**
     * Determines what is the maximum length in pixels that can be set for the scroll distance. This
     * is equal to the difference in width between the tab list container and tab header container.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    MatPaginatedTabHeader.prototype._getMaxScrollDistance = /**
     * Determines what is the maximum length in pixels that can be set for the scroll distance. This
     * is equal to the difference in width between the tab list container and tab header container.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var lengthOfTabList = this._tabList.nativeElement.scrollWidth;
        /** @type {?} */
        var viewLength = this._tabListContainer.nativeElement.offsetWidth;
        return (lengthOfTabList - viewLength) || 0;
    };
    /** Tells the ink-bar to align itself to the current label wrapper */
    /**
     * Tells the ink-bar to align itself to the current label wrapper
     * @return {?}
     */
    MatPaginatedTabHeader.prototype._alignInkBarToSelectedTab = /**
     * Tells the ink-bar to align itself to the current label wrapper
     * @return {?}
     */
    function () {
        /** @type {?} */
        var selectedItem = this._items && this._items.length ?
            this._items.toArray()[this.selectedIndex] : null;
        /** @type {?} */
        var selectedLabelWrapper = selectedItem ? selectedItem.elementRef.nativeElement : null;
        if (selectedLabelWrapper) {
            this._inkBar.alignToElement(selectedLabelWrapper);
        }
        else {
            this._inkBar.hide();
        }
    };
    /** Stops the currently-running paginator interval.  */
    /**
     * Stops the currently-running paginator interval.
     * @return {?}
     */
    MatPaginatedTabHeader.prototype._stopInterval = /**
     * Stops the currently-running paginator interval.
     * @return {?}
     */
    function () {
        this._stopScrolling.next();
    };
    /**
     * Handles the user pressing down on one of the paginators.
     * Starts scrolling the header after a certain amount of time.
     * @param direction In which direction the paginator should be scrolled.
     */
    /**
     * Handles the user pressing down on one of the paginators.
     * Starts scrolling the header after a certain amount of time.
     * @param {?} direction In which direction the paginator should be scrolled.
     * @return {?}
     */
    MatPaginatedTabHeader.prototype._handlePaginatorPress = /**
     * Handles the user pressing down on one of the paginators.
     * Starts scrolling the header after a certain amount of time.
     * @param {?} direction In which direction the paginator should be scrolled.
     * @return {?}
     */
    function (direction) {
        var _this = this;
        // Avoid overlapping timers.
        this._stopInterval();
        // Start a timer after the delay and keep firing based on the interval.
        timer(HEADER_SCROLL_DELAY, HEADER_SCROLL_INTERVAL)
            // Keep the timer going until something tells it to stop or the component is destroyed.
            .pipe(takeUntil(merge(this._stopScrolling, this._destroyed)))
            .subscribe((/**
         * @return {?}
         */
        function () {
            var _a = _this._scrollHeader(direction), maxScrollDistance = _a.maxScrollDistance, distance = _a.distance;
            // Stop the timer if we've reached the start or the end.
            if (distance === 0 || distance >= maxScrollDistance) {
                _this._stopInterval();
            }
        }));
    };
    /**
     * Scrolls the header to a given position.
     * @param position Position to which to scroll.
     * @returns Information on the current scroll distance and the maximum.
     */
    /**
     * Scrolls the header to a given position.
     * @private
     * @param {?} position Position to which to scroll.
     * @return {?} Information on the current scroll distance and the maximum.
     */
    MatPaginatedTabHeader.prototype._scrollTo = /**
     * Scrolls the header to a given position.
     * @private
     * @param {?} position Position to which to scroll.
     * @return {?} Information on the current scroll distance and the maximum.
     */
    function (position) {
        /** @type {?} */
        var maxScrollDistance = this._getMaxScrollDistance();
        this._scrollDistance = Math.max(0, Math.min(maxScrollDistance, position));
        // Mark that the scroll distance has changed so that after the view is checked, the CSS
        // transformation can move the header.
        this._scrollDistanceChanged = true;
        this._checkScrollingControls();
        return { maxScrollDistance: maxScrollDistance, distance: this._scrollDistance };
    };
    MatPaginatedTabHeader.decorators = [
        { type: Directive, args: [{
                    // TODO(crisbeto): this selector can be removed when we update to Angular 9.0.
                    selector: 'do-not-use-abstract-mat-paginated-tab-header'
                },] },
    ];
    /** @nocollapse */
    MatPaginatedTabHeader.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: ViewportRuler },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: NgZone },
        { type: Platform },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
    ]; };
    return MatPaginatedTabHeader;
}());
export { MatPaginatedTabHeader };
if (false) {
    /** @type {?} */
    MatPaginatedTabHeader.prototype._items;
    /** @type {?} */
    MatPaginatedTabHeader.prototype._inkBar;
    /** @type {?} */
    MatPaginatedTabHeader.prototype._tabListContainer;
    /** @type {?} */
    MatPaginatedTabHeader.prototype._tabList;
    /** @type {?} */
    MatPaginatedTabHeader.prototype._nextPaginator;
    /** @type {?} */
    MatPaginatedTabHeader.prototype._previousPaginator;
    /**
     * The distance in pixels that the tab labels should be translated to the left.
     * @type {?}
     * @private
     */
    MatPaginatedTabHeader.prototype._scrollDistance;
    /**
     * Whether the header should scroll to the selected index after the view has been checked.
     * @type {?}
     * @private
     */
    MatPaginatedTabHeader.prototype._selectedIndexChanged;
    /**
     * Emits when the component is destroyed.
     * @type {?}
     * @protected
     */
    MatPaginatedTabHeader.prototype._destroyed;
    /**
     * Whether the controls for pagination should be displayed
     * @type {?}
     */
    MatPaginatedTabHeader.prototype._showPaginationControls;
    /**
     * Whether the tab list can be scrolled more towards the end of the tab label list.
     * @type {?}
     */
    MatPaginatedTabHeader.prototype._disableScrollAfter;
    /**
     * Whether the tab list can be scrolled more towards the beginning of the tab label list.
     * @type {?}
     */
    MatPaginatedTabHeader.prototype._disableScrollBefore;
    /**
     * The number of tab labels that are displayed on the header. When this changes, the header
     * should re-evaluate the scroll position.
     * @type {?}
     * @private
     */
    MatPaginatedTabHeader.prototype._tabLabelCount;
    /**
     * Whether the scroll distance has changed and should be applied after the view is checked.
     * @type {?}
     * @private
     */
    MatPaginatedTabHeader.prototype._scrollDistanceChanged;
    /**
     * Used to manage focus between the tabs.
     * @type {?}
     * @private
     */
    MatPaginatedTabHeader.prototype._keyManager;
    /**
     * Cached text content of the header.
     * @type {?}
     * @private
     */
    MatPaginatedTabHeader.prototype._currentTextContent;
    /**
     * Stream that will stop the automated scrolling.
     * @type {?}
     * @private
     */
    MatPaginatedTabHeader.prototype._stopScrolling;
    /**
     * @type {?}
     * @private
     */
    MatPaginatedTabHeader.prototype._selectedIndex;
    /**
     * Event emitted when the option is selected.
     * @type {?}
     */
    MatPaginatedTabHeader.prototype.selectFocusedIndex;
    /**
     * Event emitted when a label is focused.
     * @type {?}
     */
    MatPaginatedTabHeader.prototype.indexFocused;
    /**
     * @type {?}
     * @protected
     */
    MatPaginatedTabHeader.prototype._elementRef;
    /**
     * @type {?}
     * @protected
     */
    MatPaginatedTabHeader.prototype._changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    MatPaginatedTabHeader.prototype._viewportRuler;
    /**
     * @type {?}
     * @private
     */
    MatPaginatedTabHeader.prototype._dir;
    /**
     * @type {?}
     * @private
     */
    MatPaginatedTabHeader.prototype._ngZone;
    /**
     * @deprecated \@breaking-change 9.0.0 `_platform` and `_animationMode`
     * parameters to become required.
     * @type {?}
     * @private
     */
    MatPaginatedTabHeader.prototype._platform;
    /** @type {?} */
    MatPaginatedTabHeader.prototype._animationMode;
    /**
     * Called when the user has selected an item via the keyboard.
     * @abstract
     * @protected
     * @param {?} event
     * @return {?}
     */
    MatPaginatedTabHeader.prototype._itemSelected = function (event) { };
}
//# sourceMappingURL=paginated-tab-header.js.map