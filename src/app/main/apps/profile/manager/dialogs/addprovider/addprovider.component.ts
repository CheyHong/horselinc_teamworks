import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
  selector: 'profile-manager-addprovider',
  templateUrl: './addprovider.component.html',
  styleUrls: ['./addprovider.component.scss']
})
export class ProfileManagerAddProviderComponent implements OnInit {
   
    serviceType = 'Braider';

  constructor(
    private _fuseSidebarService: FuseSidebarService,
  ) {
  }

  ngOnInit() {
  }

  closePanel(): void{
    this._fuseSidebarService.getSidebar('profile-manager-addprovider').close();
  }
  searchProvider(): void{
      this.closePanel();
    this._fuseSidebarService.getSidebar('profile-manager-searchprovider').open();
  }
}
