import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignUpPage } from '../signup/signup';
import * as firebase from 'firebase';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	username = "";
	password = "";
	error: string;
	newUser: boolean;
	users: Object;

	constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
	}

	onLogin() {
		if (this.username.length != 0 && this.password.length != 0) {
			let loading = this.loadingCtrl.create({
				content: 'Connexion...'
			});
			loading.present();
			let connect: boolean;
			let userCount = 0;
			let usersDatabase = firebase.database().ref().child('users');
			this.error = "";
			usersDatabase.once('value').then(
				(data) => {
					this.users = data.val();
					for (var user in this.users) {
						userCount++;
					}
					for (let i = 1; i <= userCount; i++) {
						let user = 'user'+i;
						if (this.username.toLowerCase() == this.users[user].username &&
							this.password == this.users[user].password) {
							connect = true;
							break;
						} else {
							connect = false;
						}
					}
					if (connect == true) {
						loading.dismiss();
						this.navCtrl.push(HomePage, {username: this.username.toLowerCase()});
					} else {
						loading.dismiss();
						this.error = 'Mauvais nom d\'utilisateur ou mot de passe';
					}
				});
		} else {
			this.error = "Veuillez remplir tous les champs."
		}
}
	onSignUp() {
		this.navCtrl.push(SignUpPage);
	}
}