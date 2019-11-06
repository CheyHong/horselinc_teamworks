import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
  selector: 'profile-manager-addpayment',
  templateUrl: './addpayment.component.html',
  styleUrls: ['./addpayment.component.scss']
})
export class ProfileManagerAddPaymentComponent implements OnInit {
   
    serviceType = 'Braider';

  constructor(
    private _fuseSidebarService: FuseSidebarService,
  ) {
  }

  ngOnInit() {
  }

  closePanel(): void{
    this._fuseSidebarService.getSidebar('profile-manager-addpayment').close();
  }
}
