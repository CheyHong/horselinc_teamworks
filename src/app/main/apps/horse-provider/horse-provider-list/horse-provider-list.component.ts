import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';

import { HorseProviderService } from 'app/main/apps/horse-provider/horse-provider.service';
import { Provider } from 'app/main/apps/horse-provider/provider.model';

import { takeUntil } from 'rxjs/operators';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

interface HorseNode {
    name: string;
    children?: HorseNode[];
}

const TREE_DATA: HorseNode[] = [
    {
        name: 'YaoYuan Mei',
        children: [
            {name: 'Apple'},
            {name: 'Banana'},
            {name: 'Fruit loops'},
        ]
    },
    {
        name: 'YaoYuan Mei',
        children: [
            {name: 'Apple'},
            {name: 'Banana'},
            {name: 'Fruit loops'},
        ]
    }
];
  
  /** Flat node with expandable and level information */
interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}

@Component({
    selector: 'horse-provider-list',
    templateUrl: './horse-provider-list.component.html',
    styleUrls: ['./horse-provider-list.component.scss']
})
export class HorseProviderListComponent implements OnInit{

    private _transformer = (node: HorseNode, level: number) => {
        return {
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        level: level,
        };
    }
    treeControl = new FlatTreeControl<ExampleFlatNode> (
        node => node.level,
        node => node.expandable
    );

    treeFlattener = new MatTreeFlattener(
        this._transformer, node => node.level, node => node.expandable, node => node.children
    );

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    constructor() {
        this.dataSource.data = TREE_DATA;
    }

    ngOnInit(){

    }

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
   
}
