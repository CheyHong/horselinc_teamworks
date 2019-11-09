import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseConfigService } from '@fuse/services/config.service';
@Component({
  selector: 'horse-provider-confirm',
  templateUrl: './horse-provider-confirm.component.html',
  styleUrls: ['./horse-provider-confirm.component.scss']
})
export class HorseProviderConfirmComponent implements OnInit {

    constructor(
     
        private _fuseSidebarService: FuseSidebarService,
        private _fuseConfigService: FuseConfigService,
       
    )
    {}
  ngOnInit() {
  }

  ConfirmSubmit():void
  {
      this._fuseSidebarService.getSidebar('horse-provider-confirm-panel').toggleOpen();
  }
  ConfirmSave():void
  {
      this._fuseSidebarService.getSidebar('horse-provider-confirm-panel').toggleOpen();
  }    
  ConfirmCancel():void
  {
      this._fuseSidebarService.getSidebar('horse-provider-confirm-panel').toggleOpen();
  }    

}
