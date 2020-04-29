/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators')) :
	typeof define === 'function' && define.amd ? define('@angular/youtube-player', ['exports', '@angular/core', 'rxjs', 'rxjs/operators'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.youtubePlayer = {}),global.ng.core,global.rxjs,global.rxjs.operators));
}(this, (function (exports,core,rxjs,operators) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var DEFAULT_PLAYER_WIDTH = 640;
/** @type {?} */
var DEFAULT_PLAYER_HEIGHT = 390;
/**
 * Whether we're currently rendering inside a browser. Equivalent of `Platform.isBrowser`,
 * but copied over here so we don't have to add another dependency.
 * @type {?}
 */
var isBrowser = typeof window === 'object' && !!window;
/**
 * Angular component that renders a YouTube player via the YouTube player
 * iframe API.
 * @see https://developers.google.com/youtube/iframe_api_reference
 */
var YouTubePlayer = /** @class */ (function () {
    function YouTubePlayer(_ngZone) {
        this._ngZone = _ngZone;
        this._videoIdObs = new core.EventEmitter();
        this._height = DEFAULT_PLAYER_HEIGHT;
        this._heightObs = new core.EventEmitter();
        this._width = DEFAULT_PLAYER_WIDTH;
        this._widthObs = new core.EventEmitter();
        this._startSeconds = new core.EventEmitter();
        this._endSeconds = new core.EventEmitter();
        this._suggestedQuality = new core.EventEmitter();
        /**
         * Outputs are direct proxies from the player itself.
         */
        this.ready = new core.EventEmitter();
        this.stateChange = new core.EventEmitter();
        this.error = new core.EventEmitter();
        this.apiChange = new core.EventEmitter();
        this.playbackQualityChange = new core.EventEmitter();
        this.playbackRateChange = new core.EventEmitter();
        this._youtubeContainer = new core.EventEmitter();
        this._destroyed = new core.EventEmitter();
    }
    Object.defineProperty(YouTubePlayer.prototype, "videoId", {
        /** YouTube Video ID to view */
        get: /**
         * YouTube Video ID to view
         * @return {?}
         */
        function () { return this._videoId; },
        set: /**
         * @param {?} videoId
         * @return {?}
         */
        function (videoId) {
            this._videoId = videoId;
            this._videoIdObs.emit(videoId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YouTubePlayer.prototype, "height", {
        /** Height of video player */
        get: /**
         * Height of video player
         * @return {?}
         */
        function () { return this._height; },
        set: /**
         * @param {?} height
         * @return {?}
         */
        function (height) {
            this._height = height || DEFAULT_PLAYER_HEIGHT;
            this._heightObs.emit(this._height);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YouTubePlayer.prototype, "width", {
        /** Width of video player */
        get: /**
         * Width of video player
         * @return {?}
         */
        function () { return this._width; },
        set: /**
         * @param {?} width
         * @return {?}
         */
        function (width) {
            this._width = width || DEFAULT_PLAYER_WIDTH;
            this._widthObs.emit(this._width);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YouTubePlayer.prototype, "startSeconds", {
        /** The moment when the player is supposed to start playing */
        set: /**
         * The moment when the player is supposed to start playing
         * @param {?} startSeconds
         * @return {?}
         */
        function (startSeconds) {
            this._startSeconds.emit(startSeconds);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YouTubePlayer.prototype, "endSeconds", {
        /** The moment when the player is supposed to stop playing */
        set: /**
         * The moment when the player is supposed to stop playing
         * @param {?} endSeconds
         * @return {?}
         */
        function (endSeconds) {
            this._endSeconds.emit(endSeconds);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YouTubePlayer.prototype, "suggestedQuality", {
        /** The suggested quality of the player */
        set: /**
         * The suggested quality of the player
         * @param {?} suggestedQuality
         * @return {?}
         */
        function (suggestedQuality) {
            this._suggestedQuality.emit(suggestedQuality);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    YouTubePlayer.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Don't do anything if we're not in a browser environment.
        if (!isBrowser) {
            return;
        }
        /** @type {?} */
        var iframeApiAvailableObs = rxjs.of(true);
        if (!window.YT) {
            if (this.showBeforeIframeApiLoads) {
                throw new Error('Namespace YT not found, cannot construct embedded youtube player. ' +
                    'Please install the YouTube Player API Reference for iframe Embeds: ' +
                    'https://developers.google.com/youtube/iframe_api_reference');
            }
            /** @type {?} */
            var iframeApiAvailableSubject_1 = new rxjs.Subject();
            window.onYouTubeIframeAPIReady = (/**
             * @return {?}
             */
            function () {
                _this._ngZone.run((/**
                 * @return {?}
                 */
                function () { return iframeApiAvailableSubject_1.next(true); }));
            });
            iframeApiAvailableObs = iframeApiAvailableSubject_1.pipe(operators.take(1), operators.startWith(false));
        }
        // Add initial values to all of the inputs.
        /** @type {?} */
        var videoIdObs = this._videoIdObs.pipe(operators.startWith(this._videoId));
        /** @type {?} */
        var widthObs = this._widthObs.pipe(operators.startWith(this._width));
        /** @type {?} */
        var heightObs = this._heightObs.pipe(operators.startWith(this._height));
        /** @type {?} */
        var startSecondsObs = this._startSeconds.pipe(operators.startWith(undefined));
        /** @type {?} */
        var endSecondsObs = this._endSeconds.pipe(operators.startWith(undefined));
        /** @type {?} */
        var suggestedQualityObs = this._suggestedQuality.pipe(operators.startWith(undefined));
        /**
         * An observable of the currently loaded player.
         * @type {?}
         */
        var playerObs = createPlayerObservable(this._youtubeContainer, videoIdObs, iframeApiAvailableObs, widthObs, heightObs, this.createEventsBoundInZone()).pipe(waitUntilReady(), operators.takeUntil(this._destroyed), operators.publish());
        /** Set up side effects to bind inputs to the player. */
        playerObs.subscribe((/**
         * @param {?} player
         * @return {?}
         */
        function (player) { return _this._player = player; }));
        bindSizeToPlayer(playerObs, widthObs, heightObs);
        bindSuggestedQualityToPlayer(playerObs, suggestedQualityObs);
        bindCueVideoCall(playerObs, videoIdObs, startSecondsObs, endSecondsObs, suggestedQualityObs, this._destroyed);
        // After all of the subscriptions are set up, connect the observable.
        ((/** @type {?} */ (playerObs))).connect();
    };
    /**
     * @return {?}
     */
    YouTubePlayer.prototype.createEventsBoundInZone = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return {
            onReady: this._runInZone((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return _this.ready.emit(event); })),
            onStateChange: this._runInZone((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return _this.stateChange.emit(event); })),
            onPlaybackQualityChange: this._runInZone((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return _this.playbackQualityChange.emit(event); })),
            onPlaybackRateChange: this._runInZone((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return _this.playbackRateChange.emit(event); })),
            onError: this._runInZone((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return _this.error.emit(event); })),
            onApiChange: this._runInZone((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return _this.apiChange.emit(event); })),
        };
    };
    /**
     * @return {?}
     */
    YouTubePlayer.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this._youtubeContainer.emit(this.youtubeContainer.nativeElement);
    };
    /**
     * @return {?}
     */
    YouTubePlayer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._player) {
            this._player.destroy();
            window.onYouTubeIframeAPIReady = undefined;
            this._destroyed.emit();
        }
    };
    /**
     * @private
     * @template T
     * @param {?} callback
     * @return {?}
     */
    YouTubePlayer.prototype._runInZone = /**
     * @private
     * @template T
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        var _this = this;
        return (/**
         * @param {...?} args
         * @return {?}
         */
        function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this._ngZone.run((/**
             * @return {?}
             */
            function () { return callback.apply(void 0, args); }));
        });
    };
    /** Proxied methods. */
    /** See https://developers.google.com/youtube/iframe_api_reference#playVideo */
    /** Proxied methods. */
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#playVideo
     * @return {?}
     */
    YouTubePlayer.prototype.playVideo = /** Proxied methods. */
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#playVideo
     * @return {?}
     */
    function () {
        if (this._player) {
            this._player.playVideo();
        }
    };
    /** See https://developers.google.com/youtube/iframe_api_reference#pauseVideo */
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#pauseVideo
     * @return {?}
     */
    YouTubePlayer.prototype.pauseVideo = /**
     * See https://developers.google.com/youtube/iframe_api_reference#pauseVideo
     * @return {?}
     */
    function () {
        if (this._player) {
            this._player.pauseVideo();
        }
    };
    /** See https://developers.google.com/youtube/iframe_api_reference#stopVideo */
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#stopVideo
     * @return {?}
     */
    YouTubePlayer.prototype.stopVideo = /**
     * See https://developers.google.com/youtube/iframe_api_reference#stopVideo
     * @return {?}
     */
    function () {
        if (this._player) {
            this._player.stopVideo();
        }
    };
    /** See https://developers.google.com/youtube/iframe_api_reference#seekTo */
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#seekTo
     * @param {?} seconds
     * @param {?} allowSeekAhead
     * @return {?}
     */
    YouTubePlayer.prototype.seekTo = /**
     * See https://developers.google.com/youtube/iframe_api_reference#seekTo
     * @param {?} seconds
     * @param {?} allowSeekAhead
     * @return {?}
     */
    function (seconds, allowSeekAhead) {
        if (this._player) {
            this._player.seekTo(seconds, allowSeekAhead);
        }
    };
    /** See https://developers.google.com/youtube/iframe_api_reference#mute */
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#mute
     * @return {?}
     */
    YouTubePlayer.prototype.mute = /**
     * See https://developers.google.com/youtube/iframe_api_reference#mute
     * @return {?}
     */
    function () {
        if (this._player) {
            this._player.mute();
        }
    };
    /** See https://developers.google.com/youtube/iframe_api_reference#unMute */
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#unMute
     * @return {?}
     */
    YouTubePlayer.prototype.unMute = /**
     * See https://developers.google.com/youtube/iframe_api_reference#unMute
     * @return {?}
     */
    function () {
        if (this._player) {
            this._player.unMute();
        }
    };
    /** See https://developers.google.com/youtube/iframe_api_reference#isMuted */
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#isMuted
     * @return {?}
     */
    YouTubePlayer.prototype.isMuted = /**
     * See https://developers.google.com/youtube/iframe_api_reference#isMuted
     * @return {?}
     */
    function () {
        return !this._player || this._player.isMuted();
    };
    /** See https://developers.google.com/youtube/iframe_api_reference#setVolume */
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#setVolume
     * @param {?} volume
     * @return {?}
     */
    YouTubePlayer.prototype.setVolume = /**
     * See https://developers.google.com/youtube/iframe_api_reference#setVolume
     * @param {?} volume
     * @return {?}
     */
    function (volume) {
        if (this._player) {
            this._player.setVolume(volume);
        }
    };
    /** See https://developers.google.com/youtube/iframe_api_reference#getVolume */
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#getVolume
     * @return {?}
     */
    YouTubePlayer.prototype.getVolume = /**
     * See https://developers.google.com/youtube/iframe_api_reference#getVolume
     * @return {?}
     */
    function () {
        return this._player ? this._player.getVolume() : 0;
    };
    /** See https://developers.google.com/youtube/iframe_api_reference#setPlaybackRate */
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#setPlaybackRate
     * @param {?} playbackRate
     * @return {?}
     */
    YouTubePlayer.prototype.setPlaybackRate = /**
     * See https://developers.google.com/youtube/iframe_api_reference#setPlaybackRate
     * @param {?} playbackRate
     * @return {?}
     */
    function (playbackRate) {
        if (this._player) {
            return this._player.setPlaybackRate(playbackRate);
        }
    };
    /** See https://developers.google.com/youtube/iframe_api_reference#getPlaybackRate */
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#getPlaybackRate
     * @return {?}
     */
    YouTubePlayer.prototype.getPlaybackRate = /**
     * See https://developers.google.com/youtube/iframe_api_reference#getPlaybackRate
     * @return {?}
     */
    function () {
        return this._player ? this._player.getPlaybackRate() : 0;
    };
    /** See https://developers.google.com/youtube/iframe_api_reference#getAvailablePlaybackRates */
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#getAvailablePlaybackRates
     * @return {?}
     */
    YouTubePlayer.prototype.getAvailablePlaybackRates = /**
     * See https://developers.google.com/youtube/iframe_api_reference#getAvailablePlaybackRates
     * @return {?}
     */
    function () {
        return this._player ? this._player.getAvailablePlaybackRates() : [];
    };
    /** See https://developers.google.com/youtube/iframe_api_reference#getVideoLoadedFraction */
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#getVideoLoadedFraction
     * @return {?}
     */
    YouTubePlayer.prototype.getVideoLoadedFraction = /**
     * See https://developers.google.com/youtube/iframe_api_reference#getVideoLoadedFraction
     * @return {?}
     */
    function () {
        return this._player ? this._player.getVideoLoadedFraction() : 0;
    };
    /** See https://developers.google.com/youtube/iframe_api_reference#getPlayerState */
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#getPlayerState
     * @return {?}
     */
    YouTubePlayer.prototype.getPlayerState = /**
     * See https://developers.google.com/youtube/iframe_api_reference#getPlayerState
     * @return {?}
     */
    function () {
        if (!isBrowser || !window.YT) {
            return undefined;
        }
        return this._player ? this._player.getPlayerState() : -1 /* UNSTARTED */;
    };
    /** See https://developers.google.com/youtube/iframe_api_reference#getCurrentTime */
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#getCurrentTime
     * @return {?}
     */
    YouTubePlayer.prototype.getCurrentTime = /**
     * See https://developers.google.com/youtube/iframe_api_reference#getCurrentTime
     * @return {?}
     */
    function () {
        return this._player ? this._player.getCurrentTime() : 0;
    };
    /** See https://developers.google.com/youtube/iframe_api_reference#getPlaybackQuality */
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#getPlaybackQuality
     * @return {?}
     */
    YouTubePlayer.prototype.getPlaybackQuality = /**
     * See https://developers.google.com/youtube/iframe_api_reference#getPlaybackQuality
     * @return {?}
     */
    function () {
        return this._player ? this._player.getPlaybackQuality() : 'default';
    };
    /** See https://developers.google.com/youtube/iframe_api_reference#getAvailableQualityLevels */
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#getAvailableQualityLevels
     * @return {?}
     */
    YouTubePlayer.prototype.getAvailableQualityLevels = /**
     * See https://developers.google.com/youtube/iframe_api_reference#getAvailableQualityLevels
     * @return {?}
     */
    function () {
        return this._player ? this._player.getAvailableQualityLevels() : [];
    };
    /** See https://developers.google.com/youtube/iframe_api_reference#getDuration */
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#getDuration
     * @return {?}
     */
    YouTubePlayer.prototype.getDuration = /**
     * See https://developers.google.com/youtube/iframe_api_reference#getDuration
     * @return {?}
     */
    function () {
        return this._player ? this._player.getDuration() : 0;
    };
    /** See https://developers.google.com/youtube/iframe_api_reference#getVideoUrl */
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#getVideoUrl
     * @return {?}
     */
    YouTubePlayer.prototype.getVideoUrl = /**
     * See https://developers.google.com/youtube/iframe_api_reference#getVideoUrl
     * @return {?}
     */
    function () {
        return this._player ? this._player.getVideoUrl() : '';
    };
    /** See https://developers.google.com/youtube/iframe_api_reference#getVideoEmbedCode */
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#getVideoEmbedCode
     * @return {?}
     */
    YouTubePlayer.prototype.getVideoEmbedCode = /**
     * See https://developers.google.com/youtube/iframe_api_reference#getVideoEmbedCode
     * @return {?}
     */
    function () {
        return this._player ? this._player.getVideoEmbedCode() : '';
    };
    YouTubePlayer.decorators = [
        { type: core.Component, args: [{selector: 'youtube-player',
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    // This div is *replaced* by the YouTube player embed.
                    template: '<div #youtubeContainer></div>',
                },] },
    ];
    /** @nocollapse */
    YouTubePlayer.ctorParameters = function () { return [
        { type: core.NgZone }
    ]; };
    YouTubePlayer.propDecorators = {
        videoId: [{ type: core.Input }],
        height: [{ type: core.Input }],
        width: [{ type: core.Input }],
        startSeconds: [{ type: core.Input }],
        endSeconds: [{ type: core.Input }],
        suggestedQuality: [{ type: core.Input }],
        showBeforeIframeApiLoads: [{ type: core.Input }],
        ready: [{ type: core.Output }],
        stateChange: [{ type: core.Output }],
        error: [{ type: core.Output }],
        apiChange: [{ type: core.Output }],
        playbackQualityChange: [{ type: core.Output }],
        playbackRateChange: [{ type: core.Output }],
        youtubeContainer: [{ type: core.ViewChild, args: ['youtubeContainer', { static: false },] }]
    };
    return YouTubePlayer;
}());
/**
 * Listens to changes to the given width and height and sets it on the player.
 * @param {?} playerObs
 * @param {?} widthObs
 * @param {?} heightObs
 * @return {?}
 */
function bindSizeToPlayer(playerObs, widthObs, heightObs) {
    return rxjs.combineLatest([playerObs, widthObs, heightObs])
        .subscribe((/**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var player = _a[0], width = _a[1], height = _a[2];
        return player && player.setSize(width, height);
    }));
}
/**
 * Listens to changes from the suggested quality and sets it on the given player.
 * @param {?} playerObs
 * @param {?} suggestedQualityObs
 * @return {?}
 */
function bindSuggestedQualityToPlayer(playerObs, suggestedQualityObs) {
    return rxjs.combineLatest([
        playerObs,
        suggestedQualityObs
    ]).subscribe((/**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var player = _a[0], suggestedQuality = _a[1];
        return player && suggestedQuality && player.setPlaybackQuality(suggestedQuality);
    }));
}
/**
 * Returns an observable that emits the loaded player once it's ready. Certain properties/methods
 * won't be available until the iframe finishes loading.
 * @return {?}
 */
function waitUntilReady() {
    return operators.flatMap((/**
     * @param {?} player
     * @return {?}
     */
    function (player) {
        if (!player) {
            return rxjs.of(undefined);
        }
        if ('getPlayerStatus' in player) {
            return rxjs.of((/** @type {?} */ (player)));
        }
        // The player is not initialized fully until the ready is called.
        return fromPlayerOnReady(player)
            .pipe(operators.first(), operators.startWith(undefined));
    }));
}
/**
 * Since removeEventListener is not on Player when it's initialized, we can't use fromEvent.
 * @param {?} player
 * @return {?}
 */
function fromPlayerOnReady(player) {
    return new rxjs.Observable((/**
     * @param {?} emitter
     * @return {?}
     */
    function (emitter) {
        /** @type {?} */
        var aborted = false;
        /** @type {?} */
        var onReady = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (aborted) {
                return;
            }
            event.target.removeEventListener('onReady', onReady);
            emitter.next(event.target);
        });
        player.addEventListener('onReady', onReady);
        return (/**
         * @return {?}
         */
        function () {
            aborted = true;
        });
    }));
}
/**
 * Create an observable for the player based on the given options.
 * @param {?} youtubeContainer
 * @param {?} videoIdObs
 * @param {?} iframeApiAvailableObs
 * @param {?} widthObs
 * @param {?} heightObs
 * @param {?} events
 * @return {?}
 */
function createPlayerObservable(youtubeContainer, videoIdObs, iframeApiAvailableObs, widthObs, heightObs, events) {
    /** @type {?} */
    var playerOptions = videoIdObs
        .pipe(operators.withLatestFrom(rxjs.combineLatest([widthObs, heightObs])), operators.map((/**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var videoId = _a[0], _b = _a[1], width = _b[0], height = _b[1];
        return videoId ? ({ videoId: videoId, width: width, height: height, events: events }) : undefined;
    })));
    return rxjs.combineLatest([youtubeContainer, playerOptions])
        .pipe(skipUntilRememberLatest(iframeApiAvailableObs), operators.scan(syncPlayerState, undefined), operators.distinctUntilChanged());
}
/**
 * Skips the given observable until the other observable emits true, then emit the latest.
 * @template T
 * @param {?} notifier
 * @return {?}
 */
function skipUntilRememberLatest(notifier) {
    return rxjs.pipe(operators.combineLatest(notifier), operators.skipWhile((/**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var _ = _a[0], doneSkipping = _a[1];
        return !doneSkipping;
    })), operators.map((/**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var value = _a[0];
        return value;
    })));
}
/**
 * Destroy the player if there are no options, or create the player if there are options.
 * @param {?} player
 * @param {?} __1
 * @return {?}
 */
function syncPlayerState(player, _a) {
    var container = _a[0], videoOptions = _a[1];
    if (!videoOptions) {
        if (player) {
            player.destroy();
        }
        return;
    }
    if (player) {
        return player;
    }
    /** @type {?} */
    var newPlayer = new YT.Player(container, videoOptions);
    // Bind videoId for future use.
    newPlayer.videoId = videoOptions.videoId;
    return newPlayer;
}
/**
 * Call cueVideoById if the videoId changes, or when start or end seconds change. cueVideoById will
 * change the loaded video id to the given videoId, and set the start and end times to the given
 * start/end seconds.
 * @param {?} playerObs
 * @param {?} videoIdObs
 * @param {?} startSecondsObs
 * @param {?} endSecondsObs
 * @param {?} suggestedQualityObs
 * @param {?} destroyed
 * @return {?}
 */
function bindCueVideoCall(playerObs, videoIdObs, startSecondsObs, endSecondsObs, suggestedQualityObs, destroyed) {
    /** @type {?} */
    var cueOptionsObs = rxjs.combineLatest([startSecondsObs, endSecondsObs])
        .pipe(operators.map((/**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var startSeconds = _a[0], endSeconds = _a[1];
        return ({ startSeconds: startSeconds, endSeconds: endSeconds });
    })));
    // Only respond to changes in cue options if the player is not running.
    /** @type {?} */
    var filteredCueOptions = cueOptionsObs
        .pipe(filterOnOther(playerObs, (/**
     * @param {?} player
     * @return {?}
     */
    function (player) { return !!player && !hasPlayerStarted(player); })));
    // If the video id changed, there's no reason to run 'cue' unless the player
    // was initialized with a different video id.
    /** @type {?} */
    var changedVideoId = videoIdObs
        .pipe(filterOnOther(playerObs, (/**
     * @param {?} player
     * @param {?} videoId
     * @return {?}
     */
    function (player, videoId) { return !!player && player.videoId !== videoId; })));
    // If the player changed, there's no reason to run 'cue' unless there are cue options.
    /** @type {?} */
    var changedPlayer = playerObs.pipe(filterOnOther(rxjs.combineLatest([videoIdObs, cueOptionsObs]), (/**
     * @param {?} __0
     * @param {?} player
     * @return {?}
     */
    function (_a, player) {
        var videoId = _a[0], cueOptions = _a[1];
        return !!player &&
            (videoId != player.videoId || !!cueOptions.startSeconds || !!cueOptions.endSeconds);
    })));
    rxjs.merge(changedPlayer, changedVideoId, filteredCueOptions)
        .pipe(operators.withLatestFrom(rxjs.combineLatest([playerObs, videoIdObs, cueOptionsObs, suggestedQualityObs])), operators.map((/**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var _ = _a[0], values = _a[1];
        return values;
    })), operators.takeUntil(destroyed))
        .subscribe((/**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var player = _a[0], videoId = _a[1], cueOptions = _a[2], suggestedQuality = _a[3];
        if (!videoId || !player) {
            return;
        }
        player.videoId = videoId;
        player.cueVideoById(__assign({ videoId: videoId,
            suggestedQuality: suggestedQuality }, cueOptions));
    }));
}
/**
 * @param {?} player
 * @return {?}
 */
function hasPlayerStarted(player) {
    return [-1 /* UNSTARTED */, 5 /* CUED */].indexOf(player.getPlayerState()) === -1;
}
/**
 * Combines the two observables temporarily for the filter function.
 * @template R, T
 * @param {?} otherObs
 * @param {?} filterFn
 * @return {?}
 */
function filterOnOther(otherObs, filterFn) {
    return rxjs.pipe(operators.withLatestFrom(otherObs), operators.filter((/**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var value = _a[0], other = _a[1];
        return filterFn(other, value);
    })), operators.map((/**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var value = _a[0];
        return value;
    })));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var COMPONENTS = [YouTubePlayer];
var YouTubePlayerModule = /** @class */ (function () {
    function YouTubePlayerModule() {
    }
    YouTubePlayerModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: COMPONENTS,
                    exports: COMPONENTS,
                },] },
    ];
    return YouTubePlayerModule;
}());

exports.YouTubePlayer = YouTubePlayer;
exports.YouTubePlayerModule = YouTubePlayerModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=youtube-player.umd.js.map
