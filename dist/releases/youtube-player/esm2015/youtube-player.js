/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgZone, Output, ViewChild, ViewEncapsulation, NgModule } from '@angular/core';
import { combineLatest, merge, Observable, of, pipe, Subject } from 'rxjs';
import { combineLatest as combineLatest$1, distinctUntilChanged, filter, first, flatMap, map, publish, scan, skipWhile, startWith, take, takeUntil, withLatestFrom } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const DEFAULT_PLAYER_WIDTH = 640;
/** @type {?} */
const DEFAULT_PLAYER_HEIGHT = 390;
/**
 * Whether we're currently rendering inside a browser. Equivalent of `Platform.isBrowser`,
 * but copied over here so we don't have to add another dependency.
 * @type {?}
 */
const isBrowser = typeof window === 'object' && !!window;
/**
 * Angular component that renders a YouTube player via the YouTube player
 * iframe API.
 * @see https://developers.google.com/youtube/iframe_api_reference
 */
class YouTubePlayer {
    /**
     * @param {?} _ngZone
     */
    constructor(_ngZone) {
        this._ngZone = _ngZone;
        this._videoIdObs = new EventEmitter();
        this._height = DEFAULT_PLAYER_HEIGHT;
        this._heightObs = new EventEmitter();
        this._width = DEFAULT_PLAYER_WIDTH;
        this._widthObs = new EventEmitter();
        this._startSeconds = new EventEmitter();
        this._endSeconds = new EventEmitter();
        this._suggestedQuality = new EventEmitter();
        /**
         * Outputs are direct proxies from the player itself.
         */
        this.ready = new EventEmitter();
        this.stateChange = new EventEmitter();
        this.error = new EventEmitter();
        this.apiChange = new EventEmitter();
        this.playbackQualityChange = new EventEmitter();
        this.playbackRateChange = new EventEmitter();
        this._youtubeContainer = new EventEmitter();
        this._destroyed = new EventEmitter();
    }
    /**
     * YouTube Video ID to view
     * @return {?}
     */
    get videoId() { return this._videoId; }
    /**
     * @param {?} videoId
     * @return {?}
     */
    set videoId(videoId) {
        this._videoId = videoId;
        this._videoIdObs.emit(videoId);
    }
    /**
     * Height of video player
     * @return {?}
     */
    get height() { return this._height; }
    /**
     * @param {?} height
     * @return {?}
     */
    set height(height) {
        this._height = height || DEFAULT_PLAYER_HEIGHT;
        this._heightObs.emit(this._height);
    }
    /**
     * Width of video player
     * @return {?}
     */
    get width() { return this._width; }
    /**
     * @param {?} width
     * @return {?}
     */
    set width(width) {
        this._width = width || DEFAULT_PLAYER_WIDTH;
        this._widthObs.emit(this._width);
    }
    /**
     * The moment when the player is supposed to start playing
     * @param {?} startSeconds
     * @return {?}
     */
    set startSeconds(startSeconds) {
        this._startSeconds.emit(startSeconds);
    }
    /**
     * The moment when the player is supposed to stop playing
     * @param {?} endSeconds
     * @return {?}
     */
    set endSeconds(endSeconds) {
        this._endSeconds.emit(endSeconds);
    }
    /**
     * The suggested quality of the player
     * @param {?} suggestedQuality
     * @return {?}
     */
    set suggestedQuality(suggestedQuality) {
        this._suggestedQuality.emit(suggestedQuality);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Don't do anything if we're not in a browser environment.
        if (!isBrowser) {
            return;
        }
        /** @type {?} */
        let iframeApiAvailableObs = of(true);
        if (!window.YT) {
            if (this.showBeforeIframeApiLoads) {
                throw new Error('Namespace YT not found, cannot construct embedded youtube player. ' +
                    'Please install the YouTube Player API Reference for iframe Embeds: ' +
                    'https://developers.google.com/youtube/iframe_api_reference');
            }
            /** @type {?} */
            const iframeApiAvailableSubject = new Subject();
            window.onYouTubeIframeAPIReady = (/**
             * @return {?}
             */
            () => {
                this._ngZone.run((/**
                 * @return {?}
                 */
                () => iframeApiAvailableSubject.next(true)));
            });
            iframeApiAvailableObs = iframeApiAvailableSubject.pipe(take(1), startWith(false));
        }
        // Add initial values to all of the inputs.
        /** @type {?} */
        const videoIdObs = this._videoIdObs.pipe(startWith(this._videoId));
        /** @type {?} */
        const widthObs = this._widthObs.pipe(startWith(this._width));
        /** @type {?} */
        const heightObs = this._heightObs.pipe(startWith(this._height));
        /** @type {?} */
        const startSecondsObs = this._startSeconds.pipe(startWith(undefined));
        /** @type {?} */
        const endSecondsObs = this._endSeconds.pipe(startWith(undefined));
        /** @type {?} */
        const suggestedQualityObs = this._suggestedQuality.pipe(startWith(undefined));
        /**
         * An observable of the currently loaded player.
         * @type {?}
         */
        const playerObs = createPlayerObservable(this._youtubeContainer, videoIdObs, iframeApiAvailableObs, widthObs, heightObs, this.createEventsBoundInZone()).pipe(waitUntilReady(), takeUntil(this._destroyed), publish());
        /** Set up side effects to bind inputs to the player. */
        playerObs.subscribe((/**
         * @param {?} player
         * @return {?}
         */
        player => this._player = player));
        bindSizeToPlayer(playerObs, widthObs, heightObs);
        bindSuggestedQualityToPlayer(playerObs, suggestedQualityObs);
        bindCueVideoCall(playerObs, videoIdObs, startSecondsObs, endSecondsObs, suggestedQualityObs, this._destroyed);
        // After all of the subscriptions are set up, connect the observable.
        ((/** @type {?} */ (playerObs))).connect();
    }
    /**
     * @return {?}
     */
    createEventsBoundInZone() {
        return {
            onReady: this._runInZone((/**
             * @param {?} event
             * @return {?}
             */
            (event) => this.ready.emit(event))),
            onStateChange: this._runInZone((/**
             * @param {?} event
             * @return {?}
             */
            (event) => this.stateChange.emit(event))),
            onPlaybackQualityChange: this._runInZone((/**
             * @param {?} event
             * @return {?}
             */
            (event) => this.playbackQualityChange.emit(event))),
            onPlaybackRateChange: this._runInZone((/**
             * @param {?} event
             * @return {?}
             */
            (event) => this.playbackRateChange.emit(event))),
            onError: this._runInZone((/**
             * @param {?} event
             * @return {?}
             */
            (event) => this.error.emit(event))),
            onApiChange: this._runInZone((/**
             * @param {?} event
             * @return {?}
             */
            (event) => this.apiChange.emit(event))),
        };
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._youtubeContainer.emit(this.youtubeContainer.nativeElement);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._player) {
            this._player.destroy();
            window.onYouTubeIframeAPIReady = undefined;
            this._destroyed.emit();
        }
    }
    /**
     * @private
     * @template T
     * @param {?} callback
     * @return {?}
     */
    _runInZone(callback) {
        return (/**
         * @param {...?} args
         * @return {?}
         */
        (...args) => {
            this._ngZone.run((/**
             * @return {?}
             */
            () => callback(...args)));
        });
    }
    /** Proxied methods. */
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#playVideo
     * @return {?}
     */
    playVideo() {
        if (this._player) {
            this._player.playVideo();
        }
    }
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#pauseVideo
     * @return {?}
     */
    pauseVideo() {
        if (this._player) {
            this._player.pauseVideo();
        }
    }
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#stopVideo
     * @return {?}
     */
    stopVideo() {
        if (this._player) {
            this._player.stopVideo();
        }
    }
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#seekTo
     * @param {?} seconds
     * @param {?} allowSeekAhead
     * @return {?}
     */
    seekTo(seconds, allowSeekAhead) {
        if (this._player) {
            this._player.seekTo(seconds, allowSeekAhead);
        }
    }
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#mute
     * @return {?}
     */
    mute() {
        if (this._player) {
            this._player.mute();
        }
    }
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#unMute
     * @return {?}
     */
    unMute() {
        if (this._player) {
            this._player.unMute();
        }
    }
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#isMuted
     * @return {?}
     */
    isMuted() {
        return !this._player || this._player.isMuted();
    }
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#setVolume
     * @param {?} volume
     * @return {?}
     */
    setVolume(volume) {
        if (this._player) {
            this._player.setVolume(volume);
        }
    }
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#getVolume
     * @return {?}
     */
    getVolume() {
        return this._player ? this._player.getVolume() : 0;
    }
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#setPlaybackRate
     * @param {?} playbackRate
     * @return {?}
     */
    setPlaybackRate(playbackRate) {
        if (this._player) {
            return this._player.setPlaybackRate(playbackRate);
        }
    }
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#getPlaybackRate
     * @return {?}
     */
    getPlaybackRate() {
        return this._player ? this._player.getPlaybackRate() : 0;
    }
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#getAvailablePlaybackRates
     * @return {?}
     */
    getAvailablePlaybackRates() {
        return this._player ? this._player.getAvailablePlaybackRates() : [];
    }
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#getVideoLoadedFraction
     * @return {?}
     */
    getVideoLoadedFraction() {
        return this._player ? this._player.getVideoLoadedFraction() : 0;
    }
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#getPlayerState
     * @return {?}
     */
    getPlayerState() {
        if (!isBrowser || !window.YT) {
            return undefined;
        }
        return this._player ? this._player.getPlayerState() : -1 /* UNSTARTED */;
    }
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#getCurrentTime
     * @return {?}
     */
    getCurrentTime() {
        return this._player ? this._player.getCurrentTime() : 0;
    }
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#getPlaybackQuality
     * @return {?}
     */
    getPlaybackQuality() {
        return this._player ? this._player.getPlaybackQuality() : 'default';
    }
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#getAvailableQualityLevels
     * @return {?}
     */
    getAvailableQualityLevels() {
        return this._player ? this._player.getAvailableQualityLevels() : [];
    }
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#getDuration
     * @return {?}
     */
    getDuration() {
        return this._player ? this._player.getDuration() : 0;
    }
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#getVideoUrl
     * @return {?}
     */
    getVideoUrl() {
        return this._player ? this._player.getVideoUrl() : '';
    }
    /**
     * See https://developers.google.com/youtube/iframe_api_reference#getVideoEmbedCode
     * @return {?}
     */
    getVideoEmbedCode() {
        return this._player ? this._player.getVideoEmbedCode() : '';
    }
}
YouTubePlayer.decorators = [
    { type: Component, args: [{selector: 'youtube-player',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                // This div is *replaced* by the YouTube player embed.
                template: '<div #youtubeContainer></div>',
            },] },
];
/** @nocollapse */
YouTubePlayer.ctorParameters = () => [
    { type: NgZone }
];
YouTubePlayer.propDecorators = {
    videoId: [{ type: Input }],
    height: [{ type: Input }],
    width: [{ type: Input }],
    startSeconds: [{ type: Input }],
    endSeconds: [{ type: Input }],
    suggestedQuality: [{ type: Input }],
    showBeforeIframeApiLoads: [{ type: Input }],
    ready: [{ type: Output }],
    stateChange: [{ type: Output }],
    error: [{ type: Output }],
    apiChange: [{ type: Output }],
    playbackQualityChange: [{ type: Output }],
    playbackRateChange: [{ type: Output }],
    youtubeContainer: [{ type: ViewChild, args: ['youtubeContainer', { static: false },] }]
};
/**
 * Listens to changes to the given width and height and sets it on the player.
 * @param {?} playerObs
 * @param {?} widthObs
 * @param {?} heightObs
 * @return {?}
 */
