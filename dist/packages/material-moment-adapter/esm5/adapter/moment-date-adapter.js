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
import { Inject, Injectable, Optional, InjectionToken } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
// TODO(mmalerba): See if we can clean this up at some point.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
/** @type {?} */
var moment = _rollupMoment || _moment;
/**
 * Configurable options for {\@see MomentDateAdapter}.
 * @record
 */
export function MatMomentDateAdapterOptions() { }
if (false) {
    /**
     * When enabled, the dates have to match the format exactly.
     * See https://momentjs.com/guides/#/parsing/strict-mode/.
     * @type {?|undefined}
     */
    MatMomentDateAdapterOptions.prototype.strict;
    /**
     * Turns the use of utc dates on or off.
     * Changing this will change how Angular Material components like DatePicker output dates.
     * {\@default false}
     * @type {?|undefined}
     */
    MatMomentDateAdapterOptions.prototype.useUtc;
}
/**
 * InjectionToken for moment date adapter to configure options.
 * @type {?}
 */
export var MAT_MOMENT_DATE_ADAPTER_OPTIONS = new InjectionToken('MAT_MOMENT_DATE_ADAPTER_OPTIONS', {
    providedIn: 'root',
    factory: MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY
});
/**
 * \@docs-private
 * @return {?}
 */
export function MAT_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY() {
    return {
        useUtc: false
    };
}
/**
 * Creates an array and fills it with values.
 * @template T
 * @param {?} length
 * @param {?} valueFunction
 * @return {?}
 */
