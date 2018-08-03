import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcceptInvitePage } from './accept-invite';

@NgModule({
  declarations: [
    AcceptInvitePage,
  ],
  imports: [
    IonicPageModule.forChild(AcceptInvitePage),
  ],
})
export class AcceptInvitePageModule {}
