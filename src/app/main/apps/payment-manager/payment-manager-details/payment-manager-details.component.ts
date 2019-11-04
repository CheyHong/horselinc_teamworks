import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { FuseUtils } from '@fuse/utils';
import { fuseAnimations } from '@fuse/animations';

import { PaymentManager } from 'app/main/apps/payment-manager/payment-manager.model';
import { PaymentManagerService } from 'app/main/apps/payment-manager/payment-manager.service';

@Component({
    selector     : 'payment-manager-details',
    templateUrl  : './payment-manager-details.component.html',
    styleUrls    : ['./payment-manager-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class PaymentManagerDetailsComponent implements OnInit, OnDestroy
{
    payment: PaymentManager;
    tags: any[];
    formType: string;
    paymentForm: FormGroup;

    @ViewChild('titleInput', {static: false})
    titleInputField;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {Payment} _paymentService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _paymentService: PaymentManagerService,
        private _formBuilder: FormBuilder
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
        
        // Subscribe to update the current payment
        this._paymentService.onCurrentPaymentChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(payment => {

                // if ( payment && formType === 'edit' )
                // {
                //     this.formType = 'edit';
                    this.payment = payment;
                    
                    // this.paymentForm = this.createPaymentForm();

                //     this.paymentForm.valueChanges
                //     .pipe(
                //         takeUntil(this._unsubscribeAll),
                //         debounceTime(500),
                //         distinctUntilChanged()
                //     )
                //     .subscribe(data => {
                //         this._paymentService.updatePayment(data);
                //     });
                // }
            });

        // Subscribe to update on tag change
        this._paymentService.onTagsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(labels => {
                this.tags = labels;
            });

        // Subscribe to update on tag change
        this._paymentService.onNewPaymentClicked
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.payment = new PaymentManager({});
                this.payment.id = FuseUtils.generateGUID();
                this.formType = 'new';
                // this.paymentForm = this.createPaymentForm();
                this.focusTitleField();
                this._paymentService.onCurrentPaymentChanged.next(this.payment);
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
     * Focus title field
     */
    focusTitleField(): void
    {
        setTimeout(() => {
            this.titleInputField.nativeElement.focus();
        });
    }

    /**
     * Create payment form
     *
     * @returns {FormGroup}
     */
    // createPaymentForm(): FormGroup
    // {
    //     return this._formBuilder.group({
    //         id       : [this.payment.id],
    //         title    : [this.payment.title],
    //         notes    : [this.payment.notes],
    //         startDate: [this.payment.startDate],
    //         dueDate  : [this.payment.dueDate],
    //         completed: [this.payment.completed],
    //         starred  : [this.payment.starred],
    //         important: [this.payment.important],
    //         deleted  : [this.payment.deleted],
    //         tags     : [this.payment.tags]
    //     });
    // }

    /**
     * Toggle star
     *
     * @param event
     */
    toggleStar(event): void
    {
        event.stopPropagation();
        this.payment.toggleStar();
        this._paymentService.updatePayment(this.payment);
    }

    /**
     * Toggle important
     *
     * @param event
     */
    toggleImportant(event): void
    {
        event.stopPropagation();
        this.payment.toggleImportant();
        this._paymentService.updatePayment(this.payment);
    }

    /**
     * Toggle Completed
     *
     * @param event
     */
    toggleCompleted(event): void
    {
        event.stopPropagation();
        this.payment.toggleCompleted();
        this._paymentService.updatePayment(this.payment);
    }

    /**
     * Toggle Deleted
     *
     * @param event
     */
    toggleDeleted(event): void
    {
        event.stopPropagation();
        this.payment.toggleDeleted();
        this._paymentService.updatePayment(this.payment);
    }

    /**
     * Toggle tag on payment
     *
     * @param tagId
     */
    toggleTagOnPayment(tagId): void
    {
        this._paymentService.toggleTagOnPayment(tagId, this.payment);
    }

    /**
     * Has tag?
     *
     * @param tagId
     * @returns {any}
     */
    hasTag(tagId): any
    {
        return this._paymentService.hasTag(tagId, this.payment);
    }

    /**
     * Add payment
     */
    addPayment(): void
    {
        // this._paymentService.updatePayment(this.paymentForm.getRawValue());
    }
}
