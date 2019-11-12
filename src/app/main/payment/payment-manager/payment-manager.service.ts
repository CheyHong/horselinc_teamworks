import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import { PaymentManager } from 'app/main/payment/payment-manager/payment-manager.model';

@Injectable()
export class PaymentManagerService implements Resolve<any>
{
    payments: PaymentManager[];
    selectedPayments: PaymentManager[];
    currentPayment: PaymentManager;
    searchText: string;
    filters: any[];
    tags: any[];
    routeParams: any;

    onPaymentsChanged: BehaviorSubject<any>;
    onSelectedPaymentsChanged: BehaviorSubject<any>;
    onCurrentPaymentChanged: BehaviorSubject<any>;
    onFiltersChanged: BehaviorSubject<any>;
    onTagsChanged: BehaviorSubject<any>;
    onSearchTextChanged: BehaviorSubject<any>;
    onNewPaymentClicked: Subject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     * @param {Location} _location
     */
    constructor(
        private _httpClient: HttpClient,
        private _location: Location
    )
    {
        // Set the defaults
        this.selectedPayments = [];
        this.searchText = '';
        this.onPaymentsChanged = new BehaviorSubject([]);
        this.onSelectedPaymentsChanged = new BehaviorSubject([]);
        this.onCurrentPaymentChanged = new BehaviorSubject([]);
        this.onFiltersChanged = new BehaviorSubject([]);
        this.onTagsChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new BehaviorSubject('');
        this.onNewPaymentClicked = new Subject();
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {
            
            Promise.all([
                this.getFilters(),
                this.getTags(),
                this.getPayments()
            ]).then(
                () => {
                    if ( this.routeParams.paymentId )
                    {
                        this.setCurrentPayment(this.routeParams.paymentId);
                    }
                    else
                    {
                        this.setCurrentPayment(this.payments[0].id);
                        // this.setCurrentPayment(null);
                    }

                    this.onSearchTextChanged.subscribe(searchText => {
                        if ( searchText !== '' )
                        {
                            this.searchText = searchText;
                            this.getPayments();
                        }
                        else
                        {
                            this.searchText = searchText;
                            this.getPayments();
                        }
                    });
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get all filters
     *
     * @returns {Promise<any>}
     */
    getFilters(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/payment-filters')
                .subscribe((response: any) => {
                    this.filters = response;
                    this.onFiltersChanged.next(this.filters);
                    resolve(this.filters);
                }, reject);
        });
    }

    /**
     * Get all tags
     *
     * @returns {Promise<any>}
     */
    getTags(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/payment-tags')
                .subscribe((response: any) => {
                    this.tags = response;
                    this.onTagsChanged.next(this.tags);
                    resolve(this.tags);
                }, reject);
        });
    }

    /**
     * Get payments
     *
     * @returns {Promise<PaymentManager[]>}
     */
    getPayments(): Promise<PaymentManager[]>
    {
        if ( this.routeParams.tagHandle )
        {
            return this.getPaymentsByTag(this.routeParams.tagHandle);
        }

        if ( this.routeParams.filterHandle )
        {
            return this.getPaymentsByFilter(this.routeParams.filterHandle);
        }

        return this.getPaymentsByParams(this.routeParams);
    }

