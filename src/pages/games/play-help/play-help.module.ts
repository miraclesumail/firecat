import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayHelpPage } from './play-help';
import { ComponentsModule } from '../../../components/components.module'

@NgModule({
  declarations: [
    PlayHelpPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayHelpPage),ComponentsModule
  ],
})
export class PlayHelpPageModule {}
