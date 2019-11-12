import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
  selector: 'profile-manager-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class ProfileManagerEditProfileComponent implements OnInit {

  constructor(
    private _fuseSidebarService: FuseSidebarService,
  ) 
  {

   }

  ngOnInit() {
  }
  closePanel(): void
  {
      this._fuseSidebarService.getSidebar('profile-manager-editprofile').close();
  }
  openUpdateEmailPanel(): void
  {
      this.closePanel();
    this._fuseSidebarService.getSidebar('profile-manager-updateemail').open();
  }
  openUpdatePasswordPanel(): void
  {
    this.closePanel();
    this._fuseSidebarService.getSidebar('profile-manager-updatepassword').open();
  }
}
