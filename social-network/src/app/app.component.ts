import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as firebase from 'firebase';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AccountPage } from '../pages/account/account';
import { NewPostPage } from '../pages/newpost/newpost';
import { ContactPage } from '../pages/contact/contact';
import { SearchUserPage } from '../pages/searchuser/searchuser';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any = LoginPage;
    @ViewChild('content') content: NavController;

    constructor(platform: Platform,
                statusBar: StatusBar,
                splashScreen: SplashScreen,
                private menuCtrl: MenuController,
                private loadingCtrl: LoadingController) {
        platform.ready().then(() => {
                let config = {
                    apiKey: "yeet",
                    authDomain: "social-network-2f1a3.firebaseapp.com",
                    databaseURL: "https://social-network-2f1a3.firebaseio.com",
                    projectId: "social-network-2f1a3",
                    storageBucket: "social-network-2f1a3.appspot.com",
                    messagingSenderId: "346785898086"
                };
                firebase.initializeApp(config);
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }

    public onOpenPage(page: any) {
        if (page == 1) {
            this.content.setRoot(HomePage);
        } else if (page == 2) {
            this.content.setRoot(AccountPage);
        } else if (page == 3) {
            this.content.setRoot(SearchUserPage);
        } else if (page == 4) {
            this.content.setRoot(NewPostPage);
        } else if (page == 5) {
            this.content.setRoot(ContactPage);
        }
        this.menuCtrl.close();
    }

    onDisconnect() {
        let loading = this.loadingCtrl.create({
            content: 'Déconnexion...'
        });
        loading.present();
        location.reload();
    }

    onCloseMenu() {
        this.menuCtrl.close();
    }
}
