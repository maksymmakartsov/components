/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CommonModule} from '@angular/common';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {GoogleMapsModule} from '@angular/google-maps';
import {RouterModule} from '@angular/router';

import {GoogleMapDemo} from './google-map-demo';

@NgModule({
  imports: [
    CommonModule,
    GoogleMapsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    RouterModule.forChild([{path: '', component: GoogleMapDemo}]),
  ],
  declarations: [GoogleMapDemo],
})
export class GoogleMapDemoModule {
}
