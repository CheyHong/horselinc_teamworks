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

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
    // /**
    //  * Constructor
    //  *
    //  * @param {ActivatedRoute} _activatedRoute
    //  * @param {HorseProviderService} _providerService
    //  * @param {Location} _location
    //  */

    // constructor(
    //     // private _activatedRoute: ActivatedRoute,
    //     // private _location: Location,
    //     // private _providerService: HorseProviderService,
    //     // private _fuseSidebarService: FuseSidebarService,
    // ) {
    //     // Set the private defaults
    //     // this._unsubscribeAll = new Subject();
    //     this.dataSource.data = TREE_DATA;
    // }

    ngOnInit() {
        // this._providerService.onProvidersChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(providers => {
        //         this.providers = providers;
        //     });

        // this._providerService.onCurrentProviderChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(currentHorse => {
        //         if ( !currentHorse )
        //         {
             
        //             this.currentProvider = null;

        //             // Handle the location changes
        //             const tagHandle    = this._activatedRoute.snapshot.params.tagHandle,
        //                   filterHandle = this._activatedRoute.snapshot.params.filterHandle;

        //             if ( tagHandle )
        //             {
        //                 this._location.go('apps/horse/tag/' + tagHandle);
        //             }
        //             else if ( filterHandle )
        //             {
        //                 this._location.go('apps/horse/filter/' + filterHandle);
        //             }
        //             else
        //             {
        //                 this._location.go('apps/horse/all');
        //             }
        //         }
        //         else
        //         {
        //             this.currentProvider = currentHorse;
        //         }
        //     });
    }

    // readProvider(providerId): void {
    //     this._providerService.setCurrentProvider(providerId);
    // }

    // /**
    //  * On destroy
    //  */
    // ngOnDestroy(): void
    // {
    //     // Unsubscribe from all subscriptions
    //     this._unsubscribeAll.next();
    //     this._unsubscribeAll.complete();
    // }
}
