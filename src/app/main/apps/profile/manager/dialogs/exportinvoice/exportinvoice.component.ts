import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
  selector: 'profile-manager-exportinvoice',
  templateUrl: './exportinvoice.component.html',
  styleUrls: ['./exportinvoice.component.scss']
})
export class ProfileManagerExportInvoiceComponent implements OnInit {
   
    serviceType = 'All Payments';

  constructor(
    private _fuseSidebarService: FuseSidebarService,
  ) {
  }

  ngOnInit() {
  }

  closePanel(): void{
    this._fuseSidebarService.getSidebar('profile-manager-exportinvoice').close();
  }
}