function bindSizeToPlayer(playerObs, widthObs, heightObs) {
    return combineLatest([playerObs, widthObs, heightObs])
        .subscribe((/**
     * @param {?} __0
     * @return {?}
     */
    ([player, width, height]) => player && player.setSize(width, height)));
}
/**
 * Listens to changes from the suggested quality and sets it on the given player.
 * @param {?} playerObs
 * @param {?} suggestedQualityObs
 * @return {?}
 */
function bindSuggestedQualityToPlayer(playerObs, suggestedQualityObs) {
    return combineLatest([
        playerObs,
        suggestedQualityObs
    ]).subscribe((/**
     * @param {?} __0
     * @return {?}
     */
    ([player, suggestedQuality]) => player && suggestedQuality && player.setPlaybackQuality(suggestedQuality)));
}
/**
 * Returns an observable that emits the loaded player once it's ready. Certain properties/methods
 * won't be available until the iframe finishes loading.
 * @return {?}
 */
function waitUntilReady() {
    return flatMap((/**
     * @param {?} player
     * @return {?}
     */
    player => {
        if (!player) {
            return of(undefined);
        }
        if ('getPlayerStatus' in player) {
            return of((/** @type {?} */ (player)));
        }
        // The player is not initialized fully until the ready is called.
        return fromPlayerOnReady(player)
            .pipe(first(), startWith(undefined));
    }));
}
/**
 * Since removeEventListener is not on Player when it's initialized, we can't use fromEvent.
 * @param {?} player
 * @return {?}
 */
