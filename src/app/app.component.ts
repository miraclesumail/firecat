import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Nav, Platform, NavController, App} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UtilProvider } from '../providers/util/util'
import { SscPage } from '../pages/games/ssc/ssc'

@Component({
  templateUrl: 'app.html',
})
export class MyApp{
  @ViewChild('nav') nav: Nav;
  rootPage:any = 'TabsPage';

  // constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public util:UtilProvider, public app: App) {
  //   this.app.viewDidLoad.subscribe(res=>{
  //     console.log(res);
  //     console.log(res.component.name);
  //   })

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public util:UtilProvider) {

    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      platform.pause.subscribe(() => {
        console.log('[INFO] App paused')
        if(this.util.listeners.length){
          this.util.listeners.forEach(element => {
               window.removeEventListener('devicemotion',element,false)
          })
        }
         this.util.listeners = []
      })

      platform.resume.subscribe(() => {
        console.log('[INFO] App resumed')
        if(this.nav.getActiveChildNav().getSelected().getActive().getNav().getActive().component.name == 'SscPage')
           this.util.shakePhone(this.util.randomChoose)
      })

    });

  }


}
