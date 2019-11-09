import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
  selector: 'profile-provider-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class ProfileProviderEditProfileComponent implements OnInit {

  constructor(
    private _fuseSidebarService: FuseSidebarService,
  ) { }

  ngOnInit(): void {
  }
  onAddAnother(): void{
//    this._fuseSidebarService.getSidebar('profile-provider-editprofile').close();
    this._fuseSidebarService.getSidebar('profile-provider-addservice').open();
  }
}
