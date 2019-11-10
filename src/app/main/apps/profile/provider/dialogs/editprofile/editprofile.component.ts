import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
  selector: 'profile-provider-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class ProfileProviderEditProfileComponent implements OnInit {
  addServiceDlg: boolean;

  constructor(
    private _fuseSidebarService: FuseSidebarService,
<<<<<<< HEAD
  ) { }
=======
  ) { 
   }
>>>>>>> 3438e7425c8ba13468bea17680b9d3c1d085a513

  ngOnInit(): void {
    this.addServiceDlg = false;
  }
  onAddAnother(): void{
    this.addServiceDlg = !this.addServiceDlg;
//    this._fuseSidebarService.getSidebar('profile-provider-editprofile').close();
//    this._fuseSidebarService.getSidebar('profile-provider-addservice').open();
  }
  closePanel(): void
  {
      this._fuseSidebarService.getSidebar('profile-provider-editprofile').close();
  }
<<<<<<< HEAD
  onAddAnother(): void{
//    this._fuseSidebarService.getSidebar('profile-provider-editprofile').close();
    this._fuseSidebarService.getSidebar('profile-provider-addservice').open();
  }
=======
>>>>>>> 3438e7425c8ba13468bea17680b9d3c1d085a513
}
