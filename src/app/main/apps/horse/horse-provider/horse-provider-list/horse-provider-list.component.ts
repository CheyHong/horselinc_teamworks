import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { HorseProviderService } from 'app/main/apps/horse/horse-provider/horse-provider.service';
import { fuseAnimations } from '@fuse/animations';

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
    styleUrls: ['./horse-provider-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations

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

    constructor(
        private _horseManagerService: HorseProviderService,
    ) {
        this.dataSource.data = TREE_DATA;
        
    }

    ngOnInit(){

    }

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    readHorseProvider(horseManagerId): void
    {
       
        // this._horseManagerService.setCurrentHorseProvider(horseProviderId);
        this._horseManagerService.setCurrentHorseFlag(true);
    
    }
   
}
