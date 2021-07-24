import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isCordova: boolean;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private navController: NavController,
    public alertController: AlertController,
  ) {
    this.initializeApp();
  }

  
  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.isCordova = true;
      } else {
        this.isCordova = false;
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.exitApp();
      
    });
  }
  exitApp() {
    this.platform.backButton.subscribeWithPriority(0, async () => {
      if (
        this.router.url === '/home'
      ) {
        const alert = await this.alertController.create({
          header: 'Confirm!',
          message: 'Do you want to exit the app?',
          backdropDismiss: false,
          buttons: [
            {
              text: 'No',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
              }
            }, {
              text: 'Yes',
              cssClass: 'primary',
              handler: () => {
                navigator['app'].exitApp();
              }
            }
          ]
        });

        await alert.present();
      } else {
        this.navController.pop();
      }
      
    });
  }
}
