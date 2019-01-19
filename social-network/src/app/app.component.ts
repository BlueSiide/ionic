import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as firebase from 'firebase';

import { LoginPage } from '../pages/login/login';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any = LoginPage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        platform.ready().then(() => {
                let config = {
                    apiKey: "AIzaSyDE1V3qeYj_ZlX8Jth5EMRi70gTXC-U0Bs",
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

}