function fromPlayerOnReady(player) {
    return new Observable((/**
     * @param {?} emitter
     * @return {?}
     */
    emitter => {
        /** @type {?} */
        let aborted = false;
        /** @type {?} */
        const onReady = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
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
        () => {
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
    const playerOptions = videoIdObs
        .pipe(withLatestFrom(combineLatest([widthObs, heightObs])), map((/**
     * @param {?} __0
     * @return {?}
     */
    ([videoId, [width, height]]) => videoId ? ({ videoId, width, height, events }) : undefined)));
    return combineLatest([youtubeContainer, playerOptions])
        .pipe(skipUntilRememberLatest(iframeApiAvailableObs), scan(syncPlayerState, undefined), distinctUntilChanged());
}
/**
 * Skips the given observable until the other observable emits true, then emit the latest.
 * @template T
 * @param {?} notifier
 * @return {?}
 */
function skipUntilRememberLatest(notifier) {
    return pipe(combineLatest$1(notifier), skipWhile((/**
     * @param {?} __0
     * @return {?}
     */
    ([_, doneSkipping]) => !doneSkipping)), map((/**
     * @param {?} __0
     * @return {?}
     */
    ([value]) => value)));
}
/**
 * Destroy the player if there are no options, or create the player if there are options.
 * @param {?} player
 * @param {?} __1
 * @return {?}
 */
function syncPlayerState(player, [container, videoOptions]) {
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
    const newPlayer = new YT.Player(container, videoOptions);
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
    const cueOptionsObs = combineLatest([startSecondsObs, endSecondsObs])
        .pipe(map((/**
     * @param {?} __0
     * @return {?}
     */
    ([startSeconds, endSeconds]) => ({ startSeconds, endSeconds }))));
    // Only respond to changes in cue options if the player is not running.
    /** @type {?} */
    const filteredCueOptions = cueOptionsObs
        .pipe(filterOnOther(playerObs, (/**
     * @param {?} player
     * @return {?}
     */
    player => !!player && !hasPlayerStarted(player))));
    // If the video id changed, there's no reason to run 'cue' unless the player
    // was initialized with a different video id.
    /** @type {?} */
    const changedVideoId = videoIdObs
        .pipe(filterOnOther(playerObs, (/**
     * @param {?} player
     * @param {?} videoId
     * @return {?}
     */
    (player, videoId) => !!player && player.videoId !== videoId)));
    // If the player changed, there's no reason to run 'cue' unless there are cue options.
    /** @type {?} */
    const changedPlayer = playerObs.pipe(filterOnOther(combineLatest([videoIdObs, cueOptionsObs]), (/**
     * @param {?} __0
     * @param {?} player
     * @return {?}
     */
    ([videoId, cueOptions], player) => !!player &&
        (videoId != player.videoId || !!cueOptions.startSeconds || !!cueOptions.endSeconds))));
    merge(changedPlayer, changedVideoId, filteredCueOptions)
        .pipe(withLatestFrom(combineLatest([playerObs, videoIdObs, cueOptionsObs, suggestedQualityObs])), map((/**
     * @param {?} __0
     * @return {?}
     */
    ([_, values]) => values)), takeUntil(destroyed))
        .subscribe((/**
     * @param {?} __0
     * @return {?}
     */
    ([player, videoId, cueOptions, suggestedQuality]) => {
        if (!videoId || !player) {
            return;
        }
        player.videoId = videoId;
        player.cueVideoById(Object.assign({ videoId,
            suggestedQuality }, cueOptions));
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
    return pipe(withLatestFrom(otherObs), filter((/**
     * @param {?} __0
     * @return {?}
     */
    ([value, other]) => filterFn(other, value))), map((/**
     * @param {?} __0
     * @return {?}
     */
    ([value]) => value)));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const COMPONENTS = [YouTubePlayer];
class YouTubePlayerModule {
}
YouTubePlayerModule.decorators = [
    { type: NgModule, args: [{
                declarations: COMPONENTS,
                exports: COMPONENTS,
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { YouTubePlayer, YouTubePlayerModule };
//# sourceMappingURL=youtube-player.js.map
