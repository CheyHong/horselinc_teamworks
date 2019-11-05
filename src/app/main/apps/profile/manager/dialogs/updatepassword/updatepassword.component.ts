import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
  selector: 'profile-manager-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.scss']
})
export class ProfileManagerUpdatePasswordComponent implements OnInit {

  constructor(
    private _fuseSidebarService: FuseSidebarService,
  ) 
  {

   }

  ngOnInit() {
  }
  closePanel(): void
  {
    this._fuseSidebarService.getSidebar('profile-manager-updatepassword').close();
    this._fuseSidebarService.getSidebar('profile-manager-editprofile').open();
  }
}
