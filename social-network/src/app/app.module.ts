import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/signup/signup';
import { UsersPage } from '../pages/users/users';
import { AccountPage } from '../pages/account/account';
import { NewPostPage } from '../pages/newpost/newpost';
import { ContactPage } from '../pages/contact/contact';
import { VisitProfilePage } from '../pages/visitprofile/visitprofile';
import { ViewPostPage } from '../pages/viewpost/viewpost';
import { SearchUserPage } from '../pages/searchuser/searchuser';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LoginPage,
        SignUpPage,
        UsersPage,
        AccountPage,
        NewPostPage,
        ContactPage,
        VisitProfilePage,
        ViewPostPage,
        SearchUserPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoginPage,
        SignUpPage,
        UsersPage,
        AccountPage,
        NewPostPage,
        ContactPage,
        VisitProfilePage,
        ViewPostPage,
        SearchUserPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})

export class AppModule {}