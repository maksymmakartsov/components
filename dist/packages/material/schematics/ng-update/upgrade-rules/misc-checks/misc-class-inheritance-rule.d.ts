/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { MigrationRule } from '@angular/cdk/schematics';
import * as ts from 'typescript';
/**
 * Rule that checks for classes that extend Angular Material classes which
 * have changed their API.
 */
export declare class MiscClassInheritanceRule extends MigrationRule<null> {
    ruleEnabled: boolean;
    visitNode(node: ts.Node): void;
    private _visitClassDeclaration;
}
