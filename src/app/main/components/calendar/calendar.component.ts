import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material';

@Component({
    selector     : 'apps-calendar',
    templateUrl  : './calendar.component.html',
    styleUrls    : ['./calendar.component.scss'],
//    encapsulation: ViewEncapsulation.None,
//    animations   : fuseAnimations
})

export class CalendarComponent implements OnInit, OnDestroy
{
    selectedDate: any;
    selectedDates: any;
    datesToHighlight = ["2019-11-22T18:30:00.000Z", "2019-11-22T18:30:00.000Z", "2019-11-24T18:30:00.000Z", "2019-11-28T18:30:00.000Z", "2019-11-24T18:30:00.000Z", "2019-11-23T18:30:00.000Z", "2019-11-22T18:30:00.000Z", "2019-11-25T18:30:00.000Z"];

    /**
     * Constructor
     *
     */
    constructor(
    )
    {   
        this.selectedDates = [new Date('2019-11-05T11:13:59'), new Date('2019-11-27T11:13:59')];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    onSelect(event): void
    {
        console.log(this.datesToHighlight);
        console.log(event);
        this.selectedDate = event;
    }    
    dateClass()
    {
        return (date: Date): MatCalendarCellCssClasses => {
            const highlightDate = this.datesToHighlight
              .map(strDate => new Date(strDate))
              .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());
            
              console.log(highlightDate);
            return highlightDate ? 'special-date' : '';
        };
    }
}
