import { Component, OnInit } from '@angular/core';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
  selector: 'edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  constructor(
    private _fuseSidebarService: FuseSidebarService
  ) { }

  ngOnInit() {
    
  }

  onCloseDlg() {
    this._fuseSidebarService.getSidebar('payment-provider-edit-panel').close();
  }

}
