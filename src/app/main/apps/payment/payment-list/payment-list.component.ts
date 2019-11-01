import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';

import { Payment } from 'app/main/apps/payment/payment.model';
import { PaymentService } from 'app/main/apps/payment/payment.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class PaymentListComponent implements OnInit, OnDestroy {

    todos: Payment[];
    currentTodo: Payment;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ActivatedRoute} _activatedRoute
     * @param {PaymentService} _managerService
     * @param {Location} _location
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _managerService: PaymentService,
        private _location: Location
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to update todos on changes
        this._managerService.onTodosChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(todos => {
                this.todos = todos;
                console.log(todos);
            });

        // Subscribe to update current todo on changes
        this._managerService.onCurrentTodoChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentTodo => {
                if ( !currentTodo )
                {
                    // Set the current todo id to null to deselect the current todo
                    this.currentTodo = null;

                    // Handle the location changes
                    const tagHandle    = this._activatedRoute.snapshot.params.tagHandle,
                          filterHandle = this._activatedRoute.snapshot.params.filterHandle;

                    // if ( tagHandle )
                    // {
                    //     this._location.go('apps/payment/tag/' + tagHandle);
                    // }
                    // else if ( filterHandle )
                    // {
                    //     this._location.go('apps/payment/filter/' + filterHandle);
                    // }
                    // else
                    // {
                        // this._location.go('apps/payment/all');
                    // }
                }
                else
                {
                    this.currentTodo = currentTodo;
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Read todo
     *
     * @param todoId
     */
    readTodo(todoId): void
    {
        // Set current todo
        this._managerService.setCurrentTodo(todoId);
    }

    /**
     * On drop
     *
     * @param ev
     */
    onDrop(ev): void
    {

    }

}