    /**
     * Get payments by params
     *
     * @param handle
     * @returns {Promise<Payment[]>}
     */
    getPaymentsByParams(handle): Promise<PaymentManager[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/payment-payments')
                .subscribe((payments: any) => {
                    this.payments = payments.map(payment => {
                        return new PaymentManager(payment);
                    });
                    this.payments = FuseUtils.filterArrayByString(this.payments, this.searchText);

                    this.onPaymentsChanged.next(this.payments);
                    resolve(this.payments);
                });
        });
    }

    /**
     * Get payments by filter
     *
     * @param handle
     * @returns {Promise<Payment[]>}
     */
    getPaymentsByFilter(handle): Promise<PaymentManager[]>
    {

        let param = handle + '=true';

        if ( handle === 'dueDate' )
        {
            param = handle + '=^$|\\s+';
        }

        return new Promise((resolve, reject) => {

            this._httpClient.get('api/payment-payments?' + param)
                .subscribe((payments: any) => {

                    this.payments = payments.map(payment => {
                        return new PaymentManager(payment);
                    });

                    this.payments = FuseUtils.filterArrayByString(this.payments, this.searchText);

                    this.onPaymentsChanged.next(this.payments);

                    resolve(this.payments);

                }, reject);
        });
    }

    /**
     * Get payments by tag
     *
     * @param handle
     * @returns {Promise<Payment[]>}
     */
    getPaymentsByTag(handle): Promise<PaymentManager[]>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/payment-tags?handle=' + handle)
                .subscribe((tags: any) => {

                    const tagId = tags[0].id;

                    this._httpClient.get('api/payment-payments?tags=' + tagId)
                        .subscribe((payments: any) => {

                            this.payments = payments.map(payment => {
                                return new PaymentManager(payment);
                            });

                            this.payments = FuseUtils.filterArrayByString(this.payments, this.searchText);

                            this.onPaymentsChanged.next(this.payments);

                            resolve(this.payments);

                        }, reject);
                });
        });
    }

    /**
     * Toggle selected payment by id
     *
     * @param id
     */
    toggleSelectedPayment(id): void
    {
        // First, check if we already have that payment as selected...
        if ( this.selectedPayments.length > 0 )
        {
            for ( const payment of this.selectedPayments )
            {
                // ...delete the selected payment
                if ( payment.id === id )
                {
                    const index = this.selectedPayments.indexOf(payment);

                    if ( index !== -1 )
                    {
                        this.selectedPayments.splice(index, 1);

                        // Trigger the next event
                        this.onSelectedPaymentsChanged.next(this.selectedPayments);

                        // Return
                        return;
                    }
                }
            }
        }

        // If we don't have it, push as selected
        this.selectedPayments.push(
            this.payments.find(payment => {
                return payment.id === id;
            })
        );

        // Trigger the next event
        this.onSelectedPaymentsChanged.next(this.selectedPayments);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        if ( this.selectedPayments.length > 0 )
        {
            this.deselectPayments();
        }
        else
        {
            this.selectPayments();
        }

    }

    /**
     * Select payments
     *
     * @param filterParameter
     * @param filterValue
     */
    selectPayments(filterParameter?, filterValue?): void
    {
        this.selectedPayments = [];

        // If there is no filter, select all payments
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedPayments = this.payments;
        }
        else
        {
            this.selectedPayments.push(...
                this.payments.filter(payment => {
                    return payment[filterParameter] === filterValue;
                })
            );
        }

        // Trigger the next event
        this.onSelectedPaymentsChanged.next(this.selectedPayments);
    }

    /**
     * Deselect payments
     */
    deselectPayments(): void
    {
        this.selectedPayments = [];

        // Trigger the next event
        this.onSelectedPaymentsChanged.next(this.selectedPayments);
    }

    /**
     * Set current payment by id
     *
     * @param id
     */
    setCurrentPayment(id): void
    {
        this.currentPayment = this.payments.find(payment => {
            return payment.id === id;
        });

        this.onCurrentPaymentChanged.next(this.currentPayment);

        const tagHandle    = this.routeParams.tagHandle,
              filterHandle = this.routeParams.filterHandle;

        // if ( tagHandle )
        // {
        //     this._location.go('payment/tag/' + tagHandle + '/' + id);
        // }
        // else if ( filterHandle )
        // {
        //     this._location.go('payment/filter/' + filterHandle + '/' + id);
        // }
        // else
        // {
        //     this._location.go('payment/all/' + id);
        // }
    }

    /**
     * Toggle tag on selected payments
     *
     * @param tagId
     */
    toggleTagOnSelectedPayments(tagId): void
    {
        this.selectedPayments.map(payment => {
            this.toggleTagOnPayment(tagId, payment);
        });
    }

    /**
     * Toggle tag on payment
     *
     * @param tagId
     * @param payment
     */
    toggleTagOnPayment(tagId, payment): void
    {
        const index = payment.tags.indexOf(tagId);

        if ( index !== -1 )
        {
            payment.tags.splice(index, 1);
        }
        else
        {
            payment.tags.push(tagId);
        }

        this.updatePayment(payment);
    }

    /**
     * Has tag?
     *
     * @param tagId
     * @param payment
     * @returns {boolean}
     */
    hasTag(tagId, payment): any
    {
        if ( !payment.tags )
        {
            return false;
        }

        return payment.tags.indexOf(tagId) !== -1;
    }

    /**
     * Update the payment
     *
     * @param payment
     * @returns {Promise<any>}
     */
    updatePayment(payment): any
    {
        return new Promise((resolve, reject) => {

            this._httpClient.post('api/payment-payments/' + payment.id, {...payment})
                .subscribe(response => {

                    this.getPayments().then(payments => {

                        resolve(payments);

                    }, reject);
                });
        });
    }
}
