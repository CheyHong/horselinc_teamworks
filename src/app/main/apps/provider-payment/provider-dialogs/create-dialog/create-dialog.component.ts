import { Component, OnInit } from '@angular/core';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
  selector: 'create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  constructor(
    private _fuseSidebarService: FuseSidebarService
  ) { }

  ngOnInit() {
  }

  onShowDialog(){
    this._fuseSidebarService.getSidebar('provider-payment-edit-panel').toggleOpen();
  }

}
