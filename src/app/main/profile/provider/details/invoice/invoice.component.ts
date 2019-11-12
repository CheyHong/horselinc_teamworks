import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
  selector: 'apps-profile-provider-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class ProfileProviderInvoiceComponent implements OnInit {

  constructor(
    private _fuseSidebarService: FuseSidebarService,
    private _fuseConfigService: FuseConfigService,
  ) 
  {
    // Configure the layout
    this._fuseConfigService.config = {
        layout: {
            navbar   : {
                hidden: false
            },
            toolbar  : {          
                hidden: false
            },
            footer   : {
                hidden: true
            },
            sidepanel: {
                hidden: true
            }
        }
    };
  }

  ngOnInit(): void {
  }
}
