import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
  selector: 'profile-manager-searchprovider',
  templateUrl: './searchprovider.component.html',
  styleUrls: ['./searchprovider.component.scss']
})
export class ProfileManagerSearchProviderComponent implements OnInit {
   
    serviceType = 'All Payments';

  constructor(
    private _fuseSidebarService: FuseSidebarService,
  ) {
  }

  ngOnInit() {
  }

  closePanel(): void{
    this._fuseSidebarService.getSidebar('profile-manager-searchprovider').close();
    this._fuseSidebarService.getSidebar('profile-manager-addprovider').open();
  }
}
