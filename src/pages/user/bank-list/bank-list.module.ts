import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankListPage } from './bank-list';

@NgModule({
  declarations: [
    BankListPage,
  ],
  imports: [
    IonicPageModule.forChild(BankListPage),
  ],
})
export class BankListPageModule {}