function range(length, valueFunction) {
    /** @type {?} */
    var valuesArray = Array(length);
    for (var i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
/**
 * Adapts Moment.js Dates for use with Angular Material.
 */
var MomentDateAdapter = /** @class */ (function (_super) {
    tslib_1.__extends(MomentDateAdapter, _super);
    function MomentDateAdapter(dateLocale, _options) {
        var _this = _super.call(this) || this;
        _this._options = _options;
        _this.setLocale(dateLocale || moment.locale());
        return _this;
    }
    /**
     * @param {?} locale
     * @return {?}
     */
    MomentDateAdapter.prototype.setLocale = /**
     * @param {?} locale
     * @return {?}
     */
    function (locale) {
        var _this = this;
        _super.prototype.setLocale.call(this, locale);
        /** @type {?} */
        var momentLocaleData = moment.localeData(locale);
        this._localeData = {
            firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
            longMonths: momentLocaleData.months(),
            shortMonths: momentLocaleData.monthsShort(),
            dates: range(31, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return _this.createDate(2017, 0, i + 1).format('D'); })),
            longDaysOfWeek: momentLocaleData.weekdays(),
            shortDaysOfWeek: momentLocaleData.weekdaysShort(),
            narrowDaysOfWeek: momentLocaleData.weekdaysMin(),
        };
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getYear = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).year();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).month();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).date();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getDayOfWeek = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).day();
    };
    /**
     * @param {?} style
     * @return {?}
     */
    MomentDateAdapter.prototype.getMonthNames = /**
     * @param {?} style
     * @return {?}
     */
    function (style) {
        // Moment.js doesn't support narrow month names, so we just use short if narrow is requested.
        return style == 'long' ? this._localeData.longMonths : this._localeData.shortMonths;
    };
    /**
     * @return {?}
     */
    MomentDateAdapter.prototype.getDateNames = /**
     * @return {?}
     */
    function () {
        return this._localeData.dates;
    };
    /**
     * @param {?} style
     * @return {?}
     */
    MomentDateAdapter.prototype.getDayOfWeekNames = /**
     * @param {?} style
     * @return {?}
     */
    function (style) {
        if (style == 'long') {
            return this._localeData.longDaysOfWeek;
        }
        if (style == 'short') {
            return this._localeData.shortDaysOfWeek;
        }
        return this._localeData.narrowDaysOfWeek;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getYearName = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).format('YYYY');
    };
    /**
     * @return {?}
     */
    MomentDateAdapter.prototype.getFirstDayOfWeek = /**
     * @return {?}
     */
    function () {
        return this._localeData.firstDayOfWeek;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getNumDaysInMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).daysInMonth();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.clone = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.clone().locale(this.locale);
    };
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.createDate = /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    function (year, month, date) {
        // Moment.js will create an invalid date if any of the components are out of bounds, but we
        // explicitly check each case so we can throw more descriptive errors.
        if (month < 0 || month > 11) {
            throw Error("Invalid month index \"" + month + "\". Month index has to be between 0 and 11.");
        }
        if (date < 1) {
            throw Error("Invalid date \"" + date + "\". Date has to be greater than 0.");
        }
        /** @type {?} */
        var result = this._createMoment({ year: year, month: month, date: date }).locale(this.locale);
        // If the result isn't valid, the date must have been out of bounds for this month.
        if (!result.isValid()) {
            throw Error("Invalid date \"" + date + "\" for month with index \"" + month + "\".");
        }
        return result;
    };
    /**
     * @return {?}
     */
    MomentDateAdapter.prototype.today = /**
     * @return {?}
     */
    function () {
        return this._createMoment().locale(this.locale);
    };
    /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    MomentDateAdapter.prototype.parse = /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    function (value, parseFormat) {
        if (value && typeof value == 'string') {
            return this._createMoment(value, parseFormat, this.locale);
        }
        return value ? this._createMoment(value).locale(this.locale) : null;
    };
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    MomentDateAdapter.prototype.format = /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    function (date, displayFormat) {
        date = this.clone(date);
        if (!this.isValid(date)) {
            throw Error('MomentDateAdapter: Cannot format invalid date.');
        }
        return date.format(displayFormat);
    };
    /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    MomentDateAdapter.prototype.addCalendarYears = /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    function (date, years) {
        return this.clone(date).add({ years: years });
    };
    /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    MomentDateAdapter.prototype.addCalendarMonths = /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    function (date, months) {
        return this.clone(date).add({ months: months });
    };
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    MomentDateAdapter.prototype.addCalendarDays = /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    function (date, days) {
        return this.clone(date).add({ days: days });
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.toIso8601 = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).format();
    };
    /**
     * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
     * string into null. Returns an invalid date for all other values.
     */
    /**
     * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
     * string into null. Returns an invalid date for all other values.
     * @param {?} value
     * @return {?}
     */
    MomentDateAdapter.prototype.deserialize = /**
     * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
     * string into null. Returns an invalid date for all other values.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var date;
        if (value instanceof Date) {
            date = this._createMoment(value).locale(this.locale);
        }
        else if (this.isDateInstance(value)) {
            // Note: assumes that cloning also sets the correct locale.
            return this.clone(value);
        }
        if (typeof value === 'string') {
            if (!value) {
                return null;
            }
            date = this._createMoment(value, moment.ISO_8601).locale(this.locale);
        }
        if (date && this.isValid(date)) {
            return this._createMoment(date).locale(this.locale);
        }
        return _super.prototype.deserialize.call(this, value);
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    MomentDateAdapter.prototype.isDateInstance = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return moment.isMoment(obj);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.isValid = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).isValid();
    };
    /**
     * @return {?}
     */
    MomentDateAdapter.prototype.invalid = /**
     * @return {?}
     */
    function () {
        return moment.invalid();
    };
    /** Creates a Moment instance while respecting the current UTC settings. */
    /**
     * Creates a Moment instance while respecting the current UTC settings.
     * @private
     * @param {?} date
     * @param {?=} format
     * @param {?=} locale
     * @return {?}
     */
    MomentDateAdapter.prototype._createMoment = /**
     * Creates a Moment instance while respecting the current UTC settings.
     * @private
     * @param {?} date
     * @param {?=} format
     * @param {?=} locale
     * @return {?}
     */
    function (date, format, locale) {
        var _a = this._options || {}, strict = _a.strict, useUtc = _a.useUtc;
        return useUtc
            ? moment.utc(date, format, locale, strict)
            : moment(date, format, locale, strict);
    };
    MomentDateAdapter.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MomentDateAdapter.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATE_LOCALE,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_MOMENT_DATE_ADAPTER_OPTIONS,] }] }
    ]; };
    return MomentDateAdapter;
}(DateAdapter));
export { MomentDateAdapter };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MomentDateAdapter.prototype._localeData;
    /**
     * @type {?}
     * @private
     */
    MomentDateAdapter.prototype._options;
}
//# sourceMappingURL=moment-date-adapter.js.map